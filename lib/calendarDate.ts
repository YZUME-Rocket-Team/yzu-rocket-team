export type CalendarStatus = "upcoming" | "ongoing" | "ended";

const taipeiFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit",
});

export function getTaipeiDate(now = new Date()): string {
  const parts = taipeiFormatter.formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

// ISO date-only strings sort chronologically, independent of the device timezone.
// Single-day events use the start date as their inclusive end date.
export function getCalendarStatus(event: { start: string; end?: string }, today: string): CalendarStatus {
  if (today < event.start) return "upcoming";
  if (today > (event.end ?? event.start)) return "ended";
  return "ongoing";
}

export function millisecondsToNextTaipeiDay(now = new Date()): number {
  const midnight = Date.parse(`${getTaipeiDate(now)}T00:00:00+08:00`);
  return midnight + 86_400_000 - now.getTime();
}
