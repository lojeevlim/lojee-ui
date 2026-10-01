import { useState } from "react";
import Modal from "./Modal";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function ModalPlayground() {
  const motion = useMotion();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Modal title");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Open modal" onClick={() => setOpen(true)} />
        <Modal {...motion.props} open={open} onClose={() => setOpen(false)} title={title || "Modal title"}>
          <p className="text-sm text-fg-muted">This is the modal body content.</p>
        </Modal>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Modal open={open} onClose={() => setOpen(false)} title="${title || "Modal title"}"${motion.attrs}>
  <p>This is the modal body content.</p>
</Modal>`;

  // Custom-element markup — `open` is controlled visibility so it's set as a
  // DOM property from a trigger click rather than baked as a literal
  // attribute, matching ModalShowcase.tsx's pattern; every other prop
  // (heading here) stays a plain snapshot attribute.
  const htmlMarkup = `<l-Button label="Open modal" id="open-modal-btn" />
<l-Modal id="modal" heading="${title || "Modal title"}"${motion.attrs}>
  <p>This is the modal body content.</p>
</l-Modal>`;

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
  <l-Button label="Open modal" @click="open = true" />
  <l-Modal :open="open" heading="${title || "Modal title"}"${motion.attrs} @close="open = false">
    <p>This is the modal body content.</p>
  </l-Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<l-Button label="Open modal" (click)="open = true" />
<l-Modal [open]="open" heading="${title || "Modal title"}"${motion.attrs} (close)="open = false">
  <p>This is the modal body content.</p>
</l-Modal>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Modal title"
        />
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
