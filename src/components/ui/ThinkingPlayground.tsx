import { useState } from "react";
import { Thinking, type ThinkingSize, type ThinkingVariant } from "./Thinking/Thinking";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: ThinkingVariant[] = ["dots", "wave", "orb", "shimmer"];
const SIZES: ThinkingSize[] = ["sm", "md", "lg"];
const STEPS = ["Reading the question", "Searching the docs", "Writing the answer"];
const ON_OFF = ["on", "off"] as const;

export default function ThinkingPlayground() {
  const motion = useMotion({ hover: false });
  const [variant, setVariant] = useState<ThinkingVariant>("dots");
  const [size, setSize] = useState<ThinkingSize>("md");
  const [color, setColor] = useState<ColorName>("accent");
  const [label, setLabel] = useState("Thinking");
  const [useSteps, setUseSteps] = useState(false);
  const [showElapsed, setShowElapsed] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Thinking
          key={motion.replayKey}
          {...motion.props}
          variant={variant}
          size={size}
          color={color}
          label={label || "Thinking"}
          steps={useSteps ? STEPS : undefined}
          showElapsed={showElapsed}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const attrs =
    (variant !== "dots" ? ` variant="${variant}"` : "") +
    (size !== "md" ? ` size="${size}"` : "") +
    (color !== "accent" ? ` color="${color}"` : "") +
    (!useSteps && label && label !== "Thinking" ? ` label="${label}"` : "") +
    (showElapsed ? " showElapsed" : "") +
    motion.attrs;
  const code = `<Thinking${useSteps ? `\n  steps={${JSON.stringify(STEPS)}}\n ` : ""}${attrs} />`;
  const htmlMarkup = `<l-Thinking${useSteps ? ` steps='${JSON.stringify(STEPS)}'` : ""}${attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
        <input
          value={label}
          disabled={useSteps}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong disabled:opacity-40"
          placeholder="Thinking"
        />
      </div>
      <OptionGroup label="Rotating steps" options={ON_OFF} value={useSteps ? "on" : "off"} onChange={(v) => setUseSteps(v === "on")} />
      <OptionGroup label="Elapsed timer" options={ON_OFF} value={showElapsed ? "on" : "off"} onChange={(v) => setShowElapsed(v === "on")} />
      <ColorSwatches value={color} onChange={setColor} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
