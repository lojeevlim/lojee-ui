import { useState } from "react";
import { AlertDialog, type AlertDialogVariant } from "./AlertDialog/AlertDialog";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: AlertDialogVariant[] = ["default", "destructive"];

export default function AlertDialogPlayground() {
  const motion = useMotion();
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<AlertDialogVariant>("default");
  const [title, setTitle] = useState("Are you sure?");
  const [description, setDescription] = useState("This action cannot be undone.");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Open alert dialog" onClick={() => setOpen(true)} />
        <AlertDialog
          {...motion.props}
          open={open}
          onClose={() => setOpen(false)}
          variant={variant}
          title={title || "Are you sure?"}
          description={description || undefined}
          onConfirm={() => setOpen(false)}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  variant="${variant}"
  title="${title || "Are you sure?"}"${description ? `\n  description="${description}"` : ""}${motion.attrs}
  onConfirm={() => { /* ... */ }}
/>`;

  // `open` is controlled visibility, so it's a DOM property set from the
  // trigger click (matches ModalShowcase.tsx's pattern) rather than a baked
  // literal; `variant`/`heading`/`description` stay plain snapshot
  // attributes. `l-alert-dialog` has no slots — the description prop is
  // omitted entirely when empty, same as the react code above.
  const descriptionAttr = description ? ` description="${description}"` : "";
  const htmlMarkup = `<l-Button label="Open alert dialog" id="open-alert-btn" />
<l-AlertDialog id="alert-dialog" variant="${variant}" heading="${title || "Are you sure?"}"${descriptionAttr}${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const dialog = document.getElementById("alert-dialog");
  document.getElementById("open-alert-btn")
    .addEventListener("click", () => { dialog.open = true; });
  dialog.addEventListener("close", () => { dialog.open = false; });
  dialog.addEventListener("confirm", () => { dialog.open = false; });
</script>`,
    vue: `<template>
  <l-Button label="Open alert dialog" @click="open = true" />
  <l-AlertDialog
    :open="open"
    variant="${variant}"
    heading="${title || "Are you sure?"}"${description ? `\n    description="${description}"` : ""}${motion.attrs}
    @close="open = false"
    @confirm="open = false"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<l-Button label="Open alert dialog" (click)="open = true" />
<l-AlertDialog
  [open]="open"
  variant="${variant}"
  heading="${title || "Are you sure?"}"${description ? `\n  description="${description}"` : ""}${motion.attrs}
  (close)="open = false"
  (confirm)="open = false"
 />`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Are you sure?"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="This action cannot be undone."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
