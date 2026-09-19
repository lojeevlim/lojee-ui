import { useState } from "react";
import { Alert } from "../Alert";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function AlertShowcase() {
  const [closableVisible, setClosableVisible] = useState(true);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Alert</h1>
          <p className="text-sm text-slate-500 mt-1">
            An inline, non-dismissing-by-default banner message for surfacing status, feedback, or warnings inline
            in a page.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each variant carries its own color treatment and default icon.">Variants</SectionLabel>
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="Heads up">
              This is an informational message.
            </Alert>
            <Alert variant="success" title="Saved">
              Your changes have been saved.
            </Alert>
            <Alert variant="warning" title="Careful">
              This action may have unintended side effects.
            </Alert>
            <Alert variant="error" title="Something went wrong">
              We couldn't process your request. Please try again.
            </Alert>
          </div>
          <CodeBlock
            variants={{
              react: `<Alert variant="info" title="Heads up">This is an informational message.</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="warning" title="Careful">This action may have unintended side effects.</Alert>
<Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</Alert>`,
              js: `<Alert variant="info" title="Heads up">This is an informational message.</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="warning" title="Careful">This action may have unintended side effects.</Alert>
<Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<Alert variant="info" title="Heads up">This is an informational message.</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="warning" title="Careful">This action may have unintended side effects.</Alert>
<Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</Alert>`,
              angular: `<Alert variant="info" title="Heads up">This is an informational message.</Alert>
<Alert variant="success" title="Saved">Your changes have been saved.</Alert>
<Alert variant="warning" title="Careful">This action may have unintended side effects.</Alert>
<Alert variant="error" title="Something went wrong">We couldn't process your request. Please try again.</Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Title is optional — omit it for a compact, single-line alert.">Without a title</SectionLabel>
          <Alert variant="info">A new version is available. Refresh to update.</Alert>
          <CodeBlock
            variants={{
              react: `<Alert variant="info">A new version is available. Refresh to update.</Alert>`,
              js: `<Alert variant="info">A new version is available. Refresh to update.</Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<Alert variant="info">A new version is available. Refresh to update.</Alert>`,
              angular: `<Alert variant="info">A new version is available. Refresh to update.</Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set closable and handle onClose to let the user dismiss it.">Closable</SectionLabel>
          {closableVisible ? (
            <Alert variant="warning" title="Unsaved changes" closable onClose={() => setClosableVisible(false)}>
              You have unsaved changes that will be lost if you navigate away.
            </Alert>
          ) : (
            <button
              type="button"
              onClick={() => setClosableVisible(true)}
              className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
            >
              Show alert again
            </button>
          )}
          <CodeBlock
            variants={{
              react: `const [visible, setVisible] = useState(true);

{visible && (
  <Alert variant="warning" title="Unsaved changes" closable onClose={() => setVisible(false)}>
    You have unsaved changes that will be lost if you navigate away.
  </Alert>
)}`,
              js: `<Alert variant="warning" title="Unsaved changes" closable id="unsaved-alert">
  You have unsaved changes that will be lost if you navigate away.
</Alert>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("unsaved-alert")
    .addEventListener("close", (e) => { e.target.remove(); });
</script>`,
              vue: `<template>
  <Alert
    v-if="visible"
    variant="warning"
    title="Unsaved changes"
    closable
    @close="visible = false"
  >
    You have unsaved changes that will be lost if you navigate away.
  </Alert>
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const visible = ref(true);
</script>`,
              angular: `<Alert
  *ngIf="visible"
  variant="warning"
  title="Unsaved changes"
  closable
  (close)="visible = false"
>
  You have unsaved changes that will be lost if you navigate away.
</Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default per-variant icon, or hide it entirely.">Custom icon</SectionLabel>
          <div className="flex flex-col gap-3">
            <Alert variant="info" title="New feature" icon="bell">
              We just shipped keyboard shortcuts. Press "?" to see them.
            </Alert>
            <Alert variant="info" title="No icon" icon={false}>
              This alert renders without a leading icon.
            </Alert>
          </div>
          <CodeBlock
            variants={{
              react: `<Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</Alert>
<Alert variant="info" title="No icon" icon={false}>
  This alert renders without a leading icon.
</Alert>`,
              js: `<Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</Alert>
<Alert variant="info" title="No icon" icon="false">
  This alert renders without a leading icon.
</Alert>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</Alert>
<Alert variant="info" title="No icon" :icon="false">
  This alert renders without a leading icon.
</Alert>`,
              angular: `<Alert variant="info" title="New feature" icon="bell">
  We just shipped keyboard shortcuts. Press "?" to see them.
</Alert>
<Alert variant="info" title="No icon" [icon]="false">
  This alert renders without a leading icon.
</Alert>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Per-part class overrides via classNames.">Custom styling</SectionLabel>
          <Alert
            variant="info"
            title="Styled alert"
            classNames={{
              root: "border-indigo-200 bg-indigo-50 text-indigo-900",
              icon: "text-indigo-500",
            }}
          >
            This alert's border, background, and icon pick up custom colors via classNames.
          </Alert>
          <CodeBlock
            variants={{
              react: `<Alert
  variant="info"
  title="Styled alert"
  classNames={{
    root: "border-indigo-200 bg-indigo-50 text-indigo-900",
    icon: "text-indigo-500",
  }}
>
  This alert's border, background, and icon pick up custom colors via classNames.
</Alert>`,
              js: `<Alert id="styled-alert" variant="info" heading="Styled alert">
  This alert's border, background, and icon pick up custom colors via classNames.
</Alert>

<script type="module">
  document.getElementById("styled-alert").classNames = {
    root: "border-indigo-200 bg-indigo-50 text-indigo-900",
    icon: "text-indigo-500",
  };
</script>`,
              vue: `<template>
  <Alert variant="info" heading="Styled alert" :classNames="alertClassNames">
    This alert's border, background, and icon pick up custom colors via classNames.
  </Alert>
</template>

<script setup>
const alertClassNames = {
  root: "border-indigo-200 bg-indigo-50 text-indigo-900",
  icon: "text-indigo-500",
};
</script>`,
              angular: `<Alert variant="info" heading="Styled alert" [classNames]="alertClassNames">
  This alert's border, background, and icon pick up custom colors via classNames.
</Alert>

alertClassNames = {
  root: "border-indigo-200 bg-indigo-50 text-indigo-900",
  icon: "text-indigo-500",
};`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
