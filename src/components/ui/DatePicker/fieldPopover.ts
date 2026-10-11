import { useEffect, type RefObject } from "react";

/** Sets an `<input>`'s value the way a user edit would — React's value tracking is bypassed on purpose by using the native setter —
 * then fires `input` and `change`, so `onChange` / `onInput` (and the web component's `update` event) report it like a typed value. */
export function commitInputValue(input: HTMLInputElement | null, value: string) {
  if (!input) return;
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
}

/** Closes a field's dropdown panel on a press outside `rootRef` or on Escape. `composedPath` keeps it working inside a shadow root. */
export function useDismiss(open: boolean, rootRef: RefObject<HTMLElement | null>, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onDown = (e: Event) => {
      if (rootRef.current && !e.composedPath().includes(rootRef.current)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, rootRef, close]);
}
