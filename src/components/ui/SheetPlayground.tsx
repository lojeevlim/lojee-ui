import { useState } from "react";
import { Sheet } from "./Sheet/Sheet";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function SheetPlayground() {
  const motion = useMotion();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Sheet title");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Open sheet" onClick={() => setOpen(true)} />
        <Sheet {...motion.props} open={open} onClose={() => setOpen(false)} title={title || "Sheet title"}>
          <p className="text-sm text-fg-muted">This is the sheet body content.</p>
        </Sheet>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Sheet open={open} onClose={() => setOpen(false)} title="${title || "Sheet title"}"${motion.attrs}>
  <p>This is the sheet body content.</p>
</Sheet>`;

  // `open` is controlled visibility, so it's a DOM property set from the
  // trigger click (matches ModalShowcase.tsx's pattern) rather than a baked
  // literal; `heading` stays a plain snapshot attribute.
  const htmlMarkup = `<l-button label="Open sheet" id="open-sheet-btn" />
<l-sheet id="sheet" heading="${title || "Sheet title"}"${motion.attrs}>
  <p>This is the sheet body content.</p>
</l-sheet>`;

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
  <l-button label="Open sheet" @click="open = true" />
  <l-sheet :open="open" heading="${title || "Sheet title"}"${motion.attrs} @close="open = false">
    <p>This is the sheet body content.</p>
  </l-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<l-button label="Open sheet" (click)="open = true" />
<l-sheet [open]="open" heading="${title || "Sheet title"}"${motion.attrs} (close)="open = false">
  <p>This is the sheet body content.</p>
</l-sheet>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Sheet title"
        />
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
