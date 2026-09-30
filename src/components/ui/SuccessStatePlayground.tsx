import { useState } from "react";
import { SuccessState } from "./SuccessState/SuccessState";
import { Button } from "./Buttons/Button";
import { Icon } from "./Icons/Icon";
import { ICON_NAMES } from "../../core/icons";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";
import type { CodeBlockVariants } from "./CodeBlock";

export default function SuccessStatePlayground() {
  const [title, setTitle] = useState("Success!");
  const [description, setDescription] = useState("Your changes have been saved and applied.");
  const [icon, setIcon] = useState("circle-check");
  const [iconFilter, setIconFilter] = useState("");
  const [showAction, setShowAction] = useState(false);

  const filteredIcons = iconFilter ? ICON_NAMES.filter((n) => n.includes(iconFilter.toLowerCase())) : ICON_NAMES;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px]">
        <SuccessState title={title || "Success!"} icon={icon} action={showAction ? <Button label="Continue" /> : undefined}>
          {description || undefined}
        </SuccessState>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title && title !== "Success!" ? ` title="${title}"` : "";
  const iconAttr = icon !== "circle-check" ? ` icon="${icon}"` : "";
  const hasBody = Boolean(description) || showAction;

  // Self-closing when there's nothing to project (no description, no action) —
  // matches the "self-closing tag when there are no children" rule applied
  // consistently across every language variant below.
  const code = hasBody
    ? `<SuccessState${titleAttr}${iconAttr}${
        showAction ? `\n  action={<Button label="Continue" onClick={handleContinue} />}` : ""
      }>${description ? `\n  ${description}\n` : "\n"}</SuccessState>`
    : `<SuccessState${titleAttr}${iconAttr} />`;

  const htmlMarkup = hasBody
    ? `<l-SuccessState${titleAttr}${iconAttr}>${description ? `\n  ${description}` : ""}${
        showAction ? `\n  <l-Button slot="action" label="Continue" id="continue-btn" />` : ""
      }\n</l-SuccessState>`
    : `<l-SuccessState${titleAttr}${iconAttr} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}${
      showAction
        ? `\n\n<script type="module">
  import "lojee-ui/elements";

  document.getElementById("continue-btn").addEventListener("click", () => {
    /* proceed */
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
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Success!"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Your changes have been saved and applied."
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">
          Icon ({filteredIcons.length} of {ICON_NAMES.length})
        </span>
        <input
          value={iconFilter}
          onChange={(e) => setIconFilter(e.target.value)}
          placeholder="Filter by name…"
          className="mb-2 w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
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
                icon === n ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border"
              )}
            >
              <Icon name={n} size={16} />
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-xs font-medium text-fg-subtle">
        <input type="checkbox" checked={showAction} onChange={(e) => setShowAction(e.target.checked)} />
        Show action button
      </label>
    </PlaygroundLayout>
  );
}
