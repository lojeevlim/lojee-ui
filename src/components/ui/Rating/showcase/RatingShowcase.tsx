import { useState } from "react";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { Rating } from "../Rating";

function Controlled() {
  const [value, setValue] = useState(3);
  return (
    <div className="space-y-2">
      <Rating value={value} onChange={setValue} />
      <p className="text-xs text-fg-subtle">
        Rating: <span className="font-mono text-fg-muted">{value}</span>
      </p>
    </div>
  );
}

export default function RatingShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Rating</h1>
        <p className="mt-1 text-sm text-fg-subtle">A row of stars for showing or giving a rating. Hover to preview, click to set (click the same star again to clear), arrow keys to adjust.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="It keeps its own value, so it works with nothing wired up. `onChange` reports the new rating.">Basic</SectionLabel>
        <Controlled />
        <CodeBlock
          variants={wcCode({
            react: `const [value, setValue] = useState(3);

<Rating value={value} onChange={setValue} />`,
            html: `<l-rating id="rating" value="3"></l-rating>`,
            vueHtml: `<l-rating :value="value" @change="value = $event.detail"></l-rating>`,
            angularHtml: `<l-rating [value]="value" (change)="value = $event.detail"></l-rating>`,
            script: `document.getElementById("rating").addEventListener("change", (e) => console.log(e.detail)); // number`,
            vueScript: `const value = ref(3);`,
            angularClass: `value = 3;`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`allowHalf` lets a rating be given in half steps (the left half of a star is a half); `max` sets the number of stars.">Half stars and max</SectionLabel>
        <div className="space-y-3">
          <Rating value={3.5} allowHalf />
          <Rating value={7} max={10} size="sm" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<Rating value={3.5} allowHalf />
<Rating value={7} max={10} size="sm" />`,
            html: `<l-rating value="3.5" allow-half="true"></l-rating>
<l-rating value="7" max="10" size="sm"></l-rating>`,
            vueHtml: `<l-rating :value="3.5" :allow-half="true"></l-rating>
<l-rating :value="7" :max="10" size="sm"></l-rating>`,
            angularHtml: `<l-rating [value]="3.5" [allowHalf]="true"></l-rating>
<l-rating [value]="7" [max]="10" size="sm"></l-rating>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="`readOnly` just shows a rating, e.g. the average on a product. Three sizes.">Read-only and sizes</SectionLabel>
        <div className="flex flex-wrap items-center gap-6">
          <Rating value={4.5} allowHalf readOnly />
          <Rating value={4} readOnly size="sm" />
          <Rating value={4} readOnly size="lg" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<Rating value={4.5} allowHalf readOnly />
<Rating value={4} readOnly size="lg" />`,
            html: `<l-rating value="4.5" allow-half="true" read-only="true"></l-rating>
<l-rating value="4" read-only="true" size="lg"></l-rating>`,
            vueHtml: `<l-rating :value="4.5" :allow-half="true" :read-only="true"></l-rating>
<l-rating :value="4" :read-only="true" size="lg"></l-rating>`,
            angularHtml: `<l-rating [value]="4.5" [allowHalf]="true" [readOnly]="true"></l-rating>
<l-rating [value]="4" [readOnly]="true" size="lg"></l-rating>`,
          })}
        />
      </section>
    </div>
  );
}
