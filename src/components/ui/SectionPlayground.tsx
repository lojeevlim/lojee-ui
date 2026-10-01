import { useState } from "react";
import { Section, type SectionSpacing } from "./Section/Section";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SPACINGS: SectionSpacing[] = ["sm", "md", "lg"];

export default function SectionPlayground() {
  const motion = useMotion({ hover: false });
  const [spacing, setSpacing] = useState<SectionSpacing>("md");
  const [withTitle, setWithTitle] = useState(true);
  const [withSubtitle, setWithSubtitle] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <div className="w-full rounded-lg border border-dashed border-border">
          <Section
            key={motion.replayKey}
            {...motion.props}
            spacing={spacing}
            title={withTitle ? "Section title" : undefined}
            subtitle={withSubtitle ? "A short supporting description." : undefined}
            className="px-4"
          >
            <div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">Sample content</div>
          </Section>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Section spacing="${spacing}"${motion.attrs}${withTitle ? ` title="Section title"` : ""}${
    withSubtitle ? ` subtitle="A short supporting description."` : ""
  }>
  Sample content
</Section>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-Section spacing="${spacing}"${motion.attrs}${withTitle ? ` title="Section title"` : ""}${
    withSubtitle ? ` subtitle="A short supporting description."` : ""
  }>
  Sample content
</l-Section>`;

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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setWithTitle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withTitle ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Title
          </button>
          <button
            type="button"
            onClick={() => setWithSubtitle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withSubtitle ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Subtitle
          </button>
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
