import { useState } from "react";
import { ProfileSettings, type ProfileSettingsValues } from "../ProfileSettings";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function ProfileSettingsShowcase() {
  const [saved, setSaved] = useState<ProfileSettingsValues | null>(null);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Profile Settings</h1>
          <p className="text-sm text-fg-subtle mt-1">
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
            <p className="mt-3 text-sm text-fg-subtle">
              Saved: <span className="font-medium text-fg">{saved.name}</span> (@{saved.username}) — "{saved.bio}"
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

<script setup lang="ts">
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

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <ProfileSettings transition="fade" avatarInitials="JD" />
            <ProfileSettings transition="slide-up" avatarInitials="JD" />
            <ProfileSettings transition="zoom" transitionDelay={100} avatarInitials="JD" />
            <ProfileSettings transition="flip" transitionDuration={700} avatarInitials="JD" />
          </TransitionPreview>
          <div className="grid gap-6 sm:grid-cols-2">
            <ProfileSettings hoverEffect="lift" avatarInitials="JD" />
            <ProfileSettings hoverEffect="glow" avatarInitials="JD" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileSettings transition="fade" avatarInitials="JD" />
<ProfileSettings transition="slide-up" avatarInitials="JD" />
<ProfileSettings transition="zoom" transitionDelay={100} avatarInitials="JD" />
<ProfileSettings transition="flip" transitionDuration={700} avatarInitials="JD" />
<ProfileSettings hoverEffect="lift" avatarInitials="JD" />
<ProfileSettings hoverEffect="glow" avatarInitials="JD" />`,
              js: `<l-ProfileSettings transition="fade" avatarInitials="JD"></l-ProfileSettings>
<l-ProfileSettings transition="slide-up" avatarInitials="JD"></l-ProfileSettings>
<l-ProfileSettings transition="zoom" transitionDelay="100" avatarInitials="JD"></l-ProfileSettings>
<l-ProfileSettings transition="flip" transitionDuration="700" avatarInitials="JD"></l-ProfileSettings>
<l-ProfileSettings hoverEffect="lift" avatarInitials="JD"></l-ProfileSettings>
<l-ProfileSettings hoverEffect="glow" avatarInitials="JD"></l-ProfileSettings>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-ProfileSettings transition="fade" avatarInitials="JD"></l-ProfileSettings>
  <l-ProfileSettings transition="slide-up" avatarInitials="JD"></l-ProfileSettings>
  <l-ProfileSettings transition="zoom" transitionDelay="100" avatarInitials="JD"></l-ProfileSettings>
  <l-ProfileSettings transition="flip" transitionDuration="700" avatarInitials="JD"></l-ProfileSettings>
  <l-ProfileSettings hoverEffect="lift" avatarInitials="JD"></l-ProfileSettings>
  <l-ProfileSettings hoverEffect="glow" avatarInitials="JD"></l-ProfileSettings>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-ProfileSettings transition="fade" avatarInitials="JD"></l-ProfileSettings>
    <l-ProfileSettings transition="slide-up" avatarInitials="JD"></l-ProfileSettings>
    <l-ProfileSettings transition="zoom" transitionDelay="100" avatarInitials="JD"></l-ProfileSettings>
    <l-ProfileSettings transition="flip" transitionDuration="700" avatarInitials="JD"></l-ProfileSettings>
    <l-ProfileSettings hoverEffect="lift" avatarInitials="JD"></l-ProfileSettings>
    <l-ProfileSettings hoverEffect="glow" avatarInitials="JD"></l-ProfileSettings>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
