import { Icon } from "../Icons/Icon";
import { cx } from "../../../core/tokens";
import type { FlowNodeType } from "./flowLayout";

export interface FlowToolbarProps {
  editable: boolean;
  zoomable: boolean;
  types: FlowNodeType[];
  typeKey: string;
  onTypeChange: (key: string) => void;
  onAdd: () => void;
  connectMode: boolean;
  connectFrom: string | null;
  onToggleConnect: () => void;
  canRename: boolean;
  onRename: () => void;
  canDelete: boolean;
  onDelete: () => void;
  onReset: () => void;
  zoom: number;
  onZoom: (next: number) => void;
  /** Stack the tools in a column (used when the toolbar sits at the right of the diagram). */
  vertical?: boolean;
}

const btn =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg disabled:pointer-events-none disabled:opacity-40";

/** The editor / zoom toolbar shown above a FlowDiagram with `editable` or `zoomable`. */
export function FlowToolbar(p: FlowToolbarProps) {
  const v = !!p.vertical;
  // In a column every button stretches to the same width and left-aligns its label.
  const b = (extra = "") => cx(btn, v && "h-7 w-full justify-start gap-1 px-2 text-[11px]", extra);
  const icon = v ? 12 : 14;
  return (
    <div
      className={cx("flex text-fg", v ? "w-28 shrink-0 flex-col items-stretch gap-1.5" : "mb-2 flex-wrap items-center gap-2")}
      role="toolbar"
      aria-orientation={v ? "vertical" : "horizontal"}
      aria-label="Diagram tools"
    >
      {p.editable && (
        <>
          <div className={cx("flex items-center gap-1", v && "flex-col items-stretch")}>
            <select
              value={p.typeKey}
              onChange={(e) => p.onTypeChange(e.target.value)}
              aria-label="Element type"
              className={cx("h-8 w-full rounded-md border border-border bg-surface px-2 text-xs text-fg focus:outline-none focus:ring-2 focus:ring-accent-500/40", v && "h-7 px-1 text-[11px]")}
            >
              {p.types.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
            <button type="button" className={b("border-accent-600 bg-accent-600 text-white hover:bg-accent-700 hover:text-white")} onClick={p.onAdd}>
              <Icon name="plus" size={icon} /> Add
            </button>
          </div>
          <button type="button" className={b()} aria-pressed={p.connectMode} onClick={p.onToggleConnect} style={p.connectMode ? { borderColor: "var(--color-accent-500)", color: "var(--color-accent-600)" } : undefined}>
            <Icon name="link" size={icon} /> {p.connectMode ? (p.connectFrom ? "Pick target…" : "Pick source…") : "Connect"}
          </button>
          <button type="button" className={b()} onClick={p.onRename} disabled={!p.canRename}>
            <Icon name="pencil" size={icon} /> Rename
          </button>
          <button type="button" className={b()} onClick={p.onDelete} disabled={!p.canDelete}>
            <Icon name="trash-2" size={icon} /> Delete
          </button>
          <button type="button" className={b()} onClick={p.onReset} title="Restore the original diagram">
            <Icon name="refresh-cw" size={icon} /> Reset
          </button>
        </>
      )}
      {p.zoomable && (
        <div className={cx("flex items-center gap-1", v ? "justify-between border-t border-border pt-2" : "ml-auto")}>
          <button type="button" className={cx(btn, "w-8 justify-center px-0", v && "h-7 w-7")} aria-label="Zoom out" onClick={() => p.onZoom(p.zoom - 0.2)} disabled={p.zoom <= 0.5}>
            <Icon name="minus" size={icon} />
          </button>
          <button type="button" className={cx(btn, "min-w-[3.25rem] justify-center tabular-nums", v && "h-7 min-w-0 flex-1 px-1 text-[11px]")} aria-label="Reset zoom" onClick={() => p.onZoom(1)}>
            {Math.round(p.zoom * 100)}%
          </button>
          <button type="button" className={cx(btn, "w-8 justify-center px-0", v && "h-7 w-7")} aria-label="Zoom in" onClick={() => p.onZoom(p.zoom + 0.2)} disabled={p.zoom >= 2.5}>
            <Icon name="plus" size={icon} />
          </button>
        </div>
      )}
    </div>
  );
}
