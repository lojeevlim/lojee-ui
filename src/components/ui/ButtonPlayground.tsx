import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Plus, Settings, Mail, Bell, Download, ArrowRight, ChevronDown, MoreVertical, MoreHorizontal, X } from "lucide-react";
import {
  Button,
  SplitButton,
  SplitButtonMenuItem,
  ButtonGroup,
  SegmentButton,
  defaultGradientPartner,
  type GradientDirection,
  type ButtonVariant,
  type Size,
  type Shape,
} from "./Buttons";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";
import type { CodeBlockVariants } from "./CodeBlock";
import { useAnimation } from "./playgroundAnimation";
import { useMotion } from "./playgroundMotion";

const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "soft", "link", "dashed", "gradient", "glass"];
const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl", "full"];
const SHAPES: Shape[] = ["default", "pill", "square"];
const GRADIENT_DIRECTIONS: GradientDirection[] = ["to-right", "to-left", "to-bottom", "to-top", "to-br", "to-bl", "to-tr", "to-tl"];
const DIRECTION_LABELS: Record<GradientDirection, string> = {
  "to-right": "→ Right",
  "to-left": "← Left",
  "to-bottom": "↓ Down",
  "to-top": "↑ Up",
  "to-br": "↘ Down right",
  "to-bl": "↙ Down left",
  "to-tr": "↗ Up right",
  "to-tl": "↖ Up left",
};
const SEGMENTS = ["One", "Two", "Three"];
const LAYOUTS = ["single", "icon", "group", "split"] as const;
type Layout = (typeof LAYOUTS)[number];
const LAYOUT_LABELS: Record<Layout, string> = {
  single: "Button",
  icon: "Icon only",
  group: "Group",
  split: "Split",
};

// `key` is the icon name Button/SplitButton expect for their `icon` prop —
// the picker UI below still needs the actual component to render each
// swatch's glyph.
const ICONS: { key: string; icon: LucideIcon }[] = [
  { key: "plus", icon: Plus },
  { key: "settings", icon: Settings },
  { key: "mail", icon: Mail },
  { key: "bell", icon: Bell },
  { key: "download", icon: Download },
  { key: "arrow-right", icon: ArrowRight },
];

// SplitButton's dropdown trigger — a smaller, curated set of icons that
// actually read as "more options" rather than the general icon picker above.
const MENU_ICONS: { key: string; icon: LucideIcon }[] = [
  { key: "chevron-down", icon: ChevronDown },
  { key: "more-vertical", icon: MoreVertical },
  { key: "more-horizontal", icon: MoreHorizontal },
];

// A draft entry for the "Dropdown menu items" editor below — turned into a
// real `<SplitButtonMenuItem>` child for the preview and generated code.
interface MenuItemDraft {
  label: string;
  icon?: string;
}

// Seeds the list below for the Split layout — the user can add more or
// remove these from the playground itself.
const INITIAL_MENU_ITEMS: MenuItemDraft[] = [
  { label: "Duplicate", icon: "copy" },
  { label: "Archive", icon: "folder" },
  { label: "Delete", icon: "trash-2" },
];

export default function ButtonPlayground() {
  const anim = useAnimation();
  const motion = useMotion();
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [color, setColor] = useState<string>("accent");
  const [gradientTo, setGradientTo] = useState<string>("violet");
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>("to-right");
  const [showIcon, setShowIcon] = useState(true);
  const [activeSeg, setActiveSeg] = useState(0);
  const [size, setSize] = useState<Size>("lg");
  const [shape, setShape] = useState<Shape>("default");
  const [label, setLabel] = useState("Click me");
  const [layout, setLayout] = useState<Layout>("single");
  const [iconKey, setIconKey] = useState("plus");
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [menuIconKey, setMenuIconKey] = useState("chevron-down");
  const [menuItems, setMenuItems] = useState<MenuItemDraft[]>(INITIAL_MENU_ITEMS);
  const [newMenuItemLabel, setNewMenuItemLabel] = useState("");

  const addMenuItem = () => {
    const trimmed = newMenuItemLabel.trim();
    if (!trimmed) return;
    setMenuItems((prev) => [...prev, { label: trimmed }]);
    setNewMenuItemLabel("");
  };

  const removeMenuItem = (index: number) => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  const preview = (() => {
    if (layout === "icon") {
      return (
        <Button
          key={motion.replayKey}
          {...anim.props}
          {...motion.props}
          variant={variant}
          color={color}
          size={size}
          shape={shape}
          icon={iconKey}
          iconOnly
          label={label || "Icon button"}
        />
      );
    }
    if (layout === "group") {
      return (
        <ButtonGroup key={motion.replayKey} {...motion.props} shape={shape} onItemClick={({ index }) => setActiveSeg(index)}>
          {SEGMENTS.map((name, i) => (
            <SegmentButton key={name} active={activeSeg === i} color={color} icon={showIcon ? iconKey : undefined}>
              {i === 0 ? label || name : name}
            </SegmentButton>
          ))}
        </ButtonGroup>
      );
    }
    if (layout === "split") {
      return (
        <SplitButton
          key={motion.replayKey}
          {...motion.props}
          icon="check"
          label={label || "Approve"}
          color={color}
          size={size}
          shape={shape}
          menuIcon={menuIconKey}
        >
          {menuItems.length > 0
            ? menuItems.map((item, i) => (
                <SplitButtonMenuItem key={i} icon={item.icon}>
                  {item.label}
                </SplitButtonMenuItem>
              ))
            : undefined}
        </SplitButton>
      );
    }
    return (
      <Button
        key={motion.replayKey}
        {...anim.props}
        {...motion.props}
        variant={variant}
        color={color}
        gradientTo={variant === "gradient" ? gradientTo : undefined}
        gradientDirection={variant === "gradient" ? gradientDirection : undefined}
        size={size}
        shape={shape}
        icon={showIcon ? iconKey : undefined}
        iconPosition={iconPosition}
        label={label || "Button"}
      />
    );
  })();

  const code = (() => {
    if (layout === "icon") {
      return `<Button icon="${iconKey}" iconOnly variant="${variant}" color="${color}" size="${size}"${anim.attrs}${motion.attrs}${
        shape !== "default" ? ` shape="${shape}"` : ""
      } label="${label || "Icon button"}" />`;
    }
    if (layout === "group") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const colorAttr = color !== "accent" ? ` color="${color}"` : "";
      const iconAttr = showIcon ? ` icon="${iconKey}"` : "";
      const segs = SEGMENTS.map((name, i) => `  <SegmentButton${activeSeg === i ? " active" : ""}${colorAttr}${iconAttr}>${i === 0 ? label || name : name}</SegmentButton>`).join("\n");
      return `<ButtonGroup${shapeAttr}${motion.attrs} onItemClick={({ index, label }) => setActive(index)}>\n${segs}\n</ButtonGroup>`;
    }
    if (layout === "split") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const menuIconAttr = menuIconKey !== "chevron-down" ? ` menuIcon="${menuIconKey}"` : "";
      if (menuItems.length > 0) {
        const itemsCode = menuItems
          .map((item) => {
            const iconAttr = item.icon ? ` icon="${item.icon}"` : "";
            return `  <SplitButtonMenuItem${iconAttr} onClick={() => {}}>${item.label}</SplitButtonMenuItem>`;
          })
          .join("\n");
        return `<SplitButton\n  icon="check"\n  label="${label || "Approve"}"\n  color="${color}"\n  size="${size}"${shapeAttr}${menuIconAttr}${motion.attrs}\n>\n${itemsCode}\n</SplitButton>`;
      }
      return `<SplitButton icon="check" label="${label || "Approve"}" color="${color}" size="${size}"${shapeAttr}${menuIconAttr}${motion.attrs} />`;
    }
    return `<Button variant="${variant}" color="${color}"${
      variant === "gradient" ? ` gradientTo="${gradientTo}"${gradientDirection !== "to-right" ? ` gradientDirection="${gradientDirection}"` : ""}` : ""
    } size="${size}"${anim.attrs}${motion.attrs}${shape !== "default" ? ` shape="${shape}"` : ""}${showIcon ? ` icon="${iconKey}"` : ""}${
      showIcon && iconPosition === "right" ? ` iconPosition="right"` : ""
    } label="${label}" />`;
  })();

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = (() => {
    if (layout === "icon") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      return `<l-button icon="${iconKey}" iconOnly variant="${variant}" color="${color}" size="${size}"${anim.attrs}${motion.attrs}${shapeAttr} label="${label || "Icon button"}" />`;
    }
    if (layout === "group") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const colorAttr = color !== "accent" ? ` color="${color}"` : "";
      const iconAttr = showIcon ? ` icon="${iconKey}"` : "";
      const segs = SEGMENTS.map((name, i) => `  <l-segment-button${activeSeg === i ? " active" : ""}${colorAttr}${iconAttr}>${i === 0 ? label || name : name}</l-segment-button>`).join("\n");
      return `<l-button-group${shapeAttr}${motion.attrs}>\n${segs}\n</l-button-group>`;
    }
    if (layout === "split") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const menuIconAttr = menuIconKey !== "chevron-down" ? ` menuIcon="${menuIconKey}"` : "";
      if (menuItems.length > 0) {
        const itemsCode = menuItems
          .map((item) => {
            const iconAttr = item.icon ? ` icon="${item.icon}"` : "";
            return `  <l-split-button-menu-item${iconAttr}>${item.label}</l-split-button-menu-item>`;
          })
          .join("\n");
        return `<l-split-button\n  icon="check"\n  label="${label || "Approve"}"\n  color="${color}"\n  size="${size}"${shapeAttr}${menuIconAttr}${motion.attrs}\n>\n${itemsCode}\n</l-split-button>`;
      }
      return `<l-split-button icon="check" label="${label || "Approve"}" color="${color}" size="${size}"${shapeAttr}${menuIconAttr}${motion.attrs} />`;
    }
    return `<l-button variant="${variant}" color="${color}"${
      variant === "gradient" ? ` gradientTo="${gradientTo}"${gradientDirection !== "to-right" ? ` gradientDirection="${gradientDirection}"` : ""}` : ""
    } size="${size}"${anim.attrs}${motion.attrs}${shape !== "default" ? ` shape="${shape}"` : ""}${showIcon ? ` icon="${iconKey}"` : ""}${
      showIcon && iconPosition === "right" ? ` iconPosition="right"` : ""
    } label="${label}" />`;
  })();

  // A ButtonGroup reports its clicks through one handler on the group — each framework's own way of listening, no ids or queries.
  const groupHandler = (attr: string) => htmlMarkup.replace("<l-button-group", `<l-button-group ${attr}`);
  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${layout === "group" ? groupHandler('onitemclick="console.log(event.detail)"') : htmlMarkup}${layout === "group" ? "\n\n<!-- event.detail is { index, label } of the clicked button -->" : ""}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: layout === "group" ? groupHandler('@itemclick="onItemClick($event.detail)"') : htmlMarkup,
    angular: layout === "group" ? groupHandler('(itemclick)="onItemClick($event.detail)"') : htmlMarkup,
  };

  return (
    <PlaygroundLayout
      preview={
        <AppWindowFrame>
          <AppWindowBody>{preview}</AppWindowBody>
        </AppWindowFrame>
      }
      variants={codeVariants}
    >
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
            placeholder="Button label"
          />
        </div>

        <OptionGroup label="Layout" options={LAYOUTS} value={layout} onChange={setLayout} render={(o) => LAYOUT_LABELS[o]} />

        {layout === "single" && (
          <OptionGroup
            label="Variant"
            options={VARIANTS}
            value={variant}
            onChange={(v) => {
              setVariant(v);
              if (v === "gradient") {
                setGradientTo((prev) => defaultGradientPartner[color] ?? prev);
              }
            }}
          />
        )}

        {layout === "single" && (
          <OptionGroup
            label="Size"
            options={SIZES}
            value={size}
            onChange={setSize}
            render={(o) => (o === "full" ? "Full width" : o)}
          />
        )}

        {(layout === "single" || layout === "group") && (
          <OptionGroup label="Icon" options={["on", "off"] as const} value={showIcon ? "on" : "off"} onChange={(v) => setShowIcon(v === "on")} />
        )}

        {(layout === "icon" || ((layout === "single" || layout === "group") && showIcon)) && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Icon picker</span>
            <div className="flex flex-wrap gap-1.5">
              {ICONS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIconKey(key)}
                  aria-label={key}
                  title={key}
                  className={cx(
                    "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                    iconKey === key ? "bg-slate-900 text-white" : "bg-surface-muted text-fg-muted hover:bg-border"
                  )}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        {layout === "single" && showIcon && (
          <OptionGroup label="Icon position" options={["left", "right"] as const} value={iconPosition} onChange={setIconPosition} />
        )}

        <OptionGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />

        {layout === "split" && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Dropdown icon</span>
            <div className="flex flex-wrap gap-1.5">
              {MENU_ICONS.map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMenuIconKey(key)}
                  aria-label={key}
                  title={key}
                  className={cx(
                    "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
                    menuIconKey === key ? "bg-slate-900 text-white" : "bg-surface-muted text-fg-muted hover:bg-border"
                  )}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        {layout === "split" && (
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Dropdown menu items</span>
            {menuItems.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {menuItems.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md bg-surface-muted py-1 pr-1 pl-2.5 text-xs font-medium text-fg-muted"
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={() => removeMenuItem(i)}
                      aria-label={`Remove ${item.label}`}
                      className="rounded p-0.5 text-fg-subtle transition-colors hover:bg-border hover:text-fg-muted"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-1.5">
              <input
                value={newMenuItemLabel}
                onChange={(e) => setNewMenuItemLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addMenuItem();
                  }
                }}
                placeholder="New option label"
                className="flex-1 rounded-md border border-border px-2.5 py-1.5 text-xs text-fg outline-none transition-colors focus:border-border-strong"
              />
              <button
                type="button"
                onClick={addMenuItem}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-700"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {layout === "single" && variant === "gradient" ? (
          <div className="grid grid-cols-1 gap-4 sm:col-span-2 sm:grid-cols-2">
            <ColorSwatches label="From color" value={color} onChange={setColor} custom />
            <ColorSwatches label="To color" value={gradientTo} onChange={setGradientTo} custom />
          </div>
        ) : (
          <ColorSwatches label="Color" value={color} onChange={setColor} custom />
        )}

        {layout === "single" && variant === "gradient" && (
          <OptionGroup label="Gradient direction" options={GRADIENT_DIRECTIONS} value={gradientDirection} onChange={setGradientDirection} render={(o) => DIRECTION_LABELS[o]} />
        )}

        {(layout === "single" || layout === "icon") && anim.controls}
        {motion.controls}
    </PlaygroundLayout>
  );
}
