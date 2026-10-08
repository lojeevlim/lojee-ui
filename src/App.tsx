import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import ButtonShowcase, { Button } from './components/ui/Buttons'
import BadgeShowcase from './components/ui/Badge'
import AvatarShowcase from './components/ui/Avatar'
import IconsShowcase from './components/ui/Icons'
import SpinnerShowcase from './components/ui/Spinner'
import DividerShowcase from './components/ui/Divider'
import TooltipShowcase from './components/ui/Tooltip'
import { Tooltip } from './components/ui/Tooltip/Tooltip'
import CardShowcase from './components/ui/Card'
import ContainerShowcase from './components/ui/Container'
import SectionShowcase from './components/ui/Section'
import GridShowcase from './components/ui/Grid'
import ListShowcase from './components/ui/List'
import TableShowcase from './components/ui/Table'
import AccordionShowcase from './components/ui/Accordion'
import TabsShowcase from './components/ui/Tabs'
import BreadcrumbsShowcase from './components/ui/Breadcrumbs'
import PaginationShowcase from './components/ui/Pagination'
import CarouselShowcase from './components/ui/Carousel'
import InputShowcase from './components/ui/Input'
import TextareaShowcase from './components/ui/Textarea'
import LabelShowcase from './components/ui/Label'
import CheckboxShowcase from './components/ui/Checkbox'
import RadioShowcase from './components/ui/Radio'
import SwitchShowcase from './components/ui/Switch'
import SelectShowcase from './components/ui/Select'
import MultiSelectShowcase from './components/ui/MultiSelect'
import ComboboxShowcase from './components/ui/Combobox'
import DatePickerShowcase from './components/ui/DatePicker'
import TimePickerShowcase from './components/ui/TimePicker'
import FileUploadShowcase from './components/ui/FileUpload'
import SearchInputShowcase from './components/ui/SearchInput'
import SliderShowcase from './components/ui/Slider'
import RangeSliderShowcase from './components/ui/RangeSlider'
import ModalShowcase from './components/ui/ModalShowcase'
import AlertDialogShowcase from './components/ui/AlertDialog'
import DrawerShowcase from './components/ui/Drawer'
import SheetShowcase from './components/ui/Sheet'
import PopoverShowcase from './components/ui/Popover'
import DropdownMenuShowcase from './components/ui/DropdownMenu'
import ContextMenuShowcase from './components/ui/ContextMenu'
import CommandMenuShowcase from './components/ui/CommandMenu'
import AlertShowcase from './components/ui/Alert'
import ToastShowcase from './components/ui/Toast'
import NotificationShowcase from './components/ui/Notification'
import ProgressBarShowcase from './components/ui/ProgressBar'
import EmptyStateShowcase from './components/ui/EmptyState'
import ErrorStateShowcase from './components/ui/ErrorState'
import SuccessStateShowcase from './components/ui/SuccessState'
import LoadingStateShowcase from './components/ui/LoadingState'
import NavbarShowcase from './components/ui/Navbar'
import TopBarShowcase from './components/ui/TopBar'
import FlowDiagramShowcase from './components/ui/FlowDiagram'
import MapShowcase from './components/ui/Map'
import MapMarkerShowcase from './components/ui/MapMarker'
import MapRouteShowcase from './components/ui/MapRoute'
import SidebarShowcase from './components/ui/Sidebar'
import HeaderShowcase from './components/ui/Header'
import FooterShowcase from './components/ui/Footer'
import NavigationMenuShowcase from './components/ui/NavigationMenu'
import BottomNavigationShowcase from './components/ui/BottomNavigation'
import StepperShowcase from './components/ui/Stepper'
import TimelineShowcase from './components/ui/Timeline'
import StatShowcase from './components/ui/Stat'
import ChartShowcase from './components/ui/Chart'
import CalendarShowcase from './components/ui/Calendar'
import ActivityFeedShowcase from './components/ui/ActivityFeed'
import GridViewShowcase from './components/ui/GridView'
import DetailsListShowcase from './components/ui/DetailsList'
import ProfileCardShowcase from './components/ui/ProfileCard'
import UserMenuShowcase from './components/ui/UserMenu'
import PasswordInputShowcase from './components/ui/PasswordInput'
import LoginFormShowcase from './components/ui/LoginForm'
import SignupFormShowcase from './components/ui/SignupForm'
import ProfileSettingsShowcase from './components/ui/ProfileSettings'
import PlanBillingShowcase from './components/ui/PlanBilling'
import IframeShowcase from './components/ui/Iframe'
import ChatBoxShowcase from './components/ui/ChatBox'
import ThinkingShowcase from './components/ui/Thinking'
import AccountSettingsShowcase from './components/ui/AccountSettings'

import SidebarLayout from './components/layouts/Sidebar'
import NavbarLayout, { type TopNavKey } from './components/layouts/Navbar'
import Modal from './components/ui/Modal'
import Playground from './components/ui/Playground'
import { COMPONENT_MENU, DOCS_MENU } from './constant/component_menu'
import { findMenuItem, defaultPathFor, type NavKind } from './core/routes'

import AppShowcase from './components/ui/AppLayout'
import MainShowcase from './components/ui/Main'
import ImageShowcase from './components/ui/Image'
import VideoShowcase from './components/ui/Video'
import SkeletonShowcase from './components/ui/Skeleton'
import TagInputShowcase from './components/ui/TagInput'
import NumberInputShowcase from './components/ui/NumberInput'
import OtpInputShowcase from './components/ui/OtpInput'
import RatingShowcase from './components/ui/Rating'
import ColorPickerShowcase from './components/ui/ColorPicker'
import CodeSnippetShowcase from './components/ui/CodeSnippet'
import ThemeSwitcherShowcase from './components/ui/ThemeSwitcher'
import { ThemeProvider } from './components/ui/Theme/ThemeProvider'
import { App as AppShell, Top, Side, Main } from './components/ui/AppLayout/App'
import type { GridLayout } from './components/ui/AppLayout/appLayout'
import ChangelogShowcase from './components/ui/Changelog/ChangelogShowcase'
import IntroductionShowcase from './components/ui/Introduction/IntroductionShowcase'
import InstallationShowcase from './components/ui/Installation/InstallationShowcase'
import ApiReference, { DataBindingSection } from './components/ui/ApiReference'
import ThemeShowcase from './components/ui/Theme/ThemeShowcase'
import DataBindingShowcase from './components/ui/DataBinding'

const SHOWCASES: Record<string, ComponentType> = {
  Introduction: IntroductionShowcase,
  Installation: InstallationShowcase,
  Theming: ThemeShowcase,
  'Data Binding': DataBindingShowcase,
  Changelog: ChangelogShowcase,
  'App Layout': AppShowcase,
  Main: MainShowcase,
  Images: ImageShowcase,
  Videos: VideoShowcase,
  Skeletons: SkeletonShowcase,
  'Tag Input': TagInputShowcase,
  'Number Input': NumberInputShowcase,
  'OTP Input': OtpInputShowcase,
  Rating: RatingShowcase,
  'Color Picker': ColorPickerShowcase,
  'Code Snippet': CodeSnippetShowcase,
  'Theme Switcher': ThemeSwitcherShowcase,
  Buttons: ButtonShowcase,
  Badges: BadgeShowcase,
  Avatars: AvatarShowcase,
  Icons: IconsShowcase,
  Spinners: SpinnerShowcase,
  Dividers: DividerShowcase,
  Cards: CardShowcase,
  Containers: ContainerShowcase,
  Sections: SectionShowcase,
  Grids: GridShowcase,
  Lists: ListShowcase,
  Tables: TableShowcase,
  Accordions: AccordionShowcase,
  Tabs: TabsShowcase,
  Breadcrumbs: BreadcrumbsShowcase,
  Pagination: PaginationShowcase,
  Carousels: CarouselShowcase,
  Input: InputShowcase,
  Textarea: TextareaShowcase,
  Label: LabelShowcase,
  Checkbox: CheckboxShowcase,
  'Radio Group': RadioShowcase,
  'Switch / Toggle': SwitchShowcase,
  Select: SelectShowcase,
  'Multi Select': MultiSelectShowcase,
  Combobox: ComboboxShowcase,
  'Date Picker': DatePickerShowcase,
  'Time Picker': TimePickerShowcase,
  'File Upload': FileUploadShowcase,
  'Search Input': SearchInputShowcase,
  Slider: SliderShowcase,
  'Range Slider': RangeSliderShowcase,
  'Modal / Dialog': ModalShowcase,
  Drawer: DrawerShowcase,
  Sheet: SheetShowcase,
  Popover: PopoverShowcase,
  'Dropdown Menu': DropdownMenuShowcase,
  'Context Menu': ContextMenuShowcase,
  'Command Menu': CommandMenuShowcase,
  'Alert Dialog': AlertDialogShowcase,
  Tooltip: TooltipShowcase,
  Alert: AlertShowcase,
  Toast: ToastShowcase,
  Notification: NotificationShowcase,
  'Progress Bar': ProgressBarShowcase,
  'Empty State': EmptyStateShowcase,
  'Error State': ErrorStateShowcase,
  'Success State': SuccessStateShowcase,
  'Loading State': LoadingStateShowcase,
  Navbar: NavbarShowcase,
  'Top Bar': TopBarShowcase,
  'Flow Diagram': FlowDiagramShowcase,
  Map: MapShowcase,
  'Map Markers': MapMarkerShowcase,
  'Map Routes': MapRouteShowcase,
  Sidebar: SidebarShowcase,
  Header: HeaderShowcase,
  Footer: FooterShowcase,
  'Navigation Menu': NavigationMenuShowcase,
  'Bottom Navigation': BottomNavigationShowcase,
  Stepper: StepperShowcase,
  Timeline: TimelineShowcase,
  'Stats / KPI': StatShowcase,
  Charts: ChartShowcase,
  Calendar: CalendarShowcase,
  'Activity Feed': ActivityFeedShowcase,
  'Grid View': GridViewShowcase,
  'Details List': DetailsListShowcase,
  'Profile Card': ProfileCardShowcase,
  'User Menu': UserMenuShowcase,
  'Password Input': PasswordInputShowcase,
  'Login Form': LoginFormShowcase,
  'Signup Form': SignupFormShowcase,
  'Profile Settings': ProfileSettingsShowcase,
  'Plan & Billing': PlanBillingShowcase,
  Iframe: IframeShowcase,
  'Chat Box': ChatBoxShowcase,
  Thinking: ThinkingShowcase,
  'Account Settings': AccountSettingsShowcase,
}

// The docs site is itself built from the library's App layout: sidebar docked full-height on the left.
const APP_LAYOUT: GridLayout = [
  ['side', 'top'],
  ['side', 'main'],
]

// The floating Playground button and its "Try it live" hint. It owns the hint's timers, so the hint showing and hiding re-renders only
// this button — not the whole docs app (sidebar, navbar and the open page).
let playgroundHintShown = false

function PlaygroundFab({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const [hint, setHint] = useState(false)
  // The hint shows once per page load (not again when the button remounts after visiting a docs page), a moment after the page settles, then fades away.
  useEffect(() => {
    if (playgroundHintShown) return
    const show = setTimeout(() => {
      playgroundHintShown = true
      setHint(true)
    }, 1800)
    const hide = setTimeout(() => setHint(false), 8500)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])
  return (
    <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* A short "Try it live" hint appears after the page settles and fades away again (it is also the button's hover tooltip). */}
      <Tooltip content="Try it live — tweak props" position="top" color="accent" open={hint && !open}>
        <Button
          type="button"
          onClick={onOpen}
          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/30 ring-1 ring-white/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-600/40 active:translate-y-0"
          label="Playground"
          color="accent"
          shape="pill"
          hoverEffect="tilt"
          icon="play-circle"
          animation={["particles", "sweep"]} 
        />
      </Tooltip>
    </div>
  )
}

function App() {
  const { navKind: rawNavKind, item } = useParams()
  const navigate = useNavigate()
  const [playgroundOpen, setPlaygroundOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // <Main> is the scroll container, so glide it back to the top whenever the page changes.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scroller = contentRef.current?.closest('.lojee-ds-view') ?? contentRef.current?.closest('main')
    scroller?.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [rawNavKind, item])

  const navKind: NavKind = rawNavKind === 'docs' ? 'docs' : 'components'
  const menu = navKind === 'docs' ? DOCS_MENU : COMPONENT_MENU
  const found = findMenuItem(menu, item)

  if (!found) {
    return <Navigate to={defaultPathFor('components')} replace />
  }

  const handleNavChange = (key: TopNavKey) => {
    if (key === 'about') {
      navigate('/about')
      return
    }
    navigate(defaultPathFor(key === 'docs' ? 'docs' : 'components'))
  }

  return (
    <ThemeProvider defaultMode="dark" defaultAccent="#d6336c" defaultDesign="clay" defaultActiveVariant="solid">

      <AppShell layout={APP_LAYOUT} collapseBelow="3xl">
        <Top>
          <NavbarLayout activeNav={navKind} onNavChange={handleNavChange} />
        </Top>
        <Side>
          <SidebarLayout
            key={navKind}
            nav={menu}
            navKind={navKind}
            activeLabel={found.item.label}
            collapsed={sidebarCollapsed}
            onCollapsedChange={setSidebarCollapsed}
          />
        </Side>
        <Main padding="lg">
          {(() => {
            const ActiveShowcase = SHOWCASES[found.item.label]
            return ActiveShowcase ? (
              <div ref={contentRef}>
                <ActiveShowcase />
                <div><DataBindingSection name={found.item.label} /><ApiReference name={found.item.label} /></div>
              </div>
            ) : <p>This is the main content area.</p>
          })()}
        </Main>
      </AppShell>

    {/* Playgrounds only exist for components — the docs pages (Introduction, Installation, …) have none. */}
    {navKind === 'components' && (
      <PlaygroundFab open={playgroundOpen} onOpen={() => setPlaygroundOpen(true)} />
    )}

    <Modal
      open={playgroundOpen && navKind === 'components'}
      onClose={() => setPlaygroundOpen(false)}
      title={`${found.item.label} Playground`}
      className="lg:max-w-6xl"
      classNames={{ body: 'pb-6' }}
      transition="blur"
    >
      <Playground itemLabel={found.item.label} />
    </Modal>

    </ThemeProvider>
  )
}

export default App
