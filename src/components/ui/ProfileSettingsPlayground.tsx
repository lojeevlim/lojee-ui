import { useState } from "react";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function ProfileSettingsPlayground() {
  const [name, setName] = useState("Jordan Diaz");
  const [username, setUsername] = useState("jordandiaz");
  const [bio, setBio] = useState("Product designer building lojee-ui.");
  const [saveLabel, setSaveLabel] = useState("Save changes");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-md w-full">
          <ProfileSettings
            avatarInitials="JD"
            defaultValues={{ name, username, bio }}
            saveLabel={saveLabel || "Save changes"}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const defaultsCode = `{ name: "${name}", username: "${username}", bio: "${bio}" }`;
  const saveLabelAttr = saveLabel && saveLabel !== "Save changes" ? ` saveLabel="${saveLabel}"` : "";

  const code = `<ProfileSettings avatarInitials="JD" defaultValues={${defaultsCode}}${saveLabelAttr} />`;

  const htmlMarkup = `<l-ProfileSettings id="profile-settings" avatarInitials="JD"${saveLabelAttr}></l-ProfileSettings>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("profile-settings").defaultValues = ${defaultsCode};
</script>`;

  const vueMarkup = `<template>
  <l-ProfileSettings avatarInitials="JD" :defaultValues="defaults"${saveLabelAttr} />
</template>

<script setup>
const defaults = ${defaultsCode};
</script>`;

  const angularMarkup = `<l-ProfileSettings avatarInitials="JD" [defaultValues]="defaults"${saveLabelAttr}></l-ProfileSettings>

defaults = ${defaultsCode};`;

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
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Username</span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="jordandiaz"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Bio</span>
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Tell people a little about yourself."
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Save label</span>
        <input
          value={saveLabel}
          onChange={(e) => setSaveLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Save changes"
        />
      </div>
    </PlaygroundLayout>
  );
}
