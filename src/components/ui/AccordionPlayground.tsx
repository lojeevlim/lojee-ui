import { useState } from "react";
import { Accordion } from "./Accordion/Accordion";
import { AccordionItem } from "./Accordion/AccordionItem";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

type Mode = "grouped" | "independent";
const MODES: Mode[] = ["grouped", "independent"];

export default function AccordionPlayground() {
  const [mode, setMode] = useState<Mode>("grouped");
  const name = mode === "grouped" ? "playground" : undefined;

  const preview = (
    <div className="w-full max-w-md">
      <Accordion>
        <AccordionItem name={name} title="Section one" defaultOpen>
          Content for section one.
        </AccordionItem>
        <AccordionItem name={name} title="Section two">
          Content for section two.
        </AccordionItem>
        <AccordionItem name={name} title="Section three">
          Content for section three.
        </AccordionItem>
      </Accordion>
    </div>
  );

  const code = `<Accordion>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section one" defaultOpen>
    Content for section one.
  </AccordionItem>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section two">
    Content for section two.
  </AccordionItem>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section three">
    Content for section three.
  </AccordionItem>
</Accordion>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions. Note the
  // explicit `default-open="true"` — r2wc's boolean parser needs a non-empty
  // value, so a bare attribute would silently parse to false. Same-`name`
  // <AccordionItem> siblings stay mutually exclusive via the native
  // <details name> behavior, so this works identically in plain HTML too.
  const htmlMarkup = `<Accordion>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section one" default-open="true">
    Content for section one.
  </AccordionItem>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section two">
    Content for section two.
  </AccordionItem>
  <AccordionItem${name ? ` name="${name}"` : ""} title="Section three">
    Content for section three.
  </AccordionItem>
</Accordion>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Mode" options={MODES} value={mode} onChange={setMode} />
    </PlaygroundLayout>
  );
}
