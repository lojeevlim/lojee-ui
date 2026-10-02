// Demo-only: the props / callbacks / hooks reference rendered at the bottom of every component's docs page.
// Data comes from src/generated/apiDocs.ts (built from the real TS interfaces and src/elements/register.tsx by
// scripts/gen-api-docs.mjs). It follows the header's language selector: React shows the component's props and
// callbacks; Plain JS/TS, Vue and Angular show the `l-*` Web Component's attributes, properties and events.
import { API_DOCS, type ApiComponent, type ApiDoc, type ApiProp } from "../../generated/apiDocs";
import { highlightCode } from "../../core/highlightCode";
import { CODE_FRAMEWORK_LABEL, useCodeFramework, type CodeFramework } from "../../core/codeFramework";

const isCallback = (p: ApiProp) => /^on[A-Z]/.test(p.name) || (/=>/.test(p.type) && !/^["'`]/.test(p.type));
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/** React's named handler types written out as the function they stand for:
 * `MouseEventHandler<HTMLButtonElement>` → `(event: React.MouseEvent<HTMLButtonElement>) => void`. */
function normalizeHandlerType(type: string): string {
  const m = type.trim().match(/^(?:React\.)?(\w+)EventHandler(?:<(.+)>)?$/);
  return m ? `(event: React.${m[1]}Event${m[2] ? `<${m[2]}>` : ""}) => void` : type;
}

/** Type of the first parameter of a callback type, e.g. "(date: string) => void" → "string". */
function firstArgType(rawType: string): string | null {
  const type = normalizeHandlerType(rawType);
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

/** The React JSDoc talks about callbacks ("Called with the click event when …"); a DOM event just "fires". */
const domDescription = (d: string | undefined) => (d ?? "").replace(/^Called (?:with (?:the click event|no arguments) )?when/i, "Fires when");

interface EventItem {
  cb: ApiProp | undefined;
  /** The React callback prop this event corresponds to. */
  callback: string;
  /** DOM event name (the React callback name itself in React). */
  event: string;
  /** A plain DOM event the browser already dispatches (a click), as opposed to a CustomEvent with a `detail`. */
  native: boolean;
}

/** Every event of a component for the selected language. Besides the mapped custom events, the Web Component also
 * exposes `click` natively: its inner <button> click bubbles across the shadow boundary, so no `events` entry exists
 * for it — it is added here from the React `onClick` callback so Button, SplitButton and friends document it. */
function eventItems(framework: CodeFramework, c: ApiComponent): EventItem[] {
  if (framework === "react") return c.props.filter(isCallback).map((cb) => ({ cb, callback: cb.name, event: cb.name, native: false }));
  if (!c.element) return [];
  const mapped: EventItem[] = c.element.events.map((ev) => ({ cb: c.props.find((p) => p.name === ev.callback), callback: ev.callback, event: ev.event, native: false }));
  const click = c.props.find((p) => p.name === "onClick");
  if (click && !mapped.some((m) => m.event === "click")) mapped.unshift({ cb: click, callback: "onClick", event: "click", native: true });
  return mapped;
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
  const events = eventItems(framework, c).map(({ cb, callback, event, native }): Row => {
    const arg = cb ? firstArgType(cb.type) : null;
    return {
      key: callback,
      name: eventName(framework, event),
      kind: native ? "DOM event" : "CustomEvent",
      type: native ? "MouseEvent" : arg ? `event.detail: ${arg}` : "event.detail: —",
      default: null,
      description: native ? domDescription(cb?.description) : cb?.description ?? "",
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


/** Parameters of a callback type: "(a: string, b?: number) => void" → [{ name: "a", type: "string" }, …]. */
function callbackParams(rawType: string): { name: string; type: string }[] {
  const type = normalizeHandlerType(rawType);
  const m = type.match(/^\(\s*([\s\S]*?)\)\s*=>/);
  if (!m || !m[1].trim()) return [];
  const out: { name: string; type: string }[] = [];
  let depth = 0;
  let start = 0;
  const src = m[1];
  const push = (end: number) => {
    const part = src.slice(start, end).trim();
    if (!part) return;
    const colon = part.indexOf(":");
    out.push(colon >= 0 ? { name: part.slice(0, colon).replace("?", "").trim(), type: part.slice(colon + 1).trim() } : { name: part, type: "unknown" });
  };
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if ("<({[".includes(ch)) depth++;
    else if (">)}]".includes(ch) && !(ch === ">" && src[i - 1] === "=")) depth--;
    else if (ch === "," && depth === 0) {
      push(i);
      start = i + 1;
    }
  }
  push(src.length);
  return out;
}

const MOUSE_EVENT_FIELDS: PayloadField[] = [
  { name: "clientX / clientY", type: "number", description: "Pointer position in the viewport." },
  { name: "button", type: "number", description: "Which button was pressed (0 = primary)." },
  { name: "shiftKey / ctrlKey / altKey / metaKey", type: "boolean", description: "Whether a modifier key was held." },
  { name: "target", type: "EventTarget | null", description: "The element that was actually clicked." },
  { name: "preventDefault()", type: "() => void", description: "Cancels the browser's default action (for example a link or form submit)." },
];

interface PayloadField {
  name: string;
  type: string;
  description?: string;
}

/** The fields of an event payload when its type is an object literal or a type the docs know about. */
function payloadFields(type: string, doc: ApiDoc): PayloadField[] | null {
  const inline = type.match(/^\{([\s\S]*)\}$/);
  if (inline) {
    const fields: PayloadField[] = [];
    let depth = 0;
    let start = 0;
    const body = inline[1];
    const push = (end: number) => {
      const part = body.slice(start, end).trim();
      const colon = part.indexOf(":");
      if (colon > 0) fields.push({ name: part.slice(0, colon).replace("?", "").trim(), type: part.slice(colon + 1).trim() });
    };
    for (let i = 0; i < body.length; i++) {
      const ch = body[i];
      if ("<({[".includes(ch)) depth++;
      else if (">)}]".includes(ch) && !(ch === ">" && body[i - 1] === "=")) depth--;
      else if ((ch === ";" || ch === ",") && depth === 0) {
        push(i);
        start = i + 1;
      }
    }
    push(body.length);
    return fields.length ? fields : null;
  }
  const bare = type.replace(/\[\]$/, "").trim();
  const data = doc.dataTypes.find((d) => d.name === bare);
  if (data) return data.props.map((p) => ({ name: p.name, type: p.type, description: p.description }));
  const alias = doc.types[bare];
  if (alias && /^\{[\s\S]*\}$/.test(alias)) return payloadFields(alias, doc);
  return null;
}

/** A ready-to-paste example of handling the event, in the selected language. */
function eventExample(framework: CodeFramework, c: ApiComponent, callback: string, event: string, cb: ApiProp | undefined, native: boolean): string {
  const params = cb ? callbackParams(cb.type) : [];
  const first = params[0];
  const tag = c.element?.tag ?? "l-" + kebab(c.name);
  const handler = "on" + event.charAt(0).toUpperCase() + event.slice(1).replace(/-(\w)/g, (_, ch: string) => ch.toUpperCase());
  const detailType = first ? first.type : "void";
  if (native) {
    // A plain DOM event: the listener receives the MouseEvent itself — there is no `detail`.
    if (framework === "js") return `const el = document.querySelector("${tag}");\n\nel.addEventListener("${event}", (e: MouseEvent) => {\n  console.log(e.clientX, e.clientY);\n});`;
    if (framework === "vue") return `<template>\n  <${tag} @${event}="${handler}" />\n</template>\n\n<script setup lang="ts">\nfunction ${handler}(e: MouseEvent) {\n  console.log(e.clientX, e.clientY);\n}\n</script>`;
    return `<${tag} (${event})="${handler}($event)"></${tag}>\n\n// component class\n${handler}(e: MouseEvent) {\n  console.log(e.clientX, e.clientY);\n}`;
  }
  if (framework === "react") {
    const args = params.map((p) => p.name).join(", ");
    const body = first ? `console.log(${first.name}); // ${first.type}` : "// no payload";
    return `<${c.name}\n  ${callback}={(${args}) => {\n    ${body}\n  }}\n/>`;
  }
  const note = first ? `console.log(e.detail); // ${first.type}` : "// no payload (e.detail is undefined)";
  if (framework === "js") {
    return `const el = document.querySelector("${tag}");\n\nel.addEventListener("${event}", (e) => {\n  ${note}\n});`;
  }
  if (framework === "vue") {
    return `<template>\n  <${tag} @${event}="${handler}" />\n</template>\n\n<script setup lang="ts">\nfunction ${handler}(e: CustomEvent<${detailType}>) {\n  ${note}\n}\n</script>`;
  }
  return `<${tag} (${event})="${handler}($event)"></${tag}>\n\n// component class\n${handler}(e: CustomEvent<${detailType}>) {\n  ${note}\n}`;
}

function EventDetails({ framework, c, doc }: { framework: CodeFramework; c: ApiComponent; doc: ApiDoc }) {
  const isReact = framework === "react";
  const items = eventItems(framework, c);
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="divide-y divide-border rounded-xl border border-border">
        {items.map(({ cb, callback, event, native }) => {
          const params = cb ? callbackParams(cb.type) : [];
          const first = params[0];
          const fields = native || (first && /MouseEvent/.test(first.type)) ? MOUSE_EVENT_FIELDS : first ? payloadFields(first.type, doc) : null;
          const example = eventExample(framework, c, callback, event, cb, native);
          return (
            <details key={callback} open className="group px-3 py-2">
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm">
                <span className="text-fg-subtle transition-transform group-open:rotate-90">▸</span>
                <code className="font-mono text-[13px] text-fg">{isReact ? callback : eventName(framework, event)}</code>
                <span className="truncate text-fg-subtle">{native ? domDescription(cb?.description) : cb?.description}</span>
              </summary>
              <div className="mt-3 space-y-3 pl-5">
                <div className="text-sm text-fg-muted">
                  <span className="font-medium text-fg">Payload </span>
                  {isReact ? (
                    params.length === 0 ? (
                      "none — the callback is called with no arguments."
                    ) : (
                      <>
                        {params.map((p, i) => (
                          <span key={p.name}>
                            <code className="font-mono text-xs text-fg">{p.name}</code>: <code className="font-mono text-xs text-accent-600 dark:text-accent-400">{p.type}</code>
                            {i < params.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        .
                      </>
                    )
                  ) : native ? (
                    <>
                      the native <code className="font-mono text-xs text-accent-600 dark:text-accent-400">MouseEvent</code> itself — a plain DOM event that bubbles out of the inner button, so there is no{" "}
                      <code className="font-mono text-xs text-fg">event.detail</code>.
                    </>
                  ) : first ? (
                    <>
                      <code className="font-mono text-xs text-fg">event.detail</code>: <code className="font-mono text-xs text-accent-600 dark:text-accent-400">{first.type}</code>
                      {params.length > 1 && <> — only the first argument of the React callback is delivered.</>}
                    </>
                  ) : (
                    <>none — <code className="font-mono text-xs text-fg">event.detail</code> is undefined.</>
                  )}
                </div>
                {fields && (
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full min-w-[420px] text-left text-xs">
                      <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-fg-subtle">
                        <tr>
                          <th className="px-2.5 py-1.5 font-medium">Field</th>
                          <th className="px-2.5 py-1.5 font-medium">Type</th>
                          <th className="px-2.5 py-1.5 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {fields.map((f) => (
                          <tr key={f.name} className="align-top">
                            <td className="whitespace-nowrap px-2.5 py-1.5 font-mono text-fg">{f.name}</td>
                            <td className="px-2.5 py-1.5 font-mono text-accent-600 dark:text-accent-400">{f.type}</td>
                            <td className="px-2.5 py-1.5 text-fg-muted">{f.description || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div>
                  <span className="mb-1 block text-xs font-medium text-fg-subtle">Example</span>
                  <pre className="overflow-x-auto rounded-lg border border-dashed border-border-strong bg-surface-muted p-3 text-xs leading-relaxed text-fg">
                    <code>{highlightCode(example)}</code>
                  </pre>
                </div>
              </div>
            </details>
          );
        })}
      </div>
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

      {doc.components.some((c) => eventItems(framework, c).length > 0) && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-fg">Event details</h3>
            <p className="mt-0.5 text-sm text-fg-subtle">
              {isReact
                ? "When each callback fires, what it receives, and a ready-to-paste example."
                : "When each event fires, what event.detail holds (or the native event for a click), and a ready-to-paste example."}
            </p>
          </div>
          {doc.components.map((c) =>
            eventItems(framework, c).length > 0 ? (
              <div key={c.name} className="space-y-2">
                <h4 className="font-mono text-sm font-semibold text-fg">{isReact ? `<${c.name} />` : c.element ? `<${c.element.tag}>` : `<${c.name}>`}</h4>
                <EventDetails framework={framework} c={c} doc={doc} />
              </div>
            ) : null
          )}
        </div>
      )}

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
