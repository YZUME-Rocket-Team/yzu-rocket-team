# 2026 火箭 3D 展示

展示位於 `/journey-2026` 原有火箭結構介紹之前，載入 `public/models/Rocket_Web.glb`。原有圖文、酬載小船、航電展示及影片均保留，GLB 檔案不需修改。

## 元件與套件

- `components/RocketModelSection.tsx`：Client Component，管理接近畫面時載入、sticky 區域、捲動、鍵盤滑桿及錯誤提示。
- `components/RocketModelSection.module.css`：展示高度、短螢幕及減少動態效果模式。
- `components/rocket-model/viewer.ts`：延後匯入的 Three.js renderer、模型載入、照明、攝影機與資源釋放。
- `components/rocket-model/animation.ts`：單一 AnimationMixer，同步定位所有動畫 clips。
- 執行依賴：`three@0.186.1`；開發型別依賴：`@types/three@0.186.0`。不需要 React Three Fiber 或額外的動畫套件。

頁面仍為 Server Component。Three.js 僅在 client effect 內、展示區接近視窗時動態匯入。WebGL renderer 不會在 SSR 階段建立。

## 已核對的模型結構

GLB 為 glTF 2.0，大小 5,024,976 bytes，包含 90 個 mesh、1 個金屬材質及 8 段動畫；沒有外部貼圖或壓縮解碼器需求。

| Clip | 控制節點 |
| --- | --- |
| `GROUP_ConnectingRing動作` | `GROUP_ConnectingRing` |
| `GROUP_FinAssembly動作` | `GROUP_FinAssembly` |
| `GROUP_MotorExterior動作` | `GROUP_MotorExterior` |
| `GROUP_MotorTube動作` | `GROUP_MotorTube` |
| `GROUP_NoseCone動作.001` | `GROUP_NoseCone` |
| `GROUP_PayloadInternal動作` | `GROUP_PayloadInternal` |
| `GROUP_PayloadTube動作` | `GROUP_PayloadTube` |
| `GROUP_TailStructure動作` | `GROUP_TailStructure` |

每段均為 288 個 LINEAR translation 關鍵幀，時間為 1/24 秒至 12 秒。第一幀與最後一幀為完整組裝，6 秒時為完整分解。

程式從載入結果建立所有 actions，不依名稱挑選單一 clip。Actions 保持 paused，由相同時間值設定 `action.time`，再呼叫 `mixer.update(0)` 評估固定姿態。這樣在抵達最後一幀後仍可向上捲動倒轉，不會因 LoopOnce 完成或 LoopRepeat 回繞而跳動。沒有使用時鐘或持續 render loop。

| 展示捲動進度 | GLB 時間 |
| --- | --- |
| 0–8% | 第一幀，保留組裝姿態 |
| 8–46% | 第一幀 → 6 秒，逐步分解 |
| 46–62% | 6 秒，停留檢視 |
| 62–94% | 6 → 12 秒，重新組裝 |
| 94–100% | 最後一幀，保留組裝姿態 |

如更換模型，需重新核對 clip 內容、完整分解的時間（目前 `animation.ts` 中為 6 秒），以及原始朝向（目前為 -Z）。攝影機以完整時間軸的所有關鍵幀界限計算取景，並在容器尺寸改變時調整，避免只依組裝狀態取景而裁切分解零件。此界限策略適用於目前的線性位移動畫；若換成旋轉、骨架或曲線動畫，須重新檢查中間姿態。

## 效能與降級

- 接近視窗 600px 時才下載 Three.js 與模型；滑動更新以 requestAnimationFrame 合併，只在展示可見且進度改變時繪製。
- 像素比例上限 1.5，不使用陰影、後製、粒子或持續播放。
- 本機產生一次柔和環境光，讓 GLB 金屬材質可讀，不增加外部貼圖下載。
- 減少動態效果模式取消 sticky 長捲動區及捲動控制，預設顯示組裝模型；使用者仍可主動用滑桿選擇靜態姿態。
- WebGL 2 不可用、context lost 或下載失敗時顯示靜態圖片與重試按鈕，縮短區域；原有介紹可繼續閱讀。
- 離開頁面或重試時取消下載、移除 observers／事件／待執行的動畫幀，停止並釋放 mixer、geometry、material、texture、環境光 render target 及 renderer。解析完成前已離開的模型結果也會釋放。

## 本機確認方式

1. 使用 `npm ci`，接著執行 `npm run dev`，開啟 `http://localhost:3000/journey-2026`。PowerShell 若封鎖 `npm.ps1`，可使用 `npm.cmd`。
2. 向下捲至「從整體，看見每一個結構」，確認先顯示完整火箭，載入時有提示。
3. 持續向下捲，確認各群組逐步分解、中段停留、最後重新組裝；停止捲動時模型也應停止。
4. 從結尾向上捲回中段、起點，確認姿態自然倒轉。來回重複，確認不跳回自動播放。
5. 點選滑桿，以方向鍵、Home／End 選擇姿態；捲動會再次依頁面位置控制模型。
6. 使用瀏覽器裝置模擬檢查桌機、平板、手機直向及橫向；確認所有零件完整顯示、沒有水平捲動，導覽與捐款入口仍可用。
7. 在瀏覽器開發工具模擬 `prefers-reduced-motion: reduce`，確認取消長捲動區、捲動不改變模型姿態，滑桿仍可主動選擇姿態。
8. 透過開發工具封鎖 `/models/Rocket_Web.glb` 後重新整理，確認錯誤提示及原有內容；解除封鎖後按「重新載入」。WebGL 無法建立時也應呈現靜態替代。
9. 導覽離開並返回頁面數次，確認只有一個 3D canvas，且不出現 WebGL context 或 React 錯誤。

標準檢查：`npm run lint`、`npx tsc --noEmit`、`npm run build`。

參考：[Three.js AnimationAction](https://threejs.org/docs/pages/AnimationAction.html)、[資源清理](https://threejs.org/manual/en/cleanup.html)；Next.js 相容性以本機 `node_modules/next/dist/docs/` 的 Client Components、Lazy Loading 與 CSS 文件為準。
