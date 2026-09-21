import { ProfileCard } from "../ProfileCard";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ProfileCardShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">ProfileCard</h1>
          <p className="text-sm text-slate-500 mt-1">
            A user profile summary — avatar, name, role, bio, and optional stats or actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="Name, role, and a short bio — no stats or actions.">Basic</SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
              avatarInitials="PN"
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
/>`,
              js: `<l-ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
/>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard
    name="Priya Nair"
    role="Product Designer at Lojee"
    bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
    avatarInitials="PN"
  />
</template>`,
              angular: `<l-ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  bio="Building accessible, joyful interfaces. Previously at Figma and Notion."
  avatarInitials="PN"
></l-ProfileCard>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A short row of stats, e.g. Followers/Following/Posts.">With stats</SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              avatarInitials="PN"
              stats={[
                { label: "Followers", value: "2,481" },
                { label: "Following", value: "312" },
                { label: "Posts", value: "48" },
              ]}
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  avatarInitials="PN"
  stats={[
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ]}
/>`,
              js: `<l-ProfileCard id="profile-card" name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN"></l-ProfileCard>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("profile-card").stats = [
    { label: "Followers", value: "2,481" },
    { label: "Following", value: "312" },
    { label: "Posts", value: "48" },
  ];
</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN" :stats="stats" />
</template>

<script setup>
const stats = [
  { label: "Followers", value: "2,481" },
  { label: "Following", value: "312" },
  { label: "Posts", value: "48" },
];
</script>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN" [stats]="stats"></l-ProfileCard>

stats = [
  { label: "Followers", value: "2,481" },
  { label: "Following", value: "312" },
  { label: "Posts", value: "48" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`actions` is rich content — this component doesn't know about Button, you supply the real elements.">
            With actions
          </SectionLabel>
          <div className="max-w-sm">
            <ProfileCard
              name="Priya Nair"
              role="Product Designer at Lojee"
              avatarInitials="PN"
              actions={
                <>
                  <Button label="Follow" className="flex-1" />
                  <Button variant="outline" label="Message" className="flex-1" />
                </>
              }
            />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard
  name="Priya Nair"
  role="Product Designer at Lojee"
  avatarInitials="PN"
  actions={
    <>
      <Button label="Follow" className="flex-1" />
      <Button variant="outline" label="Message" className="flex-1" />
    </>
  }
/>`,
              js: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
  <div slot="actions" class="flex items-center gap-2 w-full">
    <l-Button label="Follow" className="flex-1" />
    <l-Button variant="outline" label="Message" className="flex-1" />
  </div>
</l-ProfileCard>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
    <template #actions>
      <l-Button label="Follow" className="flex-1" />
      <l-Button variant="outline" label="Message" className="flex-1" />
    </template>
  </l-ProfileCard>
</template>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Product Designer at Lojee" avatarInitials="PN">
  <div slot="actions" class="flex items-center gap-2 w-full">
    <l-Button label="Follow" className="flex-1" />
    <l-Button variant="outline" label="Message" className="flex-1" />
  </div>
</l-ProfileCard>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Tints the banner strip behind the avatar.">Colors</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
            <ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
            <ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
<ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
<ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />`,
              js: `<l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
<l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
<l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo" />
  <l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald" />
  <l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose" />
</template>`,
              angular: `<l-ProfileCard name="Priya Nair" role="Design" avatarInitials="PN" color="indigo"></l-ProfileCard>
<l-ProfileCard name="Alex Chen" role="Engineering" avatarInitials="AC" color="emerald"></l-ProfileCard>
<l-ProfileCard name="Marcus Lee" role="Marketing" avatarInitials="ML" color="rose"></l-ProfileCard>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
