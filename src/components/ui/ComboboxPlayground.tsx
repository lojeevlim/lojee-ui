import { useState } from "react";
import { Combobox, type ComboboxOption } from "./Combobox/Combobox";
import { PlaygroundLayout } from "./PlaygroundHelpers";

const OPTIONS: ComboboxOption[] = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Manila", value: "manila" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Seoul", value: "seoul" },
  { label: "Jakarta", value: "jakarta" },
  { label: "Kuala Lumpur", value: "kuala-lumpur" },
  { label: "Hong Kong", value: "hong-kong" },
];

export default function ComboboxPlayground() {
  const [value, setValue] = useState<string | undefined>("manila");
  const [placeholder, setPlaceholder] = useState("Search a city...");

  const preview = (
    <div className="w-full max-w-xs">
      <Combobox options={OPTIONS} value={value} onChange={setValue} placeholder={placeholder} />
    </div>
  );

  const code = `<Combobox
  options={options}
  value={${value ? `"${value}"` : "undefined"}}
  onChange={setValue}
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

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Selected value</span>
        <span className="text-sm text-slate-700">{value ?? <span className="text-slate-400">None</span>}</span>
      </div>
    </PlaygroundLayout>
  );
}
