import { useState } from "react";
import { SearchInput } from "../SearchInput";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SearchInputShowcase() {
  const [query, setQuery] = useState("lojee-ui");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">SearchInput</h1>
          <p className="text-sm text-slate-500 mt-1">A text input with a leading search icon and a working clear button.</p>
        </div>

        <section>
          <SectionLabel sub="The clear button only appears once there's a value and onClear is provided.">Basic</SectionLabel>
          <div className="max-w-sm">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search…"
            />
          </div>
          <CodeBlock
            variants={{
              react: `const [query, setQuery] = useState("");

<SearchInput
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
  placeholder="Search…"
/>`,
              js: `<l-SearchInput id="search" placeholder="Search…" />

<script type="module">
  import "lojee-ui/elements";

  const search = document.getElementById("search");
  search.value = "lojee-ui";
  search.addEventListener("input", (e) => { /* e.target.value */ });
  search.addEventListener("clear", () => { search.value = ""; });
</script>`,
              vue: `<template>
  <l-SearchInput
    :value="query"
    @input="query = $event.target.value"
    @clear="query = ''"
    placeholder="Search…"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "lojee-ui/elements";

const query = ref("lojee-ui");
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-SearchInput
      [value]="query"
      (input)="query = $any($event.target).value"
      (clear)="query = ''"
      placeholder="Search…"
     />
  \`,
})
export class AppComponent {
  query = "lojee-ui";
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <SearchInput size="sm" placeholder="Small" />
            <SearchInput size="md" placeholder="Medium" />
            <SearchInput size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            variants={{
              react: `<SearchInput size="sm" placeholder="Small" />
<SearchInput size="md" placeholder="Medium" />
<SearchInput size="lg" placeholder="Large" />`,
              js: `<l-SearchInput size="sm" placeholder="Small" />
<l-SearchInput size="md" placeholder="Medium" />
<l-SearchInput size="lg" placeholder="Large" />`,
              vue: `<template>
  <l-SearchInput size="sm" placeholder="Small" />
  <l-SearchInput size="md" placeholder="Medium" />
  <l-SearchInput size="lg" placeholder="Large" />
</template>`,
              angular: `<!-- app.component.html — same AppComponent as above -->
<l-SearchInput size="sm" placeholder="Small" />
<l-SearchInput size="md" placeholder="Medium" />
<l-SearchInput size="lg" placeholder="Large" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native inputs.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <SearchInput disabled placeholder="Disabled" />
          </div>
          <CodeBlock
            variants={{
              react: `<SearchInput disabled placeholder="Disabled" />`,
              js: `<l-SearchInput disabled placeholder="Disabled" />`,
              vue: `<l-SearchInput disabled placeholder="Disabled" />`,
              angular: `<l-SearchInput disabled placeholder="Disabled" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
