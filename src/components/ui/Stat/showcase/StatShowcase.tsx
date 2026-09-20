import { Stat } from "../Stat";
import { Grid } from "../../Grid/Grid";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function StatShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Stat</h1>
          <p className="text-sm text-slate-500 mt-1">
            A single metric card — label, value, and an optional trend or icon. Arrange several with Grid.
          </p>
        </div>

        <section>
          <SectionLabel sub="A label and a value — no trend, no icon.">Basic</SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" />
            <Stat label="Active Users" value="12,483" />
            <Stat label="Conversion Rate" value="3.42%" />
            <Stat label="Churn Rate" value="1.08%" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Grid cols={4} gap="md">
  <Stat label="Revenue" value="$48,290" />
  <Stat label="Active Users" value="12,483" />
  <Stat label="Conversion Rate" value="3.42%" />
  <Stat label="Churn Rate" value="1.08%" />
</Grid>`,
              js: `<Grid cols="4" gap="md">
  <Stat label="Revenue" value="$48,290" />
  <Stat label="Active Users" value="12,483" />
  <Stat label="Conversion Rate" value="3.42%" />
  <Stat label="Churn Rate" value="1.08%" />
</Grid>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Grid cols="4" gap="md">
    <Stat label="Revenue" value="$48,290" />
    <Stat label="Active Users" value="12,483" />
    <Stat label="Conversion Rate" value="3.42%" />
    <Stat label="Churn Rate" value="1.08%" />
  </Grid>
</template>`,
              angular: `<Grid cols="4" gap="md">
  <Stat label="Revenue" value="$48,290" />
  <Stat label="Active Users" value="12,483" />
  <Stat label="Conversion Rate" value="3.42%" />
  <Stat label="Churn Rate" value="1.08%" />
</Grid>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`change` plus `trend` shows a colored up/down arrow — green for up, rose for down.">
            With trend
          </SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
            <Stat label="Active Users" value="12,483" change="4.1%" trend="up" />
            <Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />
            <Stat label="Support Tickets" value="212" change="8.9%" trend="down" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />`,
              js: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
  <Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />
</template>`,
              angular: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" />
<Stat label="Churn Rate" value="1.08%" change="0.3%" trend="down" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A leading icon, tinted with `color`.">With icons</SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />
            <Stat label="Active Users" value="12,483" icon="users" color="blue" />
            <Stat label="Orders" value="1,204" change="2.4%" trend="down" icon="tag" color="rose" />
            <Stat label="Uptime" value="99.98%" icon="check" color="emerald" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat
  label="Revenue"
  value="$48,290"
  change="12.5%"
  trend="up"
  icon="zap"
  color="indigo"
/>`,
              js: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />
</template>`,
              angular: `<Stat label="Revenue" value="$48,290" change="12.5%" trend="up" icon="zap" color="indigo" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` only tints the icon square — it's independent of the up/down trend colors.">
            Colors
          </SectionLabel>
          <Grid cols={4} gap="md">
            <Stat label="Slate" value="128" icon="zap" color="slate" />
            <Stat label="Violet" value="256" icon="zap" color="violet" />
            <Stat label="Teal" value="512" icon="zap" color="teal" />
            <Stat label="Amber" value="1,024" icon="zap" color="amber" />
          </Grid>
          <CodeBlock
            variants={{
              react: `<Stat label="Violet" value="256" icon="zap" color="violet" />`,
              js: `<Stat label="Violet" value="256" icon="zap" color="violet" />`,
              vue: `<template>
  <Stat label="Violet" value="256" icon="zap" color="violet" />
</template>`,
              angular: `<Stat label="Violet" value="256" icon="zap" color="violet" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
