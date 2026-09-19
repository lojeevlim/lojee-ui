import { useState } from "react";
import { Checkbox } from "./Checkbox/Checkbox";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

export default function CheckboxPlayground() {
  const [checked, setChecked] = useState(true);
  const [color, setColor] = useState<ColorName>("slate");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Accept terms and conditions");

  const preview = (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      color={color}
      disabled={disabled}
      label={label || undefined}
    />
  );

  const code = `<Checkbox color="${color}"${checked ? " defaultChecked" : ""}${disabled ? " disabled" : ""}${
    label ? ` label="${label}"` : ""
  } />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Checkbox label"
        />
      </div>

      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setChecked((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (checked ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Checked
          </button>
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Disabled
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
