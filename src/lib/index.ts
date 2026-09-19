// Public API entry point for the published `lojee-ui` package. Imports
// component source files directly (not each folder's `index.ts` barrel),
// since those barrels also re-export the demo-only `*Showcase` components —
// pulling those in here would drag demo/docs code into the shipped bundle.
//
// Deliberately no CSS import here — this file is also tsc's declaration
// entry (tsconfig.lib.json), and a side-effect `import "../index.css"`
// would get copied verbatim into the emitted .d.ts, pointing consumers'
// type-checkers at a dist/index.css that doesn't exist. The Vite build
// entry (entry.ts, next to this file) adds that import instead.

export { Button, type ButtonProps } from "../components/ui/Buttons/Button";
export { SplitButton, type SplitButtonProps } from "../components/ui/Buttons/SplitButton";
export {
  SplitButtonMenuItem,
  type SplitButtonMenuItemProps,
} from "../components/ui/Buttons/SplitButtonMenuItem";
export { ButtonGroup, type ButtonGroupProps } from "../components/ui/Buttons/ButtonGroup";
export { SegmentButton, type SegmentButtonProps } from "../components/ui/Buttons/SegmentButton";
export { default as Modal, type ModalProps } from "../components/ui/Modal";
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from "../components/ui/Badge/Badge";
export {
  Avatar,
  type AvatarProps,
  type AvatarSize,
  type AvatarShape,
  type AvatarStatus,
} from "../components/ui/Avatar/Avatar";
export { AvatarGroup, type AvatarGroupProps } from "../components/ui/Avatar/AvatarGroup";
export { Icon, type IconProps } from "../components/ui/Icons/Icon";
export { getIcon, ICONS, ICON_NAMES } from "../components/ui/Icons/registry";
export { Spinner, type SpinnerProps, type SpinnerSize, type SpinnerVariant } from "../components/ui/Spinner/Spinner";
export { Loader, type LoaderProps, type LoaderShape } from "../components/ui/Loader/Loader";
export { Divider, type DividerProps, type DividerOrientation } from "../components/ui/Divider/Divider";
export { Tooltip, type TooltipProps, type TooltipPosition } from "../components/ui/Tooltip/Tooltip";

export {
  COLORS,
  colorClasses,
  defaultGradientPartner,
  GRADIENT_CLASSES,
  sizeClasses,
  shapeClasses,
  BASE_BUTTON_CLASSES,
} from "../core/tokens";
export type { ColorName, ColorVariant, ButtonVariant, Size, Shape } from "../core/tokens";
