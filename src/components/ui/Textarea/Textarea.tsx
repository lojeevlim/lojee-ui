import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";

export type TextareaResize = "none" | "vertical" | "both";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  resize?: TextareaResize;
  className?: string;
  classNames?: { root?: string };
}

const RESIZE_CLASSES: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

const BASE_CLASSES =
  "w-full min-h-[80px] rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-slate-500 focus:ring-2 focus:ring-slate-500/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Textarea({ invalid = false, resize = "vertical", className, classNames, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cx(BASE_CLASSES, RESIZE_CLASSES[resize], invalid && INVALID_CLASSES, className, classNames?.root)}
      {...rest}
    />
  );
}
