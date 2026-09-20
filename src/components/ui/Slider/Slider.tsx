import { useState, type ChangeEvent, type InputHTMLAttributes } from "react";
import { cx, type ColorName } from "../../../core/tokens";

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  color?: ColorName;
  showValue?: boolean;
  className?: string;
  classNames?: { root?: string; input?: string; value?: string };
}

const THUMB_CLASSES: Record<ColorName, string> = {
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

const BASE_CLASSES =
  "h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer";

export function Slider({
  color = "slate",
  showValue = false,
  className,
  classNames,
  value,
  defaultValue,
  onChange,
  ...rest
}: SliderProps) {
  // `defaultValue` alone is uncontrolled from React's point of view, so
  // reading it for `showValue`'s label would freeze the label at the
  // initial value — the DOM updates on drag, but nothing re-renders. Track
  // the live value ourselves whenever the consumer isn't already
  // controlling it, so the label stays in sync either way.
  const isControlled = value !== undefined;
  const min = rest.min !== undefined ? Number(rest.min) : 0;
  const max = rest.max !== undefined ? Number(rest.max) : 100;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? Math.round((min + max) / 2));
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const input = (
    <input
      type="range"
      value={currentValue}
      onChange={handleChange}
      className={cx(BASE_CLASSES, THUMB_CLASSES[color], showValue ? "flex-1" : "w-full", classNames?.input)}
      {...rest}
    />
  );

  if (!showValue) {
    return <span className={cx("inline-flex w-full items-center", className, classNames?.root)}>{input}</span>;
  }

  return (
    <div className={cx("flex items-center gap-3", className, classNames?.root)}>
      {input}
      <span className={cx("text-sm tabular-nums text-slate-600", classNames?.value)}>{currentValue}</span>
    </div>
  );
}
