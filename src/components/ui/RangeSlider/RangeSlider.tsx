import { cx, type ColorName } from "../../../core/tokens";

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange?: (value: [number, number]) => void;
  color?: ColorName;
  showValue?: boolean;
  className?: string;
  classNames?: { root?: string; track?: string; range?: string; thumb?: string; value?: string };
}

const RANGE_BG: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

const THUMB_BG: Record<ColorName, string> = {
  slate: "[&::-webkit-slider-thumb]:bg-slate-900 [&::-moz-range-thumb]:bg-slate-900",
  gray: "[&::-webkit-slider-thumb]:bg-gray-600 [&::-moz-range-thumb]:bg-gray-600",
  indigo: "[&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:bg-indigo-600",
  violet: "[&::-webkit-slider-thumb]:bg-violet-600 [&::-moz-range-thumb]:bg-violet-600",
  blue: "[&::-webkit-slider-thumb]:bg-blue-600 [&::-moz-range-thumb]:bg-blue-600",
  cyan: "[&::-webkit-slider-thumb]:bg-cyan-600 [&::-moz-range-thumb]:bg-cyan-600",
  emerald: "[&::-webkit-slider-thumb]:bg-emerald-600 [&::-moz-range-thumb]:bg-emerald-600",
  teal: "[&::-webkit-slider-thumb]:bg-teal-600 [&::-moz-range-thumb]:bg-teal-600",
  amber: "[&::-webkit-slider-thumb]:bg-amber-500 [&::-moz-range-thumb]:bg-amber-500",
  orange: "[&::-webkit-slider-thumb]:bg-orange-600 [&::-moz-range-thumb]:bg-orange-600",
  rose: "[&::-webkit-slider-thumb]:bg-rose-600 [&::-moz-range-thumb]:bg-rose-600",
  pink: "[&::-webkit-slider-thumb]:bg-pink-600 [&::-moz-range-thumb]:bg-pink-600",
};

const INPUT_CLASSES =
  "pointer-events-none absolute h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer";

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  color = "slate",
  showValue = false,
  className,
  classNames,
}: RangeSliderProps) {
  const [low, high] = value;
  const leftPct = ((low - min) / (max - min)) * 100;
  const rightPct = 100 - ((high - min) / (max - min)) * 100;

  return (
    <div className={cx("w-full", className, classNames?.root)}>
      <div className="relative h-4 flex items-center">
        <div className={cx("absolute h-1.5 w-full rounded-full bg-slate-200", classNames?.track)} />
        <div
          className={cx("absolute h-1.5 rounded-full", RANGE_BG[color], classNames?.range)}
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={high}
          step={step}
          value={low}
          onChange={(e) => onChange?.([Number(e.target.value), high])}
          className={cx(INPUT_CLASSES, THUMB_BG[color], classNames?.thumb)}
        />
        <input
          type="range"
          min={low}
          max={max}
          step={step}
          value={high}
          onChange={(e) => onChange?.([low, Number(e.target.value)])}
          className={cx(INPUT_CLASSES, THUMB_BG[color], classNames?.thumb)}
        />
      </div>
      {showValue && (
        <div className={cx("mt-2 text-sm tabular-nums text-slate-600", classNames?.value)}>
          {low} – {high}
        </div>
      )}
    </div>
  );
}
