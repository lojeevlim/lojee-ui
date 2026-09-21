import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./Buttons/Button";
import CodeBlock from "./CodeBlock";
import { SectionLabel } from "./ShowcaseHelpers";

export default function ModalShowcase() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [longOpen, setLongOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Modal / Dialog</h1>
          <p className="text-sm text-slate-500 mt-1">
            A centered overlay dialog with a header, scrollable body, and backdrop/Escape dismissal.
          </p>
        </div>

        <section>
          <SectionLabel sub="A titled dialog dismissed via the close button, backdrop click, or Escape.">Basic</SectionLabel>
          <Button label="Open modal" onClick={() => setBasicOpen(true)} />
          <Modal open={basicOpen} onClose={() => setBasicOpen(false)} title="Basic modal">
            <p className="text-sm text-slate-600">This is a basic modal with some simple content.</p>
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

<script setup>
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
            <div className="space-y-4 text-sm text-slate-600">
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
            <p className="text-sm text-slate-600">This modal's header and body pick up custom colors via classNames.</p>
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

<script setup>
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
      </div>
    </div>
  );
}
