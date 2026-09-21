import { useState } from "react";
import { Sheet } from "../Sheet";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SheetShowcase() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Sheet</h1>
          <p className="text-sm text-slate-500 mt-1">A mobile-style bottom sheet that slides up from the bottom edge.</p>
        </div>

        <section>
          <SectionLabel sub="A basic bottom sheet with a title and short body.">Basic</SectionLabel>
          <Row>
            <Button label="Open sheet" onClick={() => setBasicOpen(true)} />
          </Row>
          <Sheet open={basicOpen} onClose={() => setBasicOpen(false)} title="Sheet title">
            <p className="text-sm text-slate-600">This is a basic bottom sheet.</p>
          </Sheet>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Sheet open={open} onClose={() => setOpen(false)} title="Sheet title">
  <p>This is a basic bottom sheet.</p>
</Sheet>`,
              js: `<l-Button label="Open sheet" id="open-sheet-btn" />
<l-Sheet id="basic-sheet" heading="Sheet title">
  <p>This is a basic bottom sheet.</p>
</l-Sheet>

<script type="module">
  import "lojee-ui/elements";

  const sheet = document.getElementById("basic-sheet");
  document.getElementById("open-sheet-btn")
    .addEventListener("click", () => { sheet.open = true; });
  sheet.addEventListener("close", () => { sheet.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open sheet" @click="open = true" />
  <l-Sheet :open="open" heading="Sheet title" @close="open = false">
    <p>This is a basic bottom sheet.</p>
  </l-Sheet>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `// sheet-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-sheet-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button label="Open sheet" (click)="open = true" />
    <l-Sheet [open]="open" heading="Sheet title" (close)="open = false">
      <p>This is a basic bottom sheet.</p>
    </l-Sheet>
  \`,
})
export class SheetShowcaseComponent {
  open = false;
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Long content scrolls inside the body while the header and handle stay put.">
            Scrollable content
          </SectionLabel>
          <Row>
            <Button label="Open long sheet" onClick={() => setLongOpen(true)} />
          </Row>
          <Sheet open={longOpen} onClose={() => setLongOpen(false)} title="Terms & conditions">
            <div className="space-y-4 text-sm text-slate-600">
              {Array.from({ length: 20 }, (_, i) => (
                <p key={i}>
                  Paragraph {i + 1}. Scroll down to see the rest of this content while the sheet stays anchored to the bottom
                  of the screen.
                </p>
              ))}
            </div>
          </Sheet>
          <CodeBlock
            variants={{
              react: `<Sheet open={open} onClose={() => setOpen(false)} title="Terms & conditions">
  <div className="space-y-4">
    {items.map((item) => <p key={item.id}>{item.text}</p>)}
  </div>
</Sheet>`,
              js: `<l-Sheet id="terms-sheet" heading="Terms & conditions">
  <div>
    <!-- items -->
  </div>
</l-Sheet>

<script type="module">
  const sheet = document.getElementById("terms-sheet");
  sheet.addEventListener("close", () => { sheet.open = false; });
</script>`,
              vue: `<template>
  <l-Sheet :open="open" heading="Terms & conditions" @close="open = false">
    <div>
      <p v-for="item in items" :key="item.id">{{ item.text }}</p>
    </div>
  </l-Sheet>
</template>`,
              angular: `<!-- reuses SheetShowcaseComponent from above -->
<l-Sheet [open]="open" heading="Terms & conditions" (close)="open = false">
  <div>
    <p *ngFor="let item of items">{{ item.text }}</p>
  </div>
</l-Sheet>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
