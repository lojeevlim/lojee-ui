import { useState } from "react";
import { Calendar, type CalendarEvent } from "./Calendar/Calendar";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { type ColorName } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

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

export default function CalendarPlayground() {
  const [color, setColor] = useState<ColorName>("indigo");
  const [showEvents, setShowEvents] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[360px]">
        <Calendar color={color} events={showEvents ? sampleEvents() : undefined} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const colorAttr = color !== "indigo" ? ` color="${color}"` : "";
  const eventsAttrJsx = showEvents ? `\n  events={[\n${SAMPLE_EVENTS_CODE}\n  ]}` : "";

  const code = `<Calendar${colorAttr}${eventsAttrJsx} />`;

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

<script setup>
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
      <ColorSwatches value={color} onChange={setColor} />
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showEvents} onChange={(e) => setShowEvents(e.target.checked)} />
        Show sample events
      </label>
    </PlaygroundLayout>
  );
}
