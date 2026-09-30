import { useState } from "react";
import { ProgressBar, type ProgressBarSize } from "./ProgressBar/ProgressBar";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: ProgressBarSize[] = ["sm", "md", "lg"];

export default function ProgressBarPlayground() {
  const [value, setValue] = useState(60);
  const [size, setSize] = useState<ProgressBarSize>("md");
  const [color, setColor] = useState<ColorName>("accent");
  const [striped, setStriped] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-sm">
          <ProgressBar
            value={value}
            size={size}
            color={color}
            striped={striped}
            indeterminate={indeterminate}
            showLabel={showLabel}
          />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const sizeAttr = size !== "md" ? ` size="${size}"` : "";
  const colorAttr = color !== "accent" ? ` color="${color}"` : "";
  const stripedAttr = striped ? " striped" : "";
  const showLabelAttr = showLabel ? " showLabel" : "";
  const valueAttr = indeterminate ? "" : ` value={${value}}`;
  const valueAttrHtml = indeterminate ? "" : ` value="${value}"`;
  const indeterminateAttr = indeterminate ? " indeterminate" : "";

  const code = `<ProgressBar${valueAttr}${sizeAttr}${colorAttr}${stripedAttr}${indeterminateAttr}${showLabelAttr} />`;
  const htmlMarkup = `<l-ProgressBar${valueAttrHtml}${sizeAttr}${colorAttr}${stripedAttr}${indeterminateAttr}${showLabelAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Value: {value}</span>
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          disabled={indeterminate}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full disabled:opacity-40"
        />
      </div>
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <ColorSwatches value={color} onChange={setColor} />
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Striped</span>
        <button
          type="button"
          onClick={() => setStriped((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (striped ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
          }
        >
          {striped ? "On" : "Off"}
        </button>
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Indeterminate</span>
        <button
          type="button"
          onClick={() => setIndeterminate((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (indeterminate ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
          }
        >
          {indeterminate ? "On" : "Off"}
        </button>
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Show label</span>
        <button
          type="button"
          onClick={() => setShowLabel((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (showLabel ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
          }
        >
          {showLabel ? "On" : "Off"}
        </button>
      </div>
    </PlaygroundLayout>
  );
}
