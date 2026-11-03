type IconName = "layers" | "chip" | "parachute" | "chart" | "target" | "clipboard" | "document" | "users" | "gear" | "helmet" | "rocket" | "flag";

export default function PlanIcon({ name, className }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    layers: <><path d="m3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5" /></>,
    chip: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4M9 9h6v6H9z" /></>,
    parachute: <><path d="M2 11a10 10 0 0 1 20 0M2 11q3-3 6 0 4-3 8 0 3-3 6 0M8 11c0-6 2-10 4-10s4 4 4 10M2 11l10 9 10-9M12 20v2q3 3 4-1" /></>,
    chart: <><path d="M3 14h4v8H3zm7-6h4v14h-4zm7-6h4v20h-4z" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v5m0 12v5M1 12h5m12 0h5" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M9 11h6m-6 4h6m-6 4h4" /></>,
    document: <><path d="M5 2h14v16l-5 4H5V2Zm14 15h-5v5M8 7h8M8 11h8" /></>,
    users: <><circle cx="12" cy="7" r="3" /><path d="M6 21v-3a6 6 0 0 1 12 0v3H6Zm0-8a4 4 0 0 0-4 4v3h4m12-7a4 4 0 0 1 4 4v3h-4M5 5a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6" /></>,
    gear: <><path d="m9 2-1 3-3 1-3 3 2 3-1 3 3 3 3-1 3 2 3-2 3 1 3-3-1-3 2-3-3-3-3-1-1-3H9Z" /><circle cx="12" cy="11" r="4" /></>,
    helmet: <><path d="M3 17v-4a9 9 0 0 1 18 0v4M9 4v8m6-8v8M1 17h22v3H1z" /></>,
    rocket: <><path d="M9 16c-1-7 3-12 12-14 0 9-4 14-11 15l-1-1Zm1-8H5l-3 6 7-1m7 1v5l-6 3 1-6M7 18l-4 4m1-6-3 3m8 1-3 3" /><circle cx="16" cy="7" r="2" /></>,
    flag: <><path d="M4 22V2m0 1c5-4 10 5 16 0v11c-6 5-11-4-16 0" /></>,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
