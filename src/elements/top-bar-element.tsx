import { TopBar, type TopBarProps } from "../components/ui/TopBar/TopBar";

// The element always has `onBack` / `onMenuClick` (they dispatch events), so React's "button shown when a handler is
// given" rule would always show both — here they show only with `back="true"` / `menu="true"`.
export function TopBarElement(props: TopBarProps) {
  return <TopBar {...props} back={props.back ?? false} menu={props.menu ?? false} />;
}
