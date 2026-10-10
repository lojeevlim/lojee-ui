import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { ThemeSwitcher } from "../ThemeSwitcher";

const ALIGNS = ["start", "center", "end"] as const;

export default function ThemeSwitcherShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Theme Switcher</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          The menu the lojee-ui navbar uses: light/dark, the accent color and the active-item style in one dropdown. It changes the app theme
          by itself — no ThemeProvider and no wiring needed. It writes the theme onto the page, remembers the choice, and restores it on the next
          visit.
        </p>
      </div>

      <section className="mt-10">
        <SectionLabel sub="Drop it anywhere — typically in a Navbar's actions. Inside a ThemeProvider it drives that provider; without one it sets the page theme directly.">Basic</SectionLabel>
        <div className="flex min-h-[60px] items-start">
          <ThemeSwitcher align="start" />
        </div>
        <CodeBlock
          variants={{
            react: `<ThemeSwitcher />`,
            js: `<l-theme-switcher></l-theme-switcher>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-theme-switcher></l-theme-switcher>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-theme-switcher></l-theme-switcher>`,
          }}
        />
      </section>

      <section className="mt-10">
        <SectionLabel sub="showAccent and showActiveItems trim the menu; align picks the edge it lines up with.">Trimmed menus</SectionLabel>
        <div className="flex min-h-[60px] flex-wrap items-start gap-4">
          <ThemeSwitcher showActiveItems={false} align="start" />
          <ThemeSwitcher showActiveItems={false} showAccent={false} align="start" />
        </div>
        <CodeBlock
          variants={{
            react: `<ThemeSwitcher showActiveItems={false} align="start" />
<ThemeSwitcher showActiveItems={false} showAccent={false} />`,
            js: `<l-theme-switcher show-active-items="false" align="start"></l-theme-switcher>
<l-theme-switcher show-active-items="false" show-accent="false"></l-theme-switcher>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-theme-switcher :show-active-items="false" align="start"></l-theme-switcher>
  <l-theme-switcher :show-active-items="false" :show-accent="false"></l-theme-switcher>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-theme-switcher [showActiveItems]="false" align="start"></l-theme-switcher>
<l-theme-switcher [showActiveItems]="false" [showAccent]="false"></l-theme-switcher>`,
          }}
        />
      </section>

      <section className="mt-10">
        <SectionLabel sub={`The dropdown always opens below the button. \`align\` ("start" | "center" | "end") picks where it lines up with the button: start aligns the left edges, end aligns the right edges (default), center centers it. The button never moves — only the dropdown does.`}>
          Dropdown alignment
        </SectionLabel>
        {/* Trimmed to the Theme section so each open dropdown is short. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ALIGNS.map((align) => (
            <div key={align} className="flex min-h-[200px] flex-col gap-2 rounded-lg border border-dashed border-border p-3">
              <span className="font-mono text-[11px] text-fg-subtle">align="{align}"</span>
              <div className="flex flex-1 items-start justify-center">
                <ThemeSwitcher align={align} showActiveItems={false} showAccent={false} open />
              </div>
            </div>
          ))}
        </div>
        <CodeBlock
          variants={{
            react: `<ThemeSwitcher align="start" />
<ThemeSwitcher align="center" />
<ThemeSwitcher align="end" />`,
            js: `<l-theme-switcher align="start"></l-theme-switcher>
<l-theme-switcher align="center"></l-theme-switcher>
<l-theme-switcher align="end"></l-theme-switcher>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-theme-switcher align="start"></l-theme-switcher>
  <l-theme-switcher align="center"></l-theme-switcher>
  <l-theme-switcher align="end"></l-theme-switcher>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-theme-switcher align="start"></l-theme-switcher>
<l-theme-switcher align="center"></l-theme-switcher>
<l-theme-switcher align="end"></l-theme-switcher>`,
          }}
        />
      </section>

      <section className="mt-10">
        <SectionLabel sub="Pass mode / accent / activeVariant and the on…Change callbacks to drive it from your own state instead of a ThemeProvider.">Controlled</SectionLabel>
        <CodeBlock
          variants={{
            react: `const [mode, setMode] = useState<"light" | "dark">("light");

<ThemeSwitcher mode={mode} onModeChange={setMode} showAccent={false} showActiveItems={false} />`,
            js: `<l-theme-switcher id="switcher" show-accent="false" show-active-items="false"></l-theme-switcher>

<!-- <l-theme-switcher> reads and writes the page theme on <html> (data-theme / data-accent / data-active-variant),
     and remembers the choice in localStorage. -->`,
            vue: `<!-- <l-theme-switcher> reads and writes the page theme on <html>; no v-model needed. -->
<l-theme-switcher :show-accent="false" :show-active-items="false"></l-theme-switcher>`,
            angular: `<!-- <l-theme-switcher> reads and writes the page theme on <html>; no binding needed. -->
<l-theme-switcher [showAccent]="false" [showActiveItems]="false"></l-theme-switcher>`,
          }}
        />
      </section>
    </div>
  );
}
