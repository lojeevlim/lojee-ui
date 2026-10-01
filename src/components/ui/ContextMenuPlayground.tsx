import { ContextMenu } from "./ContextMenu/ContextMenu";
import { DropdownMenuItem } from "./DropdownMenu/DropdownMenuItem";
import { PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

export default function ContextMenuPlayground() {
  const motion = useMotion({ hover: false });
  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <ContextMenu
          {...motion.props}
          menu={
            <>
              <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
              <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
              <DropdownMenuItem icon="trash-2" danger>
                Delete
              </DropdownMenuItem>
            </>
          }
        >
          <div className="flex h-40 w-64 items-center justify-center rounded-lg border-2 border-dashed border-border text-sm text-fg-subtle">
            Right-click here
          </div>
        </ContextMenu>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<ContextMenu${motion.attrs}
  menu={
    <>
      <DropdownMenuItem icon="copy">Copy</DropdownMenuItem>
      <DropdownMenuItem icon="pencil">Rename</DropdownMenuItem>
      <DropdownMenuItem icon="trash-2" danger>Delete</DropdownMenuItem>
    </>
  }
>
  <div>Right-click here</div>
</ContextMenu>`;

  // `l-context-menu` has no props and no events — it opens internally on
  // native right-click — so this is a plain snapshot. The menu goes in the
  // named `slot="menu"` wrapping the `<DropdownMenuItem>` children; the
  // target area is the default slot. `danger` needs the explicit "true"
  // string since a bare boolean attribute parses to false.
  const htmlMarkup = `<l-ContextMenu${motion.attrs}>
  <div slot="menu">
    <l-DropdownMenuItem icon="copy">Copy</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="pencil">Rename</l-DropdownMenuItem>
    <l-DropdownMenuItem icon="trash-2" danger>Delete</l-DropdownMenuItem>
  </div>
  <div>Right-click here</div>
</l-ContextMenu>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <p className="text-sm text-fg-subtle sm:col-span-2">
        No configurable options — right-click the box above to see the menu.
      </p>
      {motion.controls}
    </PlaygroundLayout>
  );
}
