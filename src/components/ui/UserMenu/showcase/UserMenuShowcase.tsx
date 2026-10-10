import { useState } from "react";
import { UserMenu, type UserMenuItem } from "../UserMenu";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row, TransitionPreview } from "../../ShowcaseHelpers";

const ITEMS: UserMenuItem[] = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

export default function UserMenuShowcase() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">User Menu</h1>
          <p className="text-sm text-fg-subtle mt-1">
            An avatar-triggered dropdown menu — the classic "click your avatar" pattern, built on top of DropdownMenu.
          </p>
        </div>

        <section>
          <SectionLabel sub='Data-driven `items` — icon, label, and an optional `danger` item like "Log out".'>Basic</SectionLabel>
          <Row>
            <UserMenu name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD" items={ITEMS} />
          </Row>
          <CodeBlock
            variants={{
              react: `<UserMenu
  name="Jordan Diaz"
  email="jordan@lojee.io"
  avatarInitials="JD"
  items={[
    { label: "Profile", icon: "user" },
    { label: "Settings", icon: "settings" },
    { label: "Billing", icon: "tag" },
    { label: "Log out", icon: "arrow-right", danger: true },
  ]}
/>`,
              js: `<l-user-menu id="user-menu" name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD"></l-user-menu>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("user-menu");
  el.items = [
    { label: "Profile", icon: "user" },
    { label: "Settings", icon: "settings" },
    { label: "Billing", icon: "tag" },
    { label: "Log out", icon: "arrow-right", danger: true },
  ];
  el.addEventListener("itemselect", (e) => {
    console.log("Selected:", e.detail);
  });
</script>`,
              vue: `<template>
  <l-user-menu name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD" :items="items" @itemselect="onSelect" />
</template>

<script setup lang="ts">
const items = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

function onSelect(item) {
  console.log("Selected:", item);
}
</script>`,
              angular: `<l-user-menu
  name="Jordan Diaz"
  email="jordan@lojee.io"
  avatarInitials="JD"
  [items]="items"
  (itemselect)="onSelect($event)"
></l-user-menu>

items = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

onSelect(item) {
  console.log("Selected:", item);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Aligns the panel to the leading edge of the trigger instead.">Align start</SectionLabel>
          <Row>
            <UserMenu name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD" items={ITEMS} align="start" />
          </Row>
          <CodeBlock
            variants={{
              react: `<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} align="start" />`,
              js: `<l-user-menu align="start"></l-user-menu>`,
              vue: `<l-user-menu align="start" :items="items" />`,
              angular: `<l-user-menu align="start" [items]="items"></l-user-menu>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`onItemSelect` reports which item was clicked and its index.">With selection handling</SectionLabel>
          <Row>
            <div className="flex items-center gap-3">
              <UserMenu
                name="Jordan Diaz"
                email="jordan@lojee.io"
                avatarInitials="JD"
                items={ITEMS}
                onItemSelect={(item) => setLastClicked(item.label)}
              />
              {lastClicked && <span className="text-sm text-fg-subtle">Last clicked: {lastClicked}</span>}
            </div>
          </Row>
          <CodeBlock
            variants={{
              react: `const [lastClicked, setLastClicked] = useState(null);

<UserMenu
  name="Jordan Diaz"
  avatarInitials="JD"
  items={items}
  onItemSelect={(item) => setLastClicked(item.label)}
/>`,
              js: `<l-user-menu id="user-menu"></l-user-menu>

<script type="module">
  document.getElementById("user-menu").addEventListener("itemselect", (e) => {
    console.log("Last clicked:", e.detail.label);
  });
</script>`,
              vue: `<l-user-menu :items="items" @itemselect="(item) => lastClicked = item.label" />`,
              angular: `<l-user-menu [items]="items" (itemselect)="lastClicked = $event.label"></l-user-menu>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview layout="inline">
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} transition="fade" />
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} transition="slide-down" />
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} transition="zoom" transitionDuration={600} />
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} transition="blur" />
          </TransitionPreview>
          <Row>
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} hoverEffect="lift" />
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} hoverEffect="glow" />
            <UserMenu name="Jordan Diaz" avatarInitials="JD" items={ITEMS} hoverEffect="shine" />
          </Row>
          <CodeBlock
            variants={{
              react: `const items = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} transition="fade" />
<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} transition="slide-down" />
<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} transition="zoom" transitionDuration={600} />
<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} transition="blur" />

<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} hoverEffect="lift" />
<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} hoverEffect="glow" />
<UserMenu name="Jordan Diaz" avatarInitials="JD" items={items} hoverEffect="shine" />`,
              js: `<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" transition="fade"></l-user-menu>
<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" transition="slide-down"></l-user-menu>
<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" transition="zoom" transitionDuration="600"></l-user-menu>
<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" transition="blur"></l-user-menu>

<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" hoverEffect="lift"></l-user-menu>
<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" hoverEffect="glow"></l-user-menu>
<l-user-menu class="transition-demo" name="Jordan Diaz" avatarInitials="JD" hoverEffect="shine"></l-user-menu>

<script type="module">
  import "lojee-ui/elements";

  const items = [
    { label: "Profile", icon: "user" },
    { label: "Settings", icon: "settings" },
    { label: "Billing", icon: "tag" },
    { label: "Log out", icon: "arrow-right", danger: true },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" transition="fade"></l-user-menu>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" transition="slide-down"></l-user-menu>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" transition="zoom" transitionDuration="600"></l-user-menu>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" transition="blur"></l-user-menu>

  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="lift"></l-user-menu>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="glow"></l-user-menu>
  <l-user-menu :items="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="shine"></l-user-menu>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
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
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" transition="fade"></l-user-menu>
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" transition="slide-down"></l-user-menu>
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" transition="zoom" transitionDuration="600"></l-user-menu>
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" transition="blur"></l-user-menu>

    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="lift"></l-user-menu>
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="glow"></l-user-menu>
    <l-user-menu [items]="items" name="Jordan Diaz" avatarInitials="JD" hoverEffect="shine"></l-user-menu>
  \`,
})
export class AppComponent {
  items = [
    { label: "Profile", icon: "user" },
    { label: "Settings", icon: "settings" },
    { label: "Billing", icon: "tag" },
    { label: "Log out", icon: "arrow-right", danger: true },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
