import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";

export type SectionSpacing = "sm" | "md" | "lg";

export interface SectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  spacing?: SectionSpacing;
  children?: ReactNode;
  className?: string;
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
          {title != null && <h2 className={cx("text-xl font-semibold text-slate-900", classNames?.title)}>{title}</h2>}
          {subtitle != null && <p className={cx("text-sm text-slate-500 mt-1", classNames?.subtitle)}>{subtitle}</p>}
        </div>
      )}
      <div className={classNames?.body}>
        <slot>{children}</slot>
      </div>
    </section>
  );
}
