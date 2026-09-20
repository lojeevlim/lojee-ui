import { useState } from "react";
import { Notification } from "./Notification/Notification";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

export default function NotificationPlayground() {
  const [title, setTitle] = useState("New comment");
  const [description, setDescription] = useState("Alex left a comment on your document.");
  const [timestamp, setTimestamp] = useState("2m ago");
  const [unread, setUnread] = useState(false);
  const [dismissible, setDismissible] = useState(false);
  const [visible, setVisible] = useState(true);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        {visible ? (
          <Notification
            title={title || "New comment"}
            timestamp={timestamp || undefined}
            unread={unread}
            onDismiss={dismissible ? () => setVisible(false) : undefined}
          >
            {description || "Alex left a comment on your document."}
          </Notification>
        ) : (
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-700"
          >
            Show notification again
          </button>
        )}
      </AppWindowBody>
    </AppWindowFrame>
  );

  const titleAttr = ` title="${title || "New comment"}"`;
  const timestampAttr = timestamp ? ` timestamp="${timestamp}"` : "";
  const unreadAttr = unread ? " unread" : "";
  const body = description || "Alex left a comment on your document.";

  const code = `<Notification${titleAttr}${timestampAttr}${unreadAttr}${dismissible ? "\n  onDismiss={() => setVisible(false)}" : ""}>
  ${body}
</Notification>`;

  const htmlMarkup = `<Notification${titleAttr}${timestampAttr}${unreadAttr}>\n  ${body}\n</Notification>`;

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
          placeholder="New comment"
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Description</span>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="Alex left a comment on your document."
        />
      </div>
      <div className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Timestamp</span>
        <input
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value)}
          className="w-full rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-900 outline-none transition-colors focus:border-slate-400"
          placeholder="2m ago"
        />
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Unread</span>
        <button
          type="button"
          onClick={() => setUnread((v) => !v)}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (unread ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {unread ? "On" : "Off"}
        </button>
      </div>
      <div>
        <span className="mb-1.5 block text-xs font-medium text-slate-500">Dismissible</span>
        <button
          type="button"
          onClick={() => {
            setDismissible((v) => !v);
            setVisible(true);
          }}
          className={
            "rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors " +
            (dismissible ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
          }
        >
          {dismissible ? "On" : "Off"}
        </button>
      </div>
    </PlaygroundLayout>
  );
}
