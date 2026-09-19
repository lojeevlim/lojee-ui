import { useState } from "react";
import { Icon } from "./Icons/Icon";
import { ICON_NAMES } from "./Icons/registry";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";

const SIZES = [16, 20, 24, 32, 48] as const;
const COLOR_CLASSES = ["text-slate-900", "text-indigo-600", "text-emerald-600", "text-rose-600", "text-amber-500"] as const;

export default function IconPlayground() {
  const [name, setName] = useState("settings");
  const [size, setSize] = useState<(typeof SIZES)[number]>(24);
  const [colorClass, setColorClass] = useState<(typeof COLOR_CLASSES)[number]>("text-slate-900");
  const [filter, setFilter] = useState("");

  const filteredNames = filter ? ICON_NAMES.filter((n) => n.includes(filter.toLowerCase())) : ICON_NAMES;

  const preview = <Icon name={name} size={size} className={colorClass} />;
  const code = `<Icon name="${name}" size={${size}}${colorClass !== "text-slate-900" ? ` className="${colorClass}"` : ""} />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Size" options={SIZES.map(String)} value={String(size)} onChange={(v) => setSize(Number(v) as (typeof SIZES)[number])} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Color</span>
        <div className="flex flex-wrap gap-1.5">
          {COLOR_CLASSES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColorClass(c)}
              aria-label={c}
              title={c}
              className={cx(
                "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
                c.replace("text-", "bg-"),
                colorClass === c ? "scale-110 ring-slate-900" : "ring-transparent hover:scale-105"
              )}
            />
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">
          Icon ({filteredNames.length} of {ICON_NAMES.length})
        </span>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name…"
          className="mb-2 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
        />
        <div className="grid max-h-48 grid-cols-6 gap-1.5 overflow-y-auto sm:grid-cols-10">
          {filteredNames.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setName(n)}
              title={n}
              className={cx(
                "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                name === n ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <Icon name={n} size={16} />
            </button>
          ))}
        </div>
      </div>
    </PlaygroundLayout>
  );
}
