import { Footer } from "../Footer";
import CodeBlock from "../../CodeBlock";
import { SectionLabel, TransitionPreview } from "../../ShowcaseHelpers";

function LinkColumn({ heading, links, dark, accent }: { heading: string; links: string[]; dark?: boolean; accent?: boolean }) {
  return (
    <div>
      <h4 className={`text-sm font-semibold ${dark || accent ? "text-white" : "text-fg"}`}>{heading}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className={`text-sm ${accent ? "text-white/70 hover:text-white" : dark ? "text-slate-400 hover:text-white" : "text-fg-muted hover:text-fg"}`}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterShowcase() {
  return (
    <div className="min-h-screen rounded-xl bg-surface p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-fg">Footer</h1>
          <p className="text-sm text-fg-subtle mt-1">A site-wide bottom footer with link columns and a copyright bar.</p>
        </div>

        <section>
          <SectionLabel sub="A grid of link columns above a copyright line.">Basic</SectionLabel>
          <Footer bottom="© 2026 Lojee, Inc. All rights reserved.">
            <LinkColumn heading="Product" links={["Features", "Pricing", "Changelog"]} />
            <LinkColumn heading="Company" links={["About", "Careers", "Blog"]} />
            <LinkColumn heading="Resources" links={["Docs", "Guides", "Support"]} />
            <LinkColumn heading="Legal" links={["Privacy", "Terms"]} />
          </Footer>
          <CodeBlock
            variants={{
              react: `<Footer bottom="© 2026 Lojee, Inc. All rights reserved.">
  <div>
    <h4>Product</h4>
    <ul>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Changelog</a></li>
    </ul>
  </div>
  <div>
    <h4>Company</h4>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </div>
  <div>
    <h4>Resources</h4>
    <ul>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Guides</a></li>
      <li><a href="#">Support</a></li>
    </ul>
  </div>
  <div>
    <h4>Legal</h4>
    <ul>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
    </ul>
  </div>
</Footer>`,
              js: `<l-Footer bottom="© 2026 Lojee, Inc. All rights reserved.">
  <div>
    <h4>Product</h4>
    <ul>
      <li><a href="#">Features</a></li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Changelog</a></li>
    </ul>
  </div>
  <div>
    <h4>Company</h4>
    <ul>
      <li><a href="#">About</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Blog</a></li>
    </ul>
  </div>
  <div>
    <h4>Resources</h4>
    <ul>
      <li><a href="#">Docs</a></li>
      <li><a href="#">Guides</a></li>
      <li><a href="#">Support</a></li>
    </ul>
  </div>
  <div>
    <h4>Legal</h4>
    <ul>
      <li><a href="#">Privacy</a></li>
      <li><a href="#">Terms</a></li>
    </ul>
  </div>
</l-Footer>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer bottom="© 2026 Lojee, Inc. All rights reserved.">
    <div v-for="column in columns" :key="column.heading">
      <h4>{{ column.heading }}</h4>
      <ul>
        <li v-for="link in column.links" :key="link"><a href="#">{{ link }}</a></li>
      </ul>
    </div>
  </l-Footer>
</template>`,
              angular: `<l-Footer bottom="© 2026 Lojee, Inc. All rights reserved.">
  <div *ngFor="let column of columns">
    <h4>{{ column.heading }}</h4>
    <ul>
      <li *ngFor="let link of column.links"><a href="#">{{ link }}</a></li>
    </ul>
  </div>
</l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub={`Four looks: "light" (default), "dark", "minimal" (no background, blends into the page) and "accent" (a solid color background — the theme's accent by default, so it changes with the accent picker; pass color for another).`}>
            Variants
          </SectionLabel>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-slate-800">
              <Footer variant="dark" bottom={<span className="text-slate-400">© 2026 Lojee, Inc. All rights reserved.</span>}>
                <LinkColumn heading="Product" links={["Features", "Pricing"]} dark />
                <LinkColumn heading="Company" links={["About", "Careers"]} dark />
                <LinkColumn heading="Resources" links={["Docs", "Support"]} dark />
                <LinkColumn heading="Legal" links={["Privacy", "Terms"]} dark />
              </Footer>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <Footer variant="accent" bottom="© 2026 Lojee, Inc. All rights reserved.">
                <LinkColumn heading="Product" links={["Features", "Pricing"]} accent />
                <LinkColumn heading="Company" links={["About", "Careers"]} accent />
                <LinkColumn heading="Resources" links={["Docs", "Support"]} accent />
                <LinkColumn heading="Legal" links={["Privacy", "Terms"]} accent />
              </Footer>
            </div>
            <div className="overflow-hidden rounded-lg border border-border">
              <Footer variant="accent" color="emerald" bottom="© 2026 Lojee, Inc. — color=&quot;emerald&quot;">
                <LinkColumn heading="Product" links={["Features", "Pricing"]} accent />
                <LinkColumn heading="Company" links={["About", "Careers"]} accent />
              </Footer>
            </div>
            <div className="rounded-lg border border-dashed border-border-strong bg-surface">
              <Footer variant="minimal" bottom="© 2026 Lojee, Inc. All rights reserved.">
                <LinkColumn heading="Product" links={["Features", "Pricing"]} />
                <LinkColumn heading="Company" links={["About", "Careers"]} />
              </Footer>
            </div>
          </div>
          <CodeBlock
            variants={{
              react: `<Footer variant="dark" bottom={<span className="text-slate-400">© 2026 Lojee, Inc.</span>}>
  <LinkColumns />
</Footer>

{/* Also available: variant="minimal" (no background, blends into the page)
    and variant="accent" — a solid background in the theme accent: */}
<Footer variant="accent" bottom="© 2026 Lojee, Inc.">
  <LinkColumns />
</Footer>

{/* pin another color */}
<Footer variant="accent" color="emerald" bottom="© 2026 Lojee, Inc." />`,
              js: `<l-Footer variant="dark">
  <!-- link columns -->
  <div slot="bottom"><span class="text-slate-400">© 2026 Lojee, Inc.</span></div>
</l-Footer>

<!-- Theme-accent footer: <l-Footer variant="accent"> — pin a color with color="emerald" -->

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer variant="dark">
    <!-- link columns -->
    <template #bottom><span class="text-slate-400">© 2026 Lojee, Inc.</span></template>
  </l-Footer>
</template>`,
              angular: `<l-Footer variant="dark">
  <!-- link columns -->
  <div slot="bottom"><span class="text-slate-400">© 2026 Lojee, Inc.</span></div>
</l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Just the bottom bar — copyright plus a couple of legal links, no columns.">
            Bottom bar only
          </SectionLabel>
          <Footer
            bottom={
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>© 2026 Lojee, Inc. All rights reserved.</span>
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-fg">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-fg">
                    Terms
                  </a>
                </div>
              </div>
            }
          />
          <CodeBlock
            variants={{
              react: `<Footer
  bottom={
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span>© 2026 Lojee, Inc. All rights reserved.</span>
      <div className="flex items-center gap-4">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  }
/>`,
              js: `<l-Footer>
  <div slot="bottom" class="flex flex-wrap items-center justify-between gap-3">
    <span>© 2026 Lojee, Inc. All rights reserved.</span>
    <div class="flex items-center gap-4">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
  </div>
</l-Footer>

<script type="module">import "lojee-ui/elements";</script>`,
              vue: `<template>
  <l-Footer>
    <template #bottom>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span>© 2026 Lojee, Inc. All rights reserved.</span>
        <div class="flex items-center gap-4">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </template>
  </l-Footer>
</template>`,
              angular: `<l-Footer>
  <div slot="bottom" class="flex flex-wrap items-center justify-between gap-3">
    <span>© 2026 Lojee, Inc. All rights reserved.</span>
    <div class="flex items-center gap-4">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
    </div>
  </div>
</l-Footer>`,
            }}
          />
        </section>

        <section>
          <SectionLabel sub="Enter transitions via `transition` (with `transitionDuration` / `transitionDelay`). They play on mount — reload the page, or use Replay in the playground.">Transitions</SectionLabel>
          <TransitionPreview cols={2}>
            <Footer bottom="Fade" transition="fade" />
            <Footer bottom="Slide down" transition="slide-down" />
            <Footer bottom="Slide right" transition="slide-right" transitionDelay={100} />
            <Footer bottom="Zoom" transition="zoom" />
            <Footer bottom="Blur" transition="blur" />
            <Footer bottom="Drop" transition="drop" transitionDuration={700} />
          </TransitionPreview>
          <CodeBlock
            variants={{
              react: `<Footer bottom="Fade" transition="fade" />
<Footer bottom="Slide down" transition="slide-down" />
<Footer bottom="Slide right" transition="slide-right" transitionDelay={100} />
<Footer bottom="Zoom" transition="zoom" />
<Footer bottom="Blur" transition="blur" />
<Footer bottom="Drop" transition="drop" transitionDuration={700} />`,
              js: `<l-Footer bottom="Fade" transition="fade"></l-Footer>
<l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
<l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
<l-Footer bottom="Zoom" transition="zoom"></l-Footer>
<l-Footer bottom="Blur" transition="blur"></l-Footer>
<l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>

<script type="module">
  import "lojee-ui/elements";
</script>`,
              vue: `<template>
  <l-Footer bottom="Fade" transition="fade"></l-Footer>
  <l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
  <l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
  <l-Footer bottom="Zoom" transition="zoom"></l-Footer>
  <l-Footer bottom="Blur" transition="blur"></l-Footer>
  <l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>
</template>

<script setup lang="ts">
import "lojee-ui/elements";
</script>`,
              angular: `// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "lojee-ui/elements";

@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <l-Footer bottom="Fade" transition="fade"></l-Footer>
    <l-Footer bottom="Slide down" transition="slide-down"></l-Footer>
    <l-Footer bottom="Slide right" transition="slide-right" transitionDelay="100"></l-Footer>
    <l-Footer bottom="Zoom" transition="zoom"></l-Footer>
    <l-Footer bottom="Blur" transition="blur"></l-Footer>
    <l-Footer bottom="Drop" transition="drop" transitionDuration="700"></l-Footer>
  \`,
})
export class AppComponent {}`,
            }}
          />
        </section>
      </div>
    </div>
  );
}
