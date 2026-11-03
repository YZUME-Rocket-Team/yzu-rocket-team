export type PurchaseItem = {
  name: string;
  source: string;
  quantity: string;
  unitPrice: string | null;
  amount: number | null;
  status?: "sponsored" | "pending";
};

export type PurchaseGroup = {
  id: string;
  label: string;
  originalSubtotal: number;
  subtotalNeedsReview?: boolean;
  note?: string;
  items: readonly PurchaseItem[];
};

// Team-provided Planned Purchase Items (TBD), separate from actual expenses.
// Strings preserve the original unit-price precision (e.g. 1.30 and 212.50).
export const plannedPurchaseGroups: readonly PurchaseGroup[] = [
  {
    id: "structure",
    label: "結構組",
    originalSubtotal: 7502,
    subtotalNeedsReview: true,
    items: [
      { name: "火箭主體（PVC管）", source: "聯義水電材料行", quantity: "1根", unitPrice: "1072", amount: 1072 },
      { name: "螺絲", source: "昆聖螺絲", quantity: "60根", unitPrice: "1.30", amount: 78 },
      { name: "螺帽", source: "昆聖螺絲", quantity: "50顆", unitPrice: "2", amount: 100 },
      { name: "水管管蓋", source: "聯義水電材料行", quantity: "1個", unitPrice: "24", amount: 24 },
      { name: "鋁塊原料", source: "網購", quantity: "1塊", unitPrice: "368", amount: 368 },
      { name: "AB膠", source: "網購", quantity: "1組", unitPrice: "350", amount: 350 },
      { name: "碳纖維尾翼", source: "瑞潔科技電子商務社", quantity: "4片", unitPrice: "950", amount: 3800 },
      { name: "3D列印耗材", source: "SpiderMaker官網", quantity: "1捲", unitPrice: "690", amount: 690 },
      { name: "鋁板", source: "贊助", quantity: "2片", unitPrice: null, amount: null, status: "sponsored" },
      { name: "拉帽", source: "昆聖螺絲", quantity: "25顆", unitPrice: "1.20", amount: 30 },
      { name: "玻璃纖維", source: "贊助", quantity: "1卷", unitPrice: null, amount: null, status: "sponsored" },
      { name: "鋁圓棒", source: "台興機器五金行", quantity: "2根", unitPrice: "30", amount: 60 },
      { name: "噴漆", source: "日耀鋁門窗工程行", quantity: "3瓶", unitPrice: "200", amount: 600 },
      { name: "電腦割字", source: "冠美廣告社", quantity: "22字", unitPrice: "15", amount: 330 },
      { name: "海報輸出", source: "亮美印刷企業社", quantity: "1張", unitPrice: "220", amount: 220 },
    ],
  },
  {
    id: "payload-recovery",
    label: "酬載組、回收組",
    originalSubtotal: 7884,
    items: [
      { name: "測試用降落傘", source: "網購", quantity: "1組", unitPrice: "610", amount: 610 },
      { name: "實飛降落傘", source: "網購", quantity: "2組", unitPrice: "2500", amount: 5000 },
      { name: "傘繩", source: "網購", quantity: "3捆", unitPrice: "159", amount: 477 },
      { name: "螺絲、螺帽", source: "昆聖螺絲", quantity: "30根", unitPrice: "1.30", amount: 39 },
      { name: "3D列印耗材", source: "SpiderMaker官網", quantity: "1捲", unitPrice: "690", amount: 690 },
      { name: "雞蛋", source: "全聯福利中心", quantity: "2盒", unitPrice: "52", amount: 104 },
      { name: "壓縮彈簧", source: "台灣三住股份有限公司", quantity: "10根", unitPrice: "30", amount: 300 },
      { name: "CO2小鋼瓶", source: "網購", quantity: "20支", unitPrice: "25", amount: 500 },
      { name: "O-Ring", source: "橡膠行", quantity: "5個", unitPrice: "20", amount: 100 },
      { name: "N20馬達", source: "網購", quantity: "2顆", unitPrice: "32", amount: 64 },
    ],
  },
  {
    id: "avionics",
    label: "航電組",
    originalSubtotal: 7409,
    note: "氣體感測器（TBD）的數量、單價與金額尚未確定，未計入已列價品項加總。",
    items: [
      { name: "18650鋰電池", source: "網購", quantity: "2個", unitPrice: "220", amount: 440 },
      { name: "Ublox NEO M8N 高精度GPS模組", source: "米羅科技有限公司", quantity: "2組", unitPrice: "920", amount: 1840 },
      { name: "SD卡32G", source: "全國電子", quantity: "2張", unitPrice: "169", amount: 338 },
      { name: "SD卡模組", source: "大洋國際電子有限公司", quantity: "2組", unitPrice: "22", amount: 44 },
      { name: "BMP180氣壓感測模組", source: "大洋國際電子有限公司", quantity: "1組", unitPrice: "100", amount: 100 },
      { name: "UART USB to TTL轉接板", source: "米羅科技有限公司", quantity: "1組", unitPrice: "113", amount: 113 },
      { name: "3D列印耗材", source: "SpiderMaker官網", quantity: "1捲", unitPrice: "300", amount: 300 },
      { name: "溫度傳感器", source: "米羅科技有限公司", quantity: "2個", unitPrice: "65", amount: 130 },
      { name: "Mega主版", source: "米羅科技有限公司", quantity: "2個", unitPrice: "480", amount: 960 },
      { name: "Lora SX1278", source: "米羅科技有限公司", quantity: "2個", unitPrice: "620", amount: 1240 },
      { name: "AMB82-mini", source: "米羅科技有限公司", quantity: "1個", unitPrice: "799", amount: 799 },
      { name: "elrs", source: "網購", quantity: "2個", unitPrice: "212.50", amount: 425 },
      { name: "鏡頭", source: "網購", quantity: "2個", unitPrice: "340", amount: 680 },
      { name: "氣體感測器（TBD）", source: "尚未確定", quantity: "數量未定", unitPrice: null, amount: null, status: "pending" },
    ],
  },
];
