import { useState } from "react";
import { Header, type HeaderVariant } from "./Header/Header";
import { Button } from "./Buttons/Button";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { isColorName, COLOR_HEX } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: HeaderVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient", "glass"];

export default function HeaderPlayground() {
  const [title, setTitle] = useState("Team settings");
  const [description, setDescription] = useState("Manage members, roles, and billing for your workspace.");
  const [showActions, setShowActions] = useState(true);
  const [variant, setVariant] = useState<HeaderVariant>("light");
  const [color, setColor] = useState<string>("slate");
  const [borderWidth, setBorderWidth] = useState(2);
  // Only "bordered" has an adjustable border — "elevated" is shadow-only (see Header.tsx's
  // `hasAccentBorder`), so the border-thickness control has nothing to affect there.
  const showBorderWidthControl = variant === "bordered";
  // "minimal" has no chrome of its own by design (it's meant to blend into the page) — this wrapper is
  // purely so its boundary is visible in the playground UI, not something a real usage needs to
  // replicate (same purpose as SidebarPlayground's/NavbarPlayground's own wrapper).
  const previewWrapperClass = variant === "minimal" ? "bg-zinc-100 p-3" : undefined;
  // Same "dark"/"gradient"/"glass" grouping as Sidebar's own `dark` flag / NavbarPlayground's `onDark`
  // — all three sit on a dark-ish or already-colorful surface where the outline button's default
  // `text-slate-900`/`border-slate-300` (built for a light background) would be unreadable, so it
  // needs to switch to a light color too. The solid "New project" button doesn't need this — its fixed
  // `bg-slate-900`/`text-white` fill already reads fine against any of these.
  const onDark = variant === "dark" || variant === "gradient" || variant === "glass";
  const importButtonClass = onDark ? "border-white/30 text-white hover:bg-white/10" : undefined;

  const titleValue = title || "Team settings";

  // Header docks to the top of a page's own content area — shown here with
  // a little placeholder content below it so it reads as sitting above a
  // real page instead of floating on its own.
  const preview = (
    <AppWindowFrame>
      <div className="overflow-y-auto bg-white p-6" style={{ height: 280 }}>
        <div className={previewWrapperClass}>
          <Header
            title={titleValue}
            description={description || undefined}
            variant={variant}
            color={color}
            borderWidth={borderWidth}
            actions={
              showActions ? (
                <>
                  <Button variant="outline" label="Import" className={importButtonClass} />
                  <Button label="New project" />
                </>
              ) : undefined
            }
          />
        </div>
        <div className="mt-6 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300">
          Page content
        </div>
      </div>
    </AppWindowFrame>
  );

  const descriptionAttr = description ? `\n  description="${description}"` : "";
  const variantAttr = variant !== "light" ? `\n  variant="${variant}"` : "";
  const colorAttr = color !== "slate" ? `\n  color="${color}"` : "";
  // Only meaningful for "bordered" — no point showing it in the sample for any other variant.
  const borderWidthAttrJsx = showBorderWidthControl && borderWidth !== 2 ? `\n  borderWidth={${borderWidth}}` : "";
  const borderWidthAttrHtml = showBorderWidthControl && borderWidth !== 2 ? `\n  border-width="${borderWidth}"` : "";
  const variantAttrHtml = variant !== "light" ? `\n  variant="${variant}"` : "";

  const code = `<Header
  title="${titleValue}"${descriptionAttr}${variantAttr}${colorAttr}${borderWidthAttrJsx}${
    showActions
      ? `
  actions={
    <>
      <Button variant="outline" label="Import" />
      <Button label="New project" />
    </>
  }`
      : ""
  }
/>`;

  // Header's `title` collides with the native HTML `title` (tooltip)
  // attribute, so the custom element exposes it as `heading` instead — same
  // treatment ModalShowcase.tsx/AlertDialogShowcase.tsx give their `title`
  // prop. `actions` is projected as light-DOM content via slot="actions".
  const htmlMarkup = showActions
    ? `<l-Header heading="${titleValue}"${descriptionAttr}${variantAttrHtml}${colorAttr}${borderWidthAttrHtml}>
  <div slot="actions">
    <l-Button variant="outline" label="Import" />
    <l-Button label="New project" />
  </div>
</l-Header>`
    : `<l-Header heading="${titleValue}"${descriptionAttr}${variantAttrHtml}${colorAttr}${borderWidthAttrHtml} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Team settings"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Manage members, roles, and billing for your workspace."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {showBorderWidthControl && (
        <div>
          <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500">
            Border thickness (px)
            <span className="text-slate-700">{borderWidth}</span>
          </span>
          <input
            type="range"
            value={borderWidth}
            onChange={(e) => setBorderWidth(Number(e.target.value))}
            className="w-full accent-slate-900"
            min={1}
            max={12}
          />
        </div>
      )}
      <ColorSwatches
        // Only ever reflects a *named* selection back onto the fixed swatch
        // row — a custom color from the wheel below naturally shows none of
        // them as selected, which is the correct state (it isn't one of them).
        value={isColorName(color) ? color : "slate"}
        onChange={setColor}
        actions={
          <label
            className="flex cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            title="Pick a custom color — not limited to the swatches above"
          >
            {/* A real color wheel: whatever hue the user picks is used
                exactly as-is (no snapping to the nearest built-in swatch),
                since `Header`'s `color` prop accepts any CSS color value,
                not just a ColorName. The input itself is invisible and
                overlaid on a swatch showing the current color, since native
                color inputs can't otherwise be restyled to match the
                swatches above it. */}
            <span
              className="relative flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-black/10"
              style={{ backgroundColor: isColorName(color) ? COLOR_HEX[color] : color }}
            >
              <input
                type="color"
                value={isColorName(color) ? COLOR_HEX[color] : color}
                onChange={(e) => setColor(e.target.value)}
                aria-label="Pick a custom color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </span>
            Custom
          </label>
        }
      />
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} />
        Show actions
      </label>
    </PlaygroundLayout>
  );
}
