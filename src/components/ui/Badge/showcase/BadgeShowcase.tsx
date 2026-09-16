import { Badge } from "../Badge";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function BadgeShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Badge</h1>
          <p className="text-sm text-slate-500 mt-1">
            Small status/label pills — solid, outline, and soft, in every color.
          </p>
        </div>

        <section>
          <SectionLabel sub="Solid, outline, and soft.">Variants</SectionLabel>
          <Row>
            <Badge variant="solid" label="Solid" />
            <Badge variant="outline" label="Outline" />
            <Badge variant="soft" label="Soft" />
          </Row>
          <CodeBlock
            code={`<Badge variant="solid" label="Solid" />
<Badge variant="outline" label="Outline" />
<Badge variant="soft" label="Soft" />`}
          />
        </section>

        <section>
          <SectionLabel sub="Same palette as Button.">Colors</SectionLabel>
          <Row>
            <Badge color="slate" label="Slate" />
            <Badge color="indigo" label="Indigo" />
            <Badge color="emerald" label="Emerald" />
            <Badge color="rose" label="Rose" />
            <Badge color="amber" label="Amber" />
          </Row>
          <CodeBlock
            code={`<Badge color="indigo" label="Indigo" />
<Badge color="emerald" label="Emerald" />
<Badge color="rose" label="Rose" />`}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <Row>
            <Badge size="sm" label="Small" />
            <Badge size="md" label="Medium" />
            <Badge size="lg" label="Large" />
          </Row>
          <CodeBlock
            code={`<Badge size="sm" label="Small" />
<Badge size="md" label="Medium" />
<Badge size="lg" label="Large" />`}
          />
        </section>

        <section>
          <SectionLabel sub="An optional leading icon.">With icon</SectionLabel>
          <Row>
            <Badge icon="check" color="emerald" label="Verified" />
            <Badge icon="circle-alert" color="amber" label="Pending" />
            <Badge icon="circle-x" color="rose" variant="outline" label="Failed" />
          </Row>
          <CodeBlock code={`<Badge icon="check" color="emerald" label="Verified" />`} />
        </section>

        <section>
          <SectionLabel sub="No text — a minimal status dot.">Dot indicator</SectionLabel>
          <Row>
            <Badge dot color="emerald" label="Online" />
            <Badge dot color="amber" label="Away" />
            <Badge dot color="rose" label="Offline" />
          </Row>
          <CodeBlock code={`<Badge dot color="emerald" label="Online" />`} />
        </section>
      </div>
    </div>
  );
}
