import { load } from "cheerio/slim";

export type DateRange = { from: string; through: string };
export type DonationListSource = DateRange & { url: string };
export type DonationSnapshot = { amount: number; updatedAt: string };

const headings = {
  id: ["編號", "序號", "收據編號"],
  date: ["日期", "捐款日期", "捐贈日期"],
  method: ["捐款方式", "捐贈方式"],
  purpose: ["捐款用途", "捐贈用途"],
  amount: ["捐款金額", "捐贈金額", "金額"],
};

const cashMethods = new Set(["信用卡", "匯款", "現金", "支票", "劃撥", "郵政劃撥", "轉帳", "銀行轉帳"]);
const inKindMethods = new Set(["實物", "實物捐贈", "物資捐贈"]);
const totalLabel = /^(合計|總計|小計):?$/;
const trailingPurposePeriod = /[。.]$/;

function normalize(value: string) {
  return value.normalize("NFKC").replace(/[\s\u200B-\u200D\uFEFF]+/g, "");
}

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function parseListDate(text: string) {
  const match = /^(?:民國)?(\d{2,4})[.\/-](\d{1,2})[.\/-](\d{1,2})$/.exec(text);
  if (!match) throw new Error("Unrecognized donation date");
  const [, year, month, day] = match;
  const date = `${Number(year) + (year.length < 4 ? 1911 : 0)}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  if (!isIsoDate(date)) throw new Error("Invalid donation date");
  return date;
}

function within(date: string, range: DateRange) {
  return range.from <= date && date <= range.through;
}

function parseAmount(text: string) {
  const value = text.replace(/^(?:NT\$|NTD|TWD|新[臺台]幣|\$)/i, "").replace(/元$/, "");
  if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(value)) throw new Error("Unrecognized donation amount");
  const amount = Number(value.replaceAll(",", ""));
  if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error("Invalid donation amount");
  return amount;
}

function findColumns(cells: string[]) {
  const columns = {
    id: cells.findIndex((cell) => headings.id.includes(cell)),
    date: cells.findIndex((cell) => headings.date.includes(cell)),
    method: cells.findIndex((cell) => headings.method.includes(cell)),
    purpose: cells.findIndex((cell) => headings.purpose.includes(cell)),
    amount: cells.findIndex((cell) => headings.amount.includes(cell)),
  };
  return Object.values(columns).every((column) => column >= 0) ? columns : null;
}

export function parseDonationList(html: string, purpose: string, range: DateRange, source: DateRange) {
  const $ = load(html);
  const tables = $("table").toArray().flatMap((table) => {
    const rows = $(table).children("tr, thead, tbody, tfoot").toArray()
      .flatMap((element) => $(element).is("tr") ? [element] : $(element).children("tr").toArray());
    const header = rows.findIndex((row) => Boolean(findColumns($(row).children("th, td").map((_, cell) => normalize($(cell).text())).get())));
    return header < 0 ? [] : [{ rows, header }];
  });
  if (tables.length !== 1) throw new Error("Unrecognized donation list table");

  const { rows, header } = tables[0];
  const headerCells = $(rows[header]).children("th, td");
  const columns = findColumns(headerCells.map((_, cell) => normalize($(cell).text())).get())!;
  const records = new Map<string, { date: string; method: string; amount: number }>();
  const campaignPurpose = normalize(purpose).replace(trailingPurposePeriod, "");
  let rowCount = 0;

  for (const row of rows.slice(header + 1)) {
    const cells = $(row).children("th, td");
    const textAt = (column: number) => normalize(cells.eq(column).text());
    if (cells.length !== headerCells.length || cells.is("[colspan], [rowspan]")) {
      if (cells.first().is("[colspan]") && totalLabel.test(textAt(0))) continue;
      throw new Error("Unrecognized donation list row");
    }
    if (headings.id.includes(textAt(columns.id)) && headings.date.includes(textAt(columns.date))) continue;

    const id = textAt(columns.id);
    const dateText = textAt(columns.date);
    const method = textAt(columns.method);
    const rowPurpose = textAt(columns.purpose);
    const amountText = textAt(columns.amount);
    // The published list includes numbered blank rows and a final total row.
    if (!dateText && !method && !rowPurpose && !amountText) continue;
    if (!id && !dateText && !method && totalLabel.test(rowPurpose)) continue;
    if (!/^\d+$/.test(id) || !method || !dateText) throw new Error("Missing donation number, date or method");
    if (rowPurpose) rowCount += 1;
    if (rowPurpose.replace(trailingPurposePeriod, "") !== campaignPurpose) continue;
    if (inKindMethods.has(method)) continue;
    const date = parseListDate(dateText);
    if (!within(date, range) || !within(date, source)) continue;
    if (!cashMethods.has(method)) throw new Error("Unconfirmed campaign payment method");

    const amount = parseAmount(amountText);
    const existing = records.get(id);
    if (existing && (existing.amount !== amount || existing.date !== date || existing.method !== method)) {
      throw new Error("Conflicting donation numbers");
    }
    records.set(id, { date, method, amount });
  }
  if (!rowCount) throw new Error("Donation list has no records");
  return {
    amount: [...records.values()].reduce((total, record) => total + record.amount, 0),
    count: records.size,
  };
}

export async function fetchDonationTotals(
  sources: readonly DonationListSource[],
  purpose: string,
  range: DateRange,
  fetcher: typeof fetch = fetch,
) {
  const ordered = [...sources].sort((a, b) => a.from.localeCompare(b.from));
  for (const [index, source] of ordered.entries()) {
    if (!isIsoDate(source.from) || !isIsoDate(source.through) || source.from > source.through
      || (index > 0 && ordered[index - 1].through >= source.from)) {
      throw new Error("Donation list publication periods must be valid and non-overlapping");
    }
  }
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Taipei", dateStyle: "short" }).format(new Date());
  const publishedThrough = range.through < today ? range.through : today;
  const relevant = ordered.filter((source) => source.from <= publishedThrough && range.from <= source.through);
  if (!relevant.length || relevant[0].from > range.from) throw new Error("No donation list covers the campaign start");
  for (let index = 1; index < relevant.length; index += 1) {
    const next = new Date(relevant[index - 1].through);
    next.setUTCDate(next.getUTCDate() + 1);
    if (next.toISOString().slice(0, 10) !== relevant[index].from) throw new Error("Gap in donation list coverage");
  }
  if (relevant.at(-1)!.through < publishedThrough) throw new Error("Missing current donation list");

  const signal = AbortSignal.timeout(6_000);
  const values = await Promise.all(relevant.map(async (source) => {
    const response = await fetcher(source.url, { cache: "no-store", redirect: "error", signal });
    if (!response.ok || !response.headers.get("content-type")?.toLowerCase().includes("text/html")) {
      throw new Error("Donation list HTTP response was unsuccessful");
    }
    const html = await response.text();
    return parseDonationList(html, purpose, { from: range.from, through: publishedThrough }, source);
  }));

  const amount = values.reduce((total, value) => total + value.amount, 0);
  if (!Number.isSafeInteger(amount)) throw new Error("Donation total is out of range");
  return { amount, count: values.reduce((total, value) => total + value.count, 0) };
}

export function readManualSnapshot(amountValue?: string, dateValue?: string): DonationSnapshot | null {
  const value = amountValue?.trim();
  const date = dateValue?.trim();
  if (!value || !/^\d+$/.test(value) || !date || !isIsoDate(date)) return null;
  const amount = Number(value);
  return Number.isSafeInteger(amount) ? { amount, updatedAt: date } : null;
}
