import { useState } from "react";
import { Pagination } from "./Pagination/Pagination";
import type { ColorName } from "../../core/tokens";
import { OptionGroup, ColorSwatches, PlaygroundLayout } from "./PlaygroundHelpers";

const TOTAL_PAGES_OPTIONS = ["5", "10", "20"] as const;
const SIBLING_COUNT_OPTIONS = ["0", "1", "2"] as const;

export default function PaginationPlayground() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<(typeof TOTAL_PAGES_OPTIONS)[number]>("10");
  const [siblingCount, setSiblingCount] = useState<(typeof SIBLING_COUNT_OPTIONS)[number]>("1");
  const [color, setColor] = useState<ColorName>("slate");

  const totalPagesNum = Number(totalPages);
  const siblingCountNum = Number(siblingCount);
  const clampedPage = Math.min(page, totalPagesNum);

  const preview = (
    <Pagination
      page={clampedPage}
      totalPages={totalPagesNum}
      siblingCount={siblingCountNum}
      color={color}
      onPageChange={setPage}
    />
  );

  const code = `<Pagination
  page={page}
  totalPages={${totalPagesNum}}
  siblingCount={${siblingCountNum}}
  color="${color}"
  onPageChange={setPage}
/>`;

  return (
    <PlaygroundLayout preview={preview} code={code}>
      <OptionGroup label="Total pages" options={TOTAL_PAGES_OPTIONS} value={totalPages} onChange={setTotalPages} />
      <OptionGroup label="Sibling count" options={SIBLING_COUNT_OPTIONS} value={siblingCount} onChange={setSiblingCount} />
      <ColorSwatches value={color} onChange={setColor} />
    </PlaygroundLayout>
  );
}
