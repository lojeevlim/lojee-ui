import { useState } from "react";
import { BottomNavigation } from "../BottomNavigation";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

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
  js: `<l-BottomNavigation id="${id}" ${attr}></l-BottomNavigation>

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

// A mock phone: the same size as the Basic example (320px wide, 256px of page above the bar). `mx-auto` centers a lone one.
function Phone({ children, className = "", fluid = false }: { children: React.ReactNode; className?: string; fluid?: boolean }) {
  return (
    <div className={`${fluid ? "w-full min-w-0" : "w-80 max-w-full"} overflow-hidden rounded-2xl border border-border shadow-sm ${className}`}>
      <div className={`${fluid ? "h-24" : "h-64"} bg-surface-muted`} />
      {children}
    </div>
  );
}

// Several phones side by side in one row; wraps on narrow screens.
function PhoneRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-start justify-center gap-4">{children}</div>;
}

export default function BottomNavigationShowcase() {
  const [lastActive, setLastActive] = useState("Home");
  const [lastClick, setLastClick] = useState("—");

  return (
    <div>
      <div className="space-y-12">
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
              js: `<l-BottomNavigation id="bottom-nav-basic"></l-BottomNavigation>

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
          {/* One row of phones, each exactly the size of the Basic example (w-80 = max-w-xs, 256px page area); wraps on narrow screens. */}
          <PhoneRow>
            {(["accent", "emerald", "rose"] as const).map((c) => (
              <Phone key={c}>
                <BottomNavigation color={c} items={TAB_ITEMS} />
              </Phone>
            ))}
          </PhoneRow>
          <CodeBlock variants={barCode("bottom-nav-color", 'color="emerald"')} />
        </section>

        <section>
          <SectionLabel sub={"variant draws the active tab as a solid fill, an outline or a soft tint — or \"text\", which highlights only the icon and label with no fill. Leave it out and it follows the theme's active-item style."}>
            Variants
          </SectionLabel>
          <PhoneRow>
            {(["solid", "outline", "soft", "text"] as const).map((v) => (
              <div key={v}>
                <p className="mb-1.5 font-mono text-xs text-fg-subtle">{v}</p>
                <Phone>
                  <BottomNavigation variant={v} items={TAB_ITEMS} />
                </Phone>
              </div>
            ))}
          </PhoneRow>
          <CodeBlock variants={barCode("bottom-nav-variant", 'variant="text"')} />
        </section>

        <section>
          <SectionLabel sub="onActiveItemChange fires with the whole item whenever the active tab changes — a click, or a URL / active-prop change. onItemClick fires on every tab click (even on the active one) and onFabClick on the floating button; on the web component they are the activeitemchange, itemclick and fabclick events.">
            Selection callback
          </SectionLabel>
          <Phone className="mx-auto">
            <BottomNavigation
              items={TAB_ITEMS}
              onActiveItemChange={(item) => setLastActive(item.label)}
              onItemClick={(item) => setLastClick(item.label)}
            />
          </Phone>
          <p className="mt-2 text-center text-sm text-fg-subtle">
            Active: <span className="font-medium text-fg">{lastActive}</span> · Last click: <span className="font-medium text-fg">{lastClick}</span>
          </p>
          <CodeBlock
            variants={{
              react: `const [active, setActive] = useState("Home");

<BottomNavigation
  items={[/* ... */]}
  onActiveItemChange={(item) => setActive(item.label)}  // the active tab changed
  onItemClick={(item, index) => console.log("clicked", item.label, index)}  // every tab click
  onFabClick={() => console.log("floating button")}  // with fabIcon
/>`,
              js: `<l-BottomNavigation id="bottom-nav-callback"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  const bar = document.getElementById("bottom-nav-callback");
  bar.items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};
  bar.addEventListener("activeitemchange", (e) => console.log("Active:", e.detail.label));
  bar.addEventListener("itemclick", (e) => console.log("Clicked:", e.detail.label)); // every click
  bar.addEventListener("fabclick", () => console.log("Floating button")); // with fabIcon
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
          <SectionLabel sub="iconOnly hides the labels and shows just the icons (each tab keeps its label as its accessible name and tooltip).">Icon only</SectionLabel>
          <Phone className="mx-auto">
            <BottomNavigation
              iconOnly
              items={[
                { icon: "home", label: "Home", active: true },
                { icon: "search", label: "Search" },
                { icon: "heart", label: "Saved" },
                { icon: "user", label: "Profile" },
              ]}
            />
          </Phone>
          <CodeBlock
            variants={{
              react: `<BottomNavigation
  iconOnly
  items={[
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ]}
/>`,
              js: `<l-BottomNavigation id="icon-nav" iconOnly="true"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("icon-nav").items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ];
</script>`,
              vue: `<l-BottomNavigation :items="items" iconOnly="true" />`,
              angular: `<l-BottomNavigation [items]="items" iconOnly="true" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="fabIcon adds a floating action button raised above the middle of the bar and splits the tabs around it. The button sits in a notch cut into the bar. The icon is configurable, the button takes the bar's color (the theme accent by default), and onFabClick (the fabclick event) fires when it is pressed.">Floating button</SectionLabel>
          {/* The bar overlays the page (absolute at the bottom of a page-colored frame), so the notch shows the page through it. */}
          <div className="relative mx-auto h-80 w-80 max-w-full overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-sm">
            <div className="absolute inset-x-0 bottom-0">
              <BottomNavigation
                fabIcon="plus"
                fabLabel="Add"
                items={[
                  { icon: "home", label: "Home", active: true },
                  { icon: "calendar", label: "Events" },
                  { icon: "message-circle", label: "Chat" },
                  { icon: "user", label: "Profile" },
                ]}
              />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<BottomNavigation
  fabIcon="plus"
  fabLabel="Add"
  onFabClick={() => console.log("add")}
  items={[
    { icon: "home", label: "Home", active: true },
    { icon: "calendar", label: "Events" },
    { icon: "message-circle", label: "Chat" },
    { icon: "user", label: "Profile" },
  ]}
/>`,
              js: `<l-BottomNavigation id="fab-nav" fabIcon="plus" fabLabel="Add"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  const nav = document.getElementById("fab-nav");
  nav.items = [
    { icon: "home", label: "Home", active: true },
    { icon: "calendar", label: "Events" },
    { icon: "message-circle", label: "Chat" },
    { icon: "user", label: "Profile" },
  ];
  nav.addEventListener("fabclick", () => console.log("add"));
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" fabIcon="plus" fabLabel="Add" @fabclick="onAdd" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { icon: "home", label: "Home", active: true },
  { icon: "calendar", label: "Events" },
  { icon: "message-circle", label: "Chat" },
  { icon: "user", label: "Profile" },
];
const onAdd = () => console.log("add");
</script>`,
              angular: `<l-BottomNavigation [items]="items" fabIcon="plus" fabLabel="Add" (fabclick)="onAdd()"></l-BottomNavigation>

items = [
  { icon: "home", label: "Home", active: true },
  { icon: "calendar", label: "Events" },
  { icon: "message-circle", label: "Chat" },
  { icon: "user", label: "Profile" },
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
              js: `<l-BottomNavigation id="bottom-nav-badge"></l-BottomNavigation>

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

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          {/* Six enter transitions and three hover effects, in a grid of compact phones — 3 across on wide screens, 2 then 1 as it narrows. */}
          <div>
            <TransitionPreview gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="fade" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="slide-down" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="slide-right" transitionDelay={100} /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="zoom" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="blur" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} transition="drop" transitionDuration={700} /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} hoverEffect="lift" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} hoverEffect="glow" /></Phone>
              <Phone fluid><BottomNavigation items={TAB_ITEMS} hoverEffect="shine" /></Phone>
            </TransitionPreview>
          </div>
          <CodeBlock
            variants={{
              react: `const items = [
  { icon: "home", label: "Home", active: true },
  { icon: "search", label: "Search" },
  { icon: "heart", label: "Saved" },
  { icon: "user", label: "Profile" },
];

<BottomNavigation items={items} transition="fade" />
<BottomNavigation items={items} transition="slide-down" />
<BottomNavigation items={items} transition="slide-right" transitionDelay={100} />
<BottomNavigation items={items} transition="zoom" />
<BottomNavigation items={items} transition="blur" />
<BottomNavigation items={items} transition="drop" transitionDuration={700} />

<BottomNavigation items={items} hoverEffect="lift" />
<BottomNavigation items={items} hoverEffect="glow" />
<BottomNavigation items={items} hoverEffect="shine" />`,
              js: `<l-BottomNavigation class="transition-demo" transition="fade"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" transition="slide-down"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" transition="slide-right" transitionDelay="100"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" transition="zoom"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" transition="blur"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" transition="drop" transitionDuration="700"></l-BottomNavigation>

<l-BottomNavigation class="transition-demo" hoverEffect="lift"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" hoverEffect="glow"></l-BottomNavigation>
<l-BottomNavigation class="transition-demo" hoverEffect="shine"></l-BottomNavigation>

<script type="module">
  import "lojee-ui/elements";

  const items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "heart", label: "Saved" },
    { icon: "user", label: "Profile" },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-BottomNavigation :items="items" transition="fade"></l-BottomNavigation>
  <l-BottomNavigation :items="items" transition="slide-down"></l-BottomNavigation>
  <l-BottomNavigation :items="items" transition="slide-right" transitionDelay="100"></l-BottomNavigation>
  <l-BottomNavigation :items="items" transition="zoom"></l-BottomNavigation>
  <l-BottomNavigation :items="items" transition="blur"></l-BottomNavigation>
  <l-BottomNavigation :items="items" transition="drop" transitionDuration="700"></l-BottomNavigation>

  <l-BottomNavigation :items="items" hoverEffect="lift"></l-BottomNavigation>
  <l-BottomNavigation :items="items" hoverEffect="glow"></l-BottomNavigation>
  <l-BottomNavigation :items="items" hoverEffect="shine"></l-BottomNavigation>
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
  template: \`
    <l-BottomNavigation [items]="items" transition="fade"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" transition="slide-down"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" transition="slide-right" transitionDelay="100"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" transition="zoom"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" transition="blur"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" transition="drop" transitionDuration="700"></l-BottomNavigation>

    <l-BottomNavigation [items]="items" hoverEffect="lift"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" hoverEffect="glow"></l-BottomNavigation>
    <l-BottomNavigation [items]="items" hoverEffect="shine"></l-BottomNavigation>
  \`,
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
      </div>
    </div>
  );
}
