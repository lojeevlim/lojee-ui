import { useState } from "react";
import { Card, type CardVariant, type CardPadding } from "./Card/Card";
import { OptionGroup, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useAnimation } from "./playgroundAnimation";
import { useMotion } from "./playgroundMotion";

const VARIANTS: CardVariant[] = ["outline", "elevated", "soft", "ghost"];
const PADDINGS: CardPadding[] = ["none", "sm", "md", "lg"];

export default function CardPlayground() {
  const anim = useAnimation();
  const motion = useMotion();
  const [variant, setVariant] = useState<CardVariant>("outline");
  const [padding, setPadding] = useState<CardPadding>("md");
  const [hoverable, setHoverable] = useState(false);
  const [withTitle, setWithTitle] = useState(false);
  const [withFooter, setWithFooter] = useState(false);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Card
          key={motion.replayKey}
          {...anim.props}
          {...motion.props}
          variant={variant}
          padding={padding}
          hoverable={hoverable}
          title={withTitle ? "Card title" : undefined}
          footer={withFooter ? <span className="text-xs text-fg-subtle">Footer content</span> : undefined}
          className="w-64"
        >
          Sample content
        </Card>
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Card variant="${variant}" padding="${padding}"${anim.attrs}${motion.attrs}${hoverable ? " hoverable" : ""}${
    withTitle ? ` title="Card title"` : ""
  }${withFooter ? ` footer={<span>Footer content</span>}` : ""}>
  Sample content
</Card>`;

  // Custom-element markup for the current configuration — l-card's `footer`
  // prop is a plain string (unlike React's JSX footer node above).
  const htmlMarkup = `<l-Card variant="${variant}" padding="${padding}"${anim.attrs}${motion.attrs}${hoverable ? ` hoverable` : ""}${
    withTitle ? ` title="Card title"` : ""
  }${withFooter ? ` footer="Footer content"` : ""}>
  Sample content
</l-Card>`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Variant" options={VARIANTS} value={variant} onChange={setVariant} />
      <OptionGroup label="Padding" options={PADDINGS} value={padding} onChange={setPadding} />

      <div>
        <span className="mb-1.5 block text-xs font-medium text-fg-subtle">Options</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setHoverable((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (hoverable ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            Hoverable
          </button>
          <button
            type="button"
            onClick={() => setWithTitle((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withTitle ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            With title
          </button>
          <button
            type="button"
            onClick={() => setWithFooter((v) => !v)}
            className={
              "rounded-md px-2.5 py-1 text-xs font-medium transition-colors " +
              (withFooter ? "bg-fg text-surface" : "bg-surface-muted text-fg-muted hover:bg-border")
            }
          >
            With footer
          </button>
        </div>
      </div>
      {anim.controls}
      {motion.controls}
    </PlaygroundLayout>
  );
}
