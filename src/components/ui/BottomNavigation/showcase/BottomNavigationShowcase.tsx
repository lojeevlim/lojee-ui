import { useState } from "react";
import { BottomNavigation } from "../BottomNavigation";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const TAB_ITEMS = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "heart", label: "Saved" },
  { icon: "user", label: "Profile" },
];

const ITEMS_CODE = `[
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "heart", label: "Saved" },
  { icon: "user", label: "Profile" },
]`;

// Same snippet in every language, with one extra attribute on the bar.
const barCode = (id: string, attr: string) => ({
  react: `<BottomNavigation\n  ${attr}\n  items={${ITEMS_CODE.replace(/\n/g, "\n  ")}}\n/>`,
  js: `<l-BottomNavigation id="${id}" ${attr} />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("${id}").items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};
</script>`,
  vue: `<template>
  <l-BottomNavigation :items="items" ${attr} />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = ${ITEMS_CODE};
</script>`,
  angular: `<l-BottomNavigation [items]="items" ${attr}></l-BottomNavigation>

items = ${ITEMS_CODE};`,
});

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-border shadow-sm">
      <div className="h-32 bg-surface-muted" />
      {children}
    </div>
  );
}

export default function BottomNavigationShowcase() {
  const [lastActive, setLastActive] = useState("Home");

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">BottomNavigation</h1>
          <p className="text-sm text-fg-subtle mt-1">A mobile-style bottom tab bar — icon and label per tab, active tab highlighted.</p>
        </div>

        <section>
          <SectionLabel sub="Click any tab — the bar keeps track of the active one itself, like Sidebar and Navbar. Rendered inside a mock phone frame; the component itself is a normal flow element you position however you like.">
            Basic
          </SectionLabel>
          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="h-64 bg-surface-muted" />
            <BottomNavigation
              items={[
                { icon: "home", label: "Home", active: true },
                { icon: "search", label: "Search" },
                { icon: "heart", label: "Saved" },
                { icon: "user", label: "Profile" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<BottomNavigation
  items={[
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ]}
/>`,
              js: `<l-BottomNavigation id="bottom-nav-basic" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("bottom-nav-basic").items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ];
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "heart", label: "Saved" },
  { icon: "user", label: "Profile" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-BottomNavigation [items]="items" />\`,
})
export class AppComponent {
  items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="color takes any built-in color (including accent, which follows the theme) or a custom CSS color.">Colors</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            {(["accent", "emerald", "rose"] as const).map((c) => (
              <Phone key={c}>
                <BottomNavigation color={c} items={TAB_ITEMS} />
              </Phone>
            ))}
          </div>
          <CodeBlock variants={barCode("bottom-nav-color", 'color="emerald"')} />
        </section>

        <section>
          <SectionLabel sub={"variant draws the active tab as a solid fill, an outline or a soft tint — or \"text\", which highlights only the icon and label with no fill. Leave it out and it follows the theme's active-item style."}>
            Variants
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["solid", "outline", "soft", "text"] as const).map((v) => (
              <Phone key={v}>
                <BottomNavigation variant={v} items={TAB_ITEMS} />
              </Phone>
            ))}
          </div>
          <CodeBlock variants={barCode("bottom-nav-variant", 'variant="text"')} />
        </section>

        <section>
          <SectionLabel sub="onActiveItemChange fires with the whole item whenever the active tab changes — a click, or a URL / active-prop change.">
            Selection callback
          </SectionLabel>
          <Phone>
            <BottomNavigation items={TAB_ITEMS} onActiveItemChange={(item) => setLastActive(item.label)} />
          </Phone>
          <p className="mt-2 text-center text-sm text-fg-subtle">
            Active: <span className="font-medium text-fg">{lastActive}</span>
          </p>
          <CodeBlock
            variants={{
              react: `const [active, setActive] = useState("Home");

<BottomNavigation
  items={[/* ... */]}
  onActiveItemChange={(item) => setActive(item.label)}
/>`,
              js: `<l-BottomNavigation id="bottom-nav-callback"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  const bar = document.getElementById("bottom-nav-callback");
  bar.items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};
  bar.addEventListener("activeitemchange", (e) => {
    console.log("Active:", e.detail.label);
  });
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" @activeitemchange="onChange" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = ${ITEMS_CODE};

function onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
}
</script>`,
              angular: `<l-BottomNavigation [items]="items" (activeitemchange)="onChange($event)"></l-BottomNavigation>

items = ${ITEMS_CODE};

onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give a tab an href and it renders as a real link; the bar also matches the current URL on load and back/forward, so a routed app needs no extra wiring.">
            With links
          </SectionLabel>
          <CodeBlock
            variants={{
              react: `<BottomNavigation
  items={[
    { icon: "home", label: "Home", href: "/" },
    { icon: "search", label: "Search", href: "/search" },
    { icon: "user", label: "Profile", href: "/profile" },
  ]}
/>`,
              js: `<l-BottomNavigation id="bottom-nav-links"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("bottom-nav-links").items = [
    { icon: "home", label: "Home", href: "/" },
    { icon: "search", label: "Search", href: "/search" },
    { icon: "user", label: "Profile", href: "/profile" },
  ];
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { icon: "home", label: "Home", href: "/" },
  { icon: "search", label: "Search", href: "/search" },
  { icon: "user", label: "Profile", href: "/profile" },
];
</script>`,
              angular: `<l-BottomNavigation [items]="items"></l-BottomNavigation>

items = [
  { icon: "home", label: "Home", href: "/" },
  { icon: "search", label: "Search", href: "/search" },
  { icon: "user", label: "Profile", href: "/profile" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A tab's `badge` renders as a small count pill on the icon's top-right corner.">With a badge</SectionLabel>
          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-border shadow-sm">
            <div className="h-64 bg-surface-muted" />
            <BottomNavigation
              items={[
                { icon: "home", label: "Home", active: true },
                { icon: "search", label: "Search" },
                { icon: "bell", label: "Alerts", badge: "3" },
                { icon: "user", label: "Profile" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<BottomNavigation
  items={[
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Alerts", badge: "3" },
    { icon: "user", label: "Profile" },
  ]}
/>`,
              js: `<l-BottomNavigation id="bottom-nav-badge" />

<script type="module">
  document.getElementById("bottom-nav-badge").items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Alerts", badge: "3" },
    { icon: "user", label: "Profile" },
  ];
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" />
</template>

<script setup lang="ts">
const items = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Alerts", badge: "3" },
  { icon: "user", label: "Profile" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Alerts", badge: "3" },
  { icon: "user", label: "Profile" },
];

// app.component.html
<l-BottomNavigation [items]="items" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
