import { useState } from "react";
import { Grid, type GridCols, type GridGap } from "./Grid/Grid";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";

const COLS: GridCols[] = [1, 2, 3, 4, 6, 12];
const GAPS: GridGap[] = ["sm", "md", "lg"];

export default function GridPlayground() {
  const [cols, setCols] = useState<GridCols>(3);
  const [gap, setGap] = useState<GridGap>("md");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody className="items-stretch">
        <Grid cols={cols} gap={gap} className="w-full">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="rounded-md bg-slate-100 p-4 text-center text-xs text-slate-500">
              Item {i + 1}
            </div>
          ))}
        </Grid>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Grid cols={${cols}} gap="${gap}">
  <div>Item 1</div>
  <div>Item 2</div>
  ...
</Grid>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions.
  const htmlMarkup = `<Grid cols="${cols}" gap="${gap}">
  <div>Item 1</div>
  <div>Item 2</div>
  ...
</Grid>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup
        label="Columns"
        options={COLS.map(String)}
        value={String(cols)}
        onChange={(v) => setCols(Number(v) as GridCols)}
      />
      <OptionGroup label="Gap" options={GAPS} value={gap} onChange={setGap} />
    </PlaygroundLayout>
  );
}
