import { TimePicker } from "../TimePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function TimePickerShowcase() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">TimePicker</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled native time input — the browser's own picker UI handles time selection.
          </p>
        </div>

        <section>
          <SectionLabel sub="A native input type=&quot;time&quot; with a leading icon.">Basic</SectionLabel>
          <div className="max-w-sm">
            <TimePicker />
          </div>
          <CodeBlock code={`<TimePicker />`} />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <TimePicker size="sm" />
            <TimePicker size="md" />
            <TimePicker size="lg" />
          </div>
          <CodeBlock code={`<TimePicker size="sm" />`} />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <TimePicker invalid />
          </div>
          <CodeBlock code={`<TimePicker invalid />`} />
        </section>

        <section>
          <SectionLabel sub="Standard native attributes like min/max/disabled pass through.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <TimePicker disabled />
          </div>
          <CodeBlock code={`<TimePicker disabled />`} />
        </section>
      </div>
    </div>
  );
}
