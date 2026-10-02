import { useState } from "react";
import { PREVIEW_PAGE_BG } from "./playgroundUtils";
import { Header, type HeaderVariant } from "./Header/Header";
import { Button } from "./Buttons/Button";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const VARIANTS: HeaderVariant[] = ["light", "dark", "bordered", "elevated", "minimal", "gradient", "glass"];

export default function HeaderPlayground() {
  const motion = useMotion({ hover: false });
  const [title, setTitle] = useState("Team settings");
  const [description, setDescription] = useState("Manage members, roles, and billing for your workspace.");
  const [showActions, setShowActions] = useState(true);
  const [variant, setVariant] = useState<HeaderVariant>("light");
  const [color, setColor] = useState<string>("accent");
  const [borderWidth, setBorderWidth] = useState(2);
  // Only "bordered" has an adjustable border — "elevated" is shadow-only (see Header.tsx's
  // `hasAccentBorder`), so the border-thickness control has nothing to affect there.
  const showBorderWidthControl = variant === "bordered";
  // "minimal" has no chrome of its own by design (it's meant to blend into the page) — this wrapper is
  // purely so its boundary is visible in the playground UI, not something a real usage needs to
  // replicate (same purpose as SidebarPlayground's/NavbarPlayground's own wrapper).
  const previewWrapperClass = variant === "minimal" ? "bg-surface-muted p-3" : undefined;
  // Same "dark"/"gradient"/"glass" grouping as Sidebar's own `dark` flag / NavbarPlayground's `onDark`
  // — all three sit on a dark-ish or already-colorful surface where the outline button's default
  // `text-fg`/`border-border-strong` (built for a light background) would be unreadable, so it
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
      <div className="flex min-h-[280px] flex-1 flex-col overflow-y-auto">
        {/* The header sits at the top on the plain page surface, with the rest of the page (tinted by the theme) below it. */}
        <div className="bg-surface px-6 pt-5">
          <div className={previewWrapperClass}>
            <Header
              key={motion.replayKey}
              {...motion.props}
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
        </div>
        <div className={`flex-1 ${PREVIEW_PAGE_BG} p-6`}>
          <div className="flex h-full min-h-28 items-center justify-center rounded-xl border border-dashed border-border text-sm text-fg-subtle">
            Page content
          </div>
        </div>
      </div>
    </AppWindowFrame>
  );

  const descriptionAttr = description ? `\n  description="${description}"` : "";
  const variantAttr = variant !== "light" ? `\n  variant="${variant}"` : "";
  const colorAttr = color !== "accent" ? `\n  color="${color}"` : "";
  // Only meaningful for "bordered" — no point showing it in the sample for any other variant.
  const borderWidthAttrJsx = showBorderWidthControl && borderWidth !== 2 ? `\n  borderWidth={${borderWidth}}` : "";
  const borderWidthAttrHtml = showBorderWidthControl && borderWidth !== 2 ? `\n  border-width="${borderWidth}"` : "";
  // Each motion attribute on its own line, like the others here.
  const motionAttr = motion.attrs.replace(/ (?=\w+=)/g, "\n  ");
  const variantAttrHtml = variant !== "light" ? `\n  variant="${variant}"` : "";

  const code = `<Header
  title="${titleValue}"${descriptionAttr}${variantAttr}${colorAttr}${borderWidthAttrJsx}${motionAttr}${
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
    ? `<l-Header heading="${titleValue}"${descriptionAttr}${variantAttrHtml}${colorAttr}${borderWidthAttrHtml}${motionAttr}>
  <div slot="actions">
    <l-Button variant="outline" label="Import" />
    <l-Button label="New project" />
  </div>
</l-Header>`
    : `<l-Header heading="${titleValue}"${descriptionAttr}${variantAttrHtml}${colorAttr}${borderWidthAttrHtml}${motionAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Team settings"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Manage members, roles, and billing for your workspace."
        />
      </div>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      {showBorderWidthControl && (
        <div>
          <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-fg-subtle">
            Border thickness (px)
            <span className="text-fg-muted">{borderWidth}</span>
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
      <ColorSwatches value={color} onChange={setColor} custom />
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} />
        Show actions
      </label>
      {motion.controls}
    </PlaygroundLayout>
  );
}
