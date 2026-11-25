"use client";

import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { lockBodyScroll } from "@/lib/lockBodyScroll";

import styles from "./PurchaseDetailsModal.module.css";

export default function BudgetDetailsDialog({
  title,
  eyebrow,
  closeLabel,
  description,
  meta,
  scrollLabel,
  accent,
  children,
  returnFocusRef,
  onClose,
}: {
  title: string;
  eyebrow: string;
  closeLabel: string;
  description: ReactNode;
  meta?: ReactNode;
  scrollLabel: string;
  accent?: string;
  children: ReactNode;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const backdropPressedRef = useRef(false);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const returnFocusTarget = returnFocusRef.current;
    const unlockScroll = lockBodyScroll();
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      dialog.close();
      unlockScroll();
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
      className={accent ? `${styles.dialog} ${styles.breakdownDialog}` : styles.dialog}
      style={accent ? { "--category-accent": accent } as CSSProperties : undefined}
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
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 ref={titleRef} tabIndex={-1} id={`${id}-title`} className={styles.title}>{title}</h2>
            </div>
            <button ref={closeButtonRef} type="button" onClick={onClose} className={styles.closeButton} aria-label={closeLabel}>×</button>
          </div>
          <p id={`${id}-description`} className={styles.description}>{description}</p>
          {meta && <p className={styles.meta}>{meta}</p>}
        </header>
        <div ref={scrollAreaRef} className={styles.scrollArea} tabIndex={0} role="region" aria-label={scrollLabel}>
          {children}
        </div>
      </div>
    </dialog>
  );
}
