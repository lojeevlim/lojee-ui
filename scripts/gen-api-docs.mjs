// Generates src/generated/apiDocs.ts — the props / callbacks / hooks reference shown at the bottom of every
// component's docs page. Reads the real TypeScript interfaces (and their JSDoc + destructured defaults), so the
// reference can't drift from the code. Run: npm run docs:api
import ts from "typescript";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const app = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");

// import XShowcase from './components/ui/Dir'  →  { XShowcase: "src/components/ui/Dir" }
const importDirs = {};
for (const m of app.matchAll(/import (\w+)(?:, \{[^}]*\})? from '\.\/components\/ui\/([^']+)'/g)) importDirs[m[1]] = m[2];
// SHOWCASES: label → component
const block = app.slice(app.indexOf("const SHOWCASES"), app.indexOf("}\n", app.indexOf("const SHOWCASES")));
const entries = [...block.matchAll(/^\s*(?:'([^']+)'|(\w+)):\s*(\w+),?$/gm)].map((m) => ({ label: m[1] ?? m[2], comp: m[3] }));

function tsxFiles(dir) {
  const out = [];
  let abs = path.join(root, "src/components/ui", dir);
  if (!fs.existsSync(abs) && fs.existsSync(abs + ".tsx")) abs += ".tsx";
  if (!fs.existsSync(abs)) return out;
  if (fs.statSync(abs).isFile()) return [abs.replace(/Showcase\.tsx$/, ".tsx")].filter((f) => fs.existsSync(f));
  for (const f of fs.readdirSync(abs)) {
    const p = path.join(abs, f);
    if (fs.statSync(p).isDirectory()) continue; // skip showcase/
    if (/\.tsx?$/.test(f) && !/Playground|Showcase|index\.ts$/.test(f)) out.push(p);
  }
  return out;
}

const clean = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ").trim();
const jsdoc = (node) =>
  ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc).map((d) => (typeof d.comment === "string" ? d.comment : d.comment?.map((c) => c.text).join("") ?? "")).join(" ");

function parse(file) {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const interfaces = {};
  const fnDefaults = {};
  const hooks = [];
  const typeAliases = {};
  sf.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
      interfaces[node.name.text] = node.members.filter(ts.isPropertySignature).map((p) => ({
        name: p.name.getText(sf),
        type: clean(p.type?.getText(sf) ?? "unknown"),
        required: !p.questionToken,
        description: clean(jsdoc(p)),
      }));
    }
    if (ts.isTypeAliasDeclaration(node) && node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) && !/Props$/.test(node.name.text)) {
      typeAliases[node.name.text] = clean(node.type.getText(sf));
    }
    if (ts.isFunctionDeclaration(node) && node.name) {
      const exported = node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      const p0 = node.parameters[0];
      if (p0 && ts.isObjectBindingPattern(p0.name)) {
        const d = {};
        for (const el of p0.name.elements) if (el.initializer) d[(el.propertyName ?? el.name).getText(sf)] = clean(el.initializer.getText(sf));
        fnDefaults[node.name.text] = d;
      }
      if (exported && /^use[A-Z]/.test(node.name.text)) {
        hooks.push({
          name: node.name.text,
          signature: clean(`${node.name.text}(${node.parameters.map((p) => p.getText(sf)).join(", ")})${node.type ? ": " + node.type.getText(sf) : ""}`),
          description: clean(jsdoc(node)),
        });
      }
    }
  });
  return { interfaces, fnDefaults, hooks, typeAliases };
}

// ---- Web Component surface (src/elements/register.tsx) ----------------------------------------------------------
// tag → { comp: identifier the element wraps, props: { name: r2wc type }, events: ["onX", …] }
const registerSrc = fs.readFileSync(path.join(root, "src/elements/register.tsx"), "utf8");
const registerSf = ts.createSourceFile("register.tsx", registerSrc, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const elements = [];
const keyName = (n, sf) => (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) ? n.text : n.getText(sf));
function visit(node) {
  if (ts.isCallExpression(node) && node.expression.getText(registerSf) === "customElements.define" && node.arguments.length >= 2) {
    const tag = node.arguments[0].text;
    const r2 = node.arguments[1];
    if (ts.isCallExpression(r2)) {
      const target = r2.arguments[0];
      const comp = ts.isCallExpression(target) ? target.arguments[0].getText(registerSf) : target.getText(registerSf);
      const opts = r2.arguments[1];
      const props = {};
      const events = [];
      if (opts && ts.isObjectLiteralExpression(opts)) {
        for (const prop of opts.properties) {
          if (!ts.isPropertyAssignment(prop)) continue;
          const k = keyName(prop.name, registerSf);
          if (k === "props" && ts.isObjectLiteralExpression(prop.initializer)) {
            for (const pp of prop.initializer.properties)
              if (ts.isPropertyAssignment(pp)) props[keyName(pp.name, registerSf)] = ts.isStringLiteral(pp.initializer) ? pp.initializer.text : "json";
          }
          if (k === "events" && ts.isObjectLiteralExpression(prop.initializer))
            for (const pp of prop.initializer.properties) if (ts.isPropertyAssignment(pp)) events.push(keyName(pp.name, registerSf));
        }
      }
      elements.push({ tag, comp, props, events });
    }
  }
  ts.forEachChild(node, visit);
}
visit(registerSf);
const pascal = (tag) => tag.replace(/^l-/, "").split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
const nameMatches = (e, name) => e.comp === name || e.comp.replace(/Element$|Adapter$/, "") === name || pascal(e.tag) === name;
const HTML_ATTR_NOTE = "Standard HTML attribute, passed straight to the underlying control.";
const EXTRA_NOTE = { heading: "Text shown as the title. Named `heading` here because `title` is a native HTMLElement attribute." };

// Plain-data shapes that are documented on a page even though they are not `*Props` (e.g. the objects you pass in `markers`).
const DATA_TYPES = {
  Map: [{ name: "MapViewState", file: "Map/mapTypes.ts", note: "Reported by `onMove` / the `move` event." }],
  "Map Markers": [{ name: "MapMarkerData", file: "Map/mapTypes.ts", via: "markers" }],
  "Map Routes": [
    { name: "MapRouteData", file: "Map/mapTypes.ts", via: "routes" },
    { name: "MapRouteSummary", file: "Map/mapTypes.ts", note: "Reported by `onLoad` / the `routeload` event." },
  ],
};
function parseDataInterface(file, name) {
  const abs = path.join(root, "src/components/ui", file);
  const sf = ts.createSourceFile(abs, fs.readFileSync(abs, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let out = [];
  sf.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === name)
      out = node.members.filter(ts.isPropertySignature).map((p) => ({
        name: p.name.getText(sf),
        type: clean(p.type?.getText(sf) ?? "unknown"),
        required: !p.questionToken,
        description: clean(jsdoc(p)),
        default: null,
      }));
  });
  return out;
}

const docs = {};
for (const { label, comp } of entries) {
  const dir = importDirs[comp];
  if (!dir) continue;
  const components = [];
  const hooks = [];
  const types = {};
  const parsed = tsxFiles(dir).map(parse);
  const allDefaults = Object.assign({}, ...parsed.map((p) => p.fnDefaults));
  for (const p of parsed) {
    Object.assign(types, p.typeAliases);
    hooks.push(...p.hooks);
    for (const [iface, props] of Object.entries(p.interfaces)) {
      const name = iface.replace(/Props$/, "");
      const defaults = allDefaults[name] ?? {};
      components.push({ name, props: props.map((pr) => ({ ...pr, default: defaults[pr.name] ?? null })), element: null });
    }
  }
  if (components.length || hooks.length)
    docs[label] = {
      components,
      hooks,
      types,
      dataTypes: (DATA_TYPES[label] ?? []).map((d) => ({ name: d.name, via: d.via ?? null, note: d.note ?? null, props: parseDataInterface(d.file, d.name) })),
    };
}

// Attach each element to the ONE component that best matches it (same name, most overlapping props).
for (const e of elements) {
  let best = null;
  for (const d of Object.values(docs))
    for (const c of d.components) {
      if (!nameMatches(e, c.name)) continue;
      const names = new Set(c.props.map((p) => p.name));
      const score = Object.keys(e.props).filter((n) => names.has(n)).length + e.events.filter((ev) => names.has(ev)).length;
      if (!best || score > best.score) best = { c, score };
    }
  if (!best) continue;
  const names = new Set(best.c.props.map((p) => p.name));
  best.c.element = {
    tag: e.tag,
    props: e.props,
    extraProps: Object.entries(e.props)
      .filter(([n]) => !names.has(n))
      .map(([name, type]) => ({ name, type, description: EXTRA_NOTE[name] ?? HTML_ATTR_NOTE })),
    events: e.events.map((cb) => ({ callback: cb, event: cb.replace(/^on/, "").toLowerCase() })),
  };
}

const out = `// AUTO-GENERATED by scripts/gen-api-docs.mjs — do not edit. Run \`npm run docs:api\`.
export interface ApiProp { name: string; type: string; required: boolean; description: string; default: string | null }
export interface ApiElement { tag: string; props: Record<string, string>; extraProps: { name: string; type: string; description: string }[]; events: { callback: string; event: string }[] }
export interface ApiComponent { name: string; props: ApiProp[]; element: ApiElement | null }
export interface ApiHook { name: string; signature: string; description: string }
export interface ApiDataType { name: string; via: string | null; note: string | null; props: ApiProp[] }
export interface ApiDoc { components: ApiComponent[]; hooks: ApiHook[]; types: Record<string, string>; dataTypes: ApiDataType[] }

export const API_DOCS: Record<string, ApiDoc> = ${JSON.stringify(docs, null, 2)};
`;
fs.writeFileSync(path.join(root, "src/generated/apiDocs.ts"), out);
const total = Object.values(docs).flatMap((d) => d.components.flatMap((c) => c.props));
console.log(`${Object.keys(docs).length} pages, ${total.length} props, ${total.filter((p) => p.description).length} documented, ${total.filter((p) => p.default).length} defaults`);
console.log("missing:", entries.filter((e) => !docs[e.label]).map((e) => e.label).join(", "));

// Sanity report: every registered element should map to a documented component, and its props to real interface props.
const used = new Set();
for (const d of Object.values(docs)) for (const c of d.components) if (c.element) used.add(c.element.tag);
console.log("elements not matched to a component:", elements.filter((e) => !used.has(e.tag)).map((e) => e.tag).join(", ") || "none");
for (const d of Object.values(docs))
  for (const c of d.components) {
    if (!c.element) continue;
    const names = new Set(c.props.map((p) => p.name));
    const extra = c.element.extraProps.map((x) => x.name).filter((n) => !/^(value|placeholder|disabled|required|name|type|rows|checked|defaultChecked|htmlFor|accept|multiple|min|max|step|heading)$/.test(n));
    const evExtra = c.element.events.filter((e) => !names.has(e.callback));
    if (extra.length || evExtra.length) console.log(`  ${c.element.tag}: props not in interface [${extra}] events not in interface [${evExtra.map((e) => e.callback)}]`);
  }
