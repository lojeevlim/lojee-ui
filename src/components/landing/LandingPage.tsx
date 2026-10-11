import { useEffect, useState } from "react";
import { PageScrollbar } from "../ui/DotScroll/PageScrollbar";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import { isScrolling } from "./scrollState";
import { Hero, Why, CodeCompare, Flow, Frameworks, Install, SiteFooter } from "./HomeSections";
import PinnedReels from "./PinnedReels";
import ThemeWipe from "./ThemeWipe";
import Logo from "../layouts/Logo";
import { ThemeSwitcher } from "../ui/ThemeSwitcher/ThemeSwitcher";
import { Button } from "../ui/Buttons/Button";
import { Navbar } from "../ui/Navbar/Navbar";
import { Tooltip } from "../ui/Tooltip/Tooltip";
import { Icon } from "../ui/Icons/Icon";
import { COMPONENT_MENU } from "../../constant/component_menu";
import { pathFor } from "../../core/routes";
import { REPO_URL } from "../../core/repo";

function Nav({ groups, onStart }: { groups: typeof COMPONENT_MENU; onStart: () => void }) {
  const navigate = useNavigate();
  const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Phones only: a short "Change theme" hint on the theme switcher, once per page load (like the docs Playground button's hint).
  const [isMobile, setIsMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const [themeHint, setThemeHint] = useState(false);
  useEffect(() => {
    const show = window.setTimeout(() => setThemeHint(true), 1800);
    const hide = window.setTimeout(() => setThemeHint(false), 8500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);
  // The shared Navbar does the sticky bar itself: transparent at the top, solid once the page scrolls, and the
  // accent glow along the bottom edge while scrolling. Only the content (logo, links, actions) is landing-specific.
  return (
    <Navbar
      sticky
      bordered={false}
      scrollBackground
      scrollGlow
      // Keeps the old centered `max-w-6xl` content width at any viewport.
      className="px-5 md:px-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]"
      brand={
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" })} className="group" aria-label="lojeeUI — back to top">
          <Logo className="[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:rotate-6 group-hover:[&_svg]:scale-105" />
        </button>
      }
      actions={
        <>
          {isMobile ? (
            <Tooltip content="Change theme" position="bottom" color="accent" open={themeHint}>
              <ThemeSwitcher align="center"  transition="blur"  />
            </Tooltip>
          ) : (
            <ThemeSwitcher align="center"  transition="blur"  />
          )}
          <Button variant="ghost" size="sm" icon="git-branch" label="GitHub" onClick={() => window.open(REPO_URL, "_blank", "noopener")} />
          <Button size="sm" label="Get Started" onClick={onStart} />
        </>
      }
    >
      <div className="hidden items-center gap-1 md:flex">
        {[
          ["Docs", pathFor("docs", "Introduction"), "book-open"],
          ["Components", pathFor("components", groups[0].items![0].label), "shapes"],
          ["Changelog", pathFor("docs", "Changelog"), "clock"],
          ["About", "/about", "info"],
        ].map(([label, to, icon]) => (
          <button key={label} type="button" onClick={() => navigate(to)} className="group/nav relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-fg-muted transition-[background-color,color,transform] duration-300 ease-out hover:-translate-y-px hover:bg-surface-muted hover:text-fg focus-visible:text-fg">
            <span className="inline-flex text-accent-600 transition-transform duration-300 ease-out group-hover/nav:-rotate-6 group-hover/nav:scale-110 dark:text-accent-400"><Icon name={icon} size={15} /></span>
            {label}
          </button>
        ))}
      </div>
    </Navbar>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => { isScrolling(); }, []); // starts tracking scroll (html[data-scrolling]) from the first frame
  const groups = COMPONENT_MENU.filter((g) => g.items?.length);
  const start = () => navigate(pathFor("docs", "Installation"));
  // Bottom fade: always on as a plain fade; while the page is being scrolled (and ~600ms after) it picks up the theme colour in dark mode, then eases back to plain.
  const [scrollTint, setScrollTint] = useState(false);
  useEffect(() => {
    let idle = 0;
    const onScroll = () => {
      setScrollTint(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setScrollTint(false), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);
  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-fg">
      <PageScrollbar />
      {/* One fade along the bottom edge of the viewport: the page melts into its background colour. In dark mode that colour eases toward the theme colour while scrolling and back after. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-36 bg-surface [-webkit-mask-image:linear-gradient(to_top,#000_0%,rgb(0_0_0/0.92)_12%,rgb(0_0_0/0.7)_28%,rgb(0_0_0/0.42)_46%,rgb(0_0_0/0.18)_66%,rgb(0_0_0/0.05)_84%,transparent_100%)] [mask-image:linear-gradient(to_top,#000_0%,rgb(0_0_0/0.92)_12%,rgb(0_0_0/0.7)_28%,rgb(0_0_0/0.42)_46%,rgb(0_0_0/0.18)_66%,rgb(0_0_0/0.05)_84%,transparent_100%)]"
      >
        {/* Dark mode: the theme colour, faded in while scrolling and out after. A separate layer on top of the plain surface fade, so the base never animates (no light flash on reload while the theme is applied). */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity ease-in-out dark:opacity-[var(--tint)]"
          style={{ transitionDuration: scrollTint ? "700ms" : "1400ms", ["--tint" as string]: scrollTint ? 1 : 0, background: "color-mix(in srgb, var(--color-accent-500) 13%, transparent)" }}
        />
      </div>
      {/* A smaller fade just under the navbar (64px tall), so content slides out of sight softly at the top too. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-16 z-40 h-10 bg-surface [-webkit-mask-image:linear-gradient(to_bottom,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.45)_40%,rgb(0_0_0/0.12)_75%,transparent_100%)] [mask-image:linear-gradient(to_bottom,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.45)_40%,rgb(0_0_0/0.12)_75%,transparent_100%)]"
      />
      <Nav groups={groups} onStart={start} />
      <main>
        <Hero />
        <Why />
        <CodeCompare />
        <PinnedReels />
        <ThemeWipe />
        <Flow />
        <Frameworks />
        <Install />
      </main>
      <SiteFooter />
    </div>
  );
}
