import { useState } from "react";
import { Badge, type BadgeVariant, type BadgeSize } from "./Badge/Badge";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: BadgeVariant[] = ["solid", "outline", "soft"];
const SIZES: BadgeSize[] = ["sm", "md", "lg"];

export default function BadgePlayground() {
  const [variant, setVariant] = useState<BadgeVariant>("soft");
  const [color, setColor] = useState<ColorName>("slate");
  const [size, setSize] = useState<BadgeSize>("md");
  const [icon, setIcon] = useState(false);
  const [dot, setDot] = useState(false);
  const [label, setLabel] = useState("Badge");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Badge variant={variant} color={color} size={size} dot={dot} icon={icon ? "check" : undefined} label={label || "Badge"} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Badge variant="${variant}" color="${color}" size="${size}"${dot ? " dot" : ""}${
    icon && !dot ? ` icon="check"` : ""
  }${dot ? "" : ` label="${label || "Badge"}"`} />`;

  // Custom-element markup for the current configuration — plain literal
  // attributes are enough for a static snapshot; boolean props must be
  // written as explicit `="true"` since r2wc treats a bare attribute as "".
  const htmlMarkup = `<Badge variant="${variant}" color="${color}" size="${size}"${
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
          <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
            placeholder="Badge label"
          />
        </div>
      )}

      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setDot((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (dot ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
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
                (icon ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
              }
            >
              With icon
            </button>
          )}
        </div>
      </div>
    </PlaygroundLayout>
  );
}
