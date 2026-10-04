import { useState } from "react";
import { ErrorState } from "./ErrorState/ErrorState";
import { Button } from "./Buttons/Button";
import { Icon } from "./Icons/Icon";
import { ICON_NAMES } from "../../core/icons";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { cx } from "./playgroundUtils";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function ErrorStatePlayground() {
  const motion = useMotion({ hover: false });
  const [title, setTitle] = useState("Something went wrong");
  const [description, setDescription] = useState("We couldn't load your data. Please try again.");
  const [icon, setIcon] = useState("circle-x");
  const [iconFilter, setIconFilter] = useState("");
  const [showAction, setShowAction] = useState(false);

  const filteredIcons = iconFilter ? ICON_NAMES.filter((n) => n.includes(iconFilter.toLowerCase())) : ICON_NAMES;

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="min-h-[280px]">
        <ErrorState key={motion.replayKey} {...motion.props}
          title={title || "Something went wrong"}
          icon={icon}
          action={showAction ? <Button variant="destructive" icon="refresh-cw" label="Retry" /> : undefined}
        >
          {description || undefined}
        </ErrorState>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = title && title !== "Something went wrong" ? ` title="${title}"` : "";
  const iconAttr = icon !== "circle-x" ? ` icon="${icon}"` : "";
  const hasBody = Boolean(description) || showAction;

  // Self-closing when there's nothing to project (no description, no action) —
  // matches the "self-closing tag when there are no children" rule applied
  // consistently across every language variant below.
  const code = hasBody
    ? `<ErrorState${titleAttr}${iconAttr}${motion.attrs}${
        showAction
          ? `\n  action={<Button variant="destructive" icon="refresh-cw" label="Retry" onClick={handleRetry} />}`
          : ""
      }>${description ? `\n  ${description}\n` : "\n"}</ErrorState>`
    : `<ErrorState${titleAttr}${iconAttr}${motion.attrs} />`;

  const htmlMarkup = hasBody
    ? `<l-ErrorState${titleAttr}${iconAttr}${motion.attrs}>${description ? `\n  ${description}` : ""}${
        showAction ? `\n  <l-Button slot="action" variant="destructive" icon="refresh-cw" label="Retry" id="retry-btn" />` : ""
      }\n</l-ErrorState>`
    : `<l-ErrorState${titleAttr}${iconAttr}${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}${
      showAction
        ? `\n\n<script type="module">
  import "lojee-ui/elements";

  document.getElementById("retry-btn").addEventListener("click", () => {
    /* retry the request */
  });
</script>`
        : `\n\n<script type="module">import "lojee-ui/elements";</script>`
    }`,
    // Vue and Angular bind the click in the template — no element lookup by id.
    vue: htmlMarkup.replace(' id="retry-btn"', ' @click="retry()"'),
    angular: htmlMarkup.replace(' id="retry-btn"', ' (click)="retry()"'),
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="Something went wrong"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-border px-3 py-1.5 text-sm text-fg outline-none transition-colors focus:border-border-strong"
          placeholder="We couldn't load your data. Please try again."
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
        Show retry action
      </label>
      {motion.controls}
    </PlaygroundLayout>
  );
}
