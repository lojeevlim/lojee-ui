import { useState } from "react";

/**
 * The current value of an input that works both ways: it owns its state (so a plain `<l-*>` element updates as you
 * type, with nothing to wire up), and it also follows the `value` prop whenever that changes (so a parent — or an
 * attribute set from outside — can set it). Arrays and objects are compared by content, so a fresh literal on every
 * render doesn't reset what the user typed.
 */
export function useValue<T>(valueProp: T | undefined, initial: T) {
  const key = (v: unknown) => JSON.stringify(v);
  const [state, setState] = useState<T>(valueProp ?? initial);
  const [prev, setPrev] = useState(valueProp);
  if (key(valueProp) !== key(prev)) {
    setPrev(valueProp);
    if (valueProp !== undefined) setState(valueProp);
  }
  return [state, setState] as const;
}
