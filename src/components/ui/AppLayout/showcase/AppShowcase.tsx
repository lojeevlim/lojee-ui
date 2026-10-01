import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { COLORS } from "../../../../core/tokens";
import { THEME_MODES, useTheme, type AccentName, type ThemeMode } from "../../../../core/theme";
import { ACTIVE_VARIANTS, type ActiveVariant } from "../../../../core/activeVariant";
import { ThemeProvider } from "../../Theme/ThemeProvider";
import { SectionLabel } from "../../ShowcaseHelpers";
import AppLayoutDemo from "../AppLayoutDemo";
import { appCodeVariants } from "../appCode";
import { gridTemplateAreas, type GridLayout } from "../appLayout";

const SIDE_FIRST: GridLayout = [
  ["side", "top"],
  ["side", "main"],
  ["side", "footer"],
];

export default function AppShowcase() {
  const { accent: siteAccent } = useTheme();
  const [mode, setMode] = useState<ThemeMode>("light");
  const [accent, setAccent] = useState<AccentName>(siteAccent);
  // Follow the site accent when it changes (the swatches below can still override it).
  const [prevSiteAccent, setPrevSiteAccent] = useState(siteAccent);
  if (prevSiteAccent !== siteAccent) {
    setPrevSiteAccent(siteAccent);
    setAccent(siteAccent);
  }
  const [activeVariant, setActiveVariant] = useState<ActiveVariant>("solid");

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="mx-auto max-w-5xl space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">App</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            A themeable app shell: compose <code>Top</code>, <code>Side</code>, <code>Main</code> and <code>Footer</code>, and the CSS Grid
            is generated from a layout matrix. Open the Playground to rearrange sections by drag and drop.
          </p>
        </div>

        <section>
          <SectionLabel sub="An isolated ThemeProvider drives the App below — its theme applies to the App and everything inside, and leaves this page's own theme alone.">
            Try it
          </SectionLabel>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {THEME_MODES.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => setMode(m.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  mode === m.value ? "bg-accent-600 text-white" : "bg-surface-muted text-fg-muted hover:bg-border"
                }`}
              >
                {m.label}
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-border" />
            {ACTIVE_VARIANTS.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setActiveVariant(v.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeVariant === v.value ? "bg-accent-600 text-white" : "bg-surface-muted text-fg-muted hover:bg-border"
                }`}
              >
                {v.label}
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
                className={`h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-surface ${accent === c.base ? "ring-fg" : "ring-transparent"}`}
              />
            ))}
          </div>
          <div className="max-w-2xl">
            <ThemeProvider isolated mode={mode} accent={accent} activeVariant={activeVariant}>
              <AppLayoutDemo />
            </ThemeProvider>
          </div>
          <CodeBlock
            variants={appCodeVariants(
              `<ThemeProvider defaultMode="${mode}" defaultAccent="${accent}"${activeVariant === "solid" ? "" : ` defaultActiveVariant="${activeVariant}"`}>
  <App>
    <Top><Navbar brand={<SideToggle />} items={[{ label: "Overview" }]} /></Top>
    <Side><Sidebar items={[{ label: "Dashboard", icon: "home" }]} /></Side>
    <Main>
      <Button color="accent" label="Solid" />
      <Button color="accent" variant="outline" label="Outline" />
      <Button color="accent" variant="soft" label="Soft" />
    </Main>
    <Footer><FooterContent /></Footer>
  </App>
</ThemeProvider>`,
              { mode, accent, activeVariant }
            )}
          />
        </section>

        <section>
          <SectionLabel sub="App follows the surrounding ThemeProvider — switch light/dark or the accent in the top bar and the first one changes. Pass theme to pin a single App instead.">
            Themes
          </SectionLabel>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="mb-1.5 text-xs font-medium text-fg-subtle">Follows ThemeProvider</p>
              <AppLayoutDemo />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-fg-subtle">theme="light"</p>
              <AppLayoutDemo theme="light" />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-fg-subtle">theme="dark"</p>
              <AppLayoutDemo theme="dark" />
            </div>
          </div>
          <CodeBlock
            variants={appCodeVariants(
              `// Wrap your app once — every App (and every component inside) follows it.
<ThemeProvider defaultMode="dark" defaultAccent="emerald">
  <App>
    <Top><Navbar brand={<SideToggle />} items={[{ label: "Overview" }]} /></Top>
    <Side><Sidebar items={[{ label: "Dashboard", icon: "home" }]} /></Side>
    <Main><Dashboard /></Main>
    <Footer><FooterContent /></Footer>
  </App>
</ThemeProvider>

// Or pin one App to a theme, regardless of the provider:
<App theme="dark" accent="rose">...</App>`,
              { mode: "dark", accent: "emerald" }
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Pass a matrix of section names; grid-template-areas is derived from it.">Dynamic layout</SectionLabel>
          <div className="max-w-xl">
            <AppLayoutDemo theme="light" layout={SIDE_FIRST} />
          </div>
          <CodeBlock
            variants={appCodeVariants(
              `<App
  layout={[
    ["side", "top"],
    ["side", "main"],
    ["side", "footer"],
  ]}
>
  ...
</App>

/* generated: grid-template-areas: ${gridTemplateAreas(SIDE_FIRST)} */`,
              { layout: SIDE_FIRST }
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Below collapseBelow (default 28rem) the grid becomes one column and Side turns into a drawer, opened with SideToggle.">Responsive</SectionLabel>
          <div className="max-w-[20rem]">
            <AppLayoutDemo theme="light" height={480} />
          </div>
          <CodeBlock
            variants={appCodeVariants(
              `<App collapseBelow="md">
  <Top>
    <Navbar brand={<SideToggle />} />
  </Top>
  <Side>
    <Sidebar />
  </Side>
  ...
</App>`,
              { collapseBelow: "28rem" }
            )}
          />
        </section>
      </div>
    </div>
  );
}
