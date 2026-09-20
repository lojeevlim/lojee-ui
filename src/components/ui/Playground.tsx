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
import InputPlayground from "./InputPlayground";
import TextareaPlayground from "./TextareaPlayground";
import LabelPlayground from "./LabelPlayground";
import CheckboxPlayground from "./CheckboxPlayground";
import RadioPlayground from "./RadioPlayground";
import SwitchPlayground from "./SwitchPlayground";
import SelectPlayground from "./SelectPlayground";
import MultiSelectPlayground from "./MultiSelectPlayground";
import ComboboxPlayground from "./ComboboxPlayground";
import DatePickerPlayground from "./DatePickerPlayground";
import TimePickerPlayground from "./TimePickerPlayground";
import FileUploadPlayground from "./FileUploadPlayground";
import SearchInputPlayground from "./SearchInputPlayground";
import SliderPlayground from "./SliderPlayground";
import RangeSliderPlayground from "./RangeSliderPlayground";
import ModalPlayground from "./ModalPlayground";
import AlertDialogPlayground from "./AlertDialogPlayground";
import DrawerPlayground from "./DrawerPlayground";
import SheetPlayground from "./SheetPlayground";
import PopoverPlayground from "./PopoverPlayground";
import DropdownMenuPlayground from "./DropdownMenuPlayground";
import ContextMenuPlayground from "./ContextMenuPlayground";
import CommandMenuPlayground from "./CommandMenuPlayground";
import AlertPlayground from "./AlertPlayground";
import ToastPlayground from "./ToastPlayground";
import NotificationPlayground from "./NotificationPlayground";
import ProgressBarPlayground from "./ProgressBarPlayground";
import EmptyStatePlayground from "./EmptyStatePlayground";
import ErrorStatePlayground from "./ErrorStatePlayground";
import SuccessStatePlayground from "./SuccessStatePlayground";
import LoadingStatePlayground from "./LoadingStatePlayground";
import NavbarPlayground from "./NavbarPlayground";
import SidebarPlayground from "./SidebarPlayground";
import HeaderPlayground from "./HeaderPlayground";
import FooterPlayground from "./FooterPlayground";
import NavigationMenuPlayground from "./NavigationMenuPlayground";
import BottomNavigationPlayground from "./BottomNavigationPlayground";
import StepperPlayground from "./StepperPlayground";
import DataGridPlayground from "./DataGridPlayground";
import TimelinePlayground from "./TimelinePlayground";
import StatPlayground from "./StatPlayground";
import ChartPlayground from "./ChartPlayground";
import CalendarPlayground from "./CalendarPlayground";
import ActivityFeedPlayground from "./ActivityFeedPlayground";

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
  Input: InputPlayground,
  Textarea: TextareaPlayground,
  Label: LabelPlayground,
  Checkbox: CheckboxPlayground,
  "Radio Group": RadioPlayground,
  "Switch / Toggle": SwitchPlayground,
  Select: SelectPlayground,
  "Multi Select": MultiSelectPlayground,
  Combobox: ComboboxPlayground,
  "Date Picker": DatePickerPlayground,
  "Time Picker": TimePickerPlayground,
  "File Upload": FileUploadPlayground,
  "Search Input": SearchInputPlayground,
  Slider: SliderPlayground,
  "Range Slider": RangeSliderPlayground,
  "Modal / Dialog": ModalPlayground,
  Drawer: DrawerPlayground,
  Sheet: SheetPlayground,
  Popover: PopoverPlayground,
  "Dropdown Menu": DropdownMenuPlayground,
  "Context Menu": ContextMenuPlayground,
  "Command Menu": CommandMenuPlayground,
  "Alert Dialog": AlertDialogPlayground,
  Tooltip: TooltipPlayground,
  Alert: AlertPlayground,
  Toast: ToastPlayground,
  Notification: NotificationPlayground,
  "Progress Bar": ProgressBarPlayground,
  "Empty State": EmptyStatePlayground,
  "Error State": ErrorStatePlayground,
  "Success State": SuccessStatePlayground,
  "Loading State": LoadingStatePlayground,
  Navbar: NavbarPlayground,
  Sidebar: SidebarPlayground,
  Header: HeaderPlayground,
  Footer: FooterPlayground,
  "Navigation Menu": NavigationMenuPlayground,
  "Bottom Navigation": BottomNavigationPlayground,
  Stepper: StepperPlayground,
  "Data Grid": DataGridPlayground,
  Timeline: TimelinePlayground,
  "Stats / KPI": StatPlayground,
  Charts: ChartPlayground,
  Calendar: CalendarPlayground,
  "Activity Feed": ActivityFeedPlayground,
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
