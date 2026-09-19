import { Section } from "../Section";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SectionShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Section</h1>
          <p className="text-sm text-slate-500 mt-1">Vertical rhythm for stacked page sections, with an optional title/subtitle header.</p>
        </div>

        <section>
          <SectionLabel sub="sm, md, lg vertical padding.">Spacing</SectionLabel>
          <div className="space-y-3">
            {(["sm", "md", "lg"] as const).map((spacing) => (
              <div key={spacing} className="border border-dashed border-slate-200 rounded-lg">
                <Section spacing={spacing} className="px-4">
                  <div className="rounded-md bg-slate-100 p-3 text-center text-xs text-slate-500">spacing="{spacing}"</div>
                </Section>
              </div>
            ))}
          </div>
          <CodeBlock
            code={`<Section spacing="sm">...</Section>
<Section spacing="md">...</Section>
<Section spacing="lg">...</Section>`}
          />
        </section>

        <section>
          <SectionLabel sub="Renders a heading and description above the body.">Title and subtitle</SectionLabel>
          <div className="border border-dashed border-slate-200 rounded-lg">
            <Section title="Team members" subtitle="Manage who has access to this workspace." className="px-4">
              <div className="rounded-md bg-slate-100 p-3 text-center text-xs text-slate-500">Body content</div>
            </Section>
          </div>
          <CodeBlock
            code={`<Section title="Team members" subtitle="Manage who has access to this workspace.">
  ...
</Section>`}
          />
        </section>
      </div>
    </div>
  );
}
