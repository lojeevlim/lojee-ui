import { useState } from "react";
import { AlertDialog } from "../AlertDialog";
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

export default function AlertDialogShowcase() {
  const [trOpen, setTrOpen] = useState(false);
  const [trOption, setTrOption] = useState(TR_OPTIONS[2]);
  const trReact = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration={${trOption.duration}}` : ""}${trOption.delay ? ` transitionDelay={${trOption.delay}}` : ""}`;
  const trHtml = `transition="${trOption.transition}"${trOption.duration ? ` transitionDuration="${trOption.duration}"` : ""}${trOption.delay ? ` transitionDelay="${trOption.delay}"` : ""}`;
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Alert Dialog</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
              js: `<l-Button label="Open confirmation" id="open-confirm-btn" />
<l-AlertDialog
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
  <l-Button label="Open confirmation" @click="open = true" />
  <l-AlertDialog
    :open="open"
    heading="Save changes?"
    description="Your changes will be applied immediately."
    @close="open = false"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
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
    <l-Button label="Open confirmation" (click)="open = true" />
    <l-AlertDialog
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
              js: `<l-AlertDialog
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
  <l-AlertDialog
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
<l-AlertDialog
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
              js: `<l-AlertDialog
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
  <l-AlertDialog
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
<l-AlertDialog
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
          <AlertDialog
            open={trOpen}
            onClose={() => setTrOpen(false)}
            title="Discard changes?"
            description="Your edits will be lost."
            transition={trOption.transition}
            transitionDuration={trOption.duration}
            transitionDelay={trOption.delay}
          />
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Open alert dialog" onClick={() => setOpen(true)} />
<AlertDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Discard changes?"
  description="Your edits will be lost."
  ${trReact}
/>`,
              js: `<l-Button label="Open alert dialog" id="open-tr-btn"></l-Button>
<l-AlertDialog id="tr-overlay" heading="Discard changes?" description="Your edits will be lost." ${trHtml}></l-AlertDialog>

<script type="module">
  import "lojee-ui/elements";

  const overlay = document.getElementById("tr-overlay");
  overlay.addEventListener("confirm", () => { overlay.open = false; });
  document.getElementById("open-tr-btn")
    .addEventListener("click", () => { overlay.open = true; });
  overlay.addEventListener("close", () => { overlay.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Open alert dialog" @click="open = true"></l-Button>
  <l-AlertDialog
    :open="open"
    heading="Discard changes?"
    description="Your edits will be lost."
    ${trHtml}
    @close="open = false"
    @confirm="open = false"
  ></l-AlertDialog>
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
    <l-Button label="Open alert dialog" (click)="open = true"></l-Button>
    <l-AlertDialog
      [open]="open"
      heading="Discard changes?"
      description="Your edits will be lost."
      ${trHtml}
      (close)="open = false"
      (confirm)="open = false"
    ></l-AlertDialog>
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
