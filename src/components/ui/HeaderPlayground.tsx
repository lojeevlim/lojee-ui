import { useState } from "react";
import { Header } from "./Header/Header";
import { Button } from "./Buttons/Button";
import { PlaygroundLayout, AppWindowFrame } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function HeaderPlayground() {
  const [title, setTitle] = useState("Team settings");
  const [description, setDescription] = useState("Manage members, roles, and billing for your workspace.");
  const [showActions, setShowActions] = useState(true);

  // Header docks to the top of a page's own content area — shown here with
  // a little placeholder content below it so it reads as sitting above a
  // real page instead of floating on its own.
  const preview = (
    <AppWindowFrame>
      <div className="overflow-y-auto bg-white p-6" style={{ height: 280 }}>
        <Header
          title={title || "Team settings"}
          description={description || undefined}
          actions={
            showActions ? (
              <>
                <Button variant="outline" label="Import" />
                <Button label="New project" />
              </>
            ) : undefined
          }
        />
        <div className="mt-6 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-200 text-sm text-slate-300">
          Page content
        </div>
      </div>
    </AppWindowFrame>
  );

  const titleValue = title || "Team settings";
  const descriptionAttr = description ? `\n  description="${description}"` : "";

  const code = `<Header
  title="${titleValue}"${descriptionAttr}${
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
    ? `<l-Header heading="${titleValue}"${descriptionAttr}>
  <div slot="actions">
    <l-Button variant="outline" label="Import" />
    <l-Button label="New project" />
  </div>
</l-Header>`
    : `<l-Header heading="${titleValue}"${descriptionAttr} />`;

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
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showActions} onChange={(e) => setShowActions(e.target.checked)} />
        Show actions
      </label>
    </PlaygroundLayout>
  );
}
