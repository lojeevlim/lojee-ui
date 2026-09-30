// Demo-only (playground) drag-and-drop editor for an <App> layout. Not part of the shipped library.
import { useState } from "react";
import {
  claimCell,
  dockSection,
  type AppSection,
  type DockEdge,
  type GridLayout,
} from "./appLayout";

const EDGES: { edge: DockEdge; label: string; cls: string }[] = [
  { edge: "top", label: "Dock top", cls: "left-6 right-6 top-0 h-5" },
  { edge: "bottom", label: "Dock bottom", cls: "bottom-0 left-6 right-6 h-5" },
  { edge: "left", label: "Dock left", cls: "bottom-6 left-0 top-6 w-5" },
  { edge: "right", label: "Dock right", cls: "bottom-6 right-0 top-6 w-5" },
];

// Cells of one section share a tint, so a section spanning several cells reads as one region.
const TINT: Record<AppSection, string> = {
  top: "border-accent-300 bg-accent-500/15 text-accent-800 dark:border-accent-700 dark:text-accent-200",
  side: "border-border-strong bg-surface text-fg-muted",
  main: "border-border bg-surface-muted text-fg-muted",
  footer: "border-accent-300 bg-accent-500/5 text-accent-800 dark:border-accent-700 dark:text-accent-200",
};

const LABEL: Record<AppSection, string> = { top: "Top", side: "Side", main: "Main", footer: "Footer" };

export default function LayoutEditor({ layout, onChange }: { layout: GridLayout; onChange: (next: GridLayout) => void }) {
  const [dragging, setDragging] = useState<AppSection | null>(null);
  const [over, setOver] = useState<string | null>(null);

  const end = () => {
    setDragging(null);
    setOver(null);
  };
  const allow = (key: string) => (e: React.DragEvent) => {
    if (!dragging) return;
    e.preventDefault();
    setOver(key);
  };

  return (
    <div className="relative select-none p-6">
      {EDGES.map(({ edge, label, cls }) => (
        <div
          key={edge}
          onDragOver={allow(edge)}
          onDragLeave={() => setOver(null)}
          onDrop={(e) => {
            e.preventDefault();
            if (dragging) onChange(dockSection(layout, dragging, edge));
            end();
          }}
          title={label}
          aria-label={label}
          className={`absolute rounded transition-colors ${cls} ${
            dragging ? (over === edge ? "bg-accent-500/40" : "bg-accent-500/10") : "bg-transparent"
          }`}
        />
      ))}
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${layout[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${layout.length}, minmax(2.25rem, 1fr))`,
        }}
      >
        {layout.map((row, r) =>
          row.map((section, c) => {
            const key = `${r}-${c}`;
            return (
              <div
                key={key}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", section);
                  e.dataTransfer.effectAllowed = "move";
                  setDragging(section);
                }}
                onDragEnd={end}
                onDragOver={allow(key)}
                onDragLeave={() => setOver(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  if (dragging) onChange(claimCell(layout, dragging, r, c));
                  end();
                }}
                className={`flex cursor-grab items-center justify-center rounded-md border text-xs font-medium transition-colors active:cursor-grabbing ${
                  over === key && dragging !== section
                    ? "border-accent-500 bg-accent-500/30 text-fg"
                    : TINT[section]
                } ${dragging === section ? "opacity-50" : ""}`}
              >
                {LABEL[section]}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
