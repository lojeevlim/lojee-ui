import { CODE_FRAMEWORKS, useCodeFramework, type CodeFramework } from "../../core/codeFramework";

export type HeaderNavKey = "docs" | "components" | "playground" | "about";

const NAV_ITEMS: { key: HeaderNavKey; label: string }[] = [
  { key: "docs", label: "Docs" },
  { key: "components", label: "Components" },
//   { key: "playground", label: "Playground" },
  { key: "about", label: "About" },
];

export interface HeaderProps {
  activeNav?: HeaderNavKey;
  onNavChange?: (nav: HeaderNavKey) => void;
}

export default function Header({ activeNav = "components", onNavChange }: HeaderProps) {
  const { framework, setFramework } = useCodeFramework();

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        {/* <span className="text-lg font-semibold text-slate-900">Brandly</span> */}

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavChange?.(item.key)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                activeNav === item.key
                  ? "bg-slate-100 text-slate-900 font-medium"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="code-framework-select">
            Code example language
          </label>
          <select
            id="code-framework-select"
            value={framework}
            onChange={(e) => setFramework(e.target.value as CodeFramework)}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            {CODE_FRAMEWORKS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>

          {/* CTA */}
          <button
            type="button"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
