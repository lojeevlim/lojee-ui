import { useState } from "react";
import { AppWindowFrame, ColorSwatches, OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import type { AccentName } from "../../core/theme";
import { ACTIVE_VARIANTS, type ActiveVariant } from "../../core/activeVariant";
import type { ColorName } from "../../core/tokens";
import { ThemeProvider } from "./Theme/ThemeProvider";
import AppLayoutDemo from "./AppLayout/AppLayoutDemo";
import LayoutEditor from "./AppLayout/LayoutEditor";
import {
  APP_THEME_OPTIONS,
  DEFAULT_LAYOUT,
  type AppTheme,
  type GridLayout,
} from "./AppLayout/appLayout";

const VIEWPORTS = ["desktop", "mobile"] as const;
type Viewport = (typeof VIEWPORTS)[number];
// Widths chosen around the default collapse point (28rem): the App switches layout by its own width.
const VIEWPORT_WIDTH: Record<Viewport, string> = { desktop: "100%", mobile: "320px" };

const sameLayout = (a: GridLayout, b: GridLayout) => JSON.stringify(a) === JSON.stringify(b);

export default function AppLayoutPlayground() {
  const [theme, setTheme] = useState<AppTheme>("light");
  const [accent, setAccent] = useState<AccentName>("indigo");
  const [activeVariant, setActiveVariant] = useState<ActiveVariant>("solid");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [layout, setLayout] = useState<GridLayout>(DEFAULT_LAYOUT);

  const isDefault = sameLayout(layout, DEFAULT_LAYOUT);
  const layoutProp = isDefault
    ? ""
    : `\n  layout={[\n${layout.map((row) => `    [${row.map((s) => `"${s}"`).join(", ")}],`).join("\n")}\n  ]}\n`;
  const appTag = layoutProp ? `<App${layoutProp}>` : `<App>`;

  const activeProp = activeVariant === "solid" ? "" : ` defaultActiveVariant="${activeVariant}"`;

  const code = `<ThemeProvider defaultMode="${theme}" defaultAccent="${accent}"${activeProp}>
  ${appTag.replace(/\n/g, "\n  ")}
    <Top>
      <Navbar brand={<SideToggle />} items={[{ label: "Overview" }, { label: "Reports" }]} />
    </Top>

    <Side>
      <Sidebar items={[{ label: "Dashboard", icon: "home" }]} />
    </Side>

    <Main>
      <Button color="accent" label="Solid" />
      <Button color="accent" variant="outline" label="Outline" />
      <Button color="accent" variant="soft" label="Soft" />
    </Main>

    <Footer>
      <FooterContent />
    </Footer>
  </App>
</ThemeProvider>`;

  const codeVariants: CodeBlockVariants = { react: code };

  return (
    <PlaygroundLayout preview={
        <AppWindowFrame>
          <div className="relative min-h-[320px] flex-1 bg-surface-muted">
            <div
              className="absolute inset-y-0 left-1/2 max-w-full -translate-x-1/2 transition-[width] duration-300"
              style={{ width: VIEWPORT_WIDTH[viewport] }}
            >
              <ThemeProvider isolated mode={theme} accent={accent} activeVariant={activeVariant}>
                <AppLayoutDemo bare height="100%" layout={layout} />
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
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-medium text-fg-subtle">Layout — drag a section onto a cell to grow it there, or onto an edge to dock it</span>
          <button
            type="button"
            disabled={isDefault}
            onClick={() => setLayout(DEFAULT_LAYOUT)}
            className="text-xs text-fg-muted underline underline-offset-2 hover:text-fg disabled:opacity-40 disabled:no-underline"
          >
            Reset
          </button>
        </div>
        <div className="rounded-lg border border-border bg-surface-muted">
          <LayoutEditor layout={layout} onChange={setLayout} />
        </div>
      </div>
    </PlaygroundLayout>
  );
}
