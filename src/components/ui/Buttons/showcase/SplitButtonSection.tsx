import { SplitButton } from "../SplitButton";
import { SplitButtonMenuItem } from "../SplitButtonMenuItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export function SplitButtonSection() {
  return (
    <section>
      <SectionLabel sub="A primary action paired with a dropdown trigger.">
        Split button
      </SectionLabel>
      <Row>
        <SplitButton icon="check" label="Approve" />
      </Row>
      <CodeBlock
        variants={{
          react: `<SplitButton icon="check" label="Approve" />`,
          js: `<l-split-button icon="check" label="Approve"></l-split-button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
          vue: `<template>
  <l-split-button icon="check" label="Approve" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
          angular: `// split-button-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-split-button-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-split-button icon="check" label="Approve" />\`,
})
export class SplitButtonShowcaseComponent {}`,
        }}
      />

      <div className="mt-8">
        <SectionLabel sub="shape controls the group's outer corners; menuIcon swaps the dropdown trigger's icon.">
          Shapes & dropdown icon
        </SectionLabel>
        <Row>
          <SplitButton icon="check" label="Approve" shape="default" />
          <SplitButton icon="check" label="Approve" shape="pill" />
          <SplitButton icon="check" label="Approve" shape="square" />
          <SplitButton icon="download" label="Export" menuIcon="more-vertical" />
        </Row>
        <CodeBlock
          variants={{
            react: `<SplitButton icon="check" label="Approve" shape="default" />
<SplitButton icon="check" label="Approve" shape="pill" />
<SplitButton icon="check" label="Approve" shape="square" />
<SplitButton icon="download" label="Export" menuIcon="more-vertical" />`,
            js: `<l-split-button icon="check" label="Approve" shape="default"></l-split-button>
<l-split-button icon="check" label="Approve" shape="pill"></l-split-button>
<l-split-button icon="check" label="Approve" shape="square"></l-split-button>
<l-split-button icon="download" label="Export" menuIcon="more-vertical"></l-split-button>`,
            vue: `<template>
  <l-split-button icon="check" label="Approve" shape="default" />
  <l-split-button icon="check" label="Approve" shape="pill" />
  <l-split-button icon="check" label="Approve" shape="square" />
  <l-split-button icon="download" label="Export" menuIcon="more-vertical" />
</template>`,
            angular: `<!-- reuses SplitButtonShowcaseComponent from above -->
<l-split-button icon="check" label="Approve" shape="default" />
<l-split-button icon="check" label="Approve" shape="pill" />
<l-split-button icon="check" label="Approve" shape="square" />
<l-split-button icon="download" label="Export" menuIcon="more-vertical" />`,
          }}
        />
      </div>

      <div className="mt-8">
        <SectionLabel sub="Dropdown options are SplitButtonMenuItem children — click the trigger to open the menu; closes on selection, outside click, or Escape.">
          Dropdown options
        </SectionLabel>
        <Row>
          <SplitButton icon="download" label="Export">
            <SplitButtonMenuItem icon="file" onClick={() => alert("Export as PDF")}>
              Export as PDF
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon="list" onClick={() => alert("Export as CSV")}>
              Export as CSV
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon="image" onClick={() => alert("Export as PNG")}>
              Export as PNG
            </SplitButtonMenuItem>
            <SplitButtonMenuItem disabled>Cancel</SplitButtonMenuItem>
          </SplitButton>
        </Row>
        <CodeBlock
          variants={{
            react: `<SplitButton icon="download" label="Export">
  <SplitButtonMenuItem icon="file" onClick={() => exportAs("pdf")}>Export as PDF</SplitButtonMenuItem>
  <SplitButtonMenuItem icon="list" onClick={() => exportAs("csv")}>Export as CSV</SplitButtonMenuItem>
  <SplitButtonMenuItem icon="image" onClick={() => exportAs("png")}>Export as PNG</SplitButtonMenuItem>
  <SplitButtonMenuItem disabled>Cancel</SplitButtonMenuItem>
</SplitButton>`,
            js: `<l-split-button icon="download" label="Export">
  <l-split-button-menu-item icon="file" id="export-pdf">Export as PDF</l-split-button-menu-item>
  <l-split-button-menu-item icon="list" id="export-csv">Export as CSV</l-split-button-menu-item>
  <l-split-button-menu-item icon="image" id="export-png">Export as PNG</l-split-button-menu-item>
  <l-split-button-menu-item disabled>Cancel</l-split-button-menu-item>
</l-split-button>

<script type="module">
  document.getElementById("export-pdf").addEventListener("click", () => exportAs("pdf"));
  document.getElementById("export-csv").addEventListener("click", () => exportAs("csv"));
  document.getElementById("export-png").addEventListener("click", () => exportAs("png"));
</script>`,
            vue: `<template>
  <l-split-button icon="download" label="Export">
    <l-split-button-menu-item icon="file" @click="exportAs('pdf')">Export as PDF</l-split-button-menu-item>
    <l-split-button-menu-item icon="list" @click="exportAs('csv')">Export as CSV</l-split-button-menu-item>
    <l-split-button-menu-item icon="image" @click="exportAs('png')">Export as PNG</l-split-button-menu-item>
    <l-split-button-menu-item disabled>Cancel</l-split-button-menu-item>
  </l-split-button>
</template>`,
            angular: `<!-- reuses SplitButtonShowcaseComponent from above -->
<l-split-button icon="download" label="Export">
  <l-split-button-menu-item icon="file" (click)="exportAs('pdf')">Export as PDF</l-split-button-menu-item>
  <l-split-button-menu-item icon="list" (click)="exportAs('csv')">Export as CSV</l-split-button-menu-item>
  <l-split-button-menu-item icon="image" (click)="exportAs('png')">Export as PNG</l-split-button-menu-item>
  <l-split-button-menu-item disabled>Cancel</l-split-button-menu-item>
</l-split-button>`,
          }}
        />
      </div>
    </section>
  );
}
