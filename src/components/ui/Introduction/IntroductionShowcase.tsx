import { useNavigate } from "react-router-dom";
import { Button } from "../Buttons/Button";
import { Badge } from "../Badge/Badge";
import { Icon } from "../Icons/Icon";
import CodeBlock, { type CodeBlockVariants } from "../CodeBlock";
import { ApiTable, Code, P } from "../DocsHelpers";
import { COMPONENT_MENU } from "../../../constant/component_menu";
import { pathFor } from "../../../core/routes";

const FEATURES = [
  {
    icon: "box",
    title: "React components",
    body: "A full set of typed, accessible React 19 components — from buttons and forms to data grids, charts and complete sign-in flows.",
  },
  {
    icon: "shapes",
    title: "Web Components included",
    body: "Every component is also shipped as an l-* custom element, so Vue, Angular and plain JS/TS apps get the same UI with no React in sight.",
  },
  {
    icon: "palette",
    title: "Themes built in",
    body: "Light and dark mode plus a brand accent, driven by CSS variables. Change it once and every component — even inside shadow roots — follows.",
  },
  {
    icon: "layout-dashboard",
    title: "App layout system",
    body: "Top bar, side bar, main and footer on a container-query grid that collapses to a drawer on small screens — arrange it by drag and drop.",
  },
  {
    icon: "zap",
    title: "Tailwind CSS v4 native",
    body: "No compiled stylesheet and no config. One @import in your CSS and Tailwind generates exactly the classes your app uses.",
  },
  {
    icon: "sliders-horizontal",
    title: "Built-in behaviour",
    body: "Active items, selection, steppers, search and pickers manage their own state out of the box — and are still fully controllable when you need it.",
  },
];

const PRINCIPLES: [string, string][] = [
  ["Sensible defaults", 'Every component works with zero props beyond its content, and follows the theme accent ("accent" is the default color).'],
  ["Controlled or uncontrolled", "State-holding components manage themselves. Pass a value and a change handler and they become fully controlled."],
  ["Data-driven", "Menus, tabs, steps and tables take plain arrays, so the same shape works in React props and as Web Component properties."],
  ["Overridable styling", "Every component accepts className and a per-part classNames object that wins over the built-in styling."],
  ["Accessible", "Real buttons, links, dialogs and labels with keyboard support, focus handling and aria attributes."],
  ["Consistent variants", "Solid, outline and soft active-item styles, shared colors and sizes — learn one component and you know them all."],
];

const QUICK_START: CodeBlockVariants = {
  react: `npm install lojee-ui lucide-react tailwindcss @tailwindcss/vite

/* src/index.css */
@import "tailwindcss";
@import "lojee-ui/theme.css";

// src/App.tsx
import { ThemeProvider, Button, Badge } from "lojee-ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="light" defaultAccent="indigo">
      <Badge variant="soft" label="Hello, lojee-ui" />
      <Button label="Get started" />
    </ThemeProvider>
  );
}`,
  js: `npm install lojee-ui tailwindcss @tailwindcss/vite

/* style.css */
@import "tailwindcss";
@import "lojee-ui/theme.css";

<l-badge variant="soft" label="Hello, lojee-ui"></l-badge>
<l-button label="Get started"></l-button>

<script type="module">
  import "lojee-ui/elements";
</script>`,
  vue: `npm install lojee-ui tailwindcss @tailwindcss/vite

<template>
  <l-badge variant="soft" label="Hello, lojee-ui" />
  <l-button label="Get started" />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
  angular: `npm install lojee-ui tailwindcss @tailwindcss/postcss postcss

<l-badge variant="soft" label="Hello, lojee-ui"></l-badge>
<l-button label="Get started"></l-button>

// main.ts
import "lojee-ui/elements";
// and add CUSTOM_ELEMENTS_SCHEMA to your component or module`,
};

export default function IntroductionShowcase() {
  const navigate = useNavigate();
  const groups = COMPONENT_MENU.filter((g) => g.items?.length);
  const total = new Set(groups.flatMap((g) => g.items!.map((i) => i.label))).size;

  return (
    <div className="mx-auto max-w-4xl space-y-14">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent-500/10 via-surface to-surface p-6 md:p-10">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="soft" color="accent" label="0.1 alpha" />
            <Badge variant="outline" color="slate" label="React 19 · Tailwind v4" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">Build interfaces faster with lojee-ui</h1>
          <p className="text-base leading-relaxed text-fg-muted">
            lojee-ui is a React + TypeScript component library styled with Tailwind CSS v4. It ships {total}+ ready-made components, a themeable design
            system and an app-layout toolkit — and every component is also available as a framework-agnostic Web Component for Vue, Angular and plain JavaScript.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button label="Get started" icon="arrow-right" onClick={() => navigate(pathFor("docs", "Installation"))} />
            <Button variant="outline" label="Browse components" icon="square-stack" onClick={() => navigate(pathFor("components", groups[0].items![0].label))} />
            <Button variant="ghost" label="Theming" icon="palette" onClick={() => navigate(pathFor("docs", "Theming"))} />
          </div>
        </div>
        <div className="pointer-events-none mt-8 flex flex-wrap items-center gap-3 md:absolute md:bottom-8 md:right-8 md:mt-0 md:max-w-[15rem] md:justify-end md:opacity-90">
          <Button label="Primary" />
          <Button variant="outline" label="Outline" />
          <Button variant="soft" label="Soft" />
          <Badge variant="soft" color="emerald" label="Success" />
          <Badge variant="soft" color="rose" label="Error" />
        </div>
      </header>

      {/* Features */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-fg">Why lojee-ui</h2>
          <p className="mt-1 text-sm text-fg-subtle">Everything you need to ship a consistent, themeable UI — in the framework you already use.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent-500/50">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <Icon name={f.icon} size={18} />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-fg">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's inside */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-fg">What&apos;s inside</h2>
          <p className="mt-1 text-sm text-fg-subtle">
            {total}+ components in {groups.length} categories. Every page has live examples, an interactive playground with copy-ready code for React, Vue,
            Angular and plain JS, and a full API reference.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((g) => (
            <button
              key={g.section}
              type="button"
              onClick={() => navigate(pathFor("components", g.items![0].label))}
              className="group rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent-500/50 hover:bg-surface-muted"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-fg">{g.section}</h3>
                <span className="text-xs text-fg-subtle">{g.items!.length} components</span>
              </div>
              <p className="mt-2 text-sm text-fg-muted">
                {g.items!.slice(0, 5).map((i) => i.label).join(" · ")}
                {g.items!.length > 5 ? " …" : ""}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-fg">Quick start</h2>
          <p className="mt-1 text-sm text-fg-subtle">Three steps: install, import the styles once, use a component. Switch language in the header to see each setup.</p>
        </div>
        <ol className="grid gap-3 sm:grid-cols-3">
          {[
            ["Install", "Add the package and Tailwind CSS v4."],
            ["Import the styles", "One @import line after Tailwind — no config, no @source paths."],
            ["Use a component", "Drop it into your markup. It follows the theme automatically."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3 rounded-xl border border-border p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600 text-xs font-semibold text-white">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold text-fg">{t}</p>
                <p className="mt-0.5 text-xs text-fg-muted">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <CodeBlock variants={QUICK_START} />
        <P>
          The full walkthrough — including Next.js, PostCSS and troubleshooting — is on the{" "}
          <button type="button" className="font-medium text-accent-600 underline-offset-2 hover:underline dark:text-accent-400" onClick={() => navigate(pathFor("docs", "Installation"))}>
            Installation
          </button>{" "}
          page.
        </P>
      </section>

      {/* React vs Web Components */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-fg">React or Web Components?</h2>
          <p className="mt-1 text-sm text-fg-subtle">Same components, same design, two ways to consume them.</p>
        </div>
        <ApiTable
          head={["", "React components", "Web Components"]}
          rows={[
            ["Import", "import { Button } from \"lojee-ui\"", "import \"lojee-ui/elements\" → <l-button>"],
            ["Works with", "React 19 projects", "Vue, Angular, Svelte, plain JS/TS — anything that renders HTML"],
            ["Props", "Regular props, including JSX / render props", "Attributes for strings, numbers and booleans; properties for objects and arrays"],
            ["Events", "Callback props (onSelect, onChange …)", "CustomEvents (select, change …) with the payload in event.detail"],
            ["Theming", "ThemeProvider or data-theme attributes", "The same data-theme / data-accent attributes — variables reach inside shadow roots"],
            ["Peer dependencies", "react, react-dom, lucide-react, tailwindcss", "tailwindcss only"],
          ]}
        />
      </section>

      {/* Principles */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-fg">Design principles</h2>
          <p className="mt-1 text-sm text-fg-subtle">A few rules the whole library follows, so components feel the same everywhere.</p>
        </div>
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {PRINCIPLES.map(([t, d]) => (
            <li key={t} className="flex gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400">
                <Icon name="check" size={12} />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg">{t}</p>
                <p className="text-sm leading-relaxed text-fg-muted">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Next steps */}
      <section className="space-y-4 pb-4">
        <h2 className="text-xl font-semibold text-fg">Where to next</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: "download", title: "Installation", body: "Add lojee-ui and Tailwind to your project.", to: pathFor("docs", "Installation") },
            { icon: "palette", title: "Theming", body: "Light / dark mode, accents and active-item styles.", to: pathFor("docs", "Theming") },
            { icon: "book-open", title: "Components", body: "Live examples, playgrounds and API reference.", to: pathFor("components", groups[0].items![0].label) },
          ].map((c) => (
            <button
              key={c.title}
              type="button"
              onClick={() => navigate(c.to)}
              className="rounded-xl border border-border bg-surface p-4 text-left transition-colors hover:border-accent-500/50 hover:bg-surface-muted"
            >
              <Icon name={c.icon} size={18} />
              <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-fg">
                {c.title} <Icon name="arrow-right" size={14} />
              </p>
              <p className="mt-0.5 text-sm text-fg-muted">{c.body}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-fg-subtle">
          Tip: press <Code>⌘K</Code> anywhere to search every component and page.
        </p>
      </section>
    </div>
  );
}
