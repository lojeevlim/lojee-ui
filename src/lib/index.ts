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

export { ANIMATED_VARIANTS, parseAnimated, type AnimatedVariant, type AnimatedProp } from "../core/animated";
export { Button, type ButtonProps, type GradientDirection } from "../components/ui/Buttons/Button";
export { SplitButton, type SplitButtonProps } from "../components/ui/Buttons/SplitButton";
export {
  SplitButtonMenuItem,
  type SplitButtonMenuItemProps,
} from "../components/ui/Buttons/SplitButtonMenuItem";
export { ButtonGroup, type ButtonGroupProps, type ButtonGroupItemClick } from "../components/ui/Buttons/ButtonGroup";
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
export { Divider, type DividerProps, type DividerOrientation } from "../components/ui/Divider/Divider";
export { DotScroll, type DotScrollProps, type DotScrollAxis } from "../components/ui/DotScroll/DotScroll";
export { PageScrollbar } from "../components/ui/DotScroll/PageScrollbar";
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
  type TableAction,
  type TableVariant,
  type TableResponsive,
  type TableView,
  type TableActionsVariant,
  type TableCellType,
  type TableSort,
  type TableRowKey,
  type TableUserCell,
  type TablePaymentCell,
  type TableBadgeCell,
  type TableProgressCell,
  type TableStatusCell,
  type TableRatingCell,
  type TableImageCell,
  type TableLinkCell,
  type TableAvatarsCell,
  type TableCurrencyCell,
  type TableDateCell,
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

export { Alert, type AlertProps, type AlertVariant } from "../components/ui/Alert/Alert";
export {
  Toast,
  type ToastProps,
  type ToastVariant,
  type ToastPosition,
} from "../components/ui/Toast/Toast";
export { Notification, type NotificationProps } from "../components/ui/Notification/Notification";
export {
  ProgressBar,
  type ProgressBarProps,
  type ProgressBarSize,
} from "../components/ui/ProgressBar/ProgressBar";
export { EmptyState, type EmptyStateProps } from "../components/ui/EmptyState/EmptyState";
export { ErrorState, type ErrorStateProps } from "../components/ui/ErrorState/ErrorState";
export { SuccessState, type SuccessStateProps } from "../components/ui/SuccessState/SuccessState";
export {
  LoadingState,
  type LoadingStateProps,
  type LoadingStateSize,
} from "../components/ui/LoadingState/LoadingState";

export { Navbar, type NavbarProps, type NavbarVariant, type NavbarItemSpec } from "../components/ui/Navbar/Navbar";
export { NavbarItem, type NavbarItemProps } from "../components/ui/Navbar/NavbarItem";
export {
  Sidebar,
  type SidebarProps,
  type SidebarVariant,
  SidebarHeader,
  type SidebarHeaderProps,
  SidebarFooter,
  type SidebarFooterProps,
} from "../components/ui/Sidebar/Sidebar";
export { SidebarMenuItem, type SidebarMenuItemProps } from "../components/ui/Sidebar/SidebarMenuItem";
export { Header, type HeaderProps, type HeaderVariant } from "../components/ui/Header/Header";
export { Footer, type FooterProps } from "../components/ui/Footer/Footer";
export {
  NavigationMenu,
  type NavigationMenuProps,
  type NavigationMenuItem,
} from "../components/ui/NavigationMenu/NavigationMenu";
export {
  BottomNavigation,
  type BottomNavigationProps,
  type BottomNavigationItem,
} from "../components/ui/BottomNavigation/BottomNavigation";
export {
  Stepper,
  type StepperProps,
  type StepperStep,
  type StepperHandle,
  type StepperContent,
  type StepperStepContext,
} from "../components/ui/Stepper/Stepper";
export { StepperItem, type StepperItemProps } from "../components/ui/Stepper/StepperItem";
export { useStepper } from "../components/ui/Stepper/stepperContext";

export {
  Timeline,
  type TimelineProps,
  type TimelineItem,
  type TimelineOrientation,
} from "../components/ui/Timeline/Timeline";
export { Stat, type StatProps, type StatTrend } from "../components/ui/Stat/Stat";
export { Chart, type ChartProps, type ChartType, type ChartVariant, type ChartDataPoint } from "../components/ui/Chart/Chart";
export { Calendar, type CalendarProps, type CalendarEvent, type CalendarRange, type CalendarSelectionMode } from "../components/ui/Calendar/Calendar";
export {
  ActivityFeed,
  type ActivityFeedProps,
  type ActivityItem,
} from "../components/ui/ActivityFeed/ActivityFeed";
export {
  GridView,
  type GridViewProps,
  type GridViewItem,
  type GridViewValue,
  type GridViewTag,
  type GridViewAction,
  type GridViewSortOption,
  type GridViewMode,
  type GridViewVariant,
} from "../components/ui/GridView/GridView";
export {
  DetailsList,
  type DetailsListProps,
  type DetailsListItem,
  type DetailsListField,
} from "../components/ui/DetailsList/DetailsList";

export {
  ProfileCard,
  type ProfileCardProps,
  type ProfileCardStat,
} from "../components/ui/ProfileCard/ProfileCard";
export {
  PlanBilling,
  type PlanBillingProps,
  type PlanStatus,
  type PlanUsage,
  type PlanPaymentMethod,
} from "../components/ui/PlanBilling/PlanBilling";
export { Iframe, type IframeProps, type IframeRatio } from "../components/ui/Iframe/Iframe";
export { ChatBox, type ChatBoxProps, type ChatMessage, type ChatRole, type ChatBoxVariant } from "../components/ui/ChatBox/ChatBox";
export { Thinking, type ThinkingProps, type ThinkingVariant, type ThinkingSize } from "../components/ui/Thinking/Thinking";
export { UserMenu, type UserMenuProps, type UserMenuItem } from "../components/ui/UserMenu/UserMenu";
export {
  PasswordInput,
  type PasswordInputProps,
  type PasswordInputSize,
} from "../components/ui/PasswordInput/PasswordInput";
export { LoginForm, type LoginFormProps, type LoginFormValues } from "../components/ui/LoginForm/LoginForm";
export { SignupForm, type SignupFormProps, type SignupFormValues } from "../components/ui/SignupForm/SignupForm";
export {
  ProfileSettings,
  type ProfileSettingsProps,
  type ProfileSettingsValues,
} from "../components/ui/ProfileSettings/ProfileSettings";
export {
  AccountSettings,
  type AccountSettingsProps,
  type NotificationPreference,
} from "../components/ui/AccountSettings/AccountSettings";

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

export {
  TopBar,
  type TopBarProps,
  type TopBarAction,
  type TopBarVariant,
  type TopBarSize,
} from "../components/ui/TopBar/TopBar";

export {
  FlowDiagram,
  type FlowDiagramProps,
  type FlowVariant,
  type FlowNode,
  type FlowEdge,
  type FlowShape,
  type FlowTone,
  type FlowDirection,
  type FlowCurve,
} from "../components/ui/FlowDiagram/FlowDiagram";

export { Map, type MapProps } from "../components/ui/Map/Map";
export { MapControls, type MapControlsProps } from "../components/ui/Map/MapControls";
export { MapMarker, type MapMarkerProps } from "../components/ui/MapMarker/MapMarker";
export { MapRoute, type MapRouteProps } from "../components/ui/MapRoute/MapRoute";
export { useMap, type MapContextValue } from "../components/ui/Map/mapContext";
export { fetchRoutes, type RouteResult } from "../components/ui/Map/routing";
export type {
  LngLat,
  MapMarkerData,
  MapRouteData,
  MapRouteSummary,
  RouteAnimation,
  MapViewState,
  MapControlName,
} from "../components/ui/Map/mapTypes";
export type { MapStyleName } from "../components/ui/Map/mapUtils";

// App Layout — themeable grid shell. Section components are aliased with an App prefix.
export {
  App,
  Top as AppTop,
  Side as AppSide,
  Main as AppMain,
  Foot as AppFoot,
  SideToggle as AppSideToggle,
  type AppProps,
  type MainProps as AppMainProps,
} from "../components/ui/AppLayout/App";
export { useAppLayout } from "../components/ui/AppLayout/appLayoutContext";
export type { AppBreakpoint } from "../components/ui/AppLayout/breakpoints";
export { APP_SECTIONS, APP_THEME_OPTIONS, DEFAULT_LAYOUT, gridTemplateAreas, isValidLayout } from "../components/ui/AppLayout/appLayout";
export type { AppSection, AppTheme, GridLayout } from "../components/ui/AppLayout/appLayout";

// Theming — light/dark mode + brand accent. Pair with `@import "lojee-ui/theme.css"`.
export { ThemeProvider, type ThemeProviderProps } from "../components/ui/Theme/ThemeProvider";
export { ThemeSwitcher, type ThemeSwitcherProps } from "../components/ui/ThemeSwitcher/ThemeSwitcher";
export { useTheme, applyTheme, THEME_MODES, DEFAULT_ACCENT } from "../core/theme";
export type { ThemeMode, ResolvedTheme, AccentName, ThemeContextValue } from "../core/theme";

// Media
export { Image, type ImageProps, type ImageFit, type ImageRadius, type ImageRatio } from "../components/ui/Image/Image";
export { Video, type VideoProps, type VideoSource, type VideoFit, type VideoRadius, type VideoRatio } from "../components/ui/Video/Video";
export { embedUrl } from "../components/ui/Video/embedUrl";

// Loading, inputs and code
export { Skeleton, type SkeletonProps, type SkeletonVariant, type SkeletonAnimation } from "../components/ui/Skeleton/Skeleton";
export { TagInput, type TagInputProps } from "../components/ui/TagInput/TagInput";
export { NumberInput, type NumberInputProps, type NumberInputSize } from "../components/ui/NumberInput/NumberInput";
export { OtpInput, type OtpInputProps, type OtpInputSize, type OtpInputType } from "../components/ui/OtpInput/OtpInput";
export { Rating, type RatingProps, type RatingSize } from "../components/ui/Rating/Rating";
export { ColorPicker, type ColorPickerProps } from "../components/ui/ColorPicker/ColorPicker";
export { CodeSnippet, type CodeSnippetProps } from "../components/ui/CodeSnippet/CodeSnippet";
export { CopyButton, type CopyButtonProps } from "../components/ui/CodeSnippet/CopyButton";
