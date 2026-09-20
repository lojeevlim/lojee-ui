import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function ModalPlayground() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Modal title");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Open modal" onClick={() => setOpen(true)} />
        <Modal open={open} onClose={() => setOpen(false)} title={title || "Modal title"}>
          <p className="text-sm text-slate-600">This is the modal body content.</p>
        </Modal>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Modal open={open} onClose={() => setOpen(false)} title="${title || "Modal title"}">
  <p>This is the modal body content.</p>
</Modal>`;

  // Custom-element markup — `open` is controlled visibility so it's set as a
  // DOM property from a trigger click rather than baked as a literal
  // attribute, matching ModalShowcase.tsx's pattern; every other prop
  // (heading here) stays a plain snapshot attribute.
  const htmlMarkup = `<Button label="Open modal" id="open-modal-btn" />
<Modal id="modal" heading="${title || "Modal title"}">
  <p>This is the modal body content.</p>
</Modal>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const modal = document.getElementById("modal");
  document.getElementById("open-modal-btn")
    .addEventListener("click", () => { modal.open = true; });
  modal.addEventListener("close", () => { modal.open = false; });
</script>`,
    vue: `<template>
  <Button label="Open modal" @click="open = true" />
  <Modal :open="open" heading="${title || "Modal title"}" @close="open = false">
    <p>This is the modal body content.</p>
  </Modal>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<Button label="Open modal" (click)="open = true" />
<Modal [open]="open" heading="${title || "Modal title"}" (close)="open = false">
  <p>This is the modal body content.</p>
</Modal>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Modal title"
        />
      </div>
    </PlaygroundLayout>
  );
}
