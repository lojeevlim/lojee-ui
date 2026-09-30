import type { ReactNode } from "react";
import { useInView } from "./hooks";

/** Fades and slides its children in the first time they scroll into view. */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, shown] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} data-reveal data-shown={shown} style={{ ["--d" as string]: `${delay}ms` }} className={className}>
      {children}
    </div>
  );
}
