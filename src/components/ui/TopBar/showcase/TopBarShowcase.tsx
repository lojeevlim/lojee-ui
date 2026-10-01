import { useState } from "react";
import { TopBar, type TopBarAction } from "../TopBar";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const ACTIONS: TopBarAction[] = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
];

const ACTIONS_CODE = `[
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
]`;

// The same snippet in every language, with different attributes on the bar.
const barCode = (id: string, attr: string) => ({
  react: `<TopBar
  ${attr}
  actions={${ACTIONS_CODE.replace(/\n/g, "\n  ")}}
/>`,
  js: `<l-top-bar id="${id}" ${attr}></l-top-bar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("${id}").actions = ${ACTIONS_CODE.replace(/\n/g, "\n  ")};
</script>`,
  vue: `<template>
  <l-top-bar :actions="actions" ${attr} />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const actions = ${ACTIONS_CODE};
</script>`,
  angular: `<l-top-bar [actions]="actions" ${attr}></l-top-bar>

actions = ${ACTIONS_CODE};`,
});

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {children}
      <div className="h-20 bg-surface-muted/60" />
    </div>
  );
}

export default function TopBarShowcase() {
  const [lastAction, setLastAction] = useState("None yet");

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">TopBar</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            An app bar for the top of a screen or page: a title (with an optional back button), flexible center content, and a row of icon actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="A title and subtitle on the left, icon actions on the right. A badge puts a count on an action.">Basic</SectionLabel>
          <Frame>
            <TopBar title="Dashboard" subtitle="Last synced 2 min ago" actions={ACTIONS} />
          </Frame>
          <CodeBlock variants={barCode("top-bar-basic", 'title="Dashboard" subtitle="Last synced 2 min ago"')} />
        </section>

        <section>
          <SectionLabel sub={'Pass onBack to show a back arrow before the title. On the Web Component, set back="true" and listen for the "back" event.'}>Back button</SectionLabel>
          <Frame>
            <TopBar title="Order #1042" subtitle="Placed today" onBack={() => setLastAction("Back")} actions={ACTIONS.slice(1)} />
          </Frame>
          <CodeBlock
            variants={{
              react: `<TopBar
  title="Order #1042"
  subtitle="Placed today"
  onBack={() => navigate(-1)}
  actions={[{ icon: "bell", label: "Notifications", badge: "3" }]}
/>`,
              js: `<l-top-bar id="top-bar-back" title="Order #1042" subtitle="Placed today" back="true"></l-top-bar>

<script type="module">
  import "lojee-ui/elements";

  const bar = document.getElementById("top-bar-back");
  bar.actions = [{ icon: "bell", label: "Notifications", badge: "3" }];
  bar.addEventListener("back", () => history.back());
</script>`,
              vue: `<template>
  <l-top-bar title="Order #1042" subtitle="Placed today" back="true" :actions="actions" @back="router.back()" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
import { useRouter } from "vue-router";

const router = useRouter();
const actions = [{ icon: "bell", label: "Notifications", badge: "3" }];
</script>`,
              angular: `<l-top-bar title="Order #1042" subtitle="Placed today" back="true" [actions]="actions" (back)="location.back()"></l-top-bar>

actions = [{ icon: "bell", label: "Notifications", badge: "3" }];
constructor(private location: Location) {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Four looks: "light" (default), "elevated" (shadow, no border), "minimal" (blends into the page) and "accent" (a solid color background — the theme accent by default).'}>
            Variants
          </SectionLabel>
          <div className="space-y-4">
            {(["light", "elevated", "minimal", "accent"] as const).map((v) => (
              <div key={v}>
                <p className="mb-1.5 text-xs font-medium text-fg-subtle">variant=&quot;{v}&quot;</p>
                <Frame>
                  <TopBar variant={v} title="Dashboard" actions={ACTIONS} />
                </Frame>
              </div>
            ))}
          </div>
          <CodeBlock variants={barCode("top-bar-variant", 'variant="accent" title="Dashboard"')} />
        </section>

        <section>
          <SectionLabel sub="The accent variant follows the theme's accent color, so it changes with the accent picker. Pass color to pin a built-in color or any CSS color.">
            Colors
          </SectionLabel>
          <div className="space-y-3">
            {([undefined, "emerald", "rose", "amber"] as const).map((c) => (
              <TopBar key={c ?? "default"} variant="accent" color={c} title={c ? `color="${c}"` : "default (theme accent)"} actions={ACTIONS} className="rounded-lg" />
            ))}
          </div>
          <CodeBlock variants={barCode("top-bar-color", 'variant="accent" color="emerald" title="Dashboard"')} />
        </section>

        <section>
          <SectionLabel sub="The default slot (children) sits between the title and the actions — a search field, tabs, breadcrumbs. leading and trailing are free-form slots at the two ends.">
            Center content
          </SectionLabel>
          <Frame>
            <TopBar
              title="Lojee"
              leading={<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-600 text-sm font-bold text-white">L</span>}
              actions={ACTIONS.slice(1)}
              trailing={<Avatar initials="JD" size="sm" />}
            >
              <input
                type="search"
                placeholder="Search…"
                className="w-full max-w-md rounded-md border border-border-strong bg-surface-muted px-3 py-1.5 text-sm text-fg outline-none focus:ring-2 focus:ring-accent-500"
              />
            </TopBar>
          </Frame>
          <CodeBlock
            variants={{
              react: `<TopBar
  title="Lojee"
  leading={<Logo />}
  actions={[{ icon: "bell", label: "Notifications", badge: "3" }]}
  trailing={<Avatar initials="JD" size="sm" />}
>
  <input type="search" placeholder="Search…" />   {/* center content */}
</TopBar>`,
              js: `<l-top-bar title="Lojee">
  <span slot="leading"><!-- logo --></span>
  <input type="search" placeholder="Search…" />   <!-- center content: the default slot -->
  <span slot="trailing"><l-avatar initials="JD" size="sm"></l-avatar></span>
</l-top-bar>`,
              vue: `<template>
  <l-top-bar title="Lojee">
    <span slot="leading"><Logo /></span>
    <input type="search" placeholder="Search…" />
    <span slot="trailing"><l-avatar initials="JD" size="sm" /></span>
  </l-top-bar>
</template>`,
              angular: `<l-top-bar title="Lojee">
  <span slot="leading"><app-logo /></span>
  <input type="search" placeholder="Search…" />
  <span slot="trailing"><l-avatar initials="JD" size="sm"></l-avatar></span>
</l-top-bar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Built-in behavior, no wiring needed: `menu` adds a hamburger (onMenuClick), `back` goes back in the browser history when you give no onBack, and `search` adds a search button that opens a search field in the bar — Enter submits (onSearch), typing reports (onSearchChange), Escape closes it.">
            Built-in menu, back and search
          </SectionLabel>
          <Frame>
            <TopBar
              title="Library"
              menu
              search
              searchPlaceholder="Search components…"
              onMenuClick={() => setLastAction("Menu")}
              onSearch={(q) => setLastAction(`Search “${q}”`)}
              actions={ACTIONS.slice(1)}
            />
          </Frame>
          <p className="mt-2 text-sm text-fg-subtle">
            Last event: <span className="font-medium text-fg">{lastAction}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<TopBar
  title="Library"
  menu                                   // hamburger — or just pass onMenuClick
  onMenuClick={() => setSidebarOpen(true)}
  search                                 // built-in search button + field
  searchPlaceholder="Search components…"
  onSearch={(query) => runSearch(query)} // Enter
  onSearchChange={(query) => filter(query)}
  back                                   // no onBack → goes back in history
/>`,
              js: `<l-top-bar id="top-bar-builtin" title="Library" menu="true" search="true" search-placeholder="Search components…"></l-top-bar>

<script type="module">
  import "lojee-ui/elements";

  const bar = document.getElementById("top-bar-builtin");
  bar.addEventListener("menuclick", () => openSidebar());
  bar.addEventListener("search", (e) => runSearch(e.detail));        // Enter
  bar.addEventListener("searchchange", (e) => filter(e.detail));     // every keystroke
</script>`,
              vue: `<template>
  <l-top-bar
    title="Library"
    menu="true"
    search="true"
    search-placeholder="Search components…"
    @menuclick="sidebarOpen = true"
    @search="(e: CustomEvent) => runSearch(e.detail)"
  />
</template>`,
              angular: `<l-top-bar
  title="Library"
  menu="true"
  search="true"
  search-placeholder="Search components…"
  (menuclick)="sidebarOpen = true"
  (search)="runSearch($event.detail)"
></l-top-bar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="onActionClick fires with the pressed action (an `actionclick` event on the Web Component). An action with an href renders as a link.">
            Action callback
          </SectionLabel>
          <Frame>
            <TopBar title="Inbox" actions={ACTIONS} onActionClick={(action) => setLastAction(action.label)} />
          </Frame>
          <p className="mt-2 text-sm text-fg-subtle">
            Last action: <span className="font-medium text-fg">{lastAction}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<TopBar
  title="Inbox"
  actions={[
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Notifications", badge: "3" },
  ]}
  onActionClick={(action, index) => console.log(action.label, index)}
/>`,
              js: `<l-top-bar id="top-bar-actions" title="Inbox"></l-top-bar>

<script type="module">
  import "lojee-ui/elements";

  const bar = document.getElementById("top-bar-actions");
  bar.actions = [
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Notifications", badge: "3" },
  ];
  bar.addEventListener("actionclick", (e) => console.log(e.detail.label));
</script>`,
              vue: `<template>
  <l-top-bar title="Inbox" :actions="actions" @actionclick="onAction" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const actions = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
];

function onAction(e: CustomEvent) {
  console.log(e.detail.label);
}
</script>`,
              angular: `<l-top-bar title="Inbox" [actions]="actions" (actionclick)="onAction($event)"></l-top-bar>

actions = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
];

onAction(e: CustomEvent) {
  console.log(e.detail.label);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Fade" actions={ACTIONS} transition="fade" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Slide down" actions={ACTIONS} transition="slide-down" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Slide right" actions={ACTIONS} transition="slide-right" transitionDelay={100} /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Zoom" actions={ACTIONS} transition="zoom" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Blur" actions={ACTIONS} transition="blur" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Drop" actions={ACTIONS} transition="drop" transitionDuration={700} /></div>
          </div>
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Scale" actions={ACTIONS} hoverEffect="scale" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Ring" actions={ACTIONS} hoverEffect="ring" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><TopBar title="Glow" actions={ACTIONS} hoverEffect="glow" /></div>
          </div>
          <CodeBlock
            variants={{
              react: `const actions = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
];

<TopBar title="Fade" actions={actions} transition="fade" />
<TopBar title="Slide down" actions={actions} transition="slide-down" />
<TopBar title="Slide right" actions={actions} transition="slide-right" transitionDelay={100} />
<TopBar title="Zoom" actions={actions} transition="zoom" />
<TopBar title="Blur" actions={actions} transition="blur" />
<TopBar title="Drop" actions={actions} transition="drop" transitionDuration={700} />

<TopBar title="Scale" actions={actions} hoverEffect="scale" />
<TopBar title="Ring" actions={actions} hoverEffect="ring" />
<TopBar title="Glow" actions={actions} hoverEffect="glow" />`,
              js: `<l-top-bar class="transition-demo" title="Fade" transition="fade"></l-top-bar>
<l-top-bar class="transition-demo" title="Slide down" transition="slide-down"></l-top-bar>
<l-top-bar class="transition-demo" title="Slide right" transition="slide-right" transitionDelay="100"></l-top-bar>
<l-top-bar class="transition-demo" title="Zoom" transition="zoom"></l-top-bar>
<l-top-bar class="transition-demo" title="Blur" transition="blur"></l-top-bar>
<l-top-bar class="transition-demo" title="Drop" transition="drop" transitionDuration="700"></l-top-bar>

<l-top-bar class="transition-demo" title="Scale" hoverEffect="scale"></l-top-bar>
<l-top-bar class="transition-demo" title="Ring" hoverEffect="ring"></l-top-bar>
<l-top-bar class="transition-demo" title="Glow" hoverEffect="glow"></l-top-bar>

<script type="module">
  import "lojee-ui/elements";

  const actions = [
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Notifications", badge: "3" },
    { icon: "settings", label: "Settings" },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.actions = actions));
</script>`,
              vue: `<template>
  <l-top-bar :actions="actions" title="Fade" transition="fade"></l-top-bar>
  <l-top-bar :actions="actions" title="Slide down" transition="slide-down"></l-top-bar>
  <l-top-bar :actions="actions" title="Slide right" transition="slide-right" transitionDelay="100"></l-top-bar>
  <l-top-bar :actions="actions" title="Zoom" transition="zoom"></l-top-bar>
  <l-top-bar :actions="actions" title="Blur" transition="blur"></l-top-bar>
  <l-top-bar :actions="actions" title="Drop" transition="drop" transitionDuration="700"></l-top-bar>

  <l-top-bar :actions="actions" title="Scale" hoverEffect="scale"></l-top-bar>
  <l-top-bar :actions="actions" title="Ring" hoverEffect="ring"></l-top-bar>
  <l-top-bar :actions="actions" title="Glow" hoverEffect="glow"></l-top-bar>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const actions = [
  { icon: "search", label: "Search" },
  { icon: "bell", label: "Notifications", badge: "3" },
  { icon: "settings", label: "Settings" },
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
    <l-top-bar [actions]="actions" title="Fade" transition="fade"></l-top-bar>
    <l-top-bar [actions]="actions" title="Slide down" transition="slide-down"></l-top-bar>
    <l-top-bar [actions]="actions" title="Slide right" transition="slide-right" transitionDelay="100"></l-top-bar>
    <l-top-bar [actions]="actions" title="Zoom" transition="zoom"></l-top-bar>
    <l-top-bar [actions]="actions" title="Blur" transition="blur"></l-top-bar>
    <l-top-bar [actions]="actions" title="Drop" transition="drop" transitionDuration="700"></l-top-bar>

    <l-top-bar [actions]="actions" title="Scale" hoverEffect="scale"></l-top-bar>
    <l-top-bar [actions]="actions" title="Ring" hoverEffect="ring"></l-top-bar>
    <l-top-bar [actions]="actions" title="Glow" hoverEffect="glow"></l-top-bar>
  \`,
})
export class AppComponent {
  actions = [
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Notifications", badge: "3" },
    { icon: "settings", label: "Settings" },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
