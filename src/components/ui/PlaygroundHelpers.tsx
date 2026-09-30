// Shared bits for every per-component *Playground.tsx (demo-only, alongside
// ShowcaseHelpers.tsx) — the interactive "try it" panel behind the floating
// Playground button, one per component in App.tsx's SHOWCASES map.
import { useState } from "react";
import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { COLORS, type ColorName } from "../../core/tokens";
import { useTheme } from "../../core/theme";
import { cx, swatchClasses } from "./playgroundUtils";
import { highlightCode } from "../../core/highlightCode";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";
import type { CodeBlockVariants } from "./CodeBlock";

export function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  render?: (option: T) => ReactNode;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-fg-subtle">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cx(
              "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
              value === option ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"
            )}
          >
            {render ? render(option) : option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ColorSwatches({
  label = "Color",
  value,
  onChange,
  actions,
}: {
  label?: string;
  value: ColorName;
  onChange: (color: ColorName) => void;
  /** Extra control(s) (e.g. a "Random" shuffle button) rendered inline next to the label. */
  actions?: ReactNode;
}) {
  // Every component's default color is "accent" = the theme accent, so the default shows as that swatch being selected.
  const { accent: themeAccent } = useTheme();
  const selected = value === "accent" ? themeAccent : value;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="block text-xs font-medium text-fg-subtle">{label}</span>
        {actions}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c.base}
            type="button"
            // Picking the theme's own accent goes back to the default ("accent" = follow the theme); any other swatch pins that color.
            onClick={() => onChange(c.base === themeAccent ? "accent" : c.base)}
            aria-label={c.name}
            title={c.base === themeAccent ? `${c.name} (current theme)` : c.name}
            className={cx(
              "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
              swatchClasses[c.base],
              selected === c.base ? "scale-110 ring-fg" : "ring-transparent hover:scale-105"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Preference order when the globally-selected framework has no example yet.
const FALLBACK_ORDER: CodeFramework[] = ["react", "js", "vue", "angular"];

// The pinned "generated code + copy button" strip at the bottom of every
// playground modal. Like CodeBlock (showcase pages), it re-generates from the
// current control state on every render, but per the globally-selected
// framework (Header's dropdown) instead of always React JSX.
export function CodeBar({ code, variants }: { code?: string; variants?: CodeBlockVariants }) {
  const { framework } = useCodeFramework();
  const [copied, setCopied] = useState(false);

  const allVariants: CodeBlockVariants = code !== undefined ? { react: code, ...variants } : { ...variants };
  const activeFramework =
    allVariants[framework] !== undefined ? framework : FALLBACK_ORDER.find((f) => allVariants[f] !== undefined);
  const activeCode = activeFramework ? allVariants[activeFramework] : undefined;
  const isFallback = activeFramework !== undefined && activeFramework !== framework;

  const handleCopy = async () => {
    if (!activeCode) return;
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in this context — silently ignore */
    }
  };

  return (
    <div className="sticky bottom-0 mt-2 border-t border-border bg-surface/95 py-4 backdrop-blur">
      {isFallback && (
        <p className="mb-2 text-xs text-amber-600 dark:text-amber-400">
          No {CODE_FRAMEWORK_LABEL[framework]} example yet for this one — showing {CODE_FRAMEWORK_LABEL[activeFramework!]}.
        </p>
      )}
      <div className="relative rounded-lg border border-dashed border-border-strong bg-surface-muted p-4 pr-24">
        {/* Capped so a long snippet (e.g. a Sidebar with header/footer
            children) scrolls internally instead of growing the modal
            past the viewport — the Copy button stays pinned via the
            parent's `relative` positioning regardless of scroll position. */}
        <pre className="max-h-80 overflow-x-auto overflow-y-auto text-xs leading-relaxed text-fg">
          <code>{activeCode ? highlightCode(activeCode) : null}</code>
        </pre>
        {activeCode && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-fg/10 px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-fg/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}

// The "browser window" chrome every *Playground preview lives inside —
// traffic-light dots + a fake address bar — so a preview reads as "this is
// what it looks like inside a real page" instead of a bare swatch floating
// on its own. `className` can add e.g. `overflow-visible` to override the
// default `overflow-hidden` when something inside (a Tooltip, a menu) needs
// to escape the rounded corners.
export function AppWindowFrame({
  children,
  address = "preview.app",
  className,
}: {
  children: ReactNode;
  address?: string;
  className?: string;
}) {
  return (
    <div className={cx("flex w-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm lg:self-stretch", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-muted px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs text-fg-subtle">{address}</span>
      </div>
      {/* Fills whatever height the preview column gives the window, so the frame runs full height
          (flex, not a fixed height — the modal's own scroll is untouched). */}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

// `AppWindowFrame`'s body for the common case — a component with no fixed
// screen position (most of them: buttons, inputs, badges, cards, …) just
// centered in the window instead of docked to one of its edges.
export function AppWindowBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("flex min-h-[200px] flex-1 items-center justify-center bg-[color-mix(in_srgb,var(--color-accent-500)_6%,var(--color-surface))] p-10", className)}>{children}</div>;
}

// Generic "rest of the page" filler, for components that DO dock to an edge
// (Sidebar, Navbar, Header, Footer, …) — sits alongside them inside
// AppWindowFrame so the preview reads as sitting in a real layout rather
// than floating with nothing around it.
export function PageFillerContent({ className }: { className?: string }) {
  return (
    <div className={cx("flex-1 overflow-y-auto bg-[color-mix(in_srgb,var(--color-accent-500)_6%,var(--color-surface))] p-6", className)}>
      <h2 className="text-lg font-semibold text-fg">Overview</h2>
      <p className="mt-1 text-sm text-fg-muted">A quick look at how this sits next to real content.</p>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-surface p-3">
            <p className="text-xs text-fg-subtle">Metric {i}</p>
            <p className="mt-1 text-xl font-semibold text-fg">{(i * 1234).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PlaygroundLayout({
  preview,
  children,
  code,
  variants,
}: {
  preview: ReactNode;
  children: ReactNode;
  code?: string;
  variants?: CodeBlockVariants;
}) {
  return (
    // Stacked (preview, then controls, then code) below `lg` — that's a narrow modal, so there's no
    // room for two columns anyway, and the modal body scrolls as one. From `lg` up the playground is a
    // fixed-height two-pane view sized to the modal (its max-h-[85vh] minus the header and body
    // padding): the preview pane on the left stays put at full height, and only the controls+code pane
    // on the right scrolls when its content is taller. `grid-rows-[minmax(0,1fr)]` is what lets the
    // right pane shrink to the container and scroll instead of stretching the whole grid.
    <div className="flex flex-col gap-6 lg:grid lg:h-[calc(85vh-6.75rem)] lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] lg:gap-8 lg:overflow-hidden">
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border-none bg-surface-muted lg:h-full lg:overflow-auto">
        {preview}
      </div>
      <div className="flex min-w-0 flex-col gap-6 lg:h-full lg:overflow-y-auto lg:p-2">
        <div className="grid gap-4 sm:grid-cols-2">{children}</div>
        <CodeBar code={code} variants={variants} />
      </div>
    </div>
  );
}
