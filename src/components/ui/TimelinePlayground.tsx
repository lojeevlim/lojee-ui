import { useState } from "react";
import { Timeline, type TimelineItem, type TimelineOrientation } from "./Timeline/Timeline";
import { OptionGroup, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const ORIENTATIONS: TimelineOrientation[] = ["vertical", "horizontal"];

const SAMPLE_ITEMS: TimelineItem[] = [
  { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
  { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },
];

const SAMPLE_ITEMS_CODE = `  { title: "Order placed", timestamp: "Jan 4, 9:02 AM", icon: "check", color: "emerald" },
  { title: "Shipped", description: "Package handed to carrier.", timestamp: "Jan 5, 2:30 PM", icon: "check", color: "emerald" },
  { title: "Out for delivery", description: "Arriving today.", icon: "clock", color: "amber" },
  { title: "Delivered", icon: "circle-dot", color: "slate" },`;

export default function TimelinePlayground() {
  const motion = useMotion({ hover: false });
  const [orientation, setOrientation] = useState<TimelineOrientation>("vertical");

  const preview = (
    <AppWindowFrame>
      {orientation === "vertical" ? (
        <div className="flex justify-center bg-surface p-10" style={{ minHeight: 260 }}>
          <Timeline key={motion.replayKey} {...motion.props} items={SAMPLE_ITEMS} orientation={orientation} />
        </div>
      ) : (
        <div className="flex items-center bg-surface p-10" style={{ minHeight: 200 }}>
          <Timeline key={motion.replayKey} {...motion.props} items={SAMPLE_ITEMS} orientation={orientation} className="w-full" />
        </div>
      )}
    </AppWindowFrame>
  );

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const orientationAttr = orientation !== "vertical" ? ` orientation="${orientation}"` : "";
  const attrStr = orientationAttr + motion.attrs;

  const codeVariants: CodeBlockVariants = {
    react: `<Timeline${attrStr}
  items={[
${SAMPLE_ITEMS_CODE}
  ]}
/>`,
    js: `<l-Timeline id="timeline-demo"${attrStr}></l-Timeline>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("timeline-demo").items = [
${SAMPLE_ITEMS_CODE}
  ];
</script>`,
    vue: `<template>
  <l-Timeline :items="items"${attrStr} />
</template>

<script setup lang="ts">
const items = [
${SAMPLE_ITEMS_CODE}
];
</script>`,
    angular: `<l-Timeline [items]="items"${attrStr} />

items = [
${SAMPLE_ITEMS_CODE}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Orientation" options={ORIENTATIONS} value={orientation} onChange={setOrientation} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
