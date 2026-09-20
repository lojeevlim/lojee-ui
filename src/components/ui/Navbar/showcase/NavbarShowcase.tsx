import { Navbar } from "../Navbar";
import { Button } from "../../Buttons/Button";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function NavbarShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Navbar</h1>
          <p className="text-sm text-slate-500 mt-1">
            A top-of-app horizontal navigation bar with a brand, nav links, and right-aligned actions.
          </p>
        </div>

        <section>
          <SectionLabel sub="A brand, a few nav links, and an avatar in the actions area.">Basic</SectionLabel>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Navbar brand="Lojee" actions={<Avatar initials="JD" size="sm" />}>
              <Button variant="ghost" label="Home" />
              <Button variant="ghost" label="Products" />
              <Button variant="ghost" label="Pricing" />
            </Navbar>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar brand="Lojee" actions={<Avatar initials="JD" size="sm" />}>
  <Button variant="ghost" label="Home" />
  <Button variant="ghost" label="Products" />
  <Button variant="ghost" label="Pricing" />
</Navbar>`,
              js: `<Navbar brand="Lojee">
  <Button variant="ghost" label="Home"></Button>
  <Button variant="ghost" label="Products"></Button>
  <Button variant="ghost" label="Pricing"></Button>
  <div slot="actions">
    <Avatar initials="JD" size="sm"></Avatar>
  </div>
</Navbar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Navbar brand="Lojee">
    <Button variant="ghost" label="Home" />
    <Button variant="ghost" label="Products" />
    <Button variant="ghost" label="Pricing" />
    <template #actions>
      <Avatar initials="JD" size="sm" />
    </template>
  </Navbar>
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `<!-- app.component.html -->
<Navbar brand="Lojee">
  <Button variant="ghost" label="Home"></Button>
  <Button variant="ghost" label="Products"></Button>
  <Button variant="ghost" label="Pricing"></Button>
  <div slot="actions">
    <Avatar initials="JD" size="sm"></Avatar>
  </div>
</Navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Set sticky so the bar pins to the top of its scroll container.">Sticky</SectionLabel>
          <div className="h-64 overflow-y-auto rounded-lg border border-slate-200">
            <Navbar sticky brand="Lojee">
              <Button variant="ghost" label="Home" />
              <Button variant="ghost" label="Products" />
            </Navbar>
            <div className="space-y-4 p-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i} className="text-sm text-slate-500">
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
  <Navbar sticky brand="Lojee">
    <Button variant="ghost" label="Home"></Button>
    <Button variant="ghost" label="Products"></Button>
  </Navbar>
  <div class="p-6 space-y-4">
    <!-- rows -->
  </div>
</div>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <div class="h-64 overflow-y-auto">
    <Navbar sticky brand="Lojee">
      <Button variant="ghost" label="Home" />
      <Button variant="ghost" label="Products" />
    </Navbar>
    <div class="p-6 space-y-4">
      <p v-for="(row, i) in rows" :key="i">{{ row }}</p>
    </div>
  </div>
</template>`,
              angular: `<div class="h-64 overflow-y-auto">
  <Navbar sticky brand="Lojee">
    <Button variant="ghost" label="Home"></Button>
    <Button variant="ghost" label="Products"></Button>
  </Navbar>
  <div class="p-6 space-y-4">
    <p *ngFor="let row of rows">{{ row }}</p>
  </div>
</div>`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={'Three themes: "light" (default), "dark", and "elevated" (shadow instead of a border).'}
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <Navbar variant="dark" brand={<span className="text-white">Lojee</span>} actions={<Avatar initials="JD" size="sm" />}>
                <Button variant="ghost" label="Home" className="text-slate-300 hover:text-white" />
                <Button variant="ghost" label="Products" className="text-slate-300 hover:text-white" />
              </Navbar>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <Navbar variant="elevated" brand="Lojee" actions={<Avatar initials="JD" size="sm" />}>
                <Button variant="ghost" label="Home" />
                <Button variant="ghost" label="Products" />
              </Navbar>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar variant="dark" brand={<span className="text-white">Lojee</span>}>
  <Button variant="ghost" label="Home" className="text-slate-300 hover:text-white" />
</Navbar>

{/* Also available: variant="elevated" (shadow, no border). */}`,
              js: `<Navbar variant="dark">
  <div slot="brand"><span class="text-white">Lojee</span></div>
  <Button variant="ghost" label="Home" class="text-slate-300 hover:text-white"></Button>
</Navbar>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Navbar variant="dark">
    <template #brand><span class="text-white">Lojee</span></template>
    <Button variant="ghost" label="Home" class="text-slate-300 hover:text-white" />
  </Navbar>
</template>`,
              angular: `<Navbar variant="dark">
  <div slot="brand"><span class="text-white">Lojee</span></div>
  <Button variant="ghost" label="Home" class="text-slate-300 hover:text-white"></Button>
</Navbar>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Override the root with className, or target the brand/links/actions slots with classNames.">
            Custom styling
          </SectionLabel>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <Navbar
              brand="Lojee"
              classNames={{
                root: "bg-indigo-50",
                brand: "text-indigo-900",
              }}
            >
              <Button variant="ghost" label="Home" className="text-indigo-700 hover:bg-indigo-100" />
              <Button variant="ghost" label="Products" className="text-indigo-700 hover:bg-indigo-100" />
            </Navbar>
          </div>
          <CodeBlock
            variants={{
              react: `<Navbar
  brand="Lojee"
  classNames={{ root: "bg-indigo-50", brand: "text-indigo-900" }}
>
  <Button variant="ghost" label="Home" className="text-indigo-700 hover:bg-indigo-100" />
  <Button variant="ghost" label="Products" className="text-indigo-700 hover:bg-indigo-100" />
</Navbar>`,
              js: `<Navbar brand="Lojee" id="indigo-navbar">
  <Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100"></Button>
  <Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100"></Button>
</Navbar>

<script type="module">
  import "lojee-ui/elements";

  document.getElementById("indigo-navbar").classNames = {
    root: "bg-indigo-50",
    brand: "text-indigo-900",
  };
</script>`,
              vue: `<template>
  <Navbar brand="Lojee" :classNames="navbarClassNames">
    <Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100" />
    <Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100" />
  </Navbar>
</template>

<script setup>
const navbarClassNames = { root: "bg-indigo-50", brand: "text-indigo-900" };
</script>`,
              angular: `<Navbar brand="Lojee" [classNames]="navbarClassNames">
  <Button variant="ghost" label="Home" class="text-indigo-700 hover:bg-indigo-100"></Button>
  <Button variant="ghost" label="Products" class="text-indigo-700 hover:bg-indigo-100"></Button>
</Navbar>

navbarClassNames = { root: "bg-indigo-50", brand: "text-indigo-900" };`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
