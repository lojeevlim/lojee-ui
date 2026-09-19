import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "./MultiSelect/MultiSelect";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const OPTIONS: MultiSelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Mango", value: "mango" },
  { label: "Papaya", value: "papaya", disabled: true },
  { label: "Watermelon", value: "watermelon" },
];

export default function MultiSelectPlayground() {
  const [value, setValue] = useState<string[]>(["banana"]);
  const [color, setColor] = useState<ColorName>("slate");
  const [placeholder, setPlaceholder] = useState("Select fruits...");

  const preview = (
    <div className="w-full max-w-xs">
      <MultiSelect options={OPTIONS} value={value} onChange={setValue} color={color} placeholder={placeholder} />
    </div>
  );

  const code = `<MultiSelect
  options={options}
  value={${JSON.stringify(value)}}
  onChange={setValue}
  color="${color}"
  placeholder="${placeholder}"
/>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Placeholder</span>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Placeholder text"
        />
      </div>

      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Selected</span>
        <div className="flex flex-wrap gap-1.5">
          {value.length === 0 && <span className="text-xs text-slate-400">None</span>}
          {value.map((v) => (
            <span key={v} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {v}
            </span>
          ))}
        </div>
      </div>
    </PlaygroundLayout>
  );
}
