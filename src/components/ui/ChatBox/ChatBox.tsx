import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUp, Check, Copy, Sparkles, User } from "lucide-react";
import { colorClasses, cx, nonInteractive, type ColorName } from "../../../core/tokens";
import { motionClass, motionStyle, type TransitionVariant } from "../../../core/motion";
import { Thinking, type ThinkingVariant } from "../Thinking/Thinking";
import { highlightCode } from "../../../core/highlightCode";

export type ChatRole = "user" | "assistant" | "system";
export type ChatBoxVariant = "bubble" | "outline" | "flat" | "compact";

/** A syntax-highlighted code block with a language label and a copy button — used for ```fenced``` code inside chat messages. */
export function ChatCodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className="my-2 overflow-hidden rounded-lg border border-border bg-surface text-left whitespace-normal">
      <div className="flex items-center justify-between border-b border-border bg-surface-muted px-2.5 py-1">
        <span className="font-mono text-[10px] uppercase tracking-wide text-fg-subtle">{lang || "code"}</span>
        <button type="button" onClick={copy} aria-label="Copy code" className="flex items-center gap-1 rounded px-1 py-0.5 text-[11px] text-fg-subtle transition-colors hover:text-fg">
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap p-2.5 font-mono text-xs leading-relaxed text-fg [overflow-wrap:anywhere]">
        <code>{highlightCode(code)}</code>
      </pre>
    </div>
  );
}

/** Message text with ```fenced``` code blocks highlighted and `inline code` styled; anything that isn't a string is shown as is. */
function MessageContent({ content }: { content: ReactNode }) {
  if (typeof content !== "string" || !content.includes("`")) return <>{content}</>;
  const parts: ReactNode[] = [];
  const fence = /```([\w+-]*)[ \t]*\n?([\s\S]*?)(?:```|$)/g;
  let last = 0;
  let key = 0;
  const inline = (text: string) =>
    text.split(/(`[^`\n]+`)/g).map((seg, i) =>
      seg.length > 2 && seg.startsWith("`") && seg.endsWith("`") ? (
        <code key={`${key}-${i}`} className="rounded bg-surface px-1 py-0.5 font-mono text-[0.85em]">
          {seg.slice(1, -1)}
        </code>
      ) : (
        seg
      )
    );
  for (const m of content.matchAll(fence)) {
    const start = m.index ?? 0;
    if (start > last) parts.push(<span key={`t${key++}`}>{inline(content.slice(last, start))}</span>);
    parts.push(<ChatCodeBlock key={`c${key++}`} code={m[2].replace(/\n$/, "")} lang={m[1]} />);
    last = start + m[0].length;
  }
  if (last < content.length) parts.push(<span key={`t${key++}`}>{inline(content.slice(last))}</span>);
  return <>{parts}</>;
}

export interface ChatMessage {
  /** Unique key for the message. */
  id: string | number;
  /** Who wrote it: "user" (right, accent bubble), "assistant" (left, gray bubble) or "system" (centered note). */
  role: ChatRole;
  /** The message text (or any content in React). */
  content: ReactNode;
  /** Sender name shown above the bubble. */
  name?: string;
  /** Time label shown beside the name, e.g. "10:42". */
  time?: string;
}

export interface ChatBoxProps {
  /** Look of the thread: "bubble" (filled chat bubbles), "outline" (outlined bubbles), "flat" (full-width rows, assistant rows tinted — like an AI assistant page) or "compact" (small text, tight spacing, no avatars) (default: "bubble"). */
  variant?: ChatBoxVariant;
  /** Messages to show (controlled) — add the user's message yourself in `onSend`. Omit to let the ChatBox keep its own list, seeded from `defaultMessages`. */
  messages?: ChatMessage[];
  /** Starting messages when `messages` is not provided. */
  defaultMessages?: ChatMessage[];
  /** Called with the trimmed text when the user presses Enter or the send button. */
  onSend?: (text: string) => void;
  /** Shows the "thinking" indicator at the end of the thread. Pass the text to show — `thinking="Searching the docs"` — or `true` / an empty string for the default "Thinking" (default: off). As a web component, write `thinking="true"` for the default label, and switch it off again by setting the property to `false` (`el.thinking = false`) — removing the attribute does not clear it. */
  thinking?: boolean | string;
  /** Style of the thinking indicator: "dots" | "wave" | "orb" | "shimmer" (default: "dots"). */
  thinkingVariant?: ThinkingVariant;
  /** Status lines the thinking indicator cycles through, e.g. ["Reading the question", "Writing the answer"] — replaces the thinking text. */
  thinkingSteps?: string[];
  /** Adds a running timer to the thinking indicator — "Thinking · 4s" (default: false). */
  thinkingElapsed?: boolean;
  /** Icon for the assistant — in the header and beside its messages (React only; default: a sparkles icon). It is sized to fit, so pass a bare SVG / icon. */
  assistantIcon?: ReactNode;
  /** Quick-reply chips shown above the message box until the user has sent a message; clicking one sends it like typed text. */
  suggestions?: string[];
  /** Placeholder of the message box (default: "Type a message…"). */
  placeholder?: string;
  /** Disables the message box and send button (default: false). */
  disabled?: boolean;
  /** Height of the whole chat, in px or any CSS length such as "60vh" (default: 440). */
  height?: number | string;
  /** Title in the header bar; omit (with `subtitle`) for no header. */
  heading?: string;
  /** Smaller line under the title, e.g. "Online". */
  subtitle?: string;
  /** Color of your own bubbles and the send button, one of the built-in ColorNames (default: "accent" — follows the theme accent). */
  color?: ColorName;
  /** Text shown while there are no messages (default: "Say hello 👋"). */
  emptyText?: string;
  /** Enter transition: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "zoom" | "zoom-out" | "flip" | "blur" | "bounce" | "rotate" | "drop" | "skew" (default: none). Respects `prefers-reduced-motion`. */
  transition?: TransitionVariant;
  /** Enter transition duration in ms (default: 450). */
  transitionDuration?: number;
  /** Delay before the enter transition starts, in ms (default: 0). */
  transitionDelay?: number;
  /** Extra class name(s) applied to the root element. */
  className?: string;
  /** Per-part class overrides — merged after (and win over) the built-in styling. */
  classNames?: {
    root?: string;
    header?: string;
    messages?: string;
    bubble?: string;
    input?: string;
    send?: string;
    suggestion?: string;
  };
}

/** A chat thread with a message box: user and assistant bubbles, system notes, an optional "thinking" bubble and auto-scroll. */
export function ChatBox({
  messages,
  defaultMessages = [],
  onSend,
  variant = "bubble",
  thinking,
  thinkingVariant = "dots",
  thinkingSteps,
  thinkingElapsed = false,
  assistantIcon,
  suggestions,
  placeholder = "Type a message…",
  disabled = false,
  height = 440,
  heading,
  subtitle,
  color = "accent",
  emptyText = "Say hello 👋",
  transition,
  transitionDuration,
  transitionDelay,
  className,
  classNames,
}: ChatBoxProps) {
  const [own, setOwn] = useState<ChatMessage[]>(defaultMessages);
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const list = messages ?? own;
  // On when `thinking` is true or any string (even "" — a bare web-component attribute), off when missing / removed (undefined or null), false or "false".
  const isThinking = thinking != null && thinking !== false && thinking !== "false";
  const thinkingText = typeof thinking === "string" && thinking.trim() && thinking !== "true" ? thinking : undefined;
  const compact = variant === "compact";
  const flat = variant === "flat";
  const avatars = !compact;
  const cssHeight = typeof height === "string" && /^\d+$/.test(height) ? `${height}px` : height;
  const ownBubble = nonInteractive((colorClasses[color] || colorClasses.slate).solid);
  // The assistant's icon: the default sparkles, or `assistantIcon` scaled to about 60% of its round badge.
  const botIcon = (size: number) =>
    assistantIcon ? <span className="flex h-[62%] w-[62%] items-center justify-center [&>svg]:h-full [&>svg]:w-full">{assistantIcon}</span> : <Sparkles size={size} />;

  // Keep the newest message in view.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [list.length, isThinking]);

  // Grow the box with its text, up to about five lines.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [draft]);

  const send = (override?: string) => {
    const text = (override ?? draft).trim();
    if (!text || disabled) return;
    if (messages === undefined) setOwn((prev) => [...prev, { id: `m-${Date.now()}-${prev.length}`, role: "user", content: text }]);
    onSend?.(text);
    if (override === undefined) setDraft("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      className={cx("flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm", motionClass(transition), className, classNames?.root)}
      style={{ height: cssHeight, ...motionStyle(transitionDuration, transitionDelay) }}
    >
      {(heading || subtitle) && (
        <div className={cx("flex items-center gap-3 border-b border-border bg-surface-muted", compact ? "px-3 py-2" : "px-4 py-3", classNames?.header)}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white">
            {botIcon(16)}
          </span>
          <div className="min-w-0">
            {heading && <p className="truncate text-sm font-semibold text-fg">{heading}</p>}
            {subtitle && <p className="truncate text-xs text-fg-subtle">{subtitle}</p>}
          </div>
        </div>
      )}

      <div
        ref={scroller}
        role="log"
        aria-live="polite"
        className={cx("min-h-0 flex-1 overflow-y-auto overflow-x-hidden", flat ? "divide-y divide-border" : compact ? "space-y-2.5 px-3 py-3" : "space-y-4 px-4 py-4", classNames?.messages)}
      >
        {list.length === 0 && !isThinking && <p className="py-8 text-center text-sm text-fg-subtle">{emptyText}</p>}
        {list.map((m) => {
          if (m.role === "system") {
            return (
              <p key={m.id} className={cx("text-center text-fg-subtle", compact ? "text-[11px]" : "text-xs", flat && "py-2")}>
                <MessageContent content={m.content} />
              </p>
            );
          }
          const mine = m.role === "user";
          const meta = (m.name || m.time) && (
            <span className={cx("text-fg-subtle", compact ? "mb-0.5 text-[10px]" : "mb-1 text-[11px]")}>
              {m.name}
              {m.name && m.time ? " · " : ""}
              {m.time}
            </span>
          );
          if (flat) {
            return (
              <div key={m.id} className={cx("flex gap-3 px-4 py-4", !mine && "bg-surface-muted/60")}>
                <span className={cx("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full", mine ? ownBubble : "bg-accent-600/15 text-accent-600 dark:text-accent-400")}>
                  {mine ? <User size={14} /> : botIcon(14)}
                </span>
                <div className="min-w-0 flex-1">
                  {meta ? <div className="flex flex-col">{meta}</div> : <span className="mb-1 block text-[11px] font-medium text-fg-subtle">{mine ? "You" : "Assistant"}</span>}
                  <div className={cx("whitespace-pre-wrap break-words text-sm leading-relaxed text-fg [overflow-wrap:anywhere]", classNames?.bubble)}><MessageContent content={m.content} /></div>
                </div>
              </div>
            );
          }
          const bubble =
            variant === "outline"
              ? mine
                ? "rounded-br-md border border-accent-500/60 bg-accent-500/10 text-fg"
                : "rounded-bl-md border border-border bg-surface text-fg"
              : mine
                ? cx(ownBubble, "rounded-br-md")
                : "rounded-bl-md bg-surface-muted text-fg";
          return (
            <div key={m.id} className={cx("flex items-end gap-2", mine && "flex-row-reverse")}>
              {avatars && !mine && (
                <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600/15 text-accent-600 dark:text-accent-400">
                  {botIcon(13)}
                </span>
              )}
              <div className={cx("flex min-w-0 flex-col", compact ? "max-w-[85%]" : "max-w-[80%]", mine ? "items-end" : "items-start")}>
                {meta}
                <div
                  className={cx(
                    "max-w-full whitespace-pre-wrap break-words leading-relaxed [overflow-wrap:anywhere]",
                    compact ? "rounded-xl px-2.5 py-1.5 text-xs" : "rounded-2xl px-3.5 py-2 text-sm",
                    bubble,
                    classNames?.bubble
                  )}
                >
                  <MessageContent content={m.content} />
                </div>
              </div>
            </div>
          );
        })}
        {isThinking &&
          (flat ? (
            <div className="flex gap-3 bg-surface-muted/60 px-4 py-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-600/15 text-accent-600 dark:text-accent-400">
                {botIcon(14)}
              </span>
              <Thinking size="sm" color={color} variant={thinkingVariant} label={thinkingText} steps={thinkingSteps} showElapsed={thinkingElapsed} />
            </div>
          ) : (
            <div className="flex items-end gap-2">
              {avatars && (
                <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-600/15 text-accent-600 dark:text-accent-400">
                  {botIcon(13)}
                </span>
              )}
              <div className={cx("rounded-bl-md", compact ? "rounded-xl px-2.5 py-1.5" : "rounded-2xl px-3.5 py-2.5", variant === "outline" ? "border border-border bg-surface" : "bg-surface-muted")}>
                <Thinking size="sm" color={color} variant={thinkingVariant} label={thinkingText} steps={thinkingSteps} showElapsed={thinkingElapsed} />
              </div>
            </div>
          ))}
      </div>

      {suggestions && suggestions.length > 0 && !list.some((m) => m.role === "user") && (
        <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-3">
          {suggestions.map((text) => (
            <button
              key={text}
              type="button"
              disabled={disabled}
              onClick={() => send(text)}
              className={cx("rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg-muted transition-colors hover:border-accent-500 hover:text-fg disabled:opacity-50", classNames?.suggestion)}
            >
              {text}
            </button>
          ))}
        </div>
      )}

      <form
        className={cx("flex items-end gap-2 p-3", !(suggestions && suggestions.length > 0 && !list.some((m) => m.role === "user")) && "border-t border-border")}
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <textarea
          ref={box}
          rows={1}
          value={draft}
          disabled={disabled}
          placeholder={placeholder}
          aria-label="Message"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          className={cx(
            "max-h-[120px] min-h-[38px] flex-1 resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg outline-none transition-colors placeholder:text-fg-subtle focus:border-border-strong disabled:opacity-50",
            classNames?.input
          )}
        />
        <button
          type="submit"
          disabled={disabled || !draft.trim()}
          aria-label="Send message"
          className={cx(
            "flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg transition-opacity disabled:cursor-not-allowed disabled:opacity-40",
            ownBubble,
            classNames?.send
          )}
        >
          <ArrowUp size={18} />
        </button>
      </form>
    </div>
  );
}
