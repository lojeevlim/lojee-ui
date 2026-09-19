import { SplitButton } from "../SplitButton";
import { SplitButtonMenuItem } from "../SplitButtonMenuItem";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

export function SplitButtonSection() {
  return (
    <section>
      <SectionLabel sub="A primary action paired with a dropdown trigger.">
        Split button
      </SectionLabel>
      <Row>
        <SplitButton icon="check" label="Approve" />
      </Row>
      <CodeBlock code={`<SplitButton icon="check" label="Approve" />`} />

      <div className="mt-8">
        <SectionLabel sub="shape controls the group's outer corners; menuIcon swaps the dropdown trigger's icon.">
          Shapes & dropdown icon
        </SectionLabel>
        <Row>
          <SplitButton icon="check" label="Approve" shape="default" />
          <SplitButton icon="check" label="Approve" shape="pill" />
          <SplitButton icon="check" label="Approve" shape="square" />
          <SplitButton icon="download" label="Export" menuIcon="more-vertical" />
        </Row>
        <CodeBlock
          code={`<SplitButton icon="check" label="Approve" shape="default" />
<SplitButton icon="check" label="Approve" shape="pill" />
<SplitButton icon="check" label="Approve" shape="square" />
<SplitButton icon="download" label="Export" menuIcon="more-vertical" />`}
        />
      </div>

      <div className="mt-8">
        <SectionLabel sub="Dropdown options are SplitButtonMenuItem children — click the trigger to open the menu; closes on selection, outside click, or Escape.">
          Dropdown options
        </SectionLabel>
        <Row>
          <SplitButton icon="download" label="Export" color="slate">
            <SplitButtonMenuItem icon="file" onClick={() => alert("Export as PDF")}>
              Export as PDF
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon="list" onClick={() => alert("Export as CSV")}>
              Export as CSV
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon="image" onClick={() => alert("Export as PNG")}>
              Export as PNG
            </SplitButtonMenuItem>
            <SplitButtonMenuItem disabled>Cancel</SplitButtonMenuItem>
          </SplitButton>
        </Row>
        <CodeBlock
          code={`<SplitButton icon="download" label="Export" color="indigo">
  <SplitButtonMenuItem icon="file" onClick={() => exportAs("pdf")}>Export as PDF</SplitButtonMenuItem>
  <SplitButtonMenuItem icon="list" onClick={() => exportAs("csv")}>Export as CSV</SplitButtonMenuItem>
  <SplitButtonMenuItem icon="image" onClick={() => exportAs("png")}>Export as PNG</SplitButtonMenuItem>
  <SplitButtonMenuItem disabled>Cancel</SplitButtonMenuItem>
</SplitButton>`}
        />
      </div>
    </section>
  );
}
