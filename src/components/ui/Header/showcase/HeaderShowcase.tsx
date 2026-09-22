import { Header } from "../Header";
import { Button } from "../../Buttons/Button";
import { Breadcrumbs } from "../../Breadcrumbs/Breadcrumbs";
import { BreadcrumbItem } from "../../Breadcrumbs/BreadcrumbItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function HeaderShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Header</h1>
          <p className="text-sm text-slate-500 mt-1">
            A page-level header — title, description, and actions, e.g. the bar at the top of a dashboard page.
          </p>
        </div>

        <section>
          <SectionLabel sub="A title and a short description.">Basic</SectionLabel>
          <Header title="Team settings" description="Manage members, roles, and billing for your workspace." />
          <CodeBlock
            variants={{
              react: `<Header title="Team settings" description="Manage members, roles, and billing for your workspace." />`,
              js: `<l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />`,
              angular: `<l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Action buttons render on the right, aligned with the title.">With actions</SectionLabel>
          <Header
            title="Projects"
            description="All projects across your workspace."
            actions={
              <>
                <Button variant="outline" label="Import" />
                <Button label="New project" />
              </>
            }
          />
          <CodeBlock
            variants={{
              react: `<Header
  title="Projects"
  description="All projects across your workspace."
  actions={
    <>
      <Button variant="outline" label="Import" />
      <Button label="New project" />
    </>
  }
/>`,
              js: `<l-Header heading="Projects" description="All projects across your workspace.">
  <div slot="actions">
    <l-Button variant="outline" label="Import" />
    <l-Button label="New project" />
  </div>
</l-Header>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Header heading="Projects" description="All projects across your workspace.">
    <template #actions>
      <l-Button variant="outline" label="Import" />
      <l-Button label="New project" />
    </template>
  </l-Header>
</template>`,
              angular: `<l-Header heading="Projects" description="All projects across your workspace.">
  <div slot="actions">
    <l-Button variant="outline" label="Import" />
    <l-Button label="New project" />
  </div>
</l-Header>`,
            }}
          />
        </section>

        <section>
          <SectionLabel
            sub={
              'Seven themes, identical set to Sidebar\'s/Navbar\'s: "light" (default), "dark", ' +
              '"bordered"/"elevated"/"glass" (detached, floating cards), "minimal" (no chrome at all), ' +
              'and "gradient" (color-tinted). "bordered" tints its border with `color`/`borderWidth`; ' +
              '"glass" tints its backdrop with `color` instead.'
            }
          >
            Variants
          </SectionLabel>
          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <Header
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button label="New project" />}
                classNames={{ root: "px-4" }}
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <Header
                variant="dark"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button label="New project" />}
                classNames={{ root: "px-4" }}
              />
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <Header
                variant="bordered"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button label="New project" />}
              />
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <Header
                variant="elevated"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button label="New project" />}
              />
            </div>
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-4">
              <Header
                variant="minimal"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button label="New project" />}
              />
            </div>
            <div className="overflow-hidden rounded-lg">
              <Header
                variant="gradient"
                color="indigo"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button variant="outline" label="New project" className="border-white/30 text-white hover:bg-white/10" />}
                classNames={{ root: "px-4" }}
              />
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-indigo-100 p-4">
              <Header
                variant="glass"
                color="indigo"
                title="Team settings"
                description="Manage members, roles, and billing for your workspace."
                actions={<Button variant="outline" label="New project" className="border-white/30 text-white hover:bg-white/10" />}
              />
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Header
  variant="dark"
  title="Team settings"
  description="Manage members, roles, and billing for your workspace."
  actions={<Button label="New project" />}
/>

{/* Also available:
    variant="bordered" / "elevated" / "glass" — detached-panel looks (rounded corners, floats
      inside a page instead of sitting flush in its content flow). Their backdrop (padding + a
      neutral background) is built in, so no extra markup is needed. "bordered" is a solid white
      card with a color-tinted border (see \`color\`/\`borderWidth\`); "elevated" is the same card
      but shadow-only, no border; "glass" has no background color at all, just backdrop-blur-xl —
      needs something with real color/texture behind it to read.
    variant="minimal"  — no background/border at all, blends into the page.
    variant="gradient" — a left-to-right gradient built from \`color\` (600 → 700). */}`,
              js: `<l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." variant="dark">
  <div slot="actions">
    <l-Button label="New project" />
  </div>
</l-Header>

<script type="module">import "lojee-ui/elements";</script>

<!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->`,
              vue: `<template>
  <l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." variant="dark">
    <template #actions>
      <l-Button label="New project" />
    </template>
  </l-Header>

  <!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
       markup needed. "minimal" — no background/border at all, blends into the page. -->
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `<!-- "bordered"/"elevated"/"glass" — detached-panel looks; their backdrop is built in, no extra
     markup needed. "minimal" — no background/border at all, blends into the page. -->
<l-Header heading="Team settings" description="Manage members, roles, and billing for your workspace." variant="dark">
  <div slot="actions">
    <l-Button label="New project" />
  </div>
</l-Header>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A breadcrumb trail rendered above the title.">With breadcrumbs</SectionLabel>
          <Header
            breadcrumbs={
              <Breadcrumbs>
                <BreadcrumbItem href="#" icon="home">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                <BreadcrumbItem>Lojee Website Redesign</BreadcrumbItem>
              </Breadcrumbs>
            }
            title="Lojee Website Redesign"
            description="Created by Jordan Diaz on Sep 12."
          />
          <CodeBlock
            variants={{
              react: `<Header
  breadcrumbs={
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon="home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem>Lojee Website Redesign</BreadcrumbItem>
    </Breadcrumbs>
  }
  title="Lojee Website Redesign"
  description="Created by Jordan Diaz on Sep 12."
/>`,
              js: `<l-Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
  <div slot="breadcrumbs">
    <l-Breadcrumbs>
      <l-BreadcrumbItem href="#" icon="home">Home</l-BreadcrumbItem>
      <l-BreadcrumbItem href="#">Projects</l-BreadcrumbItem>
      <l-BreadcrumbItem>Lojee Website Redesign</l-BreadcrumbItem>
    </l-Breadcrumbs>
  </div>
</l-Header>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
    <template #breadcrumbs>
      <l-Breadcrumbs>
        <l-BreadcrumbItem href="#" icon="home">Home</l-BreadcrumbItem>
        <l-BreadcrumbItem href="#">Projects</l-BreadcrumbItem>
        <l-BreadcrumbItem>Lojee Website Redesign</l-BreadcrumbItem>
      </l-Breadcrumbs>
    </template>
  </l-Header>
</template>`,
              angular: `<l-Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
  <div slot="breadcrumbs">
    <l-Breadcrumbs>
      <l-BreadcrumbItem href="#" icon="home">Home</l-BreadcrumbItem>
      <l-BreadcrumbItem href="#">Projects</l-BreadcrumbItem>
      <l-BreadcrumbItem>Lojee Website Redesign</l-BreadcrumbItem>
    </l-Breadcrumbs>
  </div>
</l-Header>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
