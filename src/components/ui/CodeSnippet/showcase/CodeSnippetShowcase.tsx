import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { CodeSnippet } from "../CodeSnippet";
import { CopyButton } from "../CopyButton";

const SAMPLE = `import { Button } from "lojee-ui";

export function Save() {
  return <Button color="accent" label="Save" />;
}`;

export default function CodeSnippetShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Code Snippet</h1>
        <p className="mt-1 text-sm text-fg-subtle">A code block with an optional file name and language, line numbers, syntax colouring and a copy button — plus the copy button on its own.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`code` is the text. `title` and `language` fill the header, and the copy button sits in it.">Basic</SectionLabel>
        <div className="max-w-xl">
          <CodeSnippet code={SAMPLE} title="Save.tsx" language="tsx" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<CodeSnippet code={source} title="Save.tsx" language="tsx" />`,
            html: `<l-code-snippet id="snippet" heading="Save.tsx" language="tsx"></l-code-snippet>`,
            vueHtml: `<l-code-snippet :code="source" heading="Save.tsx" language="tsx"></l-code-snippet>`,
            angularHtml: `<l-code-snippet [code]="source" heading="Save.tsx" language="tsx"></l-code-snippet>`,
            script: `document.getElementById("snippet").code = 'import { Button } from "lojee-ui";';`,
            vueScript: `const source = \`import { Button } from "lojee-ui";\`;`,
            angularClass: `source = 'import { Button } from "lojee-ui";';`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`lineNumbers` adds a gutter; `copyable={false}` hides the copy button; with no `title` or `language` the header disappears.">Line numbers and options</SectionLabel>
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <CodeSnippet code={SAMPLE} language="tsx" lineNumbers />
          <CodeSnippet code={`npm install lojee-ui`} copyable={false} />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<CodeSnippet code={source} language="tsx" lineNumbers />
<CodeSnippet code="npm install lojee-ui" copyable={false} />`,
            html: `<l-code-snippet language="tsx" line-numbers="true"></l-code-snippet>
<l-code-snippet code="npm install lojee-ui" copyable="false"></l-code-snippet>`,
            vueHtml: `<l-code-snippet :code="source" language="tsx" :line-numbers="true"></l-code-snippet>
<l-code-snippet code="npm install lojee-ui" :copyable="false"></l-code-snippet>`,
            angularHtml: `<l-code-snippet [code]="source" language="tsx" [lineNumbers]="true"></l-code-snippet>
<l-code-snippet code="npm install lojee-ui" [copyable]="false"></l-code-snippet>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`CopyButton` works anywhere: give it the text to copy. It shows a check mark for a moment after copying, and `onCopy` reports it.">Copy button</SectionLabel>
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton text="npm install lojee-ui" />
          <CopyButton text="npm install lojee-ui" iconOnly />
          <CopyButton text="npm install lojee-ui" label="Copy command" copiedLabel="Copied!" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<CopyButton text="npm install lojee-ui" />
<CopyButton text="npm install lojee-ui" iconOnly />
<CopyButton text="npm install lojee-ui" label="Copy command" copiedLabel="Copied!" />`,
            html: `<l-copy-button text="npm install lojee-ui"></l-copy-button>
<l-copy-button text="npm install lojee-ui" icon-only="true"></l-copy-button>
<l-copy-button text="npm install lojee-ui" label="Copy command" copied-label="Copied!"></l-copy-button>`,
            vueHtml: `<l-copy-button text="npm install lojee-ui"></l-copy-button>
<l-copy-button text="npm install lojee-ui" :icon-only="true"></l-copy-button>
<l-copy-button text="npm install lojee-ui" label="Copy command" copied-label="Copied!"></l-copy-button>`,
            angularHtml: `<l-copy-button text="npm install lojee-ui"></l-copy-button>
<l-copy-button text="npm install lojee-ui" [iconOnly]="true"></l-copy-button>
<l-copy-button text="npm install lojee-ui" label="Copy command" copied-label="Copied!"></l-copy-button>`,
          })}
        />
      </section>
    </div>
  );
}
