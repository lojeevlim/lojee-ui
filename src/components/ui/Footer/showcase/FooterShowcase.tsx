import { Footer } from "../Footer";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

function LinkColumn({ heading, links, dark }: { heading: string; links: string[]; dark?: boolean }) {
  return (
    <div>
      <h4 className={`text-sm font-semibold ${dark ? "text-white" : "text-slate-900"}`}>{heading}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className={`text-sm ${dark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}`}>
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
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Footer</h1>
          <p className="text-sm text-slate-500 mt-1">A site-wide bottom footer with link columns and a copyright bar.</p>
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
          <SectionLabel sub={'Three themes: "light" (default), "dark", and "minimal" (no background, blends into the page).'}>
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
            <div className="rounded-lg border border-dashed border-slate-300 bg-white">
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

{/* Also available: variant="minimal" (no background, blends into the page). */}`,
              js: `<l-Footer variant="dark">
  <!-- link columns -->
  <div slot="bottom"><span class="text-slate-400">© 2026 Lojee, Inc.</span></div>
</l-Footer>

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
                  <a href="#" className="hover:text-slate-900">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-slate-900">
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
      </div>
    </div>
  );
}
