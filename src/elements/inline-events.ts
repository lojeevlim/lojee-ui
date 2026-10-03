/**
 * Lets an `<l-…>` element take an HTML-style inline handler for one of its custom events, the way `<button onclick="…">`
 * does for the built-in `click`:
 *
 *   <l-button-group onitemclick="console.log(event.detail)">…</l-button-group>
 *
 * The attribute value is the handler body: `event` is the CustomEvent and `this` is the element. Changing or removing
 * the attribute swaps or removes the handler. (Like any inline handler it needs a page that allows inline scripts.)
 */
export function withInlineEvents(Base: CustomElementConstructor, events: string[]): CustomElementConstructor {
  const attrs = events.map((e) => `on${e}`);
  const Parent = Base as unknown as typeof HTMLElement & { observedAttributes?: string[] };

  class WithInlineEvents extends Parent {
    static get observedAttributes(): string[] {
      return [...(Parent.observedAttributes ?? []), ...attrs];
    }

    #handlers = new Map<string, EventListener>();

    attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
      if (!attrs.includes(name)) {
        (Parent.prototype as unknown as { attributeChangedCallback?: (n: string, o: string | null, v: string | null) => void }).attributeChangedCallback?.call(this, name, oldValue, value);
        return;
      }
      const type = name.slice(2);
      const previous = this.#handlers.get(type);
      if (previous) this.removeEventListener(type, previous);
      this.#handlers.delete(type);
      if (!value) return;
      try {
        const run = new Function("event", value) as (this: HTMLElement, event: Event) => void;
        const listener: EventListener = (event) => run.call(this, event);
        this.#handlers.set(type, listener);
        this.addEventListener(type, listener);
      } catch (error) {
        console.error(`<${this.localName}> ${name}="…" is not valid JavaScript`, error);
      }
    }
  }
  return WithInlineEvents as unknown as CustomElementConstructor;
}
