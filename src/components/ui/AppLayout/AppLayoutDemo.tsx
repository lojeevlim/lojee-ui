// Demo-only sample content for the App Layout playground and showcase — the real <App>, <Top>, <Side>,
// <Main> and <Foot> composed with existing Navbar / Sidebar / Footer components (no separate mock).
import { Button } from "../Buttons/Button";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { App, Top, Side, Main, Foot, SideToggle } from "./App";
import type { AccentName } from "../../../core/theme";
import type { AppTheme, GridLayout } from "./appLayout";

export default function AppLayoutDemo({ theme, accent, layout, height = 360, bare = false }: { theme?: AppTheme; accent?: AccentName; layout?: GridLayout; height?: number | string; bare?: boolean }) {
  return (
    <div className={bare ? "w-full overflow-hidden" : "w-full overflow-hidden rounded-lg border border-border"} style={{ height }}>
      <App className="h-full" theme={theme} accent={accent} layout={layout}>
        <Top>
          <Navbar color="accent" brand={
              <>
                <SideToggle />
                <span className="text-sm font-semibold">Lojee</span>
              </>
            } items={[{ label: "Overview", active: true }, { label: "Reports" }]} />
        </Top>
        <Side>
          <Sidebar
            color="accent"
            width={150}
            height="100%"
            collapsible={false}
            items={[
              { label: "Dashboard", icon: "home", active: true },
              { label: "Team", icon: "users" },
              { label: "Settings", icon: "settings" },
            ]}
          />
        </Side>
        <Main>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-fg">Dashboard</h3>
            <p className="text-xs text-fg-muted">Main content scrolls on its own inside the grid.</p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" color="accent" label="Solid" />
              <Button size="sm" color="accent" variant="outline" label="Outline" />
              <Button size="sm" color="accent" variant="soft" label="Soft" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Revenue", "Orders", "Visitors", "Churn"].map((label) => (
                <div key={label} className="rounded-md border border-border bg-surface-muted p-3 text-xs text-fg-muted">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Main>
        <Foot>
          <div className="border-t border-border bg-surface-muted px-8 py-1.5 text-[11px] text-fg-subtle">© 2026 Lojee, Inc.</div>
        </Foot>
      </App>
    </div>
  );
}
