import { useState } from "react";
import { Navbar, type NavbarVariant } from "./Navbar/Navbar";
import { Button } from "./Buttons/Button";
import { Avatar } from "./Avatar/Avatar";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import { isColorName, COLOR_HEX } from "../../core/tokens";
import type { CodeBlockVariants } from "./CodeBlock";

const VARIANTS: NavbarVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient", "glass"];

export default function NavbarPlayground() {
  const [brand, setBrand] = useState("Lojee");
  const [sticky, setSticky] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [variant, setVariant] = useState<NavbarVariant>("light");
  const [color, setColor] = useState<string>("slate");
  const [borderWidth, setBorderWidth] = useState(2);
  // Same "dark"/"gradient"/"glass" grouping as Sidebar's own `dark` flag (see Sidebar.tsx) — all three
  // sit on a dark-ish or already-colorful surface where the default slate-700 ghost-button text would
  // disappear, so the demo's own composed links need to switch to a light color too.
  const onDark = variant === "dark" || variant === "gradient" || variant === "glass";
  const linkClass = onDark ? "text-white/80 hover:text-white hover:bg-white/10" : undefined;
  // Only "bordered" has an adjustable border — "elevated" is shadow-only (see Navbar.tsx's
  // `hasAccentBorder`), so the border-thickness control has nothing to affect there.
  const showBorderWidthControl = variant === "bordered";
  // "minimal" has no chrome of its own by design (it's meant to blend into the page) — this wrapper is
  // purely so its boundary is visible in the playground UI, not something a real usage needs to
  // replicate (same purpose as SidebarPlayground's own `DOCK_CELL_CLASSES`).
  const previewWrapperClass = variant === "minimal" ? "bg-zinc-100 p-3" : undefined;

  const navbar = (
    <Navbar
      brand={brand ? <span className={onDark ? "text-white" : undefined}>{brand}</span> : undefined}
      sticky={sticky}
      bordered={bordered}
      variant={variant}
      color={color}
      borderWidth={borderWidth}
      actions={<Avatar initials="JD" size="sm" />}
    >
      <Button variant="ghost" label="Home" className={linkClass} />
      <Button variant="ghost" label="Products" className={linkClass} />
    </Navbar>
  );

  // Navbar docks to the top of a page — shown with scrollable content below
  // it so toggling `sticky` demonstrates something real: pinned in place vs.
  // scrolling away with the rest of the page.
  const preview = (
    <AppWindowFrame>
      <div className="h-56 overflow-y-auto bg-white">
        <div className={previewWrapperClass}>{navbar}</div>
        <div className="space-y-3 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <p key={i} className="text-sm text-slate-400">
              Scroll row {i + 1}
            </p>
          ))}
        </div>
      </div>
    </AppWindowFrame>
  );

  const brandAttr = brand ? ` brand="${brand}"` : "";
  const stickyAttr = sticky ? " sticky" : "";
  const borderedAttrJsx = bordered ? "" : " bordered={false}";
  const borderedAttrHtml = bordered ? "" : ` bordered="false"`;
  const variantAttr = variant !== "light" ? ` variant="${variant}"` : "";
  const colorAttr = color !== "slate" ? ` color="${color}"` : "";
  // Only meaningful for "bordered" — no point showing it in the sample for any other variant.
  const borderWidthAttrJsx = showBorderWidthControl && borderWidth !== 2 ? ` borderWidth={${borderWidth}}` : "";
  const borderWidthAttrHtml = showBorderWidthControl && borderWidth !== 2 ? ` border-width="${borderWidth}"` : "";

  const code = `<Navbar${brandAttr}${stickyAttr}${borderedAttrJsx}${variantAttr}${colorAttr}${borderWidthAttrJsx} actions={<Avatar initials="JD" size="sm" />}>
  <Button variant="ghost" label="Home" />
  <Button variant="ghost" label="Products" />
</Navbar>`;

  // Custom-element markup: `brand` stays a plain snapshot attribute (simple
  // text), while `actions` (an Avatar component) is projected as light-DOM
  // content via slot="actions" — same treatment NotificationShowcase.tsx
  // gives its `actions` prop.
  const htmlMarkup = `<l-Navbar${brandAttr}${stickyAttr}${borderedAttrHtml}${variantAttr}${colorAttr}${borderWidthAttrHtml}>
  <l-Button variant="ghost" label="Home" />
  <l-Button variant="ghost" label="Products" />
  <div slot="actions">
    <l-Avatar initials="JD" size="sm" />
  </div>
</l-Navbar>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Brand</span>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Lojee"
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
                since `Navbar`'s `color` prop accepts any CSS color value,
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
      <div className="flex items-center gap-4 sm:col-span-2">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={sticky} onChange={(e) => setSticky(e.target.checked)} />
          Sticky
        </label>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} />
          Bordered
        </label>
      </div>
    </PlaygroundLayout>
  );
}
