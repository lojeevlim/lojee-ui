import { useState } from "react";
import { Button } from "../Button";
import CodeBlock from "../../CodeBlock";
import { COLORS, cx, type ColorName } from "../../../../core/tokens";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export function ButtonSection() {
  const [activeColor, setActiveColor] = useState<ColorName>("indigo");
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleLoadingClick = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 1600);
  };

  return (
    <>
      {/* VARIANTS — includes dashed and glass */}
      <section>
        <SectionLabel sub="Solid, outline, ghost, soft, link, dashed, and a frosted glass style.">
          Variants
        </SectionLabel>
        <Row>
          <Button variant="solid" label="Solid"/>
          <Button variant="outline" label="Outline"/>
          <Button variant="ghost" label="Ghost"/>
          <Button variant="soft" label="Soft"/>
          <Button variant="link" label="Link"/>
          <Button variant="dashed" label="Dashed"/>
          <Button variant="glass" label="Glass"/>
        </Row>
        <CodeBlock
          variants={{
            react: `<Button variant="solid" label="Solid"/>
<Button variant="outline" label="Outline"/>
<Button variant="ghost" label="Ghost"/>
<Button variant="soft" label="Soft"/>
<Button variant="link" label="Link"/>
<Button variant="dashed" label="Dashed"/>
<Button variant="glass" label="Glass"/>`,
            js: `<l-Button variant="solid" label="Solid" />
<l-Button variant="outline" label="Outline" />
<l-Button variant="ghost" label="Ghost" />
<l-Button variant="soft" label="Soft" />
<l-Button variant="link" label="Link" />
<l-Button variant="dashed" label="Dashed" />
<l-Button variant="glass" label="Glass" />

<script type="module">
  import "lojee-ui/elements";
</script>`,
            vue: `<template>
  <l-Button variant="solid" label="Solid" />
  <l-Button variant="outline" label="Outline" />
  <l-Button variant="ghost" label="Ghost" />
  <l-Button variant="soft" label="Soft" />
  <l-Button variant="link" label="Link" />
  <l-Button variant="dashed" label="Dashed" />
  <l-Button variant="glass" label="Glass" />
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
            angular: `// button-showcase.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-button-showcase",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Button variant="solid" label="Solid" />
    <l-Button variant="outline" label="Outline" />
    <l-Button variant="ghost" label="Ghost" />
    <l-Button variant="soft" label="Soft" />
    <l-Button variant="link" label="Link" />
    <l-Button variant="dashed" label="Dashed" />
    <l-Button variant="glass" label="Glass" />
  \`,
})
export class ButtonShowcaseComponent {}`,
          }}
        />
      </section>

      {/* SIZES — includes full width */}
      <section>
        <SectionLabel sub="From compact (xs) to prominent (xl), plus a full-width stretch.">
          Sizes
        </SectionLabel>
        <Row>
          <Button size="xs" label="Extra small" />
          <Button size="sm" label="Small" />
          <Button size="md" label="Medium" />
          <Button size="lg" label="Large" />
          <Button size="xl" label="Extra large" />
        </Row>
        <div className="mt-4 max-w-sm">
          <Button size="full" label="Full Width" />
        </div>
        <CodeBlock
          variants={{
            react: `<Button size="xs" label="Extra small" />
<Button size="sm" label="Small" />
<Button size="md" label="Medium" />
<Button size="lg" label="Large" />
<Button size="xl" label="Extra large" />
<Button size="full" label="Full Width" />`,
            js: `<l-Button size="xs" label="Extra small" />
<l-Button size="sm" label="Small" />
<l-Button size="md" label="Medium" />
<l-Button size="lg" label="Large" />
<l-Button size="xl" label="Extra large" />
<l-Button size="full" label="Full Width" />`,
            vue: `<template>
  <l-Button size="xs" label="Extra small" />
  <l-Button size="sm" label="Small" />
  <l-Button size="md" label="Medium" />
  <l-Button size="lg" label="Large" />
  <l-Button size="xl" label="Extra large" />
  <l-Button size="full" label="Full Width" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button size="xs" label="Extra small" />
<l-Button size="sm" label="Small" />
<l-Button size="md" label="Medium" />
<l-Button size="lg" label="Large" />
<l-Button size="xl" label="Extra large" />
<l-Button size="full" label="Full Width" />`,
          }}
        />
      </section>

      {/* COLORS — pick from the full palette, see it applied across every variant below */}
      <section>
        <SectionLabel sub="Pick a color, see it applied across every variant below.">
          Colors
        </SectionLabel>
        <div className="flex flex-wrap gap-2 mb-5">
          {COLORS.map((c) => (
            <div
              key={c.base}
              className={cx(
                "rounded-lg",
                activeColor === c.base && "ring-2 ring-slate-900 ring-offset-2"
              )}
            >
              <Button color={c.base} variant="solid" size="sm" label={c.name} onClick={() => setActiveColor(c.base)} />
            </div>
          ))}
        </div>
        <CodeBlock
          variants={{
            react: `<Button color="${activeColor}" variant="solid" label="Solid" />
<Button color="${activeColor}" variant="outline" label="Outline" />
<Button color="${activeColor}" variant="ghost" label="Ghost" />
<Button color="${activeColor}" variant="soft" label="Soft" />
<Button color="${activeColor}" variant="link" label="Link" />`,
            js: `<l-Button color="${activeColor}" variant="solid" label="Solid" />
<l-Button color="${activeColor}" variant="outline" label="Outline" />
<l-Button color="${activeColor}" variant="ghost" label="Ghost" />
<l-Button color="${activeColor}" variant="soft" label="Soft" />
<l-Button color="${activeColor}" variant="link" label="Link" />`,
            vue: `<template>
  <l-Button color="${activeColor}" variant="solid" label="Solid" />
  <l-Button color="${activeColor}" variant="outline" label="Outline" />
  <l-Button color="${activeColor}" variant="ghost" label="Ghost" />
  <l-Button color="${activeColor}" variant="soft" label="Soft" />
  <l-Button color="${activeColor}" variant="link" label="Link" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button color="${activeColor}" variant="solid" label="Solid" />
<l-Button color="${activeColor}" variant="outline" label="Outline" />
<l-Button color="${activeColor}" variant="ghost" label="Ghost" />
<l-Button color="${activeColor}" variant="soft" label="Soft" />
<l-Button color="${activeColor}" variant="link" label="Link" />`,
          }}
        />
      </section>

      {/* GRADIENT — right below Colors */}
      <section>
        <SectionLabel sub="Eye-catching CTAs — use sparingly.">Gradient</SectionLabel>
        <Row>
          <Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
          <Button variant="gradient" color="rose" label="Upgrade to Pro" />
          <Button variant="gradient" color="emerald" label="Claim offer" />
          <Button variant="gradient" color="blue" label="Try for free" />
        </Row>
        <CodeBlock
          variants={{
            react: `<Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
<Button variant="gradient" color="rose" label="Upgrade to Pro" />
<Button variant="gradient" color="emerald" label="Claim offer" />
<Button variant="gradient" color="blue" label="Try for free" />`,
            js: `<l-Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
<l-Button variant="gradient" color="rose" label="Upgrade to Pro" />
<l-Button variant="gradient" color="emerald" label="Claim offer" />
<l-Button variant="gradient" color="blue" label="Try for free" />`,
            vue: `<template>
  <l-Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
  <l-Button variant="gradient" color="rose" label="Upgrade to Pro" />
  <l-Button variant="gradient" color="emerald" label="Claim offer" />
  <l-Button variant="gradient" color="blue" label="Try for free" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button variant="gradient" color="indigo" icon="arrow-right" iconPosition="right" label="Get started" />
<l-Button variant="gradient" color="rose" label="Upgrade to Pro" />
<l-Button variant="gradient" color="emerald" label="Claim offer" />
<l-Button variant="gradient" color="blue" label="Try for free" />`,
          }}
        />
      </section>

      {/* WITH ICONS */}
      <section>
        <SectionLabel sub="Icon left, icon right, or icon only.">
          With icons
        </SectionLabel>
        <Row>
          <Button icon="plus" variant="solid" label="New item" />
          <Button icon="download" iconPosition="right" variant="outline" label="Download" />
          <Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
          <Button color="rose" variant="outline" icon="trash-2" label="Delete" />
        </Row>
        <CodeBlock
          variants={{
            react: `<Button icon="plus" variant="solid" label="New item" />
<Button icon="download" iconPosition="right" variant="outline" label="Download" />
<Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
<Button color="rose" variant="outline" icon="trash-2" label="Delete" />`,
            js: `<l-Button icon="plus" variant="solid" label="New item" />
<l-Button icon="download" iconPosition="right" variant="outline" label="Download" />
<l-Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
<l-Button color="rose" variant="outline" icon="trash-2" label="Delete" />`,
            vue: `<template>
  <l-Button icon="plus" variant="solid" label="New item" />
  <l-Button icon="download" iconPosition="right" variant="outline" label="Download" />
  <l-Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
  <l-Button color="rose" variant="outline" icon="trash-2" label="Delete" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button icon="plus" variant="solid" label="New item" />
<l-Button icon="download" iconPosition="right" variant="outline" label="Download" />
<l-Button icon="arrow-right" iconPosition="right" variant="ghost" label="Continue" />
<l-Button color="rose" variant="outline" icon="trash-2" label="Delete" />`,
          }}
        />
      </section>

      {/* ICON-ONLY BUTTONS — right below With icons */}
      <section>
        <SectionLabel sub="Circular icon buttons across every size, plus a notification badge.">
          Icon-only
        </SectionLabel>
        <Row>
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="xs" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="sm" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="md" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="lg" label="Settings" />
          <Button icon="settings" iconOnly variant="ghost" shape="pill" size="xl" label="Settings" />
          <Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" size="md" label="Mail" />
          <Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" size="md" badge={3} label="Notifications" />
          <Button icon="plus" iconOnly variant="solid" color="emerald" size="md" shape="square" label="Add" />
        </Row>
        <CodeBlock
          variants={{
            react: `<Button icon="settings" iconOnly variant="ghost" shape="pill" label="Settings" />
<Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" label="Mail" />
<Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" badge={3} label="Notifications" />
<Button icon="plus" iconOnly variant="solid" color="emerald" shape="square" label="Add" />`,
            js: `<l-Button icon="settings" iconOnly variant="ghost" shape="pill" label="Settings" />
<l-Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" label="Mail" />
<l-Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" badge="3" label="Notifications" />
<l-Button icon="plus" iconOnly variant="solid" color="emerald" shape="square" label="Add" />`,
            vue: `<template>
  <l-Button icon="settings" iconOnly variant="ghost" shape="pill" label="Settings" />
  <l-Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" label="Mail" />
  <l-Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" badge="3" label="Notifications" />
  <l-Button icon="plus" iconOnly variant="solid" color="emerald" shape="square" label="Add" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button icon="settings" iconOnly variant="ghost" shape="pill" label="Settings" />
<l-Button icon="mail" iconOnly variant="soft" color="indigo" shape="pill" label="Mail" />
<l-Button icon="bell" iconOnly variant="soft" color="rose" shape="pill" badge="3" label="Notifications" />
<l-Button icon="plus" iconOnly variant="solid" color="emerald" shape="square" label="Add" />`,
          }}
        />
      </section>

      {/* STATES */}
      <section>
        <SectionLabel sub="Default, hover (try it), disabled, and loading.">
          States
        </SectionLabel>
        <Row>
          <Button variant="solid" color="slate" label="Default — hover me" />
          <Button variant="solid" color="slate" disabled label="Disabled" />
          <Button
            variant="solid"
            color="slate"
            icon={loadingBtn ? undefined : "check"}
            loading={loadingBtn}
            label={loadingBtn ? "Saving…" : "Save changes"}
            onClick={handleLoadingClick}
          />
        </Row>
        <CodeBlock
          variants={{
            react: `<Button color="slate" label="Default — hover me" />
<Button color="slate" disabled label="Disabled" />
<Button color="slate" loading={isSaving} onClick={handleSave} label={isSaving ? "Saving…" : "Save changes"} />`,
            js: `<l-Button color="slate" label="Default — hover me" />
<l-Button color="slate" disabled label="Disabled" />
<l-Button id="save-btn" color="slate" label="Save changes" />

<script type="module">
  const saveBtn = document.getElementById("save-btn");
  saveBtn.addEventListener("click", () => {
    saveBtn.loading = true;
    saveBtn.label = "Saving…";
    handleSave().then(() => {
      saveBtn.loading = false;
      saveBtn.label = "Save changes";
    });
  });
</script>`,
            vue: `<template>
  <l-Button color="slate" label="Default — hover me" />
  <l-Button color="slate" disabled label="Disabled" />
  <l-Button
    color="slate"
    :loading="isSaving"
    :label="isSaving ? 'Saving…' : 'Save changes'"
    @click="handleSave"
  />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button color="slate" label="Default — hover me" />
<l-Button color="slate" disabled label="Disabled" />
<l-Button
  color="slate"
  [loading]="isSaving"
  [label]="isSaving ? 'Saving…' : 'Save changes'"
  (click)="handleSave()"
 />`,
          }}
        />
      </section>

      {/* SHAPES */}
      <section>
        <SectionLabel sub="Same button, three corner treatments.">Shapes</SectionLabel>
        <Row>
          <Button variant="solid" color="slate" shape="default" label="Default" />
          <Button variant="solid" color="slate" shape="pill" label="Pill" />
          <Button variant="solid" color="slate" shape="square" label="Square" />
        </Row>
        <CodeBlock
          variants={{
            react: `<Button shape="default" label="Default" />
<Button shape="pill" label="Pill" />
<Button shape="square" label="Square" />`,
            js: `<l-Button shape="default" label="Default" />
<l-Button shape="pill" label="Pill" />
<l-Button shape="square" label="Square" />`,
            vue: `<template>
  <l-Button shape="default" label="Default" />
  <l-Button shape="pill" label="Pill" />
  <l-Button shape="square" label="Square" />
</template>`,
            angular: `<!-- reuses ButtonShowcaseComponent from above -->
<l-Button shape="default" label="Default" />
<l-Button shape="pill" label="Pill" />
<l-Button shape="square" label="Square" />`,
          }}
        />
      </section>

      {/* CUSTOM STYLING — className for the root, classNames for internal parts */}
      <section>
        <SectionLabel sub="Override the root with className, or target an internal part (icon, badge) with classNames — both merge on top of the built-in styling via tailwind-merge, so your classes always win.">
          Custom styling
        </SectionLabel>
        <Row>
          <Button
            variant="solid"
            color="slate"
            label="Custom root"
            className="rounded-full ring-2 ring-offset-2 ring-indigo-500"
          />
          <Button
            variant="soft"
            color="rose"
            icon="heart"
            label="Liked"
            classNames={{ icon: "fill-rose-600 text-rose-600" }}
          />
          <Button
            variant="soft"
            color="indigo"
            icon="bell"
            iconOnly
            shape="pill"
            badge={5}
            label="Notifications"
            classNames={{ badge: "bg-indigo-600" }}
          />
        </Row>
        <CodeBlock
          variants={{
            react: `// Override the root element
<Button className="rounded-full ring-2 ring-offset-2 ring-indigo-500" label="Custom root" />

// Target an internal part with classNames — icon, badge (Button also has "root")
<Button icon="heart" color="rose" variant="soft" label="Liked" classNames={{ icon: "fill-rose-600 text-rose-600" }} />
<Button icon="bell" iconOnly shape="pill" badge={5} label="Notifications" classNames={{ badge: "bg-indigo-600" }} />`,
            js: `<l-Button className="rounded-full ring-2 ring-offset-2 ring-indigo-500" label="Custom root" />
<l-Button id="liked-btn" icon="heart" color="rose" variant="soft" label="Liked" />
<l-Button id="notif-btn" icon="bell" iconOnly shape="pill" badge="5" label="Notifications" />

<script type="module">
  document.getElementById("liked-btn").classNames = { icon: "fill-rose-600 text-rose-600" };
  document.getElementById("notif-btn").classNames = { badge: "bg-indigo-600" };
</script>`,
            vue: `<template>
  <l-Button className="rounded-full ring-2 ring-offset-2 ring-indigo-500" label="Custom root" />
  <l-Button icon="heart" color="rose" variant="soft" label="Liked" :classNames="likedClassNames" />
  <l-Button icon="bell" iconOnly shape="pill" badge="5" label="Notifications" :classNames="notifClassNames" />
</template>

<script setup>
const likedClassNames = { icon: "fill-rose-600 text-rose-600" };
const notifClassNames = { badge: "bg-indigo-600" };
</script>`,
            angular: `<l-Button className="rounded-full ring-2 ring-offset-2 ring-indigo-500" label="Custom root" />
<l-Button icon="heart" color="rose" variant="soft" label="Liked" [classNames]="likedClassNames" />
<l-Button icon="bell" iconOnly shape="pill" badge="5" label="Notifications" [classNames]="notifClassNames" />

likedClassNames = { icon: "fill-rose-600 text-rose-600" };
notifClassNames = { badge: "bg-indigo-600" };`,
          }}
        />
      </section>
    </>
  );
}
