import { ErrorState } from "../ErrorState";
import { Button } from "../../Buttons/Button";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ErrorStateShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Error State</h1>
          <p className="text-sm text-slate-500 mt-1">
            A rose-toned placeholder for a failed data fetch or action — an icon, a title, an optional description,
            and an optional retry action.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title and icon.">Basic</SectionLabel>
          <ErrorState />
          <CodeBlock
            variants={{
              react: `<ErrorState />`,
              js: `<l-ErrorState />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ErrorState />`,
              angular: `<l-ErrorState />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <ErrorState>We couldn't load your data. Please try again.</ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState>\n  We couldn't load your data. Please try again.\n</ErrorState>`,
              js: `<l-ErrorState>
  We couldn't load your data. Please try again.
</l-ErrorState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ErrorState>\n  We couldn't load your data. Please try again.\n</l-ErrorState>`,
              angular: `<l-ErrorState>\n  We couldn't load your data. Please try again.\n</l-ErrorState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give people a way to recover with a retry action below the description.">
            With retry action
          </SectionLabel>
          <ErrorState action={<Button variant="destructive" icon="refresh-cw" label="Retry" />}>
            We couldn't load your data. Please try again.
          </ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState
  action={<Button variant="destructive" icon="refresh-cw" label="Retry" onClick={handleRetry} />}
>
  We couldn't load your data. Please try again.
</ErrorState>`,
              js: `<l-ErrorState>
  We couldn't load your data. Please try again.
  <l-Button slot="action" variant="destructive" icon="refresh-cw" label="Retry" id="retry-btn" />
</l-ErrorState>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("retry-btn").addEventListener("click", () => {
    /* retry the request */
  });
</script>`,
              vue: `<template>
  <l-ErrorState>
    We couldn't load your data. Please try again.
    <l-Button slot="action" variant="destructive" icon="refresh-cw" label="Retry" @click="handleRetry" />
  </l-ErrorState>
</template>

<script setup>
import "lojee-ui/elements";

const handleRetry = () => {
  /* retry the request */
};
</script>`,
              angular: `<!-- app.component.html -->
<l-ErrorState>
  We couldn't load your data. Please try again.
  <l-Button slot="action" variant="destructive" icon="refresh-cw" label="Retry" (click)="handleRetry()" />
</l-ErrorState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the default title and icon for a more specific error.">
            Custom title &amp; icon
          </SectionLabel>
          <ErrorState title="Connection lost" icon="triangle-alert">
            Check your internet connection and try again.
          </ErrorState>
          <CodeBlock
            variants={{
              react: `<ErrorState title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</ErrorState>`,
              js: `<l-ErrorState title="Connection lost" icon="triangle-alert">
  Check your internet connection and try again.
</l-ErrorState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ErrorState title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</l-ErrorState>`,
              angular: `<l-ErrorState title="Connection lost" icon="triangle-alert">\n  Check your internet connection and try again.\n</l-ErrorState>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
