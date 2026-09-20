import { useState } from "react";
import { Combobox, type ComboboxOption } from "./Combobox/Combobox";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const OPTIONS: ComboboxOption[] = [
  { label: "Tokyo", value: "tokyo" },
  { label: "Manila", value: "manila" },
  { label: "Singapore", value: "singapore" },
  { label: "Bangkok", value: "bangkok" },
  { label: "Seoul", value: "seoul" },
  { label: "Jakarta", value: "jakarta" },
  { label: "Kuala Lumpur", value: "kuala-lumpur" },
  { label: "Hong Kong", value: "hong-kong" },
];

export default function ComboboxPlayground() {
  const [value, setValue] = useState<string | undefined>("manila");
  const [placeholder, setPlaceholder] = useState("Search a city...");

  // `overflow-visible`: the options panel is an absolutely-positioned div
  // (not a portal), so AppWindowFrame's default `overflow-hidden` (for clean
  // rounded corners) would clip it when open.
  const preview = (
    <AppWindowFrame className="overflow-visible">
      <AppWindowBody>
        <div className="w-full max-w-xs">
          <Combobox options={OPTIONS} value={value} onChange={setValue} placeholder={placeholder} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Combobox
  options={options}
  value={${value ? `"${value}"` : "undefined"}}
  onChange={setValue}
  placeholder="${placeholder}"
/>`;

  // `options` is a registered "json" prop on <Combobox> — assign it as a
  // real DOM property (js) / bind it (vue/angular), same as the OPTIONS
  // constant above. `value` is a plain string prop, so it's just baked as a
  // literal attribute — omitted entirely when nothing is selected.
  const optionsLiteral = JSON.stringify(OPTIONS, null, 2);
  const valueAttr = value ? ` value="${value}"` : "";

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<Combobox id="city-combobox" placeholder="${placeholder}"${valueAttr} />

<script type="module">
  import "lojee-ui/elements";

  const options = ${optionsLiteral};

  document.querySelector("#city-combobox").options = options;
</script>`,
    vue: `<template>
  <Combobox :options="options" placeholder="${placeholder}"${valueAttr} />
</template>

<script setup>
const options = ${optionsLiteral};
</script>`,
    angular: `<Combobox [options]="options" placeholder="${placeholder}"${valueAttr} />

options = ${optionsLiteral};`,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Placeholder</span>
        <input
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Placeholder text"
        />
      </div>

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Selected value</span>
        <span className="text-sm text-slate-700">{value ?? <span className="text-slate-400">None</span>}</span>
      </div>
    </PlaygroundLayout>
  );
}
