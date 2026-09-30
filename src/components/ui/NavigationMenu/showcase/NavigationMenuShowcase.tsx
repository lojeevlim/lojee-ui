import { useState } from "react";
import { NavigationMenu } from "../NavigationMenu";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const NAV_ITEMS = [
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
];

const ITEMS_CODE = `[
  { label: "Home", href: "#", active: true },
  { label: "Products", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "About", href: "#" },
]`;

// Same snippet in every language, with one extra attribute on the menu.
const menuCode = (id: string, attr: string) => ({
  react: `<NavigationMenu
  ${attr}
  items={${ITEMS_CODE.replace(/\n/g, "\n  ")}}
/>`,
  js: `<l-NavigationMenu id="${id}" ${attr} />

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("${id}").items = ${ITEMS_CODE.replace(/\n/g, "\n  ")};
</script>`,
  vue: `<template>
  <l-NavigationMenu :items="items" ${attr} />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = ${ITEMS_CODE};
</script>`,
  angular: `<l-NavigationMenu [items]="items" ${attr}></l-NavigationMenu>

items = ${ITEMS_CODE};`,
});

const CALLBACK_LABELS = ["Home", "Products", "Pricing"] as const;

export default function NavigationMenuShowcase() {
  const [lastChanged, setLastChanged] = useState("Home");

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">NavigationMenu</h1>
          <p className="text-sm text-fg-subtle mt-1">A data-driven row of top-level site nav links with an active-item indicator.</p>
        </div>

        <section>
          <SectionLabel sub="A horizontal row of links, one marked active — click any of them and the active item moves, just like Sidebar and Navbar.">Basic</SectionLabel>
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
          <SectionLabel sub="color takes any built-in color (including accent, which follows the theme) or a custom CSS color.">
            Colors
          </SectionLabel>
          <div className="space-y-3">
            {(["slate", "accent", "emerald", "rose", "amber"] as const).map((c) => (
              <NavigationMenu key={c} color={c} items={NAV_ITEMS} />
            ))}
          </div>
          <CodeBlock variants={menuCode("nav-menu-color", 'color="emerald"')} />
        </section>

        <section>
          <SectionLabel sub="variant draws the active item as a solid fill, an outline or a soft tint. Leave it out and the active item follows the theme's active-item style.">
            Variants
          </SectionLabel>
          <div className="space-y-3">
            {(["solid", "outline", "soft"] as const).map((v) => (
              <div key={v} className="flex items-center gap-4">
                <span className="w-16 text-xs font-medium text-fg-subtle">{v}</span>
                <NavigationMenu color="accent" variant={v} items={NAV_ITEMS} />
              </div>
            ))}
            <div className="flex items-center gap-4">
              <span className="w-16 text-xs font-medium text-fg-subtle">theme</span>
              <NavigationMenu color="accent" items={NAV_ITEMS} />
            </div>
          </div>
          <CodeBlock variants={menuCode("nav-menu-variant", 'color="accent" variant="outline"')} />
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
          <SectionLabel sub="Like Sidebar and Navbar, the menu keeps track of the active item itself — click one and it updates. onActiveItemChange fires with the whole item whenever it changes (a click, a URL match, or an active-prop change).">
            Selection callback
          </SectionLabel>
          <NavigationMenu
            items={CALLBACK_LABELS.map((label, i) => ({ label, href: "#", active: i === 0 }))}
            onActiveItemChange={(item) => setLastChanged(item.label)}
          />
          <p className="mt-2 text-sm text-fg-subtle">
            Active item: <span className="font-medium text-fg">{lastChanged}</span>
          </p>
          <CodeBlock
            variants={{
              react: `const [active, setActive] = useState("Home");

<NavigationMenu
  items={[
    { label: "Home", href: "/", active: true },
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
  ]}
  onActiveItemChange={(item) => setActive(item.label)}
/>

{/* No state needed to highlight the clicked item — and an item's href is also matched
    against the current URL on load and on back/forward. */}`,
              js: `<l-NavigationMenu id="nav-menu-callback" />

<script type="module">
  import "lojee-ui/elements";

  const menu = document.getElementById("nav-menu-callback");
  menu.items = [
    { label: "Home", href: "/", active: true },
    { label: "Products", href: "/products" },
    { label: "Pricing", href: "/pricing" },
  ];
  menu.addEventListener("activeitemchange", (e) => {
    console.log("Active:", e.detail.label);
  });
</script>`,
              vue: `<template>
  <l-NavigationMenu :items="items" @activeitemchange="onChange" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", href: "/", active: true },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
];

function onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
}
</script>`,
              angular: `<l-NavigationMenu [items]="items" (activeitemchange)="onChange($event)"></l-NavigationMenu>

items = [
  { label: "Home", href: "/", active: true },
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
];

onChange(e: CustomEvent) {
  console.log("Active:", e.detail.label);
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
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium text-fg">Profile</p>
                    <p className="mt-1 text-sm text-fg-subtle">Update your name, photo, and public details.</p>
                  </div>
                ),
              },
              {
                label: "Notifications",
                icon: "bell",
                content: (
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium text-fg">Notifications</p>
                    <p className="mt-1 text-sm text-fg-subtle">Choose which emails and alerts you receive.</p>
                  </div>
                ),
              },
              {
                label: "Security",
                icon: "lock",
                content: (
                  <div className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium text-fg">Security</p>
                    <p className="mt-1 text-sm text-fg-subtle">Manage your password and two-factor authentication.</p>
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
