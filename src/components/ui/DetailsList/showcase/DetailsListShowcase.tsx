import { DetailsList, type DetailsListItem } from "../DetailsList";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

const EVENTS: DetailsListItem[] = [
  { title: "@action", description: "Called when a row action is clicked, with the action and its row." },
  { title: "@datachange", description: "Called with the updated rows after a built-in delete, duplicate or edit-save." },
  { title: "@selectionchange", description: "Called with the selected keys and rows whenever the selection changes." },
  { title: "@sortchange", description: "Called when a sortable column header is clicked." },
  { title: "@viewchange", description: 'Called with "table" or "grid" when the view is switched.' },
];

const DETAILED: DetailsListItem[] = [
  {
    title: "@selectionchange",
    description: "Called whenever the selection changes.",
    open: true,
    body: "event.detail carries the selected keys and the matching rows.",
    fields: [
      { name: "keys", type: "(string | number)[]", description: "The selected row keys." },
      { name: "rows", type: "T[]", description: "The selected row objects." },
    ],
    code: `el.addEventListener("selectionchange", (e) => {\n  console.log(e.detail.keys, e.detail.rows);\n});`,
  },
  { title: "@sortchange", description: "Called when a sortable header is clicked.", fields: [{ name: "key", type: "string", description: "Column key." }, { name: "direction", type: '"asc" | "desc"' }] },
];

const lit = (items: DetailsListItem[]) => JSON.stringify(items, null, 2).replace(/"(\w+)":/g, "$1:");

export default function DetailsListShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Details List</h1>
          <p className="mt-1 text-sm text-fg-subtle">
            An expandable list of rows — a title and summary that open to a description, a fields table and a code sample. Used for event and method references.
          </p>
        </div>

        <section>
          <SectionLabel sub="Each row has a monospace title and a one-line summary.">Basic</SectionLabel>
          <DetailsList items={EVENTS} />
          <CodeBlock
            variants={{
              react: `<DetailsList items={items} />`,
              js: `<l-DetailsList id="events"></l-DetailsList>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  document.getElementById("events").items = ${lit(EVENTS)};\n</script>`,
              vue: `<template>\n  <l-DetailsList :items="items" />\n</template>\n\n<script setup lang="ts">\nconst items = ${lit(EVENTS)};\n</script>`,
              angular: `<l-DetailsList [items]="items"></l-DetailsList>\n\n// component class\nitems = ${lit(EVENTS)};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Rows can open to a paragraph, a fields table and a code sample. Set open to start a row expanded.">Fields and code</SectionLabel>
          <DetailsList items={DETAILED} />
          <CodeBlock
            variants={{
              react: `<DetailsList items={items} />`,
              js: `document.querySelector("l-details-list").items = ${lit(DETAILED)};`,
              vue: `<l-DetailsList :items="items" />\n\nconst items = ${lit(DETAILED)};`,
              angular: `<l-DetailsList [items]="items"></l-DetailsList>\n\nitems = ${lit(DETAILED)};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="exclusive keeps only one row open at a time.">Exclusive</SectionLabel>
          <DetailsList exclusive items={DETAILED} />
          <CodeBlock
            variants={{
              react: `<DetailsList exclusive items={items} />`,
              js: `<l-DetailsList exclusive="true"></l-DetailsList>`,
              vue: `<l-DetailsList exclusive="true" :items="items" />`,
              angular: `<l-DetailsList exclusive="true" [items]="items"></l-DetailsList>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transition.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <DetailsList items={EVENTS.slice(0, 3)} transition="fade" />
            <DetailsList items={EVENTS.slice(0, 3)} transition="slide-up" />
            <DetailsList items={EVENTS.slice(0, 3)} transition="slide-right" transitionDelay={100} />
            <DetailsList items={EVENTS.slice(0, 3)} transition="zoom" />
          </TransitionPreview>
        </section>
      </div>
    </div>
  );
}
