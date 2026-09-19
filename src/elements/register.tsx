import r2wc from "@r2wc/react-to-web-component";
import { Button, SplitButton, SplitButtonMenuItem, ButtonGroup, SegmentButton } from "../components/ui/Buttons";
import { ModalElement } from "./modal-adapter";
import { withTailwind } from "./with-tailwind";
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
    props: { open: "boolean", heading: "string" },
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
    props: { ordered: "boolean", variant: "string" },
  })
);

// Light-DOM children of <l-list> — projected via the native <slot>, same as
// <l-segment-button> inside <l-button-group>.
customElements.define(
  "l-list-item",
  r2wc(withTailwind(ListItem), {
    shadow: "open",
    props: { icon: "string" },
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
    props: { href: "string", icon: "string" },
  })
);

customElements.define(
  "l-accordion",
  r2wc(withTailwind(Accordion), { shadow: "open", props: {} })
);

// Same-`name` <l-accordion-item> siblings become mutually exclusive via the
// browser's native <details name> behavior — no JS coordination needed, so
// this works identically whether wrapped as a Web Component or not.
customElements.define(
  "l-accordion-item",
  r2wc(withTailwind(AccordionItem), {
    shadow: "open",
    props: { title: "string", name: "string", defaultOpen: "boolean", disabled: "boolean" },
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
