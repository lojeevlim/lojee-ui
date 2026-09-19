import { Textarea } from "../Textarea";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function TextareaShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Textarea</h1>
          <p className="text-sm text-slate-500 mt-1">A multi-line text input wrapping the native &lt;textarea&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Plain, default resize.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Textarea placeholder="Write something…" />
          </div>
          <CodeBlock code={`<Textarea placeholder="Write something…" />`} />
        </section>

        <section>
          <SectionLabel sub="none, vertical (default), both.">Resize options</SectionLabel>
          <Row>
            <div className="max-w-sm w-full space-y-3">
              <Textarea resize="none" placeholder="resize: none" />
              <Textarea resize="vertical" placeholder="resize: vertical" />
              <Textarea resize="both" placeholder="resize: both" />
            </div>
          </Row>
          <CodeBlock
            code={`<Textarea resize="none" placeholder="resize: none" />
<Textarea resize="vertical" placeholder="resize: vertical" />
<Textarea resize="both" placeholder="resize: both" />`}
          />
        </section>

        <section>
          <SectionLabel sub="Swaps to a red border/ring, e.g. after failed validation.">Invalid state</SectionLabel>
          <div className="max-w-sm">
            <Textarea invalid defaultValue="Too short" />
          </div>
          <CodeBlock code={`<Textarea invalid defaultValue="Too short" />`} />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native textareas.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Textarea disabled placeholder="Disabled" />
          </div>
          <CodeBlock code={`<Textarea disabled placeholder="Disabled" />`} />
        </section>
      </div>
    </div>
  );
}
