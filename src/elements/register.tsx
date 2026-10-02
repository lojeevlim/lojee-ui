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
import { StepperItemElement } from "./stepper-item";
import { TopBarElement } from "./top-bar-element";
import { TableElement } from "./table-element";
import { MapElement } from "./map-element";
import { defineAppSections } from "./app-sections";
import { withSlots } from "./with-slots";
import { ThemeSwitcher } from "../components/ui/ThemeSwitcher/ThemeSwitcher";
import { AppElement, SideToggleElement, ThemeProviderElement } from "./app-element";
import { Badge } from "../components/ui/Badge/Badge";
import { Avatar } from "../components/ui/Avatar/Avatar";
import { Image } from "../components/ui/Image/Image";
import { Video } from "../components/ui/Video/Video";
import { Skeleton } from "../components/ui/Skeleton/Skeleton";
import { TagInput } from "../components/ui/TagInput/TagInput";
import { NumberInput } from "../components/ui/NumberInput/NumberInput";
import { OtpInput } from "../components/ui/OtpInput/OtpInput";
import { Rating } from "../components/ui/Rating/Rating";
import { ColorPicker } from "../components/ui/ColorPicker/ColorPicker";
import { CopyButton } from "../components/ui/CodeSnippet/CopyButton";
import { CodeSnippetElement } from "./code-snippet-element";
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
import { NavbarItem } from "../components/ui/Navbar/NavbarItem";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import { SidebarMenuItem } from "../components/ui/Sidebar/SidebarMenuItem";
import { NavigationMenu } from "../components/ui/NavigationMenu/NavigationMenu";
import { BottomNavigation } from "../components/ui/BottomNavigation/BottomNavigation";
import { Stepper } from "../components/ui/Stepper/Stepper";
import { DataGrid } from "../components/ui/DataGrid/DataGrid";
import { Timeline } from "../components/ui/Timeline/Timeline";
import { Stat } from "../components/ui/Stat/Stat";
import { Chart } from "../components/ui/Chart/Chart";
import { Footer } from "../components/ui/Footer/Footer";
import { Calendar } from "../components/ui/Calendar/Calendar";
import { FlowDiagram } from "../components/ui/FlowDiagram/FlowDiagram";
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
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
  r2wc(withTailwind(ButtonGroup), { shadow: "open", props: { transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" } })
);

customElements.define(
  "l-segment-button",
  r2wc(withTailwind(SegmentButton), {
    shadow: "open",
    props: {
      icon: "string",
      active: "boolean",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-modal",
  r2wc(withTailwind(ModalElement), {
    shadow: "open",
    props: {
      open: "boolean",
      heading: "string",
      className: "string",
      classNames: "json",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-badge",
  r2wc(withTailwind(Badge), {
    shadow: "open",
    props: {
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
      variant: "string",
      color: "string",
      size: "string",
      icon: "string",
      dot: "boolean",
      label: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-avatar",
  r2wc(withTailwind(Avatar), {
    shadow: "open",
    props: {
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
      src: "string",
      alt: "string",
      initials: "string",
      size: "string",
      shape: "string",
      status: "string",
      color: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-avatar-group",
  r2wc(withTailwind(AvatarGroup), { shadow: "open", props: { transition: "string", transitionDuration: "number", transitionDelay: "number" } })
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
    props: { size: "string", color: "string", variant: "string", label: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-loader",
  r2wc(withTailwind(Loader), {
    shadow: "open",
    props: { shape: "string", variant: "string", width: "number", height: "number", lines: "number", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-divider",
  r2wc(withTailwind(Divider), {
    shadow: "open",
    props: { orientation: "string", label: "string", color: "string", resizable: "boolean", step: "number", transition: "string", transitionDuration: "number", transitionDelay: "number" },
    events: { onResize: {} }, // dispatches "resize", detail = delta px
  })
);

customElements.define(
  "l-tooltip",
  r2wc(withTailwind(Tooltip), {
    shadow: "open",
    props: { content: "string", position: "string", size: "string", delayMs: "number", color: "string", open: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-card",
  r2wc(withTailwind(withSlots(Card, { footer: "footer", children: "" })), {
    shadow: "open",
    props: { variant: "string", padding: "string", hoverable: "boolean", title: "string", footer: "string", animated: "string", pulseColor: "string", pulseGradientTo: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
  })
);

customElements.define(
  "l-container",
  r2wc(withTailwind(Container), {
    shadow: "open",
    props: { size: "string", centered: "boolean", padded: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-section",
  r2wc(withTailwind(Section), {
    shadow: "open",
    props: { title: "string", subtitle: "string", spacing: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-grid",
  r2wc(withTailwind(Grid), {
    shadow: "open",
    props: { cols: "number", gap: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-list",
  r2wc(withTailwind(List), {
    shadow: "open",
    props: { ordered: "boolean", variant: "string", className: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

// Light-DOM children of <l-list> — projected via the native <slot>, same as
// <l-segment-button> inside <l-button-group>.
customElements.define(
  "l-list-item",
  r2wc(withTailwind(ListItem), {
    shadow: "open",
    props: { icon: "string", tooltip: "boolean", tooltipPosition: "string", classNames: "json", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-breadcrumbs",
  r2wc(withTailwind(Breadcrumbs), { shadow: "open", props: { color: "string", variant: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" } })
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
  r2wc(withTailwind(Accordion), { shadow: "open", props: { className: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" } })
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
    },
  })
);

// columns/data are plain data (no functions when set as a JSON attribute
// string; set the `columns`/`data` DOM properties directly with real
// objects/functions instead of attributes for the `render` callback to work).
customElements.define(
  "l-table",
  r2wc(withTailwind(TableElement), {
    shadow: "open",
    props: {
      columns: "json",
      data: "json",
      size: "string",
      striped: "boolean",
      bordered: "boolean",
      loading: "boolean",
      skeletonRows: "number",
      actions: "json",
      actionsHeader: "string",
      builtInActions: "boolean",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
    },
    events: { onAction: {}, onDataChange: {} }, // dispatch "action" (detail = { action, row }) and "datachange" (detail = the rows)
  })
);

customElements.define(
  "l-pagination",
  r2wc(withTailwind(Pagination), {
    shadow: "open",
    props: { page: "number", totalPages: "number", siblingCount: "number", color: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
    events: { onPageChange: {} }, // dispatches "pagechange", detail = new page number
  })
);

// `tabs` has no native DOM equivalent (it's data, not children) — set the
// `tabs` DOM property directly with a real array, same caveat as Table above.
customElements.define(
  "l-tabs",
  r2wc(withTailwind(Tabs), {
    shadow: "open",
    props: { tabs: "json", defaultIndex: "number", color: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-carousel",
  r2wc(withTailwind(Carousel), {
    shadow: "open",
    props: { slides: "json", autoPlay: "boolean", intervalMs: "number", showArrows: "boolean", showDots: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-label",
  r2wc(withTailwind(Label), {
    shadow: "open",
    props: { htmlFor: "string", required: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-search-input",
  r2wc(withTailwind(SearchInput), {
    shadow: "open",
    props: { value: "string", placeholder: "string", size: "string", disabled: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

// Pure layout wrapper — same-`name` <l-radio> siblings are natively
// mutually exclusive via the browser, no JS coordination needed.
customElements.define(
  "l-radio-group",
  r2wc(withTailwind(RadioGroup), {
    shadow: "open",
    props: { orientation: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-date-picker",
  r2wc(withTailwind(DatePicker), {
    shadow: "open",
    props: { value: "string", size: "string", variant: "string", invalid: "boolean", disabled: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onStartChange: {}, onEndChange: {} }, // dispatch "startchange"/"endchange", detail = the new date string
  })
);

customElements.define(
  "l-time-picker",
  r2wc(withTailwind(TimePicker), {
    shadow: "open",
    props: { value: "string", size: "string", invalid: "boolean", disabled: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
    props: { options: "json", value: "json", placeholder: "string", color: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onChange: {} }, // dispatches "change", detail = string[]
  })
);

customElements.define(
  "l-combobox",
  r2wc(withTailwind(Combobox), {
    shadow: "open",
    props: { options: "json", value: "string", placeholder: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onChange: {} }, // dispatches "change", detail = the selected value
  })
);

customElements.define(
  "l-file-upload",
  r2wc(withTailwind(FileUpload), {
    shadow: "open",
    props: { label: "string", accept: "string", multiple: "boolean", disabled: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onFilesSelected: {} }, // dispatches "filesselected", detail = FileList | null
  })
);

customElements.define(
  "l-alert-dialog",
  r2wc(withTailwind(withSlots(AlertDialogElement, { description: "" })), {
    shadow: "open",
    props: { open: "boolean", heading: "string", description: "string", variant: "string", confirmLabel: "string", cancelLabel: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onClose: {}, onConfirm: {} }, // dispatch "close"/"confirm"
  })
);

customElements.define(
  "l-drawer",
  r2wc(withTailwind(DrawerElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string", position: "string", size: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-sheet",
  r2wc(withTailwind(SheetElement), {
    shadow: "open",
    props: { open: "boolean", heading: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-popover",
  r2wc(withTailwind(Popover), {
    shadow: "open",
    props: { content: "string", position: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-dropdown-menu",
  r2wc(withTailwind(DropdownMenu), {
    shadow: "open",
    props: { align: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
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
  r2wc(withTailwind(ContextMenu), { shadow: "open", props: { transition: "string", transitionDuration: "number", transitionDelay: "number" } })
);

// `items` is plain data — set the `items` DOM property directly with a real
// array (including onSelect callbacks) for full control.
customElements.define(
  "l-command-menu",
  r2wc(withTailwind(CommandMenu), {
    shadow: "open",
    props: { open: "boolean", items: "json", placeholder: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-alert",
  r2wc(withTailwind(withSlots(AlertElement, { children: "" })), {
    shadow: "open",
    props: {
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
      variant: "string",
      heading: "string",
      icon: "string",
      closable: "boolean",
      className: "string",
      classNames: "json",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-toast",
  r2wc(withTailwind(withSlots(ToastElement, { children: "" })), {
    shadow: "open",
    props: {
      open: "boolean",
      variant: "string",
      heading: "string",
      duration: "number",
      position: "string",
      icon: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onClose: {} }, // dispatches "close"
  })
);

customElements.define(
  "l-notification",
  r2wc(withTailwind(withSlots(Notification, { children: "", actions: "actions" })), {
    shadow: "open",
    props: { icon: "string", timestamp: "string", unread: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
    },
  })
);

customElements.define(
  "l-empty-state",
  r2wc(withTailwind(withSlots(EmptyStateElement, { description: "", action: "action" })), {
    shadow: "open",
    props: { icon: "string", heading: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-error-state",
  r2wc(withTailwind(withSlots(ErrorStateElement, { description: "", action: "action" })), {
    shadow: "open",
    props: { icon: "string", heading: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-success-state",
  r2wc(withTailwind(withSlots(SuccessStateElement, { description: "", action: "action" })), {
    shadow: "open",
    props: { icon: "string", heading: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-loading-state",
  r2wc(withTailwind(withSlots(LoadingStateElement, { description: "", action: "action" })), {
    shadow: "open",
    props: { heading: "string", size: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

// `brand` doubles as both a plain string attribute (the common case, e.g. `brand="Lojee"`) and a
// named `<slot name="brand">` for richer composed content (`<div slot="brand">`) — Navbar.tsx renders
// that slot unconditionally so the latter actually works standalone, with no `brand` attribute needed
// at all. `actions`/menu-items are ReactNode-only (arbitrary composed markup, not reducible to a single
// string) and project via `<slot name="actions">`/the default `<slot>` the same way.
customElements.define(
  "l-navbar",
  r2wc(withHostBlock(withTailwind(Navbar)), {
    shadow: "open",
    props: {
      brand: "string",
      sticky: "boolean",
      bordered: "boolean",
      variant: "string",
      color: "string",
      borderWidth: "number",
      items: "json",
      defaultActiveItem: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: {
      onActiveItemChange: {}, // dispatches "activeitemchange", detail = the active item object
    },
  })
);

// `dark`/`vividActive`/`color` have no ancestor attribute to auto-detect the way `l-sidebar-menu-item`
// reads `l-sidebar`'s own `collapsed` (Navbar has no single "dark" flag either, just 7 variant names —
// same reasoning as that element's own comment) — pass them directly, matching the parent `l-navbar`'s
// `variant`/`color`.
customElements.define(
  "l-navbar-item",
  r2wc(withHostBlock(withTailwind(NavbarItem)), {
    shadow: "open",
    props: {
      icon: "string",
      href: "string",
      active: "boolean",
      disabled: "boolean",
      dark: "boolean",
      vividActive: "boolean",
      color: "string",
      activeStyle: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-sidebar",
  r2wc(withHostBlock(withTailwind(Sidebar)), {
    shadow: "open",
    props: {
      width: "number",
      height: "string",
      collapsed: "boolean",
      variant: "string",
      color: "string",
      collapsible: "boolean",
      header: "string",
      headerIcon: "string",
      footer: "string",
      items: "json",
      defaultActiveItem: "string",
      borderWidth: "number",
      sticky: "boolean",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      tooltipTransition: "string",
      tooltipTransitionDuration: "number",
      tooltipColor: "string",
    },
    events: {
      onCollapsedChange: {}, // dispatches "collapsedchange", detail = the requested boolean
      onActiveItemChange: {}, // dispatches "activeitemchange", detail = the active item object
    },
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
      vividActive: "boolean",
      color: "string",
      tooltipPosition: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      tooltipTransition: "string",
      tooltipTransitionDuration: "number",
      tooltipColor: "string",
    },
  })
);

customElements.define(
  "l-header",
  r2wc(withHostBlock(withTailwind(withSlots(HeaderElement, { breadcrumbs: "breadcrumbs", description: "description", actions: "actions" }))), {
    shadow: "open",
    props: { heading: "string", variant: "string", color: "string", borderWidth: "number", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-footer",
  r2wc(withHostBlock(withTailwind(withSlots(Footer, { children: "", bottom: "bottom" }))), { shadow: "open", props: { bottom: "string", variant: "string", color: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" } })
);

// `items` is plain data (label/href/icon/active/disabled) — set the `items`
// DOM property directly with a real array, same as Tabs' `tabs`.
customElements.define(
  "l-navigation-menu",
  r2wc(withTailwind(NavigationMenu), {
    shadow: "open",
    props: { items: "json", orientation: "string", color: "string", variant: "string", defaultActiveItem: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: {
      onChange: {}, // dispatches "change", detail = the clicked item's index
      onActiveItemChange: {}, // dispatches "activeitemchange", detail = the active item object
    },
  })
);

customElements.define(
  "l-bottom-navigation",
  r2wc(withTailwind(BottomNavigation), {
    shadow: "open",
    props: { items: "json", color: "string", variant: "string", defaultActiveItem: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onActiveItemChange: {} }, // dispatches "activeitemchange", detail = the active item object
  })
);

customElements.define(
  "l-stepper",
  r2wc(withTailwind(Stepper), {
    shadow: "open",
    props: {
      steps: "json",
      currentStep: "number",
      defaultStep: "number",
      orientation: "string",
      color: "string",
      navigation: "boolean",
      sections: "boolean",
      clickable: "boolean",
      backLabel: "string",
      nextLabel: "string",
      finishLabel: "string",
      completedContent: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onStepChange: {} }, // dispatches "stepchange", detail = the new step index
  })
);

// `actions` is plain data ({ icon, label, badge?, href? }[]) — set the `actions` DOM property with a real array. The
// bar's free-form parts are slots: `leading`, the default slot (center) and `trailing`.
customElements.define(
  "l-top-bar",
  r2wc(withHostBlock(withTailwind(TopBarElement)), {
    shadow: "open",
    props: {
      title: "string",
      subtitle: "string",
      back: "boolean",
      backLabel: "string",
      menu: "boolean",
      menuLabel: "string",
      search: "boolean",
      searchPlaceholder: "string",
      actions: "json",
      variant: "string",
      color: "string",
      size: "string",
      sticky: "boolean",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: {
      onBack: {}, // dispatches "back"
      onMenuClick: {}, // dispatches "menuclick"
      onSearch: {}, // dispatches "search", detail = the query
      onSearchChange: {}, // dispatches "searchchange", detail = the query
      onActionClick: {}, // dispatches "actionclick", detail = the pressed action
    },
  })
);

// `<l-stepper-item step="1">…</l-stepper-item>` inside `<l-stepper>` — shown only while that step is current
// (step="complete" for the finished state). Coordinates with its parent through the DOM; see stepper-item.tsx.
customElements.define(
  "l-stepper-item",
  r2wc(withHostBlock(withTailwind(StepperItemElement)), { shadow: "open", props: { step: "string" } })
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
      loading: "boolean",
      skeletonRows: "number",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onSelectionChange: {} },
  })
);

customElements.define(
  "l-timeline",
  r2wc(withTailwind(Timeline), {
    shadow: "open",
    props: { items: "json", orientation: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-stat",
  r2wc(withTailwind(Stat), {
    shadow: "open",
    props: {
      countUp: "boolean",
      countUpDuration: "number",
      label: "string",
      value: "string",
      change: "string",
      trend: "string",
      icon: "string",
      color: "string",
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
  })
);

customElements.define(
  "l-chart",
  r2wc(withTailwind(Chart), {
    shadow: "open",
    props: { countUp: "boolean", countUpDuration: "number", data: "json", type: "string", height: "number", color: "string", showLabels: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
  })
);

// `nodes` / `edges` are plain data — set them as DOM properties with real arrays. `autoPlay` is JSON so it accepts both
// `true` and a number of milliseconds.
customElements.define(
  "l-flow-diagram",
  r2wc(withHostBlock(withTailwind(FlowDiagram)), {
    shadow: "open",
    props: {
      nodes: "json",
      edges: "json",
      direction: "string",
      variant: "string",
      curve: "string",
      color: "string",
      packets: "boolean",
      speed: "number",
      animated: "boolean",
      arrows: "boolean",
      interactive: "boolean",
      activeNode: "string",
      defaultActiveNode: "string",
      autoPlay: "json",
      grid: "boolean",
      captionTop: "string",
      captionBottom: "string",
      nodeWidth: "number",
      nodeHeight: "number",
      gap: "number",
      spacing: "number",
      label: "string",
      movable: "boolean",
      editable: "boolean",
      zoomable: "boolean",
      toolbarPosition: "string",
      nodeTypes: "json",
    },
    events: {
      onNodeMove: {}, // dispatches "nodemove", detail = { id, x, y }
      onDiagramChange: {}, // dispatches "diagramchange", detail = { nodes, edges } after every edit
      onNodeClick: {}, // dispatches "nodeclick", detail = the node
      onNodeHover: {}, // dispatches "nodehover", detail = the node (or null on leave)
    },
  })
);

customElements.define(
  "l-calendar",
  r2wc(withTailwind(Calendar), {
    shadow: "open",
    props: {
      month: "string",
      selected: "string",
      defaultSelected: "string",
      selectionMode: "string",
      selectedRange: "json",
      defaultRange: "json",
      events: "json",
      color: "string",
      variant: "string",
      title: "string",
      open: "boolean",
      footer: "boolean",
      confirmLabel: "string",
      cancelLabel: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: {
      onSelect: {}, // dispatches "select"
      onRangeSelect: {}, // dispatches "rangeselect", detail = { start, end }
      onMonthChange: {}, // dispatches "monthchange"
      onConfirm: {}, // dispatches "confirm", detail = the selected date (range mode: undefined — use the last "rangeselect")
      onCancel: {}, // dispatches "cancel"
      onClose: {}, // dispatches "close"
    },
  })
);

customElements.define(
  "l-activity-feed",
  r2wc(withTailwind(ActivityFeed), {
    shadow: "open",
    props: { items: "json", compact: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

customElements.define(
  "l-profile-card",
  r2wc(withTailwind(withSlots(ProfileCard, { actions: "actions" })), {
    shadow: "open",
    props: {
      animated: "string",
      pulseColor: "string",
      pulseGradientTo: "string",
      name: "string",
      role: "string",
      bio: "string",
      avatarSrc: "string",
      avatarInitials: "string",
      stats: "json",
      color: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
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
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onItemSelect: {} },
  })
);

customElements.define(
  "l-password-input",
  r2wc(withTailwind(PasswordInput), {
    shadow: "open",
    props: { size: "string", invalid: "boolean", disabled: "boolean", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
  })
);

customElements.define(
  "l-login-form",
  r2wc(withTailwind(withSlots(LoginForm, { footer: "footer" })), {
    shadow: "open",
    props: {
      title: "string",
      description: "string",
      submitLabel: "string",
      showRemember: "boolean",
      showForgotPassword: "boolean",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: { onSubmit: {}, onForgotPassword: {} },
  })
);

customElements.define(
  "l-signup-form",
  r2wc(withTailwind(withSlots(SignupForm, { footer: "footer" })), {
    shadow: "open",
    props: { title: "string", description: "string", submitLabel: "string", mismatchError: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onSubmit: {} },
  })
);

customElements.define(
  "l-profile-settings",
  r2wc(withTailwind(ProfileSettings), {
    shadow: "open",
    props: { defaultValues: "json", avatarSrc: "string", avatarInitials: "string", saveLabel: "string", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onSave: {}, onAvatarChange: {} },
  })
);

customElements.define(
  "l-account-settings",
  r2wc(withTailwind(AccountSettings), {
    shadow: "open",
    props: { email: "string", notifications: "json", transition: "string", transitionDuration: "number", transitionDelay: "number", hoverEffect: "string" },
    events: { onEmailChange: {}, onPasswordChange: {}, onNotificationsChange: {}, onDeleteAccount: {} },
  })
);

// A MapLibre map. Markers and routes are plain data (`markers`, `routes` — set them as DOM properties with real arrays);
// the element fills its host, so give `<l-map>` a height with CSS. MapLibre loads on demand the first time a map shows.
customElements.define(
  "l-map",
  r2wc(withHostBlock(withTailwind(MapElement)), {
    shadow: "open",
    props: {
      center: "json",
      zoom: "number",
      pitch: "number",
      bearing: "number",
      mapStyle: "string",
      controls: "json",
      markers: "json",
      routes: "json",
      fitBounds: "boolean",
      fitPadding: "number",
      interactive: "boolean",
    },
    events: {
      onLoad: {}, // dispatches "load"
      onStyleChange: {}, // dispatches "stylechange", detail = the chosen base-map name
      onMove: {}, // dispatches "move", detail = { center, zoom, pitch, bearing }
      onMapClick: {}, // dispatches "mapclick", detail = { lng, lat }
      onMarkerClick: {}, // dispatches "markerclick", detail = the marker
      onMarkerDragEnd: {}, // dispatches "markerdragend", detail = the marker with its new lng / lat
      onRouteClick: {}, // dispatches "routeclick", detail = the route
      onRouteLoad: {}, // dispatches "routeload", detail = { id, distance, duration, coordinates }
    },
  })
);

// App shell: <l-app> containing <l-top>, <l-side>, <l-main> and <l-foot>. Put <l-side-toggle> in the navbar's `brand`
// slot for the mobile drawer button. Without `theme` / `accent` / `active-variant` it follows the page's theme.
customElements.define(
  "l-app",
  r2wc(withHostBlock(withTailwind(AppElement)), {
    shadow: "open",
    props: { theme: "string", accent: "string", activeVariant: "string", layout: "json", collapseBelow: "string" },
  })
);

// Theme menu (light/dark, accent, active-item style) — changes the page theme on <html> by itself, no provider needed.
customElements.define(
  "l-theme-switcher",
  r2wc(withTailwind(ThemeSwitcher), { shadow: "open", props: { align: "string", showActiveItems: "boolean", showAccent: "boolean" } })
);

customElements.define("l-side-toggle", r2wc(withTailwind(SideToggleElement), { shadow: "open", props: { label: "string" } }));

// Theme provider: sets data-theme / data-accent on <html> (or only on its own subtree with `isolated`).
customElements.define(
  "l-theme-provider",
  r2wc(withHostBlock(withTailwind(ThemeProviderElement)), {
    shadow: "open",
    props: {
      defaultMode: "string",
      defaultAccent: "string",
      defaultActiveVariant: "string",
      isolated: "boolean",
      mode: "string",
      accent: "string",
      activeVariant: "string",
    },
  })
);

defineAppSections();

// Media. `fallback` is a slot: `<span slot="fallback">…</span>` replaces the placeholder shown when loading fails.
customElements.define(
  "l-image",
  r2wc(withHostBlock(withTailwind(withSlots(Image, { fallback: "fallback" }))), {
    shadow: "open",
    props: {
      src: "string",
      alt: "string",
      width: "string",
      height: "string",
      ratio: "string",
      fit: "string",
      rounded: "string",
      loading: "string",
      borderless: "boolean",
      caption: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: {
      onLoad: {}, // dispatches "load"
      onError: {}, // dispatches "error"
    },
  })
);

customElements.define(
  "l-video",
  r2wc(withHostBlock(withTailwind(withSlots(Video, { fallback: "fallback" }))), {
    shadow: "open",
    props: {
      src: "string",
      sources: "json",
      poster: "string",
      label: "string",
      controls: "boolean",
      autoPlay: "boolean",
      muted: "boolean",
      loop: "boolean",
      playsInline: "boolean",
      preload: "string",
      ratio: "string",
      fit: "string",
      rounded: "string",
      caption: "string",
      transition: "string",
      transitionDuration: "number",
      transitionDelay: "number",
      hoverEffect: "string",
    },
    events: {
      onPlay: {}, // dispatches "play"
      onPause: {}, // dispatches "pause"
      onEnded: {}, // dispatches "ended"
      onLoad: {}, // dispatches "load", detail = duration in seconds
      onError: {}, // dispatches "error"
    },
  })
);

// Loading placeholder.
customElements.define(
  "l-skeleton",
  r2wc(withHostBlock(withTailwind(Skeleton)), {
    shadow: "open",
    props: { variant: "string", width: "string", height: "string", size: "number", lines: "number", animation: "string", transition: "string", transitionDuration: "number", transitionDelay: "number" },
  })
);

// Inputs. Each keeps its own value (so it works with nothing wired up) and also follows the `value` attribute / property;
// `change` carries the new value in `event.detail`.
customElements.define(
  "l-tag-input",
  r2wc(withHostBlock(withTailwind(TagInput)), {
    shadow: "open",
    props: { value: "json", placeholder: "string", maxTags: "number", allowDuplicates: "boolean", color: "string", invalid: "boolean", disabled: "boolean" },
    events: { onChange: {} }, // dispatches "change", detail = string[]
  })
);

customElements.define(
  "l-number-input",
  r2wc(withHostBlock(withTailwind(NumberInput)), {
    shadow: "open",
    props: { value: "number", min: "number", max: "number", step: "number", precision: "number", placeholder: "string", size: "string", invalid: "boolean", disabled: "boolean" },
    events: { onChange: {} }, // dispatches "change", detail = number | undefined
  })
);

customElements.define(
  "l-otp-input",
  r2wc(withHostBlock(withTailwind(OtpInput)), {
    shadow: "open",
    props: { length: "number", value: "string", type: "string", mask: "boolean", autoFocus: "boolean", size: "string", invalid: "boolean", disabled: "boolean" },
    events: {
      onChange: {}, // dispatches "change", detail = the code so far
      onComplete: {}, // dispatches "complete", detail = the full code
    },
  })
);

customElements.define(
  "l-rating",
  r2wc(withHostBlock(withTailwind(Rating)), {
    shadow: "open",
    props: { value: "number", max: "number", allowHalf: "boolean", readOnly: "boolean", size: "string", label: "string" },
    events: { onChange: {} }, // dispatches "change", detail = number
  })
);

customElements.define(
  "l-color-picker",
  r2wc(withHostBlock(withTailwind(ColorPicker)), {
    shadow: "open",
    props: { value: "string", presets: "json", showInput: "boolean", disabled: "boolean" },
    events: { onChange: {} }, // dispatches "change", detail = "#rrggbb"
  })
);

// Code.
customElements.define(
  "l-copy-button",
  r2wc(withTailwind(CopyButton), {
    shadow: "open",
    props: { text: "string", label: "string", copiedLabel: "string", iconOnly: "boolean", resetAfter: "number" },
    events: { onCopy: {} }, // dispatches "copy", detail = the copied text
  })
);

customElements.define(
  "l-code-snippet",
  r2wc(withHostBlock(withTailwind(CodeSnippetElement)), {
    shadow: "open",
    props: { code: "string", language: "string", heading: "string", lineNumbers: "boolean", copyable: "boolean" },
  })
);
