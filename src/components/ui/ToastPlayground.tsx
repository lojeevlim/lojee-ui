import { useState } from "react";
import { Toast, type ToastVariant, type ToastPosition } from "./Toast/Toast";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: ToastVariant[] = ["info", "success", "warning", "error"];
const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export default function ToastPlayground() {
  const motion = useMotion();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<ToastVariant>("info");
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [title, setTitle] = useState("Heads up");
  const [description, setDescription] = useState("Your changes have been saved.");
  const [duration, setDuration] = useState(4000);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Show toast" onClick={() => setOpen(true)} />
        <Toast
          {...motion.props}
          open={open}
          onClose={() => setOpen(false)}
          variant={variant}
          position={position}
          title={title || undefined}
          duration={duration}
        >
          {description || undefined}
        </Toast>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title ? `\n  title="${title}"` : "";
  const durationAttr = duration !== 4000 ? `\n  duration={${duration}}` : "";
  const durationAttrHtml = duration !== 4000 ? `\n  duration="${duration}"` : "";
  const body = description ? `\n  ${description}\n` : "";

  const code = `<Toast
  open={open}
  onClose={() => setOpen(false)}
  variant="${variant}"
  position="${position}"${titleAttr}${durationAttr}${motion.attrs}
>${body}</Toast>`;

  const htmlMarkup = `<l-toast id="toast" variant="${variant}" position="${position}"${titleAttr}${durationAttrHtml}${motion.attrs}>${body}</l-toast>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-button label="Show toast" id="show-toast-btn"></l-button>
${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const toast = document.getElementById("toast");
  document.getElementById("show-toast-btn")
    .addEventListener("click", () => { toast.open = true; });
  toast.addEventListener("close", () => { toast.open = false; });
</script>`,
    vue: `<template>
  <l-button label="Show toast" @click="open = true" />
  <l-toast
    :open="open"
    variant="${variant}"
    position="${position}"${titleAttr}${duration !== 4000 ? `\n    :duration="${duration}"` : ""}${motion.attrs}
    @close="open = false"
  >${body}</l-toast>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<l-button label="Show toast" (click)="open = true" />
<l-toast
  [open]="open"
  variant="${variant}"
  position="${position}"${titleAttr}${duration !== 4000 ? `\n  [duration]="${duration}"` : ""}${motion.attrs}
  (close)="open = false"
>${body}</l-toast>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Heads up"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Your changes have been saved."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">
          Duration (ms) — 0 disables auto-dismiss
        </span>
        <input
          type="number"
          min={0}
          step={500}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) || 0)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
        />
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
