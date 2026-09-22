import { useState } from "react";
import { Toast, type ToastVariant, type ToastPosition } from "../Toast";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const VARIANTS: { variant: ToastVariant; label: string }[] = [
  { variant: "info", label: "Info" },
  { variant: "success", label: "Success" },
  { variant: "warning", label: "Warning" },
  { variant: "error", label: "Error" },
];

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export default function ToastShowcase() {
  const [variantOpen, setVariantOpen] = useState(false);
  const [activeVariant, setActiveVariant] = useState<ToastVariant>("info");

  const [positionOpen, setPositionOpen] = useState(false);
  const [activePosition, setActivePosition] = useState<ToastPosition>("bottom-right");

  const [persistentOpen, setPersistentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Toast</h1>
          <p className="text-sm text-slate-500 mt-1">
            A transient, fixed-position, auto-dismissing notification. Controlled visibility like Modal/Drawer —
            render as many as you need for a stack of your own.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each variant carries its own color treatment and default icon. Auto-dismisses after 4s.">
            Variants
          </SectionLabel>
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map(({ variant, label }) => (
              <Button
                key={variant}
                variant="outline"
                label={label}
                onClick={() => {
                  setActiveVariant(variant);
                  setVariantOpen(true);
                }}
              />
            ))}
          </div>
          <Toast
            open={variantOpen}
            onClose={() => setVariantOpen(false)}
            variant={activeVariant}
            title={VARIANTS.find((v) => v.variant === activeVariant)?.label}
            position="bottom-right"
          >
            This is a {activeVariant} toast notification.
          </Toast>
          <CodeBlock
            variants={{
              react: `const [open, setOpen] = useState(false);

<Button label="Success" onClick={() => setOpen(true)} />
<Toast open={open} onClose={() => setOpen(false)} variant="success" title="Success">
  This is a success toast notification.
</Toast>`,
              js: `<l-Button label="Success" id="open-toast-btn" />
<l-Toast id="success-toast" variant="success" title="Success">
  This is a success toast notification.
</l-Toast>

<script type="module">
  import "lojee-ui/elements";

  const toast = document.getElementById("success-toast");
  document.getElementById("open-toast-btn")
    .addEventListener("click", () => { toast.open = true; });
  toast.addEventListener("close", () => { toast.open = false; });
</script>`,
              vue: `<template>
  <l-Button label="Success" @click="open = true" />
  <l-Toast :open="open" variant="success" title="Success" @close="open = false">
    This is a success toast notification.
  </l-Toast>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
              angular: `<!-- app.component.html -->
<l-Button label="Success" (click)="open = true" />
<l-Toast [open]="open" variant="success" title="Success" (close)="open = false">
  This is a success toast notification.
</l-Toast>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Anchor the toast to any corner or edge of the screen via position.">Position</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {POSITIONS.map((position) => (
              <Button
                key={position}
                variant="outline"
                label={position}
                onClick={() => {
                  setActivePosition(position);
                  setPositionOpen(true);
                }}
              />
            ))}
          </div>
          <Toast
            open={positionOpen}
            onClose={() => setPositionOpen(false)}
            variant="info"
            title="Positioned toast"
            position={activePosition}
          >
            Anchored to {activePosition}.
          </Toast>
          <CodeBlock
            variants={{
              react: `<Toast open={open} onClose={() => setOpen(false)} position="top-center" title="Positioned toast">
  Anchored to top-center.
</Toast>`,
              js: `<l-Toast id="positioned-toast" position="top-center" title="Positioned toast">
  Anchored to top-center.
</l-Toast>

<script type="module">
  const toast = document.getElementById("positioned-toast");
  toast.addEventListener("close", () => { toast.open = false; });
</script>`,
              vue: `<l-Toast :open="open" position="top-center" title="Positioned toast" @close="open = false">
  Anchored to top-center.
</l-Toast>`,
              angular: `<l-Toast [open]="open" position="top-center" title="Positioned toast" (close)="open = false">
  Anchored to top-center.
</l-Toast>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set duration={0} to disable auto-dismiss and rely on the manual close button only.">
            No auto-dismiss
          </SectionLabel>
          <Button variant="outline" label="Open persistent toast" onClick={() => setPersistentOpen(true)} />
          <Toast
            open={persistentOpen}
            onClose={() => setPersistentOpen(false)}
            variant="warning"
            title="Action required"
            duration={0}
          >
            This toast stays open until you dismiss it.
          </Toast>
          <CodeBlock
            variants={{
              react: `<Toast open={open} onClose={() => setOpen(false)} variant="warning" title="Action required" duration={0}>
  This toast stays open until you dismiss it.
</Toast>`,
              js: `<l-Toast id="persistent-toast" variant="warning" title="Action required" duration="0">
  This toast stays open until you dismiss it.
</l-Toast>

<script type="module">
  const toast = document.getElementById("persistent-toast");
  toast.addEventListener("close", () => { toast.open = false; });
</script>`,
              vue: `<l-Toast :open="open" variant="warning" title="Action required" :duration="0" @close="open = false">
  This toast stays open until you dismiss it.
</l-Toast>`,
              angular: `<l-Toast [open]="open" variant="warning" title="Action required" [duration]="0" (close)="open = false">
  This toast stays open until you dismiss it.
</l-Toast>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
