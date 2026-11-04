"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { DonationCopyContext, DonationWarningContext, type DonationWarningRequest } from "@/components/DonationAction";
import { donationPurpose } from "@/data/donationTutorial";
import DonationWarningModal from "@/components/DonationWarningModal";
import DonationTutorialModal from "@/components/DonationTutorialModal";

export default function DonationFlowProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<DonationWarningRequest | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const tutorialTriggerRef = useRef<HTMLElement | null>(null);
  const [copied, setCopied] = useState(false);
  const tutorialActiveRef = useRef(false);
  const copyVersionRef = useRef(0);
  const resetCopy = useCallback(() => {
    copyVersionRef.current += 1;
    setCopied(false);
  }, []);
  const beginTutorial = useCallback(() => {
    tutorialActiveRef.current = true;
    resetCopy();
  }, [resetCopy]);
  const endTutorial = useCallback(() => {
    tutorialActiveRef.current = false;
    resetCopy();
  }, [resetCopy]);
  const copyPurpose = useCallback(async () => {
    const version = ++copyVersionRef.current;
    setCopied(false);
    try {
      await navigator.clipboard.writeText(donationPurpose);
      // 教學已結束或較新的複製要求已開始時，不採用舊的非同步結果。
      if (version !== copyVersionRef.current) return false;
      setCopied(true);
      return true;
    } catch {
      return false;
    }
  }, []);
  const openWarning = useCallback((next: DonationWarningRequest) => {
    if (!tutorialActiveRef.current) resetCopy();
    setRequest(next);
  }, [resetCopy]);
  const restoreFocus = (trigger: HTMLElement | null) => requestAnimationFrame(() => {
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });

  return (
    <DonationWarningContext.Provider value={openWarning}>
      <DonationCopyContext.Provider value={{ copied, copyPurpose, beginTutorial, endTutorial }}>
      {children}
      {showTutorial ? <DonationTutorialModal onClose={() => {
        setShowTutorial(false);
        restoreFocus(tutorialTriggerRef.current);
      }} /> : null}
      {request ? <DonationWarningModal onClose={(destination) => {
        setRequest(null);
        if (destination === "tutorial" && (!request.fromTutorial || !document.querySelector("dialog[data-donation-tutorial][open]"))) {
          tutorialTriggerRef.current = request.trigger;
          setShowTutorial(true);
        } else {
          restoreFocus(request.trigger);
        }
      }} /> : null}
      </DonationCopyContext.Provider>
    </DonationWarningContext.Provider>
  );
}
