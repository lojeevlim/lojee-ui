import { useState } from "react";
import { Toast, type ToastVariant, type ToastPosition } from "./Toast/Toast";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

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
  position="${position}"${titleAttr}${durationAttr}
>${body}</Toast>`;

  const htmlMarkup = `<Toast id="toast" variant="${variant}" position="${position}"${titleAttr}${durationAttrHtml}>${body}</Toast>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<Button label="Show toast" id="show-toast-btn" />
${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const toast = document.getElementById("toast");
  document.getElementById("show-toast-btn")
    .addEventListener("click", () => { toast.open = true; });
  toast.addEventListener("close", () => { toast.open = false; });
</script>`,
    vue: `<template>
  <Button label="Show toast" @click="open = true" />
  <Toast
    :open="open"
    variant="${variant}"
    position="${position}"${titleAttr}${duration !== 4000 ? `\n    :duration="${duration}"` : ""}
    @close="open = false"
  >${body}</Toast>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<Button label="Show toast" (click)="open = true" />
<Toast
  [open]="open"
  variant="${variant}"
  position="${position}"${titleAttr}${duration !== 4000 ? `\n  [duration]="${duration}"` : ""}
  (close)="open = false"
>${body}</Toast>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Heads up"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Your changes have been saved."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">
          Duration (ms) — 0 disables auto-dismiss
        </span>
        <input
          type="number"
          min={0}
          step={500}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value) || 0)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
        />
      </div>
    </PlaygroundLayout>
  );
}
