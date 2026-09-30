import { COLORS } from "../../../core/tokens";
import { THEME_MODES, useTheme } from "../../../core/theme";
import CodeBlock, { type CodeBlockVariants } from "../CodeBlock";
import { useState } from "react";
import { Button } from "../Buttons/Button";
import { ButtonGroup } from "../Buttons/ButtonGroup";
import { SegmentButton } from "../Buttons/SegmentButton";
import { Navbar } from "../Navbar/Navbar";
import { Pagination } from "../Pagination/Pagination";
import { ACTIVE_VARIANTS } from "../../../core/activeVariant";
import { ApiTable, Code, P, Step } from "../DocsHelpers";

const TOKENS = [
  { name: "surface", cls: "bg-surface", use: "Page / card background" },
  { name: "surface-muted", cls: "bg-surface-muted", use: "Subtle panels, hover fills, code blocks" },
  { name: "surface-raised", cls: "bg-surface-raised", use: "Menus, popovers, dialogs" },
  { name: "border", cls: "bg-border", use: "Default borders and dividers" },
  { name: "border-strong", cls: "bg-border-strong", use: "Inputs and emphasised borders" },
  { name: "fg", cls: "bg-fg", use: "Primary text" },
  { name: "fg-muted", cls: "bg-fg-muted", use: "Secondary text" },
  { name: "fg-subtle", cls: "bg-fg-subtle", use: "Placeholders, captions" },
];

const PROVIDER = `// main.tsx
import { ThemeProvider } from "lojee-ui";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultMode="light" defaultAccent="indigo">
    <App />
  </ThemeProvider>
);`;

const USE_THEME = `import { useTheme } from "lojee-ui";

function ThemeToggle() {
  const { mode, setMode, accent, setAccent } = useTheme();

  return (
    <>
      <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
        {mode === "dark" ? "Switch to light" : "Switch to dark"}
      </button>
      <select value={accent} onChange={(e) => setAccent(e.target.value as AccentName)}>
        <option value="indigo">Indigo</option>
        <option value="emerald">Emerald</option>
        <option value="rose">Rose</option>
      </select>
    </>
  );
}`;

const SCOPED = `import { ThemeProvider, App, AppTop, AppSide, AppMain, AppFooter } from "lojee-ui";

// The App follows the ThemeProvider around it...
<ThemeProvider defaultMode="dark">
  <App>
    <AppTop>...</AppTop>
    <AppSide>...</AppSide>
    <AppMain>...</AppMain>
    <AppFooter>...</AppFooter>
  </App>
</ThemeProvider>

// ...or pin a single App (and every component inside it) to its own theme:
<App theme="light" accent="rose">...</App>`;

const PLAIN = `<!-- No React? Set the attributes yourself on <html> (or any container) -->
<html data-theme="dark" data-accent="teal">

<script type="module">
  import "lojee-ui/elements";   // <l-button>, <l-badge>, ... follow the same attributes

  // switch at runtime
  document.documentElement.dataset.theme = "light";
  document.documentElement.dataset.accent = "emerald";
</script>`;

const CUSTOMISE = `/* src/index.css — after the lojee-ui import */

/* override any token for a mode... */
[data-theme="dark"] {
  --lojee-surface: #000000;
  --lojee-surface-muted: #0f0f10;
  --lojee-border: #27272a;
}

/* ...or change what an accent points at */
[data-accent="indigo"] {
  --lojee-accent-600: #4338ca;
  --lojee-accent-500: #4f46e5;
}`;

const NO_FLASH = `<!-- index.html: set the saved theme before first paint to avoid a light flash -->
<script>
  try {
    var t = localStorage.getItem("lojee-ui:theme");
    var a = localStorage.getItem("lojee-ui:accent");
    document.documentElement.setAttribute("data-theme", t === "dark" ? "dark" : "light");
    document.documentElement.setAttribute("data-accent", a || "indigo");
  } catch (e) {}
</script>`;

const same = (code: string): CodeBlockVariants => ({ react: code, js: code, vue: code, angular: code });

const PROVIDER_V: CodeBlockVariants = {
  react: PROVIDER,
  js: `// theme.ts — the whole "provider" is two attributes on <html> plus localStorage
type Mode = "light" | "dark";

export function applyTheme(mode: Mode, accent: string) {
  document.documentElement.dataset.theme = mode;
  document.documentElement.dataset.accent = accent;
  localStorage.setItem("lojee-ui:theme", mode);
  localStorage.setItem("lojee-ui:accent", accent);
}

// on startup
applyTheme(
  (localStorage.getItem("lojee-ui:theme") as Mode) ?? "light",
  localStorage.getItem("lojee-ui:accent") ?? "indigo"
);`,
  vue: `// useTheme.ts
import { ref, watchEffect } from "vue";

type Mode = "light" | "dark";
const mode = ref<Mode>((localStorage.getItem("lojee-ui:theme") as Mode) ?? "light");
const accent = ref(localStorage.getItem("lojee-ui:accent") ?? "indigo");

watchEffect(() => {
  document.documentElement.dataset.theme = mode.value;
  document.documentElement.dataset.accent = accent.value;
  localStorage.setItem("lojee-ui:theme", mode.value);
  localStorage.setItem("lojee-ui:accent", accent.value);
});

export const useTheme = () => ({ mode, accent });`,
  angular: `// theme.service.ts
import { Injectable, effect, signal } from "@angular/core";

type Mode = "light" | "dark";

@Injectable({ providedIn: "root" })
export class ThemeService {
  mode = signal<Mode>((localStorage.getItem("lojee-ui:theme") as Mode) ?? "light");
  accent = signal(localStorage.getItem("lojee-ui:accent") ?? "indigo");

  constructor() {
    effect(() => {
      document.documentElement.dataset["theme"] = this.mode();
      document.documentElement.dataset["accent"] = this.accent();
      localStorage.setItem("lojee-ui:theme", this.mode());
      localStorage.setItem("lojee-ui:accent", this.accent());
    });
  }
}`,
};

const USE_THEME_V: CodeBlockVariants = {
  react: USE_THEME,
  js: `import { applyTheme } from "./theme";

document.querySelector("#toggle")!.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next, document.documentElement.dataset.accent ?? "indigo");
});`,
  vue: `<script setup lang="ts">
import { useTheme } from "./useTheme";
const { mode, accent } = useTheme();
</script>

<template>
  <button @click="mode = mode === 'dark' ? 'light' : 'dark'">
    {{ mode === "dark" ? "Switch to light" : "Switch to dark" }}
  </button>
  <select v-model="accent">
    <option value="indigo">Indigo</option>
    <option value="emerald">Emerald</option>
    <option value="rose">Rose</option>
  </select>
</template>`,
  angular: `import { Component, inject } from "@angular/core";
import { ThemeService } from "./theme.service";

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  template: \`
    <button (click)="theme.mode.set(theme.mode() === 'dark' ? 'light' : 'dark')">
      {{ theme.mode() === "dark" ? "Switch to light" : "Switch to dark" }}
    </button>
    <select [value]="theme.accent()" (change)="theme.accent.set($any($event.target).value)">
      <option value="indigo">Indigo</option>
      <option value="emerald">Emerald</option>
      <option value="rose">Rose</option>
    </select>
  \`,
})
export class ThemeToggleComponent {
  theme = inject(ThemeService);
}`,
};

const SCOPED_PLAIN = `<!-- Any element can pin its own theme; everything inside follows it -->
<section data-theme="dark" data-accent="rose">
  <l-button color="accent" label="Always dark + rose"></l-button>
</section>`;
const SCOPED_V: CodeBlockVariants = { react: SCOPED, js: SCOPED_PLAIN, vue: SCOPED_PLAIN, angular: SCOPED_PLAIN };

const ACCENT_BUTTONS: CodeBlockVariants = {
  react: `// Pick the look once for the whole app — every active item follows it
<ThemeProvider defaultActiveVariant="soft">   {/* "solid" | "outline" | "soft" */}
  <App />
</ThemeProvider>

// or change it at runtime
const { activeVariant, setActiveVariant } = useTheme();
setActiveVariant("outline");

// affects: the active item in Sidebar and Navbar, the current Pagination page, the selected SegmentButton`,
  js: `<!-- one attribute on <html> (or any container) -->
<html data-active-variant="soft">   <!-- solid | outline | soft -->

<script type="module">
  import "lojee-ui/elements";
  document.documentElement.dataset.activeVariant = "outline";   // switch at runtime
</script>`,
  vue: `<script setup lang="ts">
import "lojee-ui/elements";

// data-active-variant on <html> drives every <l-sidebar>, <l-navbar>, <l-pagination>, ...
function setActive(variant: "solid" | "outline" | "soft") {
  document.documentElement.dataset.activeVariant = variant;
}
</script>

<template>
  <button @click="setActive('solid')">Solid</button>
  <button @click="setActive('outline')">Outline</button>
  <button @click="setActive('soft')">Soft</button>
</template>`,
  angular: `// theme.service.ts — add alongside mode / accent
activeVariant = signal<"solid" | "outline" | "soft">("solid");

constructor() {
  effect(() => {
    document.documentElement.dataset["activeVariant"] = this.activeVariant();
  });
}

// template:  <button (click)="theme.activeVariant.set('outline')">Outline</button>`,
};

const html = (code: string) => code.replace(/className=/g, "class=");
const htmlVariants = (react: string): CodeBlockVariants => ({ react, js: html(react), vue: html(react), angular: html(react) });

const BEFORE_AFTER = htmlVariants(`{/* ✗ Fixed colors — this card stays white when the theme goes dark */}
<div className="bg-white text-slate-900 border border-slate-200 rounded-lg p-4">
  <p className="text-slate-500">Last updated today</p>
  <button className="bg-indigo-600 text-white rounded-md px-3 py-1.5">Save</button>
</div>

{/* ✓ Tokens — follows light/dark and the selected accent */}
<div className="bg-surface text-fg border border-border rounded-lg p-4">
  <p className="text-fg-subtle">Last updated today</p>
  <button className="bg-accent-600 hover:bg-accent-500 text-white rounded-md px-3 py-1.5">Save</button>
</div>`);

const FULL_EXAMPLE_V: CodeBlockVariants = {
  react: `export function SettingsCard() {
  return (
    <section className="bg-surface-raised border border-border rounded-xl p-5 shadow-sm">
      <h2 className="text-fg text-base font-semibold">Notifications</h2>
      <p className="text-fg-muted text-sm mt-1">Choose what we email you about.</p>

      <input
        className="mt-4 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-fg
                   placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent-500"
        placeholder="you@example.com"
      />

      <div className="mt-4 flex items-center justify-between">
        <button className="rounded-md px-3 py-1.5 text-fg-muted hover:bg-surface-muted hover:text-fg">
          Cancel
        </button>
        <button
          className="rounded-md bg-accent-600 px-3 py-1.5 text-white hover:bg-accent-500
                     focus-visible:ring-2 focus-visible:ring-accent-500
                     focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Save
        </button>
      </div>
    </section>
  );
}`,
  js: `<section class="bg-surface-raised border border-border rounded-xl p-5 shadow-sm">
  <h2 class="text-fg text-base font-semibold">Notifications</h2>
  <p class="text-fg-muted text-sm mt-1">Choose what we email you about.</p>

  <input
    class="mt-4 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-fg
           placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent-500"
    placeholder="you@example.com"
  />

  <div class="mt-4 flex items-center justify-between">
    <button class="rounded-md px-3 py-1.5 text-fg-muted hover:bg-surface-muted hover:text-fg">Cancel</button>
    <button
      class="rounded-md bg-accent-600 px-3 py-1.5 text-white hover:bg-accent-500
             focus-visible:ring-2 focus-visible:ring-accent-500
             focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
    >
      Save
    </button>
  </div>
</section>`,
  vue: `<template>
  <section class="bg-surface-raised border border-border rounded-xl p-5 shadow-sm">
    <h2 class="text-fg text-base font-semibold">Notifications</h2>
    <p class="text-fg-muted text-sm mt-1">Choose what we email you about.</p>

    <input
      class="mt-4 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-fg
             placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent-500"
      placeholder="you@example.com"
    />

    <div class="mt-4 flex items-center justify-between">
      <button class="rounded-md px-3 py-1.5 text-fg-muted hover:bg-surface-muted hover:text-fg">Cancel</button>
      <button
        class="rounded-md bg-accent-600 px-3 py-1.5 text-white hover:bg-accent-500
               focus-visible:ring-2 focus-visible:ring-accent-500
               focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Save
      </button>
    </div>
  </section>
</template>`,
  angular: `@Component({
  selector: "app-settings-card",
  standalone: true,
  template: \`
    <section class="bg-surface-raised border border-border rounded-xl p-5 shadow-sm">
      <h2 class="text-fg text-base font-semibold">Notifications</h2>
      <p class="text-fg-muted text-sm mt-1">Choose what we email you about.</p>

      <input
        class="mt-4 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-fg
               placeholder:text-fg-subtle focus:outline-none focus:ring-2 focus:ring-accent-500"
        placeholder="you@example.com"
      />

      <div class="mt-4 flex items-center justify-between">
        <button class="rounded-md px-3 py-1.5 text-fg-muted hover:bg-surface-muted hover:text-fg">Cancel</button>
        <button
          class="rounded-md bg-accent-600 px-3 py-1.5 text-white hover:bg-accent-500
                 focus-visible:ring-2 focus-visible:ring-accent-500
                 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Save
        </button>
      </div>
    </section>
  \`,
})
export class SettingsCardComponent {}`,
};

const STATUS = htmlVariants(`{/* Status colors (red, green, amber…) are not tokens — give them a dark: counterpart */}
<p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700
              dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
  Something went wrong.
</p>

<p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700
              dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
  Saved.
</p>`);

const TIPS = htmlVariants(`{/* Opacity modifiers work on every token */}
<div className="bg-accent-500/10 text-accent-700 dark:text-accent-300">Soft accent tint</div>
<div className="bg-fg/5 hover:bg-fg/10">Subtle overlay that works in both modes</div>
<div className="ring-2 ring-accent-500/40">Translucent focus ring</div>

{/* Dividers and rings */}
<ul className="divide-y divide-border">...</ul>
<button className="focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">…</button>`);

export default function ThemeShowcase() {
  const { mode, setMode, accent, setAccent, activeVariant, setActiveVariant } = useTheme();
  const [page, setPage] = useState(2);
  const [segment, setSegment] = useState("Week");

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header>
        <h1 className="text-2xl font-semibold text-fg">Theming</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          lojee-ui ships light/dark mode and 12 brand accents. Everything is plain CSS variables driven by two attributes —{" "}
          <Code>data-theme</Code> and <Code>data-accent</Code> — so it works in React, in plain HTML and inside Web Components. This guide assumes
          lojee-ui is already installed and its styles imported — see the Installation page first.
        </p>
      </header>

      <section className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-4">
        <p className="mb-3 text-xs font-medium text-fg-subtle">Try it — this page uses the same ThemeProvider you set up in step 1</p>
        <div className="flex flex-wrap items-center gap-2">
          {THEME_MODES.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMode(m.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === m.value ? "bg-accent-600 text-white" : "bg-surface text-fg-muted hover:bg-border"
              }`}
            >
              {m.label}
            </button>
          ))}
          <span className="mx-1 h-5 w-px bg-border" />
          {COLORS.map((c) => (
            <button
              key={c.base}
              type="button"
              onClick={() => setAccent(c.base)}
              aria-label={c.name}
              title={c.name}
              style={{ backgroundColor: `var(--color-${c.base}-600)` }}
              className={`h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-surface-muted ${accent === c.base ? "ring-fg" : "ring-transparent"}`}
            />
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-border bg-surface p-4">
          <p className="mb-2 text-xs font-medium text-fg-subtle">Active items — choose how the current page / selection is drawn</p>
          <div className="flex flex-wrap items-center gap-3">
            {ACTIVE_VARIANTS.map((v) => (
              <Button
                key={v.value}
                color="accent"
                variant={v.value}
                label={v.label}
                onClick={() => setActiveVariant(v.value)}
                className={activeVariant === v.value ? "ring-2 ring-accent-500 ring-offset-2 ring-offset-surface" : undefined}
              />
            ))}
          </div>

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            <Navbar
              color="accent"
              bordered
              brand={<span className="text-sm font-semibold">Navbar</span>}
              items={[{ label: "Overview", active: true }, { label: "Reports" }, { label: "Settings" }]}
            />
            <div className="flex flex-wrap items-center gap-4">
              <Pagination color="accent" page={page} totalPages={5} onPageChange={setPage} />
              <ButtonGroup>
                {["Day", "Week", "Month"].map((label) => (
                  <SegmentButton key={label} color="accent" active={segment === label} onClick={() => setSegment(label)}>
                    {label}
                  </SegmentButton>
                ))}
              </ButtonGroup>
            </div>
          </div>
        </div>
        <CodeBlock variants={ACCENT_BUTTONS} />
      </section>

      <div className="space-y-10">
        <Step n={1} title="Wrap your app in ThemeProvider">
          <P>
            <Code>ThemeProvider</Code> writes <Code>data-theme</Code> and <Code>data-accent</Code> onto <Code>&lt;html&gt;</Code>, remembers the
            visitor&apos;s choice in <Code>localStorage</Code> (<Code>lojee-ui:theme</Code>, <Code>lojee-ui:accent</Code>) and exposes it through{" "}
            <Code>useTheme()</Code>. Put it once, as high as you can.
          </P>
          <CodeBlock variants={PROVIDER_V} />
          <ApiTable
            rows={[
              ["defaultMode", '"light" | "dark" — "light"', "Used when nothing is saved yet."],
              ["defaultAccent", "AccentName — \"indigo\"", "One of slate, gray, indigo, violet, blue, cyan, emerald, teal, amber, orange, rose, pink."],
              ["defaultActiveVariant", '"solid" | "outline" | "soft" — "solid"', "How active items are drawn (current page in a Sidebar / Navbar / Pagination, selected segment…)."],
              ["isolated", "boolean — false", "Scope the theme to this provider's own wrapper (no <html> change, no localStorage) — for self-contained previews."],
              ["mode / accent", "ThemeMode / AccentName", "Controlled values; when given they win over the provider's own state."],
              ["children", "ReactNode", "Your app."],
            ]}
          />
        </Step>

        <Step n={2} title="Switch theme and accent">
          <P>
            Read and change the current theme anywhere inside the provider with <Code>useTheme()</Code>. Changes apply instantly to every component and are
            saved for the next visit.
          </P>
          <CodeBlock variants={USE_THEME_V} />
          <ApiTable
            rows={[
              ["mode", '"light" | "dark"', "The active mode."],
              ["accent", "AccentName", "The active accent."],
              ["activeVariant", '"solid" | "outline" | "soft"', "How active items are drawn."],
              ["setMode(mode)", "(mode) => void", "Switch mode and persist it."],
              ["setAccent(accent)", "(accent) => void", "Switch accent and persist it."],
              ["setActiveVariant(variant)", "(variant) => void", "Switch the active-item style and persist it."],
            ]}
          />
        </Step>

        <Step n={3} title="Use the tokens in your own UI">
          <P>
            <span className="font-medium text-fg">What this is for.</span> lojee-ui components switch theme on their own. Your <em>own</em> markup — the page around
            them, custom cards, forms, headers — only switches if it uses the theme&apos;s colors too. Otherwise you get dark components on a white page. This
            step shows how to write your own UI so the whole app follows one switch. It is optional: skip it if you only use the components.
          </P>

          <h3 className="pt-2 text-sm font-semibold text-fg">3.1 Replace fixed colors with tokens</h3>
          <P>
            Any Tailwind class that names a fixed neutral (<Code>bg-white</Code>, <Code>text-slate-900</Code>, <Code>border-gray-200</Code>) stays that color in both
            modes. Swap them using this table. It works anywhere Tailwind classes work: JSX, HTML, Vue and Angular templates.
          </P>
          <ApiTable
            head={["Instead of", "Use", "For"]}
            rows={[
              ["bg-white", "bg-surface", "Page and card backgrounds"],
              ["bg-slate-50 / bg-slate-100", "bg-surface-muted", "Subtle panels, table stripes, hover fills, code blocks"],
              ["bg-white (menus, dialogs)", "bg-surface-raised", "Popovers, dropdowns and modals that sit above the page"],
              ["border-slate-200", "border-border", "Default borders and dividers"],
              ["border-slate-300", "border-border-strong", "Inputs and emphasised borders"],
              ["text-slate-900", "text-fg", "Headings and primary text"],
              ["text-slate-600", "text-fg-muted", "Body and secondary text"],
              ["text-slate-400 / 500", "text-fg-subtle", "Placeholders, captions, disabled text"],
              ["bg-indigo-600", "bg-accent-600", "Primary buttons and highlights (follows the accent)"],
              ["text-indigo-700", "text-accent-700", "Links and accent text"],
              ["ring-indigo-500", "ring-accent-500", "Focus rings"],
            ]}
          />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.2 The tokens</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TOKENS.map((t) => (
              <div key={t.name} className="rounded-lg border border-border p-2">
                <div className={`h-10 rounded ${t.cls}`} />
                <p className="mt-2 text-xs font-medium text-fg">{t.name}</p>
                <p className="text-[11px] leading-snug text-fg-subtle">{t.use}</p>
              </div>
            ))}
          </div>
          <P>
            <Code>accent</Code> is a full 50–950 scale (<Code>bg-accent-50</Code> … <Code>bg-accent-950</Code>, also <Code>text-</Code>, <Code>border-</Code>,{" "}
            <Code>ring-</Code>, <Code>from-</Code>/<Code>to-</Code>). It re-points to the palette you pick, so every accent class changes with it:
          </P>
          <div className="flex gap-1">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => (
              <div key={n} style={{ backgroundColor: `var(--color-accent-${n})` }} className="h-8 flex-1 rounded" title={`accent-${n}`} />
            ))}
          </div>

          <h3 className="pt-2 text-sm font-semibold text-fg">3.3 Before and after</h3>
          <CodeBlock variants={BEFORE_AFTER} />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.4 A complete example with hover and focus states</h3>
          <P>
            A form card built only from tokens. Hover and focus states use the same tokens (<Code>hover:bg-surface-muted</Code>,{" "}
            <Code>focus:ring-accent-500</Code>), and <Code>ring-offset-surface</Code> keeps the focus ring&apos;s gap the same color as the page in both modes.
          </P>
          <CodeBlock variants={FULL_EXAMPLE_V} />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.5 Status colors need a dark: variant</h3>
          <P>
            Only neutrals and the accent are tokens. Status colors — red for errors, green for success, amber for warnings — stay ordinary palette classes, so add a{" "}
            <Code>dark:</Code> counterpart. The <Code>dark:</Code> variant follows <Code>data-theme</Code> (not the operating system), so it matches the theme toggle
            exactly.
          </P>
          <CodeBlock variants={STATUS} />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.6 Useful patterns</h3>
          <CodeBlock variants={TIPS} />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.7 lojee-ui components</h3>
          <P>
            Every component defaults to <Code>color=&quot;accent&quot;</Code>, so it follows the selected accent with nothing to configure. An explicit color such as{" "}
            <Code>color=&quot;rose&quot;</Code> pins that component and is never affected by the accent.
          </P>
          <CodeBlock
            variants={{
              react: `<Button color="accent" label="Save" />\n<Badge color="accent" label="New" />`,
              js: `<l-button color="accent" label="Save"></l-button>\n<l-badge color="accent" label="New"></l-badge>`,
              vue: `<l-button color="accent" label="Save" />\n<l-badge color="accent" label="New" />`,
              angular: `<l-button color="accent" label="Save"></l-button>\n<l-badge color="accent" label="New"></l-badge>`,
            }}
          />

          <h3 className="pt-2 text-sm font-semibold text-fg">3.8 Check your work</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg-muted">
            <li>Toggle light and dark at the top of this page — nothing in your own UI should stay white (or black) behind or around the components.</li>
            <li>
              Search your code for <Code>bg-white</Code>, <Code>text-black</Code>, <Code>slate-</Code>, <Code>gray-</Code> and <Code>zinc-</Code> and replace the ones that are
              surfaces, text or borders with tokens.
            </li>
            <li>Switch the accent — primary buttons and highlights in your own UI should change color together with lojee-ui&apos;s components.</li>
            <li>Tokens only exist once <Code>lojee-ui/theme.css</Code> is imported (see the Installation page); without it, <Code>bg-surface</Code> does nothing.</li>
          </ul>
        </Step>

        <Step n={4} title="Scope a theme to part of the page">
          <P>
            The <Code>App</Code> layout follows the surrounding <Code>ThemeProvider</Code> by default. Give it <Code>theme</Code> or <Code>accent</Code> to pin just
            that subtree — every component inside picks it up, and the rest of the page is untouched. Any element with <Code>data-theme</Code> works the same
            way.
          </P>
          <CodeBlock variants={SCOPED_V} />
          <ApiTable
            rows={[
              ["theme", '"light" | "dark"', "Omit to follow ThemeProvider."],
              ["accent", "AccentName", "Omit to follow ThemeProvider."],
              ["layout", "GridLayout", "Section placement — see the App page."],
              ["collapseBelow", '"md" | "lg" | "xl" | "2xl" | "3xl"', "Container width below which Side becomes a drawer."],
            ]}
          />
        </Step>

        <Step n={5} title="Use it without React">
          <P>
            The tokens are only CSS variables, so any page can opt in by setting the two attributes. The <Code>&lt;l-*&gt;</Code> Web Components mirror{" "}
            <Code>&lt;html&gt;</Code>&apos;s attributes inside their shadow roots, so they follow along too.
          </P>
          <CodeBlock variants={same(PLAIN)} />
        </Step>

        <Step n={6} title="Customise the palette">
          <P>
            Every color is a <Code>--lojee-*</Code> variable, so a theme is just a few overrides in your own stylesheet — no rebuild of the library needed. Put
            them after the <Code>lojee-ui/theme.css</Code> import.
          </P>
          <CodeBlock variants={same(CUSTOMISE)} />
        </Step>

        <Step n={7} title="Avoid the flash on load (optional)">
          <P>
            <Code>ThemeProvider</Code> applies the saved theme as soon as React mounts, which can flash the default theme for a moment on a slow load. Set the
            attributes from an inline script in <Code>index.html</Code> to apply them before the first paint.
          </P>
          <CodeBlock variants={same(NO_FLASH)} />
        </Step>

        <section className="space-y-3 rounded-xl border border-border p-4">
          <h2 className="text-lg font-semibold text-fg">Troubleshooting</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-muted">
            <li>
              <span className="font-medium text-fg">Colors look wrong or missing</span> — the styles aren&apos;t imported correctly; see the Installation page
              (Tailwind v4 installed, and <Code>@import &quot;lojee-ui/theme.css&quot;</Code> after it).
            </li>
            <li>
              <span className="font-medium text-fg">Toggling does nothing</span> — <Code>useTheme()</Code> only works inside <Code>ThemeProvider</Code>; outside it
              returns a no-op default.
            </li>
            <li>
              <span className="font-medium text-fg">Accent doesn&apos;t change a component</span> — a component given an explicit color (for example{" "}
              <Code>color=&quot;rose&quot;</Code>) is pinned to it; remove the prop to follow the accent again. Your own markup only follows it through <Code>accent-*</Code> classes.
            </li>
            <li>
              <span className="font-medium text-fg">Dark styles apply in the wrong place</span> — the <Code>dark:</Code> variant follows the nearest{" "}
              <Code>data-theme</Code> ancestor, so a light <Code>App</Code> inside a dark page stays light.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
