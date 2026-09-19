import { useState } from "react";
import { Pagination } from "../Pagination";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function PaginationShowcase() {
  const [basicPage, setBasicPage] = useState(1);
  const [longPage, setLongPage] = useState(6);
  const [widePage, setWidePage] = useState(6);
  const [colorPage, setColorPage] = useState(3);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pagination</h1>
          <p className="text-sm text-slate-500 mt-1">A controlled page list with prev/next arrows and ellipsis collapsing.</p>
        </div>

        <section>
          <SectionLabel sub="Few pages — no ellipsis needed.">Basic</SectionLabel>
          <Pagination page={basicPage} totalPages={5} onPageChange={setBasicPage} />
          <CodeBlock
            variants={{
              react: `const [page, setPage] = useState(1);

<Pagination page={page} totalPages={5} onPageChange={setPage} />`,
              js: `<Pagination id="basic-pagination" total-pages="5" />

<script type="module">
  import "lojee-ui/elements";

  const pagination = document.getElementById("basic-pagination");
  pagination.page = 1;
  pagination.addEventListener("pagechange", (e) => {
    pagination.page = e.detail;
  });
</script>`,
              vue: `<template>
  <Pagination :page="page" total-pages="5" @pagechange="page = $event.detail" />
</template>

<script setup>
import { ref } from "vue";
import "lojee-ui/elements";

const page = ref(1);
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`<Pagination [page]="page" total-pages="5" (pagechange)="page = $event.detail" />\`,
})
export class AppComponent {
  page = 1;
}`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Many pages — collapses into ellipses around the current page.">Long range</SectionLabel>
          <Pagination page={longPage} totalPages={20} onPageChange={setLongPage} />
          <CodeBlock
            variants={{
              react: `const [page, setPage] = useState(6);

<Pagination page={page} totalPages={20} onPageChange={setPage} />`,
              js: `<Pagination id="long-pagination" total-pages="20" />

<script type="module">
  const pagination = document.getElementById("long-pagination");
  pagination.page = 6;
  pagination.addEventListener("pagechange", (e) => {
    pagination.page = e.detail;
  });
</script>`,
              vue: `<template>
  <Pagination :page="page" total-pages="20" @pagechange="page = $event.detail" />
</template>

<script setup>
import { ref } from "vue";

const page = ref(6);
</script>`,
              angular: `<!-- reuses the AppComponent class from above (with \`page\` initialized accordingly) -->
<Pagination [page]="page" total-pages="20" (pagechange)="page = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="More neighboring pages shown before collapsing.">siblingCount</SectionLabel>
          <Pagination page={widePage} totalPages={20} siblingCount={2} onPageChange={setWidePage} />
          <CodeBlock
            variants={{
              react: `<Pagination page={page} totalPages={20} siblingCount={2} onPageChange={setPage} />`,
              js: `<Pagination id="wide-pagination" total-pages="20" sibling-count="2" />

<script type="module">
  const pagination = document.getElementById("wide-pagination");
  pagination.page = 6;
  pagination.addEventListener("pagechange", (e) => {
    pagination.page = e.detail;
  });
</script>`,
              vue: `<template>
  <Pagination :page="page" total-pages="20" sibling-count="2" @pagechange="page = $event.detail" />
</template>

<script setup>
import { ref } from "vue";

const page = ref(6);
</script>`,
              angular: `<!-- reuses the AppComponent class from above (with \`page\` initialized accordingly) -->
<Pagination [page]="page" total-pages="20" sibling-count="2" (pagechange)="page = $event.detail" />`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Color</SectionLabel>
          <Pagination page={colorPage} totalPages={10} color="indigo" onPageChange={setColorPage} />
          <CodeBlock
            variants={{
              react: `<Pagination page={page} totalPages={10} color="indigo" onPageChange={setPage} />`,
              js: `<Pagination id="color-pagination" total-pages="10" color="indigo" />

<script type="module">
  const pagination = document.getElementById("color-pagination");
  pagination.page = 3;
  pagination.addEventListener("pagechange", (e) => {
    pagination.page = e.detail;
  });
</script>`,
              vue: `<template>
  <Pagination :page="page" total-pages="10" color="indigo" @pagechange="page = $event.detail" />
</template>

<script setup>
import { ref } from "vue";

const page = ref(3);
</script>`,
              angular: `<!-- reuses the AppComponent class from above (with \`page\` initialized accordingly) -->
<Pagination [page]="page" total-pages="10" color="indigo" (pagechange)="page = $event.detail" />`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
