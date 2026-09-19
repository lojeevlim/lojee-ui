import { LoadingState } from "../LoadingState";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function LoadingStateShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Loading State</h1>
          <p className="text-sm text-slate-500 mt-1">
            A placeholder for a section that's still loading — a spinner, a title, and an optional description.
          </p>
        </div>

        <section>
          <SectionLabel sub="Uses the default title.">Basic</SectionLabel>
          <LoadingState />
          <CodeBlock
            variants={{
              react: `<LoadingState />`,
              js: `<LoadingState />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<LoadingState />`,
              angular: `<LoadingState />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Add a description below the title for more context.">With description</SectionLabel>
          <LoadingState title="Fetching your data">This should only take a moment.</LoadingState>
          <CodeBlock
            variants={{
              react: `<LoadingState title="Fetching your data">\n  This should only take a moment.\n</LoadingState>`,
              js: `<LoadingState title="Fetching your data">
  This should only take a moment.
</LoadingState>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<LoadingState title="Fetching your data">\n  This should only take a moment.\n</LoadingState>`,
              angular: `<LoadingState title="Fetching your data">\n  This should only take a moment.\n</LoadingState>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Three sizes, mapped onto Spinner's own size scale.">Sizes</SectionLabel>
          <Row>
            <LoadingState size="sm" title="Loading" />
            <LoadingState size="md" title="Loading" />
            <LoadingState size="lg" title="Loading" />
          </Row>
          <CodeBlock
            variants={{
              react: `<LoadingState size="sm" title="Loading" />
<LoadingState size="md" title="Loading" />
<LoadingState size="lg" title="Loading" />`,
              js: `<LoadingState size="sm" title="Loading" />
<LoadingState size="md" title="Loading" />
<LoadingState size="lg" title="Loading" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<LoadingState size="sm" title="Loading" />
<LoadingState size="md" title="Loading" />
<LoadingState size="lg" title="Loading" />`,
              angular: `<LoadingState size="sm" title="Loading" />
<LoadingState size="md" title="Loading" />
<LoadingState size="lg" title="Loading" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
