import { useState } from "react";
import { NavigationMenu } from "../NavigationMenu";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const CALLBACK_LABELS = ["Home", "Products", "Pricing"] as const;

export default function NavigationMenuShowcase() {
  const [lastChanged, setLastChanged] = useState("None yet");
  const [activeCallbackIndex, setActiveCallbackIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">NavigationMenu</h1>
          <p className="text-sm text-slate-500 mt-1">A data-driven row of top-level site nav links with an active-item indicator.</p>
        </div>

        <section>
          <SectionLabel sub="A horizontal row of links, one marked active.">Basic</SectionLabel>
          <NavigationMenu
            items={[
              { label: "Home", href: "#", active: true },
              { label: "Products", href: "#" },
              { label: "Pricing", href: "#" },
              { label: "About", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<NavigationMenu
  items={[
    { label: "Home", href: "#", active: true },
    { label: "Products", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ]}
/>`,
              js: `<l-NavigationMenu id="nav-menu-basic" />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("nav-menu-basic").items = [
    { label: "Home", href: "#", active: true },
    { label: "Products", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<l-NavigationMenu [items]="items" />\`,
})
export class AppComponent {
  items = [
    { label: "Home", href: "#", active: true },
    { label: "Products", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'Set orientation="vertical" for a stacked sidebar-style list.'}>Vertical orientation</SectionLabel>
          <div className="max-w-[200px]">
            <NavigationMenu
              orientation="vertical"
              items={[
                { label: "Overview", href: "#", active: true },
                { label: "Analytics", href: "#" },
                { label: "Reports", href: "#" },
                { label: "Settings", href: "#" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<NavigationMenu
  orientation="vertical"
  items={[
    { label: "Overview", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Reports", href: "#" },
    { label: "Settings", href: "#" },
  ]}
/>`,
              js: `<l-NavigationMenu id="nav-menu-vertical" orientation="vertical" />

<script type="module">
  document.getElementById("nav-menu-vertical").items = [
    { label: "Overview", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Reports", href: "#" },
    { label: "Settings", href: "#" },
  ];
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" orientation="vertical" />
</template>

<script setup lang="ts">
const items = [
  { label: "Overview", href: "#", active: true },
  { label: "Analytics", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { label: "Overview", href: "#", active: true },
  { label: "Analytics", href: "#" },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];

// app.component.html
<l-NavigationMenu [items]="items" orientation="vertical" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Each item can carry an icon, rendered before the label.">With icons</SectionLabel>
          <NavigationMenu
            items={[
              { label: "Home", href: "#", icon: "home", active: true },
              { label: "Search", href: "#", icon: "search" },
              { label: "Notifications", href: "#", icon: "bell" },
              { label: "Profile", href: "#", icon: "user" },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<NavigationMenu
  items={[
    { label: "Home", href: "#", icon: "home", active: true },
    { label: "Search", href: "#", icon: "search" },
    { label: "Notifications", href: "#", icon: "bell" },
    { label: "Profile", href: "#", icon: "user" },
  ]}
/>`,
              js: `<l-NavigationMenu id="nav-menu-icons" />

<script type="module">
  document.getElementById("nav-menu-icons").items = [
    { label: "Home", href: "#", icon: "home", active: true },
    { label: "Search", href: "#", icon: "search" },
    { label: "Notifications", href: "#", icon: "bell" },
    { label: "Profile", href: "#", icon: "user" },
  ];
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" />
</template>

<script setup lang="ts">
const items = [
  { label: "Home", href: "#", icon: "home", active: true },
  { label: "Search", href: "#", icon: "search" },
  { label: "Notifications", href: "#", icon: "bell" },
  { label: "Profile", href: "#", icon: "user" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { label: "Home", href: "#", icon: "home", active: true },
  { label: "Search", href: "#", icon: "search" },
  { label: "Notifications", href: "#", icon: "bell" },
  { label: "Profile", href: "#", icon: "user" },
];

// app.component.html
<l-NavigationMenu [items]="items" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="onChange fires with the clicked item's index and data — useful even for a plain link list, e.g. to sync analytics or a route-driven `active` flag.">
            Selection callback
          </SectionLabel>
          <NavigationMenu
            items={CALLBACK_LABELS.map((label, i) => ({ label, href: "#", active: i === activeCallbackIndex }))}
            onChange={(index, item) => {
              setActiveCallbackIndex(index);
              setLastChanged(item.label);
            }}
          />
          <p className="mt-2 text-sm text-slate-500">
            Last changed: <span className="font-medium text-slate-900">{lastChanged}</span>
          </p>
          <CodeBlock
            variants={{
              react: `const [activeIndex, setActiveIndex] = useState(0);
const labels = ["Home", "Products", "Pricing"];

<NavigationMenu
  items={labels.map((label, i) => ({ label, href: "#", active: i === activeIndex }))}
  onChange={(index) => setActiveIndex(index)}
/>

{/* The active pill animates smoothly between items — real navigation
    (a route change re-rendering with a new \`active\` flag) triggers it too. */}`,
              js: `<l-NavigationMenu id="nav-menu-callback" />

<script type="module">
  import "lojee-ui/elements";

  const menu = document.getElementById("nav-menu-callback");
  menu.items = [
    { label: "Home", href: "#", active: true },
    { label: "Products", href: "#" },
    { label: "Pricing", href: "#" },
  ];
  menu.addEventListener("change", (e) => {
    console.log("Selected index:", e.detail);
  });
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" @change="onChange" />
</template>

<script setup lang="ts">
const items = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
];

function onChange(index) {
  console.log("Selected index:", index);
}
</script>`,
              angular: `<l-NavigationMenu [items]="items" (change)="onChange($event)"></l-NavigationMenu>

items = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
];

onChange(index: number) {
  console.log("Selected index:", index);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="When items carry `content`, NavigationMenu manages the active item itself — like Tabs, but with a nav-style look. Handy for a settings page.">
            Paired with content
          </SectionLabel>
          <NavigationMenu
            orientation="vertical"
            items={[
              {
                label: "Profile",
                icon: "user",
                content: (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-900">Profile</p>
                    <p className="mt-1 text-sm text-slate-500">Update your name, photo, and public details.</p>
                  </div>
                ),
              },
              {
                label: "Notifications",
                icon: "bell",
                content: (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-900">Notifications</p>
                    <p className="mt-1 text-sm text-slate-500">Choose which emails and alerts you receive.</p>
                  </div>
                ),
              },
              {
                label: "Security",
                icon: "lock",
                content: (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-900">Security</p>
                    <p className="mt-1 text-sm text-slate-500">Manage your password and two-factor authentication.</p>
                  </div>
                ),
              },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<NavigationMenu
  orientation="vertical"
  items={[
    { label: "Profile", icon: "user", content: <ProfilePanel /> },
    { label: "Notifications", icon: "bell", content: <NotificationsPanel /> },
    { label: "Security", icon: "lock", content: <SecurityPanel /> },
  ]}
/>`,
              js: `<l-NavigationMenu id="settings-nav" orientation="vertical"></l-NavigationMenu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("settings-nav").items = [
    { label: "Profile", icon: "user", content: "Update your name, photo, and public details." },
    { label: "Notifications", icon: "bell", content: "Choose which emails and alerts you receive." },
    { label: "Security", icon: "lock", content: "Manage your password and two-factor authentication." },
  ];
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" orientation="vertical" />
</template>

<script setup lang="ts">
const items = [
  { label: "Profile", icon: "user", content: "Update your name, photo, and public details." },
  { label: "Notifications", icon: "bell", content: "Choose which emails and alerts you receive." },
  { label: "Security", icon: "lock", content: "Manage your password and two-factor authentication." },
];
</script>`,
              angular: `<l-NavigationMenu [items]="items" orientation="vertical"></l-NavigationMenu>

items = [
  { label: "Profile", icon: "user", content: "Update your name, photo, and public details." },
  { label: "Notifications", icon: "bell", content: "Choose which emails and alerts you receive." },
  { label: "Security", icon: "lock", content: "Manage your password and two-factor authentication." },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An item can be disabled and is skipped over visually.">Disabled item</SectionLabel>
          <NavigationMenu
            items={[
              { label: "Dashboard", href: "#", active: true },
              { label: "Billing", href: "#", disabled: true },
              { label: "Team", href: "#" },
              { label: "Settings", href: "#" },
            ]}
          />
          <CodeBlock
            variants={{
              react: `<NavigationMenu
  items={[
    { label: "Dashboard", href: "#", active: true },
    { label: "Billing", href: "#", disabled: true },
    { label: "Team", href: "#" },
    { label: "Settings", href: "#" },
  ]}
/>`,
              js: `<l-NavigationMenu id="nav-menu-disabled" />

<script type="module">
  document.getElementById("nav-menu-disabled").items = [
    { label: "Dashboard", href: "#", active: true },
    { label: "Billing", href: "#", disabled: true },
    { label: "Team", href: "#" },
    { label: "Settings", href: "#" },
  ];
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" />
</template>

<script setup lang="ts">
const items = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Billing", href: "#", disabled: true },
  { label: "Team", href: "#" },
  { label: "Settings", href: "#" },
];
</script>`,
              angular: `// app.component.ts (same component as above, with its own \`items\` array)
items = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Billing", href: "#", disabled: true },
  { label: "Team", href: "#" },
  { label: "Settings", href: "#" },
];

// app.component.html
<l-NavigationMenu [items]="items" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
