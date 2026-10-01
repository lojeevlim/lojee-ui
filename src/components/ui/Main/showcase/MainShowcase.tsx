import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { App } from "../../AppLayout/App";
import { Main, type MainPadding } from "../Main";

const PADDINGS: { value: MainPadding; px: string }[] = [
  { value: "none", px: "0" },
  { value: "sm", px: "24px" },
  { value: "md", px: "32px (default)" },
  { value: "lg", px: "48px" },
  { value: "xl", px: "80px" },
];

// A one-section App, just to give Main its tinted frame and theme.
function Frame({ padding }: { padding?: MainPadding }) {
  return (
    <App layout={[["main"]]} className="!h-40 rounded-lg border border-border">
      <Main padding={padding}>
        <div className="flex h-full items-center justify-center rounded-md border border-dashed border-border-strong text-xs text-fg-subtle">content</div>
      </Main>
    </App>
  );
}

export default function MainShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Main</h1>
        <p className="mt-1 text-sm text-fg-subtle">
          The page area of an App: a rounded surface that follows the light/dark theme, floating on the App's tinted background. Whatever you put
          inside it is already on a themed background, so pages need no wrapper of their own.
        </p>
      </div>

      <section className="mt-10">
        <SectionLabel sub="The built-in look: rounded corners, a theme-aware background, and an inset from the App's edges. It fills the area given by the App's layout and scrolls when its content is taller.">
          Basic
        </SectionLabel>
        <Frame />
        <CodeBlock
          variants={{
            react: `<App>
  <Top>…</Top>
  <Side>…</Side>
  <Main>
    <Dashboard />
  </Main>
</App>`,
            js: `<l-Theme-Provider default-mode="light">
  <l-App>
    <l-Top>…</l-Top>
    <l-Side>…</l-Side>
    <l-Main>
      <my-dashboard></my-dashboard>
    </l-Main>
  </l-App>
</l-Theme-Provider>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-Theme-Provider default-mode="light">
    <l-App>
      <l-Top>…</l-Top>
      <l-Side>…</l-Side>
      <l-Main>
        <Dashboard />
      </l-Main>
    </l-App>
  </l-Theme-Provider>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-Theme-Provider default-mode="light">
  <l-App>
    <l-Top>…</l-Top>
    <l-Side>…</l-Side>
    <l-Main>
      <app-dashboard></app-dashboard>
    </l-Main>
  </l-App>
</l-Theme-Provider>`,
          }}
        />
      </section>

      <section className="mt-10">
        <SectionLabel sub={`\`padding\` sets the space between the panel's edge and its content, on all four sides: "none", "sm", "md" (default), "lg" or "xl".`}>
          Padding
        </SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PADDINGS.map((p) => (
            <div key={p.value}>
              <p className="mb-1.5 text-xs font-medium text-fg-subtle">
                padding="{p.value}" · {p.px}
              </p>
              <Frame padding={p.value} />
            </div>
          ))}
        </div>
        <CodeBlock
          variants={{
            react: `<Main padding="lg">…</Main>`,
            js: `<l-Main padding="lg">…</l-Main>

<script type="module">import "lojee-ui/elements";</script>`,
            vue: `<template>
  <l-Main padding="lg">…</l-Main>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-Main padding="lg">…</l-Main>`,
          }}
        />
      </section>

      <section className="mt-10">
        <SectionLabel sub="Every default is overridable with a class: drop the panel look for a page that wants the bare background, or change the radius.">
          Overriding the defaults
        </SectionLabel>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-medium text-fg-subtle">className="rounded-none"</p>
            <App layout={[["main"]]} className="!h-40 rounded-lg border border-border">
              <Main className="rounded-none">
                <div className="flex h-full items-center justify-center text-xs text-fg-subtle">square corners</div>
              </Main>
            </App>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-fg-subtle">className="m-0 bg-transparent"</p>
            <App layout={[["main"]]} className="!h-40 rounded-lg border border-border">
              <Main className="m-0 bg-transparent">
                <div className="flex h-full items-center justify-center text-xs text-fg-subtle">no panel</div>
              </Main>
            </App>
          </div>
        </div>
        <CodeBlock
          variants={{
            react: `<Main className="rounded-none">…</Main>
<Main className="m-0 bg-transparent">…</Main>`,
            js: `<l-Main class="rounded-none">…</l-Main>`,
            vue: `<template>
  <l-Main class="rounded-none">…</l-Main>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
            angular: `<l-Main class="rounded-none">…</l-Main>`,
          }}
        />
      </section>
    </div>
  );
}
