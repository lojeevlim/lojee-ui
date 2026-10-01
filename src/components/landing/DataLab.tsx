import { highlightCode } from "../../core/highlightCode";
import { useEffect, useRef, useState } from "react";
import { Table, type TableColumn, type TableAction } from "../ui/Table/Table";
import { Badge } from "../ui/Badge/Badge";
import { Button } from "../ui/Buttons/Button";
import { Switch } from "../ui/Switch/Switch";
import { Chart } from "../ui/Chart/Chart";
import { Stat } from "../ui/Stat/Stat";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
}

const INVOICES: Invoice[] = [
  { id: "INV-1042", customer: "Acme Corp", amount: 4800, status: "Paid" },
  { id: "INV-1043", customer: "Globex", amount: 1250, status: "Pending" },
  { id: "INV-1044", customer: "Initech", amount: 920, status: "Overdue" },
  { id: "INV-1045", customer: "Umbrella", amount: 3100, status: "Paid" },
];

const REVENUE = [
  { label: "Jan", value: 32 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 52 },
  { label: "May", value: 47 },
  { label: "Jun", value: 61 },
];

const COLUMNS: TableColumn<Invoice>[] = [
  { key: "id", header: "Invoice" },
  { key: "customer", header: "Customer" },
  { key: "amount", header: "Amount", align: "right", render: (r) => `$${r.amount.toLocaleString()}` },
  {
    key: "status",
    header: "Status",
    render: (r) => <Badge variant="soft" color={r.status === "Paid" ? "emerald" : r.status === "Pending" ? "amber" : "rose"} label={r.status} />,
  },
];

const ACTIONS: TableAction[] = [
  { label: "Edit", icon: "pencil", value: "edit" },
  { label: "Duplicate", icon: "copy", value: "duplicate" },
  { label: "Delete", icon: "trash-2", value: "delete", color: "danger" },
];

/** Table with skeleton loading and built-in row actions (edit / duplicate / delete). */
export default function DataLab() {
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState(true);
  const [last, setLast] = useState("Try the row actions");
  const [version, setVersion] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const reload = () => {
    clearTimeout(timer.current);
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      setVersion((v) => v + 1);
    }, 1800);
  };

  useEffect(() => {
    timer.current = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer.current);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Controls</p>
          <div className="space-y-3">
            <Switch label="Loading skeleton" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
            <Switch label="Row actions" checked={actions} onChange={(e) => setActions(e.target.checked)} />
          </div>
        </div>
        <Button variant="outline" icon="refresh-cw" label="Reload data" onClick={reload} />
        <pre className="overflow-x-auto rounded-lg bg-surface-muted p-3 font-mono text-[11px] leading-relaxed text-fg-muted"><code>{highlightCode(`<Table
  columns={columns}
  data={invoices}${loading ? "\n  loading" : ""}${actions ? `\n  actions={[\n    { label: "Edit", value: "edit" },\n    { label: "Duplicate", value: "duplicate" },\n    { label: "Delete", value: "delete" },\n  ]}` : ""}
/>`)}</code></pre>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6">
        <div key={`kpi-${version}`} className="mb-6 grid gap-4 sm:grid-cols-[1fr_minmax(0,1.4fr)]">
          <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" countUp />
          <div className="rounded-xl border border-border p-3">
            <Chart countUp data={REVENUE} height={110} />
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-fg">Invoices</p>
          <p className="text-xs text-fg-subtle" aria-live="polite">{last}</p>
        </div>
        <Table<Invoice>
          key={version}
          columns={COLUMNS}
          data={INVOICES}
          loading={loading}
          skeletonRows={4}
          bordered
          actions={actions ? ACTIONS : undefined}
          onAction={(a, row) => setLast(`${a.label}: ${row.id}`)}
          transition="slide-up"
        />
      </div>
    </div>
  );
}
