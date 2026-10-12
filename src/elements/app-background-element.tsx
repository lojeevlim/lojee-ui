import { AppBackground, type AppBackgroundProps } from "../components/ui/AppBackground/AppBackground";

/** A block-level host that fills whatever height the page gives <l-app-background>, with its children drawn on top of the background. */
export function AppBackgroundElement(props: AppBackgroundProps) {
  return <AppBackground {...props} className={`h-full ${props.className ?? ""}`} />;
}
