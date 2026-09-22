import { useState } from "react";
import { Calendar, type CalendarEvent } from "../Calendar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

// Event dates are computed from today so the "With events" example always
// shows dots in whatever month the demo happens to render in, instead of
// hardcoding a month that would eventually scroll out of view.
function sampleEvents(): CalendarEvent[] {
  const now = new Date();
  const day = (d: number) => {
    const dt = new Date(now.getFullYear(), now.getMonth(), d);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  };
  return [
    { date: day(5), label: "Team sync", color: "indigo" },
    { date: day(12), label: "Deadline", color: "rose" },
    { date: day(12), label: "Release", color: "emerald" },
    { date: day(20), label: "Planning", color: "amber" },
  ];
}

export default function CalendarShowcase() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Calendar</h1>
          <p className="text-sm text-slate-500 mt-1">
            A standalone month-grid calendar — day selection, event dots, and month navigation.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uncontrolled — manages its own displayed month and selection internally, defaulting to today's month.">
            Basic
          </SectionLabel>
          <Calendar />
          <CodeBlock
            variants={{
              react: `<Calendar />`,
              js: `<l-Calendar />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Calendar />
</template>`,
              angular: `<l-Calendar></l-Calendar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Dates with matching events show up to 3 small colored dots beneath the day number.">
            With events
          </SectionLabel>
          <Calendar events={sampleEvents()} />
          <CodeBlock
            variants={{
              react: `<Calendar
  events={[
    { date: "2026-06-05", label: "Team sync", color: "indigo" },
    { date: "2026-06-12", label: "Deadline", color: "rose" },
    { date: "2026-06-12", label: "Release", color: "emerald" },
    { date: "2026-06-20", label: "Planning", color: "amber" },
  ]}
/>`,
              js: `<l-Calendar id="calendar-events" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("calendar-events").events = [
    { date: "2026-06-05", label: "Team sync", color: "indigo" },
    { date: "2026-06-12", label: "Deadline", color: "rose" },
    { date: "2026-06-12", label: "Release", color: "emerald" },
    { date: "2026-06-20", label: "Planning", color: "amber" },
  ];
</script>`,
              vue: `<template>
  <l-Calendar :events="events" />
</template>

<script setup lang="ts">
const events = [
  { date: "2026-06-05", label: "Team sync", color: "indigo" },
  { date: "2026-06-12", label: "Deadline", color: "rose" },
  { date: "2026-06-12", label: "Release", color: "emerald" },
  { date: "2026-06-20", label: "Planning", color: "amber" },
];
</script>`,
              angular: `<l-Calendar [events]="events"></l-Calendar>

events = [
  { date: "2026-06-05", label: "Team sync", color: "indigo" },
  { date: "2026-06-12", label: "Deadline", color: "rose" },
  { date: "2026-06-12", label: "Release", color: "emerald" },
  { date: "2026-06-20", label: "Planning", color: "amber" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Controlled selection — pass both `selected` and `onSelect` to drive the highlighted day from your own state.">
            Controlled selection
          </SectionLabel>
          <Calendar selected={selected} onSelect={setSelected} />
          <p className="mt-3 text-sm text-slate-500">
            Selected: <span className="font-medium text-slate-700">{selected ?? "none"}</span>
          </p>
          <CodeBlock
            variants={{
              react: `const [selected, setSelected] = useState();

<Calendar selected={selected} onSelect={setSelected} />`,
              js: `<l-Calendar id="calendar-controlled"></l-Calendar>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("calendar-controlled");
  el.addEventListener("select", (e) => {
    el.selected = e.detail;
  });
</script>`,
              vue: `<template>
  <l-Calendar :selected="selected" @select="selected = $event" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const selected = ref();
</script>`,
              angular: `<l-Calendar [selected]="selected" (select)="selected = $event"></l-Calendar>

selected?: string;`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` tints the selected-day fill and today's outline.">Colors</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-3">
            <Calendar color="emerald" />
            <Calendar color="rose" />
            <Calendar color="amber" />
          </div>
          <CodeBlock
            variants={{
              react: `<Calendar color="emerald" />
<Calendar color="rose" />
<Calendar color="amber" />`,
              js: `<l-Calendar color="emerald"></l-Calendar>
<l-Calendar color="rose"></l-Calendar>
<l-Calendar color="amber"></l-Calendar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Calendar color="emerald" />
  <l-Calendar color="rose" />
  <l-Calendar color="amber" />
</template>`,
              angular: `<l-Calendar color="emerald"></l-Calendar>
<l-Calendar color="rose"></l-Calendar>
<l-Calendar color="amber"></l-Calendar>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
