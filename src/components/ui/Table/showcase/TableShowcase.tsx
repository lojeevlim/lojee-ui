import { Table, type TableColumn } from "../Table";
import { Badge } from "../../Badge/Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

interface Person {
  name: string;
  email: string;
  role: string;
  status: "active" | "invited" | "suspended";
}

const PEOPLE: Person[] = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin", status: "active" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor", status: "active" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer", status: "invited" },
  { name: "Dan Ostrow", email: "dan@acme.com", role: "Editor", status: "suspended" },
];

const BASIC_COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const STATUS_COLOR: Record<Person["status"], "emerald" | "amber" | "rose"> = {
  active: "emerald",
  invited: "amber",
  suspended: "rose",
};

const STATUS_COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => <Badge color={STATUS_COLOR[row.status]} label={row.status} />,
  },
];

export default function TableShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Table</h1>
          <p className="text-sm text-slate-500 mt-1">A data-driven table — pass columns and rows, no compound children.</p>
        </div>

        <section>
          <SectionLabel sub="Columns + data, rendered as a plain table.">Basic</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} />
          <CodeBlock
            code={`const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

<Table columns={columns} data={people} />`}
          />
        </section>

        <section>
          <SectionLabel sub="Alternating row background.">Striped</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} striped />
          <CodeBlock code={`<Table columns={columns} data={people} striped />`} />
        </section>

        <section>
          <SectionLabel sub="Border around the table plus column dividers.">Bordered</SectionLabel>
          <Table columns={BASIC_COLUMNS} data={PEOPLE} bordered />
          <CodeBlock code={`<Table columns={columns} data={people} bordered />`} />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg cell padding.">Sizes</SectionLabel>
          <div className="space-y-6">
            <Table columns={BASIC_COLUMNS} data={PEOPLE} size="sm" bordered />
            <Table columns={BASIC_COLUMNS} data={PEOPLE} size="lg" bordered />
          </div>
          <CodeBlock
            code={`<Table columns={columns} data={people} size="sm" bordered />
<Table columns={columns} data={people} size="lg" bordered />`}
          />
        </section>

        <section>
          <SectionLabel sub="A custom render function, here rendering a status Badge.">Custom cell rendering</SectionLabel>
          <Table columns={STATUS_COLUMNS} data={PEOPLE} striped />
          <CodeBlock
            code={`const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (row) => <Badge color={statusColor[row.status]} label={row.status} />,
  },
];

<Table columns={columns} data={people} striped />`}
          />
        </section>
      </div>
    </div>
  );
}
