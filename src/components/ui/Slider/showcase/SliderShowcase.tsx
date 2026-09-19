import { Slider } from "../Slider";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export default function SliderShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Slider</h1>
          <p className="text-sm text-slate-500 mt-1">A styled native range input for a single value.</p>
        </div>

        <section>
          <SectionLabel sub="A plain native range input.">Basic</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} />
          </div>
          <CodeBlock code={`<Slider defaultValue={40} />`} />
        </section>

        <section>
          <SectionLabel sub="Shows the current numeric value next to the track.">With value</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={65} showValue />
          </div>
          <CodeBlock code={`<Slider defaultValue={65} showValue />`} />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Colors</SectionLabel>
          <div className="max-w-sm space-y-4">
            <Slider defaultValue={30} color="indigo" showValue />
            <Slider defaultValue={55} color="emerald" showValue />
            <Slider defaultValue={80} color="rose" showValue />
          </div>
          <CodeBlock code={`<Slider defaultValue={30} color="indigo" showValue />`} />
        </section>

        <section>
          <SectionLabel sub="min/max/step pass through like any native range input.">Custom range</SectionLabel>
          <Row>
            <div className="max-w-sm w-full">
              <Slider min={0} max={10} step={1} defaultValue={5} showValue />
            </div>
          </Row>
          <CodeBlock code={`<Slider min={0} max={10} step={1} defaultValue={5} showValue />`} />
        </section>

        <section>
          <SectionLabel sub="Standard disabled state.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <Slider defaultValue={40} disabled />
          </div>
          <CodeBlock code={`<Slider defaultValue={40} disabled />`} />
        </section>
      </div>
    </div>
  );
}
