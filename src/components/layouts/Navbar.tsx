import { Navbar as UINavbar, type NavbarItemSpec } from "../ui/Navbar/Navbar";
import { SideToggle } from "../ui/AppLayout/App";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ThemeSwitcher } from "../ui/ThemeSwitcher/ThemeSwitcher";
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
  const navItems: NavbarItemSpec[] = NAV_LABELS.map((label) => ({ label, icon: NAV_ICONS[label], tooltip: label, active: label === KEY_TO_LABEL[activeNav] }));

  return (
    <UINavbar
      color="accent"
      // variant="elevated" 
      // transition="bounce"
      brand={
        <>
          {showSideToggle && <SideToggle />}
          <button type="button" onClick={() => navigate("/")} aria-label="lojeeUI home" className="rounded-md px-1 py-1 transition-opacity hover:opacity-80 max-sm:hidden">
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
      // Below `sm` each link is icon-only (its label stays as screen-reader text); from `sm` up the
      // icon is hidden and the links are text-only as before. On phones the equal-width columns give way to
      // content-sized ones.
      classNames={{
        root: "h-16 gap-1 px-2 py-0 sm:gap-4 sm:px-8 max-sm:[&>div:first-child]:gap-0 max-sm:[&>div:first-child]:min-w-0",
        actions: "max-sm:gap-1",
        links:
          "auto-cols-auto gap-1 max-sm:gap-0 max-sm:[&_a]:px-2.5 max-sm:[&_button]:px-2.5 max-sm:[&_a>span]:sr-only max-sm:[&_button>span]:sr-only sm:[&_svg]:hidden",
      }}
      actions={
        <>
          <ThemeSwitcher transition="bounce" />
          <CodeFrameworkSwitcher  />

          <SearchMenu />
        </>
      }
    />
  );
}
