import { useState } from "react";
import { RangeSlider } from "../RangeSlider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function RangeSliderShowcase() {
  const [basic, setBasic] = useState<[number, number]>([20, 70]);
  const [colored, setColored] = useState<[number, number]>([30, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 750]);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">RangeSlider</h1>
          <p className="text-sm text-slate-500 mt-1">
            A dual-thumb range built from two overlapping native range inputs sharing one track.
          </p>
        </div>

        <section>
          <SectionLabel sub="Controlled — the consumer owns the [low, high] tuple.">Basic</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider value={basic} onChange={setBasic} />
          </div>
          <CodeBlock
            code={`const [value, setValue] = useState<[number, number]>([20, 70]);

<RangeSlider value={value} onChange={setValue} />`}
          />
        </section>

        <section>
          <SectionLabel sub="Shows the current [low, high] as text below the track.">With value</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider value={colored} onChange={setColored} color="indigo" showValue />
          </div>
          <CodeBlock code={`<RangeSlider value={value} onChange={setValue} color="indigo" showValue />`} />
        </section>

        <section>
          <SectionLabel sub="Custom min/max/step — e.g. a price filter.">Custom range</SectionLabel>
          <div className="max-w-sm">
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              color="emerald"
              showValue
            />
          </div>
          <CodeBlock
            code={`<RangeSlider
  min={0}
  max={1000}
  step={10}
  value={value}
  onChange={setValue}
  color="emerald"
  showValue
/>`}
          />
        </section>
      </div>
    </div>
  );
}
