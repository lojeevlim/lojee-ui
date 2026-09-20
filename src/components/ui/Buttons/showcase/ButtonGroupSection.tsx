import { useState } from "react";
import { ButtonGroup } from "../ButtonGroup";
import { SegmentButton } from "../SegmentButton";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export function ButtonGroupSection() {
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

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
      </div>
      <CodeBlock
        variants={{
          react: `<ButtonGroup>
  <SegmentButton icon="align-left" active={align === "left"} onClick={() => setAlign("left")} />
  <SegmentButton icon="align-center" active={align === "center"} onClick={() => setAlign("center")} />
  <SegmentButton icon="align-right" active={align === "right"} onClick={() => setAlign("right")} />
</ButtonGroup>`,
          js: `<ButtonGroup>
  <SegmentButton icon="align-left" id="align-left" />
  <SegmentButton icon="align-center" id="align-center" />
  <SegmentButton icon="align-right" id="align-right" />
</ButtonGroup>

<script type="module">
  import "lojee-ui/elements";

  const buttons = {
    left: document.getElementById("align-left"),
    center: document.getElementById("align-center"),
    right: document.getElementById("align-right"),
  };
  function setAlign(value) {
    for (const [key, btn] of Object.entries(buttons)) {
      btn.active = key === value;
    }
  }
  buttons.left.addEventListener("click", () => setAlign("left"));
  buttons.center.addEventListener("click", () => setAlign("center"));
  buttons.right.addEventListener("click", () => setAlign("right"));
</script>`,
          vue: `<template>
  <ButtonGroup>
    <SegmentButton icon="align-left" :active="align === 'left'" @click="align = 'left'" />
    <SegmentButton icon="align-center" :active="align === 'center'" @click="align = 'center'" />
    <SegmentButton icon="align-right" :active="align === 'right'" @click="align = 'right'" />
  </ButtonGroup>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const align = ref("left");
</script>`,
          angular: `// button-group-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-button-group-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <ButtonGroup>
      <SegmentButton icon="align-left" [active]="align === 'left'" (click)="align = 'left'" />
      <SegmentButton icon="align-center" [active]="align === 'center'" (click)="align = 'center'" />
      <SegmentButton icon="align-right" [active]="align === 'right'" (click)="align = 'right'" />
    </ButtonGroup>
  \`,
})
export class ButtonGroupShowcaseComponent {
  align: "left" | "center" | "right" = "left";
}`,
        }}
      />
    </section>
  );
}
