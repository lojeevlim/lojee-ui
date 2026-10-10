import { useState } from "react";
import { ProfileSettings } from "./ProfileSettings/ProfileSettings";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function ProfileSettingsPlayground() {
  const motion = useMotion();
  const [name, setName] = useState("Jordan Diaz");
  const [username, setUsername] = useState("jordandiaz");
  const [bio, setBio] = useState("Product designer building lojee-ui.");
  const [saveLabel, setSaveLabel] = useState("Save changes");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="max-w-md w-full">
          <ProfileSettings
            key={motion.replayKey}
            {...motion.props}
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

  const code = `<ProfileSettings avatarInitials="JD" defaultValues={${defaultsCode}}${saveLabelAttr}${motion.attrs} />`;

  const htmlMarkup = `<l-profile-settings id="profile-settings" avatarInitials="JD"${saveLabelAttr}${motion.attrs}></l-profile-settings>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("profile-settings").defaultValues = ${defaultsCode};
</script>`;

  const vueMarkup = `<template>
  <l-profile-settings avatarInitials="JD" :defaultValues="defaults"${saveLabelAttr}${motion.attrs} />
</template>

<script setup lang="ts">
const defaults = ${defaultsCode};
</script>`;

  const angularMarkup = `<l-profile-settings avatarInitials="JD" [defaultValues]="defaults"${saveLabelAttr}${motion.attrs}></l-profile-settings>

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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Jordan Diaz"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Username</span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="jordandiaz"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Bio</span>
        <input
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Tell people a little about yourself."
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Save label</span>
        <input
          value={saveLabel}
          onChange={(e) => setSaveLabel(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Save changes"
        />
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
