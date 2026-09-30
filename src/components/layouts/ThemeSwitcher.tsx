import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { COLORS } from "../../core/tokens";
import { THEME_MODES, useTheme, type ThemeMode } from "../../core/theme";
import { ACTIVE_VARIANTS } from "../../core/activeVariant";

const MODE_LABEL = Object.fromEntries(THEME_MODES.map((m) => [m.value, m.label])) as Record<ThemeMode, string>;

/** One menu for light/dark and the accent color — drives ThemeProvider. */
export default function ThemeSwitcher() {
  const { mode, setMode, accent, setAccent, activeVariant, setActiveVariant } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
      >
        <Preview theme={mode} accent={accent} />
        <span className="hidden capitalize sm:inline">
          {MODE_LABEL[mode]} · {accent}
        </span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Theme"
          className="absolute right-0 top-full z-50 mt-2 max-h-96 w-56 overflow-y-auto rounded-lg border border-border bg-surface-raised p-2 shadow-lg"
        >
          <p className="px-2 pb-1 pt-1 text-xs font-semibold text-fg-subtle">Theme</p>
          <ul>
            {THEME_MODES.map(({ value, label }) => (
              <li key={value}>
                <Row
                  active={mode === value}
                  onSelect={() => setMode(value)}
                  preview={<Preview theme={value} accent={accent} />}
                  label={label}
                />
              </li>
            ))}
          </ul>

          <p className="px-2 pb-1 pt-3 text-xs font-semibold text-fg-subtle">Active items</p>
          <ul>
            {ACTIVE_VARIANTS.map(({ value, label }) => (
              <li key={value}>
                <Row
                  active={activeVariant === value}
                  onSelect={() => setActiveVariant(value)}
                  preview={<ActiveSwatch variant={value} />}
                  label={label}
                />
              </li>
            ))}
          </ul>

          <p className="px-2 pb-1 pt-3 text-xs font-semibold text-fg-subtle">Accent</p>
          <ul>
            {COLORS.map((c) => (
              <li key={c.base}>
                <Row active={accent === c.base} onSelect={() => setAccent(c.base)} preview={<Preview theme={mode} accent={c.base} />} label={c.name} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Row({ active, onSelect, preview, label }: { active: boolean; onSelect: () => void; preview: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-muted ${
        active ? "bg-surface-muted text-fg" : "text-fg-muted"
      }`}
    >
      {preview}
      <span className="flex-1 truncate">{label}</span>
      <Check size={14} className={`shrink-0 ${active ? "visible" : "invisible"}`} />
    </button>
  );
}

// 2×2 dot tile. `data-theme` scopes the tile to that theme's tokens, so it previews the real
// surface / foreground colors (like the swatches in daisyUI's theme menu) instead of the page's own.
function Preview({ theme, accent }: { theme: string; accent: string }) {
  const dots = ["var(--color-fg)", `var(--color-${accent}-600)`, `var(--color-${accent}-400)`, `var(--color-${accent}-200)`];
  return (
    <span
      data-theme={theme}
      aria-hidden
      className="grid shrink-0 grid-cols-2 gap-0.5 rounded-md border border-border bg-surface p-1 shadow-sm"
    >
      {dots.map((bg, i) => (
        <span key={i} className="size-1.5 rounded-full" style={{ backgroundColor: bg }} />
      ))}
    </span>
  );
}

// Tiny sample of how an active item looks in each variant, in the current accent.
function ActiveSwatch({ variant }: { variant: "solid" | "outline" | "soft" }) {
  const base = "block h-[22px] w-[22px] shrink-0 rounded-md";
  const style =
    variant === "solid"
      ? { backgroundColor: "var(--color-accent-600)" }
      : variant === "outline"
        ? { boxShadow: "inset 0 0 0 1.5px var(--color-accent-600)" }
        : { backgroundColor: "color-mix(in srgb, var(--color-accent-600) 18%, transparent)" };
  return <span aria-hidden className={base} style={style} />;
}
