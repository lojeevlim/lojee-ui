import { useState } from "react";
import { MultiSelect, type MultiSelectOption } from "../MultiSelect";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const FRUIT_OPTIONS: MultiSelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Mango", value: "mango" },
  { label: "Papaya", value: "papaya", disabled: true },
  { label: "Watermelon", value: "watermelon" },
];

export default function MultiSelectShowcase() {
  const [basic, setBasic] = useState<string[]>(["banana"]);
  const [colored, setColored] = useState<string[]>(["apple", "mango"]);
  const [empty, setEmpty] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">MultiSelect</h1>
          <p className="text-sm text-slate-500 mt-1">
            A button trigger showing selected items as removable chips, opening a checkbox-style dropdown listbox on
            click.
          </p>
        </div>

        <section>
          <SectionLabel sub="Selected values render as removable chips inside the trigger.">Basic</SectionLabel>
          <div className="max-w-sm">
            <MultiSelect options={FRUIT_OPTIONS} value={basic} onChange={setBasic} placeholder="Select fruits..." />
          </div>
          <CodeBlock
            code={`const [value, setValue] = useState<string[]>(["banana"]);

<MultiSelect options={options} value={value} onChange={setValue} placeholder="Select fruits..." />`}
          />
        </section>

        <section>
          <SectionLabel sub="Chip and selected-option accent color follows `color`.">Colors</SectionLabel>
          <Row>
            <div className="max-w-sm w-full">
              <MultiSelect options={FRUIT_OPTIONS} value={colored} onChange={setColored} color="violet" />
            </div>
          </Row>
          <CodeBlock code={`<MultiSelect options={options} value={value} onChange={setValue} color="violet" />`} />
        </section>

        <section>
          <SectionLabel sub="Empty state shows the placeholder; one option is disabled.">Empty & disabled option</SectionLabel>
          <div className="max-w-sm">
            <MultiSelect options={FRUIT_OPTIONS} value={empty} onChange={setEmpty} placeholder="Nothing selected yet" />
          </div>
          <CodeBlock code={`<MultiSelect options={options} value={[]} onChange={setValue} placeholder="Nothing selected yet" />`} />
        </section>
      </div>
    </div>
  );
}
