import { useState } from "react";
import { Calendar, type CalendarEvent } from "./Calendar/Calendar";
import { ColorSwatches, OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { type ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

function sampleEvents(): CalendarEvent[] {
  const now = new Date();
  const day = (d: number) => {
    const dt = new Date(now.getFullYear(), now.getMonth(), d);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  };
  return [
    { date: day(5), label: "Team sync" },
    { date: day(12), label: "Deadline" },
    { date: day(20), label: "Planning" },
  ];
}

const SAMPLE_EVENTS_CODE = `  { date: "2026-06-05", label: "Team sync" },
  { date: "2026-06-12", label: "Deadline" },
  { date: "2026-06-20", label: "Planning" },`;

const VARIANTS = ["inline", "modal"] as const;
const MODES = ["single", "range"] as const;

export default function CalendarPlayground() {
  const [color, setColor] = useState<ColorName>("accent");
  const [showEvents, setShowEvents] = useState(true);
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]>("inline");
  const [footer, setFooter] = useState(false);
  const [mode, setMode] = useState<(typeof MODES)[number]>("single");
  const motion = useMotion();
  const range = mode === "range";
  const inline = variant === "inline";

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px]">
        <Calendar
          key={motion.replayKey}
          {...motion.props}
          color={color}
          variant={variant}
          footer={inline && footer}
          selectionMode={mode}
          defaultSelected={range ? undefined : sampleEvents()[0].date}
          events={showEvents ? sampleEvents() : undefined}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  // "accent" and "inline" are the defaults, so they are only written out when changed.
  const reactAttrs = `${range ? ' selectionMode="range"' : ""}${color !== "accent" ? ` color="${color}"` : ""}${variant === "modal" ? ' variant="modal"' : ""}${inline && footer ? " footer" : ""}${motion.attrs}`;
  const colorAttr = `${range ? ' selection-mode="range"' : ""}${color !== "accent" ? ` color="${color}"` : ""}${variant === "modal" ? ' variant="modal"' : ""}${inline && footer ? ' footer="true"' : ""}${motion.attrs}`;
  const eventsAttrJsx = showEvents ? `\n  events={[\n${SAMPLE_EVENTS_CODE}\n  ]}` : "";

  const code = `<Calendar${reactAttrs}${eventsAttrJsx}
  ${range ? "onRangeSelect={({ start, end }) => console.log(start, end)}" : "onSelect={(date) => console.log(date)}"}${variant === "modal" ? "\n  onConfirm={(date) => console.log(\"confirmed\", date)}" : ""}
/>`;

  const htmlOpenTag = `<l-Calendar${colorAttr}${showEvents ? ` id="calendar-demo"` : ""}></l-Calendar>`;
  const htmlMarkup = showEvents
    ? `${htmlOpenTag}

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("calendar-demo").events = [
${SAMPLE_EVENTS_CODE}
  ];
</script>`
    : `<l-Calendar${colorAttr}></l-Calendar>

<script type="module">import "lojee-ui/elements";</script>`;

  const vueMarkup = showEvents
    ? `<template>
  <l-Calendar${colorAttr} :events="events" />
</template>

<script setup lang="ts">
const events = [
${SAMPLE_EVENTS_CODE}
];
</script>`
    : `<template>
  <l-Calendar${colorAttr} />
</template>`;

  const angularMarkup = showEvents
    ? `<l-Calendar${colorAttr} [events]="events"></l-Calendar>

events = [
${SAMPLE_EVENTS_CODE}
];`
    : `<l-Calendar${colorAttr}></l-Calendar>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: htmlMarkup,
    vue: vueMarkup,
    angular: angularMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Selection" options={MODES} value={mode} onChange={setMode} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)} />
        Show sample events
      </label>
      {inline && (
        <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
          <input type="checkbox" checked={footer} onChange={(e) => setFooter(e.target.checked)} />
          Footer (selected date, Today, Clear)
        </label>
      )}
      {motion.controls}
    </PlaygroundLayout>
  );
}
