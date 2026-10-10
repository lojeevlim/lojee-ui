import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { NumberInput } from "../NumberInput";

function Controlled() {
  const [qty, setQty] = useState<number | undefined>(2);
  return (
    <div className="space-y-2">
      <NumberInput value={qty} onChange={setQty} min={0} max={10} />
      <p className="text-xs text-fg-subtle">
        Value: <span className="font-mono text-fg-muted">{qty === undefined ? "empty" : qty}</span>
      </p>
    </div>
  );
}

export default function NumberInputShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Number Input</h1>
        <p className="mt-1 text-sm text-fg-subtle">A number field with − and + buttons, arrow-key stepping and min / max / precision handling.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Click − / +, press the up and down arrow keys, or type. The value is clamped to `min` and `max` when you leave the field.">Basic</SectionLabel>
        <Controlled />
        <CodeBlock
          variants={wcCode({
            react: `const [qty, setQty] = useState<number | undefined>(2);

<NumberInput value={qty} onChange={setQty} min={0} max={10} />`,
            html: `<l-number-input id="qty" value="2" min="0" max="10"></l-number-input>`,
            vueHtml: `<l-number-input :value="qty" min="0" max="10" @change="qty = $event.detail"></l-number-input>`,
            angularHtml: `<l-number-input [value]="qty" min="0" max="10" (change)="qty = $event.detail"></l-number-input>`,
            script: `document.getElementById("qty").addEventListener("change", (e) => console.log(e.detail)); // number | undefined`,
            vueScript: `const qty = ref<number | undefined>(2);`,
            angularClass: `qty: number | undefined = 2;`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`step` sets how much a click changes the value; `precision` rounds to that many decimals — handy for prices.">Step and precision</SectionLabel>
        <div className="flex flex-wrap gap-4">
          <NumberInput value={5} step={5} min={0} />
          <NumberInput value={9.99} step={0.01} precision={2} min={0} />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<NumberInput value={5} step={5} min={0} />
<NumberInput value={9.99} step={0.01} precision={2} min={0} />`,
            html: `<l-number-input value="5" step="5" min="0"></l-number-input>
<l-number-input value="9.99" step="0.01" precision="2" min="0"></l-number-input>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Three sizes, plus `invalid` and `disabled` states.">Sizes and states</SectionLabel>
        <div className="flex flex-wrap items-center gap-4">
          <NumberInput size="sm" value={1} />
          <NumberInput size="md" value={2} />
          <NumberInput size="lg" value={3} />
          <NumberInput invalid value={4} />
          <NumberInput disabled value={5} />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<NumberInput size="sm" />
<NumberInput size="lg" />
<NumberInput invalid />
<NumberInput disabled />`,
            html: `<l-number-input size="sm"></l-number-input>
<l-number-input size="lg"></l-number-input>
<l-number-input invalid="true"></l-number-input>
<l-number-input disabled="true"></l-number-input>`,
            vueHtml: `<l-number-input size="sm"></l-number-input>
<l-number-input size="lg"></l-number-input>
<l-number-input :invalid="true"></l-number-input>
<l-number-input :disabled="true"></l-number-input>`,
            angularHtml: `<l-number-input size="sm"></l-number-input>
<l-number-input size="lg"></l-number-input>
<l-number-input [invalid]="true"></l-number-input>
<l-number-input [disabled]="true"></l-number-input>`,
          })}
        />
      </section>
    </div>
  );
}
