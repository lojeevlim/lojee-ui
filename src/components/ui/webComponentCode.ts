import type { CodeBlockVariants } from "./CodeBlock";

interface WcCode {
  /** The React (JSX) version. */
  react: string;
  /** The `<l-*>` markup for plain HTML — also used for Vue / Angular unless overridden. */
  html: string;
  vueHtml?: string;
  angularHtml?: string;
  /** Lines for the plain-JS `<script type="module">` (after the `import "lojee-ui/elements"`). */
  script?: string;
  /** Lines for Vue's `<script setup>` (after the import). */
  vueScript?: string;
  /** Lines for the Angular component class. */
  angularClass?: string;
}

const indent = (s: string, n: number) => s.replace(/^/gm, " ".repeat(n));

/** The four code tabs (React / JS / Vue / Angular) for a Web Component example, from one description. */
export function wcCode({ react, html, vueHtml, angularHtml, script, vueScript, angularClass }: WcCode): CodeBlockVariants {
  return {
    react,
    js: `${html}\n\n<script type="module">\n  import "lojee-ui/elements";${script ? `\n\n${indent(script, 2)}` : ""}\n</script>`,
    vue: `<template>\n${indent(vueHtml ?? html, 2)}\n</template>\n\n<script setup lang="ts">\nimport "lojee-ui/elements";${vueScript ? `\n\n${vueScript}` : ""}\n</script>`,
    angular: `${angularHtml ?? html}${angularClass ? `\n\n// component class\n${angularClass}` : ""}`,
  };
}
