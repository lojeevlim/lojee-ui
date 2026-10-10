import { DetailsList, type DetailsListItem } from "../DetailsList";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";
import { useCodeFramework } from "../../../../core/codeFramework";

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
// The sample's `code` field shows how to listen for the event; in the Vue and Angular snippets it is the template binding, not a DOM lookup.
const withCode = (code: string) => DETAILED.map((it) => (it.code ? { ...it, code } : it));
const VUE_ITEMS = withCode('<l-details-list @selectionchange="(e) => console.log(e.detail.keys, e.detail.rows)" />');
const ANGULAR_ITEMS = withCode('<l-details-list (selectionchange)="onSelect($any($event).detail)"></l-details-list>');
const REACT_ITEMS = withCode('<Table onSelectionChange={(keys, rows) => console.log(keys, rows)} />');

export default function DetailsListShowcase() {
  // The sample's code row follows the language chosen in the header: no DOM lookups in the Vue / Angular versions.
  const { framework } = useCodeFramework();
  const DETAILED_SHOWN = framework === "vue" ? VUE_ITEMS : framework === "angular" ? ANGULAR_ITEMS : framework === "react" ? REACT_ITEMS : DETAILED;
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
              js: `<l-details-list id="events"></l-details-list>\n\n<script type="module">\n  import "lojee-ui/elements";\n\n  document.getElementById("events").items = ${lit(EVENTS)};\n</script>`,
              vue: `<template>\n  <l-details-list :items="items" />\n</template>\n\n<script setup lang="ts">\nconst items = ${lit(EVENTS)};\n</script>`,
              angular: `<l-details-list [items]="items"></l-details-list>\n\n// component class\nitems = ${lit(EVENTS)};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Rows can open to a paragraph, a fields table and a code sample. Set open to start a row expanded.">Fields and code</SectionLabel>
          <DetailsList items={DETAILED_SHOWN} />
          <CodeBlock
            variants={{
              react: `<DetailsList items={items} />`,
              js: `document.querySelector("l-details-list").items = ${lit(DETAILED)};`,
              vue: `<l-details-list :items="items" />\n\nconst items = ${lit(VUE_ITEMS)};`,
              angular: `<l-details-list [items]="items"></l-details-list>\n\nitems = ${lit(ANGULAR_ITEMS)};`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="exclusive keeps only one row open at a time.">Exclusive</SectionLabel>
          <DetailsList exclusive items={DETAILED_SHOWN} />
          <CodeBlock
            variants={{
              react: `<DetailsList exclusive items={items} />`,
              js: `<l-details-list exclusive="true"></l-details-list>`,
              vue: `<l-details-list exclusive="true" :items="items" />`,
              angular: `<l-details-list exclusive="true" [items]="items"></l-details-list>`,
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
