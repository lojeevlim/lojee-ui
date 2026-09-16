import { getIcon } from "../../../core/icons";

export interface IconProps {
  /** Icon name, e.g. "settings" — see src/core/icons.ts for the available set. */
  name: string;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 20, className }: IconProps) {
  // getIcon() always returns the same stable, module-level-imported
  // component reference for a given name, so this never actually causes a
  // remount — the lint rule can't verify that statically, hence the disable.
  const LucideIcon = getIcon(name);
  if (!LucideIcon) return null;
  // eslint-disable-next-line react-hooks/static-components -- see comment above `LucideIcon`
  return <LucideIcon size={size} className={className} />;
}
