import { useState } from "react";
import { AlertDialog } from "../AlertDialog";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function AlertDialogShowcase() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Alert Dialog</h1>
          <p className="text-sm text-slate-500 mt-1">
            A focused confirmation dialog with an icon, title, description, and Cancel/Confirm actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="A neutral confirmation prompt.">Default</SectionLabel>
          <Button label="Open confirmation" onClick={() => setDefaultOpen(true)} />
          <AlertDialog
            open={defaultOpen}
            onClose={() => setDefaultOpen(false)}
            title="Save changes?"
            description="Your changes will be applied immediately."
            onConfirm={() => setDefaultOpen(false)}
          />
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open confirmation" onClick={() => setOpen(true)} />
<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Save changes?"
  description="Your changes will be applied immediately."
  onConfirm={() => { /* persist */ }}
/>`,
              js: `<Button label="Open confirmation" id="open-confirm-btn" />
<AlertDialog
  id="save-dialog"
  heading="Save changes?"
  description="Your changes will be applied immediately."
 />

<script type="module">
  import "lojee-ui/elements";

  const dialog = document.getElementById("save-dialog");
  document.getElementById("open-confirm-btn")
    .addEventListener("click", () => { dialog.open = true; });
  dialog.addEventListener("close", () => { dialog.open = false; });
  dialog.addEventListener("confirm", () => {
    /* persist */
    dialog.open = false;
  });
</script>`,
              vue: `<template>
  <Button label="Open confirmation" @click="open = true" />
  <AlertDialog
    :open="open"
    heading="Save changes?"
    description="Your changes will be applied immediately."
    @close="open = false"
    @confirm="handleConfirm"
  />
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
const handleConfirm = () => {
  /* persist */
  open.value = false;
};
</script>`,
              angular: `// alert-dialog-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-alert-dialog-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <Button label="Open confirmation" (click)="open = true" />
    <AlertDialog
      [open]="open"
      heading="Save changes?"
      description="Your changes will be applied immediately."
      (close)="open = false"
      (confirm)="handleConfirm()"
     />
  \`,
})
export class AlertDialogShowcaseComponent {
  open = false;

  handleConfirm() {
    /* persist */
    this.open = false;
  }
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Destructive variant with a red confirm button and warning icon.">Destructive</SectionLabel>
          <Button variant="destructive" label="Delete item" onClick={() => setDestructiveOpen(true)} />
          <AlertDialog
            open={destructiveOpen}
            onClose={() => setDestructiveOpen(false)}
            variant="destructive"
            title="Delete item?"
            description="This will permanently remove the item. This action cannot be undone."
            confirmLabel="Delete"
            onConfirm={() => setDestructiveOpen(false)}
          />
          <CodeBlock
            variants={{
              react: `<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  variant="destructive"
  title="Delete item?"
  description="This will permanently remove the item. This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={() => { /* delete */ }}
/>`,
              js: `<AlertDialog
  id="delete-dialog"
  variant="destructive"
  heading="Delete item?"
  description="This will permanently remove the item. This action cannot be undone."
  confirmLabel="Delete"
 />

<script type="module">
  const dialog = document.getElementById("delete-dialog");
  dialog.addEventListener("close", () => { dialog.open = false; });
  dialog.addEventListener("confirm", () => {
    /* delete */
    dialog.open = false;
  });
</script>`,
              vue: `<template>
  <AlertDialog
    :open="open"
    variant="destructive"
    heading="Delete item?"
    description="This will permanently remove the item. This action cannot be undone."
    confirmLabel="Delete"
    @close="open = false"
    @confirm="handleConfirm"
  />
</template>`,
              angular: `<!-- reuses AlertDialogShowcaseComponent from above -->
<AlertDialog
  [open]="open"
  variant="destructive"
  heading="Delete item?"
  description="This will permanently remove the item. This action cannot be undone."
  confirmLabel="Delete"
  (close)="open = false"
  (confirm)="handleConfirm()"
 />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Custom confirm/cancel labels.">Custom labels</SectionLabel>
          <Button label="Leave page" onClick={() => setCustomOpen(true)} />
          <AlertDialog
            open={customOpen}
            onClose={() => setCustomOpen(false)}
            title="Leave without saving?"
            description="You have unsaved changes that will be lost."
            confirmLabel="Leave"
            cancelLabel="Stay"
            onConfirm={() => setCustomOpen(false)}
          />
          <CodeBlock
            variants={{
              react: `<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Leave without saving?"
  description="You have unsaved changes that will be lost."
  confirmLabel="Leave"
  cancelLabel="Stay"
  onConfirm={() => { /* navigate away */ }}
/>`,
              js: `<AlertDialog
  id="leave-dialog"
  heading="Leave without saving?"
  description="You have unsaved changes that will be lost."
  confirmLabel="Leave"
  cancelLabel="Stay"
 />

<script type="module">
  const dialog = document.getElementById("leave-dialog");
  dialog.addEventListener("close", () => { dialog.open = false; });
  dialog.addEventListener("confirm", () => {
    /* navigate away */
    dialog.open = false;
  });
</script>`,
              vue: `<template>
  <AlertDialog
    :open="open"
    heading="Leave without saving?"
    description="You have unsaved changes that will be lost."
    confirmLabel="Leave"
    cancelLabel="Stay"
    @close="open = false"
    @confirm="handleConfirm"
  />
</template>`,
              angular: `<!-- reuses AlertDialogShowcaseComponent from above -->
<AlertDialog
  [open]="open"
  heading="Leave without saving?"
  description="You have unsaved changes that will be lost."
  confirmLabel="Leave"
  cancelLabel="Stay"
  (close)="open = false"
  (confirm)="handleConfirm()"
 />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
