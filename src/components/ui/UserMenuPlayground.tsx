import { useState } from "react";
import { UserMenu, type UserMenuItem, type UserMenuProps } from "./UserMenu/UserMenu";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ALIGNS: NonNullable<UserMenuProps["align"]>[] = ["start", "end"];

const ITEMS: UserMenuItem[] = [
  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },
];

export default function UserMenuPlayground() {
  const [name, setName] = useState("Jordan Diaz");
  const [email, setEmail] = useState("jordan@lojee.io");
  const [align, setAlign] = useState<NonNullable<UserMenuProps["align"]>>("end");

  // `overflow-visible`: the menu panel is absolutely positioned relative to
  // its trigger (not portaled), so the window's default rounded-corner
  // clipping would cut it off when it opens near an edge.
  const preview = (
    <AppWindowFrame className="overflow-visible">
      <AppWindowBody>
        <UserMenu name={name || "Jordan Diaz"} email={email || undefined} avatarInitials="JD" items={ITEMS} align={align} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const nameValue = name || "Jordan Diaz";
  const emailAttrJsx = email ? `\n  email="${email}"` : "";
  const alignAttr = align !== "end" ? ` align="${align}"` : "";

  const code = `<UserMenu
  name="${nameValue}"${emailAttrJsx}
  avatarInitials="JD"${alignAttr}
  items={[
    { label: "Profile", icon: "user" },
    { label: "Settings", icon: "settings" },
    { label: "Billing", icon: "tag" },
    { label: "Log out", icon: "arrow-right", danger: true },
  ]}
/>`;

  // `items` is a "json"-typed prop with no native attribute form — it must be
  // assigned as a real DOM property (js) or bound (vue/angular) rather than
  // stringified into the tag.
  const itemsCode = `  { label: "Profile", icon: "user" },
  { label: "Settings", icon: "settings" },
  { label: "Billing", icon: "tag" },
  { label: "Log out", icon: "arrow-right", danger: true },`;

  const htmlMarkup = `<l-UserMenu id="user-menu" name="${nameValue}"${emailAttrJsx}${alignAttr} avatarInitials="JD"></l-UserMenu>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("user-menu").items = [
${itemsCode}
  ];
</script>`;

  const vueMarkup = `<template>
  <l-UserMenu name="${nameValue}"${emailAttrJsx}${alignAttr} avatarInitials="JD" :items="items" />
</template>

<script setup>
const items = [
${itemsCode}
];
</script>`;

  const angularMarkup = `<l-UserMenu name="${nameValue}"${emailAttrJsx}${alignAttr} avatarInitials="JD" [items]="items"></l-UserMenu>

items = [
${itemsCode}
];`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: htmlMarkup,
    vue: vueMarkup,
    angular: angularMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Jordan Diaz"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="jordan@lojee.io"
        />
      </div>
      <OptionGroup label="Align" options={ALIGNS} value={align} onChange={setAlign} />
    </PlaygroundLayout>
  );
}
