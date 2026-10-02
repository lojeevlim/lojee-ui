import { useState } from "react";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Avatar } from "../ui/Avatar/Avatar";
import { Card } from "../ui/Card/Card";
import { Stat } from "../ui/Stat/Stat";
import { Alert } from "../ui/Alert/Alert";
import { Table, type TableColumn } from "../ui/Table/Table";
import { Chart } from "../ui/Chart/Chart";
import { Timeline } from "../ui/Timeline/Timeline";
import { GridView } from "../ui/GridView/GridView";
import { DetailsList } from "../ui/DetailsList/DetailsList";
import { ProgressBar } from "../ui/ProgressBar/ProgressBar";
import { ANIMATED_VARIANTS, type AnimatedVariant } from "../../core/animated";
import { TRANSITIONS, HOVER_EFFECTS, type TransitionVariant, type HoverEffect } from "../../core/motion";
import type { ColorName } from "../../core/tokens";

const TABLE_COLUMNS: TableColumn<Record<string, unknown>>[] = [
  { key: "user", header: "Member", type: "user" },
  { key: "plan", header: "Plan", type: "status" },
  { key: "usage", header: "Usage", type: "progress" },
];
const TABLE_DATA = [
  { user: { name: "Noah Kim", handle: "@noahkim" }, plan: "Active", usage: 72 },
  { user: { name: "Mia Costa", handle: "@miacosta" }, plan: "Pending", usage: 31 },
  { user: { name: "Omar Haddad", handle: "@omarh" }, plan: "Active", usage: 90 },
];
const CHART_DATA = [
  { label: "Mon", value: 32 },
  { label: "Tue", value: 48 },
  { label: "Wed", value: 41 },
  { label: "Thu", value: 67 },
  { label: "Fri", value: 58 },
];
const TIMELINE_ITEMS = [
  { title: "Design approved", timestamp: "9:00", icon: "check", color: "emerald" as ColorName },
  { title: "Build started", timestamp: "11:30", icon: "zap" },
  { title: "Released", timestamp: "16:45", icon: "rocket", color: "violet" as ColorName },
];
const GRID_ITEMS = [
  { id: 1, title: "Brown's Bathroom Remodel", tag: "Accepted", stats: [{ label: "Balance Due", value: "$12,099" }, { label: "Value", value: "$18,099" }] },
  { id: 2, title: "Faruk's Bathroom Remodel", tag: "Pending", stats: [{ label: "Balance Due", value: "$9,450" }, { label: "Value", value: "$21,300" }] },
  { id: 3, title: "Yeasin's Bathroom Rework", tag: "Overdue", stats: [{ label: "Balance Due", value: "$15,600" }, { label: "Value", value: "$15,600" }] },
];
const DETAILS = [
  { title: "@selectionchange", description: "Called when the selection changes.", body: "event.detail carries the selected keys and rows." },
  { title: "@sortchange", description: "Called when a header is clicked." },
];

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
          <Card title="Progress" hoverEffect={hoverEffect} {...motion} transitionDelay={60}>
            <div className="space-y-4">
              <div><p className="mb-1 text-xs font-medium text-fg-muted">Storage</p><ProgressBar value={72} /></div>
              <div><p className="mb-1 text-xs font-medium text-fg-muted">Bandwidth</p><ProgressBar value={38} color="violet" /></div>
              <div><p className="mb-1 text-xs font-medium text-fg-muted">Uptime</p><ProgressBar value={91} color="emerald" /></div>
            </div>
          </Card>
          <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" countUp hoverEffect={hoverEffect} {...motion} transitionDelay={120} />
          <div className="self-start">
            <Alert variant="accent" title="Theme-aware" hoverEffect={hoverEffect} {...motion} transitionDelay={180}>
              Alerts, badges and stats follow the accent you pick.
            </Alert>
          </div>
          <div className="sm:col-span-2">
            <Table variant="lined" columns={TABLE_COLUMNS} data={TABLE_DATA} {...motion} transitionDelay={160} />
          </div>
          <Card title="Chart" hoverEffect={hoverEffect} {...motion} transitionDelay={80}>
            <Chart type="bar" data={CHART_DATA} height={150} showLabels />
          </Card>
          <Card title="Timeline" hoverEffect={hoverEffect} {...motion} transitionDelay={160}>
            <Timeline items={TIMELINE_ITEMS} />
          </Card>
          <div className="sm:col-span-2">
            <GridView items={GRID_ITEMS} searchable={false} viewToggle={false} {...motion} transitionDelay={200} />
          </div>
          <div className="sm:col-span-2"><DetailsList items={DETAILS} {...motion} transitionDelay={240} /></div>
        </div>
      </div>
    </div>
  );
}
