import { Navbar as UINavbar, type NavbarItemSpec } from "../ui/Navbar/Navbar";
import { SideToggle } from "../ui/AppLayout/App";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchMenu from "./SearchMenu";
import CodeFrameworkSwitcher from "./CodeFrameworkSwitcher";

export type TopNavKey = "docs" | "components" | "playground" | "about";

// "About" is its own route (see AboutPage.tsx), which renders this Navbar with `activeNav="about"` and no sidebar toggle.
const NAV_LABELS = ["Docs", "Components", "About"];
const NAV_ICONS: Record<string, string> = { Docs: "book-open", Components: "shapes", About: "info" };
const LABEL_TO_KEY: Record<string, TopNavKey> = { Docs: "docs", Components: "components", About: "about" };
const KEY_TO_LABEL: Record<TopNavKey, string> = { docs: "Docs", components: "Components", about: "About", playground: "Components" };

export interface NavbarProps {
  activeNav?: TopNavKey;
  onNavChange?: (nav: TopNavKey) => void;
  /** Show the hamburger that opens the docs sidebar drawer (default true). Pages without a sidebar, like About, turn it off. */
  showSideToggle?: boolean;
}

export default function NavbarLayout({ activeNav = "components", onNavChange, showSideToggle = true }: NavbarProps) {
  // `active` recomputed every render from `activeNav` (not a one-time `defaultActiveItem` + a `key`
  // remount on every change) — this is what lets a route change driven from *outside* this component
  // (e.g. a Sidebar click) resync the active link via the same render-time "explicit active label"
  // sync `UINavbar` already does for Sidebar (see its own doc), without ever tearing this component's
  // DOM down and rebuilding it. Remounting on every `activeNav` change used to also fire on every
  // *internal* click (since a click here changes the URL, which flows straight back into `activeNav`),
  // destroying and recreating the pill's own DOM node before its CSS transition ever got a frame to
  // animate — the click always looked instant, never sliding, no matter how slow the transition was.
  const navigate = useNavigate();
  const navItems: NavbarItemSpec[] = NAV_LABELS.map((label) => ({ label, icon: NAV_ICONS[label], active: label === KEY_TO_LABEL[activeNav] }));

  return (
    <UINavbar
      color="accent"
      brand={
        <>
          {showSideToggle && <SideToggle />}
          <button type="button" onClick={() => navigate("/")} aria-label="lojeeUI home" className="rounded-md px-1 py-1 transition-opacity hover:opacity-80">
            <Logo size={28} className="text-[15px] max-sm:[&>span]:hidden" />
          </button>
        </>
      }
      items={navItems}
      onActiveItemChange={(item) => {
        const key = LABEL_TO_KEY[item.label];
        if (key) onNavChange?.(key);
      }}
      // `bordered` (default true) already gives "light" its own `border-b border-border` divider —
      // just widening the built-in `py-3` to match the old Header's `py-4` here.
      // Below `sm` each link becomes a stacked icon with a small label underneath; from `sm` up the
      // icon is hidden and the links are text-only as before. On phones the equal-width columns give way to
      // content-sized ones (a long label like "Components" would otherwise widen every column).
      classNames={{
        root: "h-16 px-3 py-0 sm:px-6",
        links:
          "max-sm:auto-cols-auto max-sm:gap-0 max-sm:[&_a]:flex-col max-sm:[&_button]:flex-col max-sm:[&_a]:gap-1 max-sm:[&_button]:gap-1 max-sm:[&_a]:px-2 max-sm:[&_button]:px-2 max-sm:[&_a>span]:text-[10px] max-sm:[&_button>span]:text-[10px] max-sm:[&_a>span]:tracking-tight max-sm:[&_button>span]:tracking-tight max-sm:[&_a>span]:leading-none max-sm:[&_button>span]:leading-none sm:[&_svg]:hidden",
      }}
      actions={
        <>
          <ThemeSwitcher />
          <CodeFrameworkSwitcher />

          <SearchMenu />
        </>
      }
    />
  );
}
