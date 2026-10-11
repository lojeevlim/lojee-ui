import { useState } from "react";
import { Navbar, type NavbarItemSpec } from "../Navbar";
import { Button } from "../../Buttons/Button";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const BASIC_ITEMS: NavbarItemSpec[] = [{ label: "Home", active: true }, { label: "Products" }, { label: "Pricing" }];
const SCROLL_ITEMS: NavbarItemSpec[] = [{ label: "Home" }, { label: "Products" }];
const ACTIVE_LINK_ITEMS: NavbarItemSpec[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];
// Reused across the "Variants" gallery below — items generated from `items` automatically pick up
// whatever `color`/`dark`/`vividActive` the parent Navbar itself gets (see Navbar.tsx), no per-item
// wiring needed the way composing NavbarItem directly requires.
const VARIANT_ITEMS: NavbarItemSpec[] = [{ label: "Home", active: true }, { label: "Products" }];

const TR_ITEMS: NavbarItemSpec[] = [{ label: "Home", active: true }, { label: "Products" }];

// `icon` is any name from src/core/icons.ts; `tooltip` helps when labels are hidden on small screens.
const ICON_ITEMS: NavbarItemSpec[] = [
  { label: "Home", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];

export default function NavbarShowcase() {
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);

  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Navbar</h1>
          <p className="text-sm text-fg-subtle mt-1">
            A top-of-app horizontal navigation bar with a brand, nav links, and right-aligned actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="items is the data-driven shortcut for a simple, evenly-spaced link row — the same self-managed active-state system as Sidebar's own items (compose NavbarItem directly instead when you need per-link disabled state or custom content).">
            Basic
          </SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border">
            <Navbar brand="App" items={BASIC_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  brand="App"
  items={[
    { label: "Home", active: true },
    { label: "Products" },
    { label: "Pricing" },
  ]}
  actions={<Avatar initials="JD" size="sm" />}
/>`,
              js: `<l-navbar id="basic-navbar" brand="App">
  <div slot="actions">
    <l-avatar initials="JD" size="sm"></l-avatar>
  </div>
</l-navbar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("basic-navbar").items = [
    { label: "Home", active: true },
    { label: "Products" },
    { label: "Pricing" },
  ];
</script>`,
              vue: `<template>
  <!-- l-Navbar is a native custom element, not a Vue component — Vue's own #slotName shorthand only
       resolves for actual Vue components, so a real light-DOM slot="actions" projects here instead,
       same plain attribute vanilla JS/Angular use above. -->
  <l-navbar brand="App" :items="items">
    <div slot="actions">
      <l-avatar initials="JD" size="sm" />
    </div>
  </l-navbar>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", active: true },
  { label: "Products" },
  { label: "Pricing" },
];
</script>`,
              angular: `<!-- app.component.html -->
<l-navbar brand="App" [items]="items">
  <div slot="actions">
    <l-avatar initials="JD" size="sm"></l-avatar>
  </div>
</l-navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Leave active unset on every link (the common case) and Navbar determines and manages it itself: a link's href is matched against the current URL on load/back-forward-navigation, and clicking any link updates it immediately — no router wiring or state needed. onActiveItemChange reports the full item object whenever the active link changes, e.g. to sync it elsewhere.">
            Active link
          </SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border">
            <Navbar
              brand="App"
              defaultActiveItem="Dashboard"
              onActiveItemChange={(item) => setActiveLabel(item.label)}
              items={ACTIVE_LINK_ITEMS}
              actions={<Avatar initials="JD" size="sm" />}
            />
          </div>
          <p className="mt-2 text-xs font-medium text-fg-subtle">
            Active: <span className="text-fg-muted">{activeLabel ?? "none yet — click a link"}</span>
          </p>
          <CodeBlock
            variants={{
              react: `<Navbar
  brand="App"
  defaultActiveItem="Dashboard"
  onActiveItemChange={(item) => console.log(item)}
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
  ]}
/>`,
              js: `<l-navbar id="active-navbar" brand="App" default-active-item="Dashboard"></l-navbar>

<script type="module">
  import "lojee-ui/elements";

  const navbar = document.getElementById("active-navbar");
  navbar.items = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
  ];
  navbar.addEventListener("activeitemchange", (e) => console.log(e.detail));
</script>`,
              vue: `<template>
  <l-navbar
    brand="App"
    default-active-item="Dashboard"
    :items="items"
    @activeitemchange="(e) => console.log(e.detail)"
  />
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];
</script>`,
              angular: `<l-navbar
  brand="App"
  default-active-item="Dashboard"
  [items]="items"
  (activeitemchange)="onActiveItemChange($event.detail)"
/>

items = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
];
onActiveItemChange(item: unknown) {
  console.log(item);
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give each item an icon (any name from the icon set). Combine with hoverEffect for animated links, and with tooltip for icon-only hints.">Items with icons</SectionLabel>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-border">
              <Navbar brand="App" items={ICON_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <Navbar brand="App" variant="dark" items={ICON_ITEMS} hoverEffect="lift" />
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <Navbar brand="App" variant="gradient" items={ICON_ITEMS} hoverEffect="glow" />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `const items = [
  { label: "Home", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];

<Navbar brand="App" items={items} />
<Navbar brand="App" variant="dark" items={items} hoverEffect="lift" />
<Navbar brand="App" variant="gradient" items={items} hoverEffect="glow" />`,
              js: `<l-navbar id="nav" brand="App" hover-effect="lift"></l-navbar>

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("nav").items = [
    { label: "Home", icon: "home", active: true },
    { label: "Projects", icon: "folder" },
    { label: "Team", icon: "users" },
    { label: "Settings", icon: "settings" },
  ];
</script>`,
              vue: `<script setup>
const items = [
  { label: "Home", icon: "home", active: true },
  { label: "Projects", icon: "folder" },
  { label: "Team", icon: "users" },
  { label: "Settings", icon: "settings" },
];
</script>

<template>
  <l-navbar brand="App" :items="items" />
  <l-navbar brand="App" variant="dark" :items="items" hover-effect="lift" />
  <l-navbar brand="App" variant="gradient" :items="items" hover-effect="glow" />
</template>`,
              angular: `<l-navbar brand="App" [items]="items"></l-navbar>
<l-navbar brand="App" variant="dark" [items]="items" hover-effect="lift"></l-navbar>
<l-navbar brand="App" variant="gradient" [items]="items" hover-effect="glow"></l-navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={'itemsAlign places the link row: "left" next to the brand (default), "center" centered in the bar, or "right" next to the actions.'}>Items alignment</SectionLabel>
          <div className="space-y-4">
            {(
              [
                ["left", "Left — next to the brand (default)"],
                ["center", "Center — centered between the brand and the actions"],
                ["right", "Right — next to the actions"],
              ] as const
            ).map(([align, label]) => (
              <div key={align}>
                <p className="mb-1.5 text-sm font-medium text-fg-muted">{label}</p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <Navbar brand="App" itemsAlign={align} items={ICON_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
                </div>
              </div>
            ))}
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar brand="App" itemsAlign="center" items={items} actions={<Avatar initials="JD" size="sm" />} />
// "left" | "center" | "right"`,
              js: `<l-navbar id="nav" brand="App" items-align="center"></l-navbar>
<script>document.getElementById("nav").items = items;</script>`,
              vue: `<l-navbar brand="App" items-align="center" :items="items" />`,
              angular: `<l-navbar brand="App" items-align="center" [items]="items"></l-navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set sticky so the bar pins to the top of its scroll container.">Sticky</SectionLabel>
          <div className="h-64 overflow-y-auto rounded-lg border border-border">
            <Navbar sticky scrollBackground brand="App" items={SCROLL_ITEMS} />
            <div className="space-y-4 p-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="text-sm text-fg-subtle">
                  Scroll to see the navbar stick to the top (transparent until you scroll). Row {i + 1}.
                </p>
              ))}
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<div className="h-64 overflow-y-auto">
  <Navbar
    sticky
    scrollBackground
    brand="App"
    items={[{ label: "Home" }, { label: "Products" }]}
  />
  <div className="p-6 space-y-4">
    {rows.map((row, i) => <p key={i}>{row}</p>)}
  </div>
</div>`,
              js: `<div class="h-64 overflow-y-auto">
  <l-navbar id="nav" sticky scroll-background brand="App"></l-navbar>
  <div class="p-6 space-y-4">
    <!-- rows -->
  </div>
</div>

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("nav").items = [{ label: "Home" }, { label: "Products" }];
</script>`,
              vue: `<template>
  <div class="h-64 overflow-y-auto">
    <l-navbar sticky scroll-background brand="App" :items="items" />
    <div class="p-6 space-y-4">
      <p v-for="(row, i) in rows" :key="i">{{ row }}</p>
    </div>
  </div>
</template>

<script setup>
const items = [{ label: "Home" }, { label: "Products" }];
</script>`,
              angular: `<div class="h-64 overflow-y-auto">
  <l-navbar sticky scroll-background brand="App" [items]="items"></l-navbar>
  <div class="p-6 space-y-4">
    <p *ngFor="let row of rows">{{ row }}</p>
  </div>
</div>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="scrollBackground: transparent at the top, solid once the page scrolls.">Scroll background</SectionLabel>
          <div className="h-64 overflow-y-auto rounded-lg border border-border">
            <Navbar sticky scrollBackground brand="App" items={SCROLL_ITEMS} />
            <div className="space-y-4 p-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-sm text-fg-subtle">Scroll down: the bar fills in. Row {i + 1}.</p>
              ))}
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  sticky
  scrollBackground
  brand="App"
  items={[{ label: "Home" }, { label: "Products" }]}
/>`,
              js: `<l-navbar id="nav" sticky scroll-background brand="App"></l-navbar>

<script type="module">
  import "lojee-ui/elements";
  document.getElementById("nav").items = [{ label: "Home" }, { label: "Products" }];
</script>`,
              vue: `<template>
  <l-navbar sticky scroll-background brand="App" :items="items" />
</template>

<script setup>
const items = [{ label: "Home" }, { label: "Products" }];
</script>`,
              angular: `<l-navbar sticky scroll-background brand="App" [items]="items"></l-navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="scrollGlow: an accent glow runs along the bottom edge while scrolling, then fades out.">Scroll glow</SectionLabel>
          <div className="h-64 overflow-y-auto rounded-lg border border-border">
            <Navbar sticky scrollGlow brand="App" items={SCROLL_ITEMS} />
            <div className="space-y-4 p-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i} className="text-sm text-fg-subtle">Scroll to see the glow. Row {i + 1}.</p>
              ))}
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar sticky scrollGlow brand="App" items={items} />`,
              js: `<l-navbar id="nav" sticky scroll-glow brand="App"></l-navbar>
<script>document.getElementById("nav").items = items;</script>`,
              vue: `<l-navbar sticky scroll-glow brand="App" :items="items" />`,
              angular: `<l-navbar sticky scroll-glow brand="App" [items]="items"></l-navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Give scrollGlow an effect name to change how the glow animates: spread (default), fade, rainbow, particles.">Scroll glow effects</SectionLabel>
          <div className="space-y-4">
            {(
              [
                ["spread", "Spread — grows from the center outward (default)"],
                ["fade", "Fade — the whole line fades in and out"],
                ["rainbow", "Rainbow — multi-color line that spreads"],
                ["particles", "Particles — sparks fall from the edge while scrolling"],
              ] as const
            ).map(([effect, label]) => (
              <div key={effect}>
                <p className="mb-1.5 text-sm font-medium text-fg-muted">{label}</p>
                <div className="h-56 overflow-y-auto rounded-lg border border-border">
                <Navbar sticky scrollGlow={effect} brand={effect} items={SCROLL_ITEMS} />
                <div className="space-y-4 p-6">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <p key={i} className="text-sm text-fg-subtle">Scroll to see the {effect} glow. Row {i + 1}.</p>
                  ))}
                </div>
                </div>
                <CodeBlock
                  variants={{
                    react: effect === "spread" ? `<Navbar sticky scrollGlow brand="App" items={items} />\n// same as scrollGlow="spread"` : `<Navbar sticky scrollGlow="${effect}" brand="App" items={items} />`,
                    js: `<l-navbar id="nav" sticky ${effect === "spread" ? "scroll-glow" : `scroll-glow="${effect}"`} brand="App"></l-navbar>\n<script>document.getElementById("nav").items = items;</script>`,
                    vue: `<l-navbar sticky ${effect === "spread" ? "scroll-glow" : `scroll-glow="${effect}"`} brand="App" :items="items" />`,
                    angular: `<l-navbar sticky ${effect === "spread" ? "scroll-glow" : `scroll-glow="${effect}"`} brand="App" [items]="items"></l-navbar>`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionLabel
            sub={
              'Six themes, identical set to Sidebar\'s: "light" (default), "dark", "bordered"/' +
              '"elevated" (detached, floating bars), "minimal" (no chrome at all), and ' +
              '"gradient" (color-tinted). "bordered" tints its border with `color`/`borderWidth`.'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-6">
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">light</p>
              <div className="overflow-hidden rounded-lg border border-border">
                <Navbar brand="App" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">dark</p>
              <div className="overflow-hidden rounded-lg border border-slate-800">
                <Navbar
                  variant="dark"
                  brand={<span className="text-white">App</span>}
                  items={VARIANT_ITEMS}
                  actions={<Avatar initials="JD" size="sm" />}
                />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">bordered</p>
              <div className="rounded-lg border border-border bg-[color-mix(in_srgb,var(--color-accent-500)_8%,var(--color-surface))] p-4">
                <Navbar variant="bordered" brand="App" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">elevated</p>
              <div className="rounded-lg border border-border bg-[color-mix(in_srgb,var(--color-accent-500)_8%,var(--color-surface))] p-4">
                <Navbar variant="elevated" brand="App" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">minimal</p>
              <div className="rounded-lg border border-dashed border-border-strong bg-surface p-4">
                <Navbar variant="minimal" brand="App" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
              </div>
            </div>
            <div>
              <p className="mb-1.5 font-mono text-xs text-fg-subtle">gradient</p>
              <div className="overflow-hidden rounded-lg">
                <Navbar
                  variant="gradient"
                  brand={<span className="text-white">App</span>}
                  items={VARIANT_ITEMS}
                  actions={<Avatar initials="JD" size="sm" />}
                />
              </div>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  variant="dark"
  brand={<span className="text-white">App</span>}
  items={[
    { label: "Home", active: true },
    { label: "Products" },
  ]}
/>

{/* Also available:
    variant="bordered" / "elevated" — detached-panel looks (rounded corners, floats
      inside a page instead of docking full-width). Their backdrop (padding + a neutral background)
      is built in, so no extra markup is needed. "bordered" is a solid bar on the page surface with a
      color-tinted border (see \`color\`/\`borderWidth\`); "elevated" is the same bar but
      shadow-only, no border.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a left-to-right gradient built from \`color\` (600 → 700). */}`,
              js: `<l-navbar id="variants-navbar" variant="dark"></l-navbar>

<script type="module">
  import "lojee-ui/elements";

  const navbar = document.getElementById("variants-navbar");
  navbar.items = [
    { label: "Home", active: true },
    { label: "Products" },
  ];
</script>

<!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->`,
              vue: `<template>
  <!-- l-Navbar is a native custom element, not a Vue component — Vue's own #slotName shorthand only
       resolves for actual Vue components, so a real light-DOM slot="brand" projects here instead
       (or just the plain brand="App" attribute works fine too, when no custom styling is needed). -->
  <l-navbar variant="dark" :items="items">
    <div slot="brand"><span class="text-white">App</span></div>
  </l-navbar>

  <!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
       markup needed. "minimal" — no background/border at all, blends into the page. -->
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", active: true },
  { label: "Products" },
];
</script>`,
              angular: `<!-- "bordered"/"elevated" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->
<l-navbar variant="dark" [items]="items">
  <div slot="brand"><span class="text-white">App</span></div>
</l-navbar>

items = [
  { label: "Home", active: true },
  { label: "Products" },
];`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the root with className, or target the brand/links/actions slots with classNames.">
            Custom styling
          </SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border">
            <Navbar
              brand="App"
              classNames={{
                root: "bg-indigo-50 dark:bg-indigo-950/40",
                brand: "text-indigo-900 dark:text-indigo-200",
              }}
            >
              <Button variant="ghost" label="Home" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
              <Button variant="ghost" label="Products" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
            </Navbar>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  brand="App"
  classNames={{ root: "bg-indigo-50 dark:bg-indigo-950/40", brand: "text-indigo-900 dark:text-indigo-200" }}
>
  <Button variant="ghost" label="Home" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
  <Button variant="ghost" label="Products" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
</Navbar>`,
              js: `<l-navbar brand="App" id="indigo-navbar">
  <l-button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-button>
  <l-button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-button>
</l-navbar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("indigo-navbar").classNames = {
    root: "bg-indigo-50 dark:bg-indigo-950/40",
    brand: "text-indigo-900 dark:text-indigo-200",
  };
</script>`,
              vue: `<template>
  <l-navbar brand="App" :classNames="navbarClassNames">
    <l-button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
    <l-button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
  </l-navbar>
</template>

<script setup lang="ts">
const navbarClassNames = { root: "bg-indigo-50 dark:bg-indigo-950/40", brand: "text-indigo-900 dark:text-indigo-200" };
</script>`,
              angular: `<l-navbar brand="App" [classNames]="navbarClassNames">
  <l-button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-button>
  <l-button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-button>
</l-navbar>

navbarClassNames = { root: "bg-indigo-50 dark:bg-indigo-950/40", brand: "text-indigo-900 dark:text-indigo-200" };`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`) and hover effects via `hoverEffect`. They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={1}>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Fade" items={TR_ITEMS} transition="fade" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Slide down" items={TR_ITEMS} transition="slide-down" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Slide right" items={TR_ITEMS} transition="slide-right" transitionDelay={100} /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Zoom" items={TR_ITEMS} transition="zoom" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Blur" items={TR_ITEMS} transition="blur" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Drop" items={TR_ITEMS} transition="drop" transitionDuration={700} /></div>
          </TransitionPreview>
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Lift" items={TR_ITEMS} hoverEffect="lift" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Glow" items={TR_ITEMS} hoverEffect="glow" /></div>
            <div className="overflow-hidden rounded-lg border border-border"><Navbar brand="Shine" items={TR_ITEMS} hoverEffect="shine" /></div>
          </div>
          <CodeBlock
            variants={{
              react: `const items = [
  { label: "Home", active: true },
  { label: "Products" },
];

<Navbar brand="Fade" items={items} transition="fade" />
<Navbar brand="Slide down" items={items} transition="slide-down" />
<Navbar brand="Slide right" items={items} transition="slide-right" transitionDelay={100} />
<Navbar brand="Zoom" items={items} transition="zoom" />
<Navbar brand="Blur" items={items} transition="blur" />
<Navbar brand="Drop" items={items} transition="drop" transitionDuration={700} />

<Navbar brand="Lift" items={items} hoverEffect="lift" />
<Navbar brand="Glow" items={items} hoverEffect="glow" />
<Navbar brand="Shine" items={items} hoverEffect="shine" />`,
              js: `<l-navbar class="transition-demo" brand="Fade" transition="fade"></l-navbar>
<l-navbar class="transition-demo" brand="Slide down" transition="slide-down"></l-navbar>
<l-navbar class="transition-demo" brand="Slide right" transition="slide-right" transitionDelay="100"></l-navbar>
<l-navbar class="transition-demo" brand="Zoom" transition="zoom"></l-navbar>
<l-navbar class="transition-demo" brand="Blur" transition="blur"></l-navbar>
<l-navbar class="transition-demo" brand="Drop" transition="drop" transitionDuration="700"></l-navbar>

<l-navbar class="transition-demo" brand="Lift" hoverEffect="lift"></l-navbar>
<l-navbar class="transition-demo" brand="Glow" hoverEffect="glow"></l-navbar>
<l-navbar class="transition-demo" brand="Shine" hoverEffect="shine"></l-navbar>

<script type="module">
  import "lojee-ui/elements";

  const items = [
    { label: "Home", active: true },
    { label: "Products" },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-navbar :items="items" brand="Fade" transition="fade"></l-navbar>
  <l-navbar :items="items" brand="Slide down" transition="slide-down"></l-navbar>
  <l-navbar :items="items" brand="Slide right" transition="slide-right" transitionDelay="100"></l-navbar>
  <l-navbar :items="items" brand="Zoom" transition="zoom"></l-navbar>
  <l-navbar :items="items" brand="Blur" transition="blur"></l-navbar>
  <l-navbar :items="items" brand="Drop" transition="drop" transitionDuration="700"></l-navbar>

  <l-navbar :items="items" brand="Lift" hoverEffect="lift"></l-navbar>
  <l-navbar :items="items" brand="Glow" hoverEffect="glow"></l-navbar>
  <l-navbar :items="items" brand="Shine" hoverEffect="shine"></l-navbar>
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", active: true },
  { label: "Products" },
];
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-navbar [items]="items" brand="Fade" transition="fade"></l-navbar>
    <l-navbar [items]="items" brand="Slide down" transition="slide-down"></l-navbar>
    <l-navbar [items]="items" brand="Slide right" transition="slide-right" transitionDelay="100"></l-navbar>
    <l-navbar [items]="items" brand="Zoom" transition="zoom"></l-navbar>
    <l-navbar [items]="items" brand="Blur" transition="blur"></l-navbar>
    <l-navbar [items]="items" brand="Drop" transition="drop" transitionDuration="700"></l-navbar>

    <l-navbar [items]="items" brand="Lift" hoverEffect="lift"></l-navbar>
    <l-navbar [items]="items" brand="Glow" hoverEffect="glow"></l-navbar>
    <l-navbar [items]="items" brand="Shine" hoverEffect="shine"></l-navbar>
  \`,
})
export class AppComponent {
  items = [
    { label: "Home", active: true },
    { label: "Products" },
  ];
}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
