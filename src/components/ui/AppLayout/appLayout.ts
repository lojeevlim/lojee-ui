// Pure layout model for <App> — no React, no playground state. A layout is a matrix of section names
// (one entry per grid cell); the CSS Grid template is *derived* from it, so there is exactly one
// source of truth and no per-layout CSS.
import type { CSSProperties } from "react";
import { THEME_MODES, type ResolvedTheme } from "../../../core/theme";

export type AppSection = "top" | "side" | "main" | "footer";
export type GridLayout = AppSection[][];

export const APP_SECTIONS: AppSection[] = ["top", "side", "main", "footer"];

export const DEFAULT_LAYOUT: GridLayout = [
  ["top", "top"],
  ["side", "main"],
  ["footer", "footer"],
];

/** Reuses the global theme registry (core/theme.ts).
 * A new theme is a new `ResolvedTheme` entry plus a `[data-theme="…"]` token block in theme.css; nothing
 * in the layout code changes. */
export type AppTheme = ResolvedTheme;
export const APP_THEME_OPTIONS = THEME_MODES;

/** `"top top" "side main" "footer footer"` — the value of `grid-template-areas`. */
export function gridTemplateAreas(layout: GridLayout): string {
  return layout.map((row) => `"${row.join(" ")}"`).join(" ");
}

// The main region flexes; everything else sizes to its content.
function tracks(lines: AppSection[][]): string {
  return lines.map((cells) => (cells.includes("main") ? "minmax(0,1fr)" : "auto")).join(" ");
}

export function gridTemplateRows(layout: GridLayout): string {
  return tracks(layout);
}

export function gridTemplateColumns(layout: GridLayout): string {
  return tracks(transpose(layout));
}

/** CSS variables consumed by <App>'s static Tailwind classes (`@md:[grid-template-areas:var(--app-areas)]`),
 * so arbitrary layouts work without generating class names Tailwind couldn't detect. */
export function appGridStyle(layout: GridLayout): CSSProperties {
  return {
    "--app-areas": gridTemplateAreas(layout),
    "--app-rows": gridTemplateRows(layout),
    "--app-cols": gridTemplateColumns(layout),
  } as CSSProperties;
}

function transpose(layout: GridLayout): AppSection[][] {
  return (layout[0] ?? []).map((_, c) => layout.map((row) => row[c]));
}

/** True when the matrix is rectangular, contains every section, and each section's cells form one
 * filled rectangle (a requirement of `grid-template-areas`). */
export function isValidLayout(layout: GridLayout): boolean {
  const cols = layout[0]?.length ?? 0;
  if (!cols || layout.some((row) => row.length !== cols)) return false;
  return APP_SECTIONS.every((section) => {
    const cells: [number, number][] = [];
    layout.forEach((row, r) => row.forEach((s, c) => s === section && cells.push([r, c])));
    if (!cells.length) return false;
    const rs = cells.map(([r]) => r);
    const cs = cells.map(([, c]) => c);
    const area = (Math.max(...rs) - Math.min(...rs) + 1) * (Math.max(...cs) - Math.min(...cs) + 1);
    return area === cells.length;
  });
}

/** Two sections trade places, each taking over the other's cells. */
export function swapSections(layout: GridLayout, a: AppSection, b: AppSection): GridLayout {
  if (a === b) return layout;
  return layout.map((row) => row.map((s) => (s === a ? b : s === b ? a : s)));
}

/** Hands one cell to `section` — a region grows into (or shrinks back from) a neighbouring cell. If that
 * would leave either region non-rectangular, the two sections trade places instead. */
export function claimCell(layout: GridLayout, section: AppSection, row: number, col: number): GridLayout {
  const owner = layout[row]?.[col];
  if (!owner || owner === section) return layout;
  const next = layout.map((r) => [...r]);
  next[row][col] = section;
  return isValidLayout(next) ? next : swapSections(layout, section, owner);
}

export type DockEdge = "left" | "right" | "top" | "bottom";

/** Pulls a section out of the layout and re-attaches it along one edge, spanning the full side.
 * Returns the original layout if the result wouldn't be a valid grid. */
export function dockSection(layout: GridLayout, section: AppSection, edge: DockEdge): GridLayout {
  const trimmed = dropFull(layout, section);
  // A hole left behind can be closed from either direction; take the first result that's still a valid grid.
  for (const axis of ["row", "col"] as const) {
    const rest = collapse(fill(trimmed, section, axis));
    const cols = rest[0].length;
    let next: GridLayout;
    if (edge === "top") next = [Array<AppSection>(cols).fill(section), ...rest];
    else if (edge === "bottom") next = [...rest, Array<AppSection>(cols).fill(section)];
    else if (edge === "left") next = rest.map((row) => [section, ...row]);
    else next = rest.map((row) => [...row, section]);
    next = collapse(next);
    if (isValidLayout(next)) return next;
  }
  return layout;
}

// Rows/columns made up entirely of `section` disappear.
function dropFull(layout: GridLayout, section: AppSection): GridLayout {
  const rows = layout.filter((row) => !row.every((s) => s === section));
  const kept = rows.length ? rows : layout;
  const colsToKeep = (kept[0] ?? []).map((_, c) => !kept.every((row) => row[c] === section));
  return kept.map((row) => row.filter((_, c) => colsToKeep[c]));
}

// Any remaining cells of `section` are taken over by a neighbour — along the row first or the column first.
function fill(layout: GridLayout, section: AppSection, axis: "row" | "col"): GridLayout {
  const out = layout.map((row) => [...row]);
  const other = (x: AppSection) => x !== section;
  for (let guard = 0; guard < 16; guard++) {
    let changed = false;
    out.forEach((row, r) =>
      row.forEach((s, c) => {
        if (s !== section) return;
        const inRow = row.slice(c + 1).find(other) ?? [...row.slice(0, c)].reverse().find(other);
        const inCol = out.slice(r + 1).map((x) => x[c]).find(other) ?? out.slice(0, r).map((x) => x[c]).reverse().find(other);
        const neighbour = axis === "row" ? (inRow ?? inCol) : (inCol ?? inRow);
        if (neighbour) {
          out[r][c] = neighbour;
          changed = true;
        }
      })
    );
    if (!changed) break;
  }
  return out;
}

// Merge identical adjacent rows/columns so a layout never carries redundant tracks.
function collapse(layout: GridLayout): GridLayout {
  const dedupe = (lines: AppSection[][]) =>
    lines.filter((line, i) => i === 0 || line.join() !== lines[i - 1].join());
  return transpose(dedupe(transpose(dedupe(layout))));
}
