import { Switch } from "../Switch";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SwitchShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Switch</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled toggle switch — a native checkbox input under the hood.
          </p>
        </div>

        <section>
          <SectionLabel sub="Off and on (defaultChecked).">Default</SectionLabel>
          <Row>
            <Switch />
            <Switch defaultChecked />
          </Row>
          <CodeBlock
            code={`<Switch />
<Switch defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Switch size="sm" defaultChecked />
            <Switch size="md" defaultChecked />
            <Switch size="lg" defaultChecked />
          </Row>
          <CodeBlock
            code={`<Switch size="sm" defaultChecked />
<Switch size="md" defaultChecked />
<Switch size="lg" defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Switch color="slate" defaultChecked />
            <Switch color="indigo" defaultChecked />
            <Switch color="emerald" defaultChecked />
            <Switch color="rose" defaultChecked />
            <Switch color="amber" defaultChecked />
          </Row>
          <CodeBlock
            code={`<Switch color="indigo" defaultChecked />
<Switch color="emerald" defaultChecked />
<Switch color="rose" defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="Non-interactive via the native disabled attribute.">Disabled</SectionLabel>
          <Row>
            <Switch disabled />
            <Switch disabled defaultChecked />
          </Row>
          <CodeBlock
            code={`<Switch disabled />
<Switch disabled defaultChecked />`}
          />
        </section>

        <section>
          <SectionLabel sub="An optional label prop rendered alongside the track.">With label</SectionLabel>
          <Row>
            <Switch label="Enable notifications" />
            <Switch label="Dark mode" defaultChecked color="indigo" />
          </Row>
          <CodeBlock code={`<Switch label="Enable notifications" />`} />
        </section>
      </div>
    </div>
  );
}
