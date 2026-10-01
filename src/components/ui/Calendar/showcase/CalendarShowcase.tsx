import { useState } from "react";
import { Calendar, type CalendarEvent } from "../Calendar";
import CodeBlock from "../../CodeBlock";
import { Button } from "../../Buttons/Button";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

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

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string | undefined>();
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button color="accent" label="Pick a date" icon="calendar" onClick={() => setOpen(true)} />
      <span className="text-sm text-fg-subtle">
        Picked: <span className="font-medium text-fg">{picked ?? "none"}</span>
      </span>
      <Calendar variant="modal" open={open} onClose={() => setOpen(false)} onConfirm={(d) => setPicked(d)} />
    </div>
  );
}

export default function CalendarShowcase() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Calendar</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
          <p className="mt-3 text-sm text-fg-subtle">
            Selected: <span className="font-medium text-fg-muted">{selected ?? "none"}</span>
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
          <SectionLabel sub="Built-in selected-date functions: defaultSelected seeds the selection, onSelect reports every pick, and the footer prop adds the selected date with Today (jump to today and select it) and Clear buttons.">
            Selected date
          </SectionLabel>
          <Calendar footer defaultSelected={sampleEvents()[0].date} />
          <CodeBlock
            variants={{
              react: `<Calendar
  footer                              // selected date + Today + Clear
  defaultSelected="2026-06-05"        // initial selection
  onSelect={(date) => console.log(date)}   // "" when cleared
/>`,
              js: `<l-calendar id="cal-selected" footer="true" default-selected="2026-06-05"></l-calendar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("cal-selected").addEventListener("select", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-calendar footer="true" default-selected="2026-06-05" @select="(e: CustomEvent) => console.log(e.detail)" />
</template>`,
              angular: `<l-calendar footer="true" default-selected="2026-06-05" (select)="onSelect($event.detail)"></l-calendar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'selectionMode="range" picks a start and an end date: click once for the start, again for the end (an earlier date swaps them, a third click starts over). The days between are shaded. Combine with footer or variant="modal" for the range summary, Clear and Select.'}>
            Range date
          </SectionLabel>
          <div className="grid gap-6 sm:grid-cols-2">
            <Calendar selectionMode="range" footer />
            <Calendar selectionMode="range" variant="modal" title="Select range" color="emerald" />
          </div>
          <CodeBlock
            variants={{
              react: `<Calendar
  selectionMode="range"
  footer
  onRangeSelect={({ start, end }) => console.log(start, end)}
/>

// Modal style — Select is enabled once both dates are picked
<Calendar
  selectionMode="range"
  variant="modal"
  onConfirm={(_, range) => save(range.start, range.end)}
/>

// Seed or control the range
<Calendar selectionMode="range" defaultRange={{ start: "2026-06-05", end: "2026-06-12" }} />`,
              js: `<l-calendar id="cal-range" selection-mode="range" footer="true"></l-calendar>

<script type="module">
  import "lojee-ui/elements";

  const cal = document.getElementById("cal-range");
  cal.defaultRange = { start: "2026-06-05", end: "2026-06-12" };
  cal.addEventListener("rangeselect", (e) => console.log(e.detail.start, e.detail.end));
</script>`,
              vue: `<template>
  <l-calendar selection-mode="range" footer="true" :defaultRange="range" @rangeselect="(e: CustomEvent) => console.log(e.detail)" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const range = { start: "2026-06-05", end: "2026-06-12" };
</script>`,
              angular: `<l-calendar selection-mode="range" footer="true" [defaultRange]="range" (rangeselect)="onRange($event.detail)"></l-calendar>

range = { start: "2026-06-05", end: "2026-06-12" };`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'variant="modal" styles the calendar like a dialog: a header with the selected date in large type, the grid, and Cancel / Select buttons. Pass open (and onClose) to show it as a real overlay; leave open out to render the panel in place.'}>
            Modal variant
          </SectionLabel>
          <div className="space-y-6">
            <Calendar variant="modal" defaultSelected={sampleEvents()[0].date} />
            <ModalDemo />
          </div>
          <CodeBlock
            variants={{
              react: `// In place — a dialog-styled panel
<Calendar variant="modal" onConfirm={(date) => save(date)} />

// As an overlay dialog
const [open, setOpen] = useState(false);

<button onClick={() => setOpen(true)}>Pick a date</button>
<Calendar
  variant="modal"
  open={open}
  onClose={() => setOpen(false)}       // backdrop, Escape, Cancel and Select
  onConfirm={(date) => save(date)}     // Select
  title="Select date"
  confirmLabel="Select"
  cancelLabel="Cancel"
/>`,
              js: `<button id="pick">Pick a date</button>
<l-calendar id="cal-modal" variant="modal"></l-calendar>

<script type="module">
  import "lojee-ui/elements";

  const cal = document.getElementById("cal-modal");
  document.getElementById("pick").addEventListener("click", () => (cal.open = true));
  cal.addEventListener("close", () => (cal.open = false));
  cal.addEventListener("confirm", (e) => console.log("Picked:", e.detail));
</script>`,
              vue: `<template>
  <button @click="open = true">Pick a date</button>
  <l-calendar variant="modal" :open="open" @close="open = false" @confirm="(e: CustomEvent) => save(e.detail)" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `<button (click)="open = true">Pick a date</button>
<l-calendar variant="modal" [open]="open" (close)="open = false" (confirm)="save($event.detail)"></l-calendar>

open = false;`,
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

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <Calendar className="w-64" transition="fade" />
            <Calendar className="w-64" transition="slide-up" />
            <Calendar className="w-64" transition="slide-right" transitionDelay={100} />
            <Calendar className="w-64" transition="zoom" />
            <Calendar className="w-64" transition="flip" />
            <Calendar className="w-64" transition="blur" />
            <Calendar className="w-64" transition="bounce" />
            <Calendar className="w-64" transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <Row>
            <Calendar className="w-64" hoverEffect="lift" />
            <Calendar className="w-64" hoverEffect="glow" />
            <Calendar className="w-64" hoverEffect="shine" />
          </Row>
          <CodeBlock
            variants={{
              react: `<Calendar transition="fade" />
<Calendar transition="slide-up" />
<Calendar transition="slide-right" transitionDelay={100} />
<Calendar transition="zoom" />

<Calendar transition="flip" />
<Calendar transition="blur" />
<Calendar transition="bounce" />
<Calendar transition="drop" transitionDuration={700} />

<Calendar hoverEffect="lift" />
<Calendar hoverEffect="glow" />
<Calendar hoverEffect="shine" />`,
              js: `<l-Calendar transition="fade"></l-Calendar>
<l-Calendar transition="slide-up"></l-Calendar>
<l-Calendar transition="slide-right" transitionDelay="100"></l-Calendar>
<l-Calendar transition="zoom"></l-Calendar>

<l-Calendar transition="flip"></l-Calendar>
<l-Calendar transition="blur"></l-Calendar>
<l-Calendar transition="bounce"></l-Calendar>
<l-Calendar transition="drop" transitionDuration="700"></l-Calendar>

<l-Calendar hoverEffect="lift"></l-Calendar>
<l-Calendar hoverEffect="glow"></l-Calendar>
<l-Calendar hoverEffect="shine"></l-Calendar>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Calendar transition="fade"></l-Calendar>
  <l-Calendar transition="slide-up"></l-Calendar>
  <l-Calendar transition="slide-right" transitionDelay="100"></l-Calendar>
  <l-Calendar transition="zoom"></l-Calendar>

  <l-Calendar transition="flip"></l-Calendar>
  <l-Calendar transition="blur"></l-Calendar>
  <l-Calendar transition="bounce"></l-Calendar>
  <l-Calendar transition="drop" transitionDuration="700"></l-Calendar>

  <l-Calendar hoverEffect="lift"></l-Calendar>
  <l-Calendar hoverEffect="glow"></l-Calendar>
  <l-Calendar hoverEffect="shine"></l-Calendar>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Calendar transition="fade"></l-Calendar>
    <l-Calendar transition="slide-up"></l-Calendar>
    <l-Calendar transition="slide-right" transitionDelay="100"></l-Calendar>
    <l-Calendar transition="zoom"></l-Calendar>

    <l-Calendar transition="flip"></l-Calendar>
    <l-Calendar transition="blur"></l-Calendar>
    <l-Calendar transition="bounce"></l-Calendar>
    <l-Calendar transition="drop" transitionDuration="700"></l-Calendar>

    <l-Calendar hoverEffect="lift"></l-Calendar>
    <l-Calendar hoverEffect="glow"></l-Calendar>
    <l-Calendar hoverEffect="shine"></l-Calendar>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
