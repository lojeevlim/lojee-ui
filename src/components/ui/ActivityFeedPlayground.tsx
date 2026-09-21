import { useState } from "react";
import { ActivityFeed, type ActivityItem } from "./ActivityFeed/ActivityFeed";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

type BaseItem = Omit<ActivityItem, "icon" | "color">;

const BASE_ITEMS: BaseItem[] = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
];

const ICON_BY_INDEX: Record<number, { icon: string; color: ActivityItem["color"] }> = {
  0: { icon: "pencil", color: "indigo" },
  1: { icon: "circle-check", color: "emerald" },
  2: { icon: "user", color: "slate" },
};

export default function ActivityFeedPlayground() {
  const [compact, setCompact] = useState(false);
  const [showIcons, setShowIcons] = useState(true);

  const items: ActivityItem[] = BASE_ITEMS.map((item, i) => (showIcons ? { ...item, ...ICON_BY_INDEX[i] } : item));

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm rounded-lg border border-slate-200 p-2">
          <ActivityFeed items={items} compact={compact} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const itemsCode = items
    .map((item) => {
      const parts = [
        `actor: "${item.actor}"`,
        item.avatarInitials ? `avatarInitials: "${item.avatarInitials}"` : null,
        `action: "${item.action}"`,
        item.target ? `target: "${item.target}"` : null,
        `timestamp: "${item.timestamp}"`,
        item.icon ? `icon: "${item.icon}"` : null,
        item.color ? `color: "${item.color}"` : null,
      ]
        .filter(Boolean)
        .join(", ");
      return `    { ${parts} },`;
    })
    .join("\n");

  const compactAttr = compact ? " compact" : "";

  const codeVariants: CodeBlockVariants = {
    react: `<ActivityFeed${compactAttr}
  items={[
${itemsCode}
  ]}
/>`,
    js: `<l-ActivityFeed id="activity-feed-demo"${compactAttr}></l-ActivityFeed>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("activity-feed-demo").items = [
${itemsCode}
  ];
</script>`,
    vue: `<template>
  <l-ActivityFeed :items="items"${compactAttr} />
</template>

<script setup>
const items = [
${itemsCode}
];
</script>`,
    angular: `<l-ActivityFeed [items]="items"${compactAttr} />

items = [
${itemsCode}
];`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} />
        Compact
      </label>
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showIcons} onChange={(e) => setShowIcons(e.target.checked)} />
        Show icon badges
      </label>
    </PlaygroundLayout>
  );
}
