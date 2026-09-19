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
export { Loader, type LoaderProps, type LoaderShape, type LoaderVariant } from "../components/ui/Loader/Loader";
export { Divider, type DividerProps, type DividerOrientation } from "../components/ui/Divider/Divider";
export { Tooltip, type TooltipProps, type TooltipPosition } from "../components/ui/Tooltip/Tooltip";

export { Card, type CardProps, type CardVariant, type CardPadding } from "../components/ui/Card/Card";
export { Container, type ContainerProps, type ContainerSize } from "../components/ui/Container/Container";
export { Section, type SectionProps, type SectionSpacing } from "../components/ui/Section/Section";
export { Grid, type GridProps, type GridCols, type GridGap } from "../components/ui/Grid/Grid";
export { List, type ListProps, type ListVariant } from "../components/ui/List/List";
export { ListItem, type ListItemProps } from "../components/ui/List/ListItem";
export { Breadcrumbs, type BreadcrumbsProps } from "../components/ui/Breadcrumbs/Breadcrumbs";
export {
  BreadcrumbItem,
  type BreadcrumbItemProps,
} from "../components/ui/Breadcrumbs/BreadcrumbItem";
export { Accordion, type AccordionProps } from "../components/ui/Accordion/Accordion";
export {
  AccordionItem,
  type AccordionItemProps,
} from "../components/ui/Accordion/AccordionItem";
export {
  Table,
  type TableProps,
  type TableColumn,
  type TableSize,
} from "../components/ui/Table/Table";
export { Pagination, type PaginationProps } from "../components/ui/Pagination/Pagination";
export { Tabs, type TabsProps, type TabItem } from "../components/ui/Tabs/Tabs";
export { Carousel, type CarouselProps } from "../components/ui/Carousel/Carousel";

export { Input, type InputProps, type InputSize } from "../components/ui/Input/Input";
export {
  Textarea,
  type TextareaProps,
  type TextareaResize,
} from "../components/ui/Textarea/Textarea";
export { Label, type LabelProps } from "../components/ui/Label/Label";
export {
  SearchInput,
  type SearchInputProps,
  type SearchInputSize,
} from "../components/ui/SearchInput/SearchInput";
export { Checkbox, type CheckboxProps } from "../components/ui/Checkbox/Checkbox";
export { Radio, type RadioProps } from "../components/ui/Radio/Radio";
export {
  RadioGroup,
  type RadioGroupProps,
  type RadioGroupOrientation,
} from "../components/ui/Radio/RadioGroup";
export { Switch, type SwitchProps, type SwitchSize } from "../components/ui/Switch/Switch";
export {
  Select,
  type SelectProps,
  type SelectOption,
  type SelectSize,
} from "../components/ui/Select/Select";
export {
  MultiSelect,
  type MultiSelectProps,
  type MultiSelectOption,
} from "../components/ui/MultiSelect/MultiSelect";
export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
} from "../components/ui/Combobox/Combobox";
export {
  DatePicker,
  type DatePickerProps,
  type DatePickerSize,
  type DatePickerVariant,
} from "../components/ui/DatePicker/DatePicker";
export {
  DateRangePicker,
  type DateRangePickerProps,
  type DateRangePreset,
} from "../components/ui/DatePicker/DateRangePicker";
export {
  TimePicker,
  type TimePickerProps,
  type TimePickerSize,
} from "../components/ui/TimePicker/TimePicker";
export { FileUpload, type FileUploadProps } from "../components/ui/FileUpload/FileUpload";
export { Slider, type SliderProps } from "../components/ui/Slider/Slider";
export { RangeSlider, type RangeSliderProps } from "../components/ui/RangeSlider/RangeSlider";

export {
  AlertDialog,
  type AlertDialogProps,
  type AlertDialogVariant,
} from "../components/ui/AlertDialog/AlertDialog";
export { Drawer, type DrawerProps, type DrawerPosition } from "../components/ui/Drawer/Drawer";
export { Sheet, type SheetProps } from "../components/ui/Sheet/Sheet";
export { Popover, type PopoverProps, type PopoverPosition } from "../components/ui/Popover/Popover";
export {
  DropdownMenu,
  type DropdownMenuProps,
  type DropdownMenuAlign,
} from "../components/ui/DropdownMenu/DropdownMenu";
export {
  DropdownMenuItem,
  type DropdownMenuItemProps,
} from "../components/ui/DropdownMenu/DropdownMenuItem";
export { ContextMenu, type ContextMenuProps } from "../components/ui/ContextMenu/ContextMenu";
export {
  CommandMenu,
  type CommandMenuProps,
  type CommandMenuItem,
} from "../components/ui/CommandMenu/CommandMenu";

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
