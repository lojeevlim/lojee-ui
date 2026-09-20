import { useState } from "react";
import { DatePicker, type DatePickerSize, type DatePickerVariant } from "./DatePicker/DatePicker";
import { DateRangePicker } from "./DatePicker/DateRangePicker";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

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

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {layout === "range" ? (
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
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const optionalAttrs = `${variant !== "outline" ? ` variant="${variant}"` : ""}${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}`;

  const code =
    layout === "range"
      ? `<DateRangePicker\n  size="${size}"${optionalAttrs}\n  startValue={start}\n  endValue={end}\n  onStartChange={setStart}\n  onEndChange={setEnd}\n/>`
      : `<DatePicker size="${size}"${optionalAttrs} />`;

  // No json props on <DatePicker>/<DateRangePicker> for what's demoed
  // here (presets aren't wired up in this playground) — everything is a
  // plain attribute. Boolean props need an explicit "true" value since r2wc
  // parses a bare attribute (empty string) as false.
  const wcOptionalAttrs = `${variant !== "outline" ? ` variant="${variant}"` : ""}${
    invalid ? ` invalid` : ""
  }${disabled ? ` disabled` : ""}`;

  const htmlMarkup =
    layout === "range"
      ? `<DateRangePicker size="${size}"${wcOptionalAttrs} startValue="${start}" endValue="${end}" />`
      : `<DatePicker size="${size}"${wcOptionalAttrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
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
