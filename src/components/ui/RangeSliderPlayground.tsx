import { useState } from "react";
import { RangeSlider } from "./RangeSlider/RangeSlider";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

export default function RangeSliderPlayground() {
  const [color, setColor] = useState<ColorName>("slate");
  const [showValue, setShowValue] = useState(true);
  const [value, setValue] = useState<[number, number]>([20, 70]);

  const preview = (
    <div className="w-64">
      <RangeSlider color={color} showValue={showValue} value={value} onChange={setValue} />
    </div>
  );

  const code = `<RangeSlider color="${color}"${showValue ? " showValue" : ""} value={[${value[0]}, ${value[1]}]} onChange={setValue} />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
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
