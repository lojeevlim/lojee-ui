// Shared bits for every per-component *Playground.tsx (demo-only, alongside
// ShowcaseHelpers.tsx) — the interactive "try it" panel behind the floating
// Playground button, one per component in App.tsx's SHOWCASES map.
import { useEffect, useRef, useState } from "react";
import { Tooltip } from "./Tooltip/Tooltip";
import { ColorPicker } from "./ColorPicker/ColorPicker";
import type { ReactNode } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { COLORS, type ColorName } from "../../core/tokens";
import { useTheme } from "../../core/theme";
import { cx, swatchClasses } from "./playgroundUtils";
import { highlightCode } from "../../core/highlightCode";
import { closeCustomElements } from "../../core/htmlCode";
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
  custom = false,
}: {
  label?: string;
  value: string;
  onChange(color: ColorName): void;
  /** Extra control(s) (e.g. a "Random" shuffle button) rendered inline next to the label. */
  actions?: ReactNode;
  /** Adds a "Custom" swatch that opens the ColorPicker for any color, and passes it on as a "#rrggbb" string. Use it for components whose `color` accepts any CSS color, not only the built-in names. */
  custom?: boolean;
}) {
  // Every component's default color is "accent" = the theme accent, so the default shows as that swatch being selected.
  const { accent: themeAccent } = useTheme();
  const isNamed = COLORS.some((c) => c.base === value) || value === "accent";
  const selected = value === "accent" ? themeAccent : value;
  // Without `custom`, `onChange` only ever receives a built-in name; with it, a hex string may arrive too.
  const emit = onChange as (color: string) => void;
  const [pickerOpen, setPickerOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pickerOpen) return;
    // composedPath, not contains(e.target): clicks inside a shadow root are retargeted to their host.
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) setPickerOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPickerOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [pickerOpen]);

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="block text-xs font-medium text-fg-subtle">{label}</span>
        {actions}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c.base}
            type="button"
            // Picking the theme's own accent goes back to the default ("accent" = follow the theme); any other swatch pins that color.
            onClick={() => emit(c.base === themeAccent ? "accent" : c.base)}
            aria-label={c.name}
            title={c.base === themeAccent ? `${c.name} (current theme)` : c.name}
            className={cx(
              "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
              swatchClasses[c.base],
              selected === c.base ? "scale-110 ring-fg" : "ring-transparent hover:scale-105"
            )}
          />
        ))}
        {custom && (
          <button
            type="button"
            aria-label="Custom color"
            aria-expanded={pickerOpen}
            title="Pick any color"
            onClick={() => setPickerOpen((v) => !v)}
            className={cx(
              "flex h-6 items-center gap-1.5 rounded-full pl-0.5 pr-2 text-xs font-medium text-fg-muted ring-2 ring-offset-2 transition-transform",
              !isNamed ? "scale-105 ring-fg" : "ring-transparent hover:scale-105"
            )}
          >
            <span
              className="h-5 w-5 rounded-full ring-1 ring-inset ring-black/10"
              style={!isNamed ? { backgroundColor: value } : { backgroundImage: "conic-gradient(#ef4444, #f59e0b, #22c55e, #0ea5e9, #8b5cf6, #ec4899, #ef4444)" }}
            />
            Custom
          </button>
        )}
      </div>
      {custom && pickerOpen && (
        <div className="absolute left-0 top-full z-30 mt-2 rounded-xl border border-border bg-surface p-3 shadow-lg">
          <ColorPicker value={isNamed ? undefined : value} onChange={(hex) => emit(hex)} />
        </div>
      )}
    </div>
  );
}

// Preference order when the globally-selected framework has no example yet.
const FALLBACK_ORDER: CodeFramework[] = ["react", "js", "vue", "angular"];

const MINIMIZE_MIN_LINES = 8;

// The pinned "generated code + copy button" strip at the bottom of every
// playground modal. Like CodeBlock (showcase pages), it re-generates from the
// current control state on every render, but per the globally-selected
// framework (Header's dropdown) instead of always React JSX.
export function CodeBar({ code, variants, onScrollDown }: { code?: string; variants?: CodeBlockVariants; onScrollDown?: () => void }) {
  const { framework } = useCodeFramework();
  const [copied, setCopied] = useState(false);
  // Minimized: just the snippet's first line beside the Copy button, so the controls above get the room.
  const [minimized, setMinimized] = useState(false);

  const allVariants: CodeBlockVariants = code !== undefined ? { react: code, ...variants } : { ...variants };
  const activeFramework =
    allVariants[framework] !== undefined ? framework : FALLBACK_ORDER.find((f) => allVariants[f] !== undefined);
  const rawCode = activeFramework ? allVariants[activeFramework] : undefined;
  // The plain-HTML tab never shows self-closed custom elements (invalid HTML) — see core/htmlCode.ts.
  const activeCode = rawCode !== undefined && activeFramework === "js" ? closeCustomElements(rawCode) : rawCode;
  const isFallback = activeFramework !== undefined && activeFramework !== framework;
  // Only snippets taller than this get the minimize toggle; short ones have nothing worth hiding.
  const isLong = (activeCode?.split("\n").length ?? 0) > MINIMIZE_MIN_LINES;
  const showMinimized = isLong && minimized;

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
      {/* "More above the fold" hint: a bouncing chevron resting just above the code examples. Only given while the
          controls pane has more to scroll; clicking it scrolls down. */}
      {onScrollDown && (
        <Tooltip
          content="More below"
          position="right"
          size="xs"
          open
          className="absolute -top-8 left-1/2 hidden -translate-x-1/2 lg:block motion-safe:animate-bounce"
        >
          <button
            type="button"
            aria-label="Scroll down for more"
            onClick={onScrollDown}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-fg-muted shadow-lg transition-colors hover:text-fg"
          >
            <ChevronDown size={16} />
          </button>
        </Tooltip>
      )}
      {isFallback && (
        <p className="mb-2 text-xs text-amber-600 dark:text-amber-400">
          No {CODE_FRAMEWORK_LABEL[framework]} example yet for this one — showing {CODE_FRAMEWORK_LABEL[activeFramework!]}.
        </p>
      )}
      <div className={cx("relative rounded-lg border border-dashed border-border-strong bg-surface-muted pr-40", showMinimized ? "px-4 py-2.5" : "p-4")}>
        {/* Capped so a long snippet (e.g. a Sidebar with header/footer
            children) scrolls internally instead of growing the modal
            past the viewport — the Copy button stays pinned via the
            parent's `relative` positioning regardless of scroll position. */}
        <pre className={cx("overflow-x-auto text-xs leading-relaxed text-fg", showMinimized ? "max-h-[1.4em] overflow-y-hidden" : "max-h-80 overflow-y-auto")}>
          <code>{activeCode ? highlightCode(activeCode) : null}</code>
        </pre>
        {activeCode && (
          <div className={cx("absolute right-3 flex items-center gap-1.5", showMinimized ? "top-1/2 -translate-y-1/2" : "top-3")}>
            {isLong && (
            <button
              type="button"
              onClick={() => setMinimized((v) => !v)}
              aria-expanded={!minimized}
              aria-label={minimized ? "Expand code" : "Minimize code"}
              title={minimized ? "Expand code" : "Minimize code"}
              className="inline-flex items-center rounded-md bg-fg/10 p-1.5 text-fg transition-colors hover:bg-fg/20"
            >
              <ChevronDown size={14} className={minimized ? "rotate-180" : ""} />
            </button>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md bg-fg/10 px-2.5 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-fg/20"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
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

// The right-hand controls + code pane. From `lg` up it scrolls on its own; `children` is a render function that gets
// `moreBelow` (is there content below the fold?) and `scrollDown` so the code bar can show a bouncing chevron just above
// itself. Below `lg` the whole modal scrolls instead, and the chevron isn't shown there.
function ScrollPane({ children }: { children: (state: { moreBelow: boolean; scrollDown: () => void }) => ReactNode }) {
  // The pane element is kept in state (a callback ref) so the effect below re-runs when it mounts, and so the
  // click handler can use it without reading a ref during render.
  const [pane, setPane] = useState<HTMLDivElement | null>(null);
  const [moreBelow, setMoreBelow] = useState(false);

  useEffect(() => {
    if (!pane) return;
    const update = () => setMoreBelow(pane.scrollHeight - pane.scrollTop - pane.clientHeight > 8);
    update();
    pane.addEventListener("scroll", update, { passive: true });
    // Content grows and shrinks as controls change (and the code sample with them), so watch sizes too.
    const obs = new ResizeObserver(update);
    obs.observe(pane);
    Array.from(pane.children).forEach((child) => obs.observe(child));
    return () => {
      pane.removeEventListener("scroll", update);
      obs.disconnect();
    };
  }, [pane]);

  const scrollDown = () => pane?.scrollBy({ top: pane.clientHeight * 0.8, behavior: "smooth" });

  return (
    <div ref={setPane} className="flex min-w-0 flex-col gap-6 lg:h-full lg:overflow-y-auto lg:p-2">
      {children({ moreBelow, scrollDown })}
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
      <ScrollPane>
        {({ moreBelow, scrollDown }) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2">{children}</div>
            <CodeBar code={code} variants={variants} onScrollDown={moreBelow ? scrollDown : undefined} />
          </>
        )}
      </ScrollPane>
    </div>
  );
}
