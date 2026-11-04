"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { donationPurpose } from "@/data/donationTutorial";
import { useDonationCopy } from "@/components/DonationAction";
import { officialDonationUrl } from "@/data/siteContent";
import { lockBodyScroll } from "@/lib/lockBodyScroll";
import styles from "./DonationWarningModal.module.css";

type Destination = "dismiss" | "tutorial";
type CopyStatus = "idle" | "copying" | "success" | "error";

export default function DonationWarningModal({ onClose }: { onClose: (destination: Destination) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closingRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(false);
  const copyPendingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const [localCopyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const { copied, copyPurpose: copySharedPurpose } = useDonationCopy();
  const copyStatus = copied ? "success" : localCopyStatus;
  const id = useId();

  // 在移除 DOM 前同步關閉原生 dialog，讓底層教學能可靠接回鍵盤焦點。
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    mountedRef.current = true;
    const unlockScroll = lockBodyScroll();
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      mountedRef.current = false;
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dialog.close();
      unlockScroll();
    };
  }, []);

  const close = (destination: Destination) => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    closeTimerRef.current = setTimeout(() => onClose(destination), 250);
  };

  const copyPurpose = async () => {
    if (closingRef.current || copyPendingRef.current) return;
    copyPendingRef.current = true;
    setCopyStatus("copying");
    const success = await copySharedPurpose();
    if (mountedRef.current && !closingRef.current) setCopyStatus(success ? "idle" : "error");
    copyPendingRef.current = false;
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} data-closing={closing} aria-modal="true" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); close("dismiss"); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") event.stopPropagation();
        if (event.key !== "Tab") return;
        const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }}>
      <div className={styles.content} inert={closing}>
        <button type="button" className={styles.close} aria-label="關閉離站前提醒" onClick={() => close("dismiss")}>×</button>
        <p className={styles.eyebrow}>離站前提醒</p>
        <div className={styles.heading}>
          <svg className={styles.warningIcon} aria-hidden="true" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m17.4 6.5-14 24A3 3 0 0 0 6 35h28a3 3 0 0 0 2.6-4.5l-14-24a3 3 0 0 0-5.2 0Z" /><path d="M20 15v8m0 5h.01" /></svg>
          <h2 ref={titleRef} tabIndex={-1} id={`${id}-title`}>前往募款網站前，請先複製指定捐款用途</h2>
        </div>
        <p id={`${id}-description`} className={styles.description}>若未填寫指定內容，團隊可能無法正確申請到這筆經費。建議先複製以下文字，再前往元智大學募款網站。</p>
        <div className={styles.purposeCard}>
          <p className={styles.purpose}>{donationPurpose}</p>
          <button type="button" className={styles.copy} disabled={copyStatus === "copying"} onClick={copyPurpose}>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="4" width="12" height="14" rx="2" /><path d="M16 18v2H4V8h4" /></svg>
            {copyStatus === "success" ? "已成功複製" : copyStatus === "copying" ? "正在複製…" : "複製指定捐款用途"}
          </button>
        </div>
        <p id={`${id}-status`} role="status" aria-live="polite" aria-atomic="true" className={`${styles.status} ${copyStatus === "error" ? styles.error : copyStatus === "success" ? styles.success : ""}`}>
          {copyStatus === "success" ? "已成功複製指定捐款用途，可前往募款網站，並貼上至「指定捐款用途」欄位。" : copyStatus === "error" ? "複製失敗，請允許剪貼簿存取後再試一次；成功複製後才能前往募款網站。" : copyStatus === "copying" ? "正在複製，請稍候。" : "請先點擊「複製指定捐款用途」，成功後即可前往募款網站。"}
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={() => close("tutorial")}>返回教學</button>
          <button type="button" className={styles.primary} disabled={copyStatus !== "success"} aria-describedby={`${id}-status`} onClick={() => {
            if (copyStatus === "success" && !closingRef.current) window.open(officialDonationUrl, "_blank", "noopener,noreferrer");
          }}>我已複製，前往募款網站 <span aria-hidden="true">↗</span><span className="sr-only">（開啟新分頁）</span></button>
        </div>
      </div>
    </dialog>
  );
}
