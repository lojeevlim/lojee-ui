import type { ComponentType } from "react";
import ButtonPlayground from "./ButtonPlayground";
import BadgePlayground from "./BadgePlayground";
import AvatarPlayground from "./AvatarPlayground";
import IconPlayground from "./IconPlayground";
import SpinnerPlayground from "./SpinnerPlayground";
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
import TopBarPlayground from "./TopBarPlayground";
import FlowDiagramPlayground from "./FlowDiagramPlayground";
import MapPlayground from "./MapPlayground";
import MapMarkerPlayground from "./MapMarkerPlayground";
import MapRoutePlayground from "./MapRoutePlayground";
import SidebarPlayground from "./SidebarPlayground";
import HeaderPlayground from "./HeaderPlayground";
import FooterPlayground from "./FooterPlayground";
import AppLayoutPlayground from "./AppLayoutPlayground";
import MainPlayground from "./MainPlayground";
import ThemeSwitcherPlayground from "./ThemeSwitcherPlayground";
import ImagePlayground from "./ImagePlayground";
import VideoPlayground from "./VideoPlayground";
import SkeletonPlayground from "./SkeletonPlayground";
import TagInputPlayground from "./TagInputPlayground";
import NumberInputPlayground from "./NumberInputPlayground";
import OtpInputPlayground from "./OtpInputPlayground";
import RatingPlayground from "./RatingPlayground";
import ColorPickerPlayground from "./ColorPickerPlayground";
import CodeSnippetPlayground from "./CodeSnippetPlayground";
import NavigationMenuPlayground from "./NavigationMenuPlayground";
import BottomNavigationPlayground from "./BottomNavigationPlayground";
import StepperPlayground from "./StepperPlayground";
import TimelinePlayground from "./TimelinePlayground";
import StatPlayground from "./StatPlayground";
import ChartPlayground from "./ChartPlayground";
import CalendarPlayground from "./CalendarPlayground";
import ActivityFeedPlayground from "./ActivityFeedPlayground";
import GridViewPlayground from "./GridViewPlayground";
import DetailsListPlayground from "./DetailsListPlayground";
import ProfileCardPlayground from "./ProfileCardPlayground";
import UserMenuPlayground from "./UserMenuPlayground";
import PasswordInputPlayground from "./PasswordInputPlayground";
import LoginFormPlayground from "./LoginFormPlayground";
import SignupFormPlayground from "./SignupFormPlayground";
import ProfileSettingsPlayground from "./ProfileSettingsPlayground";
import PlanBillingPlayground from "./PlanBillingPlayground";
import IframePlayground from "./IframePlayground";
import ChatBoxPlayground from "./ChatBoxPlayground";
import ThinkingPlayground from "./ThinkingPlayground";
import AccountSettingsPlayground from "./AccountSettingsPlayground";

export interface PlaygroundProps {
  itemLabel?: string;
}

const PLAYGROUNDS: Record<string, ComponentType> = {
  Buttons: ButtonPlayground,
  Badges: BadgePlayground,
  Avatars: AvatarPlayground,
  Icons: IconPlayground,
  Spinners: SpinnerPlayground,
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
  "Top Bar": TopBarPlayground,
  "Flow Diagram": FlowDiagramPlayground,
  Map: MapPlayground,
  "Map Markers": MapMarkerPlayground,
  "Map Routes": MapRoutePlayground,
  Sidebar: SidebarPlayground,
  Header: HeaderPlayground,
  Footer: FooterPlayground,
  App: AppLayoutPlayground,
  Main: MainPlayground,
  Images: ImagePlayground,
  Videos: VideoPlayground,
  Skeletons: SkeletonPlayground,
  "Tag Input": TagInputPlayground,
  "Number Input": NumberInputPlayground,
  "OTP Input": OtpInputPlayground,
  Rating: RatingPlayground,
  "Color Picker": ColorPickerPlayground,
  "Code Snippet": CodeSnippetPlayground,
  "Theme Switcher": ThemeSwitcherPlayground,
  "Navigation Menu": NavigationMenuPlayground,
  "Bottom Navigation": BottomNavigationPlayground,
  Stepper: StepperPlayground,
  Timeline: TimelinePlayground,
  "Stats / KPI": StatPlayground,
  Charts: ChartPlayground,
  Calendar: CalendarPlayground,
  "Activity Feed": ActivityFeedPlayground,
  "Grid View": GridViewPlayground,
  "Details List": DetailsListPlayground,
  "Profile Card": ProfileCardPlayground,
  "User Menu": UserMenuPlayground,
  "Password Input": PasswordInputPlayground,
  "Login Form": LoginFormPlayground,
  "Signup Form": SignupFormPlayground,
  "Profile Settings": ProfileSettingsPlayground,
  "Plan & Billing": PlanBillingPlayground,
  Iframe: IframePlayground,
  "Chat Box": ChatBoxPlayground,
  Thinking: ThinkingPlayground,
  "Account Settings": AccountSettingsPlayground,
};

export default function Playground({ itemLabel }: PlaygroundProps) {
  const ActivePlayground = itemLabel ? PLAYGROUNDS[itemLabel] : undefined;
  if (ActivePlayground) {
    return <ActivePlayground />;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-16 text-center">
      <p className="text-sm font-medium text-fg">
        {itemLabel ? `No playground for "${itemLabel}" yet` : "Pick a component to try it out"}
      </p>
      <p className="text-sm text-fg-subtle">Select a component with a playground in the sidebar.</p>
    </div>
  );
}
