import { Table, type TableAction, type TableProps, type TableRowKey } from "../components/ui/Table/Table";

// A custom event carries a single `detail`, but Table's callbacks take several arguments — so the element bundles
// them into one object: `action` is `{ action, row }` and `selectionchange` is `{ keys, rows }`.
type RowData = Record<string, unknown>;
type TableElementProps = Omit<TableProps<RowData>, "onAction" | "onSelectionChange"> & {
  onAction?: (detail: { action: TableAction; row: RowData }) => void;
  onSelectionChange?: (detail: { keys: TableRowKey[]; rows: RowData[] }) => void;
};

export function TableElement({ onAction, onSelectionChange, ...rest }: TableElementProps) {
  return (
    <Table<RowData>
      {...rest}
      onAction={onAction && ((action, row) => onAction({ action, row }))}
      onSelectionChange={onSelectionChange && ((keys, rows) => onSelectionChange({ keys, rows }))}
    />
  );
}
