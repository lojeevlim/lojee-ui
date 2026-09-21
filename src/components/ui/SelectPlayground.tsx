import { useState } from "react";
import { Select, type SelectSize } from "./Select/Select";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const SIZES: SelectSize[] = ["sm", "md", "lg"];

const OPTIONS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];

// The same fixed constant as `OPTIONS` above, spelled out as source text for
// the non-React code variants — `options` is JSON-typed on `<Select>`, so
// it has to be assigned as a real DOM property / binding, never baked as a
// stringified attribute (unlike every other prop in this file).
const OPTIONS_SNIPPET = `const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
];`;

export default function SelectPlayground() {
  const [size, setSize] = useState<SelectSize>("md");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholder, setPlaceholder] = useState("Choose a fruit");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Select options={OPTIONS} size={size} invalid={invalid} disabled={disabled} placeholder={placeholder || undefined} />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Select
  options={options}
  size="${size}"${invalid ? "\n  invalid" : ""}${disabled ? "\n  disabled" : ""}${
    placeholder ? `\n  placeholder="${placeholder}"` : ""
  }
/>`;

  // Every primitive prop (size, invalid, disabled, placeholder) is baked as a
  // literal attribute exactly like the rest of this group. `options` is the
  // one exception — it's JSON-typed on `<Select>`, so it's assigned via a
  // real DOM property (js) or a `:options`/`[options]` binding (vue/angular)
  // against the same fixed constant, never as a stringified attribute.
  const selectAttrs = `size="${size}"${invalid ? ` invalid` : ""}${disabled ? ` disabled` : ""}${
    placeholder ? ` placeholder="${placeholder}"` : ""
  }`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${OPTIONS_SNIPPET}

<l-Select ${selectAttrs} />

<script type="module">
  import "lojee-ui/elements";
  document.querySelector("l-select").options = options;
</script>`,
    vue: `<template>
  <l-Select ${selectAttrs} :options="options" />
</template>

<script setup>
${OPTIONS_SNIPPET}
</script>`,
    angular: `<l-Select ${selectAttrs} [options]="options" />

// example.component.ts
export class ExampleComponent {
  ${OPTIONS_SNIPPET}
}`,
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

      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setInvalid((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (invalid ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Invalid
          </button>
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Disabled
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
