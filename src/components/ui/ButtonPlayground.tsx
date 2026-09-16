import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Copy, Check, Plus, Settings, Mail, Bell, Download, ArrowRight } from "lucide-react";
import {
  Button,
  SplitButton,
  ButtonGroup,
  SegmentButton,
  COLORS,
  defaultGradientPartner,
  type ColorName,
  type ButtonVariant,
  type Size,
  type Shape,
} from "./Buttons";

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

const swatchClasses: Record<ColorName, string> = {
  slate: "bg-slate-500",
  gray: "bg-gray-500",
  indigo: "bg-indigo-500",
  violet: "bg-violet-500",
  blue: "bg-blue-500",
  cyan: "bg-cyan-500",
  emerald: "bg-emerald-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  orange: "bg-orange-500",
  rose: "bg-rose-500",
  pink: "bg-pink-500",
};

function cx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  render?: (option: T) => React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-slate-500">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cx(
              "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors",
              value === option ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {render ? render(option) : option}
          </button>
        ))}
      </div>
    </div>
  );
}

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
  const [copied, setCopied] = useState(false);

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
        <ButtonGroup>
          <SegmentButton active>{label || "One"}</SegmentButton>
          <SegmentButton>Two</SegmentButton>
          <SegmentButton>Three</SegmentButton>
        </ButtonGroup>
      );
    }
    if (layout === "split") {
      return <SplitButton icon="check" label={label || "Approve"} color={color} size={size} />;
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
      return `<ButtonGroup>\n  <SegmentButton active>${label || "One"}</SegmentButton>\n  <SegmentButton>Two</SegmentButton>\n  <SegmentButton>Three</SegmentButton>\n</ButtonGroup>`;
    }
    if (layout === "split") {
      return `<SplitButton icon="check" label="${label || "Approve"}" color="${color}" size="${size}" />`;
    }
    return `<Button variant="${variant}" color="${color}"${
      variant === "gradient" ? ` gradientTo="${gradientTo}"` : ""
    } size="${size}"${shape !== "default" ? ` shape="${shape}"` : ""} icon="${iconKey}"${
      iconPosition === "right" ? ` iconPosition="right"` : ""
    } label="${label}" />`;
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable in this context — silently ignore */
    }
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

        {(layout === "single" || layout === "icon" || layout === "split") && (
          <OptionGroup label="Shape" options={SHAPES} value={shape} onChange={setShape} />
        )}

        {layout !== "group" && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-500">
              {layout === "single" && variant === "gradient" ? "From color" : "Color"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.base}
                  type="button"
                  onClick={() => setColor(c.base)}
                  aria-label={c.name}
                  title={c.name}
                  className={cx(
                    "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
                    swatchClasses[c.base],
                    color === c.base ? "scale-110 ring-slate-900" : "ring-transparent hover:scale-105"
                  )}
                />
              ))}
            </div>
          </div>
        )}

        {layout === "single" && variant === "gradient" && (
          <div>
            <span className="mb-1.5 block text-xs font-medium text-slate-500">To color</span>
            <div className="flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.base}
                  type="button"
                  onClick={() => setGradientTo(c.base)}
                  aria-label={c.name}
                  title={c.name}
                  className={cx(
                    "h-6 w-6 rounded-full ring-2 ring-offset-2 transition-transform",
                    swatchClasses[c.base],
                    gradientTo === c.base ? "scale-110 ring-slate-900" : "ring-transparent hover:scale-105"
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code + copy — pinned to the bottom of the modal */}
      <div className="sticky bottom-0 -mx-6 -mb-6 mt-2 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="relative rounded-lg bg-slate-900 p-4 pr-24">
          <pre className="overflow-x-auto text-xs leading-relaxed text-slate-100">
            <code>{code}</code>
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
