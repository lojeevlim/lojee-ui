import { Select } from "../Select";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const FRUITS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry", disabled: true },
  { label: "Durian", value: "durian" },
];

export default function SelectShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Select</h1>
          <p className="text-sm text-slate-500 mt-1">A styled native select, for accessible and robust dropdowns.</p>
        </div>

        <section>
          <SectionLabel sub="A disabled, pre-selected option shown until a choice is made.">Placeholder</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" />
          </div>
          <CodeBlock code={`<Select options={options} placeholder="Choose a fruit" />`} />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Select options={FRUITS} size="sm" placeholder="Small" />
            <Select options={FRUITS} size="md" placeholder="Medium" />
            <Select options={FRUITS} size="lg" placeholder="Large" />
          </div>
          <CodeBlock code={`<Select options={options} size="sm" placeholder="Small" />`} />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" invalid />
          </div>
          <CodeBlock code={`<Select options={options} placeholder="Choose a fruit" invalid />`} />
        </section>

        <section>
          <SectionLabel sub="Individual options can be disabled.">Disabled option</SectionLabel>
          <Row>
            <div className="max-w-sm">
              <Select options={FRUITS} placeholder="Choose a fruit" />
            </div>
          </Row>
          <CodeBlock
            code={`const options = [
  { label: "Apple", value: "apple" },
  { label: "Cherry", value: "cherry", disabled: true },
];`}
          />
        </section>

        <section>
          <SectionLabel sub="The whole select can be disabled.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Select options={FRUITS} placeholder="Choose a fruit" disabled />
          </div>
          <CodeBlock code={`<Select options={options} placeholder="Choose a fruit" disabled />`} />
        </section>
      </div>
    </div>
  );
}
