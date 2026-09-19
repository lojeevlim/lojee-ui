import { useState } from "react";
import { Sheet } from "./Sheet/Sheet";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function SheetPlayground() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Sheet title");

  const preview = (
    <>
      <Button label="Open sheet" onClick={() => setOpen(true)} />
      <Sheet open={open} onClose={() => setOpen(false)} title={title || "Sheet title"}>
        <p className="text-sm text-slate-600">This is the sheet body content.</p>
      </Sheet>
    </>
  );

  const code = `<Sheet open={open} onClose={() => setOpen(false)} title="${title || "Sheet title"}">
  <p>This is the sheet body content.</p>
</Sheet>`;

  // `open` is controlled visibility, so it's a DOM property set from the
  // trigger click (matches ModalShowcase.tsx's pattern) rather than a baked
  // literal; `heading` stays a plain snapshot attribute.
  const htmlMarkup = `<Button label="Open sheet" id="open-sheet-btn" />
<Sheet id="sheet" heading="${title || "Sheet title"}">
  <p>This is the sheet body content.</p>
</Sheet>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const sheet = document.getElementById("sheet");
  document.getElementById("open-sheet-btn")
    .addEventListener("click", () => { sheet.open = true; });
  sheet.addEventListener("close", () => { sheet.open = false; });
</script>`,
    vue: `<template>
  <Button label="Open sheet" @click="open = true" />
  <Sheet :open="open" heading="${title || "Sheet title"}" @close="open = false">
    <p>This is the sheet body content.</p>
  </Sheet>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<Button label="Open sheet" (click)="open = true" />
<Sheet [open]="open" heading="${title || "Sheet title"}" (close)="open = false">
  <p>This is the sheet body content.</p>
</Sheet>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Sheet title"
        />
      </div>
    </PlaygroundLayout>
  );
}
