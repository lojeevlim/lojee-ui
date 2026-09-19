import { useState } from "react";
import { Slider } from "./Slider/Slider";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function SliderPlayground() {
  const [color, setColor] = useState<ColorName>("slate");
  const [showValue, setShowValue] = useState(true);
  const [value, setValue] = useState(50);

  const preview = (
    <div className="w-64">
      <Slider color={color} showValue={showValue} value={value} onChange={(e) => setValue(Number(e.target.value))} />
    </div>
  );

  const code = `<Slider color="${color}"${showValue ? " showValue" : ""} value={${value}} onChange={(e) => setValue(Number(e.target.value))} />`;

  // `value` on <Slider> is a plain string/number prop (not an array like
  // RangeSlider's), and there are no min/max/step controls here, so
  // everything is a plain attribute. `showValue` needs an explicit "true"
  // since r2wc parses a bare attribute as false.
  const htmlMarkup = `<Slider color="${color}"${
    showValue ? ` showValue` : ""
  } value="${value}" />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setShowValue((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (showValue ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Show value
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
