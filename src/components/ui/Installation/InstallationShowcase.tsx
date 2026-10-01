import CodeBlock, { type CodeBlockVariants } from "../CodeBlock";
import { ApiTable, Code, P, Step } from "../DocsHelpers";

const CSS_SETUP = `/* src/index.css */
@import "tailwindcss";
@import "lojee-ui/theme.css";`;

const VITE = `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`;

const FIRST_USE = `import { Button, Badge, Card } from "lojee-ui";

export default function Demo() {
  return (
    <Card>
      <Badge variant="soft" label="New" />
      <Button color="accent" label="Get started" />
    </Card>
  );
}`;

const ELEMENTS = `// Any framework (or none): one import registers every <l-*> element
import "lojee-ui/elements";

// then, in HTML / Vue / Angular templates:
// <l-button color="accent" label="Get started"></l-button>
// <l-badge variant="soft" label="New"></l-badge>`;

const VITE_PLAIN = `// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});`;

const VITE_VUE = `// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") } } }),
    tailwindcss(),
  ],
});`;

const ANGULAR_POSTCSS = `// .postcssrc.json  (project root) — Angular uses the PostCSS plugin
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`;

const TAILWIND_ANGULAR = `npm install tailwindcss @tailwindcss/postcss postcss`;

const CSS_ELEMENTS_NOTE = `/* src/styles.css  (Vue / plain JS: src/style.css)
   The <l-*> elements carry their own styles, so this file is only for what YOU write:
   Tailwind classes in your own markup, plus the lojee-ui tokens (bg-surface, text-fg,
   bg-accent-600, dark mode, ...). */
@import "tailwindcss";
@import "lojee-ui/theme.css";`;

const IMPORT_CSS_VUE = `// src/main.ts
import "lojee-ui/elements";
import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");`;

const IMPORT_CSS_JS = `// src/main.ts
import "lojee-ui/elements";
import "./style.css";`;

const IMPORT_CSS_ANGULAR = `// angular.json  →  projects → <your-app> → architect → build → options
"styles": ["src/styles.css"]

// then put the two @import lines from above into src/styles.css`;

const VITE_V: CodeBlockVariants = { react: VITE, js: VITE_PLAIN, vue: VITE_VUE, angular: ANGULAR_POSTCSS };
const CSS_V: CodeBlockVariants = { react: CSS_SETUP, js: CSS_ELEMENTS_NOTE, vue: CSS_ELEMENTS_NOTE, angular: CSS_ELEMENTS_NOTE };

const FIRST_USE_V: CodeBlockVariants = {
  react: FIRST_USE,
  js: `<!-- index.html -->
<l-card>
  <l-badge variant="soft" label="New"></l-badge>
  <l-button color="accent" label="Get started"></l-button>
</l-card>

<script type="module">
  import "lojee-ui/elements";
</script>`,
  vue: `<script setup lang="ts">
import "lojee-ui/elements";
</script>

<template>
  <l-card>
    <l-badge variant="soft" label="New" />
    <l-button color="accent" label="Get started" />
  </l-card>
</template>

<!-- vite.config.ts: tell Vue these are custom elements
     vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") } } }) -->`,
  angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-card>
      <l-badge variant="soft" label="New"></l-badge>
      <l-button color="accent" label="Get started"></l-button>
    </l-card>
  \`,
})
export class AppComponent {}`,
};

const ELEMENTS_V: CodeBlockVariants = {
  react: ELEMENTS,
  js: `// main.ts — one import registers every <l-*> element
import "lojee-ui/elements";

// or straight from HTML:
// <script type="module">import "lojee-ui/elements";</script>`,
  vue: `// main.ts
import "lojee-ui/elements";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");

// vite.config.ts
// vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") } } })`,
  angular: `// main.ts
import "lojee-ui/elements";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);

// and add schemas: [CUSTOM_ELEMENTS_SCHEMA] to any component whose template uses <l-*> tags`,
};

const CREATE = `# optional — start from a fresh Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app`;

const CREATE_NONE = `# any project works — lojee-ui/elements does not care what your app is built with`;

const PM = `npm install lojee-ui lucide-react

# react and react-dom (v19) must already be in your project`;

const PM_ELEMENTS = `npm install lojee-ui`;

const TAILWIND_VITE = `npm install tailwindcss @tailwindcss/vite`;

const POSTCSS = `# Next.js, Remix, webpack, Parcel, ... — use the PostCSS plugin instead of the Vite one
npm install tailwindcss @tailwindcss/postcss postcss

// postcss.config.mjs
export default {
  plugins: { "@tailwindcss/postcss": {} },
};`;

const IMPORT_CSS = `// src/main.tsx  (Next.js: app/layout.tsx)
import "./index.css";        // the file from the previous step`;

const TYPES = `import { Button, type ButtonProps } from "lojee-ui";

// tsconfig.json — the package uses "exports", so use a modern resolution mode
{
  "compilerOptions": {
    "moduleResolution": "bundler",   // or "node16" / "nodenext"
    "jsx": "react-jsx"
  }
}`;

const VERIFY = `// src/App.tsx
import { Button, Badge } from "lojee-ui";

export default function App() {
  return (
    <div className="p-8 space-y-4">
      <Badge variant="soft" color="accent" label="lojee-ui is working" />
      <div className="flex gap-2">
        <Button color="accent" label="Primary" />
        <Button variant="outline" label="Outline" />
      </div>
    </div>
  );
}`;

const NEXT_NOTE = `"use client";   // components use React state and effects — import them from a Client Component

import { Button } from "lojee-ui";

export default function Page() {
  return <Button color="accent" label="Hello" />;
}`;

const SSR_NOTE = `// Custom elements only exist in the browser: with SSR (Nuxt, Angular Universal, ...) register them
// from client-only code, e.g. inside onMounted() / afterNextRender() or a dynamic import.
await import("lojee-ui/elements");`;


const same = (code: string): CodeBlockVariants => ({ react: code, js: code, vue: code, angular: code });

export default function InstallationShowcase() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-2xl font-semibold text-fg">Installation</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          A complete walkthrough for adding lojee-ui and Tailwind CSS v4 to a project — from a blank folder to a themed, working component — plus the
          framework-agnostic Web Components for Vue, Angular and plain JavaScript.
        </p>
      </header>

      <section className="space-y-3 rounded-xl border border-border p-4">
        <h2 className="text-lg font-semibold text-fg">Before you start</h2>
        <ApiTable
          head={["Requirement", "Version", "Notes"]}
          rows={[
            ["Node.js", "20 or newer", "A current LTS release — needed by Vite and Tailwind v4."],
            ["React + React DOM", "19", "React build only. Not needed for the Web Components."],
            ["Tailwind CSS", "v4 (4.3.3+)", "Install it for both React and Web Components — required for React, and for the tokens and utility classes everywhere else."],
            ["lucide-react", "1.47+", "Icons used across the components (React build)."],
            ["npm", "comes with Node.js", "The commands in this guide use npm."],
          ]}
        />
        <p className="text-sm text-fg-muted">
          Two ways to use lojee-ui: the <Code>lojee-ui</Code> React components (this guide, steps 1–6), or the <Code>lojee-ui/elements</Code> Web Components —
          self-contained, no React needed (step 7). Tailwind CSS v4 is set up the same way for both (steps 3–4). Pick the language tabs on the code samples to see each.
        </p>
      </section>

      <div className="space-y-10">
        <Step n={1} title="Create or open a project">
          <P>
            Use an existing app, or scaffold a new one. The examples use Vite, but any React setup works.
          </P>
          <CodeBlock variants={{ react: CREATE, js: CREATE_NONE, vue: CREATE_NONE, angular: CREATE_NONE }} />
        </Step>

        <Step n={2} title="Install lojee-ui and its peer dependencies">
          <P>
            lojee-ui does not bundle its dependencies and ships no compiled stylesheet — Tailwind builds the CSS from your own project, so what you see here is
            what you get. Install the package together with its peer dependencies here — Tailwind CSS is installed in the next step.
          </P>
          <CodeBlock variants={{ react: PM, js: PM_ELEMENTS, vue: PM_ELEMENTS, angular: PM_ELEMENTS }} />
          <P>
            The Web Components tabs need only <Code>lojee-ui</Code> — React is bundled inside the elements, so there is no React peer dependency.
          </P>
        </Step>

        <Step n={3} title="Install and set up Tailwind CSS v4">
          <P>
            Tailwind CSS v4 is a dependency for every setup. The React components are styled with Tailwind classes that <em>your</em> Tailwind build generates.
            The Web Components carry their own styles, but you still want Tailwind to use the Tailwind CSS classes and lojee-ui tokens (<Code>bg-surface</Code>,{" "}
            <Code>text-fg</Code>, <Code>bg-accent-600</Code>, dark mode) in your own markup. Install Tailwind and the plugin for your build tool.
          </P>
          <CodeBlock variants={{ react: TAILWIND_VITE, js: TAILWIND_VITE, vue: TAILWIND_VITE, angular: TAILWIND_ANGULAR }} />
          <P>Then register it in your build config:</P>
          <CodeBlock variants={VITE_V} />
          <P>
            Not using Vite? Use the PostCSS plugin instead — this is also the setup for Next.js:
          </P>
          <CodeBlock variants={same(POSTCSS)} />
        </Step>

        <Step n={4} title="Import the styles">
          <P>
            Create (or open) your main CSS file and import Tailwind, then <Code>lojee-ui/theme.css</Code> right after it. That single extra line is all lojee-ui
            needs — it tells Tailwind to generate the classes the components use, so there is no <Code>@source</Code> path to configure. It also carries the
            design tokens (see the Theming page for light/dark mode and accents).
          </P>
          <CodeBlock variants={CSS_V} />
          <P>
            Import that CSS file once, from your entry point:
          </P>
          <CodeBlock variants={{ react: IMPORT_CSS, js: IMPORT_CSS_JS, vue: IMPORT_CSS_VUE, angular: IMPORT_CSS_ANGULAR }} />
        </Step>

        <Step n={5} title="Use a component and check that it works">
          <P>
            Components are named exports; every one accepts a <Code>className</Code>, and most a <Code>classNames</Code> object for per-part overrides. Start
            the dev server and confirm the badge and buttons below appear styled, in the accent color.
          </P>
          <CodeBlock variants={{ react: VERIFY, js: FIRST_USE_V.js, vue: FIRST_USE_V.vue, angular: FIRST_USE_V.angular }} />
          <ApiTable
            head={["You see", "Meaning"]}
            rows={[
              ["A soft indigo badge and two buttons", "Everything is set up correctly."],
              ["Plain unstyled buttons", "Step 3 or 4 is missing — Tailwind isn't running, or the theme.css import is absent (React build)."],
              ["Broken or missing icons", "lucide-react isn't installed (step 2)."],
            ]}
          />
        </Step>

        <Step n={6} title="TypeScript and frameworks">
          <P>
            Type definitions are included — no <Code>@types</Code> package needed. Because the package uses <Code>exports</Code>, set a modern{" "}
            <Code>moduleResolution</Code> in your tsconfig.
          </P>
          <CodeBlock variants={same(TYPES)} />
          <P>
            <span className="font-medium text-fg">Next.js / SSR:</span> the components use React state and effects, so import them from a Client Component.
            Also keep the PostCSS setup from step 3.
          </P>
          <CodeBlock variants={{ react: NEXT_NOTE, js: SSR_NOTE, vue: SSR_NOTE, angular: SSR_NOTE }} />
        </Step>

        <Step n={7} title="Or use the Web Components (Vue, Angular, plain JS)">
          <P>
            The <Code>lojee-ui/elements</Code> entry registers <Code>&lt;l-*&gt;</Code> custom elements. It is self-contained (React is bundled inside), so it
            needs no React peer dependencies. Register it once at startup (Tailwind from steps 3–4 is what lets you use the theme tokens and Tailwind classes
            around them):
          </P>
          <CodeBlock variants={ELEMENTS_V} />
          <P>Then use the tags in any template:</P>
          <CodeBlock variants={FIRST_USE_V} />
          <P>
            Custom elements only exist in the browser, so with server-side rendering register them from client-only code. Booleans are passed as strings —
            write <Code>disabled=&quot;true&quot;</Code>, not a bare attribute.
          </P>
        </Step>

        <section className="space-y-3 rounded-xl border border-border p-4">
          <h2 className="text-lg font-semibold text-fg">What&apos;s in the package</h2>
          <ApiTable
            head={["Import", "What it is"]}
            rows={[
              ['import { … } from "lojee-ui"', "The React components, hooks (useTheme) and types — ESM and CommonJS builds."],
              ['import "lojee-ui/elements"', "Registers every <l-*> Web Component. Self-contained, browser only."],
              ['@import "lojee-ui/theme.css"', "Design tokens, accent palettes, dark mode and the Tailwind source hint. CSS only."],
            ]}
          />
        </section>

        <section className="space-y-3 rounded-xl border border-border p-4">
          <h2 className="text-lg font-semibold text-fg">Troubleshooting</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-fg-muted">
            <li>
              <span className="font-medium text-fg">Components render unstyled or colors are missing</span> — make sure Tailwind CSS v4 is installed and
              registered (step 3) and that <Code>@import &quot;lojee-ui/theme.css&quot;</Code> comes after <Code>@import &quot;tailwindcss&quot;</Code>.
            </li>
            <li>
              <span className="font-medium text-fg">Peer dependency warnings</span> — install <Code>lucide-react</Code> and <Code>tailwindcss</Code> yourself and
              keep <Code>react</Code> / <Code>react-dom</Code> on v19.
            </li>
            <li>
              <span className="font-medium text-fg">Icons are blank</span> — make sure <Code>lucide-react</Code> is installed as a peer dependency.
            </li>
            <li>
              <span className="font-medium text-fg">&quot;Cannot find module lojee-ui/elements&quot; in TypeScript</span> — set{" "}
              <Code>moduleResolution</Code> to <Code>bundler</Code>, <Code>node16</Code> or <Code>nodenext</Code>; the elements entry has no type declarations, so
              use a side-effect import (<Code>import &quot;lojee-ui/elements&quot;</Code>) as shown.
            </li>
            <li>
              <span className="font-medium text-fg">&quot;window is not defined&quot; / hydration errors</span> — the components and elements need a browser;
              render them from client code (a Client Component, or after mount).
            </li>
            <li>
              <span className="font-medium text-fg">Two copies of React</span> — if you get invalid-hook-call errors, ensure a single <Code>react</Code> is
              installed (check with <Code>npm ls react</Code>).
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
