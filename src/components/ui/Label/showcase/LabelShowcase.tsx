import { Label } from "../Label";
import { Input } from "../../Input/Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function LabelShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Label</h1>
          <p className="text-sm text-slate-500 mt-1">A form field label wrapping the native &lt;label&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="Paired with a form control via htmlFor.">Plain</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-email">Email address</Label>
            <Input id="showcase-email" placeholder="you@example.com" />
          </div>
          <CodeBlock
            code={`<Label htmlFor="email">Email address</Label>
<Input id="email" placeholder="you@example.com" />`}
          />
        </section>

        <section>
          <SectionLabel sub="Adds a red asterisk after the label text.">Required</SectionLabel>
          <div className="max-w-sm space-y-1.5">
            <Label htmlFor="showcase-name" required>
              Full name
            </Label>
            <Input id="showcase-name" placeholder="Jane Doe" />
          </div>
          <CodeBlock
            code={`<Label htmlFor="name" required>Full name</Label>
<Input id="name" placeholder="Jane Doe" />`}
          />
        </section>
      </div>
    </div>
  );
}
