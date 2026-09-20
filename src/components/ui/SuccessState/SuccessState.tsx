import type { ReactNode } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";
import { StatusLayout } from "../internal/StatusLayout";

export interface SuccessStateProps {
  /** Icon name — see src/core/icons.ts for the available set (default: "circle-check"). */
  icon?: string;
  title?: ReactNode;
  /** The description/body. */
  children?: ReactNode;
  /** e.g. a "Continue" <Button>, rendered below the description. */
  action?: ReactNode;
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    icon?: string;
    title?: string;
    description?: string;
    action?: string;
  };
}

export function SuccessState({
  icon = "circle-check",
  title = "Success!",
  children,
  action,
  className,
  classNames,
}: SuccessStateProps) {
  return (
    <StatusLayout
      icon={
        <div
          className={cx(
            "flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500",
            classNames?.icon
          )}
        >
          <Icon name={icon} size={28} />
        </div>
      }
      title={title}
      description={children}
      action={action}
      className={className}
      classNames={classNames}
    />
  );
}
