<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 火大的元件（YZUME）網站開發規範

本文件適用於整個專案，供 Codex 開發、維護、修改與重構時使用。以下現況依專案檔案核對；版本、功能與部署方式仍應在每次任務開始時重新確認。

## 1. 語言、背景與授權原則

- 與使用者溝通一律使用繁體中文；網站面向台灣使用者，主要內容使用繁體中文。變數、函式與元件名稱可用英文，專業術語可保留英文。
- 用清楚易懂的方式回報，不假設使用者熟悉程式設計；重要修改須說明原因與可能影響。
- 本站為元智大學機械工程學系學生火箭團隊「火大的元件（YZUME）」的成果展示與募款網站，服務企業、校友及一般支持者。
- 現有內容包含 2026 台灣盃火箭競賽學生 3K 組第三名、挑戰 2027 賽事，以及新臺幣 200,000 元募款目標。這些是目前網站內容，不代表已另行查證官方紀錄。
- 不得編造競賽成績、工程驗證結果、募款進度、贊助者或已完成的功能。背景資料與程式碼不同時，指出差異並確認需求，不自行補成事實。
- **使用者擁有網站設計及架構的最終決定權。** 本文件保護一般維護時的既有功能，不將現有風格與架構永久鎖定。使用者本次明確授權的新需求優先於本文件的舊規範，仍須遵守更高優先級的安全與執行限制。

## 2. 實際技術與開發指令

專案使用 npm，已有 `package-lock.json`。版本以 `package.json`、鎖定檔及安裝結果為準，不憑既有 Next.js 經驗推斷 API。

| 技術 | 目前宣告／用途 |
| --- | --- |
| Next.js | 16.3.4，App Router |
| React / React DOM | 19.2.8 |
| TypeScript | ^5，啟用 strict；`@/*` 指向專案根目錄 |
| Tailwind CSS | ^4，透過 `@tailwindcss/postcss` 與 CSS import 使用 |
| Framer Motion | ^13.2.0，火箭結構與捲動動畫 |
| ESLint | ^9，Next.js Core Web Vitals 與 TypeScript 規則 |

| 指令 | 用途 |
| --- | --- |
| `npm run dev` | 啟動 Next.js 開發伺服器 |
| `npm run build` | 正式建置，實際為 `next build --webpack` |
| `npm run start` | 啟動已建置的正式伺服器 |
| `npm run lint` | 執行 ESLint |
| `npx tsc --noEmit` | 使用現有 TypeScript 工具檢查型別；不是既有 npm script |

目前沒有 test 或 typecheck script，也未見自動化測試套件與測試檔。不得宣稱存在這些流程。不要任意改用其他套件管理器、重建鎖定檔或升級依賴；桌機與筆電依同一份鎖定檔與指令開發，需安裝時優先使用 `npm ci`。

修改 Next.js 程式前，先閱讀 `node_modules/next/dist/docs/` 中相關版本文件並留意棄用資訊，例如 `01-app/01-getting-started/` 下的 layouts-and-pages、server-and-client-components、css 與 images 指南。保留本文件頂端 Next.js 管理區塊及標記。

## 3. 專案地圖與路由

| 路徑 | 職責 |
| --- | --- |
| `app/layout.tsx` | 根版型、共用 Navbar / Footer、全站 metadata、`lang="zh-Hant"` |
| `app/page.tsx` | `/`：首頁、團隊定位與各頁入口 |
| `app/competition/page.tsx` | `/competition`：賽事簡介 |
| `app/about/page.tsx` | `/about`：團隊介紹 |
| `app/journey-2026/page.tsx` | `/journey-2026`：成果、工程展示、發射影片與火箭結構互動 |
| `app/budget/page.tsx` | `/budget`：2026 收支與比例 |
| `app/plan-2027/page.tsx` | `/plan-2027`：改進方向、募款目標與建議預算 |
| `components/` | `Navbar`、`Footer`、`PageHeader`、`PageLinks`、`RocketStructureSection` |
| `data/siteContent.ts` | 共用文案、導頁資料、經費陣列與官方捐款網址 |
| `data/rocketStructure.ts` | 火箭結構階段、工程規格與展示文案 |
| `app/globals.css` | Tailwind 入口、全域色彩、背景、字體與網格效果 |
| `public/images/`、`public/videos/` | 團隊及工程圖片、本機發射影片 |
| `app/icon.svg` | 網站圖示 |

- 目前為靜態內容資料搭配互動元件，未見 API route、資料庫、站內付款或即時募款進度系統。遙測畫面是工程成果圖片，不能當成網站即時遙測功能。
- 優先遵守既有 App Router 路由、metadata 與 Server / Client Component 分工。頁面與版型目前未加 `use client`；Navbar 與火箭互動元件使用 Client Component。
- 修改前閱讀相關檔案、匯入來源與使用位置；重用共用元件，避免重複程式碼，維持合理拆分與可維護性。
- 不為局部功能重寫整個專案，不在未理解依賴前刪檔，不擅增不必要套件。
- 根目錄 `CLAUDE.md` 目前僅以 `@AGENTS.md` 引用本文件。未見專案內 Skills、其他巢狀 AGENTS.md 或其他 AI 開發規範；未來若新增，工作前重新檢查適用範圍。

## 4. 視覺、互動與響應式維護

- 一般修改延續深色科技風格、火箭工程元素與橘色重點色；維持字體、間距、圓角、按鈕、網格背景及互動效果的一致性，避免無關的版面變動。明確授權的重新設計可全面調整。
- 現況以 Tailwind utility classes 搭配全域 CSS，主要使用 `sm`、`md`、`lg`、`xl` 斷點。不要假設存在額外 Tailwind 設定檔或設計系統。
- Navbar 有 sticky、捲動外觀變化、目前頁面提示與行動版開合選單；點擊導覽會關閉選單。保留既有 aria 屬性，並對新增互動提供語意、鍵盤操作及可見焦點；不要假設所有鍵盤與無障礙需求已完成。
- 桌機火箭展示以 Framer Motion 依捲動切換階段，包含零件聚焦、酬載船、航電標註，以及重組／發射／Logo 動畫。手機及偏好減少動態效果時使用靜態階段卡片；維護時保護兩種展示方式。
- 所有新增或修改 UI 都考慮桌機、手機、觸控與鍵盤，確認文字可讀、對比合理、長文不溢出、選單與按鈕可操作，避免不必要的水平捲動。
- 動畫須流暢且不妨礙閱讀與操作；注意手機效能與 `prefers-reduced-motion`。火箭展示已有 `useReducedMotion`，不代表全站 CSS 動畫及平滑捲動均已支援減少動態效果。

## 5. 內容、靜態資源與功能保護

一般維護不得擅自刪除或破壞既有路由與導覽、2026 成果、發射影片、零件分解動畫、工程與航電展示、2027 計畫、收支及募款資訊、官方捐款連結。使用者明確授權功能移除、頁面重新規劃或重構時，可依新需求調整；授權範圍外的重要內容仍須保留。

- 圖片位於 `public/images/`，以 `/images/...` 引用；工程素材分於 `rocket-structure/`、`payload-boat/`、`avionics/`。存在檔案不代表有被使用，移動或刪除前查找引用；保留實際檔名與大小寫，不因特殊副檔名擅自改名。
- 主要圖片使用 `next/image`，搭配 `fill`、`sizes` 與固定比例容器；首頁主圖使用 `preload`。火箭元件有載入失敗替代顯示，部分細節圖片使用 `unoptimized`，調整前先理解用途。
- 發射影片位於 `public/videos/rocket-launch-2026.mp4`，以原生 `<video controls playsInline preload="metadata">` 播放。不要無故改成自動播放或載入整段影片。
- 捐款網址集中於 `data/siteContent.ts` 的 `officialDonationUrl`，目前為 `https://donation.yzu.edu.tw/eform_add.aspx`。變更須有使用者依據，並檢查 Navbar、Footer、首頁與跨頁連結；外開連結保留合適的 `rel`。
- 經費資料部分集中於 `data/siteContent.ts`，部分總額與說明直接寫在頁面。修改金額須核對明細、總額、比例及跨頁文案，不將 2026 實際收支與 2027 建議預算混為一談，也不將募款目標當成已募金額。
- 網站上的賽事主辦、規則與工程性能說明是現有文案；若要更新或對外證實，需依官方資料或團隊提供的證據核對，不能以程式碼取代事實查證。

## 6. 重大改版與重構

1. 先檢查 Git 狀態、目前架構、依賴及受影響功能，確認使用者授權的修改與移除範圍。
2. 提出合理的修改計畫、風險及驗證方式，優先建議使用新的 Git 分支；建立或切換分支須符合當次授權。
3. 可依明確需求重構頁面、元件、動畫、視覺與路由，不因本文件記載舊設計而拒絕。路由異動須一併評估導覽、外部既有連結及必要轉址。
4. 盡可能分階段完成與驗證，避免一次混入無關改動；不得自行移除未授權刪除的重要內容。
5. 完成後檢查本文件是否過時，建議同步更新；若當次範圍允許，更新與實作不符的規則。

## 7. Git、GitHub 與部署

- 重大修改前執行 `git status` 並確認目前分支；辨識尚未提交的使用者變更，不擅自覆蓋、還原或丟棄。
- 目前設定 GitHub `origin`；遠端與分支可能改變，每次任務實查，不將某個工作分支寫成永久預設。
- 大型改版建議獨立分支。未經授權不得執行 `git reset --hard`、刪除分支、強制推送或其他破壞性操作，也不得擅自覆蓋遠端儲存庫。
- 未經使用者明確授權不得自動 `git push`；Commit 依任務授權執行並使用清楚的提交訊息。
- 不提交 `.env`、密碼、Token 或其他敏感資料；不在回報或紀錄中洩漏機密。留意 `.gitignore` 已忽略 `.env*`、`.next/`、`node_modules/` 與 `.vercel` 等項目。
- 桌機與筆電維持一致的 Git 工作流程：開始前檢查分支與變更，同步前先處理本機修改與可能衝突，不以強推或硬重設解決環境差異。
- **Vercel 部署狀態待確認：** README 是 create-next-app 通用說明；未見可確認實際 Vercel 專案連線、正式網域、自動部署分支或 GitHub Actions 的專案設定。不能據此宣稱已部署或推送必定觸發部署。
- 尊重既有 GitHub / Vercel 流程；程式修改須考慮正式建置相容性。未經授權不得正式部署、變更部署設定或環境變數；可能影響正式網站時須明確告知。

## 8. 程式品質、效能與驗證

每次程式修改依序確認範圍、閱讀相關元件及依賴、進行必要修改、檢查型別與潛在錯誤，再依實際指令及影響範圍驗證。

- 程式修改執行適當的 `npm run lint` 與型別檢查；頁面、路由、依賴、設定或較大修改視範圍執行 `npm run build`，並檢查受影響及共用功能。
- UI 修改須依範圍實際驗證桌機與手機、導覽及官方捐款入口；動畫修改另確認捲動階段、重返階段、靜態卡片及減少動態效果模式。建置通過不等同瀏覽器互動驗證通過。
- 純文件修改以內容核對、`git diff --check` 與差異範圍檢查為主，無須為文件變更啟動網站或執行建置。
- 沒有實際執行的測試不得稱為通過。報告檢查指令、結果、未驗證項目；失敗時說明已知原因與未解問題，無法判定原因時如實說明，不宣稱網站完全正常。
- 避免大型無必要依賴；合理使用圖片尺寸與載入策略，注意影片、動畫成本及版面位移，降低不必要的 React 重新渲染。不要為微小效能提升犧牲可讀性或破壞功能。

## 9. 完成後回報格式

使用以下格式，依任務簡潔說明：

**本次完成內容**

- 新增或修改內容、目的；重要修改的原因與影響。

**修改的檔案**

- 主要檔案及用途。

**測試結果**

- 實際執行的檢查與結果，明確區分未執行項目。

**注意事項**

- 可能影響、未驗證項目、待確認資訊或尚未解決的問題；沒有則註明。

**Git 狀態**

- 目前分支與是否存在未提交修改，說明是否 Commit / Push；不得未經授權自動推送。
