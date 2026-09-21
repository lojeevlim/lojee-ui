import r2wc from "@r2wc/react-to-web-component";
import { Button, SplitButton, SplitButtonMenuItem, ButtonGroup, SegmentButton } from "../components/ui/Buttons";
import {
  ModalElement,
  AlertDialogElement,
  DrawerElement,
  SheetElement,
  AlertElement,
  ToastElement,
  EmptyStateElement,
  ErrorStateElement,
  SuccessStateElement,
  LoadingStateElement,
  HeaderElement,
} from "./modal-adapter";
import { withTailwind, withHostBlock } from "./with-tailwind";
import { Badge } from "../components/ui/Badge/Badge";
import { Avatar } from "../components/ui/Avatar/Avatar";
import { AvatarGroup } from "../components/ui/Avatar/AvatarGroup";
import { Icon } from "../components/ui/Icons/Icon";
import { Spinner } from "../components/ui/Spinner/Spinner";
import { Loader } from "../components/ui/Loader/Loader";
import { Divider } from "../components/ui/Divider/Divider";
import { Tooltip } from "../components/ui/Tooltip/Tooltip";
import { Card } from "../components/ui/Card/Card";
import { Container } from "../components/ui/Container/Container";
import { Section } from "../components/ui/Section/Section";
import { Grid } from "../components/ui/Grid/Grid";
import { List } from "../components/ui/List/List";
import { ListItem } from "../components/ui/List/ListItem";
import { Breadcrumbs } from "../components/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbItem } from "../components/ui/Breadcrumbs/BreadcrumbItem";
import { Accordion } from "../components/ui/Accordion/Accordion";
import { AccordionItem } from "../components/ui/Accordion/AccordionItem";
import { Table } from "../components/ui/Table/Table";
import { Pagination } from "../components/ui/Pagination/Pagination";
import { Tabs } from "../components/ui/Tabs/Tabs";
import { Carousel } from "../components/ui/Carousel/Carousel";
import { Input } from "../components/ui/Input/Input";
import { Textarea } from "../components/ui/Textarea/Textarea";
import { Label } from "../components/ui/Label/Label";
import { SearchInput } from "../components/ui/SearchInput/SearchInput";
import { Checkbox } from "../components/ui/Checkbox/Checkbox";
import { Radio } from "../components/ui/Radio/Radio";
import { RadioGroup } from "../components/ui/Radio/RadioGroup";
import { Switch } from "../components/ui/Switch/Switch";
import { Select } from "../components/ui/Select/Select";
import { MultiSelect } from "../components/ui/MultiSelect/MultiSelect";
import { Combobox } from "../components/ui/Combobox/Combobox";
import { DatePicker } from "../components/ui/DatePicker/DatePicker";
import { DateRangePicker } from "../components/ui/DatePicker/DateRangePicker";
import { TimePicker } from "../components/ui/TimePicker/TimePicker";
import { FileUpload } from "../components/ui/FileUpload/FileUpload";
import { Slider } from "../components/ui/Slider/Slider";
import { RangeSlider } from "../components/ui/RangeSlider/RangeSlider";
import { Popover } from "../components/ui/Popover/Popover";
import { DropdownMenu } from "../components/ui/DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "../components/ui/DropdownMenu/DropdownMenuItem";
import { ContextMenu } from "../components/ui/ContextMenu/ContextMenu";
import { CommandMenu } from "../components/ui/CommandMenu/CommandMenu";
import { Notification } from "../components/ui/Notification/Notification";
import { ProgressBar } from "../components/ui/ProgressBar/ProgressBar";
import { Navbar } from "../components/ui/Navbar/Navbar";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import { SidebarMenuItem } from "../components/ui/Sidebar/SidebarMenuItem";
import { Footer } from "../components/ui/Footer/Footer";
import { NavigationMenu } from "../components/ui/NavigationMenu/NavigationMenu";
import { BottomNavigation } from "../components/ui/BottomNavigation/BottomNavigation";
import { Stepper } from "../components/ui/Stepper/Stepper";
import { DataGrid } from "../components/ui/DataGrid/DataGrid";
import { Timeline } from "../components/ui/Timeline/Timeline";
import { Stat } from "../components/ui/Stat/Stat";
import { Chart } from "../components/ui/Chart/Chart";
import { Calendar } from "../components/ui/Calendar/Calendar";
import { ActivityFeed } from "../components/ui/ActivityFeed/ActivityFeed";
import { ProfileCard } from "../components/ui/ProfileCard/ProfileCard";
import { UserMenu } from "../components/ui/UserMenu/UserMenu";
import { PasswordInput } from "../components/ui/PasswordInput/PasswordInput";
import { LoginForm } from "../components/ui/LoginForm/LoginForm";
import { SignupForm } from "../components/ui/SignupForm/SignupForm";
import { ProfileSettings } from "../components/ui/ProfileSettings/ProfileSettings";
import { AccountSettings } from "../components/ui/AccountSettings/AccountSettings";

// Each element is a real <button>/<div> tree, so a native click already
// bubbles across the shadow boundary — no "events" entry needed for plain
// clicks. Only callbacks with no native DOM equivalent (SplitButton's menu
// trigger, Modal's close request) go through r2wc's `events` bridge.

customElements.define(
  "l-button",
  r2wc(withTailwind(Button), {
    shadow: "open",
    props: {
      variant: "string",
      color: "string",
      gradientTo: "string",
      size: "string",
      shape: "string",
      disabled: "boolean",
      loading: "boolean",
      icon: "string",
      iconOnly: "boolean",
      iconPosition: "string",
      label: "string",
      badge: "string",
      type: "string",
      className: "string",
      classNames: "json",
    },
  })
);

customElements.define(
  "l-split-button",
  r2wc(withTailwind(SplitButton), {
    shadow: "open",
    props: {
      icon: "string",
      label: "string",
      menuLabel: "string",
      menuIcon: "string",
      variant: "string",
      color: "string",
      size: "string",
      shape: "string",
      disabled: "boolean",
    },
    events: { onMenuClick: {} }, // dispatches "menuclick"
  })
);

// Light-DOM children of <l-split-button> — e.g.
// <l-split-button-menu-item icon="trash-2">Delete</l-split-button-menu-item>
// — project into its dropdown via the native <slot>, same as
// <l-segment-button> does inside <l-button-group>.
customElements.define(
  "l-split-button-menu-item",
  r2wc(withTailwind(SplitButtonMenuItem), {
    shadow: "open",
    props: {
      icon: "string",
      disabled: "boolean",
    },
  })
);

customElements.define(
  "l-button-group",
  r2wc(withTailwind(ButtonGroup), { shadow: "open", props: {} })
);

customElements.define(
  "l-segment-button",
  r2wc(withTailwind(SegmentButton), {
    shadow: "open",
    props: {
      icon: "string",
      active: "boolean",
    },
  })
);

customElements.define(
  "l-modal",
  r2wc(withTailwind(ModalElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string", className: "string", classNames: "json" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-badge",
  r2wc(withTailwind(Badge), {
    shadow: "open",
    props: {
      variant: "string",
      color: "string",
      size: "string",
      icon: "string",
      dot: "boolean",
      label: "string",
    },
  })
);

customElements.define(
  "l-avatar",
  r2wc(withTailwind(Avatar), {
    shadow: "open",
    props: {
      src: "string",
      alt: "string",
      initials: "string",
      size: "string",
      shape: "string",
      status: "string",
      color: "string",
    },
  })
);

customElements.define(
  "l-avatar-group",
  r2wc(withTailwind(AvatarGroup), { shadow: "open", props: {} })
);

customElements.define(
  "l-icon",
  r2wc(withTailwind(Icon), {
    shadow: "open",
    props: { name: "string", size: "number", className: "string" },
  })
);

customElements.define(
  "l-spinner",
  r2wc(withTailwind(Spinner), {
    shadow: "open",
    props: { size: "string", color: "string", variant: "string", label: "string" },
  })
);

customElements.define(
  "l-loader",
  r2wc(withTailwind(Loader), {
    shadow: "open",
    props: { shape: "string", variant: "string", width: "number", height: "number", lines: "number" },
  })
);

customElements.define(
  "l-divider",
  r2wc(withTailwind(Divider), {
    shadow: "open",
    props: { orientation: "string", label: "string", color: "string", resizable: "boolean", step: "number" },
    events: { onResize: {} }, // dispatches "resize", detail = delta px
  })
);

customElements.define(
  "l-tooltip",
  r2wc(withTailwind(Tooltip), {
    shadow: "open",
    props: { content: "string", position: "string", delayMs: "number", color: "string" },
  })
);

customElements.define(
  "l-card",
  r2wc(withTailwind(Card), {
    shadow: "open",
    props: { variant: "string", padding: "string", hoverable: "boolean", title: "string", footer: "string" },
  })
);

customElements.define(
  "l-container",
  r2wc(withTailwind(Container), {
    shadow: "open",
    props: { size: "string", centered: "boolean", padded: "boolean" },
  })
);

customElements.define(
  "l-section",
  r2wc(withTailwind(Section), {
    shadow: "open",
    props: { title: "string", subtitle: "string", spacing: "string" },
  })
);

customElements.define(
  "l-grid",
  r2wc(withTailwind(Grid), {
    shadow: "open",
    props: { cols: "number", gap: "string" },
  })
);

customElements.define(
  "l-list",
  r2wc(withTailwind(List), {
    shadow: "open",
    props: { ordered: "boolean", variant: "string", className: "string" },
  })
);

// Light-DOM children of <l-list> — projected via the native <slot>, same as
// <l-segment-button> inside <l-button-group>.
customElements.define(
  "l-list-item",
  r2wc(withTailwind(ListItem), {
    shadow: "open",
    props: { icon: "string", tooltip: "boolean", tooltipPosition: "string", classNames: "json" },
  })
);

customElements.define(
  "l-breadcrumbs",
  r2wc(withTailwind(Breadcrumbs), { shadow: "open", props: {} })
);

customElements.define(
  "l-breadcrumb-item",
  r2wc(withTailwind(BreadcrumbItem), {
    shadow: "open",
    props: { href: "string", icon: "string", className: "string", classNames: "json" },
  })
);

customElements.define(
  "l-accordion",
  r2wc(withTailwind(Accordion), { shadow: "open", props: { className: "string" } })
);

// Same-`name` <l-accordion-item> siblings become mutually exclusive via the
// browser's native <details name> behavior — no JS coordination needed, so
// this works identically whether wrapped as a Web Component or not.
customElements.define(
  "l-accordion-item",
  r2wc(withTailwind(AccordionItem), {
    shadow: "open",
    props: {
      title: "string",
      name: "string",
      defaultOpen: "boolean",
      disabled: "boolean",
      classNames: "json",
    },
  })
);

// columns/data are plain data (no functions when set as a JSON attribute
// string; set the `columns`/`data` DOM properties directly with real
// objects/functions instead of attributes for the `render` callback to work).
customElements.define(
  "l-table",
  r2wc(withTailwind(Table), {
    shadow: "open",
    props: { columns: "json", data: "json", size: "string", striped: "boolean", bordered: "boolean" },
  })
);

customElements.define(
  "l-pagination",
  r2wc(withTailwind(Pagination), {
    shadow: "open",
    props: { page: "number", totalPages: "number", siblingCount: "number", color: "string" },
    events: { onPageChange: {} }, // dispatches "pagechange", detail = new page number
  })
);

// `tabs` has no native DOM equivalent (it's data, not children) — set the
// `tabs` DOM property directly with a real array, same caveat as Table above.
customElements.define(
  "l-tabs",
  r2wc(withTailwind(Tabs), {
    shadow: "open",
    props: { tabs: "json", defaultIndex: "number", color: "string" },
  })
);

customElements.define(
  "l-carousel",
  r2wc(withTailwind(Carousel), {
    shadow: "open",
    props: { slides: "json", autoPlay: "boolean", intervalMs: "number", showArrows: "boolean", showDots: "boolean" },
  })
);

customElements.define(
  "l-input",
  r2wc(withTailwind(Input), {
    shadow: "open",
    props: {
      value: "string",
      placeholder: "string",
      disabled: "boolean",
      required: "boolean",
      name: "string",
      type: "string",
      size: "string",
      invalid: "boolean",
      leadingIcon: "string",
      trailingIcon: "string",
    },
  })
);

customElements.define(
  "l-textarea",
  r2wc(withTailwind(Textarea), {
    shadow: "open",
    props: {
      value: "string",
      placeholder: "string",
      disabled: "boolean",
      required: "boolean",
      name: "string",
      rows: "number",
      invalid: "boolean",
      resize: "string",
    },
  })
);

customElements.define(
  "l-label",
  r2wc(withTailwind(Label), {
    shadow: "open",
    props: { htmlFor: "string", required: "boolean" },
  })
);

customElements.define(
  "l-search-input",
  r2wc(withTailwind(SearchInput), {
    shadow: "open",
    props: { value: "string", placeholder: "string", size: "string", disabled: "boolean" },
    events: { onClear: {} }, // dispatches "clear" — no native DOM equivalent for the clear button
  })
);

customElements.define(
  "l-checkbox",
  r2wc(withTailwind(Checkbox), {
    shadow: "open",
    props: {
      checked: "boolean",
      defaultChecked: "boolean",
      disabled: "boolean",
      name: "string",
      value: "string",
      color: "string",
      label: "string",
    },
  })
);

customElements.define(
  "l-radio",
  r2wc(withTailwind(Radio), {
    shadow: "open",
    props: {
      checked: "boolean",
      defaultChecked: "boolean",
      disabled: "boolean",
      name: "string",
      value: "string",
      color: "string",
      label: "string",
    },
  })
);

// Pure layout wrapper — same-`name` <l-radio> siblings are natively
// mutually exclusive via the browser, no JS coordination needed.
customElements.define(
  "l-radio-group",
  r2wc(withTailwind(RadioGroup), {
    shadow: "open",
    props: { orientation: "string" },
  })
);

customElements.define(
  "l-switch",
  r2wc(withTailwind(Switch), {
    shadow: "open",
    props: {
      checked: "boolean",
      defaultChecked: "boolean",
      disabled: "boolean",
      name: "string",
      size: "string",
      color: "string",
      label: "string",
    },
  })
);

customElements.define(
  "l-select",
  r2wc(withTailwind(Select), {
    shadow: "open",
    props: {
      options: "json",
      value: "string",
      placeholder: "string",
      size: "string",
      invalid: "boolean",
      disabled: "boolean",
    },
  })
);

customElements.define(
  "l-date-picker",
  r2wc(withTailwind(DatePicker), {
    shadow: "open",
    props: { value: "string", size: "string", variant: "string", invalid: "boolean", disabled: "boolean" },
    events: { onClear: {} }, // dispatches "clear" — no native DOM equivalent for the clear button
  })
);

// startValue/endValue are a pair, not a single native input value — set the
// `startValue`/`endValue` DOM properties directly, and listen for the
// bridged "startchange"/"endchange" events instead of a native input event.
customElements.define(
  "l-date-range-picker",
  r2wc(withTailwind(DateRangePicker), {
    shadow: "open",
    props: {
      startValue: "string",
      endValue: "string",
      min: "string",
      max: "string",
      size: "string",
      variant: "string",
      invalid: "boolean",
      disabled: "boolean",
      presets: "json",
    },
    events: { onStartChange: {}, onEndChange: {} }, // dispatch "startchange"/"endchange", detail = the new date string
  })
);

customElements.define(
  "l-time-picker",
  r2wc(withTailwind(TimePicker), {
    shadow: "open",
    props: { value: "string", size: "string", invalid: "boolean", disabled: "boolean" },
  })
);

customElements.define(
  "l-slider",
  r2wc(withTailwind(Slider), {
    shadow: "open",
    props: {
      value: "string",
      min: "number",
      max: "number",
      step: "number",
      color: "string",
      showValue: "boolean",
      disabled: "boolean",
    },
  })
);

// `value`/`onChange` are a tuple, not a single native input value — set the
// `value` DOM property directly with a real [number, number], and listen for
// the bridged "change" event (detail = the new tuple) instead of a native
// input/change event.
customElements.define(
  "l-range-slider",
  r2wc(withTailwind(RangeSlider), {
    shadow: "open",
    props: {
      value: "json",
      min: "number",
      max: "number",
      step: "number",
      color: "string",
      showValue: "boolean",
    },
    events: { onChange: {} }, // dispatches "change", detail = [number, number]
  })
);

// options/value are plain data — set the `options`/`value` DOM properties
// directly with real arrays for full control; listen for the bridged
// "change" event (detail = string[]) instead of a native change event.
customElements.define(
  "l-multi-select",
  r2wc(withTailwind(MultiSelect), {
    shadow: "open",
    props: { options: "json", value: "json", placeholder: "string", color: "string" },
    events: { onChange: {} }, // dispatches "change", detail = string[]
  })
);

customElements.define(
  "l-combobox",
  r2wc(withTailwind(Combobox), {
    shadow: "open",
    props: { options: "json", value: "string", placeholder: "string" },
    events: { onChange: {} }, // dispatches "change", detail = the selected value
  })
);

customElements.define(
  "l-file-upload",
  r2wc(withTailwind(FileUpload), {
    shadow: "open",
    props: { label: "string", accept: "string", multiple: "boolean", disabled: "boolean" },
    events: { onFilesSelected: {} }, // dispatches "filesselected", detail = FileList | null
  })
);

customElements.define(
  "l-alert-dialog",
  r2wc(withTailwind(AlertDialogElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string", description: "string", variant: "string", confirmLabel: "string", cancelLabel: "string" },
    events: { onClose: {}, onConfirm: {} }, // dispatch "close"/"confirm"
  })
);

customElements.define(
  "l-drawer",
  r2wc(withTailwind(DrawerElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string", position: "string", size: "string" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-sheet",
  r2wc(withTailwind(SheetElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-popover",
  r2wc(withTailwind(Popover), {
    shadow: "open",
    props: { content: "string", position: "string" },
  })
);

customElements.define(
  "l-dropdown-menu",
  r2wc(withTailwind(DropdownMenu), {
    shadow: "open",
    props: { align: "string" },
  })
);

// Light-DOM children of <l-dropdown-menu> — e.g.
// <l-dropdown-menu-item slot="trigger">...</l-dropdown-menu-item> for the
// trigger and plain (default-slotted) <l-dropdown-menu-item> children for
// the menu itself — project via named/default <slot>s, same idea as
// <l-split-button-menu-item> inside <l-split-button>.
customElements.define(
  "l-dropdown-menu-item",
  r2wc(withTailwind(DropdownMenuItem), {
    shadow: "open",
    props: { icon: "string", disabled: "boolean", danger: "boolean" },
  })
);

customElements.define(
  "l-context-menu",
  r2wc(withTailwind(ContextMenu), { shadow: "open", props: {} })
);

// `items` is plain data — set the `items` DOM property directly with a real
// array (including onSelect callbacks) for full control.
customElements.define(
  "l-command-menu",
  r2wc(withTailwind(CommandMenu), {
    shadow: "open",
    props: { open: "boolean", items: "json", placeholder: "string" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-alert",
  r2wc(withTailwind(AlertElement), {
    shadow: "open",
    props: {
      variant: "string",
      heading: "string",
      icon: "string",
      closable: "boolean",
      className: "string",
      classNames: "json",
    },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-toast",
  r2wc(withTailwind(ToastElement), {
    shadow: "open",
    props: {
      open: "boolean",
      variant: "string",
      heading: "string",
      duration: "number",
      position: "string",
      icon: "string",
    },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-notification",
  r2wc(withTailwind(Notification), {
    shadow: "open",
    props: { icon: "string", timestamp: "string", unread: "boolean" },
    events: { onDismiss: {} }, // dispatches "dismiss" — no native DOM equivalent
  })
);

customElements.define(
  "l-progress-bar",
  r2wc(withTailwind(ProgressBar), {
    shadow: "open",
    props: {
      value: "number",
      max: "number",
      size: "string",
      color: "string",
      showLabel: "boolean",
      striped: "boolean",
      indeterminate: "boolean",
    },
  })
);

customElements.define(
  "l-empty-state",
  r2wc(withTailwind(EmptyStateElement), {
    shadow: "open",
    props: { icon: "string", heading: "string" },
  })
);

customElements.define(
  "l-error-state",
  r2wc(withTailwind(ErrorStateElement), {
    shadow: "open",
    props: { icon: "string", heading: "string" },
  })
);

customElements.define(
  "l-success-state",
  r2wc(withTailwind(SuccessStateElement), {
    shadow: "open",
    props: { icon: "string", heading: "string" },
  })
);

customElements.define(
  "l-loading-state",
  r2wc(withTailwind(LoadingStateElement), {
    shadow: "open",
    props: { heading: "string", size: "string" },
  })
);

// brand/menu-items/actions are ReactNode props projected via named/default
// <slot>s (same pattern as Notification's icon/actions) — no attribute
// equivalent for them, since they're arbitrary composed markup, not strings.
customElements.define(
  "l-navbar",
  r2wc(withTailwind(Navbar), {
    shadow: "open",
    props: { sticky: "boolean", bordered: "boolean", variant: "string" },
  })
);

customElements.define(
  "l-sidebar",
  r2wc(withTailwind(Sidebar), {
    shadow: "open",
    props: {
      width: "number",
      height: "string",
      collapsed: "boolean",
      variant: "string",
      color: "string",
      collapsible: "boolean",
    },
    events: { onCollapsedChange: {} }, // dispatches "collapsedchange", detail = the requested boolean
  })
);

// `collapsed` is optional — when omitted, SidebarMenuItem finds its nearest ancestor <l-sidebar>
// itself (a plain DOM `.closest()` from its own host element, both being ordinary light-DOM
// elements) and mirrors that element's own `collapsed` attribute, which r2wc always keeps reflected
// on it. `variant`/`color`/`dark` have no such attribute to read on Sidebar (color isn't boolean,
// and Sidebar has no single "dark" flag, just 7 variant names), so those still need passing directly.
customElements.define(
  "l-sidebar-menu-item",
  r2wc(withHostBlock(withTailwind(SidebarMenuItem)), {
    shadow: "open",
    props: {
      icon: "string",
      href: "string",
      active: "boolean",
      disabled: "boolean",
      collapsed: "boolean",
      dark: "boolean",
      color: "string",
      tooltipPosition: "string",
    },
  })
);

customElements.define(
  "l-header",
  r2wc(withTailwind(HeaderElement), {
    shadow: "open",
    props: { heading: "string" },
  })
);

customElements.define(
  "l-footer",
  r2wc(withTailwind(Footer), { shadow: "open", props: { variant: "string" } })
);

// `items` is plain data (label/href/icon/active/disabled) — set the `items`
// DOM property directly with a real array, same as Tabs' `tabs`.
customElements.define(
  "l-navigation-menu",
  r2wc(withTailwind(NavigationMenu), {
    shadow: "open",
    props: { items: "json", orientation: "string" },
    events: { onChange: {} }, // dispatches "change", detail = the selected item's index
  })
);

customElements.define(
  "l-bottom-navigation",
  r2wc(withTailwind(BottomNavigation), {
    shadow: "open",
    props: { items: "json" },
  })
);

customElements.define(
  "l-stepper",
  r2wc(withTailwind(Stepper), {
    shadow: "open",
    props: { steps: "json", currentStep: "number", orientation: "string" },
  })
);

customElements.define(
  "l-data-grid",
  r2wc(withTailwind(DataGrid), {
    shadow: "open",
    props: {
      columns: "json",
      data: "json",
      size: "string",
      striped: "boolean",
      bordered: "boolean",
      selectable: "boolean",
    },
    events: { onSelectionChange: {} },
  })
);

customElements.define(
  "l-timeline",
  r2wc(withTailwind(Timeline), {
    shadow: "open",
    props: { items: "json", orientation: "string" },
  })
);

customElements.define(
  "l-stat",
  r2wc(withTailwind(Stat), {
    shadow: "open",
    props: { label: "string", value: "string", change: "string", trend: "string", icon: "string", color: "string" },
  })
);

customElements.define(
  "l-chart",
  r2wc(withTailwind(Chart), {
    shadow: "open",
    props: { data: "json", type: "string", height: "number", color: "string", showLabels: "boolean" },
  })
);

customElements.define(
  "l-calendar",
  r2wc(withTailwind(Calendar), {
    shadow: "open",
    props: { month: "string", selected: "string", events: "json", color: "string" },
    events: { onSelect: {}, onMonthChange: {} }, // dispatches "select"/"monthchange"
  })
);

customElements.define(
  "l-activity-feed",
  r2wc(withTailwind(ActivityFeed), {
    shadow: "open",
    props: { items: "json", compact: "boolean" },
  })
);

customElements.define(
  "l-profile-card",
  r2wc(withTailwind(ProfileCard), {
    shadow: "open",
    props: {
      name: "string",
      role: "string",
      bio: "string",
      avatarSrc: "string",
      avatarInitials: "string",
      stats: "json",
      color: "string",
    },
  })
);

customElements.define(
  "l-user-menu",
  r2wc(withTailwind(UserMenu), {
    shadow: "open",
    props: {
      name: "string",
      email: "string",
      avatarSrc: "string",
      avatarInitials: "string",
      items: "json",
      align: "string",
    },
    events: { onItemSelect: {} },
  })
);

customElements.define(
  "l-password-input",
  r2wc(withTailwind(PasswordInput), {
    shadow: "open",
    props: { size: "string", invalid: "boolean", disabled: "boolean" },
  })
);

customElements.define(
  "l-login-form",
  r2wc(withTailwind(LoginForm), {
    shadow: "open",
    props: {
      title: "string",
      description: "string",
      submitLabel: "string",
      showRemember: "boolean",
      showForgotPassword: "boolean",
    },
    events: { onSubmit: {}, onForgotPassword: {} },
  })
);

customElements.define(
  "l-signup-form",
  r2wc(withTailwind(SignupForm), {
    shadow: "open",
    props: { title: "string", description: "string", submitLabel: "string", mismatchError: "string" },
    events: { onSubmit: {} },
  })
);

customElements.define(
  "l-profile-settings",
  r2wc(withTailwind(ProfileSettings), {
    shadow: "open",
    props: { defaultValues: "json", avatarSrc: "string", avatarInitials: "string", saveLabel: "string" },
    events: { onSave: {}, onAvatarChange: {} },
  })
);

customElements.define(
  "l-account-settings",
  r2wc(withTailwind(AccountSettings), {
    shadow: "open",
    props: { email: "string", notifications: "json" },
    events: { onEmailChange: {}, onPasswordChange: {}, onNotificationsChange: {}, onDeleteAccount: {} },
  })
);
