import { highlightCode } from "../../core/highlightCode";
import { useState } from "react";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Avatar } from "../ui/Avatar/Avatar";
import { Card } from "../ui/Card/Card";
import { Stat } from "../ui/Stat/Stat";
import { Alert } from "../ui/Alert/Alert";
import { ANIMATED_VARIANTS, type AnimatedVariant } from "../../core/animated";
import { TRANSITIONS, HOVER_EFFECTS, type TransitionVariant, type HoverEffect } from "../../core/motion";
import type { ColorName } from "../../core/tokens";

const PULSE_COLORS: ColorName[] = ["accent", "violet", "rose", "amber", "emerald", "blue"];

function Chips<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 ${value === o ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Interactive demo of the enter transitions, attention animations and hover effects. */
export default function MotionLab() {
  const [transition, setTransition] = useState<TransitionVariant>("slide-up");
  const [effect, setEffect] = useState<"none" | AnimatedVariant>("pulse");
  const [hover, setHover] = useState<"none" | HoverEffect>("lift");
  const [pulseColor, setPulseColor] = useState<ColorName>("accent");
  const [gradient, setGradient] = useState(true);
  const [run, setRun] = useState(0);

  const animated = effect === "none" ? undefined : effect;
  const hoverEffect = hover === "none" ? undefined : hover;
  const pulseGradientTo = gradient && (animated === "pulse" || animated === "border-spin") ? "violet" : undefined;
  const motion = { transition, transitionDelay: 0 };
  const anim = { animated, pulseColor, pulseGradientTo };

  const code = `<Button${animated ? ` animated="${animated}"` : ""}${animated && pulseColor !== "accent" ? ` pulseColor="${pulseColor}"` : ""}${pulseGradientTo ? ` pulseGradientTo="${pulseGradientTo}"` : ""} label="Deploy" />
<Card transition="${transition}"${hoverEffect ? ` hoverEffect="${hoverEffect}"` : ""}>…</Card>
<Stat label="Revenue" value="$48,290" countUp />`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <div className="space-y-5 rounded-2xl border border-border bg-surface p-5">
        <Chips label="Enter transition" options={TRANSITIONS} value={transition} onChange={(v) => { setTransition(v); setRun((n) => n + 1); }} />
        <Chips label="Attention effect" options={["none", ...ANIMATED_VARIANTS] as const} value={effect} onChange={setEffect} />
        {(animated === "pulse" || animated === "glow" || animated === "border-spin") && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fg-subtle">Effect color</p>
            <div className="flex flex-wrap items-center gap-2">
              {PULSE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={c}
                  aria-pressed={pulseColor === c}
                  onClick={() => setPulseColor(c)}
                  className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${pulseColor === c ? "scale-110 border-fg" : "border-transparent"}`}
                  style={{ backgroundColor: `var(--color-${c}-500)` }}
                />
              ))}
              {(animated === "pulse" || animated === "border-spin") && (
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
        <Chips label="Hover effect" options={["none", ...HOVER_EFFECTS] as const} value={hover} onChange={setHover} />
        <button type="button" onClick={() => setRun((n) => n + 1)} className="w-full rounded-lg border border-border bg-surface-muted py-2 text-sm font-medium text-fg transition-colors hover:border-accent-500">
          Replay transition
        </button>
        <pre className="overflow-x-auto rounded-lg bg-surface-muted p-3 font-mono text-[11px] leading-relaxed text-fg-muted"><code>{highlightCode(code)}</code></pre>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6">
        <div key={run} className="grid gap-5 sm:grid-cols-2">
          <Card title="Enter transition" hoverEffect={hoverEffect} {...motion}>
            <p className="text-sm text-fg-muted">Every component can enter with fade, slide, zoom, flip, blur, bounce and more — with duration and delay.</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Avatar initials="LJ" {...anim} />
              <Badge variant="solid" label="Beta" {...anim} />
              <Button size="sm" label="Deploy" {...anim} />
            </div>
          </Card>
          <div className="space-y-5">
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" countUp hoverEffect={hoverEffect} {...motion} transitionDelay={120} />
            <Alert variant="accent" title="Theme-aware" hoverEffect={hoverEffect} {...motion} transitionDelay={240}>
              Alerts, badges and stats follow the accent you pick.
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
