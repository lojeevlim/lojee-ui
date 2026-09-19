import { useState } from "react";
import { Popover, type PopoverPosition } from "./Popover/Popover";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const POSITIONS: PopoverPosition[] = ["top", "bottom", "left", "right"];

export default function PopoverPlayground() {
  const [position, setPosition] = useState<PopoverPosition>("bottom");

  const preview = (
    <Popover position={position} content="Popover content">
      <Button label="Click me" />
    </Popover>
  );

  const code = `<Popover position="${position}" content="Popover content">
  <Button label="Click me" />
</Popover>`;

  // `l-popover` has no `open` prop and no events — it's fully self-contained,
  // opening on click of its trigger child internally — so this is a plain
  // snapshot with no controlled-visibility wiring needed.
  const htmlMarkup = `<Popover position="${position}" content="Popover content">
  <Button label="Click me" />
</Popover>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Position" options={POSITIONS} value={position} onChange={setPosition} />
    </PlaygroundLayout>
  );
}
