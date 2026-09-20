import { useState } from "react";
import { UserMenu, type UserMenuItem } from "../UserMenu";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const ITEMS: UserMenuItem[] = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

export default function UserMenuShowcase() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">User Menu</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<UserMenu id="user-menu" name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD"></UserMenu>

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
  <UserMenu name="Jordan Diaz" email="jordan@lojee.io" avatarInitials="JD" :items="items" @itemselect="onSelect" />
</template>

<script setup>
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
              angular: `<UserMenu
  name="Jordan Diaz"
  email="jordan@lojee.io"
  avatarInitials="JD"
  [items]="items"
  (itemselect)="onSelect($event)"
></UserMenu>

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
              js: `<UserMenu align="start"></UserMenu>`,
              vue: `<UserMenu align="start" :items="items" />`,
              angular: `<UserMenu align="start" [items]="items"></UserMenu>`,
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
              {lastClicked && <span className="text-sm text-slate-500">Last clicked: {lastClicked}</span>}
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
              js: `<UserMenu id="user-menu"></UserMenu>

<script type="module">
  document.getElementById("user-menu").addEventListener("itemselect", (e) => {
    console.log("Last clicked:", e.detail.label);
  });
</script>`,
              vue: `<UserMenu :items="items" @itemselect="(item) => lastClicked = item.label" />`,
              angular: `<UserMenu [items]="items" (itemselect)="lastClicked = $event.label"></UserMenu>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
