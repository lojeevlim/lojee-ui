import { useState } from "react";
import { Badge, type BadgeVariant, type BadgeSize } from "./Badge/Badge";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useAnimation } from "./playgroundAnimation";
import { useMotion } from "./playgroundMotion";

const VARIANTS: BadgeVariant[] = ["solid", "outline", "soft"];
const SIZES: BadgeSize[] = ["xs", "sm", "md", "lg"];

export default function BadgePlayground() {
  const anim = useAnimation();
  const motion = useMotion();
  const [variant, setVariant] = useState<BadgeVariant>("soft");
  const [color, setColor] = useState<ColorName>("accent");
  const [size, setSize] = useState<BadgeSize>("md");
  const [icon, setIcon] = useState(false);
  const [dot, setDot] = useState(false);
  const [label, setLabel] = useState("Badge");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Badge key={motion.replayKey} {...anim.props} {...motion.props} variant={variant} color={color} size={size} dot={dot} icon={icon ? "check" : undefined} label={label || "Badge"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Badge variant="${variant}" color="${color}" size="${size}"${anim.attrs}${motion.attrs}${dot ? " dot" : ""}${
    icon && !dot ? ` icon="check"` : ""
  }${dot ? "" : ` label="${label || "Badge"}"`} />`;

  // Custom-element markup for the current configuration — plain literal
  // attributes are enough for a static snapshot; boolean props must be
  // written as explicit `="true"` since r2wc treats a bare attribute as "".
  const htmlMarkup = `<l-Badge variant="${variant}" color="${color}" size="${size}"${anim.attrs}${motion.attrs}${
    dot ? ` dot` : ""
  }${icon && !dot ? ` icon="check"` : ""}${dot ? "" : ` label="${label || "Badge"}"`} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      {!dot && (
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
            placeholder="Badge label"
          />
        </div>
      )}

      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setDot((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (dot ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Dot only
          </button>
          {!dot && (
            <button
              type="button"
              onClick={() => setIcon((v) => !v)}
              className={
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
                (icon ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
              }
            >
              With icon
            </button>
          )}
        </div>
      </div>
      {anim.controls}
      {motion.controls}
    </PlaygroundLayout>
  );
}
