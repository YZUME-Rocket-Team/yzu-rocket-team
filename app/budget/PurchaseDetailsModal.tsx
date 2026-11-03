"use client";

import { useEffect, useId, useRef, type MouseEvent, type PointerEvent, type RefObject } from "react";

import type { PurchaseGroup, PurchaseItem } from "./purchaseDetails";
import styles from "./PurchaseDetailsModal.module.css";

const money = (amount: number) => `NT$${amount.toLocaleString("en-US")}`;

function unitPrice(item: PurchaseItem) {
  if (item.unitPrice === null) return item.status === "sponsored" ? "贊助／未列價" : "單價未定";
  const [integer, fraction] = item.unitPrice.split(".");
  return `${money(Number(integer))}${fraction === undefined ? "" : `.${fraction}`}`;
}

function itemAmount(item: PurchaseItem) {
  return item.amount === null
    ? item.status === "sponsored" ? "贊助／未列價" : "金額未定"
    : money(item.amount);
}

export default function PurchaseDetailsModal({ group, onClose, returnFocusRef }: {
  group: PurchaseGroup;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const backdropPressedRef = useRef(false);
  const id = useId();
  const pricedTotal = group.items.reduce((sum, item) => typeof item.amount === "number" ? sum + item.amount : sum, 0);

  // Match the existing donation dialog's fixed-body scroll lock, without changing it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const returnFocusTarget = returnFocusRef.current;
    const { scrollX, scrollY } = window;
    const body = document.body;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const paddingRight = parseFloat(getComputedStyle(body).paddingRight);
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, left: "0", width: "100%", overflow: "hidden" });
    if (scrollbarWidth > 0) body.style.paddingRight = `${paddingRight + scrollbarWidth}px`;
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      Object.assign(body.style, previousStyle);
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      document.documentElement.style.scrollBehavior = previousBehavior;
      returnFocusTarget?.focus({ preventScroll: true });
    };
  }, [returnFocusRef]);

  function isBackdrop(event: MouseEvent<HTMLDialogElement> | PointerEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return false;
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right
      || event.clientY < rect.top || event.clientY > rect.bottom;
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onKeyDown={(event) => {
        if (event.key === "Escape") event.stopPropagation();
        if (event.key !== "Tab") return;
        const active = document.activeElement;
        if (event.shiftKey && (active === closeButtonRef.current || active === titleRef.current || active === event.currentTarget)) {
          event.preventDefault();
          scrollAreaRef.current?.focus({ preventScroll: true });
        } else if (!event.shiftKey && (active === scrollAreaRef.current || active === event.currentTarget)) {
          event.preventDefault();
          closeButtonRef.current?.focus({ preventScroll: true });
        }
      }}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }}
      onPointerDown={(event) => { backdropPressedRef.current = isBackdrop(event); }}
      onClick={(event) => {
        if (backdropPressedRef.current && isBackdrop(event)) onClose();
        backdropPressedRef.current = false;
      }}
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <div>
              <p className={styles.eyebrow}>計畫採購明細</p>
              <h2 ref={titleRef} tabIndex={-1} id={`${id}-title`} className={styles.title}>{group.label}｜採購明細</h2>
            </div>
            <button ref={closeButtonRef} type="button" onClick={onClose} className={styles.closeButton} aria-label={`關閉${group.label}採購明細`}>×</button>
          </div>
          <p id={`${id}-description`} className={styles.description}>原始資料標示 Planned Purchase Items (TBD)，不代表所有項目均已完成採購或付款。</p>
          <p className={styles.meta}>共 {group.items.length} 筆明細 · 金額單位：新臺幣</p>
        </header>

        <div ref={scrollAreaRef} className={styles.scrollArea} tabIndex={0} role="region" aria-label={`${group.label}採購明細，可捲動查看`}>
          <table className={styles.table}>
            <caption className="sr-only">{group.label}計畫採購明細，金額單位為新臺幣</caption>
            <colgroup><col className={styles.nameColumn} /><col className={styles.sourceColumn} /><col className={styles.quantityColumn} /><col /><col /></colgroup>
            <thead><tr><th scope="col">採購品項</th><th scope="col">購買來源</th><th scope="col">數量與單位</th><th scope="col">單價</th><th scope="col">項目金額</th></tr></thead>
            <tbody>
              {group.items.map((item, index) => (
                <tr key={`${group.id}-${index}`}>
                  <th scope="row">{item.name}</th><td>{item.source}</td><td>{item.quantity}</td><td>{unitPrice(item)}</td><td>{itemAmount(item)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ol className={styles.mobileList} aria-label={`${group.label}計畫採購品項`}>
            {group.items.map((item, index) => (
              <li key={`${group.id}-${index}`} className={styles.mobileItem}>
                <h3><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</h3>
                <dl className={styles.itemDetails}>
                  <div className={styles.fullRow}><dt>購買來源</dt><dd>{item.source}</dd></div>
                  <div><dt>數量與單位</dt><dd>{item.quantity}</dd></div>
                  <div><dt>單價</dt><dd>{unitPrice(item)}</dd></div>
                  <div className={`${styles.fullRow} ${styles.itemTotal}`}><dt>項目金額</dt><dd>{itemAmount(item)}</dd></div>
                </dl>
              </li>
            ))}
          </ol>

          <section className={styles.summary} data-pending={group.subtotalNeedsReview || undefined} aria-labelledby={`${id}-subtotal`}>
            <h3 id={`${id}-subtotal`}>{group.subtotalNeedsReview ? "小計待核對" : "原始資料小計"}</h3>
            <dl>
              <div><dt>原始表格小計</dt><dd>{money(group.originalSubtotal)}</dd></div>
              <div><dt>已列價品項加總</dt><dd>{money(pricedTotal)}</dd></div>
            </dl>
            {group.subtotalNeedsReview && <p>原始表格小計與逐項加總相差 {money(Math.abs(pricedTotal - group.originalSubtotal))}，差異原因尚未確認，全部原始品項與金額均予保留。</p>}
            {group.items.some((item) => item.status === "sponsored") && <p>已列價品項加總不含贊助／未列價材料；未列價不代表零元採購。</p>}
            {group.note && <p>{group.note}</p>}
          </section>
          <p className={styles.scopeNote}>以上為計畫採購資料，不一定涵蓋火箭製作的全部實際支出；火箭製作總支出仍為 NT$45,024（32.5%）。</p>
        </div>
      </div>
    </dialog>
  );
}
