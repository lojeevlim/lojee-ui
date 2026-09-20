import { useState } from "react";
import type { CSSProperties } from "react";
import { Sidebar, SidebarHeader, SidebarFooter } from "../Sidebar";
import { List } from "../../List/List";
import { ListItem } from "../../List/ListItem";
import { Avatar } from "../../Avatar/Avatar";
import { Icon } from "../../Icons/Icon";
import { Tooltip } from "../../Tooltip/Tooltip";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { type ColorName } from "../../../../core/tokens";

const NAV_ITEMS = [
  { icon: "home", label: "Dashboard", active: true },
  { icon: "folder", label: "Projects", active: false },
  { icon: "users", label: "Team", active: false },
  { icon: "settings", label: "Settings", active: false },
];

const ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-slate-900",
  gray: "bg-gray-700",
  indigo: "bg-indigo-600",
  violet: "bg-violet-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  emerald: "bg-emerald-600",
  teal: "bg-teal-600",
  amber: "bg-amber-500",
  orange: "bg-orange-600",
  rose: "bg-rose-600",
  pink: "bg-pink-600",
};

// Translucent version for dark-ish backgrounds (variant="dark"/"gradient"/"glass") — a solid
// ACTIVE_BG color would clash with an already-dark or already-colored surface.
const DARK_ACTIVE_BG: Record<ColorName, string> = {
  slate: "bg-white/10",
  gray: "bg-white/10",
  indigo: "bg-indigo-500/25",
  violet: "bg-violet-500/25",
  blue: "bg-blue-500/25",
  cyan: "bg-cyan-500/25",
  emerald: "bg-emerald-500/25",
  teal: "bg-teal-500/25",
  amber: "bg-amber-500/25",
  orange: "bg-orange-500/25",
  rose: "bg-rose-500/25",
  pink: "bg-pink-500/25",
};

// Slides+fades a nav label away instead of yanking it out on the spot — kept
// mounted the whole time (only its box shrinks to 0) so the collapse/expand
// animation reads as one continuous motion instead of a mid-transition pop.
function labelSlideStyle(hidden: boolean): CSSProperties {
  return {
    display: "inline-block",
    overflow: "hidden",
    opacity: hidden ? 0 : 1,
    maxWidth: hidden ? 0 : 160,
    transform: hidden ? "translateX(-6px)" : "translateX(0)",
    transition: "opacity .15s ease, transform .2s cubic-bezier(.4,0,.2,1), max-width .2s cubic-bezier(.4,0,.2,1)",
  };
}

// Demo-only nav rows — NOT part of the Sidebar component itself (it's a plain
// shell with no built-in nav-item rendering). Pass the same `color` you give
// the Sidebar to your own active-item styling for a coordinated look.
function NavRows({ dark, collapsed, color = "slate" }: { dark?: boolean; collapsed?: boolean; color?: ColorName }) {
  return (
    <nav className="space-y-0.5 p-2">
      {NAV_ITEMS.map((item) => {
        const link = (
          <a
            href="#"
            className={`flex items-center rounded-lg py-2 text-sm transition-colors ${
              // Little horizontal padding and no gap while collapsed: the
              // row's only ~40px wide by then (Sidebar's own 72px rail,
              // minus its body padding minus this nav's own padding) —
              // `px-3 gap-2.5` on top of that pushes the link's min-content
              // past its container width, so the active pill visibly
              // overflows the rail's right edge instead of just showing the icon.
              collapsed ? "w-fit justify-center px-2" : "w-full gap-2.5 px-3"
            } ${
              item.active
                ? dark
                  ? `${DARK_ACTIVE_BG[color]} font-medium text-white`
                  : `${ACTIVE_BG[color]} font-medium text-white shadow-sm`
                : dark
                  ? "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                  : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon name={item.icon} size={18} className="shrink-0" />
            <span className="truncate" style={labelSlideStyle(!!collapsed)}>
              {item.label}
            </span>
          </a>
        );

        // Collapsed hides the visible label — a Tooltip fills the gap so the
        // item's meaning isn't lost, just deferred to hover.
        return collapsed ? (
          <Tooltip
            key={item.label}
            content={item.label}
            position="right"
            classNames={{ root: "flex w-full justify-center" }}
          >
            {link}
          </Tooltip>
        ) : (
          <div key={item.label}>{link}</div>
        );
      })}
    </nav>
  );
}

export default function SidebarShowcase() {
  const [toggleCollapsed, setToggleCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Sidebar</h1>
          <p className="text-sm text-slate-500 mt-1">
            A vertical navigation panel — an app-shell shell for the rest of the library's nav content.
          </p>
        </div>

        <section>
          <SectionLabel sub="A scrollable list of nav rows built with List/ListItem.">Basic</SectionLabel>
          <div className="h-80 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar>
              <List>
                <ListItem icon="home">Dashboard</ListItem>
                <ListItem icon="folder">Projects</ListItem>
                <ListItem icon="users">Team</ListItem>
                <ListItem icon="settings">Settings</ListItem>
              </List>
            </Sidebar>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
</Sidebar>`,
              js: `<Sidebar>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
</Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Sidebar>
    <List>
      <ListItem icon="home">Dashboard</ListItem>
      <ListItem icon="folder">Projects</ListItem>
      <ListItem icon="users">Team</ListItem>
      <ListItem icon="settings">Settings</ListItem>
    </List>
  </Sidebar>
</template>`,
              angular: `<Sidebar>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
</Sidebar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A workspace name pinned above the nav content, and a user row pinned below it.">
            With header and footer
          </SectionLabel>
          <div className="h-96 overflow-hidden rounded-lg border border-slate-200">
            <Sidebar>
              <SidebarHeader>Lojee Inc</SidebarHeader>
              <List>
                <ListItem icon="home">Dashboard</ListItem>
                <ListItem icon="folder">Projects</ListItem>
                <ListItem icon="users">Team</ListItem>
                <ListItem icon="settings">Settings</ListItem>
              </List>
              <SidebarFooter>
                <div className="flex items-center gap-2">
                  <Avatar initials="JD" size="sm" />
                  <span className="text-sm font-medium text-slate-700">Jordan Diaz</span>
                </div>
              </SidebarFooter>
            </Sidebar>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar>
  <SidebarHeader>Lojee Inc</SidebarHeader>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
  <SidebarFooter>
    <div className="flex items-center gap-2">
      <Avatar initials="JD" size="sm" />
      <span>Jordan Diaz</span>
    </div>
  </SidebarFooter>
</Sidebar>`,
              js: `<Sidebar>
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
  <SidebarFooter slot="footer" class="flex items-center gap-2">
    <Avatar initials="JD" size="sm"></Avatar>
    <span>Jordan Diaz</span>
  </SidebarFooter>
</Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Sidebar>
    <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
    <List>
      <ListItem icon="home">Dashboard</ListItem>
      <ListItem icon="folder">Projects</ListItem>
      <ListItem icon="users">Team</ListItem>
      <ListItem icon="settings">Settings</ListItem>
    </List>
    <SidebarFooter slot="footer" class="flex items-center gap-2">
      <Avatar initials="JD" size="sm" />
      <span>Jordan Diaz</span>
    </SidebarFooter>
  </Sidebar>
</template>`,
              angular: `<Sidebar>
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
  <List>
    <ListItem icon="home">Dashboard</ListItem>
    <ListItem icon="folder">Projects</ListItem>
    <ListItem icon="users">Team</ListItem>
    <ListItem icon="settings">Settings</ListItem>
  </List>
  <SidebarFooter slot="footer" class="flex items-center gap-2">
    <Avatar initials="JD" size="sm"></Avatar>
    <span>Jordan Diaz</span>
  </SidebarFooter>
</Sidebar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={
              'Seven themes: "light" (default), "dark", "bordered" and "elevated" (detached panels), ' +
              '"minimal" (no chrome at all), and "gradient"/"glass" (color-tinted, for a bolder shell).'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-72 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar>
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows />
                <SidebarFooter>
                  <div className="flex items-center gap-2"><Avatar initials="JD" size="sm" /><span className="text-sm font-medium text-slate-700">Jordan Diaz</span></div>
                </SidebarFooter>
              </Sidebar>
            </div>
            <div className="h-72 overflow-hidden rounded-lg border border-slate-800">
              <Sidebar variant="dark">
                <SidebarHeader>
                  <span className="font-semibold text-white">Lojee Inc</span>
                </SidebarHeader>
                <NavRows dark />
                <SidebarFooter>
                  <div className="flex items-center gap-2"><Avatar initials="JD" size="sm" /><span className="text-sm font-medium text-slate-200">Jordan Diaz</span></div>
                </SidebarFooter>
              </Sidebar>
            </div>
            <div className="h-72 bg-slate-50 p-4">
              <Sidebar variant="bordered" className="h-full">
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows />
              </Sidebar>
            </div>
            <div className="h-72 bg-slate-50 p-4">
              <Sidebar variant="elevated" className="h-full">
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows />
              </Sidebar>
            </div>
            <div className="h-72 rounded-lg border border-dashed border-slate-300 bg-white p-4">
              <Sidebar variant="minimal" className="h-full">
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows />
              </Sidebar>
            </div>
            <div className="h-72 overflow-hidden rounded-lg">
              <Sidebar variant="gradient" color="indigo">
                <SidebarHeader>
                  <span className="font-semibold text-white">Lojee Inc</span>
                </SidebarHeader>
                <NavRows dark color="indigo" />
                <SidebarFooter>
                  <div className="flex items-center gap-2"><Avatar initials="JD" size="sm" /><span className="text-sm font-medium text-white/80">Jordan Diaz</span></div>
                </SidebarFooter>
              </Sidebar>
            </div>
            <div className="h-72 overflow-hidden rounded-lg">
              <Sidebar variant="glass" color="violet">
                <SidebarHeader>
                  <span className="font-semibold text-white">Lojee Inc</span>
                </SidebarHeader>
                <NavRows dark color="violet" />
                <SidebarFooter>
                  <div className="flex items-center gap-2"><Avatar initials="JD" size="sm" /><span className="text-sm font-medium text-white/80">Jordan Diaz</span></div>
                </SidebarFooter>
              </Sidebar>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar variant="dark">
  <SidebarHeader>
    <span className="font-semibold text-white">Lojee Inc</span>
  </SidebarHeader>
  <NavLinks />
</Sidebar>

{/* Also available:
    variant="bordered" / "elevated" — detached-panel looks (full border + rounded corners)
      for when the sidebar floats inside a page instead of docking to a screen edge.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a top-to-bottom gradient built from \`color\` (600 → 700).
    variant="glass"    — a frosted dark panel (backdrop blur over translucent slate-900). */}`,
              js: `<Sidebar variant="dark">
  <SidebarHeader slot="header"><span class="font-semibold text-white">Lojee Inc</span></SidebarHeader>
  <!-- nav links -->
</Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Sidebar variant="dark">
    <SidebarHeader slot="header"><span class="font-semibold text-white">Lojee Inc</span></SidebarHeader>
    <!-- nav links -->
  </Sidebar>
</template>`,
              angular: `<Sidebar variant="dark">
  <SidebarHeader slot="header"><span class="font-semibold text-white">Lojee Inc</span></SidebarHeader>
  <!-- nav links -->
</Sidebar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="`color` tints the built-in collapse toggle's hover state — pair it with the same color on your own active nav-item styling for a coordinated look.">
            Colors
          </SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar color="indigo" collapsible>
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows color="indigo" />
              </Sidebar>
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar color="emerald" collapsible>
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows color="emerald" />
              </Sidebar>
            </div>
            <div className="h-64 overflow-hidden rounded-lg border border-slate-200">
              <Sidebar color="rose" collapsible>
                <SidebarHeader>Lojee Inc</SidebarHeader>
                <NavRows color="rose" />
              </Sidebar>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar color="indigo" collapsible>
  <SidebarHeader>Lojee Inc</SidebarHeader>
  {/* give your own active nav item the same "indigo" for a matching accent */}
  <NavLinks activeColor="indigo" />
</Sidebar>`,
              js: `<Sidebar color="indigo" collapsible>
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
  <!-- nav links styled with the same indigo accent -->
</Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Sidebar color="indigo" collapsible>
    <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
    <!-- nav links styled with the same indigo accent -->
  </Sidebar>
</template>`,
              angular: `<Sidebar color="indigo" collapsible>
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
  <!-- nav links styled with the same indigo accent -->
</Sidebar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `collapsible` to show a built-in toggle button — `collapsed` stays a controlled prop, driven here by `onCollapsedChange`.">
            Collapsible
          </SectionLabel>
          <div className="h-80 w-fit rounded-lg border border-slate-200">
            <Sidebar collapsible collapsed={toggleCollapsed} onCollapsedChange={setToggleCollapsed}>
              <SidebarHeader>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                    <Icon name="zap" size={14} className="text-white" />
                  </span>
                  <span className="truncate font-semibold text-slate-900" style={labelSlideStyle(toggleCollapsed)}>
                    Lojee Inc
                  </span>
                </div>
              </SidebarHeader>
              <NavRows collapsed={toggleCollapsed} />
            </Sidebar>
          </div>
          <CodeBlock
            variants={{
              react: `const [collapsed, setCollapsed] = useState(false);

<Sidebar collapsible collapsed={collapsed} onCollapsedChange={setCollapsed}>
  <SidebarHeader>
    <div className="flex items-center gap-2.5">
      <span className="logo-box"><Icon name="zap" size={14} /></span>
      {/* keep the logo mark always visible; only the text needs to react
          to \`collapsed\` (fade/slide it out) so the header doesn't just
          blink between two states */}
      {!collapsed && <span>Lojee Inc</span>}
    </div>
  </SidebarHeader>
  <NavLinks />
</Sidebar>`,
              js: `<Sidebar id="app-sidebar" collapsible>
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
</Sidebar>

<script type="module">
  import "lojee-ui/elements";

  const sidebar = document.getElementById("app-sidebar");
  sidebar.addEventListener("collapsedchange", (e) => {
    sidebar.collapsed = e.detail;
  });
</script>`,
              vue: `<template>
  <Sidebar collapsible :collapsed="collapsed" @collapsedchange="collapsed = $event">
    <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
  </Sidebar>
</template>

<script setup>
import { ref } from "vue";
const collapsed = ref(false);
</script>`,
              angular: `<Sidebar collapsible [collapsed]="collapsed" (collapsedchange)="collapsed = $event">
  <SidebarHeader slot="header">Lojee Inc</SidebarHeader>
</Sidebar>

collapsed = false;`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Narrows the rail to an icon-only width — keep passing each item's label as children even when collapsed, and set `tooltip` on ListItem so it isn't lost, just deferred to hover.">
            Collapsed
          </SectionLabel>
          <div className="h-80 w-fit rounded-lg border border-slate-200">
            <Sidebar collapsed>
              <List>
                <ListItem icon="home" tooltip>Dashboard</ListItem>
                <ListItem icon="folder" tooltip>Projects</ListItem>
                <ListItem icon="users" tooltip>Team</ListItem>
                <ListItem icon="settings" tooltip>Settings</ListItem>
              </List>
            </Sidebar>
          </div>
          <CodeBlock
            variants={{
              react: `<Sidebar collapsed>
  <List>
    <ListItem icon="home" tooltip>Dashboard</ListItem>
    <ListItem icon="folder" tooltip>Projects</ListItem>
    <ListItem icon="users" tooltip>Team</ListItem>
    <ListItem icon="settings" tooltip>Settings</ListItem>
  </List>
</Sidebar>`,
              js: `<Sidebar collapsed>
  <List>
    <ListItem icon="home" tooltip>Dashboard</ListItem>
    <ListItem icon="folder" tooltip>Projects</ListItem>
    <ListItem icon="users" tooltip>Team</ListItem>
    <ListItem icon="settings" tooltip>Settings</ListItem>
  </List>
</Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Sidebar collapsed>
    <List>
      <ListItem icon="home" tooltip>Dashboard</ListItem>
      <ListItem icon="folder" tooltip>Projects</ListItem>
      <ListItem icon="users" tooltip>Team</ListItem>
      <ListItem icon="settings" tooltip>Settings</ListItem>
    </List>
  </Sidebar>
</template>`,
              angular: `<Sidebar collapsed>
  <List>
    <ListItem icon="home" tooltip>Dashboard</ListItem>
    <ListItem icon="folder" tooltip>Projects</ListItem>
    <ListItem icon="users" tooltip>Team</ListItem>
    <ListItem icon="settings" tooltip>Settings</ListItem>
  </List>
</Sidebar>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
