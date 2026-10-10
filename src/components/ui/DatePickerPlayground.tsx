import { useState } from "react";
import { DatePicker, type DatePickerSize, type DatePickerVariant } from "./DatePicker/DatePicker";
import { DateRangePicker } from "./DatePicker/DateRangePicker";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const SIZES: DatePickerSize[] = ["sm", "md", "lg"];
const VARIANTS: DatePickerVariant[] = ["outline", "filled", "underline"];
const LAYOUTS = ["single", "range"] as const;
type Layout = (typeof LAYOUTS)[number];

export default function DatePickerPlayground() {
  const motion = useMotion();
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
            key={motion.replayKey}
            {...motion.props}
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
          <DatePicker key={motion.replayKey} {...motion.props} size={size} variant={variant} invalid={invalid} disabled={disabled} />
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const optionalAttrs = `${variant !== "outline" ? ` variant="${variant}"` : ""}${invalid ? " invalid" : ""}${disabled ? " disabled" : ""}${motion.attrs}`;

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
  }${disabled ? ` disabled` : ""}${motion.attrs}`;

  const htmlMarkup =
    layout === "range"
      ? `<l-date-range-picker size="${size}"${wcOptionalAttrs} startValue="${start}" endValue="${end}" />`
      : `<l-date-picker size="${size}"${wcOptionalAttrs} />`;

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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setInvalid((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (invalid ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Invalid
          </button>
          <button
            type="button"
            onClick={() => setDisabled((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (disabled ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Disabled
          </button>
        </div>
      </div>
      {motion.controls}
    </PlaygroundLayout>
  );
}
