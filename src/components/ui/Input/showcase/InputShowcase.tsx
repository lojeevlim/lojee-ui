import { useState } from "react";
import { Input } from "../Input";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function InputShowcase() {
  const [email, setEmail] = useState("");
  const isInvalidEmail = email.length > 0 && !email.includes("@");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Input</h1>
          <p className="text-sm text-slate-500 mt-1">A text input wrapping the native &lt;input&gt; element.</p>
        </div>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Input size="sm" placeholder="Small" />
            <Input size="md" placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            code={`<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`}
          />
        </section>

        <section>
          <SectionLabel sub="An optional icon on either side.">With icons</SectionLabel>
          <div className="max-w-sm space-y-3">
            <Input leadingIcon="mail" placeholder="Email address" />
            <Input trailingIcon="eye" type="password" placeholder="Password" />
            <Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />
          </div>
          <CodeBlock
            code={`<Input leadingIcon="mail" placeholder="Email address" />
<Input trailingIcon="eye" type="password" placeholder="Password" />
<Input leadingIcon="user" trailingIcon="circle-check" placeholder="Username" />`}
          />
        </section>

        <section>
          <SectionLabel sub="Swaps to a red border/ring, e.g. after failed validation.">Invalid state</SectionLabel>
          <div className="max-w-sm">
            <Input invalid defaultValue="not-an-email" leadingIcon="mail" />
          </div>
          <CodeBlock code={`<Input invalid defaultValue="not-an-email" leadingIcon="mail" />`} />
        </section>

        <section>
          <SectionLabel sub="invalid is a plain boolean — pass any condition, it re-evaluates on every render.">
            Invalid as a live condition
          </SectionLabel>
          <div className="max-w-sm">
            <Input
              size="md"
              invalid={isInvalidEmail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type something…"
            />
            {isInvalidEmail && <p className="mt-1.5 text-xs text-rose-600">Must contain an "@".</p>}
          </div>
          <CodeBlock
            code={`const [email, setEmail] = useState("");
const isInvalidEmail = email.length > 0 && !email.includes("@");

<Input
  size="md"
  invalid={isInvalidEmail}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Type something…"
/>`}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native inputs.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Input disabled placeholder="Disabled" />
          </div>
          <CodeBlock code={`<Input disabled placeholder="Disabled" />`} />
        </section>
      </div>
    </div>
  );
}
