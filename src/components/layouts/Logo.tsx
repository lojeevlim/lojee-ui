import { cx } from "../../core/tokens";

/** The lojeeUI mark: a stacked "L" with a dot (the "j" of lojee) on the theme accent color. */
export function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" role="img" aria-label="lojeeUI" className={cx("shrink-0", className)}>
      <rect width="32" height="32" rx="9" fill="var(--color-accent-600)" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" stroke="white" strokeOpacity="0.18" />
      {/* the L */}
      <path d="M10 7.5a1.5 1.5 0 0 1 3 0V19h8.5a1.5 1.5 0 0 1 0 3H11.5A1.5 1.5 0 0 1 10 20.5v-13Z" fill="white" />
      {/* the dot */}
      <circle cx="21" cy="10.5" r="2.5" fill="white" fillOpacity="0.85" />
    </svg>
  );
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
