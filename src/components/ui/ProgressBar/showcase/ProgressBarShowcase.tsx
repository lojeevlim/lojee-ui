import { ProgressBar } from "../ProgressBar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function ProgressBarShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Progress Bar</h1>
          <p className="text-sm text-slate-500 mt-1">
            A simple, non-slotted progress indicator for showing determinate or indeterminate progress.
          </p>
        </div>

        <section>
          <SectionLabel sub="size controls the track height.">Sizes</SectionLabel>
          <div className="flex flex-col gap-4">
            <ProgressBar value={40} size="sm" />
            <ProgressBar value={60} size="md" />
            <ProgressBar value={80} size="lg" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={40} size="sm" />
<ProgressBar value={60} size="md" />
<ProgressBar value={80} size="lg" />`,
              js: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />`,
              angular: `<l-ProgressBar value="40" size="sm" />
<l-ProgressBar value="60" size="md" />
<l-ProgressBar value="80" size="lg" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="color picks from the shared palette.">Colors</SectionLabel>
          <div className="flex flex-col gap-4">
            <ProgressBar value={70} color="indigo" />
            <ProgressBar value={55} color="emerald" />
            <ProgressBar value={30} color="rose" />
          </div>
          <CodeBlock
            variants={{
              react: `<ProgressBar value={70} color="indigo" />
<ProgressBar value={55} color="emerald" />
<ProgressBar value={30} color="rose" />`,
              js: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />`,
              angular: `<l-ProgressBar value="70" color="indigo" />
<l-ProgressBar value="55" color="emerald" />
<l-ProgressBar value="30" color="rose" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A diagonal-stripe texture on the filled bar.">Striped</SectionLabel>
          <ProgressBar value={65} striped color="blue" />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={65} striped color="blue" />`,
              js: `<l-ProgressBar value="65" striped color="blue" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="65" striped color="blue" />`,
              angular: `<l-ProgressBar value="65" striped color="blue" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="An animated sweeping bar for unknown-duration loading.">Indeterminate</SectionLabel>
          <ProgressBar indeterminate />
          <CodeBlock
            variants={{
              react: `<ProgressBar indeterminate />`,
              js: `<l-ProgressBar indeterminate />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar indeterminate />`,
              angular: `<l-ProgressBar indeterminate />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current percentage as text.">With label</SectionLabel>
          <ProgressBar value={45} showLabel color="violet" />
          <CodeBlock
            variants={{
              react: `<ProgressBar value={45} showLabel color="violet" />`,
              js: `<l-ProgressBar value="45" showLabel color="violet" />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-ProgressBar value="45" showLabel color="violet" />`,
              angular: `<l-ProgressBar value="45" showLabel color="violet" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
