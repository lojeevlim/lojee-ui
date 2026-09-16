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

        {/* CTA */}
        <button
          type="button"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Search
        </button>
      </div>
    </header>
  );
}
