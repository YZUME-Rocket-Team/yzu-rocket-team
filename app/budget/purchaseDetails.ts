export type PurchaseItem = {
  name: string;
  source: string;
  quantity: string;
  unitPrice: string | null;
  amount: number | null;
  status?: "sponsored";
};

export type PurchaseGroup = {
  id: string;
  label: string;
  originalSubtotal: number;
  subtotalNeedsReview?: boolean;
  note?: string;
  items: readonly PurchaseItem[];
};

// Source: data/source/ROCKET BOM333.xlsx; imported as static data, not read at runtime.
// Unit-price strings preserve the source decimals. Sponsored amounts remain numeric zero.
export const purchaseGroups: readonly PurchaseGroup[] = [
  {
    id: "structure",
    label: "結構組",
    originalSubtotal: 8413,
    items: [
      { name: "火箭主體（PVC管）", source: "聯義水電材料行", quantity: "1根", unitPrice: "1270", amount: 1270 },
      { name: "螺絲", source: "昆聖螺絲", quantity: "60根", unitPrice: "1.3", amount: 78 },
      { name: "螺帽", source: "昆聖螺絲", quantity: "50顆", unitPrice: "2", amount: 100 },
      { name: "水管管蓋", source: "聯義水電材料行", quantity: "1個", unitPrice: "24", amount: 24 },
      { name: "鋁塊原料", source: "網購", quantity: "1塊", unitPrice: "368", amount: 368 },
      { name: "AB膠", source: "網購", quantity: "1組", unitPrice: "350", amount: 350 },
      { name: "碳纖維尾翼", source: "瑞潔科技電子商務社", quantity: "4片", unitPrice: "990", amount: 3960 },
      { name: "3D列印耗材", source: "SpiderMaker 官網", quantity: "1捲", unitPrice: "690", amount: 690 },
      { name: "鋁板", source: "贊助", quantity: "2片", unitPrice: "0", amount: 0, status: "sponsored" },
      { name: "拉帽", source: "昆聖螺絲", quantity: "25顆", unitPrice: "1.2", amount: 30 },
      { name: "玻璃纖維", source: "贊助", quantity: "1卷", unitPrice: "0", amount: 0, status: "sponsored" },
      { name: "鋁圓棒", source: "台興機器五金行", quantity: "2根", unitPrice: "30", amount: 60 },
      { name: "噴漆", source: "日耀鋁門窗工程行", quantity: "3瓶", unitPrice: "200", amount: 600 },
      { name: "電腦割字", source: "冠美廣告社", quantity: "22字", unitPrice: "15", amount: 330 },
      { name: "海報輸出", source: "亮美印刷企業社", quantity: "1張", unitPrice: "220", amount: 220 },
      { name: "電火布、紙膠帶", source: "台一百貨有限公司", quantity: "1組", unitPrice: "70", amount: 70 },
      { name: "螺絲、螺帽", source: "昆聖螺絲有限公司", quantity: "1組", unitPrice: "263", amount: 263 },
    ],
  },
  {
    id: "payload-recovery",
    label: "酬載組、回收組",
    originalSubtotal: 22135,
    items: [
      { name: "引導傘、主傘", source: "網購", quantity: "1組", unitPrice: "4391", amount: 4391 },
      { name: "BEC 5V 12V", source: "阿信模型工作坊", quantity: "1個", unitPrice: "360", amount: 360 },
      { name: "傘繩", source: "網購", quantity: "1捆", unitPrice: "1729", amount: 1729 },
      { name: "螺絲、螺帽", source: "昆聖螺絲", quantity: "30根", unitPrice: "1.3", amount: 39 },
      { name: "3D列印耗材", source: "SpiderMaker 官網", quantity: "1捲", unitPrice: "690", amount: 690 },
      { name: "接線端子、熱縮套、Ublox NEOM8N", source: "新加坡商蝦皮娛樂電商有限公司台灣分公司", quantity: "1組", unitPrice: "1090", amount: 1090 },
      { name: "彈簧", source: "三興彈簧工業股份有限公司", quantity: "1組", unitPrice: "914", amount: 914 },
      { name: "CO2小鋼瓶", source: "網購", quantity: "20支", unitPrice: "25", amount: 500 },
      { name: "O-Ring", source: "橡膠行", quantity: "5個", unitPrice: "20", amount: 100 },
      { name: "915接收機", source: "網購", quantity: "1組", unitPrice: "450", amount: 450 },
      { name: "916高頻頭", source: "網購", quantity: "1組", unitPrice: "1200", amount: 1200 },
      { name: "DSHOT6004 電調", source: "新加坡商蝦皮娛樂電商有限公司台灣分公司", quantity: "1個", unitPrice: "1146", amount: 1146 },
      { name: "無線傳輸模組", source: "台灣務物聯科技有限公司", quantity: "1組", unitPrice: "1320", amount: 1320 },
      { name: "Skywalker", source: "史巴克貿易有限公司", quantity: "1個", unitPrice: "680", amount: 680 },
      { name: "ESP32", source: "至盛科技有限公司", quantity: "1個", unitPrice: "380", amount: 380 },
      { name: "海水染色劑", source: "神豬海底漫遊潛水概念館", quantity: "1瓶", unitPrice: "1440", amount: 1440 },
      { name: "O-ring", source: "和祥空油壓五金有限公司", quantity: "1組", unitPrice: "368", amount: 368 },
      { name: "酬載船耗材", source: "網購", quantity: "1組", unitPrice: "2300", amount: 2300 },
      { name: "彈性合頁1.5吋/2.5吋、N20減速馬達/蝸桿馬達、SG90伺服馬達", source: "網購", quantity: "1批", unitPrice: "1515", amount: 1515 },
      { name: "ESP32+接頭＋搖頭＋電容", source: "健新電子材料行", quantity: "1批", unitPrice: "825", amount: 825 },
      { name: "悅氏礦泉水＋鋁合金扣附螺絲", source: "小北百貨", quantity: "1", unitPrice: "98", amount: 98 },
      { name: "傘繩", source: "新加坡商蝦皮娛樂電商有限公司台灣分公司", quantity: "1組", unitPrice: "600", amount: 600 },
    ],
  },
  {
    id: "avionics",
    label: "航電組",
    originalSubtotal: 10471,
    items: [
      { name: "18650鋰電池", source: "網購", quantity: "2個", unitPrice: "220", amount: 440 },
      { name: "Ublox NEO M8N 高精度GPS模組", source: "米羅科技有限公司", quantity: "2組", unitPrice: "920", amount: 1840 },
      { name: "SD卡 32G", source: "全國電子", quantity: "2張", unitPrice: "169", amount: 338 },
      { name: "SD卡模組", source: "大洋國際電子有限公司", quantity: "2組", unitPrice: "22", amount: 44 },
      { name: "BMP180 氣壓感測模組", source: "大洋國際電子有限公司", quantity: "1組", unitPrice: "100", amount: 100 },
      { name: "UART USB to TTL 轉接板", source: "米羅科技有限公司", quantity: "1組", unitPrice: "113", amount: 113 },
      { name: "3D列印耗材", source: "SpiderMaker 官網", quantity: "1捲", unitPrice: "300", amount: 300 },
      { name: "讀寫卡模組、無線傳輸模組、晶片開發板", source: "米羅科技有限公司", quantity: "1組", unitPrice: "1870", amount: 1870 },
      { name: "Mega主版", source: "米羅科技有限公司", quantity: "2個", unitPrice: "480", amount: 960 },
      { name: "Lora SX1278", source: "米羅科技有限公司", quantity: "2個", unitPrice: "620", amount: 1240 },
      { name: "AMB82-mini", source: "米羅科技有限公司", quantity: "1個", unitPrice: "859", amount: 859 },
      { name: "鏡頭", source: "網購", quantity: "1個", unitPrice: "870", amount: 870 },
      { name: "五金類", source: "立特佳五金百貨商店", quantity: "1組", unitPrice: "897", amount: 897 },
      { name: "E22-900M30s", source: "新加坡商蝦皮娛樂電商有限公司台灣分公司", quantity: "1組", unitPrice: "600", amount: 600 },
    ],
  },
];
