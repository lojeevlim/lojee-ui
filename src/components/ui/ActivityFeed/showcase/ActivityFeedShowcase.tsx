import { ActivityFeed } from "../ActivityFeed";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const BASIC_ITEMS = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  {
    actor: "Priya Nair",
    avatarInitials: "PN",
    action: "assigned Jordan Diaz to",
    target: "the Landing Page Redesign",
    timestamp: "6h ago",
  },
  { actor: "Alex Chen", avatarInitials: "AC", action: "joined the team", timestamp: "1d ago" },
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "uploaded a file to", target: "Brand Assets", timestamp: "1d ago" },
];

const BASIC_ITEMS_CODE = `  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "assigned Jordan Diaz to", target: "the Landing Page Redesign", timestamp: "6h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "joined the team", timestamp: "1d ago" },
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "uploaded a file to", target: "Brand Assets", timestamp: "1d ago" },`;

const ICON_ITEMS = [
  {
    actor: "Jordan Diaz",
    avatarInitials: "JD",
    action: "commented on",
    target: "Q3 Report",
    timestamp: "2h ago",
    icon: "pencil",
    color: "accent" as const,
  },
  {
    actor: "Alex Chen",
    avatarInitials: "AC",
    action: "closed",
    target: "Bug #482",
    timestamp: "4h ago",
    icon: "circle-check",
    color: "emerald" as const,
  },
  {
    actor: "Priya Nair",
    avatarInitials: "PN",
    action: "assigned Jordan Diaz to",
    target: "the Landing Page Redesign",
    timestamp: "6h ago",
    icon: "tag",
    color: "amber" as const,
  },
  {
    actor: "Alex Chen",
    avatarInitials: "AC",
    action: "joined the team",
    timestamp: "1d ago",
    icon: "user",
    color: "slate" as const,
  },
  {
    actor: "Jordan Diaz",
    avatarInitials: "JD",
    action: "uploaded a file to",
    target: "Brand Assets",
    timestamp: "1d ago",
    icon: "upload",
    color: "blue" as const,
  },
];

const ICON_ITEMS_CODE = `  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago", icon: "pencil", color: "accent" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago", icon: "circle-check", color: "emerald" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "assigned Jordan Diaz to", target: "the Landing Page Redesign", timestamp: "6h ago", icon: "tag", color: "amber" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "joined the team", timestamp: "1d ago", icon: "user", color: "slate" },
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "uploaded a file to", target: "Brand Assets", timestamp: "1d ago", icon: "upload", color: "blue" },`;

const TR_ITEMS = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
];

export default function ActivityFeedShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Activity Feed</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A vertical feed of "who did what" activity entries — an avatar, a sentence, and a timestamp.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each entry pairs an avatar with a short sentence and a relative timestamp.">Basic</SectionLabel>
          <div className="max-w-lg rounded-lg border border-border p-2">
            <ActivityFeed items={BASIC_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<ActivityFeed
  items={[
${BASIC_ITEMS_CODE}
  ]}
/>`,
              js: `<l-ActivityFeed id="activity-feed-basic" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("activity-feed-basic").items = [
${BASIC_ITEMS_CODE}
  ];
</script>`,
              vue: `<template>
  <l-ActivityFeed :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
${BASIC_ITEMS_CODE}
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-ActivityFeed [items]="items" />\`,
})
export class AppComponent {
  items = [
${BASIC_ITEMS_CODE}
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A small colored icon badge on the avatar's corner — useful to signal the kind of action at a glance.">
            With icon badges
          </SectionLabel>
          <div className="max-w-lg rounded-lg border border-border p-2">
            <ActivityFeed items={ICON_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<ActivityFeed
  items={[
${ICON_ITEMS_CODE}
  ]}
/>`,
              js: `<l-ActivityFeed id="activity-feed-icons" />

<script type="module">
  document.getElementById("activity-feed-icons").items = [
${ICON_ITEMS_CODE}
  ];
</script>`,
              vue: `<template>
  <l-ActivityFeed :items="items" />
</template>

<script setup lang="ts">
const items = [
${ICON_ITEMS_CODE}
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
${ICON_ITEMS_CODE}
];

// app.component.html
<l-ActivityFeed [items]="items" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set compact for tighter spacing and smaller avatars — handy in a sidebar or narrow panel.">
            Compact
          </SectionLabel>
          <div className="max-w-sm rounded-lg border border-border p-2">
            <ActivityFeed items={ICON_ITEMS} compact />
          </div>
          <CodeBlock
            variants={{
              react: `<ActivityFeed
  compact
  items={[
${ICON_ITEMS_CODE}
  ]}
/>`,
              js: `<l-ActivityFeed id="activity-feed-compact" compact></l-ActivityFeed>

<script type="module">
  document.getElementById("activity-feed-compact").items = [
${ICON_ITEMS_CODE}
  ];
</script>`,
              vue: `<template>
  <l-ActivityFeed :items="items" compact />
</template>

<script setup lang="ts">
const items = [
${ICON_ITEMS_CODE}
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
${ICON_ITEMS_CODE}
];

// app.component.html
<l-ActivityFeed [items]="items" compact />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <ActivityFeed items={TR_ITEMS} transition="fade" />
            <ActivityFeed items={TR_ITEMS} transition="slide-up" />
            <ActivityFeed items={TR_ITEMS} transition="slide-right" transitionDelay={100} />
            <ActivityFeed items={TR_ITEMS} transition="zoom" />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `const items = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
];

<ActivityFeed items={items} transition="fade" />
<ActivityFeed items={items} transition="slide-up" />
<ActivityFeed items={items} transition="slide-right" transitionDelay={100} />
<ActivityFeed items={items} transition="drop" transitionDuration={700} />`,
              js: `<l-ActivityFeed transition="fade"></l-ActivityFeed>
<l-ActivityFeed transition="slide-up"></l-ActivityFeed>
<l-ActivityFeed transition="slide-right" transitionDelay="100"></l-ActivityFeed>
<l-ActivityFeed transition="drop" transitionDuration="700"></l-ActivityFeed>

<script type="module">
  import "lojee-ui/elements";

  const items = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
];
  document.querySelectorAll("l-ActivityFeed").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-ActivityFeed :items="items" transition="fade"></l-ActivityFeed>
  <l-ActivityFeed :items="items" transition="slide-up"></l-ActivityFeed>
  <l-ActivityFeed :items="items" transition="slide-right" transitionDelay="100"></l-ActivityFeed>
  <l-ActivityFeed :items="items" transition="drop" transitionDuration="700"></l-ActivityFeed>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
  { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
  { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-ActivityFeed [items]="items" transition="fade"></l-ActivityFeed>
    <l-ActivityFeed [items]="items" transition="slide-up"></l-ActivityFeed>
    <l-ActivityFeed [items]="items" transition="slide-right" transitionDelay="100"></l-ActivityFeed>
    <l-ActivityFeed [items]="items" transition="drop" transitionDuration="700"></l-ActivityFeed>
  \`,
})
export class AppComponent {
  items = [
    { actor: "Jordan Diaz", avatarInitials: "JD", action: "commented on", target: "Q3 Report", timestamp: "2h ago" },
    { actor: "Alex Chen", avatarInitials: "AC", action: "closed", target: "Bug #482", timestamp: "4h ago" },
    { actor: "Priya Nair", avatarInitials: "PN", action: "joined the team", timestamp: "6h ago" },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
