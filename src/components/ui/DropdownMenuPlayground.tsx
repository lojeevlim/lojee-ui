import { useState } from "react";
import { DropdownMenu, type DropdownMenuAlign } from "./DropdownMenu/DropdownMenu";
import { DropdownMenuItem } from "./DropdownMenu/DropdownMenuItem";
import { Button } from "./Buttons/Button";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const ALIGNS: DropdownMenuAlign[] = ["start", "end"];

export default function DropdownMenuPlayground() {
  const [align, setAlign] = useState<DropdownMenuAlign>("start");

  const preview = (
    <DropdownMenu align={align} trigger={<Button icon="chevron-down" label="Options" />}>
      <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
      <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
      <DropdownMenuItem icon="trash-2" danger>
        Delete
      </DropdownMenuItem>
    </DropdownMenu>
  );

  const code = `<DropdownMenu align="${align}" trigger={<Button icon="chevron-down" label="Options" />}>
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
  <DropdownMenuItem icon="trash-2" danger>Delete</DropdownMenuItem>
</DropdownMenu>`;

  // `l-dropdown-menu` has no `open` prop and no events — it closes internally
  // on selection/outside-click/Escape — so this is a plain snapshot. The
  // trigger goes in the named `slot="trigger"`; menu items default-slot.
  // `danger` is boolean, so it needs the explicit "true" string (r2wc parses
  // a bare attribute as false).
  const htmlMarkup = `<DropdownMenu align="${align}">
  <Button slot="trigger" icon="chevron-down" label="Options" />
  <DropdownMenuItem icon="pencil">Edit</DropdownMenuItem>
  <DropdownMenuItem icon="copy">Duplicate</DropdownMenuItem>
  <DropdownMenuItem icon="trash-2" danger>Delete</DropdownMenuItem>
</DropdownMenu>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Align" options={ALIGNS} value={align} onChange={setAlign} />
    </PlaygroundLayout>
  );
}
