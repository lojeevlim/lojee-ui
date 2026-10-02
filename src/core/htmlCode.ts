// Plain-HTML (the "JS" tab) code samples must not self-close custom elements: in HTML the trailing `/` is ignored, so
// `<l-Button label="Save" />` leaves the element open and swallows whatever follows it. Vue and Angular templates do
// allow the self-closing form, so only the JS tab is rewritten, at render time, wherever a sample comes from.
const SELF_CLOSING = /<(l-[A-Za-z0-9-]+)((?:\s+(?:[^<>"']|"[^"]*"|'[^']*')*?)?)\s*\/>/g;

export function closeCustomElements(html: string): string {
  return html.replace(SELF_CLOSING, "<$1$2></$1>");
}
