import { useState } from "react";
import { ProfileSettings, type ProfileSettingsValues } from "../ProfileSettings";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ProfileSettingsShowcase() {
  const [saved, setSaved] = useState<ProfileSettingsValues | null>(null);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Profile Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            A settings-card block for editing personal profile info — avatar, display name, username, and bio.
          </p>
        </div>

        <section>
          <SectionLabel sub="Pre-filled via `defaultValues` — internally stateful from there, like every other *Form component in this library.">
            Basic
          </SectionLabel>
          <div className="max-w-md">
            <ProfileSettings
              avatarInitials="JD"
              defaultValues={{ name: "Jordan Diaz", username: "jordandiaz", bio: "Product designer building lojee-ui." }}
              onSave={setSaved}
            />
          </div>
          {saved && (
            <p className="mt-3 text-sm text-slate-500">
              Saved: <span className="font-medium text-slate-900">{saved.name}</span> (@{saved.username}) — "{saved.bio}"
            </p>
          )}
          <CodeBlock
            variants={{
              react: `const [saved, setSaved] = useState(null);

<ProfileSettings
  avatarInitials="JD"
  defaultValues={{ name: "Jordan Diaz", username: "jordandiaz", bio: "Product designer building lojee-ui." }}
  onSave={setSaved}
/>`,
              js: `<l-ProfileSettings id="profile-settings" avatarInitials="JD"></l-ProfileSettings>

<script type="module">
  import "lojee-ui/elements";

  const el = document.getElementById("profile-settings");
  el.defaultValues = { name: "Jordan Diaz", username: "jordandiaz", bio: "Product designer building lojee-ui." };
  el.addEventListener("save", (e) => { /* e.detail */ });
</script>`,
              vue: `<template>
  <l-ProfileSettings avatarInitials="JD" :defaultValues="defaults" @save="onSave" />
</template>

<script setup>
const defaults = { name: "Jordan Diaz", username: "jordandiaz", bio: "Product designer building lojee-ui." };
function onSave(values) { /* values */ }
</script>`,
              angular: `<l-ProfileSettings avatarInitials="JD" [defaultValues]="defaults" (save)="onSave($event)"></l-ProfileSettings>

defaults = { name: "Jordan Diaz", username: "jordandiaz", bio: "Product designer building lojee-ui." };
onSave(values) { /* values */ }`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`saveLabel` overrides the primary button's text.">Custom save label</SectionLabel>
          <div className="max-w-md">
            <ProfileSettings
              avatarInitials="AC"
              defaultValues={{ name: "Alex Chen", username: "alexchen" }}
              saveLabel="Update profile"
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileSettings avatarInitials="AC" defaultValues={{ name: "Alex Chen", username: "alexchen" }} saveLabel="Update profile" />`,
              js: `<l-ProfileSettings avatarInitials="AC" saveLabel="Update profile"></l-ProfileSettings>`,
              vue: `<l-ProfileSettings avatarInitials="AC" saveLabel="Update profile" />`,
              angular: `<l-ProfileSettings avatarInitials="AC" saveLabel="Update profile"></l-ProfileSettings>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
