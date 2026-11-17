# SEO 維護與 Google Search Console

## 頁面與品牌設定

- 正式網址由網站擁有者確認為 `https://madrocket.tw/`，集中於 `lib/seo.ts` 的 `siteUrl`，供全站 `metadataBase`、canonical、Open Graph、sitemap 與 robots 使用，不取用預覽部署或請求來源網域。
- `lib/seo.ts` 集中管理公開頁面的 SEO 標題與描述，透過 `createPageMetadata` 產生各頁的 canonical、Open Graph 與 Twitter Card。
- 首頁標題與描述依團隊提供的原文設定；`/journey-2026` 與 `/plan-2027` 保留原本符合頁面內容的描述。
- 公開內容頁為 `/`、`/competition`、`/journey-2026`、`/budget`、`/plan-2027`。
- `/about` 已永久轉址到 `/#about`，不應作為獨立頁面提交收錄；首頁錨點及外部捐款網址也不屬於 sitemap 項目。
- `app/sitemap.ts` 提供 `/sitemap.xml`；`app/robots.ts` 提供 `/robots.txt`，允許爬取公開內容並指向正式 sitemap。不以建置時間假裝內容更新時間，因此未設定缺乏依據的 `lastmod`。
- 網頁語言沿用 `zh-Hant`，Open Graph 使用台灣繁體中文地區碼 `zh_TW`。
- 分享圖片沿用 `/images/team_logo.png` 原始隊徽（1254 × 1254），使用適合正方形圖片的 Twitter `summary` 卡片。保留既有 favicon、icon 與 Apple Touch 圖示，不另外新增重複圖示標籤。

## 本機驗證

```powershell
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

在本機正式伺服器確認各公開頁面回傳 HTTP 200，原始 HTML 的 `<head>` 包含唯一且正確的 title、description、canonical 與完整 Open Graph。確認 canonical 及分享圖片網址使用正式網域，而非 localhost 或預覽部署網址。

另檢查 `/sitemap.xml` 與 `/robots.txt` 的 HTTP 狀態、內容與 Content-Type；確認公開頁面沒有 `noindex` 或禁止索引的 `X-Robots-Tag` 回應標頭，並保留 `/about` 的永久轉址。不存在的網址應維持 404，不應列入 sitemap。

這些檢查針對 SEO 輸出，不等同於完成桌機、手機或動畫的瀏覽器互動測試。

## 部署後的人工操作

1. 在 [Google Search Console](https://search.google.com/search-console) 選擇或新增與正式網址一致的資源，完成擁有權驗證。有 DNS 管理權限可使用網域資源；只有網站子網域權限時可使用完整 HTTPS 網址的網址前置字元資源。依 Google 提供的實際驗證內容操作，不使用範例驗證碼。[Google 擁有權驗證說明](https://support.google.com/webmasters/answer/9008080)
2. 先直接開啟正式站的 `/robots.txt`、`/sitemap.xml` 與五個公開內容頁，確認新版本已生效且可公開存取，沒有登入或部署保護阻擋。
3. 在「Sitemap」提交 `https://madrocket.tw/sitemap.xml`，確認處理成功並留意讀取錯誤。[Google Sitemap 提交說明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
4. 使用「網址審查」逐一檢查首頁與四個主要頁面，執行「測試實際網址」，確認允許檢索、允許索引及使用者宣告的標準網址正確，再選擇「要求建立索引」。之後可比對 Google 選擇的標準網址。[Google 網址審查說明](https://support.google.com/webmasters/answer/9012289/)
5. 後續查看「網頁索引」報表，追蹤未建立索引的原因；`/about` 是既有轉址，不必當成獨立內容要求收錄。

Sitemap 與要求建立索引有助於 Google 發現頁面，仍不保證收錄、排名或顯示時間；搜尋結果的標題與摘要也可能由 Google 依內容調整。
