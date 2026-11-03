# 2027 計畫頁與經費圖表交接

## 接續方式與限制

- 專案：`C:\Users\aliac\OneDrive\桌面\huoda-deploy-2026`。
- 先讀根目錄 `AGENTS.md`；全程使用繁體中文。修改 Next.js 前讀已安裝版本的 `node_modules/next/dist/docs/`。
- 本次對話所有使用者要求均已完成，目前沒有尚待實作的需求。請先理解現況，再依使用者的新指示工作，不自行擴大改版。
- 使用者偏好直接實作、局部修改，不要任意重構其他區塊或反覆要求確認。
- 未授權 Commit、Push、部署、切換分支或丟棄修改。

## Git 與環境

- 交接時分支：`feature/budget-redesign`；工作目錄有許多未提交與未追蹤檔案，開始前重新執行 `git status --short`。
- 原先就有的經費頁改版、`.agents/`、`skills-lock.json` 與設計參考圖均保留，不能當成可清理的雜檔。
- tracked 修改為 `app/budget/page.tsx`、`app/plan-2027/page.tsx`。下述新增元件與資料檔大多尚未追蹤；只看 `git diff --stat` 會漏掉這些內容。
- 實際已安裝 Next.js 為 16.4.2，與 AGENTS.md 技術表中的 16.3.4 不同；每次以 package.json、鎖定檔與安裝結果確認，不任意升級依賴。
- 使用 npm：`npm run lint`、`npx tsc --noEmit`、`npm run build`（`next build --webpack`）。沒有新增測試框架或 npm test script。
- 此工作環境沙箱內 Build 曾因 `.next` 建目錄發生 EPERM；相同本機建置經工具沙箱外執行後通過，未改部署設定。
- Build 會重新產生 `.next/types`，不要同時跑獨立 tsc，避免 TS6053 暫時找不到生成檔；Build 結束再跑 tsc。
- `localhost:3000` 曾是使用者既有開發伺服器，勿擅自關閉。曾使用的本機正式版 127.0.0.1:3002 已停止。伺服器狀態請重新檢查。

## 已完成：2027 計畫頁重新設計

- 主要參考圖實際位於 `public/images/design-references/plan-2027-redesign-reference.png`，不是根目錄 design-references。
- 已完成真實 React 響應式首屏、2026 → 2027 介紹、四大升級卡片、建議預算、官方時程、底部圖片導覽；沒有把整張示意圖當網頁背景。
- 使用團隊現有發射與工程照片。回收系統圖片明確標為示意；沒有假造夕陽發射塔、降落傘實測或測試設備照片。
- 保留四大改進方向及七項預算，總額 NT$200,000，比例為 25%、17.5%、10%、10%、17.5%、15%、5%。
- 2027 金額沿用 `data/siteContent.ts` 的 fundingBudget2027；`data/plan2027.ts` 從原金額計算 value、percentage、offset，不能換成 2026 收支。
- `app/plan-2027/page.tsx` 保持 Server Component；CSS 限定在 `plan.module.css`。其他頁面的視覺不做連帶改版。
- `PlanReveal.tsx` 提供一次性進場效果與 reduced motion 支援；`PlanIcon.tsx` 為頁面圖示。
- 素材可再補團隊實際降落傘展開、地面測試及夕陽發射照片，但目前沒有未完成的素材替換任務。

## 已完成：三個經費圖表共用互動

- `app/budget/BudgetChartCard.tsx` 同時服務 2026 收入、2026 支出與 2027 建議預算。
- `embedded` 僅控制 2027 嵌入版型；互動不再依 embedded 分成不同邏輯。
- `app/budget/budget.module.css` 提供共同圓環與明細樣式；2027 的左側標題及募款目標卡片保留。
- hoveredIndex、focusedIndex、lockedIndex 共用狀態，activeIndex 優先順序為 hover → focus → locked。
- 明細或圓環預覽會同步高亮對應項目，其他整列文字、金額、百分比及圓環區塊一起暗化。
- 暗化使用 opacity 0.55、brightness 0.75，240ms 過渡；reduced motion 時停用過渡。
- 圓環透明 hit arc 與分類列皆可點擊鎖定，再次點擊同項取消。toggleSelection 會清除 hover 與 focus，避免取消後殘留暗化。
- 滑鼠離開 cardContent 會清除三種狀態；觸控離開不清除點擊選取。Esc 也能清除。
- 維持「火箭製作」分類展開與採購彈窗。相關檔案為 PurchaseDetailsModal.tsx、PurchaseDetailsModal.module.css、purchaseDetails.ts，不要因共用圖表而移除。

## 已完成：官方行事曆資料與日期追蹤

- `data/plan2027.ts`：18 項活動、7 個主要時間軸節點、官方來源與核對日期集中管理。
- 官方來源： https://www.tasa.org.tw/zh-TW/events/detail/20ca1542-ba86-4900-9b59b12361623e33
- 資料曾於 2026/11/02 實際核對全部 18 項日期；不是持續自動同步 TASA。後續若要更新官方事實，應重新查核，不把交接內容當最新公告。
- 決賽暫定 2027/07/23–07/25；備援暫定 07/30–08/01。原本暫定資訊與決賽視覺強調保留。
- `CompetitionCalendar.tsx` 為 Client Component；原生 details/summary 展開收合保留。
- `lib/calendarDate.ts`：getTaipeiDate、getCalendarStatus、millisecondsToNextTaipeiDay。
- 狀態依活動真正 start/end 判斷，包含起訖日；單日活動以 start 當 end。每項獨立判斷，可同時高亮重疊活動。
- 時間軸即使顯示「截止日」，也依該活動完整期間判斷進行中，不是只比較畫面顯示的截止那一天。
- `useTaipeiDate.ts` 使用 useSyncExternalStore；server snapshot 與首次 hydration 都為 null，避免日期 SSR mismatch，之後以訪客裝置時鐘換算 Asia/Taipei。
- 台灣午夜定時更新，另每分鐘、分頁 visibilitychange、focus、pageshow 校正；不需重新部署。
- 目前只顯示「進行中」與「已結束」badge；upcoming 狀態仍存在並保留資料屬性，但不顯示「尚未開始」。空 statusLabels 以 :empty 隱藏，不占空白。
- 進行中卡片與對應時間軸節點橘色柔光；已結束及未開始不刻意暗化。

## 額外虛線 badge：保留使用者指定原文

由活動資料的 `annotation?: string` 控制，完整清單與已有時間軸節點共用，不硬寫在 JSX：

| 編號 | event id | annotation |
| --- | --- | --- |
| 03 | mdr | 計畫書DeadLine |
| 06 | shortlist | 10隊晉級複賽 |
| 08 | first-design | 報告DeadLine |
| 10 | second-design | 報告DeadLine |
| 12 | 3k-review | 在逢甲線下報告&測驗 |
| 14 | finalists | 7隊晉級決賽 |
| 15 | frr-submission | 報告DeadLine |
| 17 | final | 我們在旭海升空! |

- 虛線 badge 共用 milestoneImportance；文字是 `var(--plan-accent)`（#ff8a19），虛線邊框保留。
- badge 靠左對齊，與完整行事曆上方活動名稱左邊緣一致。statusLabels 使用直向 flex，避免進行中 badge 把 annotation 擠到右側。
- 上述標註為使用者提供的額外說明，不是改寫官方活動名稱。

## 最新完成的要求：七項活動文字橘色

- 只修改 `app/plan-2027/plan.module.css`，擴充第 17 項原有文字色規則。
- 對 03、06、08、10、12、14、15，日期、h3 活動名稱及其「官方暫定」統一使用與第 17 項相同的 #ffb36a。
- CSS 以 `.calendarList li:is([data-featured="true"], [data-event-id=...]) :is(h3, .eventDate, .eventDate .tentative)` 限定。
- 不要把這七項設成 data-featured=true；那會誤套第 17 項圓圈、背景與邊框。七項編號圓圈維持原色，其他活動與時間軸文字不變。
- 活動文字 #ffb36a 與額外虛線 badge 文字 #ff8a19 是兩個用途不同的既定顏色，不要混淆。

## 實際驗證與限制

- 最新修改的 `npm run lint`、`npx tsc --noEmit`、`npm run build`、`git diff --check` 均已通過。
- 曾以 Node 斷言實測：2026/11/03 registration + mdr；2026/11/15 mdr + workshop；2027/07/24 final；無活動日期不高亮；全部 18 項起訖當日；台灣午夜前後換日及排程。這是一次性驗證，沒有新增 npm test script 或永久測試套件。
- 行事曆正式版曾驗證無 hydration 警告、18 項保留、兩個重疊活動與節點同步高亮。
- 桌機及 320/390/768/1280px 曾檢查無水平溢出、鍵盤展開收合正常。最新文字色在桌機與 390px 核對七項與第 17 項 computed color 完全一致，編號圓圈未變。
- 三個圖表曾實際驗證明細／圓環選取與取消、離開復原、390px 版面，以及既有支出分類展開。
- reduced motion 有程式／CSS 支援，但未做該模式瀏覽器模擬或實體手機幀率量測，不能宣稱已實機驗證。
- 開發版 HMR 期間曾出現舊解析／hydration 訊息，不要把歷史 console 當成最終正式版錯誤；若有疑慮，啟動新正式版分頁重新驗證。
- 使用過 website-ui-enhancer、animate、animation-performance Skills。局部文字修正不需重做設計或新增套件。

## 預覽產物

截圖均在：`C:\Users\aliac\.codex\visualizations\2026\11\02\01a19c53-5d71-7d72-b383-fd991ecae9a4`，不在 public：

- `plan-2027-desktop-full.jpg`、`plan-2027-mobile-full.jpg`：早期整頁改版預覽，行事曆未包含後續全部調整。
- `unified-budget-interaction.jpg`：共用圖表互動預覽。
- `calendar-auto-date-desktop.jpg`：自動日期功能早期預覽。
- `calendar-badges-orange.jpg`：移除未開始標籤與虛線 badge 調整預覽。
- `calendar-orange-event-text.jpg`：最新七項活動文字色調整的局部預覽。

截圖是歷史狀態；程式現況與使用者後續指示優先，不要把舊截圖還原回網站。
