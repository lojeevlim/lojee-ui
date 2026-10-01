import { Chart } from "../Chart";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

const REVENUE_DATA = [
  { label: "Jan", value: 32 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 52 },
  { label: "May", value: 47 },
  { label: "Jun", value: 61 },
];

const REVENUE_CODE = `  { label: "Jan", value: 32 },
  { label: "Feb", value: 41 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 52 },
  { label: "May", value: 47 },
  { label: "Jun", value: 61 },`;

const TRAFFIC_DATA = [
  { label: "Direct", value: 42, color: "indigo" as const },
  { label: "Search", value: 28, color: "emerald" as const },
  { label: "Social", value: 18, color: "amber" as const },
  { label: "Referral", value: 12, color: "rose" as const },
];

const TRAFFIC_CODE = `  { label: "Direct", value: 42, color: "indigo" },
  { label: "Search", value: 28, color: "emerald" },
  { label: "Social", value: 18, color: "amber" },
  { label: "Referral", value: 12, color: "rose" },`;

const TRANSITION_DATA = [
  { label: "Mon", value: 24 },
  { label: "Tue", value: 33 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 41 },
];

export default function ChartShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Chart</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A lightweight, dependency-free chart — bar, line, and donut, rendered as plain inline SVG.
          </p>
        </div>

        <section>
          <SectionLabel sub="Evenly-spaced bars scaled to the tallest value.">Bar</SectionLabel>
          <div className="max-w-lg">
            <Chart type="bar" data={REVENUE_DATA} />
          </div>
          <CodeBlock
            variants={{
              react: `<Chart
  type="bar"
  data={[
${REVENUE_CODE}
  ]}
/>`,
              js: `<l-Chart id="chart-bar" type="bar" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-bar").data = [
${REVENUE_CODE}
  ];
</script>`,
              vue: `<template>
  <l-Chart :data="data" type="bar" />
</template>

<script setup lang="ts">
const data = [
${REVENUE_CODE}
];
</script>`,
              angular: `<l-Chart [data]="data" type="bar" />

data = [
${REVENUE_CODE}
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A connected line with a marker at each point.">Line</SectionLabel>
          <div className="max-w-lg">
            <Chart type="line" data={REVENUE_DATA} color="emerald" />
          </div>
          <CodeBlock
            variants={{
              react: `<Chart
  type="line"
  color="emerald"
  data={[
${REVENUE_CODE}
  ]}
/>`,
              js: `<l-Chart id="chart-line" type="line" color="emerald" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-line").data = [
${REVENUE_CODE}
  ];
</script>`,
              vue: `<template>
  <l-Chart :data="data" type="line" color="emerald" />
</template>

<script setup lang="ts">
const data = [
${REVENUE_CODE}
];
</script>`,
              angular: `<l-Chart [data]="data" type="line" color="emerald" />

data = [
${REVENUE_CODE}
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A ring chart with a legend — each point can carry its own color.">Donut</SectionLabel>
          <div className="max-w-lg">
            <Chart type="donut" data={TRAFFIC_DATA} />
          </div>
          <CodeBlock
            variants={{
              react: `<Chart
  type="donut"
  data={[
${TRAFFIC_CODE}
  ]}
/>`,
              js: `<l-Chart id="chart-donut" type="donut" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-donut").data = [
${TRAFFIC_CODE}
  ];
</script>`,
              vue: `<template>
  <l-Chart :data="data" type="donut" />
</template>

<script setup lang="ts">
const data = [
${TRAFFIC_CODE}
];
</script>`,
              angular: `<l-Chart [data]="data" type="donut" />

data = [
${TRAFFIC_CODE}
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` sets the default for every point that doesn't specify its own.">Colors</SectionLabel>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-medium text-fg-subtle">Indigo</p>
              <Chart type="bar" data={REVENUE_DATA} color="indigo" showLabels={false} height={120} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-fg-subtle">Rose</p>
              <Chart type="bar" data={REVENUE_DATA} color="rose" showLabels={false} height={120} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-fg-subtle">Amber</p>
              <Chart type="bar" data={REVENUE_DATA} color="amber" showLabels={false} height={120} />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Chart type="bar" color="rose" data={data} />

{/* Any of the 12 palette colors work: slate, gray, indigo, violet, blue,
    cyan, emerald, teal, amber, orange, rose, pink. */}`,
              js: `<l-Chart id="chart-color" type="bar" color="rose" />

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("chart-color").data = data;
</script>`,
              vue: `<template>
  <l-Chart :data="data" type="bar" color="rose" />
</template>`,
              angular: `<l-Chart [data]="data" type="bar" color="rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`countUp` grows the data in from zero when the chart mounts — bars rise, the line climbs, donut slices sweep round and the legend numbers count up. Tune it with `countUpDuration` (ms). Press Replay to run it again.">Count up</SectionLabel>
          <TransitionPreview cols={3}>
            <Chart countUp data={REVENUE_DATA} />
            <Chart type="line" color="emerald" countUp data={REVENUE_DATA} />
            <Chart type="donut" countUp countUpDuration={2000} data={TRAFFIC_DATA} height={140} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Chart countUp data={revenue} />
<Chart type="line" color="emerald" countUp data={revenue} />
<Chart type="donut" countUp countUpDuration={2000} data={traffic} />`,
              js: `<l-Chart id="chart-bar" countUp="true"></l-Chart>
<l-Chart id="chart-line" type="line" color="emerald" countUp="true"></l-Chart>
<l-Chart id="chart-donut" type="donut" countUp="true" countUpDuration="2000"></l-Chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-bar").data = [
${REVENUE_CODE}
  ];
  document.getElementById("chart-line").data = [
${REVENUE_CODE}
  ];
  document.getElementById("chart-donut").data = [
${TRAFFIC_CODE}
  ];
</script>`,
              vue: `<template>
  <l-Chart :data="revenue" countUp="true"></l-Chart>
  <l-Chart type="line" :data="revenue" color="emerald" countUp="true"></l-Chart>
  <l-Chart type="donut" :data="traffic" countUp="true" countUpDuration="2000"></l-Chart>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const revenue = [
${REVENUE_CODE}
];
const traffic = [
${TRAFFIC_CODE}
];
</script>`,
              angular: `<l-Chart [data]="revenue" countUp="true"></l-Chart>
<l-Chart [data]="revenue" type="line" color="emerald" countUp="true"></l-Chart>
<l-Chart [data]="traffic" type="donut" countUp="true" countUpDuration="2000"></l-Chart>

revenue = [
${REVENUE_CODE}
];
traffic = [
${TRAFFIC_CODE}
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <div className="w-56"><Chart type="bar" data={TRANSITION_DATA} height={120} transition="fade" /></div>
            <div className="w-56"><Chart type="line" data={TRANSITION_DATA} height={120} transition="slide-up" /></div>
            <div className="w-56"><Chart type="donut" data={TRANSITION_DATA} height={120} transition="slide-right" transitionDelay={100} /></div>
            <div className="w-56"><Chart type="bar" data={TRANSITION_DATA} height={120} transition="zoom" /></div>
            <div className="w-56"><Chart type="line" data={TRANSITION_DATA} height={120} transition="flip" /></div>
            <div className="w-56"><Chart type="donut" data={TRANSITION_DATA} height={120} transition="blur" /></div>
            <div className="w-56"><Chart type="bar" data={TRANSITION_DATA} height={120} transition="bounce" /></div>
            <div className="w-56"><Chart type="line" data={TRANSITION_DATA} height={120} transition="drop" transitionDuration={700} /></div>
          </TransitionPreview>
          <Row>
            <div className="w-56"><Chart type="donut" data={TRANSITION_DATA} height={120} hoverEffect="lift" /></div>
            <div className="w-56"><Chart type="bar" data={TRANSITION_DATA} height={120} hoverEffect="glow" /></div>
            <div className="w-56"><Chart type="line" data={TRANSITION_DATA} height={120} hoverEffect="shine" /></div>
            <div className="w-56"><Chart type="donut" data={TRANSITION_DATA} height={120} hoverEffect="tilt" /></div>
          </Row>
          <CodeBlock
            variants={{
              react: `<Chart type="bar" data={data} transition="fade" />
<Chart type="bar" data={data} transition="slide-up" />
<Chart type="bar" data={data} transition="slide-right" transitionDelay={100} />
<Chart type="bar" data={data} transition="zoom" />

<Chart type="bar" data={data} transition="flip" />
<Chart type="bar" data={data} transition="blur" />
<Chart type="bar" data={data} transition="bounce" />
<Chart type="bar" data={data} transition="drop" transitionDuration={700} />

<Chart type="bar" data={data} hoverEffect="lift" />
<Chart type="bar" data={data} hoverEffect="glow" />
<Chart type="bar" data={data} hoverEffect="shine" />
<Chart type="bar" data={data} hoverEffect="tilt" />`,
              js: `<l-Chart type="bar" transition="fade"></l-Chart>
<l-Chart type="bar" transition="slide-up"></l-Chart>
<l-Chart type="bar" transition="slide-right" transitionDelay="100"></l-Chart>
<l-Chart type="bar" transition="zoom"></l-Chart>

<l-Chart type="bar" transition="flip"></l-Chart>
<l-Chart type="bar" transition="blur"></l-Chart>
<l-Chart type="bar" transition="bounce"></l-Chart>
<l-Chart type="bar" transition="drop" transitionDuration="700"></l-Chart>

<l-Chart type="bar" hoverEffect="lift"></l-Chart>
<l-Chart type="bar" hoverEffect="glow"></l-Chart>
<l-Chart type="bar" hoverEffect="shine"></l-Chart>
<l-Chart type="bar" hoverEffect="tilt"></l-Chart>

<script type="module">
  import "lojee-ui/elements";

  document.querySelectorAll("l-Chart").forEach((chart) => {
    chart.data = [
      { label: "Mon", value: 24 },
      { label: "Tue", value: 33 },
      { label: "Wed", value: 28 },
      { label: "Thu", value: 41 },
    ];
  });
</script>`,
              vue: `<template>
  <l-Chart :data="data" type="bar" transition="fade"></l-Chart>
  <l-Chart :data="data" type="bar" transition="slide-up"></l-Chart>
  <l-Chart :data="data" type="bar" transition="slide-right" transitionDelay="100"></l-Chart>
  <l-Chart :data="data" type="bar" transition="zoom"></l-Chart>

  <l-Chart :data="data" type="bar" transition="flip"></l-Chart>
  <l-Chart :data="data" type="bar" transition="blur"></l-Chart>
  <l-Chart :data="data" type="bar" transition="bounce"></l-Chart>
  <l-Chart :data="data" type="bar" transition="drop" transitionDuration="700"></l-Chart>

  <l-Chart :data="data" type="bar" hoverEffect="lift"></l-Chart>
  <l-Chart :data="data" type="bar" hoverEffect="glow"></l-Chart>
  <l-Chart :data="data" type="bar" hoverEffect="shine"></l-Chart>
  <l-Chart :data="data" type="bar" hoverEffect="tilt"></l-Chart>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
const data = [
  { label: "Mon", value: 24 },
  { label: "Tue", value: 33 },
  { label: "Wed", value: 28 },
  { label: "Thu", value: 41 },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Chart [data]="data" type="bar" transition="fade"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="slide-up"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="slide-right" transitionDelay="100"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="zoom"></l-Chart>

    <l-Chart [data]="data" type="bar" transition="flip"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="blur"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="bounce"></l-Chart>
    <l-Chart [data]="data" type="bar" transition="drop" transitionDuration="700"></l-Chart>

    <l-Chart [data]="data" type="bar" hoverEffect="lift"></l-Chart>
    <l-Chart [data]="data" type="bar" hoverEffect="glow"></l-Chart>
    <l-Chart [data]="data" type="bar" hoverEffect="shine"></l-Chart>
    <l-Chart [data]="data" type="bar" hoverEffect="tilt"></l-Chart>
  \`,
})
export class AppComponent {
  data = [
    { label: "Mon", value: 24 },
    { label: "Tue", value: 33 },
    { label: "Wed", value: 28 },
    { label: "Thu", value: 41 },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
