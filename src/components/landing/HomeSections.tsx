import { lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import LazyOnView from "./LazyOnView";
import { useStepSnap } from "./useStepSnap";
import Logo from "../layouts/Logo";
import { Icon } from "../ui/Icons/Icon";
import { Button } from "../ui/Buttons/Button";
import { Badge } from "../ui/Badge/Badge";
import { CodeSnippet } from "../ui/CodeSnippet/CodeSnippet";
import { Switch } from "../ui/Switch/Switch";
import { AppBackground } from "../ui/AppBackground/AppBackground";
import { Card } from "../ui/Card/Card";
import { Input } from "../ui/Input/Input";
import { pathFor } from "../../core/routes";
import { REPO_URL } from "../../core/repo";


function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return [copied, copy] as const;
}

/** A terminal-looking command line with a copy button. */
function Command({ text }: { text: string }) {
  const [copied, copy] = useCopy(text);
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-xl border border-border bg-surface-muted py-2 pl-4 pr-2 font-mono text-sm text-fg">
      <span className="text-fg-subtle">$</span>
      <code className="truncate">{text}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-surface hover:text-fg"
      >
        <Icon name={copied ? "check" : "copy"} size={15} />
      </button>
    </div>
  );
}

export function Heading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400">{eyebrow}</p>}
      <h2 className="text-3xl font-black tracking-tight text-fg md:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-base leading-relaxed text-fg-muted">{body}</p>}
    </div>
  );
}

const SECTION = "mx-auto max-w-6xl px-5 py-16 md:py-24";

/* ------------------------------------------------------------------------------------------------------------------ Hero */
export function Hero() {
  const navigate = useNavigate();
  return (
    // scrollFade sets --sp on the root as the page scrolls past: the glow fades with it and the hero text below drifts up with it (.lp-scroll-*).
    <AppBackground variant="pinch-glow" scrollFade>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-surface to-transparent" />
      <div className="mx-auto flex min-h-[36rem] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-20 text-center max-[480px]:[zoom:0.82] md:min-h-[42rem] md:pb-24 md:pt-24">
        <Reveal>
          <button type="button" onClick={() => navigate(pathFor("docs", "Changelog"))} className="lp-pill group relative inline-flex items-center rounded-full p-px text-xs">
            <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-muted py-1.5 pl-2.5 pr-3 font-semibold text-fg">
              <Icon name="sparkles" size={13} className="text-accent-600 dark:text-accent-400" />
              What&apos;s new
            </span>
            <span className="relative z-10 inline-flex items-center gap-1.5 pl-3 pr-3.5 text-fg-muted transition-colors group-hover:text-fg">
              Bento &amp; Clay designs
              <Icon name="arrow-right" size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </button>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="lp-scroll-h lp-round mx-auto mt-7 max-w-4xl text-balance text-[2.6rem] font-black leading-[1.06] tracking-[-0.02em] sm:text-6xl md:text-7xl">
            <span className="lp-ink">Beautiful by default.</span>{" "}
            <span className="lp-premium-word">Themeable</span>{" "}
            <span className="lp-ink">by design.</span>
          </h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="lp-scroll-p mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl">
            One library that works in React, Vue, Angular and plain HTML, themed out of the box with light, dark and a dozen accents.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="lp-scroll-b mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" label="Get started" icon="arrow-right" iconPosition="right" onClick={() => navigate(pathFor("docs", "Installation"))} />
            <Button size="lg" variant="soft" label="Browse components" onClick={() => navigate(pathFor("components", "Buttons"))} />
          </div>
        </Reveal>
        <Reveal delay={240}>
          <div className="lp-scroll-c mt-8">
            <Command text="npm i lojee-ui" />
          </div>
        </Reveal>
      </div>
    </AppBackground>
  );
}

/* ------------------------------------------------------------------------------------------------------------ Why lojee-ui */
const BENEFITS: { icon: string; title: string; body: string }[] = [
  { icon: "zap", title: "Faster development", body: "Drop in a finished component instead of writing and wiring forty utility classes for every button, input and card." },
  { icon: "sparkles", title: "Cleaner markup", body: "Props describe intent — variant, size, color — so your templates read like a design spec, not a wall of classes." },
  { icon: "sliders-horizontal", title: "Customizable", body: "Every component takes className and per-part classNames, so you can still reach in and tweak what you need." },
  { icon: "palette", title: "Themeable by design", body: "Light, dark, a dozen accents and two design languages through CSS variables — even inside shadow roots." },
];

export function Why() {
  return (
    <section className={SECTION}>
      <Heading eyebrow="Why lojee-ui" title="Tailwind is great. Repeating it everywhere is not." body="lojee-ui keeps Tailwind v4 under the hood and gives you the finished, accessible components on top." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} delay={i * 70}>
            <div className="h-full rounded-2xl border border-border bg-surface-muted p-6">
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-accent-600/10 text-accent-600 dark:text-accent-400">
                <Icon name={b.icon} size={20} />
              </span>
              <h3 className="text-base font-bold text-fg">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{b.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------------------------------------- Code comparison */
const PLAIN = `<div class="w-full max-w-sm rounded-xl border border-border bg-surface p-5">
  <h3 class="mb-2 text-base font-semibold text-fg">Profile</h3>
  <div class="space-y-3">
    <input class="h-10 w-full rounded-md border border-border-strong bg-surface px-3 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20" placeholder="Your name" />
    <div>
      <label class="inline-flex items-center gap-2 text-sm text-fg-muted">
        <span class="relative inline-flex h-6 w-11 shrink-0">
          <input type="checkbox" class="peer sr-only" />
          <span class="absolute inset-0 rounded-full bg-border transition-colors peer-checked:bg-accent-600 peer-focus-visible:ring-2 peer-focus-visible:ring-accent-500/30"></span>
          <span class="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-full"></span>
        </span>
        <span>Email updates</span>
      </label>
    </div>
    <button class="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-500 active:bg-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2">Save</button>
  </div>
</div>`;

const LOJEE = `<Card title="Profile">
  <Input placeholder="Your name" />
  <Switch label="Email updates" />
  <Button label="Save" />
</Card>`;

const countClasses = (code: string) => [...code.matchAll(/class(?:Name)?="([^"]*)"/g)].reduce((n, m) => n + m[1].split(/\s+/).filter(Boolean).length, 0);
const countTags = (code: string) => (code.match(/<[A-Za-z]/g) ?? []).length;
const pct = (a: number, b: number) => Math.round(((a - b) / a) * 100);

export function CodeCompare() {
  const [lojee, setLojee] = useState(false);
  const classCut = pct(countClasses(PLAIN), countClasses(LOJEE));
  const tagCut = pct(countTags(PLAIN), countTags(LOJEE));
  const code = lojee ? LOJEE : PLAIN;
  return (
    <section className={SECTION}>
      <Heading eyebrow="Less to write" title="The same card, a fraction of the code" body="A profile form written with plain Tailwind classes, and again with lojee-ui. Flip the switch to compare the code and what it renders. Counted from the code shown." />
      <div className="mb-6 flex items-center justify-center gap-4">
        <span className={`text-sm font-semibold transition-colors ${lojee ? "text-fg-subtle" : "text-fg"}`}>Tailwind</span>
        <Switch aria-label="Show the lojee-ui version" size="lg" checked={lojee} onChange={(e) => setLojee(e.target.checked)} />
        <span className={`text-sm font-semibold transition-colors ${lojee ? "text-fg" : "text-fg-subtle"}`}>lojee-ui</span>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0">
          <div className="mb-2 flex h-7 items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">Code</span>
            <Badge label={`${countClasses(code)} class names · ${countTags(code)} elements`} size="sm" />
          </div>
          {/* A fixed height (the Tailwind code is the tall one), so flipping the switch never moves the page. */}
          <CodeSnippet code={code} language={lojee ? "tsx" : "html"} title={lojee ? "lojee-ui" : "Tailwind CSS"} classNames={{ root: "h-[26rem]" }} />
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex h-7 items-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-fg-subtle">Output</span>
          </div>
          <div className="flex h-[26rem] items-center justify-center rounded-2xl border border-border bg-surface-muted p-6">
            {lojee ? (
              <div className="w-full max-w-sm">
                <Card title="Profile" variant="outline">
                  <div className="space-y-3">
                    <Input placeholder="Your name" />
                    <div>
                      <Switch label="Email updates" />
                    </div>
                    <Button label="Save" />
                  </div>
                </Card>
              </div>
            ) : (
              <div className="w-full max-w-sm" dangerouslySetInnerHTML={{ __html: PLAIN }} />
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-4 text-center">
        <div className="rounded-2xl border border-border bg-surface-muted p-5">
          <p className="text-4xl font-black text-accent-600 dark:text-accent-400">{classCut}%</p>
          <p className="mt-1 text-sm text-fg-muted">fewer class names</p>
        </div>
        <div className="rounded-2xl border border-border bg-surface-muted p-5">
          <p className="text-4xl font-black text-accent-600 dark:text-accent-400">{tagCut}%</p>
          <p className="mt-1 text-sm text-fg-muted">fewer elements</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------------------- Flow diagram */
const FrameworkFlow = lazy(() => import("./FrameworkFlow"));
const FLOW_ORDER = ["react", "vue", "angular", "js"] as const;
const FLOW_REST = FLOW_ORDER.map((_, i) => (i + 0.5) / FLOW_ORDER.length); // the middle of each framework's share of the scroll

/** The framework diagram. It pins to the middle of the screen while you scroll and steps through React, Vue, Angular and plain JS, holding on each so the code beside it can be read. */
export function Flow() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [fw, setFw] = useState<(typeof FLOW_ORDER)[number]>("react");
  const fwRef = useRef(0);
  useStepSnap(track, stage, FLOW_REST);

  useEffect(() => {
    const el = track.current;
    const card = stage.current;
    if (!el || !card) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Centered in the part of the screen below the navbar (64px), never higher than just under it.
      const pin = Math.max(80, Math.round((window.innerHeight + 64 - card.offsetHeight) / 2));
      card.style.top = `${pin}px`;
      const r = el.getBoundingClientRect();
      const span = Math.max(1, r.height - card.offsetHeight);
      const p = Math.min(1, Math.max(0, (pin - r.top) / span));
      const i = Math.min(FLOW_ORDER.length - 1, Math.floor(p * FLOW_ORDER.length));
      if (i !== fwRef.current) {
        fwRef.current = i;
        setFw(FLOW_ORDER[i]);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-24">
      <Heading eyebrow="Write once" title="One component library, every framework" body="Components are authored in React, wrapped with r2wc into Shadow-DOM custom elements, and consumed anywhere. Scroll to step through the frameworks, or hover the diagram to follow a packet." />
      {/* Tall track: only the diagram is pinned, so it (not the heading above it) is what sits in the middle of the screen while the frameworks step through. */}
      <div ref={track} style={{ height: `${FLOW_ORDER.length * 55 + 70}vh` }}>
        <div ref={stage} className="sticky" style={{ top: 80 }}>
          <LazyOnView minHeight={420}>
            <FrameworkFlow scrollFw={fw} />
          </LazyOnView>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------------------- Frameworks */
function ReactLogo() {
  return (
    <svg viewBox="-12 -10.5 24 21" className="size-9" fill="none" stroke="#61dafb" strokeWidth="1" aria-hidden="true">
      <circle r="1.9" fill="#61dafb" stroke="none" />
      {[0, 60, 120].map((deg) => (
        <ellipse key={deg} rx="11" ry="4.2" transform={`rotate(${deg})`} />
      ))}
    </svg>
  );
}
function VueLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-9" aria-hidden="true">
      <path d="M1.5 3h5.2L12 12.2 17.3 3h5.2L12 21z" fill="#41b883" />
      <path d="M6.7 3h3.2l2.1 3.7L14.1 3h3.2L12 12.2z" fill="#35495e" />
    </svg>
  );
}
function AngularLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-9" aria-hidden="true">
      <path d="M12 2 3 5.4l1.4 12.3L12 22l7.6-4.3L21 5.4z" fill="#dd0031" />
      <path d="M12 2v20l7.6-4.3L21 5.4z" fill="#c3002f" />
      <path fillRule="evenodd" d="M12 5.2 7 16.6h1.9l1-2.5h4.2l1 2.5H17zm0 3.9 1.4 3.3h-2.8z" fill="#fff" />
    </svg>
  );
}
function JsLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-9" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="#f7df1e" />
      <text x="13.2" y="19" fontSize="9.5" fontWeight="800" fill="#1a1a1a" fontFamily="system-ui, sans-serif" textAnchor="middle">JS</text>
    </svg>
  );
}

const FRAMEWORKS: { name: string; logo: ReactNode }[] = [
  { name: "React", logo: <ReactLogo /> },
  { name: "Vue", logo: <VueLogo /> },
  { name: "Angular", logo: <AngularLogo /> },
  { name: "Plain HTML / JS", logo: <JsLogo /> },
];
const ALSO_WORKS = ["Next.js", "Nuxt", "Svelte", "Astro", "Vite", "Laravel", "Rails", "Solid"];

export function Frameworks() {
  const navigate = useNavigate();
  return (
    <section data-frameworks="" className={`${SECTION} text-center`}>
      <Reveal>
        <h2 className="text-4xl font-black leading-tight tracking-tight text-fg md:text-6xl">
          Try lojee-ui
          <span className="block font-light">on your favorite framework</span>
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap items-start justify-center gap-x-10 gap-y-6">
          {FRAMEWORKS.map((f) => (
            <li key={f.name} className="flex w-24 flex-col items-center gap-2">
              <span className="inline-flex size-16 items-center justify-center rounded-2xl border border-border bg-surface-muted transition-transform duration-200 hover:-translate-y-1">{f.logo}</span>
              <span className="text-xs text-fg-muted">{f.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={140}>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-fg-muted">The components ship as Web Components, so they also drop into:</p>
        <ul className="mx-auto mt-3 flex max-w-2xl flex-wrap justify-center gap-2">
          {ALSO_WORKS.map((name) => (
            <li key={name} className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs text-fg-muted">
              {name}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={200}>
        <div className="mt-10">
          <Button size="lg" label="See all examples" onClick={() => navigate(pathFor("docs", "Installation"))} />
        </div>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------------------- Install */
function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-600 text-sm font-bold text-white">{n}</span>
      <div className="min-w-0 flex-1">
        <h3 className="mb-2 text-base font-bold text-fg">{title}</h3>
        {children}
      </div>
    </li>
  );
}

type TypedSnippet = { title: string; language: string; code: string };

/** Code snippets that are written out gradually as the page scrolls: the typing position follows how far the block has travelled up the screen, one snippet after the other. The full code is laid out invisibly underneath so the block never changes height. */
function TypedCode({ snippets }: { snippets: TypedSnippet[] }) {
  const box = useRef<HTMLDivElement>(null);
  const total = snippets.reduce((n, x) => n + x.code.length, 0);
  const [typed, setTyped] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Driven by the block's centre: 0 while its centre is down at 85% of the screen, 1 once its centre reaches the middle of the screen.
      const mid = r.top + r.height / 2;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - mid) / (vh * 0.35)));
      setTyped(Math.round(p * total));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);
  return (
    <div ref={box} className="space-y-3">
      {snippets.map((x, i) => {
        const before = snippets.slice(0, i).reduce((c, y) => c + y.code.length, 0);
        const n = Math.min(x.code.length, Math.max(0, typed - before));
        const writing = n > 0 && n < x.code.length;
        return (
          <div key={x.title} className="grid">
            <div className="invisible col-start-1 row-start-1" aria-hidden="true" inert>
              <CodeSnippet title={x.title} language={x.language} code={x.code} />
            </div>
            <div className="col-start-1 row-start-1">
              <CodeSnippet title={x.title} language={x.language} code={x.code.slice(0, n) + (writing ? "▍" : "")} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Install() {
  const navigate = useNavigate();
  return (
    <section className={SECTION}>
      <Heading eyebrow="Get started" title="Install in two steps" />
      <div className="mx-auto max-w-2xl">
        <ol className="space-y-8">
          <Step n={1} title="Install the package">
            <Command text="npm i lojee-ui" />
          </Step>
          <Step n={2} title="Add the theme and use a component">
            <TypedCode
              snippets={[
                { title: "app.css", language: "css", code: `@import "tailwindcss";\n@import "lojee-ui/theme.css";` },
                {
                  title: "React · Vue · Angular · plain HTML",
                  language: "tsx",
                  code: `// React\nimport { Button } from "lojee-ui";\n<Button label="Hello" />\n\n// Vue, Angular, plain HTML\nimport "lojee-ui/elements";\n<l-button label="Hello"></l-button>`,
                },
              ]}
            />
          </Step>
        </ol>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button size="lg" label="Read the guide" onClick={() => navigate(pathFor("docs", "Installation"))} />
          <Button size="lg" variant="outline" label="See all components" onClick={() => navigate(pathFor("components", "Buttons"))} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------------------- Footer */
export function SiteFooter() {
  const navigate = useNavigate();
  const link = "text-sm text-fg-muted transition-colors hover:text-fg";
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size={26} className="text-base" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">Themeable UI components for React, Vue, Angular and plain HTML.</p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Docs">
          <h4 className="mb-1 text-sm font-bold text-fg">Docs</h4>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("docs", "Introduction"))}>Introduction</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("docs", "Installation"))}>Installation</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("docs", "Theming"))}>Theming</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("docs", "Changelog"))}>Changelog</button>
        </nav>
        <nav className="flex flex-col gap-2" aria-label="Components">
          <h4 className="mb-1 text-sm font-bold text-fg">Components</h4>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("components", "Buttons"))}>Buttons</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("components", "Button Groups"))}>Button groups</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("components", "Split Button"))}>Split button</button>
          <button type="button" className={`${link} text-left`} onClick={() => navigate(pathFor("components", "Switch / Toggle"))}>Switch</button>
        </nav>
        <nav className="flex flex-col gap-2" aria-label="More">
          <h4 className="mb-1 text-sm font-bold text-fg">More</h4>
          <a className={link} href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
          <button type="button" className={`${link} text-left`} onClick={() => navigate("/about")}>About</button>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-fg-subtle">
          Made with <span className="text-rose-500" aria-label="love">♥</span> by Lojee · © 2026 · MIT
        </p>
      </div>
    </footer>
  );
}
