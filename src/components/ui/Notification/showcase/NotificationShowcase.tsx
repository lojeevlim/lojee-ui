import { useState } from "react";
import { Notification } from "../Notification";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

export default function NotificationShowcase() {
  const [dismissibleVisible, setDismissibleVisible] = useState(true);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Notification</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A static, richer notification-feed list item, meant to be rendered inside a list, dropdown, or panel you
            build.
          </p>
        </div>

        <section>
          <SectionLabel sub="Icon, title, and description.">Basic</SectionLabel>
          <Notification title="New comment" icon="mail">
            Alex left a comment on your document.
          </Notification>
          <CodeBlock
            variants={{
              react: `<Notification title="New comment" icon="mail">
  Alex left a comment on your document.
</Notification>`,
              js: `<l-notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-notification>`,
              angular: `<l-notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A small accent-colored dot next to the title marks it unread.">Unread</SectionLabel>
          <Notification title="New follower" unread>
            Jordan started following you.
          </Notification>
          <CodeBlock
            variants={{
              react: `<Notification title="New follower" unread>
  Jordan started following you.
</Notification>`,
              js: `<l-notification title="New follower" unread>
  Jordan started following you.
</l-notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-notification title="New follower" unread>
  Jordan started following you.
</l-notification>`,
              angular: `<l-notification title="New follower" unread>
  Jordan started following you.
</l-notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A freeform display string, not a real Date.">With timestamp</SectionLabel>
          <Notification title="Deploy finished" timestamp="2m ago">
            Your latest deploy to production finished successfully.
          </Notification>
          <CodeBlock
            variants={{
              react: `<Notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</Notification>`,
              js: `<l-notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-notification>`,
              angular: `<l-notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Pass a row of buttons or links via actions.">With actions</SectionLabel>
          <Notification
            title="Team invite"
            timestamp="10m ago"
            unread
            actions={
              <>
                <Button size="sm" label="Accept" />
                <Button size="sm" variant="outline" label="Decline" />
              </>
            }
          >
            Priya invited you to join the "Design" team.
          </Notification>
          <CodeBlock
            variants={{
              react: `<Notification
  title="Team invite"
  timestamp="10m ago"
  unread
  actions={
    <>
      <Button size="sm" label="Accept" />
      <Button size="sm" variant="outline" label="Decline" />
    </>
  }
>
  Priya invited you to join the "Design" team.
</Notification>`,
              js: `<l-notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <div slot="actions">
    <l-button size="sm" label="Accept"></l-button>
    <l-button size="sm" variant="outline" label="Decline"></l-button>
  </div>
</l-notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <div slot="actions">
    <l-button size="sm" label="Accept" />
    <l-button size="sm" variant="outline" label="Decline" />
  </div>
</l-notification>`,
              angular: `<l-notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <div slot="actions">
    <l-button size="sm" label="Accept"></l-button>
    <l-button size="sm" variant="outline" label="Decline"></l-button>
  </div>
</l-notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Pass onDismiss to show a close (x) button.">Dismissible</SectionLabel>
          {dismissibleVisible ? (
            <Notification title="Storage almost full" onDismiss={() => setDismissibleVisible(false)}>
              You're using 92% of your available storage.
            </Notification>
          ) : (
            <button
              type="button"
              onClick={() => setDismissibleVisible(true)}
              className="text-sm font-medium text-fg-subtle underline underline-offset-4 hover:text-fg-muted"
            >
              Show notification again
            </button>
          )}
          <CodeBlock
            variants={{
              react: `const [visible, setVisible] = useState(true);

{visible && (
  <Notification title="Storage almost full" onDismiss={() => setVisible(false)}>
    You're using 92% of your available storage.
  </Notification>
)}`,
              js: `<l-notification title="Storage almost full" id="storage-notification">
  You're using 92% of your available storage.
</l-notification>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("storage-notification")
    .addEventListener("dismiss", (e) => { e.target.remove(); });
</script>`,
              vue: `<template>
  <l-notification v-if="visible" title="Storage almost full" @dismiss="visible = false">
    You're using 92% of your available storage.
  </l-notification>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const visible = ref(true);
</script>`,
              angular: `<l-notification *ngIf="visible" title="Storage almost full" (dismiss)="visible = false">
  You're using 92% of your available storage.
</l-notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. Press Replay to run the enter transitions again.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Notification title="Fade" transition="fade">New activity</Notification>
            <Notification title="Slide up" transition="slide-up">New activity</Notification>
            <Notification title="Slide right" transition="slide-right" transitionDelay={100}>New activity</Notification>
            <Notification title="Zoom" transition="zoom">New activity</Notification>
            <Notification title="Flip" transition="flip">New activity</Notification>
            <Notification title="Blur" transition="blur">New activity</Notification>
            <Notification title="Bounce" transition="bounce">New activity</Notification>
            <Notification title="Drop" transition="drop" transitionDuration={700}>New activity</Notification>
            <Notification title="Lift" hoverEffect="lift">New activity</Notification>
            <Notification title="Glow" hoverEffect="glow">New activity</Notification>
            <Notification title="Shine" hoverEffect="shine">New activity</Notification>
            <Notification title="Tilt" hoverEffect="tilt">New activity</Notification>
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Notification title="Fade" transition="fade">New activity</Notification>
<Notification title="Slide up" transition="slide-up">New activity</Notification>
<Notification title="Slide right" transition="slide-right" transitionDelay={100}>New activity</Notification>
<Notification title="Zoom" transition="zoom">New activity</Notification>
<Notification title="Flip" transition="flip">New activity</Notification>
<Notification title="Blur" transition="blur">New activity</Notification>
<Notification title="Bounce" transition="bounce">New activity</Notification>
<Notification title="Drop" transition="drop" transitionDuration={700}>New activity</Notification>

<Notification title="Lift" hoverEffect="lift">New activity</Notification>
<Notification title="Glow" hoverEffect="glow">New activity</Notification>
<Notification title="Shine" hoverEffect="shine">New activity</Notification>
<Notification title="Tilt" hoverEffect="tilt">New activity</Notification>`,
              js: `<l-notification title="Fade" transition="fade">New activity</l-notification>
<l-notification title="Slide up" transition="slide-up">New activity</l-notification>
<l-notification title="Slide right" transition="slide-right" transitionDelay="100">New activity</l-notification>
<l-notification title="Zoom" transition="zoom">New activity</l-notification>
<l-notification title="Flip" transition="flip">New activity</l-notification>
<l-notification title="Blur" transition="blur">New activity</l-notification>
<l-notification title="Bounce" transition="bounce">New activity</l-notification>
<l-notification title="Drop" transition="drop" transitionDuration="700">New activity</l-notification>

<l-notification title="Lift" hoverEffect="lift">New activity</l-notification>
<l-notification title="Glow" hoverEffect="glow">New activity</l-notification>
<l-notification title="Shine" hoverEffect="shine">New activity</l-notification>
<l-notification title="Tilt" hoverEffect="tilt">New activity</l-notification>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-notification title="Fade" transition="fade">New activity</l-notification>
  <l-notification title="Slide up" transition="slide-up">New activity</l-notification>
  <l-notification title="Slide right" transition="slide-right" transitionDelay="100">New activity</l-notification>
  <l-notification title="Zoom" transition="zoom">New activity</l-notification>
  <l-notification title="Flip" transition="flip">New activity</l-notification>
  <l-notification title="Blur" transition="blur">New activity</l-notification>
  <l-notification title="Bounce" transition="bounce">New activity</l-notification>
  <l-notification title="Drop" transition="drop" transitionDuration="700">New activity</l-notification>

  <l-notification title="Lift" hoverEffect="lift">New activity</l-notification>
  <l-notification title="Glow" hoverEffect="glow">New activity</l-notification>
  <l-notification title="Shine" hoverEffect="shine">New activity</l-notification>
  <l-notification title="Tilt" hoverEffect="tilt">New activity</l-notification>
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
    <l-notification title="Fade" transition="fade">New activity</l-notification>
    <l-notification title="Slide up" transition="slide-up">New activity</l-notification>
    <l-notification title="Slide right" transition="slide-right" transitionDelay="100">New activity</l-notification>
    <l-notification title="Zoom" transition="zoom">New activity</l-notification>
    <l-notification title="Flip" transition="flip">New activity</l-notification>
    <l-notification title="Blur" transition="blur">New activity</l-notification>
    <l-notification title="Bounce" transition="bounce">New activity</l-notification>
    <l-notification title="Drop" transition="drop" transitionDuration="700">New activity</l-notification>

    <l-notification title="Lift" hoverEffect="lift">New activity</l-notification>
    <l-notification title="Glow" hoverEffect="glow">New activity</l-notification>
    <l-notification title="Shine" hoverEffect="shine">New activity</l-notification>
    <l-notification title="Tilt" hoverEffect="tilt">New activity</l-notification>
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
