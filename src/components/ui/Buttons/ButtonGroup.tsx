import type { ReactNode } from "react";

export interface ButtonGroupProps {
  children: ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden divide-x divide-slate-200">
      <slot>{children}</slot>
    </div>
  );
}
