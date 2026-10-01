import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./Buttons/Button";
import CodeBlock from "./CodeBlock";
import { SectionLabel, Row } from "./ShowcaseHelpers";
import type { TransitionVariant } from "../../core/motion";

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

export default function ModalShowcase() {
  const [trOpen, setTrOpen] = useState(false);
  const [trOption, setTrOption] = useState(TR_OPTIONS[2]);
  const trReact = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration={${trOption.duration}}` : ""}${trOption.delay ? ` transitionDelay={${trOption.delay}}` : ""}`;
  const trHtml = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration="${trOption.duration}"` : ""}${trOption.delay ? ` transitionDelay="${trOption.delay}"` : ""}`;
  const [basicOpen, setBasicOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Modal / Dialog</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A centered overlay dialog with a header, scrollable body, and backdrop/Escape dismissal.
          </p>
        </div>

        <section>
          <SectionLabel sub="A titled dialog dismissed via the close button, backdrop click, or Escape.">Basic</SectionLabel>
          <Button label="Open modal" onClick={() => setBasicOpen(true)} />
          <Modal open={basicOpen} onClose={() => setBasicOpen(false)} title="Basic modal">
            <p className="text-sm text-fg-muted">This is a basic modal with some simple content.</p>
          </Modal>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open modal" onClick={() => setOpen(true)} />
<Modal open={open} onClose={() => setOpen(false)} title="Basic modal">
  <p>This is a basic modal with some simple content.</p>
</Modal>`,
              js: `<l-Button label="Open modal" id="open-modal-btn" />
<l-Modal id="basic-modal" heading="Basic modal">
  <p>This is a basic modal with some simple content.</p>
</l-Modal>

<script type="module">
  import "lojee-ui/elements";

  const modal = document.getElementById("basic-modal");
  document.getElementById("open-modal-btn")
    .addEventListener("click", () => { modal.open = true; });
  modal.addEventListener("close", () => { modal.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open modal" @click="open = true" />
  <l-Modal :open="open" heading="Basic modal" @close="open = false">
    <p>This is a basic modal with some simple content.</p>
  </l-Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `<!-- app.component.html -->
<l-Button label="Open modal" (click)="open = true" />
<l-Modal [open]="open" heading="Basic modal" (close)="open = false">
  <p>This is a basic modal with some simple content.</p>
</l-Modal>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Long content scrolls within the body while the header stays pinned.">Long content</SectionLabel>
          <Button label="Open long modal" onClick={() => setLongOpen(true)} />
          <Modal open={longOpen} onClose={() => setLongOpen(false)} title="Terms & conditions">
            <div className="space-y-4 text-sm text-fg-muted">
              {Array.from({ length: 12 }).map((_, i) => (
                <p key={i}>
                  Paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </Modal>
          <CodeBlock
            variants={{
              react: `<Modal open={open} onClose={() => setOpen(false)} title="Terms & conditions">
  <div className="space-y-4">
    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
  </div>
</Modal>`,
              js: `<l-Modal id="terms-modal" heading="Terms & conditions">
  <div class="space-y-4">
    <!-- paragraphs -->
  </div>
</l-Modal>

<script type="module">
  const modal = document.getElementById("terms-modal");
  modal.addEventListener("close", () => { modal.open = false; });
</script>`,
              vue: `<template>
  <l-Modal :open="open" heading="Terms & conditions" @close="open = false">
    <div class="space-y-4">
      <p v-for="(p, i) in paragraphs" :key="i">{{ p }}</p>
    </div>
  </l-Modal>
</template>`,
              angular: `<l-Modal [open]="open" heading="Terms & conditions" (close)="open = false">
  <div class="space-y-4">
    <p *ngFor="let p of paragraphs">{{ p }}</p>
  </div>
</l-Modal>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Per-part class overrides via classNames.">Custom styling</SectionLabel>
          <Button label="Open styled modal" onClick={() => setCustomOpen(true)} />
          <Modal
            open={customOpen}
            onClose={() => setCustomOpen(false)}
            title="Styled modal"
            classNames={{
              root: "max-w-md",
              header: "bg-indigo-50 border-indigo-100",
              title: "text-indigo-900",
              body: "bg-indigo-50/40",
            }}
          >
            <p className="text-sm text-fg-muted">This modal's header and body pick up custom colors via classNames.</p>
          </Modal>
          <CodeBlock
            variants={{
              react: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Styled modal"
  classNames={{
    root: "max-w-md",
    header: "bg-indigo-50 border-indigo-100",
    title: "text-indigo-900",
    body: "bg-indigo-50/40",
  }}
>
  <p>This modal's header and body pick up custom colors via classNames.</p>
</Modal>`,
              js: `<l-Button label="Open styled modal" id="open-styled-modal-btn" />
<l-Modal id="styled-modal" heading="Styled modal">
  <p>This modal's header and body pick up custom colors via classNames.</p>
</l-Modal>

<script type="module">
  const modal = document.getElementById("styled-modal");
  modal.classNames = {
    root: "max-w-md",
    header: "bg-indigo-50 border-indigo-100",
    title: "text-indigo-900",
    body: "bg-indigo-50/40",
  };
  document.getElementById("open-styled-modal-btn")
    .addEventListener("click", () => { modal.open = true; });
  modal.addEventListener("close", () => { modal.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open styled modal" @click="open = true" />
  <l-Modal :open="open" heading="Styled modal" :classNames="modalClassNames" @close="open = false">
    <p>This modal's header and body pick up custom colors via classNames.</p>
  </l-Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const modalClassNames = {
  root: "max-w-md",
  header: "bg-indigo-50 border-indigo-100",
  title: "text-indigo-900",
  body: "bg-indigo-50/40",
};
</script>`,
              angular: `<l-Button label="Open styled modal" (click)="open = true" />
<l-Modal [open]="open" heading="Styled modal" [classNames]="modalClassNames" (close)="open = false">
  <p>This modal's header and body pick up custom colors via classNames.</p>
</l-Modal>

modalClassNames = {
  root: "max-w-md",
  header: "bg-indigo-50 border-indigo-100",
  title: "text-indigo-900",
  body: "bg-indigo-50/40",
};`,
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
          <Modal open={trOpen} onClose={() => setTrOpen(false)} title="Transition" transition={trOption.transition} transitionDuration={trOption.duration} transitionDelay={trOption.delay}>
            <p className="text-sm text-fg-muted">The modal and its backdrop enter and exit with the chosen transition.</p>
          </Modal>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open modal" onClick={() => setOpen(true)} />
<Modal open={open} onClose={() => setOpen(false)} title="Transition" ${trReact}>
  <p>The modal and its backdrop enter and exit with the chosen transition.</p>
</Modal>`,
              js: `<l-Button label="Open modal" id="open-tr-btn"></l-Button>
<l-Modal id="tr-overlay" heading="Transition" ${trHtml}>
  <p>The modal and its backdrop enter and exit with the chosen transition.</p>
</l-Modal>

<script type="module">
  import "lojee-ui/elements";

  const overlay = document.getElementById("tr-overlay");
  document.getElementById("open-tr-btn")
    .addEventListener("click", () => { overlay.open = true; });
  overlay.addEventListener("close", () => { overlay.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open modal" @click="open = true"></l-Button>
  <l-Modal :open="open" heading="Transition" ${trHtml} @close="open = false">
    <p>The modal and its backdrop enter and exit with the chosen transition.</p>
  </l-Modal>
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
    <l-Button label="Open modal" (click)="open = true"></l-Button>
    <l-Modal [open]="open" heading="Transition" ${trHtml} (close)="open = false">
      <p>The modal and its backdrop enter and exit with the chosen transition.</p>
    </l-Modal>
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
