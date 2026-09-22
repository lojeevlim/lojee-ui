import { useState } from "react";
import { Notification } from "../Notification";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function NotificationShowcase() {
  const [dismissibleVisible, setDismissibleVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Notification</h1>
          <p className="text-sm text-slate-500 mt-1">
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
              js: `<l-Notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-Notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-Notification>`,
              angular: `<l-Notification title="New comment" icon="mail">
  Alex left a comment on your document.
</l-Notification>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A small indigo dot next to the title marks it unread.">Unread</SectionLabel>
          <Notification title="New follower" unread>
            Jordan started following you.
          </Notification>
          <CodeBlock
            variants={{
              react: `<Notification title="New follower" unread>
  Jordan started following you.
</Notification>`,
              js: `<l-Notification title="New follower" unread>
  Jordan started following you.
</l-Notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Notification title="New follower" unread>
  Jordan started following you.
</l-Notification>`,
              angular: `<l-Notification title="New follower" unread>
  Jordan started following you.
</l-Notification>`,
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
              js: `<l-Notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-Notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-Notification>`,
              angular: `<l-Notification title="Deploy finished" timestamp="2m ago">
  Your latest deploy to production finished successfully.
</l-Notification>`,
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
              js: `<l-Notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <div slot="actions">
    <l-Button size="sm" label="Accept"></l-Button>
    <l-Button size="sm" variant="outline" label="Decline"></l-Button>
  </div>
</l-Notification>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <template #actions>
    <l-Button size="sm" label="Accept" />
    <l-Button size="sm" variant="outline" label="Decline" />
  </template>
</l-Notification>`,
              angular: `<l-Notification title="Team invite" timestamp="10m ago" unread>
  Priya invited you to join the "Design" team.
  <div slot="actions">
    <l-Button size="sm" label="Accept"></l-Button>
    <l-Button size="sm" variant="outline" label="Decline"></l-Button>
  </div>
</l-Notification>`,
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
              className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
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
              js: `<l-Notification title="Storage almost full" id="storage-notification">
  You're using 92% of your available storage.
</l-Notification>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("storage-notification")
    .addEventListener("dismiss", (e) => { e.target.remove(); });
</script>`,
              vue: `<template>
  <l-Notification v-if="visible" title="Storage almost full" @dismiss="visible = false">
    You're using 92% of your available storage.
  </l-Notification>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const visible = ref(true);
</script>`,
              angular: `<l-Notification *ngIf="visible" title="Storage almost full" (dismiss)="visible = false">
  You're using 92% of your available storage.
</l-Notification>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
