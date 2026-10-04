import { useCallback, useRef } from "react";
import { useValue } from "./useValue";

/**
 * The open / closed state of a popover, menu, … that works both ways: it keeps its own state (so a click opens it with nothing wired
 * up), follows the `open` prop whenever that changes (so a parent — or an attribute set from outside — can open / close it), and
 * reports every change through `onOpenChange`. `setOpen` takes a boolean or an updater, like React's.
 */
export function useOpen(openProp: boolean | undefined, onOpenChange?: (open: boolean) => void, initial = false) {
  const [open, setOpenState] = useValue<boolean>(openProp, initial);
  const current = useRef(open);
  current.current = open;
  const setOpen = useCallback(
    (next: boolean | ((o: boolean) => boolean)) => {
      const value = typeof next === "function" ? next(current.current) : next;
      if (value === current.current) return;
      current.current = value;
      setOpenState(value);
      onOpenChange?.(value);
    },
    [onOpenChange, setOpenState]
  );
  return [open, setOpen] as const;
}
