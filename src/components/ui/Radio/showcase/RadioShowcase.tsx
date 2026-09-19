import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function RadioShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Radio</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled radio input, plus a RadioGroup layout wrapper — exclusivity is native, via a shared `name`.
          </p>
        </div>

        <section>
          <SectionLabel sub="Radios sharing a name are mutually exclusive natively — no state needed.">Vertical group</SectionLabel>
          <RadioGroup>
            <Radio name="plan" label="Free" defaultChecked />
            <Radio name="plan" label="Pro" />
            <Radio name="plan" label="Enterprise" />
          </RadioGroup>
          <CodeBlock
            code={`<RadioGroup>
  <Radio name="plan" label="Free" defaultChecked />
  <Radio name="plan" label="Pro" />
  <Radio name="plan" label="Enterprise" />
</RadioGroup>`}
          />
        </section>

        <section>
          <SectionLabel sub={`orientation="horizontal".`}>Horizontal group</SectionLabel>
          <RadioGroup orientation="horizontal">
            <Radio name="size" label="Small" defaultChecked />
            <Radio name="size" label="Medium" />
            <Radio name="size" label="Large" />
          </RadioGroup>
          <CodeBlock
            code={`<RadioGroup orientation="horizontal">
  <Radio name="size" label="Small" defaultChecked />
  <Radio name="size" label="Medium" />
  <Radio name="size" label="Large" />
</RadioGroup>`}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
            <Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />
            <Radio name="color-rose" color="rose" label="Rose" defaultChecked />
            <Radio name="color-amber" color="amber" label="Amber" defaultChecked />
          </Row>
          <CodeBlock
            code={`<Radio name="color-indigo" color="indigo" label="Indigo" defaultChecked />
<Radio name="color-emerald" color="emerald" label="Emerald" defaultChecked />`}
          />
        </section>
      </div>
    </div>
  );
}
