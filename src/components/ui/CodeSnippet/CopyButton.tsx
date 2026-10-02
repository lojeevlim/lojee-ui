import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cx } from "../../../core/tokens";

export interface CopyButtonProps {
  /** The text put on the clipboard. */
  text: string;
  /** Button label (default: "Copy"). Hidden when `iconOnly` is on. */
  label?: string;
  /** Label shown for a moment after copying (default: "Copied"). */
  copiedLabel?: string;
  /** Shows just the icon (default: false). */
  iconOnly?: boolean;
  /** How long the "copied" state shows, in ms (default: 1500). */
  resetAfter?: number;
  /** Called after the text was copied. */
  onCopy?: (text: string) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
}

/** A button that copies text to the clipboard and confirms it with a check mark. */
export function CopyButton({ text, label = "Copy", copiedLabel = "Copied", iconOnly = false, resetAfter = 1500, onCopy, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // clipboard unavailable (insecure page, denied permission) — leave the button unchanged
    }
    setCopied(true);
    onCopy?.(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetAfter);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={iconOnly ? (copied ? copiedLabel : label) : undefined}
      className={cx(
        "inline-flex items-center gap-1.5 rounded-md bg-fg/10 text-xs font-medium text-fg transition-colors hover:bg-fg/20",
        iconOnly ? "h-8 w-8 justify-center" : "px-2.5 py-1.5",
        className
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {!iconOnly && (copied ? copiedLabel : label)}
    </button>
  );
}
