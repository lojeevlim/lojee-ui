import { lazy, Suspense, useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import Reveal from "./Reveal";
import LazyOnView from "./LazyOnView";







import { spotlight, useCountUp, useInView } from "./hooks";
import Logo from "../layouts/Logo";
import { ThemeSwitcher } from "../ui/ThemeSwitcher/ThemeSwitcher";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Tooltip } from "../ui/Tooltip/Tooltip";
import { Icon } from "../ui/Icons/Icon";
import { COMPONENT_MENU } from "../../constant/component_menu";
import { pathFor } from "../../core/routes";
import { REPO_URL } from "../../core/repo";
import { CHANGELOG } from "../../generated/changelog";
import { COLORS } from "../../core/tokens";
import { ANIMATED_VARIANTS } from "../../core/animated";
import { TRANSITIONS } from "../../core/motion";

const HeroPremium = lazy(() => import("./HeroPremium"));
const MapLab = lazy(() => import("./MapLab"));
const FrameworkFlow = lazy(() => import("./FrameworkFlow"));
const ThemeLab = lazy(() => import("./ThemeLab"));
const LayoutLab = lazy(() => import("./LayoutLab"));
const MotionLab = lazy(() => import("./MotionLab"));
const DataLab = lazy(() => import("./DataLab"));

const INSTALL = "npm install lojee-ui";

const FEATURES: { icon: string; title: string; body: string; span?: string }[] = [
  { icon: "box", title: "Typed React components", body: "Accessible, controlled-or-uncontrolled components from buttons to data grids — every prop documented and typed.", span: "lg:col-span-2" },
  { icon: "shapes", title: "Web Components built in", body: "Every component ships as an l-* custom element for Vue, Angular and plain JS." },
  { icon: "palette", title: "Themes by design", body: "Light, dark and twelve accents through CSS variables — even inside shadow roots." },
  { icon: "sparkles", title: "Motion built in", body: "Enter and exit transitions, hover effects and attention animations — pulse, glow, sweep, border-spin — on one prop, with solid or gradient colors.", span: "lg:col-span-2" },
  { icon: "table-2", title: "Data that feels alive", body: "Skeleton loading, charts and stats that count up from zero, and tables with built-in edit, duplicate and delete." },
  { icon: "map", title: "Maps, markers and routes", body: "MapLibre-powered maps with draggable markers and turn-by-turn routes, loaded only when shown." },
  { icon: "layout-dashboard", title: "App layout system", body: "Top, side, main and footer on a container-query grid that collapses to a drawer.", span: "lg:col-span-2" },
  { icon: "zap", title: "Tailwind v4 native", body: "One @import. No config, no compiled stylesheet, nothing to fight." },
];

function Stat({ target, suffix = "", label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(target, active);
  return (
    <div onPointerMove={spotlight} className="lp-spot group relative px-6 py-8 text-center transition-colors duration-300 md:py-10">
      <p className="bg-gradient-to-b from-fg to-fg/55 bg-clip-text text-4xl font-semibold tabular-nums tracking-tight text-transparent md:text-5xl">
        {n}
        {suffix && <span className="text-accent-500">{suffix}</span>}
      </p>
      <span className="mx-auto mt-3 block h-px w-8 bg-gradient-to-r from-transparent via-accent-500 to-transparent transition-all duration-500 group-hover:w-16" aria-hidden="true" />
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-subtle">{label}</p>
    </div>
  );
}

function Section({ eyebrow, title, body, children }: { eyebrow: string; title: string; body?: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
      <Reveal className="mb-10 max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">{eyebrow}</p>
        <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">{title}</h2>
        {body && <p className="mt-3 text-base leading-relaxed text-fg-muted">{body}</p>}
      </Reveal>
      <Reveal delay={120}>{children}</Reveal>
    </section>
  );
}

function Nav({ groups, onStart }: { groups: typeof COMPONENT_MENU; onStart: () => void }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // The bottom border glows while the page is scrolling and fades away again once scrolling stops.
  const [glow, setGlow] = useState(false);
  useEffect(() => {
    let idle = 0;
    const onScroll = () => {
      const past = window.scrollY > 0;
      setScrolled(past);
      if (!past) {
        setGlow(false);
        return;
      }
      setGlow(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => setGlow(false), 600);
    };
    setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);
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
  return (
      <header
        className={`sticky top-0 z-50 border-b ${scrolled ? "bg-surface" : "bg-transparent"} ${
          glow ? "border-accent-500 shadow-[0_1px_14px_1px_color-mix(in_srgb,var(--color-accent-500)_55%,transparent)]" : "border-transparent"
        }`}
        // The background snaps over quickly; the glow fades in and out a little slower.
        style={{ transition: "background-color 90ms linear, border-color 400ms ease, box-shadow 400ms ease" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" })} className="group" aria-label="lojeeUI — back to top">
            <Logo className="[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:rotate-6 group-hover:[&_svg]:scale-105" />
          </button>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
            {[
              ["Docs", pathFor("docs", "Introduction")],
              ["Components", pathFor("components", groups[0].items![0].label)],
              ["Changelog", pathFor("docs", "Changelog")],
              ["About", "/about"],
            ].map(([label, to]) => (
              <button key={label} type="button" onClick={() => navigate(to)} className="rounded-md px-3 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-muted hover:text-fg">
                {label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {isMobile ? (
              <Tooltip content="Change theme" position="bottom" color="accent" open={themeHint}>
                <ThemeSwitcher align="center"  transition="bounce"  />
              </Tooltip>
            ) : (
              <ThemeSwitcher align="center"  transition="bounce"  />
            )}
            <Button variant="ghost" size="sm" icon="git-branch" label="GitHub" onClick={() => window.open(REPO_URL, "_blank", "noopener")} />
            <Button size="sm" label="Get started" onClick={onStart} />
          </div>
        </div>
      </header>
  );
}

// The announcement pill shows what was newest in terms of components — the latest "New component(s): …" line in the git
// history's commit messages (generated into the changelog at dev / build time) — not fixes or tweaks. Without any such line it
// falls back to the newest non-release commit subject.
const NEW_COMPONENTS_LINE = /^[-*•]?\s*new components?\s*[:–—-]\s*(.+)$/i;
function latestUpdate(): string {
  for (const commit of CHANGELOG) {
    for (const line of commit.body.split("\n")) {
      const m = line.trim().match(NEW_COMPONENTS_LINE);
      if (m) return `${/components/i.test(line) ? "Components" : "Component"}: ${m[1].replace(/\.$/, "")}`;
    }
  }
  return CHANGELOG.find((c) => !/^release\b/i.test(c.subject))?.subject ?? "See what's new";
}
const LATEST_UPDATE = latestUpdate();

export default function LandingPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [statsRef, statsSeen] = useInView<HTMLDivElement>(0.4);

  const groups = COMPONENT_MENU.filter((g) => g.items?.length);
  const total = new Set(groups.flatMap((g) => g.items!.map((i) => i.label))).size;
  const start = () => navigate(pathFor("docs", "Installation"));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onHeroMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-surface text-fg">
      <Nav groups={groups} onStart={start} />

      {/* Hero */}
      <section onPointerMove={onHeroMove} className="relative isolate">
        <div className="lp-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="lp-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-surface to-transparent" />
        <div className="mx-auto max-w-6xl px-5 pt-14 text-center lg:pt-24">
          <button type="button" onClick={() => navigate(pathFor("docs", "Changelog"))} className="lp-enter inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-1 pr-3 text-xs text-fg-muted shadow-sm" style={{ ["--d" as string]: "0ms" }}>
            <span className="relative z-10 inline-flex"><Badge variant="solid" label="New" animated="pulse" /></span>
            <span className="truncate">{LATEST_UPDATE}</span>
            <Icon name="arrow-right" size={12} />
          </button>
          <h1 className="lp-enter lp-clay-text mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.25rem]" style={{ ["--d" as string]: "100ms" }}>
            Interfaces that fit <span className="lp-shimmer-text">every framework</span>.
          </h1>
          <p className="lp-enter mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl" style={{ ["--d" as string]: "200ms" }}>
            {total}+ themeable components for React, shipped as Web Components for Vue, Angular and plain JavaScript — with motion, maps and live data built in.
          </p>
          <div className="lp-enter mt-9 flex flex-wrap items-center justify-center gap-3" style={{ ["--d" as string]: "300ms" }}>
            <Button size="lg" icon="arrow-right" iconPosition="right" label="Get started" onClick={start} />
            <Button size="lg" variant="outline" label="Browse components" onClick={() => navigate(pathFor("components", groups[0].items![0].label))} />
          </div>
          <button
            type="button"
            onClick={copy}
            className="lp-enter group mx-auto mt-6 flex items-center gap-3 rounded-full border border-border bg-surface/70 py-2 pl-5 pr-4 font-mono text-sm text-fg transition-colors hover:border-accent-500"
            style={{ ["--d" as string]: "400ms" }}
            aria-label="Copy install command"
          >
            <span>
              <span className="mr-2 text-fg-subtle">$</span>
              {INSTALL}
            </span>
            <span className={`flex items-center gap-1 text-xs transition-colors ${copied ? "text-emerald-600" : "text-fg-subtle group-hover:text-fg"}`}>
              <Icon name={copied ? "check" : "copy"} size={14} />
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        </div>
        <div className="lp-enter pb-20 lg:pb-28" style={{ ["--d" as string]: "500ms" }}>
          <Suspense fallback={<div className="mt-16 min-h-[30rem]" />}><HeroPremium /></Suspense>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div ref={statsRef} className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 shadow-xl shadow-black/5 [&>div]:border-border max-md:[&>div:nth-child(odd)]:border-r max-md:[&>div:nth-child(-n+2)]:border-b md:grid-cols-4 md:[&>div:not(:last-child)]:border-r grid grid-cols-2">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/70 to-transparent" aria-hidden="true" />
          <Stat active={statsSeen} target={total} suffix="+" label="Components" />
          <Stat active={statsSeen} target={TRANSITIONS.length} label="Enter transitions" />
          <Stat active={statsSeen} target={ANIMATED_VARIANTS.length} label="Attention effects" />
          <Stat active={statsSeen} target={COLORS.length} label="Accent colors" />
        </div>
      </section>

      <Section eyebrow="Write once" title="One component library, every framework" body="Components are authored in React, wrapped with r2wc into Shadow-DOM custom elements, and consumed anywhere. Hover the diagram to follow a packet.">
        <LazyOnView minHeight={420}><FrameworkFlow /></LazyOnView>
      </Section>

      <Section eyebrow="Everything included" title="Built for real applications">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className={f.span}>
              <div onPointerMove={spotlight} className="lp-spot group h-full rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-lg hover:shadow-black/5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:text-accent-400">
                  <Icon name={f.icon} size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Motion" title="Bring every component to life" body="Pick an enter transition, an attention effect and a hover effect — pulses and borders can be a solid color or a gradient. It all respects reduced-motion.">
        <LazyOnView minHeight={640}><MotionLab /></LazyOnView>
      </Section>

      <Section eyebrow="Data" title="Tables that load, edit and react" body="Tables show shimmering skeleton rows while data loads, switch between a table and a card grid, and let users select, edit, duplicate or delete rows with no extra code.">
        <LazyOnView minHeight={640}><DataLab /></LazyOnView>
      </Section>

      <Section eyebrow="Maps" title="Interactive maps, markers and routes" body="A MapLibre vector map with free basemaps — no API key. It follows your light and dark theme, loads only when shown, and composes with draggable markers, popups and animated routes.">
        <LazyOnView minHeight={640}><MapLab /></LazyOnView>
      </Section>

      <Section eyebrow="Theming" title="Make it yours in one click" body="Mode, accent and the active-item style are plain CSS variables. Try it — this preview is a real, isolated ThemeProvider.">
        <LazyOnView minHeight={520}><ThemeLab /></LazyOnView>
      </Section>

      <Section eyebrow="App layout" title="Arrange a whole app with a matrix" body="Describe the layout as rows and columns of region names. The grid, the responsive drawer and the transitions come for free.">
        <LazyOnView minHeight={520}><LayoutLab /></LazyOnView>
      </Section>

      {/* CTA */}
      <section className="lp-defer mx-auto max-w-6xl px-5 pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-accent-600 px-6 py-14 text-center text-white md:px-12">
            <div className="lp-grid-fine absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
            <div className="relative">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Start building in minutes</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">Install the package, add one CSS import and drop in your first component.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={start} className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-transform duration-200 hover:-translate-y-0.5">
                  Read the installation guide
                </button>
                <button type="button" onClick={() => navigate(pathFor("docs", "Introduction"))} className="rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                  Introduction
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-fg-subtle sm:flex-row">
          <span className="flex items-center gap-3"><Logo size={22} className="text-sm" /><span>© 2026 Lojee, Inc. · MIT license</span></span>
          <div className="flex items-center gap-5">
            <button type="button" className="hover:text-fg" onClick={() => navigate(pathFor("docs", "Changelog"))}>Changelog</button>
            <button type="button" className="hover:text-fg" onClick={() => navigate("/about")}>About</button>
            <a className="hover:text-fg" href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
