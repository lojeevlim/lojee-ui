import { useState } from "react";
import { Grid, type GridCols, type GridGap } from "./Grid/Grid";
import { OptionGroup, PlaygroundLayout } from "./PlaygroundHelpers";

const COLS: GridCols[] = [1, 2, 3, 4, 6, 12];
const GAPS: GridGap[] = ["sm", "md", "lg"];

export default function GridPlayground() {
  const [cols, setCols] = useState<GridCols>(3);
  const [gap, setGap] = useState<GridGap>("md");

  const preview = (
    <Grid cols={cols} gap={gap} className="w-full">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="rounded-md bg-slate-100 p-4 text-center text-xs text-slate-500">
          Item {i + 1}
        </div>
      ))}
    </Grid>
  );

  const code = `<Grid cols={${cols}} gap="${gap}">
  <div>Item 1</div>
  <div>Item 2</div>
  ...
</Grid>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
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
