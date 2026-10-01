// Demo-only: the props / callbacks / hooks reference rendered at the bottom of every component's docs page.
// Data comes from src/generated/apiDocs.ts (built from the real TS interfaces and src/elements/register.tsx by
// scripts/gen-api-docs.mjs). It follows the header's language selector: React shows the component's props and
// callbacks; Plain JS/TS, Vue and Angular show the `l-*` Web Component's attributes, properties and events.
import { API_DOCS, type ApiComponent, type ApiProp } from "../../generated/apiDocs";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";

const isCallback = (p: ApiProp) => /^on[A-Z]/.test(p.name) || (/=>/.test(p.type) && !/^["'`]/.test(p.type));
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/** Type of the first parameter of a callback type, e.g. "(date: string) => void" → "string". */
function firstArgType(type: string): string | null {
  const m = type.match(/^\(\s*([^)]*)\)\s*=>/);
  if (!m || !m[1].trim()) return null;
  let depth = 0;
  let end = m[1].length;
  for (let i = 0; i < m[1].length; i++) {
    const ch = m[1][i];
    if ("<({[".includes(ch)) depth++;
    else if (">)}]".includes(ch)) depth--;
    else if (ch === "," && depth === 0) {
      end = i;
      break;
    }
  }
  const arg = m[1].slice(0, end).trim();
  const colon = arg.indexOf(":");
  return colon >= 0 ? arg.slice(colon + 1).trim() : arg;
}

interface Row {
  key: string;
  /** How you write it in the selected language. */
  name: string;
  /** Small caption under the name ("attribute", "property", "event" …). */
  kind?: string;
  type: string;
  default: string | null;
  description: string;
  required: boolean;
}

/** Name as written in the selected language, and how it is passed. */
function bind(framework: CodeFramework, name: string, r2wcType: string): { name: string; kind: string } {
  const property = r2wcType === "json"; // objects/arrays can't be attributes — set as a DOM property
  if (framework === "js") return property ? { name: `el.${name}`, kind: "property" } : { name: kebab(name), kind: "attribute" };
  if (framework === "vue") return property ? { name: `:${name}`, kind: "binding" } : { name: kebab(name), kind: r2wcType === "boolean" ? 'attribute · "true"' : "attribute" };
  return property ? { name: `[${name}]`, kind: "property binding" } : { name: kebab(name), kind: r2wcType === "boolean" ? 'attribute · "true"' : "attribute" };
}

function eventName(framework: CodeFramework, event: string): string {
  if (framework === "js") return `"${event}"`;
  if (framework === "vue") return `@${event}`;
  return `(${event})`;
}

function buildRows(framework: CodeFramework, c: ApiComponent): { props: Row[]; events: Row[]; reactOnly: string[] } {
  const callbacks = c.props.filter(isCallback);
  const plain = c.props.filter((p) => !isCallback(p));

  if (framework === "react") {
    const toRow = (p: ApiProp): Row => ({ key: p.name, name: p.name, type: p.type, default: p.default, description: p.description, required: p.required });
    return { props: plain.map(toRow), events: callbacks.map((p) => ({ ...toRow(p), name: p.name })), reactOnly: [] };
  }

  const el = c.element;
  if (!el) return { props: [], events: [], reactOnly: [] };
  const exposed = plain.filter((p) => p.name in el.props);
  const props: Row[] = [
    ...exposed.map((p): Row => ({ key: p.name, ...bind(framework, p.name, el.props[p.name]), type: p.type, default: p.default, description: p.description, required: p.required })),
    ...el.extraProps.map((x): Row => ({ key: x.name, ...bind(framework, x.name, x.type), type: x.type === "json" ? "object" : x.type, default: null, description: x.description, required: false })),
  ];
  const events = el.events.map((ev): Row => {
    const cb = c.props.find((p) => p.name === ev.callback);
    const arg = cb ? firstArgType(cb.type) : null;
    return {
      key: ev.callback,
      name: eventName(framework, ev.event),
      kind: "CustomEvent",
      type: arg ? `event.detail: ${arg}` : "event.detail: —",
      default: null,
      description: cb?.description ?? "",
      required: false,
    };
  });
  const reactOnly = plain.filter((p) => !(p.name in el.props)).map((p) => p.name);
  return { props, events, reactOnly };
}

function Table({ rows, kind, withDefault }: { rows: Row[]; kind: "prop" | "event"; withDefault: boolean }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-surface-muted text-xs uppercase tracking-wide text-fg-subtle">
          <tr>
            <th className="px-3 py-2 font-medium">{kind === "prop" ? "Prop" : "Event"}</th>
            <th className="px-3 py-2 font-medium">{kind === "prop" ? "Type" : "Payload"}</th>
            {withDefault && <th className="px-3 py-2 font-medium">Default</th>}
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.key} className="align-top">
              <td className="whitespace-nowrap px-3 py-2">
                <span className="font-mono text-[13px] text-fg">{r.name}</span>
                {r.required && <span className="ml-1 text-rose-500" title="Required">*</span>}
                {r.kind && <span className="block text-[11px] text-fg-subtle">{r.kind}</span>}
              </td>
              <td className="px-3 py-2 font-mono text-xs text-accent-600 dark:text-accent-400">
                <span className="break-words">{r.type}</span>
              </td>
              {withDefault && <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-fg-muted">{r.default ?? "—"}</td>}
              <td className="px-3 py-2 text-fg-muted">{r.description || <span className="text-fg-subtle">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const USAGE: Record<Exclude<CodeFramework, "react">, string> = {
  js: 'Attributes are kebab-case strings; objects and arrays (json) are assigned as properties (el.items = […]). Listen with el.addEventListener("event", (e) => e.detail).',
  vue: "Scalars are plain kebab-case attributes; objects and arrays use a :binding. Listen with @event — the payload is $event.detail. Requires the l-* tags to be treated as custom elements (isCustomElement).",
  angular: "Scalars are plain kebab-case attributes; objects and arrays use a [property] binding. Listen with (event) — the payload is $event.detail. Add CUSTOM_ELEMENTS_SCHEMA to the module or component.",
};

export default function ApiReference({ name }: { name: string }) {
  const { framework } = useCodeFramework();
  const doc = API_DOCS[name];
  if (!doc || (doc.components.length === 0 && doc.hooks.length === 0)) return null;
  const typeEntries = Object.entries(doc.types);
  const isReact = framework === "react";

  return (
    <section className="mt-12 space-y-8 border-t border-border pt-8">
      <div>
        <h2 className="text-lg font-semibold text-fg">API reference</h2>
        <p className="mt-0.5 text-sm text-fg-subtle">
          Every prop, callback and hook for {name}, shown for <span className="font-medium text-fg">{CODE_FRAMEWORK_LABEL[framework]}</span> — change the language
          in the header. <span className="text-rose-500">*</span> marks a required prop.
        </p>
        {!isReact && (
          <p className="mt-2 text-sm text-fg-subtle">
            Import once with <code className="font-mono text-fg">import "lojee-ui/elements"</code>. {USAGE[framework]} An event's payload is the React callback's first argument, delivered as <code className="font-mono text-fg">event.detail</code>.
          </p>
        )}
      </div>

      {doc.components.map((c) => {
        const { props, events, reactOnly } = buildRows(framework, c);
        const heading = isReact ? `<${c.name} />` : c.element ? `<${c.element.tag}>` : `<${c.name}>`;
        return (
          <div key={c.name} className="space-y-3">
            <h3 className="font-mono text-base font-semibold text-fg">{heading}</h3>
            {!isReact && !c.element && (
              <p className="text-sm text-fg-subtle">
                {doc.dataTypes.some((d) => d.via) ? (
                  <>
                    Not a separate element — in Vue, Angular and plain JS use the <code className="font-mono text-fg">{doc.dataTypes.find((d) => d.via)?.via}</code> property of <code className="font-mono text-fg">&lt;l-map&gt;</code>; the data shape is below.
                  </>
                ) : (
                  "Not registered as a Web Component — it is only available in React."
                )}
              </p>
            )}
            {props.length > 0 && <Table rows={props} kind="prop" withDefault={isReact || props.some((p) => p.default)} />}
            {events.length > 0 && (
              <>
                <h4 className="pt-2 text-sm font-semibold text-fg">{isReact ? "Callbacks" : "Events"}</h4>
                <Table rows={events} kind="event" withDefault={false} />
              </>
            )}
            {reactOnly.length > 0 && (
              <p className="text-xs text-fg-subtle">
                React only (not available on the Web Component):{" "}
                {reactOnly.map((n, i) => (
                  <span key={n}>
                    <code className="font-mono text-fg-muted">{n}</code>
                    {i < reactOnly.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {(isReact || c.element) && props.length === 0 && events.length === 0 && <p className="text-sm text-fg-subtle">No props.</p>}
          </div>
        );
      })}

      {doc.dataTypes.map((d) => (
        <div key={d.name} className="space-y-3">
          <h3 className="font-mono text-base font-semibold text-fg">{d.name}</h3>
          <p className="text-sm text-fg-subtle">
            {d.via ? (
              <>
                The shape of each item in the <code className="font-mono text-fg">{d.via}</code> {isReact ? "prop of <Map>" : "property of <l-map>"}.{" "}
              </>
            ) : null}
            {d.note}
          </p>
          <Table rows={d.props.map((p) => ({ key: p.name, name: p.name, type: p.type, default: null, description: p.description, required: p.required }))} kind="prop" withDefault={false} />
        </div>
      ))}

      {isReact && doc.hooks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-fg">Hooks</h3>
          <div className="divide-y divide-border rounded-xl border border-border">
            {doc.hooks.map((h) => (
              <div key={h.name} className="space-y-1 px-3 py-2">
                <code className="block break-words font-mono text-[13px] text-fg">{h.signature}</code>
                <p className="text-sm text-fg-muted">{h.description || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {typeEntries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-fg">Types</h3>
          <div className="divide-y divide-border rounded-xl border border-border">
            {typeEntries.map(([n, t]) => (
              <div key={n} className="flex flex-col gap-1 px-3 py-2 sm:flex-row sm:gap-4">
                <code className="shrink-0 font-mono text-[13px] text-fg">{n}</code>
                <code className="break-words font-mono text-xs text-accent-600 dark:text-accent-400">{t}</code>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
