import { Suspense, type ReactNode } from "react";
import { useInView } from "./hooks";

/** Mounts its children (a lazy chunk, usually) only once the placeholder is near the viewport, so offscreen sections cost nothing up front. */
export default function LazyOnView({ children, minHeight = 480 }: { children: ReactNode; minHeight?: number }) {
  const [ref, near] = useInView<HTMLDivElement>(0, "400px 0px 400px 0px");
  return (
    <div ref={ref} style={near ? undefined : { minHeight }}>
      {near && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
    </div>
  );
}
