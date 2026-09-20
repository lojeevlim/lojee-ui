import { SuccessState } from "../SuccessState";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SuccessStateShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Success State</h1>
          <p className="text-sm text-slate-500 mt-1">
            An emerald-toned placeholder for a completed action — an icon, a title, an optional description, and an
            optional action.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title and icon.">Basic</SectionLabel>
          <SuccessState />
          <CodeBlock
            variants={{
              react: `<SuccessState />`,
              js: `<SuccessState />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<SuccessState />`,
              angular: `<SuccessState />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <SuccessState>Your payment was processed successfully.</SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState>\n  Your payment was processed successfully.\n</SuccessState>`,
              js: `<SuccessState>
  Your payment was processed successfully.
</SuccessState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<SuccessState>\n  Your payment was processed successfully.\n</SuccessState>`,
              angular: `<SuccessState>\n  Your payment was processed successfully.\n</SuccessState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give people a next step with an action below the description.">With action</SectionLabel>
          <SuccessState title="You're all set" action={<Button label="View details" />}>
            Your account has been created successfully.
          </SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState
  title="You're all set"
  action={<Button label="View details" onClick={handleViewDetails} />}
>
  Your account has been created successfully.
</SuccessState>`,
              js: `<SuccessState title="You're all set">
  Your account has been created successfully.
  <Button slot="action" label="View details" id="view-details-btn" />
</SuccessState>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("view-details-btn").addEventListener("click", () => {
    /* navigate to details */
  });
</script>`,
              vue: `<template>
  <SuccessState title="You're all set">
    Your account has been created successfully.
    <Button slot="action" label="View details" @click="handleViewDetails" />
  </SuccessState>
</template>

<script setup>
import "lojee-ui/elements";

const handleViewDetails = () => {
  /* navigate to details */
};
</script>`,
              angular: `<!-- app.component.html -->
<SuccessState title="You're all set">
  Your account has been created successfully.
  <Button slot="action" label="View details" (click)="handleViewDetails()" />
</SuccessState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default title for a more specific confirmation.">Custom title</SectionLabel>
          <SuccessState title="Changes saved">Your changes have been saved and applied.</SuccessState>
          <CodeBlock
            variants={{
              react: `<SuccessState title="Changes saved">\n  Your changes have been saved and applied.\n</SuccessState>`,
              js: `<SuccessState title="Changes saved">
  Your changes have been saved and applied.
</SuccessState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<SuccessState title="Changes saved">\n  Your changes have been saved and applied.\n</SuccessState>`,
              angular: `<SuccessState title="Changes saved">\n  Your changes have been saved and applied.\n</SuccessState>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
