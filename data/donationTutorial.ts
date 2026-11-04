export type DonationTutorialStep = {
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  copyText?: string;
};

export const donationPurpose = "指定元智大學機械工程學系火箭隊參與台灣盃火箭競賽之研發、製作、測試及參賽相關經費專用。";

// 保留使用者提供的實際檔名（目前為 .png.png）；替換截圖時同步更新路徑與尺寸。
export const donationTutorialSteps: readonly DonationTutorialStep[] = [
  {
    title: "進入元智大學捐款網站",
    description: "進入元智大學官方捐款網站，準備開始捐款。",
    image: { src: "/images/donation-guide/step-1-entry.png.png", alt: "元智大學官方捐款網站入口截圖", width: 3838, height: 2029 },
  },
  {
    title: "選擇指定捐款",
    description: `在捐款類別勾選「指定捐款」，並於指定用途輸入「${donationPurpose}」。`,
    image: { src: "/images/donation-guide/donation-step-02.png.png", alt: "選擇指定捐款與填寫指定用途的教學截圖", width: 841, height: 277 },
    copyText: donationPurpose,
  },
  {
    title: "選擇捐款方式及金額",
    description: "選擇適合的捐款方式，並選擇預設金額或自行輸入捐款金額。",
    image: { src: "/images/donation-guide/step-3-method-amount.png.png", alt: "選擇捐款方式與捐款金額的教學截圖", width: 837, height: 436 },
  },
  {
    title: "填寫基本資料",
    description: "依照官方表單填寫捐款人基本資料、聯絡資訊及收據資料。",
    image: { src: "/images/donation-guide/step-4-donor-info.png.png", alt: "填寫捐款人基本資料、聯絡與收據資訊的教學截圖", width: 1918, height: 1783 },
  },
  {
    title: "確認並送出",
    description: "確認所有捐款資料正確後，點擊「確認送出」，並依所選捐款方式完成後續程序。",
    image: { src: "/images/donation-guide/step-5-confirm.png.png", alt: "確認捐款資料並送出的教學截圖", width: 1939, height: 1885 },
  },
];
