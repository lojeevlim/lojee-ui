import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";
import { wcCode } from "../../webComponentCode";
import { Skeleton } from "../Skeleton";

export default function SkeletonShowcase() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-fg">Skeleton</h1>
        <p className="mt-1 text-sm text-fg-subtle">A grey placeholder in the shape of content that is still loading — text lines, a block, or an avatar — so a page doesn&apos;t jump when the real content arrives.</p>
      </div>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`variant` picks the shape: "text" (default), "rect" or "circle". `lines` draws several text lines, with a shorter last one like real text.'}>Shapes</SectionLabel>
        <div className="flex max-w-lg items-start gap-6">
          <Skeleton variant="circle" size={48} />
          <div className="flex-1 space-y-4">
            <Skeleton lines={3} />
            <Skeleton variant="rect" height={96} />
          </div>
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<Skeleton variant="circle" size={48} />
<Skeleton lines={3} />
<Skeleton variant="rect" height={96} />`,
            html: `<l-Skeleton variant="circle" size="48"></l-Skeleton>
<l-Skeleton lines="3"></l-Skeleton>
<l-Skeleton variant="rect" height="96"></l-Skeleton>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub={'`animation` is "pulse" (default), "shimmer" (a light sweep across) or "none". Both respect `prefers-reduced-motion`.'}>Animation</SectionLabel>
        <div className="grid max-w-lg gap-4 sm:grid-cols-3">
          <div>
            <Skeleton variant="rect" animation="pulse" />
            <p className="mt-1.5 text-center text-xs text-fg-subtle">pulse</p>
          </div>
          <div>
            <Skeleton variant="rect" animation="shimmer" />
            <p className="mt-1.5 text-center text-xs text-fg-subtle">shimmer</p>
          </div>
          <div>
            <Skeleton variant="rect" animation="none" />
            <p className="mt-1.5 text-center text-xs text-fg-subtle">none</p>
          </div>
        </div>
        <CodeBlock
          variants={wcCode({
            react: `<Skeleton variant="rect" animation="shimmer" />`,
            html: `<l-Skeleton variant="rect" animation="shimmer"></l-Skeleton>`,
          })}
        />
      </section>

      <section className="mt-10 space-y-3">
        <SectionLabel sub="Put several together in the layout of the real thing — a card, a list row, a table — and swap them for the content once it has loaded.">A loading card</SectionLabel>
        <div className="max-w-sm space-y-4 rounded-xl border border-border p-4">
          <Skeleton variant="rect" height={140} animation="shimmer" />
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" size={36} animation="shimmer" />
            <div className="flex-1">
              <Skeleton width="60%" animation="shimmer" />
            </div>
          </div>
          <Skeleton lines={2} animation="shimmer" />
        </div>
        <CodeBlock
          variants={wcCode({
            react: `{loading ? (
  <div>
    <Skeleton variant="rect" height={140} animation="shimmer" />
    <Skeleton variant="circle" size={36} animation="shimmer" />
    <Skeleton lines={2} animation="shimmer" />
  </div>
) : (
  <Card>…</Card>
)}`,
            html: `<div id="card-loading">
  <l-Skeleton variant="rect" height="140" animation="shimmer"></l-Skeleton>
  <l-Skeleton variant="circle" size="36" animation="shimmer"></l-Skeleton>
  <l-Skeleton lines="2" animation="shimmer"></l-Skeleton>
</div>`,
            vueHtml: `<div v-if="loading">
  <l-Skeleton variant="rect" height="140" animation="shimmer"></l-Skeleton>
  <l-Skeleton variant="circle" size="36" animation="shimmer"></l-Skeleton>
  <l-Skeleton lines="2" animation="shimmer"></l-Skeleton>
</div>
<l-Card v-else>…</l-Card>`,
            angularHtml: `<div *ngIf="loading; else loaded">
  <l-Skeleton variant="rect" height="140" animation="shimmer"></l-Skeleton>
  <l-Skeleton variant="circle" size="36" animation="shimmer"></l-Skeleton>
  <l-Skeleton lines="2" animation="shimmer"></l-Skeleton>
</div>
<ng-template #loaded><l-Card>…</l-Card></ng-template>`,
            script: `// remove the placeholder when the data arrives
document.getElementById("card-loading").remove();`,
            vueScript: `const loading = ref(true);`,
            angularClass: `loading = true;`,
          })}
        />
      </section>
    </div>
  );
}
