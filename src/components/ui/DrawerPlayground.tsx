import { useState } from "react";
import { Drawer, type DrawerPosition } from "./Drawer/Drawer";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const POSITIONS: DrawerPosition[] = ["left", "right", "top", "bottom"];

export default function DrawerPlayground() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>("right");
  const [title, setTitle] = useState("Drawer title");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Button label="Open drawer" onClick={() => setOpen(true)} />
        <Drawer open={open} onClose={() => setOpen(false)} position={position} title={title || "Drawer title"}>
          <p className="text-sm text-slate-600">This is the drawer body content.</p>
        </Drawer>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Drawer open={open} onClose={() => setOpen(false)} position="${position}" title="${title || "Drawer title"}">
  <p>This is the drawer body content.</p>
</Drawer>`;

  // `open` is controlled visibility, so it's a DOM property set from the
  // trigger click (matches ModalShowcase.tsx's pattern) rather than a baked
  // literal; `position`/`heading` stay plain snapshot attributes.
  const htmlMarkup = `<Button label="Open drawer" id="open-drawer-btn" />
<Drawer id="drawer" position="${position}" heading="${title || "Drawer title"}">
  <p>This is the drawer body content.</p>
</Drawer>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}

<script type="module">
  import "lojee-ui/elements";

  const drawer = document.getElementById("drawer");
  document.getElementById("open-drawer-btn")
    .addEventListener("click", () => { drawer.open = true; });
  drawer.addEventListener("close", () => { drawer.open = false; });
</script>`,
    vue: `<template>
  <Button label="Open drawer" @click="open = true" />
  <Drawer :open="open" position="${position}" heading="${title || "Drawer title"}" @close="open = false">
    <p>This is the drawer body content.</p>
  </Drawer>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const open = ref(false);
</script>`,
    angular: `<!-- app.component.html -->
<Button label="Open drawer" (click)="open = true" />
<Drawer [open]="open" position="${position}" heading="${title || "Drawer title"}" (close)="open = false">
  <p>This is the drawer body content.</p>
</Drawer>`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Drawer title"
        />
      </div>
      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
    </PlaygroundLayout>
  );
}
