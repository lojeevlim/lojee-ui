import { useState } from "react";
import { SearchInput, type SearchInputSize } from "./SearchInput/SearchInput";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: SearchInputSize[] = ["sm", "md", "lg"];

export default function SearchInputPlayground() {
  const [size, setSize] = useState<SearchInputSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("lojee-ui");

  const preview = (
    <div className="max-w-sm w-full">
      <SearchInput
        size={size}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        placeholder="Search…"
      />
    </div>
  );

  const code = `const [value, setValue] = useState("${value}");

<SearchInput
  size="${size}"${disabled ? "\n  disabled" : ""}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue("")}
  placeholder="Search…"
/>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Value</span>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Search value"
        />
      </div>

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
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
