import type { CodeBlockVariants } from "../../CodeBlock";

export type PropKind = "json" | "string" | "number" | "boolean";
export interface CodeProp {
  name: string;
  /** JavaScript literal (without quotes for json / number). For booleans: true / false. */
  value: string;
  kind: PropKind;
}

const kebab = (s: string) => s.replace(/([A-Z])/g, "-$1").toLowerCase();
const indent = (s: string, n: number) => s.replace(/\n/g, "\n" + " ".repeat(n));

/**
 * The same `<l-map>` / `<Map>` example in all four languages. Strings, numbers and booleans are plain attributes;
 * objects and arrays ("json") are properties in plain JS, `:bindings` in Vue and `[bindings]` in Angular.
 */
export function mapCode({
  props,
  height = 360,
  id = "map",
  extraReact = "",
  extraJs = "",
  reactChildren = "",
  reactProps,
  events = [],
}: {
  props: CodeProp[];
  /** Props for the React version when they differ from the Web Component (e.g. markers as children instead of data). */
  reactProps?: CodeProp[];
  height?: number;
  id?: string;
  /** Extra JSX attribute lines (React only), e.g. event handlers. */
  extraReact?: string;
  /** Extra script lines (plain JS only). */
  extraJs?: string;
  /** JSX children for the React version (markers, routes…). */
  reactChildren?: string;
  /** Web Component events to show: [eventName, handlerBody]. */
  events?: [string, string][];
}): CodeBlockVariants {
  const scalar = props.filter((p) => p.kind !== "json");
  const json = props.filter((p) => p.kind === "json");
  const attr = (p: CodeProp) => (p.kind === "boolean" ? `${kebab(p.name)}="${p.value}"` : `${kebab(p.name)}="${p.value.replace(/^"|"$/g, "")}"`);
  const reactAttr = (p: CodeProp) =>
    p.kind === "string" ? `${p.name}=${p.value}` : p.kind === "boolean" ? (p.value === "true" ? p.name : `${p.name}={false}`) : `${p.name}={${p.value}}`;

  const reactLines = [...(reactProps ?? props).map(reactAttr), ...(extraReact ? [extraReact] : [])].map((l) => `  ${l}`).join("\n");
  const react = `<Map
${reactLines}
${reactChildren ? `>\n${reactChildren}\n</Map>` : "/>"}`;

  const style = `height="${height}"`;
  const scalarHtml = scalar.map(attr).join(" ");
  // Vue/Angular bindings sit inside a double-quoted attribute, so string literals inside them must use single quotes.
  const bindingValue = (v: string) => v.replace(/\n\s*/g, " ").replace(/'/g, "\\'").replace(/"/g, "'");
  const jsonVue = json.map((p) => `:${p.name}="${bindingValue(p.value)}"`).join(" ");
  const jsonAngular = json.map((p) => `[${p.name}]="${bindingValue(p.value)}"`).join(" ");
  const evVue = events.map(([e]) => `@${e}="(e: CustomEvent) => onEvent(e.detail)"`).join(" ");
  const evAngular = events.map(([e]) => `(${e})="onEvent($event.detail)"`).join(" ");

  return {
    react,
    js: `<l-map id="${id}" ${style}${scalarHtml ? " " + scalarHtml : ""}></l-map>

<script type="module">
  import "lojee-ui/elements";

  const map = document.getElementById("${id}");
${json.map((p) => `  map.${p.name} = ${indent(p.value, 2)};`).join("\n")}${events.map(([e, body]) => `\n  map.addEventListener("${e}", (e) => ${body});`).join("")}${extraJs ? "\n" + extraJs : ""}
</script>`,
    vue: `<template>
  <l-map ${style}${scalarHtml ? " " + scalarHtml : ""}${jsonVue ? " " + jsonVue : ""}${evVue ? " " + evVue : ""} />
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
    angular: `<l-map ${style}${scalarHtml ? " " + scalarHtml : ""}${jsonAngular ? " " + jsonAngular : ""}${evAngular ? " " + evAngular : ""}></l-map>

// main.ts — import "lojee-ui/elements";  (and add CUSTOM_ELEMENTS_SCHEMA)`,
  };
}
