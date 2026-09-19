import { useState } from "react";
import { Accordion } from "./Accordion/Accordion";
import { AccordionItem } from "./Accordion/AccordionItem";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

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

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Mode" options={MODES} value={mode} onChange={setMode} />
    </PlaygroundLayout>
  );
}
