"use client";

import { createContext, useContext, type ButtonHTMLAttributes, type RefObject } from "react";

export type DonationWarningRequest = { trigger: HTMLElement; fromTutorial: boolean };
export const DonationWarningContext = createContext<((request: DonationWarningRequest) => void) | null>(null);
export const DonationCopyContext = createContext<{
  copied: boolean;
  copyPurpose: () => Promise<boolean>;
  beginTutorial: () => void;
  endTutorial: () => void;
} | null>(null);

export function useDonationCopy() {
  const context = useContext(DonationCopyContext);
  if (!context) throw new Error("useDonationCopy requires DonationFlowProvider");
  return context;
}

/** 所有募款入口都先開啟提醒；只有提醒內的確認按鈕能開啟官方網址。 */
export default function DonationAction({ fromTutorial = false, returnFocusRef, onClick, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & {
  fromTutorial?: boolean;
  returnFocusRef?: RefObject<HTMLElement | null>;
}) {
  const openWarning = useContext(DonationWarningContext);
  if (!openWarning) throw new Error("DonationAction requires DonationFlowProvider");

  return (
    <button {...props} type="button" aria-haspopup="dialog" onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      openWarning({ trigger: returnFocusRef?.current ?? event.currentTarget, fromTutorial });
    }}>{children}</button>
  );
}
