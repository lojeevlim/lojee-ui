import { useState } from "react";
import { ButtonGroup } from "../ButtonGroup";
import { SegmentButton } from "../SegmentButton";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export function ButtonGroupSection() {
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <section>
      <SectionLabel sub="Grouped actions and a segmented toolbar control.">
        Button groups
      </SectionLabel>
      <div className="space-y-4">
        <ButtonGroup>
          <SegmentButton icon="align-left" active={align === "left"} onClick={() => setAlign("left")} aria-label="Align left" />
          <SegmentButton icon="align-center" active={align === "center"} onClick={() => setAlign("center")} aria-label="Align center" />
          <SegmentButton icon="align-right" active={align === "right"} onClick={() => setAlign("right")} aria-label="Align right" />
        </ButtonGroup>

        <ButtonGroup>
          <SegmentButton icon="bold" active={bold} onClick={() => setBold((v) => !v)} aria-label="Bold" />
          <SegmentButton icon="italic" active={italic} onClick={() => setItalic((v) => !v)} aria-label="Italic" />
          <SegmentButton icon="underline" aria-label="Underline" />
        </ButtonGroup>

        <ButtonGroup>
          <SegmentButton>Day</SegmentButton>
          <SegmentButton active>Week</SegmentButton>
          <SegmentButton>Month</SegmentButton>
          <SegmentButton>Year</SegmentButton>
        </ButtonGroup>
      </div>
      <CodeBlock
        code={`<ButtonGroup>
  <SegmentButton icon="align-left" active={align === "left"} onClick={() => setAlign("left")} />
  <SegmentButton icon="align-center" active={align === "center"} onClick={() => setAlign("center")} />
  <SegmentButton icon="align-right" active={align === "right"} onClick={() => setAlign("right")} />
</ButtonGroup>`}
      />
    </section>
  );
}
