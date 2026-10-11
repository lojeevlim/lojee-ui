import { useState } from "react";
import { ButtonGroup } from "../ButtonGroup";
import { SegmentButton } from "../SegmentButton";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export function ButtonGroupSection() {
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [clicked, setClicked] = useState<string>("nothing yet");

  return (
    <section>
      <SectionLabel sub="Grouped actions and a segmented toolbar control.">
        Button groups
      </SectionLabel>
      <div className="space-y-4">
        <ButtonGroup>
          <SegmentButton icon="align-left" active={align === "left"} onClick={() => setAlign("left")} aria-label="Align left" />
          <SegmentButton icon="align-center" active={align === "center"} onClick={() => setAlign("center")} aria-label="Align center" />
          <SegmentButton icon="align-right" active={align === "right"} onClick={() => setAlign("right")} aria-label="Align right" />
        </ButtonGroup>

        <ButtonGroup>
          <SegmentButton icon="bold" active={bold} onClick={() => setBold((v) => !v)} aria-label="Bold" />
          <SegmentButton icon="italic" active={italic} onClick={() => setItalic((v) => !v)} aria-label="Italic" />
          <SegmentButton icon="underline" aria-label="Underline" />
        </ButtonGroup>

        <ButtonGroup>
          <SegmentButton>Day</SegmentButton>
          <SegmentButton active>Week</SegmentButton>
          <SegmentButton>Month</SegmentButton>
          <SegmentButton>Year</SegmentButton>
        </ButtonGroup>

        <div>
          <ButtonGroup onItemClick={({ index, label }) => setClicked(`#${index} “${label}”`)}>
            <SegmentButton>Day</SegmentButton>
            <SegmentButton>Week</SegmentButton>
            <SegmentButton>Month</SegmentButton>
          </ButtonGroup>
          <p className="mt-2 text-xs text-fg-subtle">
            onItemClick on the group — clicked: <span className="font-mono text-fg">{clicked}</span>
          </p>
        </div>
      </div>
      <CodeBlock
        variants={{
          react: `<ButtonGroup>
  <SegmentButton icon="align-left" active={align === "left"} onClick={() => setAlign("left")} />
  <SegmentButton icon="align-center" active={align === "center"} onClick={() => setAlign("center")} />
  <SegmentButton icon="align-right" active={align === "right"} onClick={() => setAlign("right")} />
</ButtonGroup>

{/* One handler for the whole group instead of one onClick per button */}
<ButtonGroup onItemClick={({ index, label }) => console.log(index, label)}>
  <SegmentButton>Day</SegmentButton>
  <SegmentButton>Week</SegmentButton>
  <SegmentButton>Month</SegmentButton>
</ButtonGroup>`,
          js: `<!-- One handler on the group. event.detail is { index, label } of the clicked button;
     "this" is the group, so it can mark the clicked segment active — no ids needed. -->
<l-button-group onitemclick="[...this.children].forEach((b, i) => (b.active = i === event.detail.index))">
  <l-segment-button icon="align-left" active></l-segment-button>
  <l-segment-button icon="align-center"></l-segment-button>
  <l-segment-button icon="align-right"></l-segment-button>
</l-button-group>

<script type="module">import "lojee-ui/elements";</script>`,
          vue: `<template>
  <!-- @itemclick fires once for the whole group; $event.detail is { index, label } -->
  <l-button-group @itemclick="align = $event.detail.index">
    <l-segment-button icon="align-left" :active="align === 0" />
    <l-segment-button icon="align-center" :active="align === 1" />
    <l-segment-button icon="align-right" :active="align === 2" />
  </l-button-group>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const align = ref(0);
</script>`,
          angular: `// button-group-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-button-group-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <!-- (itemclick) fires once for the whole group; $event.detail is { index, label } -->
    <l-button-group (itemclick)="align = $event.detail.index">
      <l-segment-button icon="align-left" [active]="align === 0"></l-segment-button>
      <l-segment-button icon="align-center" [active]="align === 1"></l-segment-button>
      <l-segment-button icon="align-right" [active]="align === 2"></l-segment-button>
    </l-button-group>
  \`,
})
export class ButtonGroupShowcaseComponent {
  align = 0;
}`,
        }}
      />

      <div className="mt-8">
        <SectionLabel sub="selectable lets the group keep its own selection: the clicked segment turns active in the theme color and the others clear — no active state to manage. defaultActive picks the segment that starts selected.">
          Selectable group
        </SectionLabel>
        <div className="flex flex-col items-start gap-4">
          <ButtonGroup selectable defaultActive={1}>
            <SegmentButton>Day</SegmentButton>
            <SegmentButton>Week</SegmentButton>
            <SegmentButton>Month</SegmentButton>
            <SegmentButton>Year</SegmentButton>
          </ButtonGroup>
          <ButtonGroup selectable defaultActive={0}>
            <SegmentButton icon="align-left" aria-label="Align left" />
            <SegmentButton icon="align-center" aria-label="Align center" />
            <SegmentButton icon="align-right" aria-label="Align right" />
          </ButtonGroup>
        </div>
        <CodeBlock
          variants={{
            react: `<ButtonGroup selectable defaultActive={1}>
  <SegmentButton>Day</SegmentButton>
  <SegmentButton>Week</SegmentButton>
  <SegmentButton>Month</SegmentButton>
  <SegmentButton>Year</SegmentButton>
</ButtonGroup>`,
            js: `<l-button-group selectable="true" default-active="1">
  <l-segment-button>Day</l-segment-button>
  <l-segment-button>Week</l-segment-button>
  <l-segment-button>Month</l-segment-button>
  <l-segment-button>Year</l-segment-button>
</l-button-group>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-button-group :selectable="true" :default-active="1">
    <l-segment-button>Day</l-segment-button>
    <l-segment-button>Week</l-segment-button>
    <l-segment-button>Month</l-segment-button>
    <l-segment-button>Year</l-segment-button>
  </l-button-group>
</template>`,
            angular: `<l-button-group selectable="true" default-active="1">
  <l-segment-button>Day</l-segment-button>
  <l-segment-button>Week</l-segment-button>
  <l-segment-button>Month</l-segment-button>
  <l-segment-button>Year</l-segment-button>
</l-button-group>`,
          }}
        />
      </div>
    </section>
  );
}
