import { useState } from "react";
import { CodeSnippet } from "./CodeSnippet/CodeSnippet";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import { wcCode } from "./webComponentCode";

const TOGGLE = ["off", "on"] as const;
const SAMPLE = `import { Button } from "lojee-ui";

export function Save() {
  return <Button label="Save" />;
}`;

export default function CodeSnippetPlayground() {
  const [title, setTitle] = useState<(typeof TOGGLE)[number]>("on");
  const [lineNumbers, setLineNumbers] = useState<(typeof TOGGLE)[number]>("off");
  const [copyable, setCopyable] = useState<(typeof TOGGLE)[number]>("on");

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <div className="w-full max-w-md">
          <CodeSnippet code={SAMPLE} title={title === "on" ? "Save.tsx" : undefined} language={title === "on" ? "tsx" : undefined} lineNumbers={lineNumbers === "on"} copyable={copyable === "on"} />
        </div>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const react = (title === "on" ? ' title="Save.tsx" language="tsx"' : "") + (lineNumbers === "on" ? " lineNumbers" : "") + (copyable === "off" ? " copyable={false}" : "");
  const html = (title === "on" ? ' heading="Save.tsx" language="tsx"' : "") + (lineNumbers === "on" ? ' line-numbers="true"' : "") + (copyable === "off" ? ' copyable="false"' : "");

  return (
    <PlaygroundLayout
      preview={preview}
      variants={wcCode({
        react: `<CodeSnippet code={source}${react} />`,
        html: `<l-code-snippet id="snippet"${html}></l-code-snippet>`,
        vueHtml: `<l-code-snippet :code="source"${html.replace(' line-numbers="true"', ' :line-numbers="true"').replace(' copyable="false"', ' :copyable="false"')}></l-code-snippet>`,
        angularHtml: `<l-code-snippet [code]="source"${html.replace(' line-numbers="true"', ' [lineNumbers]="true"').replace(' copyable="false"', ' [copyable]="false"')}></l-code-snippet>`,
        script: `document.getElementById("snippet").code = 'import { Button } from "lojee-ui";';`,
      })}
    >
      <OptionGroup label="Title and language" options={TOGGLE} value={title} onChange={setTitle} />
      <OptionGroup label="Line numbers" options={TOGGLE} value={lineNumbers} onChange={setLineNumbers} />
      <OptionGroup label="Copy button" options={TOGGLE} value={copyable} onChange={setCopyable} />
    </PlaygroundLayout>
  );
}
