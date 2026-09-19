import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "../../../core/tokens";
import { Icon } from "../Icons/Icon";

export interface CommandMenuItem {
  label: string;
  icon?: string;
  /** Display-only text, e.g. "⌘K" — not wired to an actual keyboard shortcut. */
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  items: CommandMenuItem[];
  placeholder?: string;
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

  const filtered = query
    ? items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
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
          "relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5",
          classNames?.panel
        )}
      >
        <span className="relative flex w-full items-center border-b border-slate-200 px-4 py-3">
          <Icon name="search" size={16} className={cx("pointer-events-none mr-2 shrink-0 text-slate-400", classNames?.icon)} />
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
              "w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none",
              classNames?.input
            )}
          />
        </span>

        <div role="listbox" className={cx("max-h-80 overflow-y-auto py-2", classNames?.list)}>
          {filtered.length === 0 && (
            <div className={cx("px-4 py-6 text-center text-sm text-slate-400", classNames?.empty)}>No results found.</div>
          )}
          {filtered.map((item, i) => (
            <button
              key={item.label}
              type="button"
              role="option"
              aria-selected={i === safeHighlighted}
              aria-disabled={item.disabled}
              disabled={item.disabled}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => selectItem(item)}
              className={cx(
                "flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-slate-700 disabled:cursor-not-allowed disabled:opacity-40",
                i === safeHighlighted && "bg-slate-100",
                i === safeHighlighted && classNames?.activeItem,
                classNames?.item
              )}
            >
              {item.icon && <Icon name={item.icon} size={16} className="shrink-0 text-slate-500" />}
              <span className="flex-1 truncate">{item.label}</span>
              {item.shortcut && <span className="text-xs text-slate-400">{item.shortcut}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
