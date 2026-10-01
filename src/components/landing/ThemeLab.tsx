import { useState } from "react";
import { highlightCode } from "../../core/highlightCode";
import { ThemeProvider } from "../ui/Theme/ThemeProvider";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Switch } from "../ui/Switch/Switch";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { NavigationMenu } from "../ui/NavigationMenu/NavigationMenu";
import { Alert } from "../ui/Alert/Alert";
import { COLORS } from "../../core/tokens";
import { useTheme, type AccentName, type ThemeMode } from "../../core/theme";
import type { ActiveVariant } from "../../core/activeVariant";

const VARIANTS: ActiveVariant[] = ["solid", "outline", "soft"];

/** Interactive theming demo: an isolated ThemeProvider driven by the controls beside it. */
export default function ThemeLab() {
  // The preview starts from the site's own theme and accent, so it matches what the visitor already sees.
  const site = useTheme();
  const [mode, setMode] = useState<ThemeMode>(site.mode);
  const [accent, setAccent] = useState<AccentName>(site.accent);
  const [variant, setVariant] = useState<ActiveVariant>("solid");

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Mode</p>
          <div className="grid grid-cols-2 rounded-lg bg-surface-muted p-1">
            {(["light", "dark"] as ThemeMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-md py-1.5 text-sm font-medium capitalize transition-all duration-200 ${mode === m ? "bg-surface text-fg shadow-sm" : "text-fg-subtle hover:text-fg"}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Accent</p>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((c) => (
              <button
                key={c.base}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={accent === c.base}
                onClick={() => setAccent(c.base)}
                className={`h-7 rounded-full border-2 transition-all duration-200 hover:scale-110 ${accent === c.base ? "scale-110 border-fg" : "border-transparent"}`}
                style={{ backgroundColor: `var(--color-${c.base}-500)` }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Active-item style</p>
          <div className="grid grid-cols-3 rounded-lg bg-surface-muted p-1">
            {VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={`rounded-md py-1.5 text-xs font-medium capitalize transition-all duration-200 ${variant === v ? "bg-surface text-fg shadow-sm" : "text-fg-subtle hover:text-fg"}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-surface-muted p-3 font-mono text-[11px] leading-relaxed text-fg-muted"><code>{highlightCode(`<ThemeProvider
  defaultMode="${mode}"
  defaultAccent="${accent}"
  defaultActiveVariant="${variant}"
>`)}</code></pre>
      </div>

      <ThemeProvider isolated mode={mode} accent={accent} activeVariant={variant}>
        <div className="rounded-2xl border border-border bg-surface p-5 text-fg shadow-sm transition-colors duration-500 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="max-w-full overflow-x-auto"><NavigationMenu items={[{ label: "Overview", active: true }, { label: "Analytics" }, { label: "Reports" }, { label: "Settings" }]} /></div>
            <Badge variant="soft" label="Live preview" />
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="space-y-4 rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold text-fg">Quarterly goal</p>
              <ProgressBar value={72} showLabel />
              <div className="flex flex-wrap gap-2">
                <Button label="Save" />
                <Button variant="outline" label="Cancel" />
                <Button variant="soft" label="More" />
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm font-semibold text-fg">Preferences</p>
              <Switch label="Email notifications" defaultChecked />
              <Switch label="Weekly digest" />
              <div className="flex flex-wrap gap-2">
                <Badge variant="solid" label="Solid" />
                <Badge variant="soft" label="Soft" />
                <Badge variant="outline" label="Outline" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Alert title="Everything follows the theme">Change the accent or mode on the left — buttons, switches, progress and navigation restyle instantly.</Alert>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
