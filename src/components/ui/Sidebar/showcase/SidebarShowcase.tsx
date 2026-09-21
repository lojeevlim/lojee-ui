import { useState } from "react";
import type { CSSProperties } from "react";
import { Sidebar, SidebarHeader, SidebarFooter } from "../Sidebar";
import { SidebarMenuItem } from "../SidebarMenuItem";
import { List } from "../../List/List";
import { ListItem } from "../../List/ListItem";
import { Avatar } from "../../Avatar/Avatar";
import { Icon } from "../../Icons/Icon";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import type { ColorName } from "../../../../core/tokens";

const NAV_ITEMS = [
  { icon: "home", label: "Dashboard", active: true },
  { icon: "folder", label: "Projects", active: false },
  { icon: "users", label: "Team", active: false },
  { icon: "settings", label: "Settings", active: false },
];

// Slides+fades the header label away instead of yanking it out on the spot —
// kept mounted the whole time (only its box shrinks to 0) so the
// collapse/expand animation reads as one continuous motion instead of a
// mid-transition pop. (SidebarMenuItem does the equivalent for its own label.)
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

// Thin wrapper around SidebarMenuItem for this showcase's repeated 4-item nav
// — pass the same `color`/`dark` you give the parent Sidebar to your own
// SidebarMenuItems for a coordinated look, same as any other usage.
function NavRows({
  dark,
  collapsed,
  color = "slate",
}: {
  dark?: boolean;
  collapsed?: boolean;
  color?: ColorName | (string & {});
}) {
  return (
    <nav className="space-y-0.5 p-2">
      {NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.label} icon={item.icon} active={item.active} dark={dark} collapsed={collapsed} color={color}>
          {item.label}
        </SidebarMenuItem>
      ))}
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
              js: `<l-Sidebar>
  <l-List>
    <l-ListItem icon="home">Dashboard</l-ListItem>
    <l-ListItem icon="folder">Projects</l-ListItem>
    <l-ListItem icon="users">Team</l-ListItem>
    <l-ListItem icon="settings">Settings</l-ListItem>
  </l-List>
</l-Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Sidebar>
    <l-List>
      <l-ListItem icon="home">Dashboard</l-ListItem>
      <l-ListItem icon="folder">Projects</l-ListItem>
      <l-ListItem icon="users">Team</l-ListItem>
      <l-ListItem icon="settings">Settings</l-ListItem>
    </l-List>
  </l-Sidebar>
</template>`,
              angular: `<l-Sidebar>
  <l-List>
    <l-ListItem icon="home">Dashboard</l-ListItem>
    <l-ListItem icon="folder">Projects</l-ListItem>
    <l-ListItem icon="users">Team</l-ListItem>
    <l-ListItem icon="settings">Settings</l-ListItem>
  </l-List>
</l-Sidebar>`,
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
              js: `<l-Sidebar>
  <div slot="header">Lojee Inc</div>
  <l-List>
    <l-ListItem icon="home">Dashboard</l-ListItem>
    <l-ListItem icon="folder">Projects</l-ListItem>
    <l-ListItem icon="users">Team</l-ListItem>
    <l-ListItem icon="settings">Settings</l-ListItem>
  </l-List>
  <div slot="footer" class="flex items-center gap-2">
    <l-Avatar initials="JD" size="sm"></l-Avatar>
    <span>Jordan Diaz</span>
  </div>
</l-Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Sidebar>
    <div slot="header">Lojee Inc</div>
    <l-List>
      <l-ListItem icon="home">Dashboard</l-ListItem>
      <l-ListItem icon="folder">Projects</l-ListItem>
      <l-ListItem icon="users">Team</l-ListItem>
      <l-ListItem icon="settings">Settings</l-ListItem>
    </l-List>
    <div slot="footer" class="flex items-center gap-2">
      <l-Avatar initials="JD" size="sm" />
      <span>Jordan Diaz</span>
    </div>
  </l-Sidebar>
</template>`,
              angular: `<l-Sidebar>
  <div slot="header">Lojee Inc</div>
  <l-List>
    <l-ListItem icon="home">Dashboard</l-ListItem>
    <l-ListItem icon="folder">Projects</l-ListItem>
    <l-ListItem icon="users">Team</l-ListItem>
    <l-ListItem icon="settings">Settings</l-ListItem>
  </l-List>
  <div slot="footer" class="flex items-center gap-2">
    <l-Avatar initials="JD" size="sm"></l-Avatar>
    <span>Jordan Diaz</span>
  </div>
</l-Sidebar>`,
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
              <Sidebar variant="glass" color="slate">
                <SidebarHeader>
                  <span className="font-semibold text-white">Lojee Inc</span>
                </SidebarHeader>
                <NavRows dark color="slate" />
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
  <SidebarMenuItem icon="home" active dark>Dashboard</SidebarMenuItem>
  <SidebarMenuItem icon="folder" dark>Projects</SidebarMenuItem>
  <SidebarMenuItem icon="users" dark>Team</SidebarMenuItem>
  <SidebarMenuItem icon="settings" dark>Settings</SidebarMenuItem>
</Sidebar>

{/* Also available:
    variant="bordered" / "elevated" — detached-panel looks (full border + rounded corners)
      for when the sidebar floats inside a page instead of docking to a screen edge.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a top-to-bottom gradient built from \`color\` (600 → 700).
    variant="glass"    — a frosted dark panel (backdrop blur over translucent slate-900). */}`,
              js: `<l-Sidebar variant="dark">
  <div slot="header"><span class="font-semibold text-white">Lojee Inc</span></div>
  <l-SidebarMenuItem icon="home" active dark>Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder" dark>Projects</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="users" dark>Team</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="settings" dark>Settings</l-SidebarMenuItem>
</l-Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Sidebar variant="dark">
    <div slot="header"><span class="font-semibold text-white">Lojee Inc</span></div>
    <l-SidebarMenuItem icon="home" active dark>Dashboard</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="folder" dark>Projects</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="users" dark>Team</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="settings" dark>Settings</l-SidebarMenuItem>
  </l-Sidebar>
</template>`,
              angular: `<l-Sidebar variant="dark">
  <div slot="header"><span class="font-semibold text-white">Lojee Inc</span></div>
  <l-SidebarMenuItem icon="home" active dark>Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder" dark>Projects</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="users" dark>Team</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="settings" dark>Settings</l-SidebarMenuItem>
</l-Sidebar>`,
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
  {/* give each SidebarMenuItem the same "indigo" for a matching active-state accent */}
  <SidebarMenuItem icon="home" active color="indigo">Dashboard</SidebarMenuItem>
  <SidebarMenuItem icon="folder" color="indigo">Projects</SidebarMenuItem>
  <SidebarMenuItem icon="users" color="indigo">Team</SidebarMenuItem>
</Sidebar>`,
              js: `<l-Sidebar color="indigo" collapsible>
  <div slot="header">Lojee Inc</div>
  <l-SidebarMenuItem icon="home" active color="indigo">Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder" color="indigo">Projects</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="users" color="indigo">Team</l-SidebarMenuItem>
</l-Sidebar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Sidebar color="indigo" collapsible>
    <div slot="header">Lojee Inc</div>
    <l-SidebarMenuItem icon="home" active color="indigo">Dashboard</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="folder" color="indigo">Projects</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="users" color="indigo">Team</l-SidebarMenuItem>
  </l-Sidebar>
</template>`,
              angular: `<l-Sidebar color="indigo" collapsible>
  <div slot="header">Lojee Inc</div>
  <l-SidebarMenuItem icon="home" active color="indigo">Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder" color="indigo">Projects</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="users" color="indigo">Team</l-SidebarMenuItem>
</l-Sidebar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set `collapsible` to show a built-in toggle button — `collapsed` stays a controlled prop, driven here by `onCollapsedChange`.">
            Collapsible
          </SectionLabel>
          <div className="h-80 w-fit overflow-hidden rounded-lg border border-slate-200">
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
  {/* SidebarMenuItem needs the same \`collapsed\` too — it's a separate
      component, not something it can read off its parent Sidebar */}
  <SidebarMenuItem icon="home" active collapsed={collapsed}>Dashboard</SidebarMenuItem>
  <SidebarMenuItem icon="folder" collapsed={collapsed}>Projects</SidebarMenuItem>
</Sidebar>`,
              js: `<l-Sidebar id="app-sidebar" collapsible>
  <div slot="header">Lojee Inc</div>
  <!-- SidebarMenuItem finds this Sidebar itself and mirrors its "collapsed"
       attribute automatically — nothing to wire up on the items themselves -->
  <l-SidebarMenuItem icon="home" active>Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder">Projects</l-SidebarMenuItem>
</l-Sidebar>

<script type="module">
  import "lojee-ui/elements";

  const sidebar = document.getElementById("app-sidebar");
  sidebar.addEventListener("collapsedchange", (e) => {
    sidebar.collapsed = e.detail;
  });
</script>`,
              vue: `<template>
  <l-Sidebar collapsible :collapsed="collapsed" @collapsedchange="collapsed = $event">
    <div slot="header">Lojee Inc</div>
    <!-- SidebarMenuItem finds this Sidebar itself and mirrors its "collapsed"
         attribute automatically — nothing to wire up on the items themselves -->
    <l-SidebarMenuItem icon="home" active>Dashboard</l-SidebarMenuItem>
    <l-SidebarMenuItem icon="folder">Projects</l-SidebarMenuItem>
  </l-Sidebar>
</template>

<script setup>
import { ref } from "vue";
const collapsed = ref(false);
</script>`,
              angular: `<l-Sidebar collapsible [collapsed]="collapsed" (collapsedchange)="collapsed = $event">
  <div slot="header">Lojee Inc</div>
  <!-- SidebarMenuItem finds this Sidebar itself and mirrors its "collapsed"
       attribute automatically — nothing to wire up on the items themselves -->
  <l-SidebarMenuItem icon="home" active>Dashboard</l-SidebarMenuItem>
  <l-SidebarMenuItem icon="folder">Projects</l-SidebarMenuItem>
</l-Sidebar>

collapsed = false;`,
            }}
          />
        </section>

      </div>
    </div>
  );
}
