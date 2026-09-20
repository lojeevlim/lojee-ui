import { useState } from "react";
import { Section, type SectionSpacing } from "./Section/Section";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SPACINGS: SectionSpacing[] = ["sm", "md", "lg"];

export default function SectionPlayground() {
  const [spacing, setSpacing] = useState<SectionSpacing>("md");
  const [withTitle, setWithTitle] = useState(true);
  const [withSubtitle, setWithSubtitle] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <div className="w-full rounded-lg border border-dashed border-slate-200">
          <Section
            spacing={spacing}
            title={withTitle ? "Section title" : undefined}
            subtitle={withSubtitle ? "A short supporting description." : undefined}
            className="px-4"
          >
            <div className="rounded-md bg-slate-100 p-3 text-center text-xs text-slate-500">Sample content</div>
          </Section>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Section spacing="${spacing}"${withTitle ? ` title="Section title"` : ""}${
    withSubtitle ? ` subtitle="A short supporting description."` : ""
  }>
  Sample content
</Section>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<Section spacing="${spacing}"${withTitle ? ` title="Section title"` : ""}${
    withSubtitle ? ` subtitle="A short supporting description."` : ""
  }>
  Sample content
</Section>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Spacing" options={SPACINGS} value={spacing} onChange={setSpacing} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setWithTitle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withTitle ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Title
          </button>
          <button
            type="button"
            onClick={() => setWithSubtitle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withSubtitle ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Subtitle
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
