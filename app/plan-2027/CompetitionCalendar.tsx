"use client";

import { calendarSource2027, competitionCalendar2027, formatCalendarDate } from "@/data/plan2027";
import type { CalendarEvent2027 } from "@/data/plan2027";
import { getCalendarStatus, type CalendarStatus } from "@/lib/calendarDate";
import PlanIcon from "./PlanIcon";
import useTaipeiDate from "./useTaipeiDate";
import styles from "./plan.module.css";

function EventDate({ event: { start, end } }: { event: CalendarEvent2027 }) {
  return <><time dateTime={start}>{formatCalendarDate(start)}</time>{end ? <> – <time dateTime={end}>{end.slice(5).replace("-", "/")}</time></> : null}</>;
}

function StatusBadge({ status }: { status: CalendarStatus | null }) {
  if (!status || status === "upcoming") return null;
  const labels = { ongoing: "進行中", ended: "已結束" };
  return <span className={styles.calendarStatus} data-status={status}>{labels[status]}</span>;
}

export default function CompetitionCalendar() {
  const today = useTaipeiDate();
  const statusFor = (event: CalendarEvent2027) => today ? getCalendarStatus(event, today) : null;
  const milestones = competitionCalendar2027.filter((event) => event.milestone || event.id === "final");
  return (
    <section aria-labelledby="calendar-heading" className={`${styles.section} ${styles.calendar}`}>
      <div className={styles.container}>
        <div className={styles.calendarHeader} data-plan-reveal>
          <div>
            <h2 id="calendar-heading" className={styles.sectionTitle}>2027 台灣盃火箭競賽<span className={styles.calendarTitleDivider}>｜</span><span>官方行事曆</span></h2>
            <p className={styles.sourceNote}>依國家太空中心（TASA）公告整理 · 核對日期：<time dateTime={calendarSource2027.checkedAt}>{formatCalendarDate(calendarSource2027.checkedAt)}</time> · {calendarSource2027.timezone}</p>
            <p className={styles.trackingDate} aria-live="polite">台灣日期追蹤：{today ? <time dateTime={today}>{formatCalendarDate(today)}</time> : "確認日期中"}（Asia/Taipei）</p>
          </div>
          <a href={calendarSource2027.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>查看 TASA 官方行事曆 <span aria-hidden="true">↗</span><span className="sr-only">（開啟新分頁）</span></a>
        </div>
        <ol className={styles.timeline} aria-label="競賽主要時程" data-plan-reveal>
          {milestones.map((event) => (
            <li key={event.id} className={styles.milestone} data-event-id={event.id} data-status={statusFor(event) ?? undefined}>
              <PlanIcon name={event.id === "final" ? "rocket" : event.milestone!.icon} className={styles.milestoneIcon} />
              <span className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.milestoneCopy}>
                <p className={styles.milestoneDate}><EventDate event={event} /></p>
                <div className={styles.milestoneDetails}>
                  <h3>{event.title}</h3>
                  {event.tentative ? <span className={styles.tentative}>官方暫定</span> : null}
                  <div className={styles.statusLabels}><StatusBadge status={statusFor(event)} /></div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <details className={styles.fullCalendar}>
          <summary><span className={styles.expandText}>展開完整行事曆</span><span className={styles.collapseText}>收合完整行事曆</span><span className={styles.eventCount}>共 {competitionCalendar2027.length} 項</span><span className={styles.chevron} aria-hidden="true" /></summary>
          <ol className={styles.calendarList} aria-label="完整官方競賽行事曆">
            {competitionCalendar2027.map((event, index) => (
              <li key={event.id} data-event-id={event.id} data-status={statusFor(event) ?? undefined} data-featured={event.id === "final"}>
                <span className={styles.eventNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div><p className={styles.eventDate}><EventDate event={event} />{event.tentative ? <span className={styles.tentative}>官方暫定</span> : null}</p><h3>{event.title}</h3><div className={styles.statusLabels}><StatusBadge status={statusFor(event)} />{event.annotation ? <span className={styles.milestoneImportance}>{event.annotation}</span> : null}</div>{event.note ? <p className={styles.eventNote}>{event.note}</p> : null}</div>
              </li>
            ))}
          </ol>
        </details>
        <p className={styles.calendarDisclaimer}>標註「官方暫定」的日期可能調整，決賽將視天候與行政等因素變動；最新時程以 TASA 官方公告為準。</p>
      </div>
    </section>
  );
}
