import { useState, type ReactNode } from "react";
import { ThemeProvider } from "../ui/Theme/ThemeProvider";
import { Icon } from "../ui/Icons/Icon";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Avatar } from "../ui/Avatar/Avatar";
import { Card } from "../ui/Card/Card";
import { Stat } from "../ui/Stat/Stat";
import { Alert } from "../ui/Alert/Alert";
import { Switch } from "../ui/Switch/Switch";
import { Chart } from "../ui/Chart/Chart";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { NavigationMenu } from "../ui/NavigationMenu/NavigationMenu";
import { ANIMATED_VARIANTS, type AnimatedVariant } from "../../core/animated";
import { TRANSITIONS, HOVER_EFFECTS, type TransitionVariant, type HoverEffect } from "../../core/motion";
import { COLORS, type ColorName } from "../../core/tokens";
import { useTheme, type Accent, type ThemeMode } from "../../core/theme";
import type { ActiveVariant } from "../../core/activeVariant";

const CHART_DATA = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 58 },
];
const PULSE_COLORS: ColorName[] = ["accent", "violet", "rose", "amber", "emerald", "blue"];
const VARIANTS: ActiveVariant[] = ["solid", "outline", "soft"];

const LABEL = "mb-1 text-[10px] font-medium uppercase tracking-wide text-fg-subtle";

function Chips<T extends string>({ label, options, value, onChange, action }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void; action?: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className={LABEL}>{label}</p>
        {action}
      </div>
      <div className="flex flex-wrap gap-1">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-md px-1.5 py-px text-[10px] font-medium transition-all duration-200 ${value === o ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className={LABEL}>{label}</p>
      <div className="grid rounded-lg bg-surface-muted p-0.5" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-md py-0.5 text-[11px] font-medium capitalize transition-all duration-200 ${value === o ? "bg-surface text-fg shadow-sm" : "text-fg-subtle hover:text-fg"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** One live preview card driven by one set of controls: theme (mode, accent, active-item style) and motion (enter, attention, hover). */
export default function LookAndFeelLab() {
  // The preview starts from the site's own theme and accent, so it matches what the visitor already sees.
  const site = useTheme();
  const [mode, setMode] = useState<ThemeMode>(site.mode);
  const [accent, setAccent] = useState<Accent>(site.accent);
  const [variant, setVariant] = useState<ActiveVariant>("solid");

  const [transition, setTransition] = useState<TransitionVariant>("slide-up");
  const [effect, setEffect] = useState<"none" | AnimatedVariant>("pulse");
  const [hover, setHover] = useState<"none" | HoverEffect>("lift");
  const [pulseColor, setPulseColor] = useState<ColorName>("accent");
  const [gradient, setGradient] = useState(true);
  const [run, setRun] = useState(0);

  const animation = effect === "none" ? undefined : effect;
  const hoverEffect = hover === "none" ? undefined : hover;
  const pulseGradientTo = gradient && (animation === "pulse" || animation === "border-spin") ? "violet" : undefined;
  const motion = { transition, transitionDelay: 0 };
  const anim = { animation, pulseColor, pulseGradientTo };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
      {/* Sticky: the controls stay in view while the preview scrolls past, and scroll away with the section once the whole card has been shown. */}
      <div className="space-y-2 self-start rounded-2xl border border-border bg-surface p-3 lg:h-[392px] lg:overflow-y-auto lg:overscroll-contain">
        <div className="grid grid-cols-2 gap-2">
          <Segmented label="Mode" options={["light", "dark"] as ThemeMode[]} value={mode} onChange={setMode} />
          <Segmented label="Active-item style" options={VARIANTS} value={variant} onChange={setVariant} />
        </div>
        <div>
          <p className={LABEL}>Accent</p>
          <div className="grid grid-cols-12 gap-1">
            {COLORS.map((c) => (
              <button
                key={c.base}
                type="button"
                title={c.name}
                aria-label={c.name}
                aria-pressed={accent === c.base}
                onClick={() => setAccent(c.base)}
                className={`h-5 rounded-full border-2 transition-all duration-200 hover:scale-110 ${accent === c.base ? "scale-110 border-fg" : "border-transparent"}`}
                style={{ backgroundColor: `var(--color-${c.base}-500)` }}
              />
            ))}
          </div>
        </div>

        {/* Attention effect and its colour only act on the small controls in the card — a tinted group with a header says which. */}
        <div className="space-y-2 rounded-xl border border-accent-500/30 bg-accent-500/5 p-2">
          <div className="flex flex-wrap items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-fg-subtle">
            <span aria-hidden="true">↳</span>
            <span>Applies to</span>
            <span className="normal-case tracking-normal text-accent-700 dark:text-accent-300">Button · Avatar · Badge</span>
          </div>
          <Chips label="Attention effect" options={["none", ...ANIMATED_VARIANTS] as const} value={effect} onChange={setEffect} />
        {(animation === "pulse" || animation === "glow" || animation === "border-spin") && (
          <div>
            <p className={LABEL}>Effect color</p>
            <div className="flex flex-wrap items-center gap-2">
              {PULSE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  aria-pressed={pulseColor === c}
                  onClick={() => setPulseColor(c)}
                  className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${pulseColor === c ? "scale-110 border-fg" : "border-transparent"}`}
                  style={{ backgroundColor: `var(--color-${c}-500)` }}
                />
              ))}
              {(animation === "pulse" || animation === "border-spin") && (
                <button
                  type="button"
                  onClick={() => setGradient((g) => !g)}
                  className={`ml-1 rounded-md px-2 py-1 text-xs font-medium ${gradient ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"}`}
                >
                  gradient
                </button>
              )}
            </div>
          </div>
        )}
        </div>
        <Chips label="Hover effect" options={["none", ...HOVER_EFFECTS] as const} value={hover} onChange={setHover} />
        <Chips
          label="Enter transition"
          options={TRANSITIONS}
          value={transition}
          onChange={(v) => { setTransition(v); setRun((n) => n + 1); }}
          action={<button type="button" onClick={() => setRun((n) => n + 1)} className="mb-1 inline-flex items-center gap-1 rounded-md px-1.5 py-px text-[10px] font-medium text-accent-700 hover:bg-accent-500/10 dark:text-accent-300"><Icon name="refresh-cw" size={10} />Replay</button>}
        />
      </div>

      <ThemeProvider isolated mode={mode} accent={accent} activeVariant={variant}>
        {/* The preview is the library's own glass Card (lighting="scroll": its frame lights up in dark mode while it is at the centre of the screen). */}
        <Card
          variant="glass"
          lighting="scroll"
          padding="none"
          className="flex !rounded-2xl !p-4 text-fg shadow-sm before:!rounded-[calc(var(--radius-2xl)+10px)] lg:h-[392px] flex-col"
          classNames={{ body: "flex min-h-0 flex-1 flex-col overflow-hidden" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="mb-2 max-w-full overflow-x-auto px-2 pb-1 pt-1 -mx-2"><NavigationMenu items={[{ label: "Overview", active: true }, { label: "Analytics" }, { label: "Reports" }, { label: "Settings" }]} /></div>
            <Badge variant="soft" label="Live preview" />
          </div>

          <div key={run} className="mt-2 grid gap-2.5 sm:grid-cols-2">
            <Card title="Enter transition" padding="sm" hoverEffect={hoverEffect} {...motion}>
              <p className="text-xs text-fg-muted">Fade, slide, zoom, flip, blur and more.</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Avatar initials="LJ" {...anim} />
                <Badge variant="solid" label="Beta" {...anim} />
                <Button size="sm" label="Deploy" {...anim} />
              </div>
            </Card>
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" countUp hoverEffect={hoverEffect} {...motion} transitionDelay={60} />
            <Card title="Progress" padding="sm" hoverEffect={hoverEffect} {...motion} transitionDelay={100}>
              <div className="space-y-1.5">
                <div><p className="mb-0.5 text-xs font-medium text-fg-muted">Storage</p><ProgressBar value={72} showLabel /></div>
                <div><p className="mb-0.5 text-xs font-medium text-fg-muted">Uptime</p><ProgressBar value={91} showLabel /></div>
              </div>
            </Card>
            <Card title="Chart" padding="sm" className="lg:hidden" hoverEffect={hoverEffect} {...motion} transitionDelay={140}>
              <Chart type="bar" data={CHART_DATA} height={72} showLabels />
            </Card>
            <Card title="Preferences" padding="sm" hoverEffect={hoverEffect} {...motion} transitionDelay={180}>
              <div className="flex flex-col items-start gap-1.5">
                <Switch label="Email notifications" defaultChecked />
                <Switch label="Weekly digest" />
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" label="Save" />
                  <Button size="sm" variant="outline" label="Cancel" />
                  <Button size="sm" variant="soft" label="More" />
                </div>
              </div>
            </Card>
            <div className="self-start lg:hidden">
              <Alert variant="accent" title="Everything follows the theme" hoverEffect={hoverEffect} {...motion} transitionDelay={220}>
                Change the accent, mode or motion on the left — it all restyles instantly.
              </Alert>
            </div>
          </div>
        </Card>
      </ThemeProvider>
    </div>
  );
}
