This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 2027 募款進度設定

沒有已確認資料時，募款卡片顯示「募款資料暫未更新」並保留深灰色軌道。請向元智大學公共事務暨校友服務中心確認能否定期擷取名錄並公開彙總金額，再向團隊與校方核對正式募款起訖日期及款項歸屬。

本機把設定寫入專案根目錄的 `.env.local`，然後重啟開發伺服器。Vercel 正式站在專案的 **Settings → Environment Variables** 新增設定，選擇 **Production**，再部署包含此功能的版本。這些設定僅供伺服器使用，變數名稱無需加上 `NEXT_PUBLIC_`。

| 環境變數 | 值 |
| --- | --- |
| `DONATION_SCRAPE_ENABLED` | 預設關閉。確認後設為 `true`。 |
| `DONATION_CAMPAIGN_START`、`DONATION_CAMPAIGN_END` | 待確認。使用 `YYYY-MM-DD`，含起訖當日，日期採臺灣時間。兩項必須同時提供。 |
| `DONATION_FALLBACK_AMOUNT`、`DONATION_FALLBACK_DATE` | 選填。擷取尚未啟用或暫時無法取得資料時，可同時填入已確認的整數金額（例如格式為 `1000`）及資料日期 `YYYY-MM-DD`。 |

伺服器依 [名錄與用途設定](data/donationCampaign.ts) 每 86,400 秒重新驗證加總結果。逾期後由頁面流量觸發重新驗證，成功前保留原金額與時間。快取不存在或已遭清除而且讀取失敗時，使用手動備援。校方刊登頻率與網站快取頻率各自獨立。超過一個學年度時，依學校公布狀況新增後續網址與相鄰、不重疊的名錄日期範圍。

Next.js 資料快取僅保存加總金額和最後成功時間。名錄 HTML 僅供當次伺服器解析，並以名錄內的編號識別重複列。相同日期與金額的不同編號分別計入。當符合用途與期間的列使用「其他」等無法辨認的付款方式，該批更新保留既有資料，待核對後再調整。

使用 Node.js 24 執行離線測試：

```bash
node --test tests/donation-progress.test.mjs
```
