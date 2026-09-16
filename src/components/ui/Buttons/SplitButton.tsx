import type { MouseEventHandler } from "react";
import type { ColorVariant, ColorName, Size } from "../../../core/tokens";
import { Button } from "./Button";

export interface SplitButtonProps {
  /** Icon name, e.g. "check" — see src/core/icons.ts for the available set. */
  icon?: string;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onMenuClick?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name for the chevron trigger; defaults to `${label} options`. */
  menuLabel?: string;
  variant?: ColorVariant;
  color?: ColorName;
  size?: Size;
  disabled?: boolean;
}

export function SplitButton({
  icon,
  label,
  onClick,
  onMenuClick,
  menuLabel,
  variant = "solid",
  color = "slate",
  size = "md",
  disabled = false,
}: SplitButtonProps) {
  return (
    <div className="inline-flex rounded-lg shadow-sm overflow-hidden">
      <Button
        variant={variant}
        color={color}
        size={size}
        shape="square"
        icon={icon}
        label={label}
        disabled={disabled}
        onClick={onClick}
      />
      <div className="w-px self-stretch bg-white/20" />
      <Button
        variant={variant}
        color={color}
        size={size}
        shape="square"
        icon="chevron-down"
        iconOnly
        label={menuLabel ?? `${label} options`}
        disabled={disabled}
        onClick={(e) => {
          // Stop the native click from also bubbling out as a plain "click"
          // (relevant once this is wrapped as a Web Component — two real
          // <button> elements otherwise both fire generic "click").
          e.stopPropagation();
          onMenuClick?.(e);
        }}
      />
    </div>
  );
}
