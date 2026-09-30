import { createContext, useContext } from "react";
import type { AppBreakpoint } from "./breakpoints";

export interface AppLayoutContextValue {
  breakpoint: AppBreakpoint;
  /** True while the App is narrower than `collapseBelow` — single column, Side shown as a drawer. */
  isCollapsed: boolean;
  sideOpen: boolean;
  setSideOpen: (open: boolean) => void;
}

export const AppLayoutCtx = createContext<AppLayoutContextValue>({ breakpoint: "md", isCollapsed: false, sideOpen: false, setSideOpen: () => {} });

/** Controls for the collapsed sidebar drawer — e.g. call `setSideOpen(false)` after a nav link is chosen. */
export function useAppLayout() {
  return useContext(AppLayoutCtx);
}
