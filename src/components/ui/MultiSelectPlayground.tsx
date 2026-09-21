import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "./MultiSelect/MultiSelect";
import type { ColorName } from "../../core/tokens";
import { ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const OPTIONS: MultiSelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Mango", value: "mango" },
  { label: "Papaya", value: "papaya", disabled: true },
  { label: "Watermelon", value: "watermelon" },
];

export default function MultiSelectPlayground() {
  const [value, setValue] = useState<string[]>(["banana"]);
  const [color, setColor] = useState<ColorName>("slate");
  const [placeholder, setPlaceholder] = useState("Select fruits...");

  // `overflow-visible`: the options panel is an absolutely-positioned div
  // (not a portal), so AppWindowFrame's default `overflow-hidden` (for clean
  // rounded corners) would clip it when open.
  const preview = (
    <AppWindowFrame className="overflow-visible">
      <AppWindowBody>
        <div className="w-full max-w-xs">
          <MultiSelect options={OPTIONS} value={value} onChange={setValue} color={color} placeholder={placeholder} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<MultiSelect
  options={options}
  value={${JSON.stringify(value)}}
  onChange={setValue}
  color="${color}"
  placeholder="${placeholder}"
/>`;

  // `options`/`value` are registered as "json" props on <MultiSelect> — a
  // stringified attribute won't do, they need to be assigned as real DOM
  // properties (js) or bound (vue/angular), same as the OPTIONS constant and
  // current `value` selection above.
  const optionsLiteral = JSON.stringify(OPTIONS, null, 2);
  const valueLiteral = JSON.stringify(value);

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `<l-MultiSelect id="multi-select" placeholder="${placeholder}" color="${color}" />

<script type="module">
  import "lojee-ui/elements";

  const options = ${optionsLiteral};
  const value = ${valueLiteral};

  const el = document.querySelector("#multi-select");
  el.options = options;
  el.value = value;
</script>`,
    vue: `<template>
  <l-MultiSelect :options="options" :value="value" placeholder="${placeholder}" color="${color}" />
</template>

<script setup>
const options = ${optionsLiteral};
const value = ${valueLiteral};
</script>`,
    angular: `<l-MultiSelect [options]="options" [value]="value" placeholder="${placeholder}" color="${color}" />

options = ${optionsLiteral};
value = ${valueLiteral};`,
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

      <ColorSwatches value={color} onChange={setColor} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Selected</span>
        <div className="flex flex-wrap gap-1.5">
          {value.length === 0 && <span className="text-xs text-slate-400">None</span>}
          {value.map((v) => (
            <span key={v} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              {v}
            </span>
          ))}
        </div>
      </div>
    </PlaygroundLayout>
  );
}
