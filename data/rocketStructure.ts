export type StructurePoint = {
  number?: string;
  title: string;
  description: string;
};

export type StructureStage = {
  stage: string;
  title: string;
  eyebrow?: string;
  introduction?: string;
  conclusion?: string;
  points: StructurePoint[];
  image: string;
  imageAlt: string;
};

export const structureStats = [
  { label: "MAX ACCELERATION", value: "9G" },
  { label: "MAX SPEED", value: "MACH 0.9" },
  { label: "DESIGN FOCUS", value: "抗衝擊・抗震動・結構可靠度" },
] as const;

export const structureStages: StructureStage[] = [
  {
    stage: "STAGE 01",
    title: "01 鼻錐與連接段",
    image: "/images/rocket-structure/nose-cone.png",
    imageAlt: "火箭鼻錐、降落傘釋放裝置與前後段連接結構",
    points: [
      {
        title: "鼻錐",
        description:
          "鼻錐使用 3D 列印 PLA 製作，內部設有降落傘釋放裝置。由於需要整合回收機構，鼻錐本身也必須具備足夠的壁厚與結構強度，以承受飛行過程中的負載。",
      },
      {
        title: "連接段",
        description:
          "連接段使用封閉式拉帽固定於內管表面，負責連接火箭前後段，同時降低水氣進入箭體的可能。外管螺絲孔採用倒角設計並使用平頭螺絲，減少表面凸出，以降低額外阻力。",
      },
    ],
  },
  {
    stage: "STAGE 02",
    title: "02 模組化酬載段",
    introduction:
      "酬載段使用碳纖維板與鋁圓棒建立多層結構，把有限的箭體空間分成不同功能艙室。",
    image: "/images/rocket-structure/payload-module.png",
    imageAlt: "火箭酬載段的碳纖維板、鋁圓棒與多層模組化艙室結構",
    points: [
      {
        number: "01",
        title: "分層結構",
        description:
          "利用碳纖維板與鋁圓棒建立不同高度的艙室，並使用 3D 列印固定塊與熱熔螺母鎖固於箭體。",
      },
      {
        number: "02",
        title: "模組化配置",
        description:
          "透過調整鋁圓棒長度，可以快速改變不同艙室的空間分配。每層碳纖維板也預留固定孔，方便不同酬載與設備安裝。",
      },
      {
        number: "03",
        title: "航電區密封",
        description:
          "航電模組與酬載船之間使用 O-ring 進行密封，降低海水進入航電區域的風險。",
      },
    ],
  },
  {
    stage: "STAGE 03",
    eyebrow: "STAGE 03 / PAYLOAD BOAT",
    title: "酬載船｜火箭落海後的返航任務",
    introduction:
      "火箭落海後，我們希望能自動釋放酬載船，讓它帶著重要的航電與飛行數據安全返航，提升任務資料回收的完整性。",
    conclusion:
      "目標：火箭落海後釋放酬載船，使酬載船載著航電數據安全返航。",
    image: "/images/payload-boat/payload-boat-overview.png",
    imageAlt: "酬載船完整示意圖，包含船舵、推進器、伺服馬達、通訊艙與電池盒",
    points: [
      {
        number: "01",
        title: "船舵",
        description: "控制船體運動方向，透過伺服馬達驅動。",
      },
      {
        number: "02",
        title: "水下推進器",
        description: "主要動力來源，透過無刷馬達驅動葉片。",
      },
      {
        number: "03",
        title: "伺服馬達",
        description: "控制船舵角度。",
      },
      {
        number: "04",
        title: "通訊艙",
        description: "內含主控板（ESP32）、通訊模組（LoRa、ELRS）、GPS、九軸感測器。",
      },
      {
        number: "05",
        title: "電池盒",
        description: "使用 18650 鋰電池供電。",
      },
    ],
  },
  {
    stage: "STAGE 04",
    title: "04 尾翼與推進器固定",
    image: "/images/rocket-structure/fin-module.png",
    imageAlt: "火箭碳纖維尾翼、鋁製固定環與推進器固定結構",
    points: [
      {
        number: "01",
        title: "前固定環",
        description:
          "前固定環位於推進器質心前方，使推進器能維持在火箭中心軸線附近，提升整體固定與定位可靠度。",
      },
      {
        number: "02",
        title: "碳纖尾翼",
        description:
          "使用四片 4 mm 碳纖維板作為尾翼主體，在降低重量的同時維持足夠剛性，並透過鋁製固定環進行鎖固。",
      },
      {
        number: "03",
        title: "推進器鎖固介面",
        description:
          "火箭底座使用 15 mm 7075 鋁塊固定於箭體內部，並搭配尾部固定結構，使尾翼模組與推進器系統能整合在同一結構中。",
      },
      {
        number: "04",
        title: "結構加強",
        description:
          "箭體接合處使用環氧樹脂進行膠合，提高接合區域的結構強度，同時提升防水能力。",
      },
    ],
  },
  {
    stage: "STAGE 05",
    eyebrow: "STAGE 05 / STRUCTURAL VERIFICATION",
    title: "我們怎麼確認它撐得住？",
    introduction:
      "我們不只設計，也驗證。火箭在圖面上看起來合理，不代表它真的能承受飛行環境；因此我們會透過實體測試與工程分析，確認結構面對約 9G、0.9 Ma、衝擊與震動時的表現。",
    image: "/images/rocket-structure/rocket-full.png",
    imageAlt: "火箭整體結構圖，用於說明結構測試與工程分析",
    points: [
      {
        number: "01",
        title: "震動平台測試",
        description:
          "模擬飛行與推進系統帶來的震動與衝擊，確認螺絲、尾翼與結構連接不會因振動而鬆脫。",
      },
      {
        number: "02",
        title: "ANSYS 應力分析",
        description:
          "分析箭體與尾翼在約 9G 高加速度及飛行負載下的受力狀態，確認主要結構具備足夠的安全裕度。",
      },
      {
        number: "03",
        title: "ANSYS 流場分析",
        description:
          "評估火箭在最高約 0.9 Ma 飛行時的氣流、阻力與尾翼周圍流動，也檢查飛行環境下的外殼材料不會軟化或融化。",
      },
    ],
  },
];

export const verificationStatement =
  "讓每一次升空不只是完成組裝，而是建立在工程驗證之上。";
