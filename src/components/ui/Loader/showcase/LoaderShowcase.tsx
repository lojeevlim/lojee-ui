import { Loader } from "../Loader";
import { Avatar } from "../../Avatar/Avatar";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function LoaderShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Loader</h1>
          <p className="text-sm text-slate-500 mt-1">
            Skeleton placeholders for content that's still loading — distinct from Spinner's
            spinning/bouncing indicators.
          </p>
        </div>

        <section>
          <SectionLabel sub="Stacked lines, the last one shorter.">Text skeleton</SectionLabel>
          <div className="max-w-sm">
            <Loader shape="text" lines={3} />
          </div>
          <CodeBlock code={`<Loader shape="text" lines={3} />`} />
        </section>

        <section>
          <SectionLabel sub="For an avatar-shaped placeholder.">Circle skeleton</SectionLabel>
          <Row>
            <Loader shape="circle" width={40} />
            <Loader shape="circle" width={64} />
          </Row>
          <CodeBlock code={`<Loader shape="circle" width={40} />`} />
        </section>

        <section>
          <SectionLabel sub="For image/card placeholders.">Rect skeleton</SectionLabel>
          <Loader shape="rect" height={120} />
          <CodeBlock code={`<Loader shape="rect" height={120} />`} />
        </section>

        <section>
          <SectionLabel sub="A common composition — avatar + text lines.">Card example</SectionLabel>
          <div className="flex max-w-sm items-center gap-3">
            <Loader shape="circle" width={40} />
            <div className="flex-1">
              <Loader shape="text" lines={2} />
            </div>
          </div>
          <CodeBlock
            code={`<div className="flex items-center gap-3">
  <Loader shape="circle" width={40} />
  <Loader shape="text" lines={2} />
</div>`}
          />
        </section>

        <section>
          <SectionLabel sub="What it's replacing, for comparison.">Loaded state</SectionLabel>
          <div className="flex items-center gap-3">
            <Avatar initials="JD" color="indigo" />
            <div>
              <p className="text-sm font-medium text-slate-900">Jane Doe</p>
              <p className="text-sm text-slate-500">jane@example.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
