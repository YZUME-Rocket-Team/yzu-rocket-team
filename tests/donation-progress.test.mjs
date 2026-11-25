import assert from "node:assert/strict";
import { test } from "node:test";

import { fetchDonationTotals, parseDonationList, readManualSnapshot } from "../lib/donations.ts";

const purpose = "捐贈機械工程學系火箭競賽相關經費專用";
const campaign = { from: "2026-11-05", through: "2026-11-30" };
const list115 = { url: "https://example.test/list-115", from: "2026-08-01", through: "2027-07-31" };
const row = (id, date, method, use, amount) =>
  `<tr><td>${amount}</td><td>${use}</td><td>${id}</td><td>${method}</td><td>${date}</td></tr>`;
const table = (...rows) => `<table><tr><td>捐款金額</td><td>捐款用途</td><td>編號</td><td>捐款方式</td><td>日期</td></tr>${rows.join("")}</table>`;
const response = (body, status = 200) => new Response(body, { status, headers: { "content-type": "text/html; charset=utf-8" } });

test("parses actual column names in any order and normalizes dates, amounts and purposes", () => {
  const html = table(
    row(64, "１１５．１１．０５", "信用卡", "捐贈機械工程學系&nbsp;<br>火箭競賽相關經費專用", "ＮＴ＄１，０００"),
    row(67, "2026/11/09", "匯款", purpose, "新臺幣2,000元"),
    row(68, "民國115/11/10", "現金", purpose, "$100"),
  );
  assert.deepEqual(parseDonationList(html, purpose, campaign, list115), { amount: 3100, count: 3 });
});

test("matches the full purpose after removing whitespace and an optional final period", () => {
  const html = table(
    row(1, "115.11.10", "信用卡", `${purpose}。`, "100"),
    row(2, "115.11.10", "匯款", `　捐贈機械工程學系&nbsp;<br>火箭競賽\u200B相關經費專用 ．　`, "200"),
    row(3, "115.11.10", "現金", `${purpose}.`, "300"),
    row(4, "115.11.10", "信用卡", `${purpose}。其他計畫`, "10,000"),
    row(5, "115.11.10", "信用卡", `額外支持 ${purpose}。`, "10,000"),
    row(6, "115.11.10", "信用卡", "捐贈機械工程學系。火箭競賽相關經費專用", "10,000"),
    row(7, "115.11.10", "信用卡", "捐贈機械工程學系無人機競賽相關經費專用。", "10,000"),
  );
  assert.deepEqual(parseDonationList(html, purpose, campaign, list115), { amount: 600, count: 3 });
});

test("excludes other purposes, records outside the inclusive window and in-kind donations", () => {
  const html = table(
    row(1, "115.11.04", "信用卡", purpose, "30,000"),
    row(2, "115.11.05", "信用卡", purpose, "100"),
    row(3, "115.11.30", "信用卡", purpose, "200"),
    row(4, "115.12.01", "信用卡", purpose, "30,000"),
    row(5, "115.11.10", "信用卡", purpose + "（其他計畫）", "10,000"),
    row(6, "115.11.10", "實物", purpose, "10,000"),
  );
  assert.deepEqual(parseDonationList(html, purpose, campaign, list115), { amount: 300, count: 2 });
  assert.deepEqual(parseDonationList(table(row(7, "115.11.10", "信用卡", "其他計畫", "1000")), purpose, campaign, list115), { amount: 0, count: 0 });
});

test("accepts official blank and total rows and ignores incomplete dates on unrelated donations", () => {
  const html = table(
    row(9, "", "", "", ""),
    row(39, "115.09.", "信用卡", "其他計畫", "30,000"),
    row(64, "115.11.05", "信用卡", purpose, "1,000"),
    row("", "", "", "總計", "$31,000"),
  );
  assert.deepEqual(parseDonationList(html, purpose, campaign, list115), { amount: 1000, count: 1 });
});

test("deduplicates list numbers and retains separate rows with the same date and amount", () => {
  const first = row(9, "115.11.10", "信用卡", purpose, "1,000");
  const second = row(10, "115.11.10", "信用卡", purpose, "1,000");
  assert.deepEqual(parseDonationList(table(first, first, second), purpose, campaign, list115), { amount: 2000, count: 2 });
  assert.throws(() => parseDonationList(table(first, row(9, "115.11.10", "信用卡", purpose, "2,000")), purpose, campaign, list115), /Conflicting/);
});

test("does not turn malformed or ambiguous lists into a zero snapshot", () => {
  assert.throws(() => parseDonationList("<table><tr><td>Maintenance</td></tr></table>", purpose, campaign, list115), /table/);
  assert.throws(() => parseDonationList(table(), purpose, campaign, list115), /no records/);
  assert.throws(() => parseDonationList(table(row(1, "115.11.10", "其他", purpose, "1000")), purpose, campaign, list115), /Unconfirmed/);
  assert.throws(() => parseDonationList(table(row(1, "115.11.10", "現金", purpose, "1,00")), purpose, campaign, list115), /amount/);
  assert.throws(() => parseDonationList(table(row(1, "115.02.31", "現金", purpose, "100")), purpose, campaign, list115), /Invalid donation date/);
});

test("fetches annual lists server-side and handles repeated annual numbers without double-counting publication overlap", async () => {
  const list114 = { url: "https://example.test/list-114", from: "2025-08-01", through: "2026-07-31" };
  const overlap = row(2, "115.08.01", "匯款", purpose, "200");
  const urls = [];
  const totals = await fetchDonationTotals([list114, list115], purpose, { from: "2026-07-25", through: "2026-08-05" }, async (url, options) => {
    urls.push(url);
    assert.equal(options.cache, "no-store");
    assert.equal(options.redirect, "error");
    assert(options.signal instanceof AbortSignal);
    return response(url === list114.url
      ? table(row(1, "115.07.30", "現金", purpose, "100"), overlap)
      : table(row(1, "115.08.01", "匯款", purpose, "200")));
  });
  assert.deepEqual(urls, [list114.url, list115.url]);
  assert.deepEqual(totals, { amount: 300, count: 2 });
});

test("rejects network errors, unexpected responses and required lists with invalid schemas", async () => {
  await assert.rejects(fetchDonationTotals([list115], purpose, campaign, async () => { throw new Error("network unavailable"); }), /network/);
  await assert.rejects(fetchDonationTotals([list115], purpose, campaign, async () => response("Temporary failure", 503)), /HTTP/);
  await assert.rejects(fetchDonationTotals([list115], purpose, campaign, async () => response("<p>List replaced</p>")), /table/);
  await assert.rejects(fetchDonationTotals([list115, { ...list115, url: "https://example.test/duplicate" }], purpose, campaign), /non-overlapping/);
});

test("accepts confirmed manual zero and preserves the date, and treats incomplete settings as unavailable", () => {
  assert.deepEqual(readManualSnapshot("0", "2026-11-10"), { amount: 0, updatedAt: "2026-11-10" });
  assert.deepEqual(readManualSnapshot("3100", "2026-11-10"), { amount: 3100, updatedAt: "2026-11-10" });
  assert.equal(readManualSnapshot(), null);
  assert.equal(readManualSnapshot("3100"), null);
  assert.equal(readManualSnapshot("3100", "2026-02-30"), null);
  assert.equal(readManualSnapshot("3,100", "2026-11-10"), null);
});
