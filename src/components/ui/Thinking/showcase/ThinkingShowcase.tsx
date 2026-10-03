import { Thinking } from "../Thinking";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, Row } from "../../ShowcaseHelpers";

const variants = (react: string, html: string) => ({
  react,
  js: `${html}\n\n<script type="module">import "lojee-ui/elements";</script>`,
  vue: html,
  angular: html,
});

export default function ThinkingShowcase() {
  return (
    <div>
      <div className="space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Thinking</h1>
          <p className="mt-1 text-sm text-fg-subtle">An AI "thinking" indicator — animated dots, wave bars, an orb or a shimmering label, with optional rotating status lines and a timer.</p>
        </div>

        <section>
          <SectionLabel sub="Four looks. The default is three bouncing dots.">Variants</SectionLabel>
          <Row>
            <Thinking variant="dots" />
            <Thinking variant="wave" />
            <Thinking variant="orb" />
            <Thinking variant="shimmer" />
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking variant="dots" />
<Thinking variant="wave" />
<Thinking variant="orb" />
<Thinking variant="shimmer" />`,
              `<l-Thinking variant="dots"></l-Thinking>
<l-Thinking variant="wave"></l-Thinking>
<l-Thinking variant="orb"></l-Thinking>
<l-Thinking variant="shimmer"></l-Thinking>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Pass steps to cycle through what the assistant is doing, and showElapsed for a running timer.">Steps and timer</SectionLabel>
          <Row>
            <Thinking variant="orb" steps={["Reading the question", "Searching the docs", "Writing the answer"]} showElapsed />
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking
  variant="orb"
  steps={["Reading the question", "Searching the docs", "Writing the answer"]}
  showElapsed
/>`,
              `<l-Thinking id="t" variant="orb" show-elapsed="true"></l-Thinking>
<script type="module">
  document.getElementById("t").steps = ["Reading the question", "Searching the docs", "Writing the answer"];
</script>`
            )}
          />
        </section>

        <section>
          <SectionLabel sub="Three sizes and any palette color; the default follows the theme accent.">Sizes and colors</SectionLabel>
          <Row>
            <Thinking size="sm" label="Small" />
            <Thinking size="md" label="Medium" color="violet" />
            <Thinking size="lg" label="Large" color="emerald" variant="wave" />
          </Row>
          <CodeBlock
            variants={variants(
              `<Thinking size="sm" label="Small" />
<Thinking size="md" label="Medium" color="violet" />
<Thinking size="lg" label="Large" color="emerald" variant="wave" />`,
              `<l-Thinking size="sm" label="Small"></l-Thinking>
<l-Thinking size="md" label="Medium" color="violet"></l-Thinking>
<l-Thinking size="lg" label="Large" color="emerald" variant="wave"></l-Thinking>`
            )}
          />
        </section>
      </div>
    </div>
  );
}
