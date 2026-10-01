import { useState } from "react";
import { Sheet } from "../Sheet";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";
import type { TransitionVariant } from "../../../../core/motion";

const TR_OPTIONS: { label: string; transition: TransitionVariant; duration?: number; delay?: number }[] = [
  { label: "Fade", transition: "fade" },
  { label: "Slide up", transition: "slide-up" },
  { label: "Zoom", transition: "zoom" },
  { label: "Flip", transition: "flip" },
  { label: "Blur", transition: "blur" },
  { label: "Bounce", transition: "bounce" },
  { label: "Drop (slow)", transition: "drop", duration: 700 },
  { label: "Zoom (delayed)", transition: "zoom", delay: 200 },
];

export default function SheetShowcase() {
  const [trOpen, setTrOpen] = useState(false);
  const [trOption, setTrOption] = useState(TR_OPTIONS[2]);
  const trReact = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration={${trOption.duration}}` : ""}${trOption.delay ? ` transitionDelay={${trOption.delay}}` : ""}`;
  const trHtml = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration="${trOption.duration}"` : ""}${trOption.delay ? ` transitionDelay="${trOption.delay}"` : ""}`;
  const [basicOpen, setBasicOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Sheet</h1>
          <p className="text-sm text-fg-subtle mt-1">A mobile-style bottom sheet that slides up from the bottom edge.</p>
        </div>

        <section>
          <SectionLabel sub="A basic bottom sheet with a title and short body.">Basic</SectionLabel>
          <Row>
            <Button label="Open sheet" onClick={() => setBasicOpen(true)} />
          </Row>
          <Sheet open={basicOpen} onClose={() => setBasicOpen(false)} title="Sheet title">
            <p className="text-sm text-fg-muted">This is a basic bottom sheet.</p>
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

<script setup lang="ts">
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
            <div className="space-y-4 text-sm text-fg-muted">
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

        <section>
          <SectionLabel sub="Enter/exit transitions via `transition` (with `transitionDuration` / `transitionDelay`) — pick one, then close the overlay to see it play in reverse.">Transitions</SectionLabel>
          <Row>
            {TR_OPTIONS.map((o) => (
              <Button
                key={o.label}
                variant="outline"
                label={o.label}
                onClick={() => {
                  setTrOption(o);
                  setTrOpen(true);
                }}
              />
            ))}
          </Row>
          <Sheet open={trOpen} onClose={() => setTrOpen(false)} title="Transition" transition={trOption.transition} transitionDuration={trOption.duration} transitionDelay={trOption.delay}>
            <p className="text-sm text-fg-muted">A transition replaces the sheet's default slide-up.</p>
          </Sheet>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open sheet" onClick={() => setOpen(true)} />
<Sheet open={open} onClose={() => setOpen(false)} title="Transition" ${trReact}>
  <p>A transition replaces the sheet's default slide-up.</p>
</Sheet>`,
              js: `<l-Button label="Open sheet" id="open-tr-btn"></l-Button>
<l-Sheet id="tr-overlay" heading="Transition" ${trHtml}>
  <p>A transition replaces the sheet's default slide-up.</p>
</l-Sheet>

<script type="module">
  import "lojee-ui/elements";

  const overlay = document.getElementById("tr-overlay");
  document.getElementById("open-tr-btn")
    .addEventListener("click", () => { overlay.open = true; });
  overlay.addEventListener("close", () => { overlay.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open sheet" @click="open = true"></l-Button>
  <l-Sheet :open="open" heading="Transition" ${trHtml} @close="open = false">
    <p>A transition replaces the sheet's default slide-up.</p>
  </l-Sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button label="Open sheet" (click)="open = true"></l-Button>
    <l-Sheet [open]="open" heading="Transition" ${trHtml} (close)="open = false">
      <p>A transition replaces the sheet's default slide-up.</p>
    </l-Sheet>
  \`,
})
export class AppComponent {
  open = false;
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
