import type { RefObject } from "react";

import BudgetDetailsDialog from "./BudgetDetailsDialog";
import styles from "./PurchaseDetailsModal.module.css";

export type BudgetDetailItem = {
  name: string;
  formattedAmount: string;
};

export default function BudgetBreakdownModal({
  label,
  color,
  formattedAmount,
  percentage,
  items,
  returnFocusRef,
  onClose,
}: {
  label: string;
  color: string;
  formattedAmount: string;
  percentage: string;
  items: readonly BudgetDetailItem[];
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <BudgetDetailsDialog
      title={`${label}｜預算明細`}
      eyebrow="2027 建議預算"
      closeLabel={`關閉${label}預算明細`}
      description={(
        <>
          <span>分類總預算 <strong>{formattedAmount}</strong></span>
          <span>占總預算 <strong>{percentage}</strong></span>
        </>
      )}
      scrollLabel={`${label}預算明細，可捲動查看`}
      accent={color}
      returnFocusRef={returnFocusRef}
      onClose={onClose}
    >
      <table className={styles.table}>
        <caption className="sr-only">{label}預算明細，金額單位為新臺幣</caption>
        <thead>
          <tr><th scope="col">支出項目</th><th scope="col">預算金額</th></tr>
        </thead>
        <tbody>
          {items.map(({ name, formattedAmount }) => (
            <tr key={name}><th scope="row">{name}</th><td>{formattedAmount}</td></tr>
          ))}
        </tbody>
        <tfoot>
          <tr><th scope="row">小計</th><td>{formattedAmount}</td></tr>
        </tfoot>
      </table>
    </BudgetDetailsDialog>
  );
}
