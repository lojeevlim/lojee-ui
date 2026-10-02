import { useState } from "react";
import type { KeyboardEvent, MouseEvent } from "react";
import { Star } from "lucide-react";
import { cx } from "../../../core/tokens";
import { useValue } from "../../../core/useValue";

export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps {
  /** The current rating, 0 to `max`. Also settable from outside; the component keeps its own value otherwise. */
  value?: number;
  /** Number of stars (default: 5). */
  max?: number;
  /** Lets a rating be given in half steps, e.g. 3.5 (default: false). */
  allowHalf?: boolean;
  /** Shows the rating without letting it be changed (default: false). */
  readOnly?: boolean;
  /** Star size: "sm" | "md" | "lg" (default: "md"). */
  size?: RatingSize;
  /** Accessible name for the group (default: "Rating"). */
  label?: string;
  /** Called with the new rating when a star is chosen. Choosing the current rating again clears it to 0. */
  onChange?: (value: number) => void;
  /** Extra class name(s) appended to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; star?: string };
}

const SIZE_PX: Record<RatingSize, number> = { sm: 16, md: 22, lg: 30 };

/** A row of stars for showing or giving a rating — hover to preview, click to set, arrow keys to adjust. */
export function Rating({ value, max = 5, allowHalf = false, readOnly = false, size = "md", label = "Rating", onChange, className, classNames }: RatingProps) {
  const [rating, setRating] = useValue<number>(value, 0);
  const [hover, setHover] = useState<number | null>(null);
  const count = Math.max(1, Math.floor(max));
  const shown = hover ?? rating;
  const step = allowHalf ? 0.5 : 1;
  const px = SIZE_PX[size] ?? SIZE_PX.md;

  const commit = (next: number) => {
    const clamped = Math.max(0, Math.min(count, next));
    setRating(clamped);
    onChange?.(clamped);
  };
  // Which value a pointer at this x position means: the left half of a star is a half step when allowHalf is on.
  const valueAt = (i: number, e: MouseEvent<HTMLButtonElement>) => {
    if (!allowHalf) return i + 1;
    const rect = e.currentTarget.getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? i + 0.5 : i + 1;
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      commit(rating + step);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      commit(rating - step);
    } else if (e.key === "Home") commit(0);
    else if (e.key === "End") commit(count);
  };

  return (
    <div
      role={readOnly ? "img" : "slider"}
      aria-label={readOnly ? `${label}: ${rating} out of ${count}` : label}
      aria-valuemin={readOnly ? undefined : 0}
      aria-valuemax={readOnly ? undefined : count}
      aria-valuenow={readOnly ? undefined : rating}
      tabIndex={readOnly ? undefined : 0}
      onKeyDown={onKeyDown}
      onMouseLeave={() => setHover(null)}
      className={cx("inline-flex items-center gap-0.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40", className, classNames?.root)}
    >
      {Array.from({ length: count }, (_, i) => {
        const fill = Math.max(0, Math.min(1, shown - i));
        return (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            disabled={readOnly}
            aria-hidden
            onMouseMove={(e) => !readOnly && setHover(valueAt(i, e))}
            onClick={(e) => {
              const next = valueAt(i, e);
              commit(next === rating ? 0 : next);
            }}
            className={cx("relative shrink-0 transition-transform enabled:hover:scale-110 disabled:cursor-default", classNames?.star)}
            style={{ width: px, height: px }}
          >
            <Star size={px} className="absolute inset-0 text-border-strong" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={px} className="fill-amber-400 text-amber-400" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
