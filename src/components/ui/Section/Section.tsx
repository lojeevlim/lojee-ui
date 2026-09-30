import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type SectionSpacing = "sm" | "md" | "lg";

export interface SectionProps {
  /** Heading rendered at the top of the section; the header is omitted when neither `title` nor `subtitle` is set. */
  title?: ReactNode;
  /** Smaller muted text rendered under the title. */
  subtitle?: ReactNode;
  /** Vertical padding of the section: "sm", "md" (default) or "lg". */
  spacing?: SectionSpacing;
  /** The section's body content. */
  children?: ReactNode;
  /** Extra CSS class(es) added to the root element, merged before `classNames.root`. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: { root?: string; header?: string; title?: string; subtitle?: string; body?: string };
}

const SPACING_CLASSES: Record<SectionSpacing, string> = {
  sm: "py-6",
  md: "py-10",
  lg: "py-16",
};

export function Section({
  title,
  subtitle,
  spacing = "md",
  children,
  className,
  classNames,
}: SectionProps) {
  const hasHeader = title != null || subtitle != null;

  return (
    <section className={cx(SPACING_CLASSES[spacing], className, classNames?.root)}>
      {hasHeader && (
        <div className={cx("mb-6", classNames?.header)}>
          {title != null && <h2 className={cx("text-xl font-semibold text-fg", classNames?.title)}>{title}</h2>}
          {subtitle != null && <p className={cx("text-sm text-fg-subtle mt-1", classNames?.subtitle)}>{subtitle}</p>}
        </div>
      )}
      <div className={classNames?.body}>
        <slot>{children}</slot>
      </div>
    </section>
  );
}
