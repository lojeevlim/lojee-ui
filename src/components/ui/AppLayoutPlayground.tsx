import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { AppWindowFrame, ColorSwatches, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useTheme, type AccentName } from "../../core/theme";
import { ACTIVE_VARIANTS, type ActiveVariant } from "../../core/activeVariant";
import type { ColorName } from "../../core/tokens";
import { ThemeProvider } from "./Theme/ThemeProvider";
import AppLayoutDemo from "./AppLayout/AppLayoutDemo";
import LayoutEditor from "./AppLayout/LayoutEditor";
import { appCodeVariants } from "./AppLayout/appCode";
import {
  APP_THEME_OPTIONS,
  DEFAULT_LAYOUT,
  LAYOUT_PRESETS,
  withoutSections,
  type AppSection,
  type AppTheme,
  type GridLayout,
} from "./AppLayout/appLayout";

const VIEWPORTS = ["desktop", "mobile"] as const;
type Viewport = (typeof VIEWPORTS)[number];
// Widths chosen around the default collapse point (28rem): the App switches layout by its own width.
const VIEWPORT_WIDTH: Record<Viewport, string> = { desktop: "100%", mobile: "320px" };

const sameLayout = (a: GridLayout, b: GridLayout) => JSON.stringify(a) === JSON.stringify(b);

export default function AppLayoutPlayground() {
  const { accent: siteAccent } = useTheme();
  const [theme, setTheme] = useState<AppTheme>("light");
  const [accent, setAccent] = useState<AccentName>(siteAccent);
  // Follow the site accent when it changes (the swatches can still override it).
  const [prevSiteAccent, setPrevSiteAccent] = useState(siteAccent);
  if (prevSiteAccent !== siteAccent) {
    setPrevSiteAccent(siteAccent);
    setAccent(siteAccent);
  }
  const [activeVariant, setActiveVariant] = useState<ActiveVariant>("solid");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [layout, setLayout] = useState<GridLayout>(DEFAULT_LAYOUT);
  // Sections taken out of the shell. The layout above keeps their cells, so adding one back puts it where it was.
  const [hidden, setHidden] = useState<AppSection[]>([]);
  const toggleSection = (section: AppSection) => setHidden((h) => (h.includes(section) ? h.filter((x) => x !== section) : [...h, section]));
  // What is actually drawn and put in the code: the layout without the removed sections.
  const shown = withoutSections(layout, hidden);
  const has = (section: AppSection) => !hidden.includes(section);

  const isDefault = sameLayout(layout, DEFAULT_LAYOUT) && hidden.length === 0;
  const shownIsDefault = sameLayout(shown, DEFAULT_LAYOUT);
  const layoutProp = shownIsDefault
    ? ""
    : `\n  layout={[\n${shown.map((row) => `    [${row.map((s) => `"${s}"`).join(", ")}],`).join("\n")}\n  ]}\n`;
  const appTag = layoutProp ? `<App${layoutProp}>` : `<App>`;

  const activeProp = activeVariant === "solid" ? "" : ` defaultActiveVariant="${activeVariant}"`;

  const topCode = `    <Top>
      <Navbar brand={<SideToggle />} items={[{ label: "Overview" }, { label: "Reports" }]} />
    </Top>
`;
  const sideCode = `    <Side>
      <Sidebar items={[{ label: "Dashboard", icon: "home" }]} />
    </Side>
`;
  const footCode = `    <Foot>
      <Footer bottom="© 2026 Lojee, Inc. All rights reserved." variant="minimal" />
    </Foot>
`;
  const mainCode = `    <Main>
      <Button color="accent" label="Solid" />
      <Button color="accent" variant="outline" label="Outline" />
      <Button color="accent" variant="soft" label="Soft" />
      <Button variant="solid" color="accent" size="lg" animated="sweep" icon="plus" label="Click me" />
    </Main>
`;
  const parts = [has("top") && topCode, has("side") && sideCode, mainCode, has("footer") && footCode].filter(Boolean).join("\n");

  const code = `<ThemeProvider defaultMode="${theme}" defaultAccent="${accent}"${activeProp}>
  ${appTag.replace(/\n/g, "\n  ")}
${parts}  </App>
</ThemeProvider>`;

  const codeVariants: CodeBlockVariants = appCodeVariants(code, { layout: shown, hidden, mode: theme, accent, activeVariant });

  return (
    <PlaygroundLayout preview={
        <AppWindowFrame>
          <div className={`relative min-h-[320px] flex-1 ${PREVIEW_PAGE_BG}`}>
            <div
              className="absolute inset-y-0 left-1/2 max-w-full -translate-x-1/2 transition-[width] duration-300"
              style={{ width: VIEWPORT_WIDTH[viewport] }}
            >
              <ThemeProvider isolated mode={theme} accent={accent} activeVariant={activeVariant}>
                <AppLayoutDemo bare height="100%" layout={shown} hidden={hidden} />
              </ThemeProvider>
            </div>
          </div>
        </AppWindowFrame>
      } variants={codeVariants}>
      <div>
        <label htmlFor="app-theme" className="mb-1.5 block text-xs font-medium text-fg-subtle">
          Theme
        </label>
        <select
          id="app-theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as AppTheme)}
          className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
        >
          {APP_THEME_OPTIONS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <OptionGroup label="Viewport (responsive)" options={VIEWPORTS} value={viewport} onChange={setViewport} />

      <OptionGroup
        label="Active items"
        options={ACTIVE_VARIANTS.map((v) => v.value)}
        value={activeVariant}
        onChange={setActiveVariant}
      />

      <ColorSwatches label="Accent" value={accent as ColorName} onChange={(c) => setAccent(c as AccentName)} />

      <div className="sm:col-span-2">
        <div className="mb-3">
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Sections — remove or add back</span>
          <div className="flex flex-wrap gap-1.5">
            {(["top", "side", "footer"] as const).map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => toggleSection(section)}
                aria-pressed={has(section)}
                title={has(section) ? `Remove ${section}` : `Add ${section} back`}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  has(section) ? "border-border-strong bg-surface text-fg hover:bg-surface-muted" : "border-dashed border-border text-fg-subtle hover:text-fg"
                }`}
              >
                <span aria-hidden>{has(section) ? "×" : "+"}</span>
                {section}
              </button>
            ))}
            <span className="inline-flex items-center rounded-md border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-fg-subtle" title="Main is always shown">
              main
            </span>
          </div>
        </div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-fg-subtle">Layout — pick a preset</span>
          <button
            type="button"
            disabled={isDefault}
            onClick={() => {
              setLayout(DEFAULT_LAYOUT);
              setHidden([]);
            }}
            className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-fg-muted transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-40"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 pb-3 sm:grid-cols-4">
          {LAYOUT_PRESETS.map((pr) => {
            const active = sameLayout(layout, pr.layout);
            return (
              <button
                key={pr.name}
                type="button"
                onClick={() => setLayout(pr.layout)}
                className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                  active ? "border-accent-600 bg-accent-600 text-white shadow-md" : "border-border text-fg-muted hover:-translate-y-0.5 hover:bg-surface-muted"
                }`}
              >
                {pr.name}
              </button>
            );
          })}
        </div>
        <LayoutEditor layout={layout} hidden={hidden} />
      </div>
    </PlaygroundLayout>
  );
}
