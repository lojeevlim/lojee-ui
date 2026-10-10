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
              js: `<l-chart id="chart-bar" type="bar"></l-chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-bar").data = [
${REVENUE_CODE}
  ];
</script>`,
              vue: `<template>
  <l-chart :data="data" type="bar" />
</template>

<script setup lang="ts">
const data = [
${REVENUE_CODE}
];
</script>`,
              angular: `<l-chart [data]="data" type="bar" />

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
              js: `<l-chart id="chart-line" type="line" color="emerald"></l-chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-line").data = [
${REVENUE_CODE}
  ];
</script>`,
              vue: `<template>
  <l-chart :data="data" type="line" color="emerald" />
</template>

<script setup lang="ts">
const data = [
${REVENUE_CODE}
];
</script>`,
              angular: `<l-chart [data]="data" type="line" color="emerald" />

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
              js: `<l-chart id="chart-donut" type="donut"></l-chart>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("chart-donut").data = [
${TRAFFIC_CODE}
  ];
</script>`,
              vue: `<template>
  <l-chart :data="data" type="donut" />
</template>

<script setup lang="ts">
const data = [
${TRAFFIC_CODE}
];
</script>`,
              angular: `<l-chart [data]="data" type="donut" />

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
              js: `<l-chart id="chart-color" type="bar" color="rose"></l-chart>

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("chart-color").data = data;
</script>`,
              vue: `<template>
  <l-chart :data="data" type="bar" color="rose" />
</template>`,
              angular: `<l-chart [data]="data" type="bar" color="rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'`variant="values"` prints each data value on the chart: above every bar and line point, and — for a donut — each slice\'s value and share in the legend with the total in the centre. The numbers count up along with the shapes.'}>Show values</SectionLabel>
          <TransitionPreview cols={3}>
            <Chart variant="values" data={REVENUE_DATA} />
            <Chart variant="values" type="line" color="emerald" data={REVENUE_DATA} />
            <Chart variant="values" type="donut" data={TRAFFIC_DATA} height={140} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Chart variant="values" data={revenue} />
<Chart variant="values" type="line" color="emerald" data={revenue} />
<Chart variant="values" type="donut" data={traffic} />`,
              js: `<l-chart id="chart-bar" variant="values"></l-chart>
<l-chart id="chart-line" type="line" color="emerald" variant="values"></l-chart>
<l-chart id="chart-donut" type="donut" variant="values"></l-chart>

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
  <l-chart :data="revenue" variant="values"></l-chart>
  <l-chart type="line" :data="revenue" color="emerald" variant="values"></l-chart>
  <l-chart type="donut" :data="traffic" variant="values"></l-chart>
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
              angular: `<l-chart [data]="revenue" variant="values"></l-chart>
<l-chart [data]="revenue" type="line" color="emerald" variant="values"></l-chart>
<l-chart [data]="traffic" type="donut" variant="values"></l-chart>

// component class
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
          <SectionLabel sub="Charts animate in by default, like the Stat: the data grows in from zero when the chart mounts — bars rise, the line climbs, donut slices sweep round and the legend numbers count up. Tune it with `countUpDuration` (ms), or pass `countUp={false}` for a static chart. Press Replay to run it again.">Count up</SectionLabel>
          <TransitionPreview cols={3}>
            <Chart data={REVENUE_DATA} />
            <Chart type="line" color="emerald" data={REVENUE_DATA} />
            <Chart type="donut" countUpDuration={2000} data={TRAFFIC_DATA} height={140} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Chart data={revenue} />
<Chart type="line" color="emerald" data={revenue} />
<Chart type="donut" countUpDuration={2000} data={traffic} />

{/* Turn it off */}
<Chart countUp={false} data={revenue} />`,
              js: `<l-chart id="chart-bar"></l-chart>
<l-chart id="chart-line" type="line" color="emerald"></l-chart>
<l-chart id="chart-donut" type="donut" count-up-duration="2000"></l-chart>
<!-- Turn it off -->
<l-chart id="chart-static" count-up="false"></l-chart>

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
  <l-chart :data="revenue"></l-chart>
  <l-chart type="line" :data="revenue" color="emerald"></l-chart>
  <l-chart type="donut" :data="traffic" count-up-duration="2000"></l-chart>
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
              angular: `<l-chart [data]="revenue"></l-chart>
<l-chart [data]="revenue" type="line" color="emerald"></l-chart>
<l-chart [data]="traffic" type="donut" count-up-duration="2000"></l-chart>

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
              js: `<l-chart type="bar" transition="fade"></l-chart>
<l-chart type="bar" transition="slide-up"></l-chart>
<l-chart type="bar" transition="slide-right" transitionDelay="100"></l-chart>
<l-chart type="bar" transition="zoom"></l-chart>

<l-chart type="bar" transition="flip"></l-chart>
<l-chart type="bar" transition="blur"></l-chart>
<l-chart type="bar" transition="bounce"></l-chart>
<l-chart type="bar" transition="drop" transitionDuration="700"></l-chart>

<l-chart type="bar" hoverEffect="lift"></l-chart>
<l-chart type="bar" hoverEffect="glow"></l-chart>
<l-chart type="bar" hoverEffect="shine"></l-chart>
<l-chart type="bar" hoverEffect="tilt"></l-chart>

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
  <l-chart :data="data" type="bar" transition="fade"></l-chart>
  <l-chart :data="data" type="bar" transition="slide-up"></l-chart>
  <l-chart :data="data" type="bar" transition="slide-right" transitionDelay="100"></l-chart>
  <l-chart :data="data" type="bar" transition="zoom"></l-chart>

  <l-chart :data="data" type="bar" transition="flip"></l-chart>
  <l-chart :data="data" type="bar" transition="blur"></l-chart>
  <l-chart :data="data" type="bar" transition="bounce"></l-chart>
  <l-chart :data="data" type="bar" transition="drop" transitionDuration="700"></l-chart>

  <l-chart :data="data" type="bar" hoverEffect="lift"></l-chart>
  <l-chart :data="data" type="bar" hoverEffect="glow"></l-chart>
  <l-chart :data="data" type="bar" hoverEffect="shine"></l-chart>
  <l-chart :data="data" type="bar" hoverEffect="tilt"></l-chart>
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
    <l-chart [data]="data" type="bar" transition="fade"></l-chart>
    <l-chart [data]="data" type="bar" transition="slide-up"></l-chart>
    <l-chart [data]="data" type="bar" transition="slide-right" transitionDelay="100"></l-chart>
    <l-chart [data]="data" type="bar" transition="zoom"></l-chart>

    <l-chart [data]="data" type="bar" transition="flip"></l-chart>
    <l-chart [data]="data" type="bar" transition="blur"></l-chart>
    <l-chart [data]="data" type="bar" transition="bounce"></l-chart>
    <l-chart [data]="data" type="bar" transition="drop" transitionDuration="700"></l-chart>

    <l-chart [data]="data" type="bar" hoverEffect="lift"></l-chart>
    <l-chart [data]="data" type="bar" hoverEffect="glow"></l-chart>
    <l-chart [data]="data" type="bar" hoverEffect="shine"></l-chart>
    <l-chart [data]="data" type="bar" hoverEffect="tilt"></l-chart>
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
