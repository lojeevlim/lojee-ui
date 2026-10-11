import baseR2wc from "@r2wc/react-to-web-component";

type Options = { props?: Record<string, string> | string[] };

const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, (_, a: string, b: string) => `${a}-${b.toLowerCase()}`);

/**
 * `r2wc` with HTML's boolean-attribute rule: a boolean prop written bare — `<l-table loading>` or `loading=""` — is
 * `true`. (Plain r2wc reads the empty string as `false` and ignores it.) `loading="true"` / `"false"` still work, and
 * so do the DOM property and a framework binding.
 */
export const r2wc = ((component: unknown, options: Options) => {
  const Base = (baseR2wc as unknown as (c: unknown, o: Options) => CustomElementConstructor)(component, options);
  const props = options.props;
  const boolProps = Array.isArray(props) ? [] : Object.entries(props ?? {}).filter(([, type]) => type === "boolean").map(([name]) => name);
  const bools = new Set(boolProps.map(kebab));
  if (bools.size === 0) return Base;
  const Wrapped = class extends (Base as unknown as typeof HTMLElement) {
    attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
      const parent = Base.prototype as { attributeChangedCallback?: (n: string, o: string | null, v: string | null) => void };
      parent.attributeChangedCallback?.call(this, name, oldValue, bools.has(name) && value === "" ? "true" : value);
    }
  };
  // The same rule for the DOM property: a static attribute in a Vue / Angular template (`<l-x disabled="true">`) is set as `el.disabled = ""`, which
  // plain r2wc stringifies to "false". Treat "" and "true" as true and "false" as false, like the attribute does.
  for (const name of boolProps) {
    const base = Object.getOwnPropertyDescriptor(Base.prototype, name);
    if (!base?.set) continue;
    Object.defineProperty(Wrapped.prototype, name, {
      enumerable: true,
      configurable: true,
      get: base.get,
      set(value: unknown) {
        base.set!.call(this, typeof value === "string" ? value !== "false" : value);
      },
    });
  }
  return Wrapped;
}) as unknown as typeof baseR2wc;
