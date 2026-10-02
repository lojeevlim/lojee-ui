import { useState } from "react";
import { DetailsList, type DetailsListItem } from "./DetailsList/DetailsList";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ITEMS: DetailsListItem[] = [
  {
    title: "@selectionchange",
    description: "Called whenever the selection changes.",
    fields: [{ name: "keys", type: "(string | number)[]", description: "The selected row keys." }],
  },
  { title: "@sortchange", description: "Called when a sortable header is clicked." },
  { title: "@viewchange", description: 'Called with "table" or "grid".' },
];

const ITEMS_CODE = `[
  { title: "@selectionchange", description: "Called whenever the selection changes.", fields: [{ name: "keys", type: "(string | number)[]", description: "The selected row keys." }] },
  { title: "@sortchange", description: "Called when a sortable header is clicked." },
  { title: "@viewchange", description: 'Called with "table" or "grid".' },
]`;

export default function DetailsListPlayground() {
  const motion = useMotion({ hover: false });
  const [exclusive, setExclusive] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-lg">
          <DetailsList key={motion.replayKey} {...motion.props} items={ITEMS} exclusive={exclusive} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const attrs = (exclusive ? " exclusive" : "") + motion.attrs;
  const codeVariants: CodeBlockVariants = {
    react: `<DetailsList${attrs}\n  items={${ITEMS_CODE.replace(/\n/g, "\n  ")}}\n/>`,
    js: `<l-DetailsList id="details-demo"${exclusive ? ' exclusive="true"' : ""}${motion.attrs}></l-DetailsList>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  document.getElementById("details-demo").items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};\n</script>`,
    vue: `<template>\n  <l-DetailsList :items="items"${exclusive ? ' exclusive="true"' : ""}${motion.attrs} />\n</template>\n\n<script setup lang="ts">\nconst items = ${ITEMS_CODE};\n</script>`,
    angular: `<l-DetailsList [items]="items"${exclusive ? ' exclusive="true"' : ""}${motion.attrs}></l-DetailsList>\n\n// component class\nitems = ${ITEMS_CODE};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} />
        Exclusive
      </label>
      {motion.controls}
    </PlaygroundLayout>
  );
}
