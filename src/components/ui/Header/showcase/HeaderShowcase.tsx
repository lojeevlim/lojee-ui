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
              js: `<Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />`,
              angular: `<Header heading="Team settings" description="Manage members, roles, and billing for your workspace." />`,
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
              js: `<Header heading="Projects" description="All projects across your workspace.">
  <div slot="actions">
    <Button variant="outline" label="Import" />
    <Button label="New project" />
  </div>
</Header>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Header heading="Projects" description="All projects across your workspace.">
    <template #actions>
      <Button variant="outline" label="Import" />
      <Button label="New project" />
    </template>
  </Header>
</template>`,
              angular: `<Header heading="Projects" description="All projects across your workspace.">
  <div slot="actions">
    <Button variant="outline" label="Import" />
    <Button label="New project" />
  </div>
</Header>`,
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
              js: `<Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
  <div slot="breadcrumbs">
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon="home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem>Lojee Website Redesign</BreadcrumbItem>
    </Breadcrumbs>
  </div>
</Header>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
    <template #breadcrumbs>
      <Breadcrumbs>
        <BreadcrumbItem href="#" icon="home">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Projects</BreadcrumbItem>
        <BreadcrumbItem>Lojee Website Redesign</BreadcrumbItem>
      </Breadcrumbs>
    </template>
  </Header>
</template>`,
              angular: `<Header heading="Lojee Website Redesign" description="Created by Jordan Diaz on Sep 12.">
  <div slot="breadcrumbs">
    <Breadcrumbs>
      <BreadcrumbItem href="#" icon="home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Projects</BreadcrumbItem>
      <BreadcrumbItem>Lojee Website Redesign</BreadcrumbItem>
    </Breadcrumbs>
  </div>
</Header>`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
