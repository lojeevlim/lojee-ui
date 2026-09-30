import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface CommandMenuItem {
  label: string;
  /** Stable key when labels can repeat (default: the label). */
  id?: string;
  /** Secondary text shown after the label (e.g. the group an item belongs to) — also searchable. */
  description?: string;
  /** Extra search terms that match this item without being displayed. */
  keywords?: string[];
  icon?: string;
  /** Display-only text, e.g. "⌘K" — not wired to an actual keyboard shortcut. */
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  /** Whether the command palette is visible (controlled); nothing is rendered when false, and the search resets each time it opens. */
  open: boolean;
  /** Called with no arguments when the menu should close: on Escape, on backdrop click, or after an item is selected. */
  onClose: () => void;
  /** The commands to list; typing filters them by label, description and keywords, and Enter runs the highlighted one. */
  items: CommandMenuItem[];
  /** Placeholder text of the search input (default: "Type a command or search…"). */
  placeholder?: string;
  /** Extra class names applied to the root overlay element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    overlay?: string;
    panel?: string;
    input?: string;
    icon?: string;
    list?: string;
    item?: string;
    activeItem?: string;
    empty?: string;
  };
}

export function CommandMenu({
  open,
  onClose,
  items,
  placeholder = "Type a command or search…",
  className,
  classNames,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Reset the search + highlight whenever `open` flips from false to true,
  // via React's "adjusting state during render" pattern (same technique as
  // Combobox's `syncedValue`) rather than an effect, which would set state
  // synchronously on mount/every open change and trigger an extra render.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setQuery("");
      setHighlightedIndex(0);
    }
  }

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((item) =>
        [item.label, item.description, ...(item.keywords ?? [])].some((text) => text?.toLowerCase().includes(q))
      )
    : items;
  const safeHighlighted = filtered.length ? Math.min(highlightedIndex, filtered.length - 1) : 0;

  const selectItem = (item: CommandMenuItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (filtered.length ? (Math.min(i, filtered.length - 1) + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) =>
        filtered.length ? (Math.min(i, filtered.length - 1) - 1 + filtered.length) % filtered.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[safeHighlighted];
      if (item) selectItem(item);
    }
  };

  return (
    <div
      className={cx("fixed inset-0 z-[100] flex justify-center p-4 pt-[15vh]", className, classNames?.root)}
      role="dialog"
      aria-modal="true"
    >
      <div className={cx("absolute inset-0 bg-black/40 backdrop-blur-sm", classNames?.overlay)} onClick={onClose} />
      <div
        className={cx(
          "relative w-full max-w-lg overflow-hidden rounded-xl bg-surface shadow-2xl ring-1 ring-black/5",
          classNames?.panel
        )}
      >
        <span className="relative flex w-full items-center border-b border-border px-4 py-3">
          <Icon name="search" size={16} className={cx("pointer-events-none mr-2 shrink-0 text-fg-subtle", classNames?.icon)} />
          <input
            type="text"
            autoFocus
            value={query}
            placeholder={placeholder}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className={cx(
              "w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle outline-none",
              classNames?.input
            )}
          />
        </span>

        <div role="listbox" className={cx("max-h-80 overflow-y-auto py-2", classNames?.list)}>
          {filtered.length === 0 && (
            <div className={cx("px-4 py-6 text-center text-sm text-fg-subtle", classNames?.empty)}>No results found.</div>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.id ?? item.label}
              type="button"
              role="option"
              ref={(el) => {
                if (el && i === safeHighlighted) el.scrollIntoView({ block: "nearest" });
              }}
              aria-selected={i === safeHighlighted}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => selectItem(item)}
              className={cx(
                "flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-fg-muted disabled:cursor-not-allowed disabled:opacity-40",
                i === safeHighlighted && "bg-surface-muted",
                i === safeHighlighted && classNames?.activeItem,
                classNames?.item
              )}
            >
              {item.icon && <Icon name={item.icon} size={16} className="shrink-0 text-fg-subtle" />}
              <span className="flex-1 truncate">{item.label}</span>
              {item.description && <span className="shrink-0 text-xs text-fg-subtle">{item.description}</span>}
              {item.shortcut && <span className="text-xs text-fg-subtle">{item.shortcut}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
