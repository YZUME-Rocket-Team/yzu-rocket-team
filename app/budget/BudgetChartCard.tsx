"use client";

import { Fragment, useRef, useState, type PointerEvent } from "react";

import PurchaseDetailsModal from "./PurchaseDetailsModal";
import { purchaseGroups, type PurchaseGroup } from "./purchaseDetails";
import styles from "./budget.module.css";

type BudgetSegment = {
  label: string;
  color: string;
  fraction: number;
  offset: number;
  formattedAmount: string;
  percentage: string;
};

// An undashed, invisible arc gives each unchanged chart segment its own hit area.
function hitArc({ fraction, offset }: BudgetSegment) {
  const start = offset * 2 * Math.PI - Math.PI / 2;
  const end = start + fraction * 2 * Math.PI;
  return `M ${160 + 135 * Math.cos(start)} ${160 + 135 * Math.sin(start)} A 135 135 0 ${fraction > 0.5 ? 1 : 0} 1 ${160 + 135 * Math.cos(end)} ${160 + 135 * Math.sin(end)}`;
}

export default function BudgetChartCard({
  id,
  title,
  totalLabel,
  totalAmount,
  segments,
  embedded = false,
  note,
}: {
  id: string;
  title: string;
  totalLabel: string;
  totalAmount: string;
  segments: readonly BudgetSegment[];
  embedded?: boolean;
  note?: string;
}) {
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isRocketExpanded, setIsRocketExpanded] = useState(false);
  const [purchaseGroup, setPurchaseGroup] = useState<PurchaseGroup | null>(null);
  const purchaseTriggerRef = useRef<HTMLButtonElement | null>(null);
  const activeIndex = hoveredIndex ?? focusedIndex ?? lockedIndex;

  function preview(event: PointerEvent, index: number) {
    if (event.pointerType === "mouse"
      && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setHoveredIndex(index);
    }
  }

  function endPreview(index: number) {
    setHoveredIndex((current) => current === index ? null : current);
  }

  function toggleSelection(index: number) {
    setFocusedIndex(null);
    setHoveredIndex(null);
    setLockedIndex((current) => current === index ? null : index);
  }

  return (
    <section
      className={`${styles.card} ${embedded ? styles.embedded : ""}`}
      aria-labelledby={`${id}-heading`}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setLockedIndex(null);
          setHoveredIndex(null);
          setFocusedIndex(null);
        }
      }}
    >
      <h2 id={`${id}-heading`} className={embedded ? "sr-only" : styles.cardTitle}>{title}</h2>
      <div
        className={styles.cardContent}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setHoveredIndex(null);
            setLockedIndex(null);
            setFocusedIndex(null);
          }
        }}
      >
        <div
          className={styles.chart}
          role="img"
          aria-label={`${title}環形圖，${totalLabel} ${totalAmount}，各分類金額與百分比詳見分類資料。`}
        >
          <svg viewBox="0 0 320 320" aria-hidden="true" focusable="false">
            {segments.map((segment, index) => (
              <g key={segment.label}>
                <circle
                  className={styles.chartSegment}
                  data-dimmed={activeIndex !== null && activeIndex !== index}
                  cx="160"
                  cy="160"
                  r="135"
                  fill="none"
                  stroke={segment.color}
                  strokeWidth="50"
                  pathLength="1"
                  strokeDasharray={`${segment.fraction} ${1 - segment.fraction}`}
                  strokeDashoffset={-segment.offset}
                  transform="rotate(-90 160 160)"
                  pointerEvents="none"
                />
                <path
                  d={hitArc(segment)}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="50"
                  pointerEvents="stroke"
                  onPointerEnter={(event) => preview(event, index)}
                  onPointerLeave={() => endPreview(index)}
                  onPointerCancel={() => endPreview(index)}
                  onClick={() => toggleSelection(index)}
                />
              </g>
            ))}
          </svg>
          <div className={styles.chartCenter} aria-hidden="true">
            <span>{totalLabel}</span>
            <strong>{totalAmount}</strong>
          </div>
        </div>
        <dl className={styles.legend} aria-label={`${title}分類資料`}>
          {segments.map((segment, index) => {
            const hasRocketDetails = id === "expenses" && segment.label === "火箭製作";
            const triggerId = `${id}-category-${index}`;
            const panelId = `${id}-rocket-groups`;

            return (
              <Fragment key={segment.label}>
                <div
                  className={styles.legendRow}
                  data-active={activeIndex === index}
                  data-dimmed={activeIndex !== null && activeIndex !== index}
                  onPointerEnter={(event) => preview(event, index)}
                  onPointerLeave={() => endPreview(index)}
                  onPointerCancel={() => endPreview(index)}
                >
                  <dt className={styles.category}>
                    <button
                      type="button"
                      id={triggerId}
                      className={styles.categoryButton}
                      aria-pressed={lockedIndex === index}
                      aria-expanded={hasRocketDetails ? isRocketExpanded : undefined}
                      aria-controls={hasRocketDetails ? panelId : undefined}
                      aria-describedby={`${id}-value-${index}`}
                      onPointerDown={() => setFocusedIndex(null)}
                      onFocus={(event) => {
                        if (event.currentTarget.matches(":focus-visible")) setFocusedIndex(index);
                      }}
                      onBlur={() => setFocusedIndex(null)}
                      onClick={() => {
                        toggleSelection(index);
                        if (hasRocketDetails) setIsRocketExpanded((current) => !current);
                      }}
                    >
                      <span
                        className={styles.colorDot}
                        style={{ backgroundColor: segment.color }}
                        aria-hidden="true"
                      />
                      <span>{segment.label}</span>
                      {hasRocketDetails && (
                        <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                          <path d="m5 7.5 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </dt>
                  <dd id={`${id}-value-${index}`} className={styles.values}>
                    <span className={styles.amount}>{segment.formattedAmount}</span>
                    <span className={styles.percentage}>{segment.percentage}</span>
                  </dd>
                </div>
                {hasRocketDetails && (
                  <div
                    className={styles.accordionGroup}
                    data-expanded={isRocketExpanded}
                    aria-hidden={!isRocketExpanded}
                    inert={!isRocketExpanded}
                    onPointerEnter={(event) => preview(event, index)}
                    onPointerLeave={() => endPreview(index)}
                    onPointerCancel={() => endPreview(index)}
                  >
                    <dt className="sr-only">火箭製作分組</dt>
                    <dd id={panelId} role="region" aria-labelledby={triggerId} className={styles.accordionPanel}>
                      <div className={styles.accordionInner}>
                        <ul className={styles.subcategories}>
                          {purchaseGroups.map((group) => (
                            <li key={group.id}>
                              <button
                                type="button"
                                className={styles.groupButton}
                                aria-haspopup="dialog"
                                onClick={(event) => {
                                  purchaseTriggerRef.current = event.currentTarget;
                                  setPurchaseGroup(group);
                                }}
                              >
                                {group.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </dd>
                  </div>
                )}
              </Fragment>
            );
          })}
        </dl>
      </div>
      {note && <p className={styles.chartNote}>{note}</p>}
      {purchaseGroup && (
        <PurchaseDetailsModal group={purchaseGroup} returnFocusRef={purchaseTriggerRef} onClose={() => setPurchaseGroup(null)} />
      )}
    </section>
  );
}
