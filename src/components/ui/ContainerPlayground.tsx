import { useState } from "react";
import { Container, type ContainerSize } from "./Container/Container";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: ContainerSize[] = ["sm", "md", "lg", "xl", "full"];

export default function ContainerPlayground() {
  const [size, setSize] = useState<ContainerSize>("lg");
  const [centered, setCentered] = useState(true);
  const [padded, setPadded] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <div className="w-full rounded-lg border border-dashed border-border">
          <Container size={size} centered={centered} padded={padded}>
            <div className="rounded-md bg-surface-muted p-3 text-center text-xs text-fg-subtle">Sample content</div>
          </Container>
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Container size="${size}"${centered ? "" : " centered={false}"}${padded ? "" : " padded={false}"}>
  Sample content
</Container>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<l-Container size="${size}"${centered ? "" : ` centered="false"`}${padded ? "" : ` padded="false"`}>
  Sample content
</l-Container>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCentered((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (centered ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Centered
          </button>
          <button
            type="button"
            onClick={() => setPadded((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (padded ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Padded
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
