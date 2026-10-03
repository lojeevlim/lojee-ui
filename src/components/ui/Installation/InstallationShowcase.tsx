import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import CodeBlock, { type CodeBlockVariants } from "../CodeBlock";
import { Code, P, Step } from "../DocsHelpers";
import { CODE_FRAMEWORKS, CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../../core/codeFramework";
import { pathFor } from "../../../core/routes";

// ---- small building blocks ---------------------------------------------------------------------------------------------

const same = (code: string): CodeBlockVariants => ({ react: code, js: code, vue: code, angular: code });
/** A code sample that is already open — install commands should be visible, not hidden behind "View code". */
const Snippet = ({ code }: { code: string }) => <CodeBlock defaultOpen variants={same(code)} />;

function Tip({ children }: { children: React.ReactNode }) {
  return <p className="rounded-lg bg-accent-500/10 px-3 py-2 text-sm leading-relaxed text-fg-muted">💡 {children}</p>;
}

function Expect({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm leading-relaxed text-fg-muted">
      <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
      <span>{children}</span>
    </p>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3 rounded-xl border border-border p-4">
      <h2 className="text-lg font-semibold text-fg">{title}</h2>
      {children}
    </section>
  );
}

function Problems({ items }: { items: [problem: string, fix: React.ReactNode][] }) {
  return (
    <ul className="space-y-2.5 text-sm text-fg-muted">
      {items.map(([problem, fix]) => (
        <li key={problem}>
          <span className="font-medium text-fg">{problem}</span>
          <br />
          {fix}
        </li>
      ))}
    </ul>
  );
}

function Checklist({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-fg-muted">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <Check size={16} className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const STACK_BLURB: Record<CodeFramework, string> = {
  react: "React components, imported like any other library.",
  vue: "Web Components that work in any Vue 3 app.",
  angular: "Web Components that work in any Angular app.",
  js: "Web Components for plain JavaScript or TypeScript — no framework needed.",
};

// ---- shared code ---------------------------------------------------------------------------------------------------------

const CSS_FILE = (file: string) => `/* ${file} */
@import "tailwindcss";
@import "lojee-ui/theme.css";`;

const VITE_REACT = `// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`;

const POSTCSS = `# Next.js, Remix, webpack, Parcel … — use the PostCSS plugin instead of the Vite one
npm install tailwindcss @tailwindcss/postcss postcss

// postcss.config.mjs
export default {
  plugins: { "@tailwindcss/postcss": {} },
};`;

// ---- React ---------------------------------------------------------------------------------------------------------------

function ReactGuide() {
  return (
    <>
      <Panel title="Before you start">
        <Checklist
          items={[
            <>
              <strong className="text-fg">Node.js 20 or newer</strong> — check with <Code>node -v</Code>.
            </>,
            <>
              <strong className="text-fg">A React 19 project</strong> — new or existing. Vite is used below, but Next.js and others work too.
            </>,
            <>About 5 minutes. You will install the library, Tailwind CSS v4, and add two lines of CSS.</>,
          ]}
        />
      </Panel>

      <div className="space-y-10">
        <Step n={1} title="Create a project (skip if you already have one)">
          <P>This makes a fresh React + TypeScript app with Vite.</P>
          <Snippet code={`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`} />
        </Step>

        <Step n={2} title="Install lojee-ui">
          <P>
            Install the library and its icon package. <Code>react</Code> and <Code>react-dom</Code> (v19) must already be in your project — the template above
            has them.
          </P>
          <Snippet code="npm install lojee-ui lucide-react" />
        </Step>

        <Step n={3} title="Install Tailwind CSS v4">
          <P>
            lojee-ui is styled with Tailwind classes that <em>your</em> project builds, so there is no extra stylesheet to download. Install Tailwind and its Vite
            plugin:
          </P>
          <Snippet code="npm install tailwindcss @tailwindcss/vite" />
          <P>Then switch the plugin on in your Vite config:</P>
          <Snippet code={VITE_REACT} />
          <Tip>
            Not using Vite — Next.js, for example? Use the PostCSS plugin instead:
          </Tip>
          <Snippet code={POSTCSS} />
        </Step>

        <Step n={4} title="Add the styles">
          <P>
            Open your main CSS file and add these two lines — Tailwind first, then <Code>lojee-ui/theme.css</Code>. That one extra line gives you the colors, dark
            mode and every class the components need.
          </P>
          <Snippet code={CSS_FILE("src/index.css")} />
          <P>Make sure that file is imported once, in your entry file:</P>
          <Snippet code={`// src/main.tsx   (Next.js: app/layout.tsx)
import "./index.css";`} />
        </Step>

        <Step n={5} title="Use your first component">
          <P>
            Components are named imports. Replace the contents of <Code>src/App.tsx</Code> with this, then run <Code>npm run dev</Code>:
          </P>
          <Snippet code={`// src/App.tsx
import { Button, Badge } from "lojee-ui";

export default function App() {
  return (
    <div className="space-y-4 p-8">
      <Badge variant="soft" color="accent" label="lojee-ui is working" />
      <div className="flex gap-2">
        <Button color="accent" label="Primary" />
        <Button variant="outline" label="Outline" />
      </div>
    </div>
  );
}`} />
          <Expect>You should see a soft badge and two buttons, styled in the theme accent color.</Expect>
        </Step>

        <Step n={6} title="Good to know">
          <P>
            <strong className="text-fg">TypeScript</strong> — types are included, nothing extra to install. Use a modern module resolution in{" "}
            <Code>tsconfig.json</Code>:
          </P>
          <Snippet code={`{
  "compilerOptions": {
    "moduleResolution": "bundler",   // or "node16" / "nodenext"
    "jsx": "react-jsx"
  }
}`} />
          <P>
            <strong className="text-fg">Next.js</strong> — components use React state, so import them from a Client Component:
          </P>
          <Snippet code={`"use client";

import { Button } from "lojee-ui";

export default function Page() {
  return <Button color="accent" label="Hello" />;
}`} />
          <P>
            <strong className="text-fg">Maps</strong> — only if you use <Code>Map</Code>: <Code>npm install maplibre-gl</Code>.
          </P>
        </Step>
      </div>

      <Panel title="If something looks wrong">
        <Problems
          items={[
            ["Buttons look plain / unstyled", <>Tailwind isn&apos;t running. Check step 3, and that <Code>lojee-ui/theme.css</Code> is imported <em>after</em> <Code>tailwindcss</Code> (step 4).</>],
            ["Icons are blank", <>Install <Code>lucide-react</Code> (step 2).</>],
            ["Peer dependency warnings", <>Keep <Code>react</Code> / <Code>react-dom</Code> on v19 and install <Code>tailwindcss</Code> v4 yourself.</>],
            ["“Invalid hook call”", <>Two copies of React are installed. Run <Code>npm ls react</Code> and keep just one.</>],
            ["“window is not defined”", <>The component ran on the server. Render it from a Client Component (Next.js) or after mount.</>],
          ]}
        />
      </Panel>
    </>
  );
}

// ---- Vue ---------------------------------------------------------------------------------------------------------------

function VueGuide() {
  return (
    <>
      <Panel title="Before you start">
        <Checklist
          items={[
            <>
              <strong className="text-fg">Node.js 20 or newer</strong> — check with <Code>node -v</Code>.
            </>,
            <>
              <strong className="text-fg">A Vue 3 project</strong> — new or existing. Vite is used below.
            </>,
            <>
              <strong className="text-fg">No React needed.</strong> lojee-ui ships Web Components (<Code>&lt;l-button&gt;</Code>, <Code>&lt;l-card&gt;</Code> …) that work in Vue
              as they are.
            </>,
          ]}
        />
      </Panel>

      <div className="space-y-10">
        <Step n={1} title="Create a project (skip if you already have one)">
          <Snippet code={`npm create vite@latest my-app -- --template vue-ts
cd my-app
npm install`} />
        </Step>

        <Step n={2} title="Install lojee-ui">
          <Snippet code="npm install lojee-ui" />
        </Step>

        <Step n={3} title="Tell Vue that “l-” tags are Web Components">
          <P>
            Without this, Vue warns <em>“Failed to resolve component: l-button”</em>. One line in <Code>vite.config.ts</Code> fixes it:
          </P>
          <Snippet code={`// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.startsWith("l-") } } }),
    tailwindcss(),
  ],
});`} />
        </Step>

        <Step n={4} title="Add Tailwind CSS (recommended)">
          <P>
            The <Code>&lt;l-*&gt;</Code> components carry their own styles, so they look right even without Tailwind. Add it if you want to use the same colors, dark
            mode and Tailwind classes in <em>your own</em> markup.
          </P>
          <Snippet code="npm install tailwindcss @tailwindcss/vite" />
          <Snippet code={CSS_FILE("src/style.css")} />
        </Step>

        <Step n={5} title="Register the components once">
          <P>Import the elements (and your CSS) in <Code>src/main.ts</Code> — that registers every <Code>&lt;l-*&gt;</Code> tag:</P>
          <Snippet code={`// src/main.ts
import "lojee-ui/elements";
import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");`} />
        </Step>

        <Step n={6} title="Use your first component">
          <P>Replace <Code>src/App.vue</Code> with this and run <Code>npm run dev</Code>:</P>
          <Snippet code={`<template>
  <l-card>
    <l-badge variant="soft" label="lojee-ui is working" />
    <l-button color="accent" label="Get started" />
  </l-card>
</template>`} />
          <Expect>You should see a card with a soft badge and an accent-colored button.</Expect>
        </Step>

        <Step n={7} title="Good to know">
          <P>
            <strong className="text-fg">Text values</strong> are plain attributes (<Code>label=&quot;Save&quot;</Code>). A true/false switch can be written bare
            (<Code>&lt;l-button loading&gt;</Code>) or as <Code>loading=&quot;true&quot;</Code>.
          </P>
          <P>
            <strong className="text-fg">Lists and objects</strong> use a binding, and <strong className="text-fg">events</strong> use <Code>@</Code> — the value
            arrives in <Code>$event.detail</Code>:
          </P>
          <Snippet code={`<script setup lang="ts">
import { ref } from "vue";
const items = ref([{ label: "Dashboard", icon: "home" }]);
const onPage = (e: CustomEvent) => console.log(e.detail);
</script>

<template>
  <l-sidebar :items="items" />
  <l-pagination page="1" total-pages="8" @pagechange="onPage" />
</template>`} />
          <P>
            <strong className="text-fg">Nuxt / server rendering</strong> — Web Components only exist in the browser. Register them from a client-only plugin:{" "}
            <Code>await import(&quot;lojee-ui/elements&quot;)</Code>.
          </P>
        </Step>
      </div>

      <Panel title="If something looks wrong">
        <Problems
          items={[
            ["“Failed to resolve component: l-…”", <>Add the <Code>isCustomElement</Code> line from step 3 and restart the dev server.</>],
            ["Nothing renders", <>Make sure <Code>import &quot;lojee-ui/elements&quot;</Code> runs before the app mounts (step 5).</>],
            ["A list or object prop is ignored", <>Pass it with a binding — <Code>:items=&quot;items&quot;</Code> — not as a plain attribute.</>],
            ["“Cannot find module lojee-ui/elements” in TypeScript", <>Set <Code>moduleResolution</Code> to <Code>bundler</Code> in <Code>tsconfig.json</Code>.</>],
          ]}
        />
      </Panel>
    </>
  );
}

// ---- Angular -------------------------------------------------------------------------------------------------------------

function AngularGuide() {
  return (
    <>
      <Panel title="Before you start">
        <Checklist
          items={[
            <>
              <strong className="text-fg">Node.js 20 or newer</strong> — check with <Code>node -v</Code>.
            </>,
            <>
              <strong className="text-fg">An Angular project</strong> — new or existing, using standalone components.
            </>,
            <>
              <strong className="text-fg">No React needed.</strong> lojee-ui ships Web Components (<Code>&lt;l-button&gt;</Code>, <Code>&lt;l-card&gt;</Code> …) that Angular can use directly.
            </>,
          ]}
        />
      </Panel>

      <div className="space-y-10">
        <Step n={1} title="Create a project (skip if you already have one)">
          <Snippet code={`npx @angular/cli new my-app
cd my-app`} />
        </Step>

        <Step n={2} title="Install lojee-ui">
          <Snippet code="npm install lojee-ui" />
        </Step>

        <Step n={3} title="Add Tailwind CSS (recommended)">
          <P>
            The <Code>&lt;l-*&gt;</Code> components carry their own styles, so they work without Tailwind. Add it to use the same colors, dark mode and classes in{" "}
            <em>your own</em> templates. Angular uses the PostCSS plugin:
          </P>
          <Snippet code="npm install tailwindcss @tailwindcss/postcss postcss" />
          <Snippet code={`// .postcssrc.json   (project root)
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}`} />
          <Snippet code={CSS_FILE("src/styles.css")} />
          <Tip>
            Check that <Code>angular.json</Code> lists the file under <Code>projects → your-app → architect → build → options → styles</Code>:{" "}
            <Code>&quot;src/styles.css&quot;</Code>. New projects already do.
          </Tip>
        </Step>

        <Step n={4} title="Register the components once">
          <P>Import the elements in <Code>src/main.ts</Code> — that registers every <Code>&lt;l-*&gt;</Code> tag:</P>
          <Snippet code={`// src/main.ts
import "lojee-ui/elements";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent);`} />
        </Step>

        <Step n={5} title="Use your first component">
          <P>
            Angular needs <Code>CUSTOM_ELEMENTS_SCHEMA</Code> on any component whose template uses <Code>&lt;l-*&gt;</Code> tags — it tells Angular they are Web Components,
            not Angular ones.
          </P>
          <Snippet code={`// src/app/app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-card>
      <l-badge variant="soft" label="lojee-ui is working"></l-badge>
      <l-button color="accent" label="Get started"></l-button>
    </l-card>
  \`,
})
export class AppComponent {}`} />
          <P>Run <Code>ng serve</Code>.</P>
          <Expect>You should see a card with a soft badge and an accent-colored button.</Expect>
        </Step>

        <Step n={6} title="Good to know">
          <P>
            <strong className="text-fg">Text values</strong> are plain attributes. A true/false switch can be written bare or as <Code>loading=&quot;true&quot;</Code>.
          </P>
          <P>
            <strong className="text-fg">Lists and objects</strong> use a <Code>[property]</Code> binding, and <strong className="text-fg">events</strong> use{" "}
            <Code>(event)</Code> — the value arrives in <Code>$event.detail</Code>:
          </P>
          <Snippet code={`// in the component class
items = [{ label: "Dashboard", icon: "home" }];
onPage(e: Event) { console.log((e as CustomEvent).detail); }

// in the template
<l-sidebar [items]="items"></l-sidebar>
<l-pagination page="1" total-pages="8" (pagechange)="onPage($event)"></l-pagination>`} />
          <P>
            <strong className="text-fg">Server rendering (Angular SSR)</strong> — Web Components only exist in the browser. Register them from client-only code, for
            example inside <Code>afterNextRender()</Code>: <Code>await import(&quot;lojee-ui/elements&quot;)</Code>.
          </P>
        </Step>
      </div>

      <Panel title="If something looks wrong">
        <Problems
          items={[
            ["“'l-button' is not a known element”", <>Add <Code>schemas: [CUSTOM_ELEMENTS_SCHEMA]</Code> to that component (step 5).</>],
            ["Nothing renders", <>Make sure <Code>import &quot;lojee-ui/elements&quot;</Code> is in <Code>main.ts</Code> (step 4).</>],
            ["A list or object prop is ignored", <>Use a property binding — <Code>[items]=&quot;items&quot;</Code> — not a plain attribute.</>],
            ["Tailwind classes have no effect in my templates", <>Check <Code>.postcssrc.json</Code> and that <Code>src/styles.css</Code> is listed in <Code>angular.json</Code> (step 3).</>],
          ]}
        />
      </Panel>
    </>
  );
}

// ---- Plain JS / TS -------------------------------------------------------------------------------------------------------

function PlainGuide() {
  return (
    <>
      <Panel title="Before you start">
        <Checklist
          items={[
            <>
              <strong className="text-fg">Node.js 20 or newer</strong> — check with <Code>node -v</Code>.
            </>,
            <>
              <strong className="text-fg">Any project with a bundler</strong> — Vite is used below. No framework and no React needed.
            </>,
            <>
              lojee-ui gives you Web Components — write <Code>&lt;l-button&gt;</Code> in plain HTML and they just work.
            </>,
          ]}
        />
      </Panel>

      <div className="space-y-10">
        <Step n={1} title="Create a project (skip if you already have one)">
          <Snippet code={`npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm install`} />
        </Step>

        <Step n={2} title="Install lojee-ui">
          <Snippet code="npm install lojee-ui" />
        </Step>

        <Step n={3} title="Add Tailwind CSS (recommended)">
          <P>
            The <Code>&lt;l-*&gt;</Code> components carry their own styles, so they look right even without Tailwind. Add it if you want the same colors, dark mode and
            classes in <em>your own</em> markup.
          </P>
          <Snippet code="npm install tailwindcss @tailwindcss/vite" />
          <Snippet code={`// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});`} />
          <Snippet code={CSS_FILE("src/style.css")} />
        </Step>

        <Step n={4} title="Register the components once">
          <P>Import the elements (and your CSS) in your entry file — that registers every <Code>&lt;l-*&gt;</Code> tag:</P>
          <Snippet code={`// src/main.ts
import "lojee-ui/elements";
import "./style.css";`} />
        </Step>

        <Step n={5} title="Use your first component">
          <P>Put the tags straight into <Code>index.html</Code> and run <Code>npm run dev</Code>:</P>
          <Snippet code={`<!-- index.html -->
<l-card>
  <l-badge variant="soft" label="lojee-ui is working"></l-badge>
  <l-button color="accent" label="Get started"></l-button>
</l-card>

<script type="module" src="/src/main.ts"></script>`} />
          <Expect>You should see a card with a soft badge and an accent-colored button.</Expect>
        </Step>

        <Step n={6} title="Good to know">
          <P>
            <strong className="text-fg">Text values</strong> are plain attributes. A true/false switch can be written bare (<Code>&lt;l-button loading&gt;</Code>) or as{" "}
            <Code>loading=&quot;true&quot;</Code>.
          </P>
          <P>
            <strong className="text-fg">Lists and objects</strong> are set from JavaScript, and <strong className="text-fg">events</strong> use{" "}
            <Code>addEventListener</Code> — the value is in <Code>e.detail</Code>:
          </P>
          <Snippet code={`<l-sidebar id="nav"></l-sidebar>
<l-pagination id="pager" page="1" total-pages="8"></l-pagination>

<script type="module">
  document.getElementById("nav").items = [{ label: "Dashboard", icon: "home" }];
  document.getElementById("pager").addEventListener("pagechange", (e) => console.log(e.detail));
</script>`} />
          <P>
            <strong className="text-fg">TypeScript</strong> — import the elements as a side effect, exactly as above, and set{" "}
            <Code>&quot;moduleResolution&quot;: &quot;bundler&quot;</Code> in <Code>tsconfig.json</Code>.
          </P>
        </Step>
      </div>

      <Panel title="If something looks wrong">
        <Problems
          items={[
            ["Tags show up as plain text / nothing renders", <>Make sure <Code>import &quot;lojee-ui/elements&quot;</Code> runs (step 4) — the tags only become components after it.</>],
            ["A list or object prop is ignored", <>Set it from JavaScript (<Code>el.items = [...]</Code>) — HTML attributes can only hold text.</>],
            ["“Cannot find module lojee-ui/elements” in TypeScript", <>Set <Code>moduleResolution</Code> to <Code>bundler</Code> and keep the side-effect import form.</>],
            ["Tailwind classes have no effect", <>Check step 3: the Vite plugin and the two <Code>@import</Code> lines.</>],
          ]}
        />
      </Panel>
    </>
  );
}

// ---- page ------------------------------------------------------------------------------------------------------------------

const GUIDE: Record<CodeFramework, () => React.JSX.Element> = { react: ReactGuide, vue: VueGuide, angular: AngularGuide, js: PlainGuide };

export default function InstallationShowcase() {
  const { framework, setFramework } = useCodeFramework();
  const Guide = GUIDE[framework];

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Installation</h1>
          <p className="mt-1 text-sm text-fg-subtle">Get lojee-ui running in a few minutes. Pick your stack — this guide only shows the steps you need.</p>
        </div>

        <div role="tablist" aria-label="Choose your stack" className="inline-flex flex-wrap gap-1.5 rounded-xl bg-surface-muted p-1">
          {CODE_FRAMEWORKS.map(({ value }) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={framework === value}
              onClick={() => setFramework(value)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                framework === value ? "bg-surface text-fg shadow-sm" : "text-fg-muted hover:text-fg"
              }`}
            >
              {CODE_FRAMEWORK_LABEL[value]}
            </button>
          ))}
        </div>
        <p className="text-sm text-fg-muted">
          <strong className="text-fg">{CODE_FRAMEWORK_LABEL[framework]}:</strong> {STACK_BLURB[framework]} You can also switch language from the menu in the page header.
        </p>
      </header>

      <Guide />

      <Panel title="What's next?">
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-fg-muted">
          <li>
            Make it yours — light / dark mode, accent colors and the <strong className="text-fg">Bento UI</strong> or <strong className="text-fg">Claymorphism</strong>{" "}
            design — on the <Link className="font-medium text-accent-600 underline underline-offset-2 dark:text-accent-400" to={pathFor("docs", "Theming")}>Theming</Link> page.
          </li>
          <li>
            Browse the components in the sidebar — each page has live examples, a playground, and code for{" "}
            <strong className="text-fg">{CODE_FRAMEWORK_LABEL[framework]}</strong>.
          </li>
        </ul>
      </Panel>
    </div>
  );
}
