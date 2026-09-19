import { useState } from "react";
import { DatePicker } from "../DatePicker";
import { DateRangePicker } from "../DateRangePicker";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function DatePickerShowcase() {
  const [clearableValue, setClearableValue] = useState("2026-06-15");
  const [rangeStart, setRangeStart] = useState("2026-06-01");
  const [rangeEnd, setRangeEnd] = useState("2026-06-14");
  const [presetStart, setPresetStart] = useState("");
  const [presetEnd, setPresetEnd] = useState("");

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">DatePicker</h1>
          <p className="text-sm text-slate-500 mt-1">
            A styled native date input — the browser's own picker UI handles date selection. Plus a{" "}
            <code className="text-xs">DateRangePicker</code> for start/end ranges.
          </p>
        </div>

        <section>
          <SectionLabel sub="A native input type=&quot;date&quot; with a leading icon.">Basic</SectionLabel>
          <div className="max-w-sm">
            <DatePicker />
          </div>
          <CodeBlock code={`<DatePicker />`} />
        </section>

        <section>
          <SectionLabel sub="outline (default), filled, underline.">Variants</SectionLabel>
          <div className="max-w-sm space-y-3">
            <DatePicker variant="outline" />
            <DatePicker variant="filled" />
            <DatePicker variant="underline" />
          </div>
          <CodeBlock
            code={`<DatePicker variant="outline" />
<DatePicker variant="filled" />
<DatePicker variant="underline" />`}
          />
        </section>

        <section>
          <SectionLabel sub="sm, md, lg.">Sizes</SectionLabel>
          <div className="max-w-sm space-y-3">
            <DatePicker size="sm" />
            <DatePicker size="md" />
            <DatePicker size="lg" />
          </div>
          <CodeBlock code={`<DatePicker size="sm" />`} />
        </section>

        <section>
          <SectionLabel sub="Shown when value is set and onClear is provided.">With clear button</SectionLabel>
          <div className="max-w-sm">
            <DatePicker value={clearableValue} onChange={(e) => setClearableValue(e.target.value)} onClear={() => setClearableValue("")} />
          </div>
          <CodeBlock
            code={`const [value, setValue] = useState("2026-06-15");

<DatePicker value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue("")} />`}
          />
        </section>

        <section>
          <SectionLabel sub="Red border for error states.">Invalid</SectionLabel>
          <div className="max-w-sm">
            <DatePicker invalid />
          </div>
          <CodeBlock code={`<DatePicker invalid />`} />
        </section>

        <section>
          <SectionLabel sub="Standard native attributes like min/max/disabled pass through.">Disabled</SectionLabel>
          <div className="max-w-sm">
            <DatePicker disabled />
          </div>
          <CodeBlock code={`<DatePicker disabled />`} />
        </section>

        <section>
          <SectionLabel sub="Two native date inputs sharing one field — each constrains the other's range.">
            Range
          </SectionLabel>
          <div className="max-w-md">
            <DateRangePicker
              startValue={rangeStart}
              endValue={rangeEnd}
              onStartChange={setRangeStart}
              onEndChange={setRangeEnd}
            />
          </div>
          <CodeBlock
            code={`const [start, setStart] = useState("2026-06-01");
const [end, setEnd] = useState("2026-06-14");

<DateRangePicker startValue={start} endValue={end} onStartChange={setStart} onEndChange={setEnd} />`}
          />
        </section>

        <section>
          <SectionLabel sub="Quick-select buttons below the inputs.">Range with presets</SectionLabel>
          <div className="max-w-md">
            <DateRangePicker
              startValue={presetStart}
              endValue={presetEnd}
              onStartChange={setPresetStart}
              onEndChange={setPresetEnd}
              variant="filled"
              presets={[
                { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
                { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
                { label: "This month", range: ["2026-06-01", "2026-06-30"] },
              ]}
            />
          </div>
          <CodeBlock
            code={`<DateRangePicker
  startValue={start}
  endValue={end}
  onStartChange={setStart}
  onEndChange={setEnd}
  variant="filled"
  presets={[
    { label: "Last 7 days", range: ["2026-06-08", "2026-06-14"] },
    { label: "Last 30 days", range: ["2026-05-15", "2026-06-14"] },
    { label: "This month", range: ["2026-06-01", "2026-06-30"] },
  ]}
/>`}
          />
        </section>
      </div>
    </div>
  );
}
