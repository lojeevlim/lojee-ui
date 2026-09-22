import { Chart } from "../Chart";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

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

export default function ChartShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Chart</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              <p className="mb-2 text-xs font-medium text-slate-500">Indigo</p>
              <Chart type="bar" data={REVENUE_DATA} color="indigo" showLabels={false} height={120} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">Rose</p>
              <Chart type="bar" data={REVENUE_DATA} color="rose" showLabels={false} height={120} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">Amber</p>
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
      </div>
    </div>
  );
}
