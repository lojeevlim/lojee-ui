import { useEffect, useRef, useState } from "react";
import { Table, type TableColumn, type TableAction } from "../ui/Table/Table";
import { Button } from "../ui/Buttons/Button";
import { Switch } from "../ui/Switch/Switch";

interface Account {
  id: string;
  user: { name: string; handle: string };
  payment: { brand: "visa" | "mastercard"; last4: string; note?: string };
  categories: (string | { label: string; color?: string })[];
  status: string;
  usage: number;
}

const ACCOUNTS: Account[] = [
  { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, categories: ["Arts", "Business", "Travel"], status: "Active", usage: 72 },
  { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99", note: "Primary card" }, categories: [{ label: "Books", color: "indigo" }, { label: "Computers", color: "violet" }], status: "Pending", usage: 31 },
  { id: "clara", user: { name: "Clara Garcia", handle: "@claragarcia" }, payment: { brand: "mastercard", last4: "14" }, categories: [{ label: "Kitchen", color: "amber" }, { label: "Books", color: "cyan" }], status: "Active", usage: 85 },
  { id: "dan", user: { name: "Dan Ostrow", handle: "@danostrow" }, payment: { brand: "visa", last4: "07" }, categories: ["Sports", "Travel"], status: "Overdue", usage: 54 },
];

const COLUMNS: TableColumn<Account>[] = [
  { key: "user", header: "Customer", type: "user", sortable: true },
  { key: "payment", header: "Payment method", type: "payment" },
  { key: "categories", header: "Category", type: "badges" },
  { key: "usage", header: "Usage", type: "progress", sortable: true },
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
  const [selectable, setSelectable] = useState(true);
  const [viewToggle, setViewToggle] = useState(true);
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
            <Switch label="Selectable rows" checked={selectable} onChange={(e) => setSelectable(e.target.checked)} />
            <Switch label="Grid / table toggle" checked={viewToggle} onChange={(e) => setViewToggle(e.target.checked)} />
          </div>
        </div>
        <Button variant="outline" icon="refresh-cw" label="Reload data" onClick={reload} />
      </div>

      {/* Glass frame (same as Card variant="glass"): a frosted accent-tinted halo 10px outside the card; the card's own fill moves to ::after so the halo shows behind it. */}
      <div className="relative isolate rounded-2xl border border-border p-5 shadow-sm before:pointer-events-none before:absolute before:-inset-2.5 before:-z-20 before:rounded-[calc(var(--radius-2xl)+10px)] before:border before:border-accent-500/20 before:bg-accent-500/[0.07] before:backdrop-blur-2xl before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-[inherit] after:bg-surface after:content-[''] md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-fg">Customers</p>
          <p className="text-xs text-fg-subtle" aria-live="polite">{last}</p>
        </div>
        <Table<Account>
          key={version}
          variant="lined"
          size="sm"
          columns={COLUMNS}
          data={ACCOUNTS}
          rowKey="id"
          selectable={selectable}
          viewToggle={viewToggle}
          loading={loading}
          skeletonRows={4}
          actions={actions ? ACTIONS : undefined}
          onAction={(a, row) => setLast(`${a.label}: ${row.user.name}`)}
          onSelectionChange={(keys) => setLast(`${keys.length} selected`)}
          transition="slide-up"
        />
      </div>
    </div>
  );
}
