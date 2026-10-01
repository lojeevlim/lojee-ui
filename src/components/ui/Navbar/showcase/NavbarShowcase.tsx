import { useState } from "react";
import { Navbar, type NavbarItemSpec } from "../Navbar";
import { Button } from "../../Buttons/Button";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const BASIC_ITEMS: NavbarItemSpec[] = [{ label: "Home", active: true }, { label: "Products" }, { label: "Pricing" }];
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

export default function NavbarShowcase() {
  const [activeLabel, setActiveLabel] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
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
            <Navbar brand="Lojee" items={BASIC_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  brand="Lojee"
  items={[
    { label: "Home", active: true },
    { label: "Products" },
    { label: "Pricing" },
  ]}
  actions={<Avatar initials="JD" size="sm" />}
/>`,
              js: `<l-Navbar id="basic-navbar" brand="Lojee">
  <div slot="actions">
    <l-Avatar initials="JD" size="sm"></l-Avatar>
  </div>
</l-Navbar>

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
  <l-Navbar brand="Lojee" :items="items">
    <div slot="actions">
      <l-Avatar initials="JD" size="sm" />
    </div>
  </l-Navbar>
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
<l-Navbar brand="Lojee" [items]="items">
  <div slot="actions">
    <l-Avatar initials="JD" size="sm"></l-Avatar>
  </div>
</l-Navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Leave active unset on every link (the common case) and Navbar determines and manages it itself: a link's href is matched against the current URL on load/back-forward-navigation, and clicking any link updates it immediately — no router wiring or state needed. onActiveItemChange reports the full item object whenever the active link changes, e.g. to sync it elsewhere.">
            Active link
          </SectionLabel>
          <div className="overflow-hidden rounded-lg border border-border">
            <Navbar
              brand="Lojee"
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
  brand="Lojee"
  defaultActiveItem="Dashboard"
  onActiveItemChange={(item) => console.log(item)}
  items={[
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
  ]}
/>`,
              js: `<l-Navbar id="active-navbar" brand="Lojee" default-active-item="Dashboard"></l-Navbar>

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
  <l-Navbar
    brand="Lojee"
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
              angular: `<l-Navbar
  brand="Lojee"
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
          <SectionLabel sub="Set sticky so the bar pins to the top of its scroll container.">Sticky</SectionLabel>
          <div className="h-64 overflow-y-auto rounded-lg border border-border">
            <Navbar sticky brand="Lojee">
              <Button variant="ghost" label="Home" />
              <Button variant="ghost" label="Products" />
            </Navbar>
            <div className="space-y-4 p-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="text-sm text-fg-subtle">
                  Scroll to see the navbar stick to the top of this container. Row {i + 1}.
                </p>
              ))}
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<div className="h-64 overflow-y-auto">
  <Navbar sticky brand="Lojee">
    <Button variant="ghost" label="Home" />
    <Button variant="ghost" label="Products" />
  </Navbar>
  <div className="p-6 space-y-4">
    {rows.map((row, i) => <p key={i}>{row}</p>)}
  </div>
</div>`,
              js: `<div class="h-64 overflow-y-auto">
  <l-Navbar sticky brand="Lojee">
    <l-Button variant="ghost" label="Home"></l-Button>
    <l-Button variant="ghost" label="Products"></l-Button>
  </l-Navbar>
  <div class="p-6 space-y-4">
    <!-- rows -->
  </div>
</div>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <div class="h-64 overflow-y-auto">
    <l-Navbar sticky brand="Lojee">
      <l-Button variant="ghost" label="Home" />
      <l-Button variant="ghost" label="Products" />
    </l-Navbar>
    <div class="p-6 space-y-4">
      <p v-for="(row, i) in rows" :key="i">{{ row }}</p>
    </div>
  </div>
</template>`,
              angular: `<div class="h-64 overflow-y-auto">
  <l-Navbar sticky brand="Lojee">
    <l-Button variant="ghost" label="Home"></l-Button>
    <l-Button variant="ghost" label="Products"></l-Button>
  </l-Navbar>
  <div class="p-6 space-y-4">
    <p *ngFor="let row of rows">{{ row }}</p>
  </div>
</div>`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={
              'Seven themes, identical set to Sidebar\'s: "light" (default), "dark", "bordered"/' +
              '"elevated"/"glass" (detached, floating bars), "minimal" (no chrome at all), and ' +
              '"gradient" (color-tinted). "bordered" tints its border with `color`/`borderWidth`; ' +
              '"glass" tints its backdrop with `color` instead.'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg border border-border">
              <Navbar brand="Lojee" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <Navbar
                variant="dark"
                brand={<span className="text-white">Lojee</span>}
                items={VARIANT_ITEMS}
                actions={<Avatar initials="JD" size="sm" />}
              />
            </div>
            <div className="rounded-lg bg-surface-muted p-4">
              <Navbar variant="bordered" brand="Lojee" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
            </div>
            <div className="rounded-lg bg-surface-muted p-4">
              <Navbar variant="elevated" brand="Lojee" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
            </div>
            <div className="rounded-lg border border-dashed border-border-strong bg-surface p-4">
              <Navbar variant="minimal" brand="Lojee" items={VARIANT_ITEMS} actions={<Avatar initials="JD" size="sm" />} />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Navbar
                variant="gradient"
                brand={<span className="text-white">Lojee</span>}
                items={VARIANT_ITEMS}
                actions={<Avatar initials="JD" size="sm" />}
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-accent-100 p-4">
              <Navbar
                variant="glass"
                brand={<span className="text-white">Lojee</span>}
                items={VARIANT_ITEMS}
                actions={<Avatar initials="JD" size="sm" />}
              />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  variant="dark"
  brand={<span className="text-white">Lojee</span>}
  items={[
    { label: "Home", active: true },
    { label: "Products" },
  ]}
/>

{/* Also available:
    variant="bordered" / "elevated" / "glass" — detached-panel looks (rounded corners, floats
      inside a page instead of docking full-width). Their backdrop (padding + a neutral background)
      is built in, so no extra markup is needed. "bordered" is a solid bar on the page surface with a
      color-tinted border (see \`color\`/\`borderWidth\`); "elevated" is the same bar but
      shadow-only, no border; "glass" has no background color at all, just backdrop-blur-xl —
      needs something with real color/texture behind it to read.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a left-to-right gradient built from \`color\` (600 → 700). */}`,
              js: `<l-Navbar id="variants-navbar" variant="dark"></l-Navbar>

<script type="module">
  import "lojee-ui/elements";

  const navbar = document.getElementById("variants-navbar");
  navbar.items = [
    { label: "Home", active: true },
    { label: "Products" },
  ];
</script>

<!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->`,
              vue: `<template>
  <!-- l-Navbar is a native custom element, not a Vue component — Vue's own #slotName shorthand only
       resolves for actual Vue components, so a real light-DOM slot="brand" projects here instead
       (or just the plain brand="Lojee" attribute works fine too, when no custom styling is needed). -->
  <l-Navbar variant="dark" :items="items">
    <div slot="brand"><span class="text-white">Lojee</span></div>
  </l-Navbar>

  <!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
       markup needed. "minimal" — no background/border at all, blends into the page. -->
</template>

<script setup lang="ts">
import "lojee-ui/elements";

const items = [
  { label: "Home", active: true },
  { label: "Products" },
];
</script>`,
              angular: `<!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->
<l-Navbar variant="dark" [items]="items">
  <div slot="brand"><span class="text-white">Lojee</span></div>
</l-Navbar>

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
              brand="Lojee"
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
  brand="Lojee"
  classNames={{ root: "bg-indigo-50 dark:bg-indigo-950/40", brand: "text-indigo-900 dark:text-indigo-200" }}
>
  <Button variant="ghost" label="Home" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
  <Button variant="ghost" label="Products" className="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
</Navbar>`,
              js: `<l-Navbar brand="Lojee" id="indigo-navbar">
  <l-Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-Button>
  <l-Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-Button>
</l-Navbar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("indigo-navbar").classNames = {
    root: "bg-indigo-50 dark:bg-indigo-950/40",
    brand: "text-indigo-900 dark:text-indigo-200",
  };
</script>`,
              vue: `<template>
  <l-Navbar brand="Lojee" :classNames="navbarClassNames">
    <l-Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
    <l-Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40" />
  </l-Navbar>
</template>

<script setup lang="ts">
const navbarClassNames = { root: "bg-indigo-50 dark:bg-indigo-950/40", brand: "text-indigo-900 dark:text-indigo-200" };
</script>`,
              angular: `<l-Navbar brand="Lojee" [classNames]="navbarClassNames">
  <l-Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-Button>
  <l-Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-900/40"></l-Button>
</l-Navbar>

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
              js: `<l-Navbar class="transition-demo" brand="Fade" transition="fade"></l-Navbar>
<l-Navbar class="transition-demo" brand="Slide down" transition="slide-down"></l-Navbar>
<l-Navbar class="transition-demo" brand="Slide right" transition="slide-right" transitionDelay="100"></l-Navbar>
<l-Navbar class="transition-demo" brand="Zoom" transition="zoom"></l-Navbar>
<l-Navbar class="transition-demo" brand="Blur" transition="blur"></l-Navbar>
<l-Navbar class="transition-demo" brand="Drop" transition="drop" transitionDuration="700"></l-Navbar>

<l-Navbar class="transition-demo" brand="Lift" hoverEffect="lift"></l-Navbar>
<l-Navbar class="transition-demo" brand="Glow" hoverEffect="glow"></l-Navbar>
<l-Navbar class="transition-demo" brand="Shine" hoverEffect="shine"></l-Navbar>

<script type="module">
  import "lojee-ui/elements";

  const items = [
    { label: "Home", active: true },
    { label: "Products" },
  ];
  document.querySelectorAll(".transition-demo").forEach((el) => (el.items = items));
</script>`,
              vue: `<template>
  <l-Navbar :items="items" brand="Fade" transition="fade"></l-Navbar>
  <l-Navbar :items="items" brand="Slide down" transition="slide-down"></l-Navbar>
  <l-Navbar :items="items" brand="Slide right" transition="slide-right" transitionDelay="100"></l-Navbar>
  <l-Navbar :items="items" brand="Zoom" transition="zoom"></l-Navbar>
  <l-Navbar :items="items" brand="Blur" transition="blur"></l-Navbar>
  <l-Navbar :items="items" brand="Drop" transition="drop" transitionDuration="700"></l-Navbar>

  <l-Navbar :items="items" brand="Lift" hoverEffect="lift"></l-Navbar>
  <l-Navbar :items="items" brand="Glow" hoverEffect="glow"></l-Navbar>
  <l-Navbar :items="items" brand="Shine" hoverEffect="shine"></l-Navbar>
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
    <l-Navbar [items]="items" brand="Fade" transition="fade"></l-Navbar>
    <l-Navbar [items]="items" brand="Slide down" transition="slide-down"></l-Navbar>
    <l-Navbar [items]="items" brand="Slide right" transition="slide-right" transitionDelay="100"></l-Navbar>
    <l-Navbar [items]="items" brand="Zoom" transition="zoom"></l-Navbar>
    <l-Navbar [items]="items" brand="Blur" transition="blur"></l-Navbar>
    <l-Navbar [items]="items" brand="Drop" transition="drop" transitionDuration="700"></l-Navbar>

    <l-Navbar [items]="items" brand="Lift" hoverEffect="lift"></l-Navbar>
    <l-Navbar [items]="items" brand="Glow" hoverEffect="glow"></l-Navbar>
    <l-Navbar [items]="items" brand="Shine" hoverEffect="shine"></l-Navbar>
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
