import { useState } from "react";
import { SearchInput } from "../SearchInput";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function SearchInputShowcase() {
  const [query, setQuery] = useState("lojee-ui");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">SearchInput</h1>
          <p className="text-sm text-slate-500 mt-1">A text input with a leading search icon and a working clear button.</p>
        </div>

        <section>
          <SectionLabel sub="The clear button only appears once there's a value and onClear is provided.">Basic</SectionLabel>
          <div className="max-w-sm">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
              placeholder="Search…"
            />
          </div>
          <CodeBlock
            code={`const [query, setQuery] = useState("");

<SearchInput
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery("")}
  placeholder="Search…"
/>`}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <SearchInput size="sm" placeholder="Small" />
            <SearchInput size="md" placeholder="Medium" />
            <SearchInput size="lg" placeholder="Large" />
          </div>
          <CodeBlock
            code={`<SearchInput size="sm" placeholder="Small" />
<SearchInput size="md" placeholder="Medium" />
<SearchInput size="lg" placeholder="Large" />`}
          />
        </section>

        <section>
          <SectionLabel sub="Same disabled affordance as native inputs.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <SearchInput disabled placeholder="Disabled" />
          </div>
          <CodeBlock code={`<SearchInput disabled placeholder="Disabled" />`} />
        </section>
      </div>
    </div>
  );
}
