import { useState } from "react";
import { EmptyState } from "./EmptyState/EmptyState";
import { Button } from "./Buttons/Button";
import { Icon } from "./Icons/Icon";
import { ICON_NAMES } from "../../core/icons";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";
import type { CodeBlockVariants } from "./CodeBlock";

export default function EmptyStatePlayground() {
  const [title, setTitle] = useState("No items yet");
  const [description, setDescription] = useState("Get started by creating your first item.");
  const [icon, setIcon] = useState("folder");
  const [iconFilter, setIconFilter] = useState("");
  const [showAction, setShowAction] = useState(false);

  const filteredIcons = iconFilter ? ICON_NAMES.filter((n) => n.includes(iconFilter.toLowerCase())) : ICON_NAMES;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px]">
        <EmptyState title={title || "No items yet"} icon={icon} action={showAction ? <Button label="Add item" /> : undefined}>
          {description || undefined}
        </EmptyState>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const iconAttr = icon !== "folder" ? ` icon="${icon}"` : "";
  const titleAttr = `title="${title || "No items yet"}"`;
  const hasBody = Boolean(description) || showAction;

  // Self-closing when there's nothing to project (no description, no action) —
  // matches the "self-closing tag when there are no children" rule applied
  // consistently across every language variant below.
  const code = hasBody
    ? `<EmptyState ${titleAttr}${iconAttr}${
        showAction ? `\n  action={<Button label="Add item" onClick={handleAdd} />}` : ""
      }>${description ? `\n  ${description}\n` : "\n"}</EmptyState>`
    : `<EmptyState ${titleAttr}${iconAttr} />`;

  const htmlMarkup = hasBody
    ? `<EmptyState ${titleAttr}${iconAttr}>${description ? `\n  ${description}` : ""}${
        showAction ? `\n  <Button slot="action" label="Add item" id="add-item-btn" />` : ""
      }\n</EmptyState>`
    : `<EmptyState ${titleAttr}${iconAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}${
      showAction
        ? `\n\n<script type="module">
  import "lojee-ui/elements";

  document.getElementById("add-item-btn").addEventListener("click", () => {
    /* create item */
  });
</script>`
        : `\n\n<script type="module">import "lojee-ui/elements";</script>`
    }`,
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
          placeholder="No items yet"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Get started by creating your first item."
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">
          Icon ({filteredIcons.length} of {ICON_NAMES.length})
        </span>
        <input
          value={iconFilter}
          onChange={(e) => setIconFilter(e.target.value)}
          placeholder="Filter by name…"
          className="mb-2 w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
        />
        <div className="grid max-h-40 grid-cols-6 gap-1.5 overflow-y-auto sm:grid-cols-10">
          {filteredIcons.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setIcon(n)}
              title={n}
              className={cx(
                "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                icon === n ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <Icon name={n} size={16} />
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <input type="checkbox" checked={showAction} onChange={(e) => setShowAction(e.target.checked)} />
        Show action button
      </label>
    </PlaygroundLayout>
  );
}
