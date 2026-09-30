import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

// Same reasoning as Tabs: a r2wc-wrapped Web Component can't inspect or
// clone light-DOM children across the shadow boundary, so "active slide"
// coordination (track offset + dots + arrows) needs a data array plus
// internal `useState` rather than compound slide children.
export interface CarouselProps {
  /** The slides to show, one node per slide, in order; the carousel manages the active slide itself. */
  slides: ReactNode[];
  /** Automatically advances to the next slide (looping) every `intervalMs` (default: false). */
  autoPlay?: boolean;
  /** Milliseconds between automatic slide changes when `autoPlay` is on (default: 4000). */
  intervalMs?: number;
  /** Shows previous/next arrow buttons when there is more than one slide (default: true). */
  showArrows?: boolean;
  /** Shows the clickable dot indicators when there is more than one slide (default: true). */
  showDots?: boolean;
  /** Extra class names applied to the root element. */
  className?: string;
  /** Per-part class overrides (`root`, `track`, `slide`, `arrow`, `dot`, `activeDot`) — merged after the built-in styling. */
  classNames?: {
    root?: string;
    track?: string;
    slide?: string;
    arrow?: string;
    dot?: string;
    activeDot?: string;
  };
}

export function Carousel({
  slides,
  autoPlay = false,
  intervalMs = 4000,
  showArrows = true,
  showDots = true,
  className,
  classNames,
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, slides.length]);

  const goTo = (i: number) => setActiveIndex((i + slides.length) % slides.length);

  return (
    <div className={cx("relative overflow-hidden rounded-xl", className, classNames?.root)}>
      <div
        className={cx("flex transition-transform duration-300 ease-out", classNames?.track)}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className={cx("w-full shrink-0", classNames?.slide)}>
            {slide}
          </div>
        ))}
      </div>
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
            className={cx(
              "absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white",
              classNames?.arrow
            )}
          >
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
            className={cx(
              "absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white",
              classNames?.arrow
            )}
          >
            <Icon name="chevron-right" size={18} />
          </button>
        </>
      )}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className={cx(
                "h-1.5 w-1.5 rounded-full transition-all",
                i === activeIndex ? cx("w-4 bg-white", classNames?.activeDot) : cx("bg-white/60", classNames?.dot)
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
