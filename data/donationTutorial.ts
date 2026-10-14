export type DonationTutorialStep = {
  title: string;
  description: string;
  image: { src: string; alt: string } | null;
};

// 將核對過且已遮蔽個資的截圖放進 public/images/donation-guide/，
// 再將 image 改為 { src: "/images/donation-guide/step-1.png", alt: "截圖說明" }。
export const donationTutorialSteps: readonly DonationTutorialStep[] = [
  {
    title: "進入元智大學官方募款平台",
    description: "透過官方募款連結開啟元智大學平台。以下為暫定教學，實際操作請以官方平台當下的說明為準。",
    image: null,
  },
  {
    title: "選擇正確的指定捐款用途",
    description: "捐款前，請先確認所選用途能支持火大的元件團隊。確切的指定用途名稱與選擇方式仍待團隊確認，若不確定，請先向團隊或校方詢問。",
    image: null,
  },
  {
    title: "填寫捐款資訊",
    description: "依官方平台的提示填寫所需捐款資訊，並確認資料正確。詳細欄位與操作說明待核對後補上。",
    image: null,
  },
  {
    title: "確認資料並完成捐款",
    description: "送出前再次核對捐款用途、金額與所填資料，依官方平台的指示完成流程。是否成功請以官方平台的確認結果為準。",
    image: null,
  },
];
