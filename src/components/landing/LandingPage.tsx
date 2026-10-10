import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { PageScrollbar } from "../ui/DotScroll/PageScrollbar"
import { useNavigate } from "react-router-dom";
import "./landing.css";
import { isScrolling } from "./scrollState";
import ParticleTrail from "./ParticleTrail";
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
import { ACCENTS, PRESET_ACCENTS } from "../../core/theme";
import { ANIMATED_VARIANTS } from "../../core/animated";
import { TRANSITIONS } from "../../core/motion";

const HeroPremium = lazy(() => import("./HeroPremium"));
const MapLab = lazy(() => import("./MapLab"));
const FrameworkFlow = lazy(() => import("./FrameworkFlow"));
const LayoutLab = lazy(() => import("./LayoutLab"));
const LookAndFeelLab = lazy(() => import("./LookAndFeelLab"));
const DataLab = lazy(() => import("./DataLab"));

// The page sections below the hero are lazy chunks that mount as they near the viewport. Fetch (and parse) those chunks while the browser
// is idle after the page has settled, so scrolling only has to render them instead of also downloading and compiling their code.
const SECTION_CHUNKS = [() => import("./FrameworkFlow"), () => import("./LookAndFeelLab"), () => import("./DataLab"), () => import("./MapLab"), () => import("./LayoutLab")];
function prefetchSections() {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
  const idle = (cb: () => void) => (w.requestIdleCallback ? w.requestIdleCallback(cb, { timeout: 4000 }) : w.setTimeout(cb, 1500));
  SECTION_CHUNKS.forEach((load, i) => w.setTimeout(() => idle(() => void load().catch(() => {})), 2500 + i * 600));
}

const INSTALL = "npm install lojee-ui";

const FEATURES: { icon: string; title: string; body: string; span?: string }[] = [
  { icon: "box", title: "Typed React components", body: "Accessible, controlled-or-uncontrolled components from buttons to data grids — every prop documented and typed.", span: "lg:col-span-2" },
  { icon: "shapes", title: "Web Components built in", body: "Every component ships as an l-* custom element for Vue, Angular and plain JS." },
  { icon: "palette", title: "Themes by design", body: "Light, dark and twelve accents through CSS variables — even inside shadow roots." },
  { icon: "sparkles", title: "Motion built in", body: "Enter and exit transitions, hover effects and attention animations — pulse, glow, sweep, border-spin — on one prop, with solid or gradient colors.", span: "lg:col-span-2" },
  { icon: "table-2", title: "Data that feels alive", body: "Skeleton loading, charts and stats that count up from zero, and tables with built-in edit, duplicate and delete." },
  { icon: "map", title: "Maps, markers and routes", body: "MapLibre-powered maps with draggable markers and turn-by-turn routes, loaded only when shown." },
  { icon: "layout-dashboard", title: "App layout system", body: "Top, side, main and footer on a container-query grid that collapses to a drawer.", span: "lg:col-span-2" },
  { icon: "zap", title: "Tailwind v4 native", body: "One @import. No config, no compiled stylesheet, nothing to fight.", span: "lg:col-span-2" },
];

// Specks drifting down out of the dark-mode top glow while the pointer hasn't moved yet (see .lp-rest-dust in landing.css). Fixed values so the markup is stable.
// Size of the small window the hover spotlight is lit in, and how far (px) it may trail behind the pointer (the lit circle is 70px in radius).
const SPOT_WIN = 200;
const SPOT_LAG = 30;
const REST_DUST = Array.from({ length: 320 }, (_, i) => ({
  left: `calc(50% + ${(((i * 53) % 101) - 50) * 4.4}px)`,
  "--sz": `${1.5 + (i % 3)}px`,
  "--dur": `${3.6 + (i % 6) * 0.6}s`,
  "--dl": `${((i * 0.31) % 3.6).toFixed(2)}s`,
  "--dx": `${((i % 2 ? 1 : -1) * (4 + (i % 5) * 5))}px`,
  "--dy": `${90 + (i % 7) * 42}px`,
}) as CSSProperties);

function Stat({ target, suffix = "", label, active }: { target: number; suffix?: string; label: string; active: boolean }) {
  const n = useCountUp(target, active);
  return (
    <div className="px-3 py-3 text-center md:py-4">
      <p className="lp-clay-text lp-stat-num text-2xl tabular-nums md:text-3xl">
        <span className="lp-clay-shaded">
          <span className="lp-clay-ink">
            {n}
            {suffix}
          </span>
        </span>
      </p>
      <span className="mx-auto mt-1.5 block h-px w-5 bg-gradient-to-r from-transparent via-accent-500 to-transparent" aria-hidden="true" />
      <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-fg-subtle">{label}</p>
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
        className={`sticky top-0 z-50 border-b border-transparent ${scrolled ? "bg-surface" : "bg-transparent"}`}
        style={{ transition: "background-color 90ms linear" }}
      >
        {/* The glow forms at the middle of the bottom edge, spreads out sideways and fades toward both ends. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0"
          style={{ opacity: glow ? 1 : 0, transform: glow ? "scaleX(1)" : "scaleX(0.15)", transition: glow ? "opacity 400ms ease, transform 900ms ease-out" : "opacity 600ms ease, transform 900ms ease-in" }}
        >
          <div className="absolute inset-x-0 -bottom-px h-px" style={{ background: "linear-gradient(to right, transparent, var(--color-accent-500) 50%, transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-5" style={{ background: "radial-gradient(ellipse 50% 100% at 50% 0, color-mix(in srgb, var(--color-accent-500) 45%, transparent), transparent)" }} />
        </div>
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-5">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" })} className="group" aria-label="lojeeUI — back to top">
            <Logo className="[&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:rotate-6 group-hover:[&_svg]:scale-105" />
          </button>
          <nav className="ml-6 hidden items-center gap-1 md:flex">
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
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {isMobile ? (
              <Tooltip content="Change theme" position="bottom" color="accent" open={themeHint}>
                <ThemeSwitcher align="center"  transition="blur"  />
              </Tooltip>
            ) : (
              <ThemeSwitcher align="center"  transition="blur"  />
            )}
            <Button variant="ghost" size="sm" icon="git-branch" label="GitHub" onClick={() => window.open(REPO_URL, "_blank", "noopener")} />
            <Button size="sm" label="Get Started" onClick={onStart} />
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
  useEffect(prefetchSections, []);
  useEffect(() => { isScrolling(); }, []); // starts tracking scroll (html[data-scrolling]) from the first frame
  // "Built for real applications": the feature cards light up one by one by scroll position. A line at 60% of the viewport height travels down the grid as you
  // scroll; the grid's height is split evenly between the cards, so each one stays lit while the line is inside its share, in reading order.
  const featRef = useRef<HTMLDivElement>(null);
  const [litFeat, setLitFeat] = useState(-1);
  useEffect(() => {
    const el = featRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      setLitFeat(p < 0 || p >= 1 ? -1 : Math.min(FEATURES.length - 1, Math.floor(p * FEATURES.length)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  // The cursor glow follows the pointer. The position goes onto the glow layer itself (a leaf element) once per animation frame —
  // custom properties are inherited, so writing them on the whole hero section made the browser re-style every element inside it
  // (all the live cards) on each pointer event.
  const heroGlow = useRef<HTMLDivElement>(null);
  const glowPos = useRef<{ x: number; y: number; raf: number; el: HTMLElement | null }>({ x: 0, y: 0, raf: 0, el: null });
  // The clay light follows the pointer too: the direction from the heading to the cursor sets the light, and highlights/shadows are offset
  // against it. The filter's feOffsets are SVG attributes (not CSS), so they are written directly;
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const clayFilter = useRef<SVGSVGElement>(null);
  const setClayLight = (lx: number, ly: number) => {
    clayFilter.current?.querySelectorAll<SVGFEOffsetElement>("feOffset[data-k]").forEach((o) => {
      const k = Number(o.dataset.k);
      o.setAttribute("dx", String(-lx * k));
      o.setAttribute("dy", String(-ly * k));
    });
    // feDistantLight azimuth: angle (degrees) of the vector pointing at the light, in the filter's y-down space.
    const az = (Math.atan2(ly, lx) * 180) / Math.PI;
    clayFilter.current?.querySelectorAll<SVGFEDistantLightElement>("feDistantLight").forEach((d) => d.setAttribute("azimuth", String(az)));
  };
  // The hover spotlight is lit by a point light at the pointer itself, so the shading changes by area. The lighting filter is the expensive part, and re-running it over the whole
  // (very wide) heading on every frame made fast pointer moves lag. So the lit copy lives in a small clipped window (SPOT_WIN px square) that travels with the eased light:
  // the point light sits at the window's centre (a fixed fePointLight), the window is moved with a transform and the copy inside is counter-moved, so only that small area
  // is re-lit per frame. SVG filter attributes can't use CSS transitions, so the light eases toward the pointer with a time-based exponential ease (same feel at any frame rate).
  const spotLight = useRef({ x: 0, y: 0, tx: 0, ty: 0, t: 0, raf: 0 });
  const spotWin = useRef<HTMLSpanElement>(null);
  const spotLit = useRef<HTMLSpanElement>(null);
  const lastLight = useRef({ x: NaN, y: NaN });
  const lastWrite = useRef(0);
  const writeSpotLight = (x: number, y: number) => {
    const last = lastLight.current;
    if (Math.abs(x - last.x) < 0.5 && Math.abs(y - last.y) < 0.5) return;
    last.x = x;
    last.y = y;
    const wx = (x - SPOT_WIN / 2).toFixed(1);
    const wy = (y - SPOT_WIN / 2).toFixed(1);
    if (spotWin.current) spotWin.current.style.transform = `translate3d(${wx}px, ${wy}px, 0)`;
    if (spotLit.current) spotLit.current.style.transform = `translate3d(${-Number(wx)}px, ${-Number(wy)}px, 0)`;
  };
  const easeSpotLight = (now: number) => {
    const l = spotLight.current;
    const dt = Math.min(now - (l.t || now), 64);
    l.t = now;
    const k = 1 - Math.exp(-dt / 220);
    l.x += (l.tx - l.x) * k;
    l.y += (l.ty - l.y) * k;
    // The window never trails further behind the pointer than the lit circle's reach, however fast it moves.
    l.x = l.tx + Math.max(-SPOT_LAG, Math.min(SPOT_LAG, l.x - l.tx));
    l.y = l.ty + Math.max(-SPOT_LAG, Math.min(SPOT_LAG, l.y - l.ty));
    // Re-lighting is capped at ~60 a second, so 120/144Hz displays do not pay double for it.
    if (now - lastWrite.current >= 15 || Math.abs(l.tx - l.x) + Math.abs(l.ty - l.y) <= 0.5) {
      lastWrite.current = now;
      writeSpotLight(l.x, l.y);
    }
    if (Math.abs(l.tx - l.x) + Math.abs(l.ty - l.y) > 0.5) l.raf = requestAnimationFrame(easeSpotLight);
    else { l.raf = 0; l.t = 0; }
  };
  // Pointer events can fire several times per frame (and faster than the display): only the latest position is kept and applied once per animation frame,
  // so the heading's rect is read and the mask variables are written once per frame instead of once per event.
  const titlePos = useRef<{ x: number; y: number; raf: number; el: HTMLElement | null }>({ x: 0, y: 0, raf: 0, el: null });
  const onTitleMove = (e: PointerEvent<HTMLElement>) => {
    const t = titlePos.current;
    t.x = e.clientX;
    t.y = e.clientY;
    t.el = e.currentTarget;
    if (t.raf) return;
    t.raf = requestAnimationFrame(() => {
      t.raf = 0;
      const el = t.el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = t.x - r.left;
      const y = t.y - r.top;
      el.style.setProperty("--hx", `${x.toFixed(1)}px`);
      el.style.setProperty("--hy", `${y.toFixed(1)}px`);
      const l = spotLight.current;
      l.tx = x;
      l.ty = y;
      // First move after entering: start the light at the pointer instead of sweeping in from wherever it last was.
      if (!l.raf && !l.x && !l.y) { l.x = l.tx; l.y = l.ty; }
      if (!l.raf) l.raf = requestAnimationFrame(easeSpotLight);
    });
  };
  const onHeroMove = (e: PointerEvent<HTMLElement>) => {
    const g = glowPos.current;
    g.x = e.clientX;
    g.y = e.clientY;
    g.el = e.currentTarget;
    if (g.raf) return;
    g.raf = requestAnimationFrame(() => {
      g.raf = 0;
      const glow = heroGlow.current;
      if (!glow || !g.el) return;
      const r = g.el.getBoundingClientRect();
      const dot = glow.firstElementChild as HTMLElement | null;
      if (dot) dot.style.transform = `translate3d(${(g.x - r.left - r.width / 2).toFixed(1)}px, ${(g.y - r.top - r.height * 0.3).toFixed(1)}px, 0)`;
    });
  };

  useEffect(() => setClayLight(-0.6, -0.8), []);

  // The copy inside the spotlight window must wrap exactly like the heading, so it takes the heading's width.
  useEffect(() => {
    const h = heroTitle.current;
    if (!h) return;
    const sync = () => spotLit.current?.style.setProperty("width", `${h.offsetWidth}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  // Dark mode: until the pointer first moves, the hero's top glow (beam, dust, pinned cursor glow; see [data-rest] in landing.css) rests under the navbar. The heading itself is not lit by it.
  const [restLight, setRestLight] = useState(true);
  useEffect(() => {
    const off = () => setRestLight(false);
    window.addEventListener("pointermove", off, { once: true, passive: true });
    return () => window.removeEventListener("pointermove", off);
  }, []);

  // Bottom blur: always on as a plain blur; while the page is being scrolled (and ~600ms after) it picks up the theme colour in dark mode, then eases back to plain.
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
      <Nav groups={groups} onStart={start} />

      {/* Bumped clay letters, like the clay Button: the glyph alpha is blurred into a height map and lit with a distant light (diffuse only: soft matte shading across the bump, no specular sheen so it never looks glossy), so the letters look puffed out instead of outlined. The light's azimuth and the drop offset follow the pointer (setClayLight). #lp-clay-letters adds the Button-style drop shadow; #lp-clay-spot (the hover spotlight copy) is the same bump without it. */}
      <svg ref={clayFilter} width="0" height="0" aria-hidden className="pointer-events-none absolute">
        {[
          { id: "lp-clay-letters", drop: false, point: false, scale: 6 },
          { id: "lp-clay-spot", drop: false, point: true, scale: 2.5 },
          // Stats numbers: the same bump with a much shallower height map, so the shading is gentle.
          { id: "lp-clay-soft", drop: false, point: false, scale: 2 },
        ].map(({ id, drop, point, scale }) => (
          <filter key={id} id={id} x="-20%" y="-35%" width="140%" height="190%" colorInterpolationFilters="sRGB">
            {drop && (
              <>
                <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="dropBlur" />
                <feOffset in="dropBlur" dx="5" dy="7" data-k="8.6" result="dropOff" />
                <feFlood style={{ floodColor: "color-mix(in srgb, var(--color-accent-600) 30%, transparent)" }} />
                <feComposite in2="dropOff" operator="in" result="drop" />
              </>
            )}
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.2" result="bump" />
            <feDiffuseLighting in="bump" surfaceScale={scale} diffuseConstant="1" lightingColor="#fff" result="diffuse">
              {point ? <fePointLight x={SPOT_WIN / 2} y={SPOT_WIN / 2} z="120" /> : <feDistantLight azimuth="233" elevation="52" />}
            </feDiffuseLighting>
            <feComposite in="SourceGraphic" in2="diffuse" operator="arithmetic" k1="1.22" k2="0" k3="0" k4="0" result="shaded" />
            <feComposite in="shaded" in2="SourceAlpha" operator="in" result="body" />
            <feMerge>
              {drop && <feMergeNode in="drop" />}
              <feMergeNode in="body" />
            </feMerge>
          </filter>
        ))}
      </svg>

      {/* Hero */}
      {/* z-20: the hero (its cards' shadows and glows, which spill past the section) paints above the sections that follow it. */}
      <section onPointerMove={onHeroMove} className="relative isolate z-20">
        <ParticleTrail />
        <div data-rest={restLight ? "" : undefined} className="lp-rest-beam" aria-hidden="true" />
        {restLight && (
          <div data-rest="" className="lp-rest-dust" aria-hidden="true">
            {REST_DUST.map((style, i) => <i key={i} style={style} />)}
          </div>
        )}
        <div className="lp-grid pointer-events-none absolute inset-0 -z-10" />
        <div ref={heroGlow} data-rest={restLight ? "" : undefined} className="lp-glow pointer-events-none absolute inset-0 -z-10"><div className="lp-glow-dot" /></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-surface to-transparent" />
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-5 py-14 text-center lg:py-24">
          <button type="button" onClick={() => navigate(pathFor("docs", "Changelog"))} className="lp-enter inline-flex max-w-full cursor-pointer items-center gap-2 rounded-full border border-border bg-surface/70 py-1 pl-1 pr-3 text-xs text-fg-muted shadow-sm" style={{ ["--d" as string]: "0ms" }}>
            <span className="relative z-10 inline-flex"><Badge variant="solid" label="New" animation="sweep" /></span>
            <span className="truncate">{LATEST_UPDATE}</span>
            <Icon name="arrow-right" size={12} />
          </button>
          <h1 ref={heroTitle} data-rest={restLight ? "" : undefined} onPointerMove={onTitleMove} className="lp-enter lp-clay-text relative mx-auto mt-7 w-fit max-w-5xl text-[3.4rem] leading-[1.05] md:text-[5.25rem] lg:text-[6rem]" style={{ ["--d" as string]: "100ms" }}>
            <span className="lp-clay-shaded">
              <span className="lp-clay-ink">Interfaces that fit every framework.</span>
            </span>
            {/* Hover spotlight: a copy of the heading in the theme colours, revealed only inside a small circle around the pointer, so the colour changes by portion rather than by letter. */}
            <span aria-hidden className="lp-clay-spot pointer-events-none absolute inset-0 select-none">
              <span ref={spotWin} className="lp-clay-win">
                <span ref={spotLit} className="lp-clay-lit">
                  <span className="lp-spot-accent">Interfaces that fit</span> <span className="lp-shimmer-text">every framework.</span>
                </span>
              </span>
            </span>
          </h1>
          <p className="lp-enter mx-auto mt-9 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl" style={{ ["--d" as string]: "200ms" }}>
            {total}+ themeable components for React, shipped as Web Components for Vue, Angular and plain JavaScript — with motion, maps and live data built in.
          </p>
          <div className="lp-enter mt-12 flex flex-wrap items-center justify-center gap-3" style={{ ["--d" as string]: "300ms" }}>
            <Button size="lg" icon="arrow-right" iconPosition="right" label="Get Started" onClick={start} />
            <Button size="lg" variant="outline" label="Browse components" onClick={() => navigate(pathFor("components", groups[0].items![0].label))} />
          </div>
          <button
            type="button"
            onClick={copy}
            className="lp-enter group mx-auto mt-9 flex items-center gap-3 rounded-full border border-border bg-surface/70 py-2 pl-5 pr-4 font-mono text-sm text-fg transition-colors hover:border-accent-500"
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
        {/* Stats: a compact row between the hero text and the card reels */}
        <div className="mx-auto max-w-3xl px-5 pb-6 pt-4">
          <div ref={statsRef} data-spill-target className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 shadow-xl shadow-black/5 [&>div]:border-border max-md:[&>div:nth-child(odd)]:border-r max-md:[&>div:nth-child(-n+2)]:border-b md:grid-cols-4 md:[&>div:not(:last-of-type)]:border-r grid grid-cols-2">
            <Stat active={statsSeen} target={total} suffix="+" label="Components" />
            <Stat active={statsSeen} target={TRANSITIONS.length} label="Enter transitions" />
            <Stat active={statsSeen} target={ANIMATED_VARIANTS.length} label="Attention effects" />
            <Stat active={statsSeen} target={ACCENTS.length + PRESET_ACCENTS.length} suffix="+" label="Accent colors" />
            <span data-hero-spill aria-hidden="true" className="pointer-events-none absolute inset-0" />
          </div>
        </div>
        <div className="lp-enter pt-2 pb-2 lg:pt-2 lg:pb-2" style={{ ["--d" as string]: "500ms" }}>
          <Suspense fallback={<div className="mt-16 min-h-[30rem]" />}><HeroPremium /></Suspense>
        </div>
      </section>

      <Section eyebrow="Write once" title="One component library, every framework" body="Components are authored in React, wrapped with r2wc into Shadow-DOM custom elements, and consumed anywhere. Hover the diagram to follow a packet.">
        <LazyOnView minHeight={420}><FrameworkFlow /></LazyOnView>
      </Section>

      <Section eyebrow="Everything included" title="Built for real applications">
        <div ref={featRef} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60} className={f.span}>
              <div onPointerMove={spotlight} data-lit={litFeat === i ? "" : undefined} className="lp-spot lp-feat group h-full rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/50 hover:shadow-lg hover:shadow-black/5">
                <span className="lp-feat-icon relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:text-accent-400">
                  <Icon name={f.icon} size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-fg">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Look & feel" title="Make it move. Make it yours." body="Choose how components enter, react and respond to a hover — then set the mode, accent and style in one click. Every change is live, themeable and respects reduced-motion.">
        <LazyOnView minHeight={400}><LookAndFeelLab /></LazyOnView>
      </Section>

      <Section eyebrow="Data" title="Tables that load, edit and react" body="Tables show shimmering skeleton rows while data loads, switch between a table and a card grid, and let users select, edit, duplicate or delete rows with no extra code.">
        <LazyOnView minHeight={400}><DataLab /></LazyOnView>
      </Section>

      <Section eyebrow="Maps" title="Interactive maps, markers and routes" body="A MapLibre vector map with free basemaps — no API key. It follows your light and dark theme, loads only when shown, and composes with draggable markers, popups and animated routes.">
        <LazyOnView minHeight={400}><MapLab /></LazyOnView>
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
          <span className="flex items-center gap-3"><Logo size={22} className="text-sm" /><span>Made with <span className="text-rose-500" aria-label="love">♥</span> by Lojee · © 2026 · MIT</span></span>
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
