import type { ComponentType } from "react";
import ButtonPlayground from "./ButtonPlayground";
import BadgePlayground from "./BadgePlayground";
import AvatarPlayground from "./AvatarPlayground";
import IconPlayground from "./IconPlayground";
import SpinnerPlayground from "./SpinnerPlayground";
import LoaderPlayground from "./LoaderPlayground";
import DividerPlayground from "./DividerPlayground";
import TooltipPlayground from "./TooltipPlayground";
import CardPlayground from "./CardPlayground";
import ContainerPlayground from "./ContainerPlayground";
import SectionPlayground from "./SectionPlayground";
import GridPlayground from "./GridPlayground";
import ListPlayground from "./ListPlayground";
import TablePlayground from "./TablePlayground";
import AccordionPlayground from "./AccordionPlayground";
import TabsPlayground from "./TabsPlayground";
import BreadcrumbsPlayground from "./BreadcrumbsPlayground";
import PaginationPlayground from "./PaginationPlayground";
import CarouselPlayground from "./CarouselPlayground";

export interface PlaygroundProps {
  itemLabel?: string;
}

const PLAYGROUNDS: Record<string, ComponentType> = {
  Buttons: ButtonPlayground,
  Badges: BadgePlayground,
  Avatars: AvatarPlayground,
  Icons: IconPlayground,
  Spinners: SpinnerPlayground,
  Loaders: LoaderPlayground,
  Dividers: DividerPlayground,
  Tooltips: TooltipPlayground,
  Cards: CardPlayground,
  Containers: ContainerPlayground,
  Sections: SectionPlayground,
  Grids: GridPlayground,
  Lists: ListPlayground,
  Tables: TablePlayground,
  Accordions: AccordionPlayground,
  Tabs: TabsPlayground,
  Breadcrumbs: BreadcrumbsPlayground,
  Pagination: PaginationPlayground,
  Carousels: CarouselPlayground,
};

export default function Playground({ itemLabel }: PlaygroundProps) {
  const ActivePlayground = itemLabel ? PLAYGROUNDS[itemLabel] : undefined;
  if (ActivePlayground) {
    return <ActivePlayground />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-16 text-center">
      <p className="text-sm font-medium text-slate-900">
        {itemLabel ? `No playground for "${itemLabel}" yet` : "Pick a component to try it out"}
      </p>
      <p className="text-sm text-slate-500">Select a component with a playground in the sidebar.</p>
    </div>
  );
}
