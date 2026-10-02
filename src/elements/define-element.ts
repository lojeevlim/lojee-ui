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
  const bools = new Set(Array.isArray(props) ? [] : Object.entries(props ?? {}).filter(([, type]) => type === "boolean").map(([name]) => kebab(name)));
  if (bools.size === 0) return Base;
  return class extends (Base as unknown as typeof HTMLElement) {
    attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
      const parent = Base.prototype as { attributeChangedCallback?: (n: string, o: string | null, v: string | null) => void };
      parent.attributeChangedCallback?.call(this, name, oldValue, bools.has(name) && value === "" ? "true" : value);
    }
  };
}) as unknown as typeof baseR2wc;
