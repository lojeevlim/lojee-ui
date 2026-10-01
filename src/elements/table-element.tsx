import { Table, type TableAction, type TableProps } from "../components/ui/Table/Table";

// A custom event carries a single `detail`, but Table's `onAction` takes (action, row) — so the element
// bundles both into one object: `event.detail` is `{ action, row }`.
type RowData = Record<string, unknown>;
type TableElementProps = Omit<TableProps<RowData>, "onAction"> & {
  onAction?: (detail: { action: TableAction; row: RowData }) => void;
};

export function TableElement({ onAction, ...rest }: TableElementProps) {
  return <Table<RowData> {...rest} onAction={onAction && ((action, row) => onAction({ action, row }))} />;
}
