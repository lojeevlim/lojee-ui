import { useState } from "react";
import { Sidebar, type SidebarMenuItemSpec } from "../Sidebar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

// Reused across the "Variants"/"Colors"/"Collapsible" sections below — items generated from these
// automatically pick up whatever `color`/`variant`/`collapsed` the parent Sidebar itself gets.
const VARIANT_ITEMS: SidebarMenuItemSpec[] = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];

export default function SidebarShowcase() {
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Sidebar</h1>
          <p className="text-sm text-slate-500 mt-1">
            A vertical navigation panel — an app-shell shell for the rest of the library's nav content.
          </p>
        </div>

        <section>
          <SectionLabel sub="items is the data-driven shortcut for a simple nav list — label + icon rows with no active/href/onClick/disabled state (compose SidebarMenuItem directly instead when you need that).">
            Basic
          </SectionLabel>
          <div className="h-80 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar items={VARIANT_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>`,
              js: `<l-Sidebar id="basic-sidebar"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :items="items" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Leave `active` unset on every row (the common case) and Sidebar determines and manages it itself: a row's href is matched against the current URL on load/back-forward-navigation, and clicking any row updates it immediately — no router wiring or state needed. defaultActiveItem seeds which row starts active (Dashboard here) without touching the items themselves — purely an initial default, so clicking around afterward still works normally. onActiveItemChange reports the full item object whenever the active row changes, e.g. to sync it elsewhere.">
            Active item
          </SectionLabel>
          <div className="h-80 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar
              defaultActiveItem="Dashboard"
              onActiveItemChange={(item) => setActiveLabel(item.label)}
              items={[
                { label: "Dashboard", icon: "home", href: "/dashboard" },
                { label: "Projects", icon: "folder", href: "/projects" },
                { label: "Team", icon: "users", href: "/team" },
                { label: "Settings", icon: "settings", href: "/settings" },
              ]}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-slate-400">
            Active: <span className="text-slate-700">{activeLabel ?? "none yet — click a row"}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<Sidebar
  defaultActiveItem="Dashboard"
  onActiveItemChange={(item) => console.log(item)}
  items={[
    { label: "Dashboard", icon: "home", href: "/dashboard" },
    { label: "Projects", icon: "folder", href: "/projects" },
    { label: "Team", icon: "users", href: "/team" },
    { label: "Settings", icon: "settings", href: "/settings" },
  ]}
/>`,
              js: `<l-Sidebar id="active-item-sidebar" default-active-item="Dashboard"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  const sidebar = document.getElementById("active-item-sidebar");
  sidebar.items = [
    { label: "Dashboard", icon: "home", href: "/dashboard" },
    { label: "Projects", icon: "folder", href: "/projects" },
    { label: "Team", icon: "users", href: "/team" },
    { label: "Settings", icon: "settings", href: "/settings" },
  ];
  sidebar.addEventListener("activeitemchange", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-Sidebar default-active-item="Dashboard" :items="items" @activeitemchange="(e) => console.log(e.detail)" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", href: "/dashboard" },
  { label: "Projects", icon: "folder", href: "/projects" },
  { label: "Team", icon: "users", href: "/team" },
  { label: "Settings", icon: "settings", href: "/settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar default-active-item="Dashboard" [items]="items" (activeitemchange)="onActiveItemChange($event.detail)" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", href: "/dashboard" },
    { label: "Projects", icon: "folder", href: "/projects" },
    { label: "Team", icon: "users", href: "/team" },
    { label: "Settings", icon: "settings", href: "/settings" },
  ];
  onActiveItemChange(item: unknown) {
    console.log(item);
  }
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="header/headerIcon and footer are the data-driven shortcut for a workspace name pinned above the nav content and a user row pinned below it (compose SidebarHeader/SidebarFooter directly instead for custom markup like an avatar).">
            With header and footer
          </SectionLabel>
          <div className="h-96 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar header="Lojee Inc" headerIcon="zap" footer="Jordan Diaz" items={VARIANT_ITEMS} />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  header="Lojee Inc"
  headerIcon="zap"
  footer="Jordan Diaz"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>`,
              js: `<l-Sidebar id="header-footer-sidebar" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("header-footer-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" :items="items" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Mix { category, items } entries into items for labeled, collapsible section groups — click a heading to toggle it. Defaults open for the first group or one containing an active row; every other group starts closed.">
            Categories
          </SectionLabel>
          <div className="h-96 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar
              collapsible
              header="Lojee Inc"
              headerIcon="zap"
              footer="Jordan Diaz"
              items={[
                {
                  category: "Workspace",
                  items: [
                    { label: "Dashboard", icon: "home", active: true },
                    { label: "Projects", icon: "folder" },
                  ],
                },
                {
                  category: "Account",
                  items: [
                    { label: "Team", icon: "users" },
                    { label: "Settings", icon: "settings" },
                  ],
                },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  collapsible
  header="Lojee Inc"
  headerIcon="zap"
  footer="Jordan Diaz"
  items={[
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ]}
/>`,
              js: `<l-Sidebar id="categories-sidebar" collapsible="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("categories-sidebar").items = [
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :collapsible="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" :items="items" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  {
    category: "Workspace",
    items: [
      { label: "Dashboard", icon: "home", active: true },
      { label: "Projects", icon: "folder" },
    ],
  },
  {
    category: "Account",
    items: [
      { label: "Team", icon: "users" },
      { label: "Settings", icon: "settings" },
    ],
  },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [collapsible]="true" header="Lojee Inc" header-icon="zap" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    {
      category: "Workspace",
      items: [
        { label: "Dashboard", icon: "home", active: true },
        { label: "Projects", icon: "folder" },
      ],
    },
    {
      category: "Account",
      items: [
        { label: "Team", icon: "users" },
        { label: "Settings", icon: "settings" },
      ],
    },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={
              'Seven themes: "light" (default), "dark", "bordered"/"elevated"/"glass" (detached, ' +
              'floating panels), "minimal" (no chrome at all), and "gradient" (color-tinted).'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 overflow-hidden rounded-lg border border-slate-800">
              <Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar variant="bordered" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar variant="elevated" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 rounded-lg border border-dashed border-slate-300 bg-white p-4">
              <Sidebar variant="minimal" height="100%" className="h-full" header="Lojee Inc" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 overflow-hidden rounded-lg">
              <Sidebar variant="gradient" color="indigo" header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
            </div>
            <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar variant="glass" color="indigo" height="100%" className="h-full" header="Lojee Inc" footer="Jordan Diaz" items={VARIANT_ITEMS} />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  variant="dark"
  header="Lojee Inc"
  footer="Jordan Diaz"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ]}
/>

{/* Also available:
    variant="bordered" / "elevated" / "glass" — detached-panel looks (rounded corners, floats
      inside a page instead of docking to a screen edge). Their backdrop (padding + a neutral
      background) is built in, so no extra markup is needed — just give them a height, e.g.
      height="100%" inside a sized parent. "bordered" is a solid white panel with a color-tinted
      border (see \`color\`/\`borderWidth\`); "elevated" is the same solid white panel but
      shadow-only, no border; "glass" has no background color at all, just backdrop-blur-xl —
      needs something with real color/texture behind it to read.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a top-to-bottom gradient built from \`color\` (600 → 700). */}`,
              js: `<l-Sidebar id="variants-sidebar" variant="dark" header="Lojee Inc" footer="Jordan Diaz"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("variants-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>

<!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
     markup needed — just give them a height inside a sized parent, e.g. height="100%".
     "minimal" — no background/border at all, blends into the page. -->`,
              vue: `<template>
  <l-Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" :items="items" />

  <!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
       markup needed — just give them a height inside a sized parent, e.g. height="100%".
       "minimal" — no background/border at all, blends into the page. -->
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

// "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
// markup needed — just give them a height inside a sized parent, e.g. height="100%".
// "minimal" — no background/border at all, blends into the page.
@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar variant="dark" header="Lojee Inc" footer="Jordan Diaz" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` tints the built-in collapse toggle's hover state — items generated from it automatically pick up the same color for a coordinated look, nothing to pass per-row.">
            Colors
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar
                color="indigo"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar
                color="emerald"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar
                color="rose"
                collapsible
                header="Lojee Inc"
                items={[
                  { label: "Dashboard", icon: "home", active: true },
                  { label: "Projects", icon: "folder" },
                  { label: "Team", icon: "users" },
                ]}
              />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  color="indigo"
  collapsible
  header="Lojee Inc"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ]}
/>`,
              js: `<l-Sidebar id="colors-sidebar" color="indigo" collapsible="true" header="Lojee Inc"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("colors-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar color="indigo" :collapsible="true" header="Lojee Inc" :items="items" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar color="indigo" [collapsible]="true" header="Lojee Inc" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `collapsible` to show a built-in toggle button — Sidebar tracks its own collapsed state internally, so this works with no other props. header/headerIcon and each generated item already animate for the collapse/expand transition, nothing extra to wire up.">
            Collapsible
          </SectionLabel>
          <div className="h-80 w-fit overflow-hidden rounded-lg border border-slate-200">
            <Sidebar
              collapsible
              header="Lojee Inc"
              headerIcon="zap"
              items={[
                { label: "Dashboard", icon: "home", active: true },
                { label: "Projects", icon: "folder" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar
  collapsible
  header="Lojee Inc"
  headerIcon="zap"
  items={[
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ]}
/>

{/* Self-contained — no collapsed/onCollapsedChange needed. Pass those
    yourself only if something outside Sidebar also needs to drive/observe
    the collapsed state, e.g.:
    const [collapsed, setCollapsed] = useState(false);
    <Sidebar collapsible collapsed={collapsed} onCollapsedChange={setCollapsed} ... /> */}`,
              js: `<l-Sidebar id="app-sidebar" collapsible="true" header="Lojee Inc" header-icon="zap"></l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("app-sidebar").items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ];
</script>`,
              vue: `<template>
  <l-Sidebar :collapsible="true" header="Lojee Inc" header-icon="zap" :items="items" />
</template>

<script setup>
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-Sidebar [collapsible]="true" header="Lojee Inc" header-icon="zap" [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Dashboard", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
  ];
}`,
            }}
          />
        </section>

      </div>
    </div>
  );
}
