import { useState } from "react";
import { Table, type TableColumn, type TableSize } from "./Table/Table";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: TableSize[] = ["sm", "md", "lg"];

interface Person {
  name: string;
  email: string;
  role: string;
}

const COLUMNS: TableColumn<Person>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role", align: "right" },
];

const DATA: Person[] = [
  { name: "Ava Chen", email: "ava@acme.com", role: "Admin" },
  { name: "Marcus Lee", email: "marcus@acme.com", role: "Editor" },
  { name: "Priya Nair", email: "priya@acme.com", role: "Viewer" },
];

export default function TablePlayground() {
  const [size, setSize] = useState<TableSize>("md");
  const [striped, setStriped] = useState(false);
  const [bordered, setBordered] = useState(false);

  const preview = <Table columns={COLUMNS} data={DATA} size={size} striped={striped} bordered={bordered} />;

  const code = `<Table
  columns={columns}
  data={data}
  size="${size}"${striped ? "\n  striped" : ""}${bordered ? "\n  bordered" : ""}
/>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setStriped((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (striped ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Striped
          </button>
          <button
            type="button"
            onClick={() => setBordered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (bordered ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Bordered
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
