import type { Metadata } from "next";

import PageLinks from "@/components/PageLinks";
import { fundingExpenses, fundingIncome } from "@/data/siteContent";

import BudgetChartCard from "./BudgetChartCard";
import styles from "./budget.module.css";

export const metadata: Metadata = { title: "經費總結｜火大的元件" };

const chartColors = ["#ff7900", "#ffab39", "#ffc18b", "#ffe5c8", "#ffda58"];
const currencyFormatter = new Intl.NumberFormat("en-US");

type BudgetItem = { label: string; amount: number };

// Keep the shared, original line items intact; derive numeric chart data here.
function toBudgetItem(item: { label: string; amount: string }): BudgetItem {
  return { label: item.label, amount: Number(item.amount.replace(/[^\d]/g, "")) };
}

function sumAmounts(items: readonly BudgetItem[]) {
  return items.reduce((total, item) => total + item.amount, 0);
}

function formatCurrency(amount: number) {
  return `NT$${currencyFormatter.format(amount)}`;
}

const incomeItems = fundingIncome.map(toBudgetItem);
const originalExpenses = fundingExpenses.map(toBudgetItem);
const expenseItems: BudgetItem[] = [
  { label: "火箭製作", amount: originalExpenses[0].amount },
  ...originalExpenses.slice(1, 3),
  { label: "其他", amount: sumAmounts(originalExpenses.slice(3)) },
];

function BudgetCard({
  id,
  title,
  totalLabel,
  items,
}: {
  id: string;
  title: string;
  totalLabel: string;
  items: readonly BudgetItem[];
}) {
  const total = sumAmounts(items);
  const segments = items.map((item, index) => ({
    ...item,
    color: chartColors[index],
    fraction: item.amount / total,
    offset: sumAmounts(items.slice(0, index)) / total,
  }));

  return (
    <BudgetChartCard
      id={id}
      title={title}
      totalLabel={totalLabel}
      totalAmount={formatCurrency(total)}
      segments={segments.map((segment) => ({
        ...segment,
        formattedAmount: formatCurrency(segment.amount),
        percentage: `${(segment.fraction * 100).toFixed(1)}%`,
      }))}
    />
  );
}

export default function BudgetPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>2026 經費總結</h1>
        <div className={styles.cards}>
          <BudgetCard id="income" title="2026 收入" totalLabel="總收入" items={incomeItems} />
          <BudgetCard id="expenses" title="2026 支出" totalLabel="總支出" items={expenseItems} />
        </div>
        <div className={styles.pageNavigation}>
          <PageLinks compact />
        </div>
      </div>
    </main>
  );
}
