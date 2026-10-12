import { useId, useMemo } from "react";
import { cx } from "../../core/tokens";
import { logoMarkMarkup } from "../../core/logoMark";

const COLORS = ["400", "500", "600", "700"].map((n) => `var(--color-accent-${n})`);

/**
 * The lojeeUI mark: "Beautiful by default. Themeable by design."
 * Four clay petals in a pinwheel, each a step of the accent scale, so every theme recolors the whole mark. The artwork lives in core/logoMark.ts, shared with the tab icon.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const markup = useMemo(() => logoMarkMarkup(COLORS, `lm${id}`), [id]);
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label="lojeeUI" className={cx("shrink-0", className)} dangerouslySetInnerHTML={{ __html: markup }} />;
}

/** Mark plus the "lojeeUI" wordmark. */
export default function Logo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2 font-semibold tracking-tight text-fg", className)}>
      <LogoMark size={size} />
      <span>
        lojee<span className="text-accent-600 dark:text-accent-400">UI</span>
      </span>
    </span>
  );
}
