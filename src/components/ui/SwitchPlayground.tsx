import { useState } from "react";
import { Switch, type SwitchSize } from "./Switch/Switch";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: SwitchSize[] = ["sm", "md", "lg"];

export default function SwitchPlayground() {
  const [checked, setChecked] = useState(true);
  const [size, setSize] = useState<SwitchSize>("md");
  const [color, setColor] = useState<ColorName>("slate");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Enable notifications");

  const preview = (
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      size={size}
      color={color}
      disabled={disabled}
      label={label || undefined}
    />
  );

  const code = `<Switch size="${size}" color="${color}"${checked ? " defaultChecked" : ""}${disabled ? " disabled" : ""}${
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
          placeholder="Switch label"
        />
      </div>

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
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
