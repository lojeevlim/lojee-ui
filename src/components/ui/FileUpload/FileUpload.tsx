import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant, type HoverEffect } from "../../../core/motion";
import { Icon } from "../Icons/Icon";

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** e.g. "Click to upload or drag and drop" — has a sensible default if omitted. */
  label?: ReactNode;
  /** Fires when the user picks files (via click or drop), with the selected FileList (or null). */
  onFilesSelected?: (files: FileList | null) => void;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0) — handy for staggering. */
  transitionDelay?: number;
  /** Effect while hovering: "lift" | "scale" | "press" | "tilt" | "ring" | "glow" | "shine" (default: none). */
  hoverEffect?: HoverEffect;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    dropzone?: string;
    icon?: string;
    label?: string;
    fileList?: string;
  };
}

export function FileUpload({
  label = "Click to upload or drag and drop",
  onFilesSelected,
  className,
  classNames,
  onChange,
  transition,
  transitionDuration,
  transitionDelay,
  hoverEffect,
  ...rest
}: FileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  return (
    <label
      className={cx(
        "relative flex min-w-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border-strong bg-surface-muted px-6 py-8 text-center transition-colors hover:border-border-strong hover:bg-surface-muted",
        motionClass(transition, hoverEffect),
        className,
        classNames?.root
      )}
      style={motionStyle(transitionDuration, transitionDelay)}
    >
      <input
        type="file"
        className="sr-only"
        onChange={(e) => {
          setFileNames(e.target.files ? Array.from(e.target.files).map((f) => f.name) : []);
          onFilesSelected?.(e.target.files);
          onChange?.(e);
        }}
        {...rest}
      />
      <div className={cx("flex flex-col items-center justify-center gap-2", classNames?.dropzone)}>
        <Icon name="upload" size={20} className={cx("text-fg-subtle", classNames?.icon)} />
        <span className={cx("text-sm text-fg-subtle", classNames?.label)}>{label}</span>
      </div>
      {fileNames.length > 0 && (
        <div className={cx("mt-1 w-full space-y-1", classNames?.fileList)}>
          {fileNames.map((name, i) => (
            <div key={`${name}-${i}`} className="flex min-w-0 items-center justify-center gap-1.5 text-xs text-fg-muted">
              <Icon name="file" size={12} className="shrink-0" />
              <span className="min-w-0 truncate">{name}</span>
            </div>
          ))}
        </div>
      )}
    </label>
  );
}
