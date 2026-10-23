import { useId, useMemo } from "react";
import { cx } from "../../core/tokens";
import { LOGO_VIEWBOX, logoMarkMarkup } from "../../core/logoMark";

const COLORS = ["400", "500", "600", "700"].map((n) => `var(--color-accent-${n})`);

/**
 * The lojeeUI mark: "Beautiful by default. Themeable by design."
 * A "LUI" monogram in one continuous accent-coloured stroke, so every theme recolors the whole mark. The artwork lives in core/logoMark.ts, shared with the tab icon. `size` is the height.
 */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const markup = useMemo(() => logoMarkMarkup(COLORS, `lm${id}`), [id]);
  return <svg width={(size * 68) / 32} height={size} viewBox={LOGO_VIEWBOX} fill="none" role="img" aria-label="lojeeUI" className={cx("shrink-0", className)} dangerouslySetInnerHTML={{ __html: markup }} />;
}

/** The monogram, wrapped for layout. */
export default function Logo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <span className={cx("inline-flex items-center", className)}>
      <LogoMark size={size} />
    </span>
  );
}
