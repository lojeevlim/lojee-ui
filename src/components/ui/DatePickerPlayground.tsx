import { useState } from "react";
import { DatePicker, type DatePickerSize, type DatePickerVariant } from "./DatePicker/DatePicker";
import { DateRangePicker } from "./DatePicker/DateRangePicker";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const SIZES: DatePickerSize[] = ["sm", "md", "lg"];
const VARIANTS: DatePickerVariant[] = ["outline", "filled", "underline"];
const LAYOUTS = ["single", "range"] as const;
type Layout = (typeof LAYOUTS)[number];

export default function DatePickerPlayground() {
  const [layout, setLayout] = useState<Layout>("single");
  const [size, setSize] = useState<DatePickerSize>("md");
  const [variant, setVariant] = useState<DatePickerVariant>("outline");
  const [invalid, setInvalid] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [start, setStart] = useState("2026-06-01");
  const [end, setEnd] = useState("2026-06-14");

  const preview =
    layout === "range" ? (
      <DateRangePicker
        size={size}
        variant={variant}
        invalid={invalid}
        disabled={disabled}
        startValue={start}
        endValue={end}
        onStartChange={setStart}
        onEndChange={setEnd}
      />
    ) : (
      <DatePicker size={size} variant={variant} invalid={invalid} disabled={disabled} />
    );

  const optionalAttrs = `${variant !== "outline" ? ` variant="${variant}"` : ""}${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}`;

  const code =
    layout === "range"
      ? `<DateRangePicker\n  size="${size}"${optionalAttrs}\n  startValue={start}\n  endValue={end}\n  onStartChange={setStart}\n  onEndChange={setEnd}\n/>`
      : `<DatePicker size="${size}"${optionalAttrs} />`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Layout" options={LAYOUTS} value={layout} onChange={setLayout} />
      <OptionGroup label="Size" options={SIZES} value={size} onChange={setSize} />
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setInvalid((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (invalid ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Invalid
          </button>
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
            }
          >
            Disabled
          </button>
        </div>
      </div>
    </PlaygroundLayout>
  );
}
