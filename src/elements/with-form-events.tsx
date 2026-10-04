import { useEffect, useRef, useState, type ChangeEvent, type ComponentType } from "react";

/**
 * The common form events of the `<l-*>` form controls (Checkbox, Radio, Switch, Input, Textarea, Select, Slider, …). Spread into a
 * control's r2wc `events` config; `withFormEvents` below supplies the callbacks, and r2wc turns each into a CustomEvent on the element:
 *
 *   update   — the value was committed (the native `change`): detail = the new value (`true` / `false` for a checkbox or switch)
 *   input    — the value is changing as the user edits (typing, dragging): detail = the current value
 *   focus    — the control gained focus: detail = the current value
 *   invalid  — the control failed validation (e.g. `required` and empty): detail = the validation message
 */
export const FORM_EVENTS = { onUpdate: {}, onInput: {}, onFocus: {}, onInvalid: {} } as const;

type FormField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function valueOf(target: EventTarget | null): unknown {
  const el = target as FormField | null;
  if (!el || !("value" in el)) return null;
  if (el instanceof HTMLInputElement) {
    if (el.type === "checkbox") return el.checked;
    if (el.type === "radio") return el.checked ? el.value : null;
    if (el.type === "number" || el.type === "range") return el.value === "" ? null : Number(el.value);
  }
  return el.value;
}

/**
 * Wraps a form control so it reports `update`, `input`, `focus` and `invalid` (see FORM_EVENTS). The browser's own `input` event is
 * composed — it would reach the element as well, a second `input` without a value — so it is stopped at the shadow root and the one
 * custom `input` event (with `detail`) is dispatched instead (the same for `focus`). Listening happens on the shadow root, after React's
 * own handlers ran.
 */
export function withFormEvents<Props extends object>(Component: ComponentType<Props>, options: { mirror?: boolean; update?: boolean } = {}) {
  return function WithFormEvents(props: Props) {
    const { onUpdate, onInput, onFocus, onInvalid, ...restProps } = props as Props & {
      onUpdate?: (v: unknown) => void;
      onInput?: (v: unknown) => void;
      onFocus?: (v: unknown) => void;
      onInvalid?: (v: unknown) => void;
    };
    // `update: false` — the component reports its own typed value through a callback (see `withUpdate`), so `onUpdate` is left for that.
    const ownUpdate = options.update === false;
    const rest = ownUpdate ? { ...restProps, onUpdate } : restProps;
    // Two-way `value` / `checked`. A web component's props only flow in (host -> field), so a field given a `value` (or `checked`)
    // would be a React-controlled field nobody updates: read-only. With `mirror`, the field keeps its own copy — set from the host's
    // property / attribute whenever that changes, and updated as the user edits (the events above report every change, so the host
    // can write the value back, e.g. Vue `@update="v => name = v.detail"`).
    const field = rest as { value?: unknown; checked?: unknown; onChange?: (e: ChangeEvent<FormField>) => void };
    const [val, setVal] = useState(field.value);
    const [chk, setChk] = useState(field.checked);
    const hadValue = useRef(false);
    const hadChecked = useRef(false);
    useEffect(() => setVal(field.value), [field.value]);
    useEffect(() => setChk(field.checked), [field.checked]);
    if (field.value !== undefined) hadValue.current = true;
    if (field.checked !== undefined) hadChecked.current = true;
    const mirrored = options.mirror
      ? {
          ...(hadValue.current ? { value: val ?? "" } : {}),
          ...(hadChecked.current ? { checked: Boolean(chk) } : {}),
          onChange: (e: ChangeEvent<FormField>) => {
            const t = e.target;
            if (t instanceof HTMLInputElement && (t.type === "checkbox" || t.type === "radio")) setChk(t.checked);
            else setVal(t.value);
            field.onChange?.(e);
          },
        }
      : {};
    const ref = useRef<HTMLDivElement>(null);
    const handlers = useRef({ onUpdate, onInput, onFocus, onInvalid });
    useEffect(() => {
      handlers.current = { onUpdate, onInput, onFocus, onInvalid };
    });

    useEffect(() => {
      const root = ref.current?.getRootNode();
      if (!(root instanceof ShadowRoot)) return;
      // Keep the element's own `value` / `checked` property in step with the field, so `el.value` is current (Vue's v-model reads it).
      const sync = (target: EventTarget | null) => {
        const host = root.host as unknown as { value?: unknown; checked?: unknown };
        if (target instanceof HTMLInputElement && target.type === "checkbox") host.checked = target.checked;
        else if (target instanceof HTMLInputElement && target.type === "radio") {
          if (target.checked) host.checked = true;
        } else if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) {
          host.value = target.type === "number" || target.type === "range" ? (target.value === "" ? "" : Number(target.value)) : target.value;
        }
      };
      const input = (e: Event) => {
        e.stopPropagation();
        sync(e.target);
        handlers.current.onInput?.(valueOf(e.target));
      };
      const change = (e: Event) => {
        sync(e.target);
        if (!ownUpdate) handlers.current.onUpdate?.(valueOf(e.target));
      };
      const focus = (e: Event) => {
        const t = e.target;
        const field = t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement;
        // Besides real fields, the visible control of a custom field (a Select's trigger button, a combobox …) counts too.
        if (!field && !(t instanceof HTMLElement && t.matches("[aria-haspopup], [role=combobox], [role=spinbutton], [role=switch]"))) return;
        e.stopPropagation(); // like `input`: the native (composed) focus would reach the element too — one custom event with a value instead
        handlers.current.onFocus?.(valueOf(e.target));
      };
      const invalid = (e: Event) => handlers.current.onInvalid?.((e.target as FormField | null)?.validationMessage ?? "");
      root.addEventListener("input", input);
      root.addEventListener("change", change);
      root.addEventListener("focus", focus, true); // `focus` does not bubble — catch it on the way down
      root.addEventListener("invalid", invalid, true); // `invalid` does not bubble — catch it on the way down
      return () => {
        root.removeEventListener("input", input);
        root.removeEventListener("change", change);
        root.removeEventListener("focus", focus, true);
        root.removeEventListener("invalid", invalid, true);
      };
    }, [ownUpdate]);

    return (
      <div ref={ref} style={{ display: "contents" }}>
        <Component {...(rest as unknown as Props)} {...(mirrored as unknown as Partial<Props>)} />
      </div>
    );
  };
}

/**
 * Adds the `update` event to a component that already reports its state through a callback (onChange, onPageChange, onOpenChange,
 * onClose …): each listed callback also fires `onUpdate` — which r2wc turns into an `update` CustomEvent — with the value that
 * callback was called with (or, for `onClose`-style callbacks, the value `detail` maps it to, e.g. `false` for "closed"). The
 * original callback still runs first, so its own event (`change`, `pagechange`, `close` …) is unchanged.
 */
export function withUpdate<Props extends object>(Component: ComponentType<Props>, sources: string[] | Record<string, (...args: unknown[]) => unknown>) {
  const map: Record<string, (...args: unknown[]) => unknown> = Array.isArray(sources) ? Object.fromEntries(sources.map((n) => [n, (...a: unknown[]) => a[0]])) : sources;
  return function WithUpdate(props: Props & { onUpdate?: (v: unknown) => void }) {
    const { onUpdate, ...rest } = props;
    const patched: Record<string, unknown> = { ...rest };
    for (const [name, detail] of Object.entries(map)) {
      const original = (rest as Record<string, unknown>)[name] as ((...a: unknown[]) => void) | undefined;
      patched[name] = (...a: unknown[]) => {
        original?.(...a);
        onUpdate?.(detail(...a));
      };
    }
    return <Component {...(patched as unknown as Props)} />;
  };
}
