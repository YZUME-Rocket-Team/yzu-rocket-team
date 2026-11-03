"use client";

import { useSyncExternalStore } from "react";
import { getTaipeiDate, millisecondsToNextTaipeiDay } from "@/lib/calendarDate";

function subscribe(onChange: () => void) {
  let midnightTimer: ReturnType<typeof setTimeout>;
  const refresh = () => {
    onChange();
    clearTimeout(midnightTimer);
    midnightTimer = setTimeout(refresh, millisecondsToNextTaipeiDay() + 50);
  };
  refresh();
  // Also recover from device clock changes, sleep, and background-tab throttling.
  const clockCheck = setInterval(refresh, 60_000);
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("focus", refresh);
  window.addEventListener("pageshow", refresh);
  return () => {
    clearTimeout(midnightTimer);
    clearInterval(clockCheck);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("focus", refresh);
    window.removeEventListener("pageshow", refresh);
  };
}

// SSR and the first hydration render share the same neutral snapshot.
const serverSnapshot = () => null;

export default function useTaipeiDate() {
  return useSyncExternalStore<string | null>(subscribe, getTaipeiDate, serverSnapshot);
}
