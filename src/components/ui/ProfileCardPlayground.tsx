import { useState } from "react";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import { Button } from "./Buttons/Button";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function ProfileCardPlayground() {
  const [name, setName] = useState("Priya Nair");
  const [role, setRole] = useState("Product Designer at Lojee");
  const [bio, setBio] = useState("Building accessible, joyful interfaces.");
  const [color, setColor] = useState<ColorName>("indigo");
  const [showStats, setShowStats] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const nameValue = name || "Priya Nair";
  const roleValue = role || undefined;
  const bioValue = bio || undefined;

  const stats = [
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ];

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-sm w-full">
          <ProfileCard
            name={nameValue}
            role={roleValue}
            bio={bioValue}
            avatarInitials={nameValue
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
            color={color}
            stats={showStats ? stats : undefined}
            actions={
              showActions ? (
                <>
                  <Button label="Follow" className="flex-1" />
                  <Button variant="outline" label="Message" className="flex-1" />
                </>
              ) : undefined
            }
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const roleAttr = roleValue ? ` role="${roleValue}"` : "";
  const bioAttr = bioValue ? ` bio="${bioValue}"` : "";
  const colorAttr = color !== "indigo" ? ` color="${color}"` : "";
  const statsBlock = showStats
    ? `\n  stats={[\n    { label: "Followers", value: "2,481" },\n    { label: "Following", value: "312" },\n    { label: "Posts", value: "48" },\n  ]}`
    : "";
  const actionsBlockJsx = showActions
    ? `\n  actions={\n    <>\n      <Button label="Follow" className="flex-1" />\n      <Button variant="outline" label="Message" className="flex-1" />\n    </>\n  }`
    : "";

  const code = `<ProfileCard name="${nameValue}"${roleAttr}${bioAttr}${colorAttr}${statsBlock}${actionsBlockJsx} />`;

  const actionsSlotHtml = showActions
    ? `\n  <div slot="actions" class="flex items-center gap-2 w-full">\n    <l-Button label="Follow" className="flex-1" />\n    <l-Button variant="outline" label="Message" className="flex-1" />\n  </div>`
    : "";
  const htmlOpenTag = `<l-ProfileCard${showStats ? ` id="profile-card"` : ""} name="${nameValue}"${roleAttr}${bioAttr}${colorAttr}>`;
  const htmlMarkup = actionsSlotHtml || showStats ? `${htmlOpenTag}${actionsSlotHtml}\n</l-ProfileCard>` : `<l-ProfileCard name="${nameValue}"${roleAttr}${bioAttr}${colorAttr} />`;
  const htmlScript = showStats
    ? `\n\n<script type="module">
  import "lojee-ui/elements";

  document.getElementById("profile-card").stats = [
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ];
</script>`
    : `\n\n<script type="module">import "lojee-ui/elements";</script>`;

  const vueMarkup = showStats
    ? `<template>
  <l-ProfileCard name="${nameValue}"${roleAttr}${bioAttr}${colorAttr} :stats="stats">${
        showActions
          ? `\n    <template #actions>\n      <l-Button label="Follow" className="flex-1" />\n      <l-Button variant="outline" label="Message" className="flex-1" />\n    </template>\n  `
          : ""
      }</l-ProfileCard>
</template>

<script setup lang="ts">
const stats = [
  { label: "Followers", value: "2,481" },
  { label: "Following", value: "312" },
  { label: "Posts", value: "48" },
];
</script>`
    : `<template>
  <l-ProfileCard name="${nameValue}"${roleAttr}${bioAttr}${colorAttr} />
</template>`;

  const angularMarkup = `<l-ProfileCard name="${nameValue}"${roleAttr}${bioAttr}${colorAttr}${showStats ? ` [stats]="stats"` : ""}>${actionsSlotHtml}
</l-ProfileCard>${
    showStats
      ? `\n\nstats = [\n  { label: "Followers", value: "2,481" },\n  { label: "Following", value: "312" },\n  { label: "Posts", value: "48" },\n];`
      : ""
  }`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}${htmlScript}`,
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
          placeholder="Priya Nair"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Role</span>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Product Designer at Lojee"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Bio</span>
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Building accessible, joyful interfaces."
        />
      </div>
      <ColorSwatches value={color} onChange={setColor} />
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={showStats} onChange={(e) => setShowStats(e.target.checked)} />
          Show stats
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} />
          Show actions
        </label>
      </div>
    </PlaygroundLayout>
  );
}
