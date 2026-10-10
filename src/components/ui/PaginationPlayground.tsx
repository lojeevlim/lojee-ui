import { useState } from "react";
import { Pagination } from "./Pagination/Pagination";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout, AppWindowFrame, AppWindowBody } from "./PlaygroundHelpers";
import type { CodeBlockVariants } from "./CodeBlock";
import { useMotion } from "./playgroundMotion";

const TOTAL_PAGES_OPTIONS = ["5", "10", "20"] as const;
const SIBLING_COUNT_OPTIONS = ["0", "1", "2"] as const;

export default function PaginationPlayground() {
  const motion = useMotion({ hover: false });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<(typeof TOTAL_PAGES_OPTIONS)[number]>("10");
  const [siblingCount, setSiblingCount] = useState<(typeof SIBLING_COUNT_OPTIONS)[number]>("1");
  const [color, setColor] = useState<ColorName>("accent");

  const totalPagesNum = Number(totalPages);
  const siblingCountNum = Number(siblingCount);
  const clampedPage = Math.min(page, totalPagesNum);

  const preview = (
    <AppWindowFrame>
      <AppWindowBody>
        <Pagination
          key={motion.replayKey}
          {...motion.props}
          page={clampedPage}
          totalPages={totalPagesNum}
          siblingCount={siblingCountNum}
          color={color}
          onPageChange={setPage}
        />
      </AppWindowBody>
    </AppWindowFrame>
  );

  const code = `<Pagination
  page={page}
  totalPages={${totalPagesNum}}
  siblingCount={${siblingCountNum}}
  color="${color}"${motion.attrs}
  onPageChange={setPage}
/>`;

  // Custom-element markup for the current configuration — identical across
  // Vue/Angular templates (plain attributes, no bindings needed for a static
  // snapshot); the "js" variant just adds the one-time module import a plain
  // HTML page needs to actually load the `<l-*>` definitions. `l-pagination`
  // dispatches a "pagechange" event on interaction, but that wiring isn't
  // part of this baked snapshot's control state, so it's left for the
  // consumer to add (`el.addEventListener("pagechange", ...)`).
  const htmlMarkup = `<l-pagination page="${clampedPage}" totalPages="${totalPagesNum}" siblingCount="${siblingCountNum}" color="${color}"${motion.attrs} />`;

  const codeVariants: CodeBlockVariants = {
    react: code,
    js: `${htmlMarkup}\n\n<script type="module">import "lojee-ui/elements";</script>`,
    vue: htmlMarkup,
    angular: htmlMarkup,
  };

  return (
    <PlaygroundLayout preview={preview} variants={codeVariants}>
      <OptionGroup label="Total pages" options={TOTAL_PAGES_OPTIONS} value={totalPages} onChange={setTotalPages} />
      <OptionGroup label="Sibling count" options={SIBLING_COUNT_OPTIONS} value={siblingCount} onChange={setSiblingCount} />
      <ColorSwatches value={color} onChange={setColor} />
      {motion.controls}
    </PlaygroundLayout>
  );
}
