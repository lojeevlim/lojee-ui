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
  type ColorName,
  type ButtonVariant,
  type Size,
  type Shape,
} from "./Buttons";
import { OptionGroup, ColorSwatches, CodeBar } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: ButtonVariant[] = ["solid", "outline", "ghost", "soft", "link", "dashed", "gradient", "glass"];
const SIZES: Size[] = ["xs", "sm", "md", "lg", "xl", "full"];
const SHAPES: Shape[] = ["default", "pill", "square"];
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
  const [variant, setVariant] = useState<ButtonVariant>("solid");
  const [color, setColor] = useState<ColorName>("slate");
  const [gradientTo, setGradientTo] = useState<ColorName>("violet");
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
        <ButtonGroup shape={shape}>
          <SegmentButton active color={color}>
            {label || "One"}
          </SegmentButton>
          <SegmentButton color={color}>Two</SegmentButton>
          <SegmentButton color={color}>Three</SegmentButton>
        </ButtonGroup>
      );
    }
    if (layout === "split") {
      return (
        <SplitButton
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
        variant={variant}
        color={color}
        gradientTo={variant === "gradient" ? gradientTo : undefined}
        size={size}
        shape={shape}
        icon={iconKey}
        iconPosition={iconPosition}
        label={label || "Button"}
      />
    );
  })();

  const code = (() => {
    if (layout === "icon") {
      return `<Button icon="${iconKey}" iconOnly variant="${variant}" color="${color}" size="${size}"${
        shape !== "default" ? ` shape="${shape}"` : ""
      } label="${label || "Icon button"}" />`;
    }
    if (layout === "group") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const colorAttr = color !== "slate" ? ` color="${color}"` : "";
      return `<ButtonGroup${shapeAttr}>\n  <SegmentButton active${colorAttr}>${label || "One"}</SegmentButton>\n  <SegmentButton${colorAttr}>Two</SegmentButton>\n  <SegmentButton${colorAttr}>Three</SegmentButton>\n</ButtonGroup>`;
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
        return `<SplitButton\n  icon="check"\n  label="${label || "Approve"}"\n  color="${color}"\n  size="${size}"${shapeAttr}${menuIconAttr}\n>\n${itemsCode}\n</SplitButton>`;
      }
      return `<SplitButton icon="check" label="${label || "Approve"}" color="${color}" size="${size}"${shapeAttr}${menuIconAttr} />`;
    }
    return `<Button variant="${variant}" color="${color}"${
      variant === "gradient" ? ` gradientTo="${gradientTo}"` : ""
    } size="${size}"${shape !== "default" ? ` shape="${shape}"` : ""} icon="${iconKey}"${
      iconPosition === "right" ? ` iconPosition="right"` : ""
    } label="${label}" />`;
  })();

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = (() => {
    if (layout === "icon") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      return `<Button icon="${iconKey}" iconOnly variant="${variant}" color="${color}" size="${size}"${shapeAttr} label="${label || "Icon button"}" />`;
    }
    if (layout === "group") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const colorAttr = color !== "slate" ? ` color="${color}"` : "";
      return `<ButtonGroup${shapeAttr}>\n  <SegmentButton active${colorAttr}>${label || "One"}</SegmentButton>\n  <SegmentButton${colorAttr}>Two</SegmentButton>\n  <SegmentButton${colorAttr}>Three</SegmentButton>\n</ButtonGroup>`;
    }
    if (layout === "split") {
      const shapeAttr = shape !== "default" ? ` shape="${shape}"` : "";
      const menuIconAttr = menuIconKey !== "chevron-down" ? ` menuIcon="${menuIconKey}"` : "";
      if (menuItems.length > 0) {
        const itemsCode = menuItems
          .map((item) => {
            const iconAttr = item.icon ? ` icon="${item.icon}"` : "";
            return `  <SplitButtonMenuItem${iconAttr}>${item.label}</SplitButtonMenuItem>`;
          })
          .join("\n");
        return `<SplitButton\n  icon="check"\n  label="${label || "Approve"}"\n  color="${color}"\n  size="${size}"${shapeAttr}${menuIconAttr}\n>\n${itemsCode}\n</SplitButton>`;
      }
      return `<SplitButton icon="check" label="${label || "Approve"}" color="${color}" size="${size}"${shapeAttr}${menuIconAttr} />`;
    }
    return `<Button variant="${variant}" color="${color}"${
      variant === "gradient" ? ` gradientTo="${gradientTo}"` : ""
    } size="${size}"${shape !== "default" ? ` shape="${shape}"` : ""} icon="${iconKey}"${
      iconPosition === "right" ? ` iconPosition="right"` : ""
    } label="${label}" />`;
  })();

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Live preview */}
      <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-10">
        {preview}
      </div>

      {/* Controls */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-medium text-slate-500">Label</span>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
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
                setGradientTo((prev) => (defaultGradientPartner[color] as ColorName) ?? prev);
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

        {(layout === "single" || layout === "icon") && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-500">Icon</span>
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
                    iconKey === key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        {layout === "single" && (
          <OptionGroup label="Icon position" options={["left", "right"] as const} value={iconPosition} onChange={setIconPosition} />
        )}

        <OptionGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />

        {layout === "split" && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-500">Dropdown icon</span>
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
                    menuIconKey === key ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
            <span className="mb-1.5 block text-xs font-medium text-slate-500">Dropdown menu items</span>
            {menuItems.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {menuItems.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 py-1 pr-1 pl-2.5 text-xs font-medium text-slate-700"
                  >
                    {item.label}
                    <button
                      type="button"
                      onClick={() => removeMenuItem(i)}
                      aria-label={`Remove ${item.label}`}
                      className="rounded p-0.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
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
                className="flex-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-slate-400"
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

        <ColorSwatches
          label={layout === "single" && variant === "gradient" ? "From color" : "Color"}
          value={color}
          onChange={setColor}
        />

        {layout === "single" && variant === "gradient" && (
          <ColorSwatches label="To color" value={gradientTo} onChange={setGradientTo} />
        )}
      </div>

      <CodeBar variants={codeVariants} />
    </div>
  );
}
