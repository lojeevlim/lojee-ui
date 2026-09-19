import { useState, type ComponentType } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import ButtonShowcase, { Button } from './components/ui/Buttons'
import BadgeShowcase from './components/ui/Badge'
import AvatarShowcase from './components/ui/Avatar'
import IconsShowcase from './components/ui/Icons'
import SpinnerShowcase from './components/ui/Spinner'
import LoaderShowcase from './components/ui/Loader'
import DividerShowcase from './components/ui/Divider'
import TooltipShowcase from './components/ui/Tooltip'
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

import Sidebar from './components/layouts/Sidebar'
import Header, { type HeaderNavKey } from './components/layouts/Header'
import Modal from './components/ui/Modal'
import Playground from './components/ui/Playground'
import { COMPONENT_MENU, DOCS_MENU } from './constant/component_menu'
import { findMenuItem, defaultPathFor, type NavKind } from './core/routes'

const SHOWCASES: Record<string, ComponentType> = {
  Buttons: ButtonShowcase,
  Badges: BadgeShowcase,
  Avatars: AvatarShowcase,
  Icons: IconsShowcase,
  Spinners: SpinnerShowcase,
  Loaders: LoaderShowcase,
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
}

function App() {
  const { navKind: rawNavKind, item } = useParams()
  const navigate = useNavigate()
  const [playgroundOpen, setPlaygroundOpen] = useState(false)

  const navKind: NavKind = rawNavKind === 'docs' ? 'docs' : 'components'
  const menu = navKind === 'docs' ? DOCS_MENU : COMPONENT_MENU
  const found = findMenuItem(menu, item)

  if (!found) {
    return <Navigate to={defaultPathFor('components')} replace />
  }

  const handleNavChange = (key: HeaderNavKey) => {
    if (key === 'about') {
      navigate('/about')
      return
    }
    navigate(defaultPathFor(key === 'docs' ? 'docs' : 'components'))
  }

  return (
    <>

    <div className="flex h-screen">
        <Sidebar key={navKind} nav={menu} navKind={navKind} activeLabel={found.item.label} />
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex-shrink-0">
            <Header activeNav={navKind} onNavChange={handleNavChange}/>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {(() => {
              const ActiveShowcase = SHOWCASES[found.item.label]
              return ActiveShowcase ? <ActiveShowcase /> : <p>This is the main content area.</p>
            })()}
          </div>
        </div>
      </div>

    <Button
      type="button"
      onClick={() => setPlaygroundOpen(true)}
      className="fixed bottom-6  right-6 z-40 flex items-center gap-2  px-5 py-3 text-sm font-medium text-white shadow-lg transition-all"
      label='Playground'
      icon="play-circle"
    />

    <Modal
      open={playgroundOpen}
      onClose={() => setPlaygroundOpen(false)}
      title={`${found.item.label} Playground`}
    >
      <Playground itemLabel={found.item.label} />
    </Modal>

    </>
  )
}

export default App
