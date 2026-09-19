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
