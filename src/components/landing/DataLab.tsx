import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/Card/Card";
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
  { id: "alice", user: { name: "Alice Smith", handle: "@alicesmith" }, payment: { brand: "visa", last4: "18" }, categories: ["Arts", "Travel"], status: "Active", usage: 72 },
  { id: "bob", user: { name: "Bob Johnson", handle: "@bobjohnson" }, payment: { brand: "mastercard", last4: "99", note: "Primary card" }, categories: [{ label: "Books", color: "indigo" }, { label: "Computers", color: "violet" }], status: "Pending", usage: 31 },
  { id: "clara", user: { name: "Clara Garcia", handle: "@claragarcia" }, payment: { brand: "mastercard", last4: "14" }, categories: [{ label: "Kitchen", color: "amber" }, { label: "Books", color: "cyan" }], status: "Active", usage: 85 },
  { id: "dan", user: { name: "Dan Ostrow", handle: "@danostrow" }, payment: { brand: "visa", last4: "07" }, categories: ["Sports", "Travel"], status: "Overdue", usage: 54 },
];

const COLUMNS: TableColumn<Account>[] = [
  { key: "user", header: "Customer", type: "user", sortable: true },
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
  const [viewToggle, setViewToggle] = useState(false);
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5 lg:h-[392px] lg:overflow-y-auto">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Controls</p>
          <div className="flex flex-col items-start gap-3">
            <Switch label="Loading skeleton" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
            <Switch label="Row actions" checked={actions} onChange={(e) => setActions(e.target.checked)} />
            <Switch label="Selectable rows" checked={selectable} onChange={(e) => setSelectable(e.target.checked)} />
            <Switch label="Grid / table toggle" checked={viewToggle} onChange={(e) => setViewToggle(e.target.checked)} />
          </div>
        </div>
        <Button variant="outline" icon="refresh-cw" label="Reload data" onClick={reload} />
      </div>

      {/* The preview is the library's own glass Card (lighting="scroll": its frame lights up in dark mode while it is at the centre of the screen). */}
      <Card
        variant="glass"
        lighting="scroll"
        padding="none"
        className="flex !rounded-2xl !p-4 text-fg shadow-sm before:!rounded-[calc(var(--radius-2xl)+10px)] lg:h-[392px] flex-col"
        classNames={{ body: "flex min-h-0 flex-1 flex-col overflow-hidden" }}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-fg">Customers</p>
          <p className="text-xs text-fg-subtle" aria-live="polite">{last}</p>
        </div>
        <Table<Account>
          key={version}
          variant="lined"
          size="sm"
          columns={COLUMNS}
          data={ACCOUNTS.slice(0, 3)}
          rowKey="id"
          selectable={selectable}
          viewToggle={viewToggle}
          loading={loading}
          skeletonRows={3}
          actions={actions ? ACTIONS : undefined}
          onAction={(a, row) => setLast(`${a.label}: ${row.user.name}`)}
          onSelectionChange={(keys) => setLast(`${keys.length} selected`)}
          transition="slide-up"
        />
      </Card>
    </div>
  );
}
