import { Iframe } from "../Iframe";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

const variants = (react: string, html: string) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue: html,
  angular: html,
});

export default function IframeShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Iframe</h1>
          <p className="mt-1 text-sm text-fg-subtle">Embed another page in a frame — with a loading spinner, a fixed height or aspect ratio, sandbox and permission props, and an optional address bar. Some sites refuse to be embedded and show a blank frame.</p>
        </div>

        <section>
          <SectionLabel sub="A fixed height. title is required — it is the frame's accessible name.">Basic</SectionLabel>
          <div className="max-w-xl">
            <Iframe src="https://example.com" title="Example page" height={260} />
          </div>
          <CodeBlock
            variants={variants(
              `<Iframe src="https://example.com" title="Example page" height={260} />`,
              `<l-iframe src="https://example.com" title="Example page" height="260"></l-iframe>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="ratio keeps a 16:9, 21:9 or square shape as the width changes; showAddress adds a small host bar.">Aspect ratio and address bar</SectionLabel>
          <div className="max-w-xl">
            <Iframe src="https://example.com" title="Example page" ratio="video" showAddress />
          </div>
          <CodeBlock
            variants={variants(
              `<Iframe src="https://example.com" title="Example page" ratio="video" showAddress />`,
              `<l-iframe src="https://example.com" title="Example page" ratio="video" show-address="true"></l-iframe>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="sandbox restricts what the embedded page can do — list only the permissions you need. allow grants browser features.">Sandboxed</SectionLabel>
          <div className="max-w-xl">
            <Iframe
              src="https://example.com"
              title="Example page"
              height={200}
              sandbox="allow-scripts allow-same-origin"
              allow="fullscreen"
              bordered={false}
              showLoader={false}
            />
          </div>
          <CodeBlock
            variants={variants(
              `<Iframe
  src="https://example.com"
  title="Example page"
  height={200}
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen"
  bordered={false}
  showLoader={false}
/>`,
              `<l-iframe
  src="https://example.com"
  title="Example page"
  height="200"
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen"
  bordered="false"
  show-loader="false"
></l-iframe>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
