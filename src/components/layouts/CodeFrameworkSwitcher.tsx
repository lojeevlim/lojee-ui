import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Code2 } from "lucide-react";
import { CODE_FRAMEWORKS, CODE_FRAMEWORK_LABEL, useCodeFramework } from "../../core/codeFramework";

/** Dropdown for which language/framework the code examples show — same menu style as ThemeSwitcher. */
export default function CodeFrameworkSwitcher() {
  const { framework, setFramework } = useCodeFramework();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Code example language"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-fg/10"
      >
        <Code2 size={16} className="text-accent-600 dark:text-accent-400" />
        <span>{CODE_FRAMEWORK_LABEL[framework]}</span>
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Code example language"
          className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-surface-raised p-2 shadow-lg"
        >
          <p className="px-2 pb-1 pt-1 text-xs font-semibold text-fg-subtle">Code examples</p>
          <ul>
            {CODE_FRAMEWORKS.map(({ value, label }) => {
              const active = framework === value;
              return (
                <li key={value}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => {
                      setFramework(value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-muted ${
                      active ? "bg-surface-muted font-medium text-fg" : "text-fg-muted"
                    }`}
                  >
                    <span className="flex-1 truncate">{label}</span>
                    <Check size={14} className={`shrink-0 text-accent-600 dark:text-accent-400 ${active ? "visible" : "invisible"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
