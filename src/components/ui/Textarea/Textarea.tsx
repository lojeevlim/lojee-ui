import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../../core/tokens";

export type TextareaResize = "none" | "vertical" | "both";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Applies error styling (rose border and focus ring) to flag invalid input (default: false). */
  invalid?: boolean;
  /** User resize handle: "none", "vertical" or "both" (default: "vertical"). */
  resize?: TextareaResize;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string };
}

const RESIZE_CLASSES: Record<TextareaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
};

const BASE_CLASSES =
  "w-full min-h-[80px] rounded-md border border-border-strong bg-surface px-3 py-2 text-fg placeholder:text-fg-subtle outline-none transition-colors focus:border-fg-subtle focus:ring-2 focus:ring-fg-subtle/20 disabled:cursor-not-allowed disabled:opacity-50";

const INVALID_CLASSES = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20";

export function Textarea({ invalid = false, resize = "vertical", className, classNames, ...rest }: TextareaProps) {
  return (
    <textarea
      className={cx(BASE_CLASSES, RESIZE_CLASSES[resize], invalid && INVALID_CLASSES, className, classNames?.root)}
      {...rest}
    />
  );
}
