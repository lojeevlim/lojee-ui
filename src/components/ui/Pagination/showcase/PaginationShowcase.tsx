import { useState } from "react";
import { Pagination } from "../Pagination";
import CodeBlock from "../../CodeBlock";
import { SectionLabel } from "../../ShowcaseHelpers";

export default function PaginationShowcase() {
  const [basicPage, setBasicPage] = useState(1);
  const [longPage, setLongPage] = useState(6);
  const [widePage, setWidePage] = useState(6);
  const [colorPage, setColorPage] = useState(3);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pagination</h1>
          <p className="text-sm text-slate-500 mt-1">A controlled page list with prev/next arrows and ellipsis collapsing.</p>
        </div>

        <section>
          <SectionLabel sub="Few pages — no ellipsis needed.">Basic</SectionLabel>
          <Pagination page={basicPage} totalPages={5} onPageChange={setBasicPage} />
          <CodeBlock
            code={`const [page, setPage] = useState(1);

<Pagination page={page} totalPages={5} onPageChange={setPage} />`}
          />
        </section>

        <section>
          <SectionLabel sub="Many pages — collapses into ellipses around the current page.">Long range</SectionLabel>
          <Pagination page={longPage} totalPages={20} onPageChange={setLongPage} />
          <CodeBlock
            code={`const [page, setPage] = useState(6);

<Pagination page={page} totalPages={20} onPageChange={setPage} />`}
          />
        </section>

        <section>
          <SectionLabel sub="More neighboring pages shown before collapsing.">siblingCount</SectionLabel>
          <Pagination page={widePage} totalPages={20} siblingCount={2} onPageChange={setWidePage} />
          <CodeBlock code={`<Pagination page={page} totalPages={20} siblingCount={2} onPageChange={setPage} />`} />
        </section>

        <section>
          <SectionLabel sub="Matches the shared color palette.">Color</SectionLabel>
          <Pagination page={colorPage} totalPages={10} color="indigo" onPageChange={setColorPage} />
          <CodeBlock code={`<Pagination page={page} totalPages={10} color="indigo" onPageChange={setPage} />`} />
        </section>
      </div>
    </div>
  );
}
