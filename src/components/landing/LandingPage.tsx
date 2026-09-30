import { useEffect, useState, type PointerEvent, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";
import Reveal from "./Reveal";
import HeroSchematic from "./HeroSchematic";
import FrameworkFlow from "./FrameworkFlow";
import ThemeLab from "./ThemeLab";
import LayoutLab from "./LayoutLab";
import Marquee from "./Marquee";
import { spotlight, useCountUp, useInView } from "./hooks";
import Logo from "../layouts/Logo";
import ThemeSwitcher from "../layouts/ThemeSwitcher";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { Icon } from "../ui/Icons/Icon";
import { COMPONENT_MENU } from "../../constant/component_menu";
import { pathFor } from "../../core/routes";
import { REPO_URL } from "../../core/repo";
import { COLORS } from "../../core/tokens";

const INSTALL = "npm install lojee-ui lucide-react";

const FEATURES: { icon: string; title: string; body: string; span?: string }[] = [
  { icon: "box", title: "Typed React components", body: "Accessible, controlled-or-uncontrolled components from buttons to data grids — every prop documented and typed.", span: "lg:col-span-2" },
  { icon: "shapes", title: "Web Components built in", body: "Every component ships as an l-* custom element for Vue, Angular and plain JS." },
  { icon: "palette", title: "Themes by design", body: "Light, dark and twelve accents through CSS variables — even inside shadow roots." },
  { icon: "layout-dashboard", title: "App layout system", body: "Top, side, main and footer on a container-query grid that collapses to a drawer.", span: "lg:col-span-2" },
  { icon: "zap", title: "Tailwind v4 native", body: "One @import. No config, no compiled stylesheet, nothing to fight." },
  { icon: "sliders-horizontal", title: "Batteries included", body: "Selection, search, steppers and pickers manage their own state — and stay controllable." },
];

function Stat({ target, suffix = "", label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(target, active);
  return (
    <div className="text-center">
      <p className="text-4xl font-semibold tabular-nums tracking-tight text-fg md:text-5xl">
        {n}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-fg-subtle">{label}</p>
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

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statsRef, statsSeen] = useInView<HTMLDivElement>(0.4);

  const groups = COMPONENT_MENU.filter((g) => g.items?.length);
  const total = new Set(groups.flatMap((g) => g.items!.map((i) => i.label))).size;
  const start = () => navigate(pathFor("docs", "Installation"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Nav */}
      <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled ? "border-border bg-surface/80 backdrop-blur-lg" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group" aria-label="lojeeUI — back to top">
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
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" icon="git-branch" label="GitHub" onClick={() => window.open(REPO_URL, "_blank", "noopener")} />
            <Button size="sm" label="Get started" onClick={start} />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section onPointerMove={onHeroMove} className="relative isolate">
        <div className="lp-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="lp-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1fr_1.05fr] lg:pb-28 lg:pt-16">
          <div>
            <div className="lp-enter inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3 text-xs text-fg-muted backdrop-blur" style={{ ["--d" as string]: "0ms" }}>
              <Badge variant="solid" label="New" />
              Web Components, themes and app layouts
            </div>
            <h1 className="lp-enter mt-5 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl" style={{ ["--d" as string]: "100ms" }}>
              Interfaces that fit <span className="lp-shimmer-text">every framework</span>
            </h1>
            <p className="lp-enter mt-5 max-w-xl text-lg leading-relaxed text-fg-muted" style={{ ["--d" as string]: "200ms" }}>
              {total}+ themeable components for React — also shipped as Web Components for Vue, Angular and plain JavaScript. Styled with Tailwind CSS v4. Built to be
              dropped in and tuned with a few props.
            </p>
            <div className="lp-enter mt-8 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "300ms" }}>
              <Button icon="arrow-right" iconPosition="right" label="Get started" onClick={start} />
              <Button variant="outline" label="Browse components" onClick={() => navigate(pathFor("components", groups[0].items![0].label))} />
            </div>
            <button
              type="button"
              onClick={copy}
              className="lp-enter group mt-6 flex w-full max-w-md items-center justify-between gap-3 rounded-xl border border-border bg-surface-muted px-4 py-3 text-left font-mono text-sm text-fg transition-colors hover:border-accent-500"
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
          <div className="lp-enter" style={{ ["--d" as string]: "250ms" }}>
            <HeroSchematic />
          </div>
        </div>
      </section>

      {/* Component marquee */}
      <section className="border-y border-border bg-surface-muted/50 py-8">
        <Marquee />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div ref={statsRef} className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Stat active={statsSeen} target={total} suffix="+" label="Components" />
          <Stat active={statsSeen} target={groups.length} label="Categories" />
          <Stat active={statsSeen} target={COLORS.length} label="Accent colors" />
          <Stat active={statsSeen} target={4} label="Frameworks" />
        </div>
      </section>

      <Section eyebrow="Write once" title="One component library, every framework" body="Components are authored in React, wrapped with r2wc into Shadow-DOM custom elements, and consumed anywhere. Hover the diagram to follow a packet.">
        <FrameworkFlow />
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

      <Section eyebrow="Theming" title="Make it yours in one click" body="Mode, accent and the active-item style are plain CSS variables. Try it — this preview is a real, isolated ThemeProvider.">
        <ThemeLab />
      </Section>

      <Section eyebrow="App layout" title="Arrange a whole app with a matrix" body="Describe the layout as rows and columns of region names. The grid, the responsive drawer and the transitions come for free.">
        <LayoutLab />
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
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
