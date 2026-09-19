import { Checkbox } from "../Checkbox";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function CheckboxShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Checkbox</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled wrapper around a native checkbox input — fully keyboard/screen-reader operable.
          </p>
        </div>

        <section>
          <SectionLabel sub="Unchecked and checked (defaultChecked).">Default</SectionLabel>
          <Row>
            <Checkbox />
            <Checkbox defaultChecked />
          </Row>
          <CodeBlock
            code={`<Checkbox />
<Checkbox defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Checkbox color="slate" defaultChecked />
            <Checkbox color="indigo" defaultChecked />
            <Checkbox color="emerald" defaultChecked />
            <Checkbox color="rose" defaultChecked />
            <Checkbox color="amber" defaultChecked />
          </Row>
          <CodeBlock
            code={`<Checkbox color="indigo" defaultChecked />
<Checkbox color="emerald" defaultChecked />
<Checkbox color="rose" defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
          </Row>
          <CodeBlock
            code={`<Checkbox disabled />
<Checkbox disabled defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the box.">With label</SectionLabel>
          <Row>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" defaultChecked color="indigo" />
          </Row>
          <CodeBlock code={`<Checkbox label="Accept terms and conditions" />`} />
        </section>
      </div>
    </div>
  );
}
