import { Breadcrumbs } from "../Breadcrumbs";
import { BreadcrumbItem } from "../BreadcrumbItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function BreadcrumbsShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Breadcrumbs</h1>
          <p className="text-sm text-slate-500 mt-1">A navigation trail showing the current page's location in a hierarchy.</p>
        </div>

        <section>
          <SectionLabel sub="A basic two-level trail.">Basic</SectionLabel>
          <Row>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem>Settings</BreadcrumbItem>
            </Breadcrumbs>
          </Row>
          <CodeBlock
            variants={{
              react: `<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem>Settings</BreadcrumbItem>
</Breadcrumbs>`,
              js: `<l-Breadcrumbs>
  <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem>Settings</l-BreadcrumbItem>
</l-Breadcrumbs>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Breadcrumbs>
    <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
    <l-BreadcrumbItem>Settings</l-BreadcrumbItem>
  </l-Breadcrumbs>
</template>

<script setup>
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Breadcrumbs>
      <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
      <l-BreadcrumbItem>Settings</l-BreadcrumbItem>
    </l-Breadcrumbs>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="A deeper, 4-level trail.">Multi-level</SectionLabel>
          <Row>
            <Breadcrumbs>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
              <BreadcrumbItem href="/projects/lojee-ui">lojee-ui</BreadcrumbItem>
              <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
            </Breadcrumbs>
          </Row>
          <CodeBlock
            variants={{
              react: `<Breadcrumbs>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
  <BreadcrumbItem href="/projects/lojee-ui">lojee-ui</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>`,
              js: `<l-Breadcrumbs>
  <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/projects">Projects</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/projects/lojee-ui">lojee-ui</l-BreadcrumbItem>
  <l-BreadcrumbItem>Breadcrumbs</l-BreadcrumbItem>
</l-Breadcrumbs>`,
              vue: `<template>
  <l-Breadcrumbs>
    <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
    <l-BreadcrumbItem href="/projects">Projects</l-BreadcrumbItem>
    <l-BreadcrumbItem href="/projects/lojee-ui">lojee-ui</l-BreadcrumbItem>
    <l-BreadcrumbItem>Breadcrumbs</l-BreadcrumbItem>
  </l-Breadcrumbs>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Breadcrumbs>
  <l-BreadcrumbItem href="/">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/projects">Projects</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/projects/lojee-ui">lojee-ui</l-BreadcrumbItem>
  <l-BreadcrumbItem>Breadcrumbs</l-BreadcrumbItem>
</l-Breadcrumbs>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Each item can carry its own leading icon.">With icons</SectionLabel>
          <Row>
            <Breadcrumbs>
              <BreadcrumbItem href="/" icon="home">
                Home
              </BreadcrumbItem>
              <BreadcrumbItem href="/team" icon="users">
                Team
              </BreadcrumbItem>
              <BreadcrumbItem icon="circle-user">Profile</BreadcrumbItem>
            </Breadcrumbs>
          </Row>
          <CodeBlock
            variants={{
              react: `<Breadcrumbs>
  <BreadcrumbItem href="/" icon="home">Home</BreadcrumbItem>
  <BreadcrumbItem href="/team" icon="users">Team</BreadcrumbItem>
  <BreadcrumbItem icon="circle-user">Profile</BreadcrumbItem>
</Breadcrumbs>`,
              js: `<l-Breadcrumbs>
  <l-BreadcrumbItem href="/" icon="home">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/team" icon="users">Team</l-BreadcrumbItem>
  <l-BreadcrumbItem icon="circle-user">Profile</l-BreadcrumbItem>
</l-Breadcrumbs>`,
              vue: `<template>
  <l-Breadcrumbs>
    <l-BreadcrumbItem href="/" icon="home">Home</l-BreadcrumbItem>
    <l-BreadcrumbItem href="/team" icon="users">Team</l-BreadcrumbItem>
    <l-BreadcrumbItem icon="circle-user">Profile</l-BreadcrumbItem>
  </l-Breadcrumbs>
</template>`,
              angular: `<!-- reuses the AppComponent from above -->
<l-Breadcrumbs>
  <l-BreadcrumbItem href="/" icon="home">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/team" icon="users">Team</l-BreadcrumbItem>
  <l-BreadcrumbItem icon="circle-user">Profile</l-BreadcrumbItem>
</l-Breadcrumbs>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Each BreadcrumbItem draws its own leading separator, hidden on the first item via CSS `:first-child` — no coordination from the parent needed.">
            Custom styling
          </SectionLabel>
          <Row>
            <Breadcrumbs>
              <BreadcrumbItem href="/" classNames={{ separator: "text-indigo-300" }}>
                Home
              </BreadcrumbItem>
              <BreadcrumbItem href="/docs" classNames={{ separator: "text-indigo-300" }}>
                Docs
              </BreadcrumbItem>
              <BreadcrumbItem className="text-indigo-600">Getting started</BreadcrumbItem>
            </Breadcrumbs>
          </Row>
          <CodeBlock
            variants={{
              react: `<Breadcrumbs>
  <BreadcrumbItem href="/" classNames={{ separator: "text-indigo-300" }}>Home</BreadcrumbItem>
  <BreadcrumbItem href="/docs" classNames={{ separator: "text-indigo-300" }}>Docs</BreadcrumbItem>
  <BreadcrumbItem className="text-indigo-600">Getting started</BreadcrumbItem>
</Breadcrumbs>`,
              js: `<l-Breadcrumbs>
  <l-BreadcrumbItem id="home-crumb" href="/">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem id="docs-crumb" href="/docs">Docs</l-BreadcrumbItem>
  <l-BreadcrumbItem className="text-indigo-600">Getting started</l-BreadcrumbItem>
</l-Breadcrumbs>

<script type="module">
  const separatorClassNames = { separator: "text-indigo-300" };
  document.getElementById("home-crumb").classNames = separatorClassNames;
  document.getElementById("docs-crumb").classNames = separatorClassNames;
</script>`,
              vue: `<template>
  <l-Breadcrumbs>
    <l-BreadcrumbItem href="/" :classNames="separatorClassNames">Home</l-BreadcrumbItem>
    <l-BreadcrumbItem href="/docs" :classNames="separatorClassNames">Docs</l-BreadcrumbItem>
    <l-BreadcrumbItem className="text-indigo-600">Getting started</l-BreadcrumbItem>
  </l-Breadcrumbs>
</template>

<script setup>
const separatorClassNames = { separator: "text-indigo-300" };
</script>`,
              angular: `<l-Breadcrumbs>
  <l-BreadcrumbItem href="/" [classNames]="separatorClassNames">Home</l-BreadcrumbItem>
  <l-BreadcrumbItem href="/docs" [classNames]="separatorClassNames">Docs</l-BreadcrumbItem>
  <l-BreadcrumbItem className="text-indigo-600">Getting started</l-BreadcrumbItem>
</l-Breadcrumbs>

separatorClassNames = { separator: "text-indigo-300" };`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
