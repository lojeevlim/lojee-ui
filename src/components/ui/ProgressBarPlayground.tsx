import { useState } from "react";
import { ProgressBar, type ProgressBarSize } from "./ProgressBar/ProgressBar";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: ProgressBarSize[] = ["sm", "md", "lg"];

export default function ProgressBarPlayground() {
  const [value, setValue] = useState(60);
  const [size, setSize] = useState<ProgressBarSize>("md");
  const [color, setColor] = useState<ColorName>("slate");
  const [striped, setStriped] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const preview = (
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
  );

  const sizeAttr = size !== "md" ? ` size="${size}"` : "";
  const colorAttr = color !== "slate" ? ` color="${color}"` : "";
  const stripedAttr = striped ? " striped" : "";
  const showLabelAttr = showLabel ? " showLabel" : "";
  const valueAttr = indeterminate ? "" : ` value={${value}}`;
  const valueAttrHtml = indeterminate ? "" : ` value="${value}"`;
  const indeterminateAttr = indeterminate ? " indeterminate" : "";

  const code = `<ProgressBar${valueAttr}${sizeAttr}${colorAttr}${stripedAttr}${indeterminateAttr}${showLabelAttr} />`;
  const htmlMarkup = `<ProgressBar${valueAttrHtml}${sizeAttr}${colorAttr}${stripedAttr}${indeterminateAttr}${showLabelAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Value: {value}</span>
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
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Striped</span>
        <button
          type="button"
          onClick={() => setStriped((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (striped ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {striped ? "On" : "Off"}
        </button>
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Indeterminate</span>
        <button
          type="button"
          onClick={() => setIndeterminate((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (indeterminate ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {indeterminate ? "On" : "Off"}
        </button>
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Show label</span>
        <button
          type="button"
          onClick={() => setShowLabel((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (showLabel ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {showLabel ? "On" : "Off"}
        </button>
      </div>
    </PlaygroundLayout>
  );
}
