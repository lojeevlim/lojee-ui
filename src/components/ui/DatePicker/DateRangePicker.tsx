import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import type { DatePickerSize, DatePickerVariant } from "./DatePicker";

export interface DateRangePreset {
  label: string;
  /** [start, end] as yyyy-mm-dd strings. */
  range: [string, string];
}

export interface DateRangePickerProps {
  /** yyyy-mm-dd, controlled. */
  startValue?: string;
  /** yyyy-mm-dd, controlled. */
  endValue?: string;
  onStartChange?: (value: string) => void;
  onEndChange?: (value: string) => void;
  min?: string;
  max?: string;
  size?: DatePickerSize;
  variant?: DatePickerVariant;
  invalid?: boolean;
  disabled?: boolean;
  /** Quick-select buttons rendered below the inputs (e.g. "Last 7 days"). */
  presets?: DateRangePreset[];
  className?: string;
  classNames?: {
    root?: string;
    input?: string;
    icon?: string;
    separator?: string;
    presets?: string;
    preset?: string;
  };
}

const SIZE_CLASSES: Record<DatePickerSize, string> = {
  sm: "h-8 text-sm",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
};

const ICON_PX: Record<DatePickerSize, number> = { sm: 14, md: 16, lg: 18 };

const VARIANT_CLASSES: Record<DatePickerVariant, string> = {
  outline:
    "rounded-md border border-slate-300 bg-white focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-500/20",
  filled:
    "rounded-md border border-transparent bg-slate-100 focus-within:border-slate-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-500/20",
  underline: "rounded-none border-b-2 border-slate-300 bg-transparent focus-within:border-slate-900",
};

const INVALID_CLASSES = "border-rose-400 focus-within:border-rose-500 focus-within:ring-rose-500/20";

// Two plain native <input type="date">s sharing one visual container, each
// constraining the other's range via min/max — still no custom calendar UI,
// consistent with DatePicker/TimePicker.
export function DateRangePicker({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  min,
  max,
  size = "md",
  variant = "outline",
  invalid = false,
  disabled = false,
  presets,
  className,
  classNames,
}: DateRangePickerProps) {
  return (
    <div className="w-full">
      <div
        className={cx(
          "group inline-flex w-full items-center gap-2 px-3 text-slate-900 outline-none transition-colors",
          SIZE_CLASSES[size],
          VARIANT_CLASSES[variant],
          invalid && INVALID_CLASSES,
          disabled && "cursor-not-allowed opacity-50",
          className,
          classNames?.root
        )}
      >
        <Icon
          name="calendar"
          size={ICON_PX[size]}
          className={cx("shrink-0 text-slate-400 transition-colors group-focus-within:text-slate-600", classNames?.icon)}
        />
        <input
          type="date"
          value={startValue}
          max={endValue || max}
          disabled={disabled}
          onChange={(e) => onStartChange?.(e.target.value)}
          className={cx("w-full min-w-0 bg-transparent outline-none disabled:cursor-not-allowed", classNames?.input)}
        />
        <Icon name="arrow-right" size={ICON_PX[size] - 2} className={cx("shrink-0 text-slate-300", classNames?.separator)} />
        <input
          type="date"
          value={endValue}
          min={startValue || min}
          disabled={disabled}
          onChange={(e) => onEndChange?.(e.target.value)}
          className={cx("w-full min-w-0 bg-transparent outline-none disabled:cursor-not-allowed", classNames?.input)}
        />
      </div>

      {presets && presets.length > 0 && (
        <div className={cx("mt-2 flex flex-wrap gap-1.5", classNames?.presets)}>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              disabled={disabled}
              onClick={() => {
                onStartChange?.(preset.range[0]);
                onEndChange?.(preset.range[1]);
              }}
              className={cx(
                "rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 disabled:pointer-events-none disabled:opacity-40",
                classNames?.preset
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
