import type { Metadata } from "next";
import { budgetTotal2027, fundingTarget2027 } from "@/data/plan2027";

export const siteName = "火大的元件 YZUME";
// Production origin confirmed by the site owner; never use a preview/request host.
export const siteUrl = new URL("https://madrocket.tw/");

// Only canonical public pages belong here; /about redirects to /#about.
export const publicPages = {
  "/": {
    title: "火大的元件 Mad_Rocket｜元智大學火箭團隊官方網站",
    description:
      "火大的元件 YZUME 是由元智大學機械工程學系學生組成的火箭團隊，連續獲得 2025、2026 台灣盃火箭競賽第三名。了解我們的火箭研發歷程、2027 年競賽計畫，以及支持團隊的方式。",
  },
  "/competition": {
    title: "台灣盃火箭競賽介紹｜火大的元件 YZUME",
    description:
      "認識 2027 台灣盃火箭競賽的學生 1K、學生 3K 與社會 3K 組別，了解從火箭設計、製作、測試到實際發射的完整工程挑戰。",
  },
  "/journey-2026": {
    title: "2026 火箭研發與參賽成果｜火大的元件 YZUME",
    description:
      "從設計審查到決賽發射，記錄火大的元件參與第二屆台灣盃火箭競賽、獲得學生 3K 組第三名的經歷。",
  },
  "/budget": {
    title: "2026 經費收支總結｜火大的元件 YZUME",
    description:
      "公開火大的元件 YZUME 火箭團隊 2026 年實際收入、支出與參賽成本，了解補助及贊助來源，以及火箭製作、交通、住宿等經費用途。",
  },
  "/plan-2027": {
    title: "2027 火箭競賽計畫與募款目標｜火大的元件 YZUME",
    description:
      `從 2026 的實戰經驗出發，了解火大的元件 2027 四大升級方向、${budgetTotal2027 / 10_000} 萬元建議預算、${fundingTarget2027 / 10_000} 萬元募款目標與台灣盃火箭競賽官方時程。`,
  },
} as const;

export function createPageMetadata(path: keyof typeof publicPages): Metadata {
  const { title, description } = publicPages[path];
  const image = {
    url: "/images/team_logo.png",
    width: 1254,
    height: 1254,
    alt: "MAD ROCKET YZUME 團隊隊徽",
  };

  return {
    title,
    description,
    alternates: { canonical: path },
    // Next.js replaces nested metadata rather than deeply merging it.
    openGraph: {
      type: "website",
      locale: "zh_TW",
      siteName,
      title,
      description,
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}
