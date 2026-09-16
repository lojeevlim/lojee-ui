import { SplitButton } from "../SplitButton";
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
    </section>
  );
}
