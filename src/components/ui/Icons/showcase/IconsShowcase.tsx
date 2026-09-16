import { useState } from "react";
import { Icon } from "../Icon";
import { ICON_NAMES } from "../registry";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function IconsShowcase() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(name);
      setTimeout(() => setCopied((current) => (current === name ? null : current)), 1200);
    } catch {
      /* clipboard unavailable in this context — silently ignore */
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Icons</h1>
          <p className="text-sm text-slate-500 mt-1">
            Every icon registered in <code className="text-xs">src/core/icons.ts</code> — click one to copy its
            name. Used as a plain string via <code className="text-xs">icon="name"</code> on any component that
            supports an icon prop.
          </p>
        </div>

        <section>
          <SectionLabel sub={`${ICON_NAMES.length} icons available.`}>Icon set</SectionLabel>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {ICON_NAMES.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => handleCopy(name)}
                title={name}
                className="flex flex-col items-center gap-1.5 rounded-lg border border-slate-200 p-3 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <Icon name={name} size={20} />
                <span className="w-full truncate text-[10px] text-slate-500">
                  {copied === name ? "Copied!" : name}
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
