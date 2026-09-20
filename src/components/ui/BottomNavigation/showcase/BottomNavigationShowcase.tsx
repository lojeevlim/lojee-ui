import { BottomNavigation } from "../BottomNavigation";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function BottomNavigationShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">BottomNavigation</h1>
          <p className="text-sm text-slate-500 mt-1">A mobile-style bottom tab bar — icon and label per tab, active tab highlighted.</p>
        </div>

        <section>
          <SectionLabel sub="Rendered here inside a mock phone frame — the component itself is a normal flow element you position however you like.">
            Basic
          </SectionLabel>
          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-64 bg-slate-50" />
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
              js: `<BottomNavigation id="bottom-nav-basic" />

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
  <BottomNavigation :items="items" />
</template>

<script setup>
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
  template: \`<BottomNavigation [items]="items" />\`,
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
          <SectionLabel sub="A tab's `badge` renders as a small count pill on the icon's top-right corner.">With a badge</SectionLabel>
          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-64 bg-slate-50" />
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
              js: `<BottomNavigation id="bottom-nav-badge" />

<script type="module">
  document.getElementById("bottom-nav-badge").items = [
    { icon: "home", label: "Home", active: true },
    { icon: "search", label: "Search" },
    { icon: "bell", label: "Alerts", badge: "3" },
    { icon: "user", label: "Profile" },
  ];
</script>`,
              vue: `<template>
  <BottomNavigation :items="items" />
</template>

<script setup>
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
<BottomNavigation [items]="items" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
