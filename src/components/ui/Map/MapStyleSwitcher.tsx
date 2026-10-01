import { useState } from "react";
import { cx } from "../../../core/tokens";
import { MAP_STYLE_NAMES, type MapStyleName } from "./mapUtils";

const LABELS: Record<MapStyleName, string> = {
  auto: "Auto",
  light: "Light",
  dark: "Dark",
  voyager: "Voyager",
  "light-minimal": "Light · no labels",
  "dark-minimal": "Dark · no labels",
  osm: "Street",
  satellite: "Satellite",
};

// Tiny preview swatches so the options read at a glance.
const SWATCH: Record<MapStyleName, string> = {
  auto: "linear-gradient(135deg,#f1f5f9 50%,#1e293b 50%)",
  light: "#f1f5f9",
  dark: "#1e293b",
  voyager: "#e9e4d8",
  "light-minimal": "#f8fafc",
  "dark-minimal": "#0f172a",
  osm: "#aad3a0",
  satellite: "linear-gradient(135deg,#3b5d3a,#2c4a6b)",
};

interface Props {
  value: MapStyleName | (string & {});
  dark: boolean;
  onChange: (style: MapStyleName) => void;
}

/** A small base-map picker rendered over the top-left corner of a `Map`. */
export function MapStyleSwitcher({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const current = (MAP_STYLE_NAMES as readonly string[]).includes(value) ? (value as MapStyleName) : null;
  return (
    <div className="absolute left-2.5 top-2.5 z-10 text-xs">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-[10px] bg-surface px-2.5 py-1.5 font-medium text-fg shadow-md ring-1 ring-border transition hover:bg-surface-muted"
      >
        <span className="size-3.5 rounded-full ring-1 ring-border-strong" style={{ background: current ? SWATCH[current] : "var(--lojee-border)" }} />
        {current ? LABELS[current] : "Custom"}
        <span aria-hidden className={cx("text-fg-subtle transition", open && "rotate-180")}>▾</span>
      </button>
      {open && (
        <ul role="listbox" className="mt-1.5 w-44 overflow-hidden rounded-xl bg-surface p-1 shadow-lg ring-1 ring-border">
          {MAP_STYLE_NAMES.map((name) => (
            <li key={name} role="option" aria-selected={name === current}>
              <button
                type="button"
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={cx(
                  "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-fg transition hover:bg-surface-muted",
                  name === current && "bg-accent-50 font-semibold text-accent-700 dark:bg-accent-950 dark:text-accent-300"
                )}
              >
                <span className="size-3.5 shrink-0 rounded-full ring-1 ring-border-strong" style={{ background: SWATCH[name] }} />
                {LABELS[name]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
