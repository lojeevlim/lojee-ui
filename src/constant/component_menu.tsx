import React from "react";
import {
    Activity,
    AlignLeft,
    Badge,
    Bell,
    BellRing,
    Box,
    Calendar,
    CalendarDays,
    ChartColumn,
    ChartNoAxesCombined,
    ChevronDown,
    ChevronRight,
    ChevronsLeftRight,
    ChevronsUpDown,
    CircleAlert,
    CircleCheck,
    CircleDot,
    CircleUser,
    CircleX,
    Clock,
    Command,
    ContactRound,
    CreditCard,
    GalleryHorizontal,
    GitBranch,
    Grid2X2,
    Inbox,
    List,
    ListFilter,
    ListFilterPlus,
    ListOrdered,
    Loader,
    LoaderCircle,
    LockKeyhole,
    Layout,
    Menu,
    MessageCircle,
    MessageSquare,
    Minus,
    MousePointer2,
    PanelBottom,
    PanelLeft,
    PanelRight,
    PanelTop,
    Search,
    Settings,
    Shapes,
    SlidersHorizontal,
    SlidersVertical,
    Square,
    SquareCheck,
    SquareChevronDown,
    SquareStack,
    Table,
    Table2,
    Tag,
    TextCursorInput,
    ToggleRight,
    Upload,
    UserCog,
    UserPlus,
    UserRound,
    LogIn,
    BookOpen,
    Download,
} from "lucide-react";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

export interface MenuItem {
    icon: IconComponent;
    label: string;
    badge?: string;
    href?: string;
}

export interface Menu{
    icon?: IconComponent;
    section?:  string;
    items?: MenuItem[];
}
export const COMPONENT_MENU: Menu[]  = [

    {
        section: "Basic Components",

        items: [

            {
                icon: Square,
                label: "Buttons",
            },

            {
                icon: Badge,
                label: "Badges",
            },

            {
                icon: CircleUser,
                label: "Avatars",
            },

            {
                icon: Shapes,
                label: "Icons",
            },

            {
                icon: LoaderCircle,
                label: "Spinners",
            },

            {
                icon: Loader,
                label: "Loaders",
            },

            {
                icon: Minus,
                label: "Dividers",
            },

        ],
    },

    {
        section: "Layout & Content",

        items: [

            {
                icon: CreditCard,
                label: "Cards",
            },

            {
                icon: Box,
                label: "Containers",
            },

            {
                icon: Layout,
                label: "Sections",
            },

            {
                icon: Grid2X2,
                label: "Grids",
            },

            {
                icon: List,
                label: "Lists",
            },

            {
                icon: Table,
                label: "Tables",
            },

            {
                icon: SquareChevronDown,
                label: "Accordions",
            },

            {
                icon: PanelTop,
                label: "Tabs",
            },

            {
                icon: GalleryHorizontal,
                label: "Carousels",
            },

        ],
    },

    {
        section: "Forms & Inputs",

        items: [

            {
                icon: TextCursorInput,
                label: "Input",
            },

            {
                icon: AlignLeft,
                label: "Textarea",
            },

            {
                icon: Tag,
                label: "Label",
            },

            {
                icon: SquareCheck,
                label: "Checkbox",
            },

            {
                icon: CircleDot,
                label: "Radio Group",
            },

            {
                icon: ToggleRight,
                label: "Switch / Toggle",
            },

            {
                icon: ListFilter,
                label: "Select",
            },

            {
                icon: ListFilterPlus,
                label: "Multi Select",
            },

            {
                icon: ChevronsUpDown,
                label: "Combobox",
            },

            {
                icon: CalendarDays,
                label: "Date Picker",
            },

            {
                icon: Clock,
                label: "Time Picker",
            },

            {
                icon: Upload,
                label: "File Upload",
            },

            {
                icon: Search,
                label: "Search Input",
            },

            {
                icon: SlidersHorizontal,
                label: "Slider",
            },

            {
                icon: SlidersVertical,
                label: "Range Slider",
            },

        ],
    },

    {
        section: "Overlays",

        items: [

            {
                icon: SquareStack,
                label: "Modal / Dialog",
            },

            {
                icon: PanelLeft,
                label: "Drawer",
            },

            {
                icon: PanelRight,
                label: "Sheet",
            },

            {
                icon: MessageSquare,
                label: "Popover",
            },

            {
                icon: ChevronDown,
                label: "Dropdown Menu",
            },

            {
                icon: MousePointer2,
                label: "Context Menu",
            },

            {
                icon: Command,
                label: "Command Menu",
            },

            {
                icon: CircleAlert,
                label: "Alert Dialog",
            },

            {
                icon: MessageCircle,
                label: "Tooltip",
            },

        ],
    },

    {
        section: "Feedback",

        items: [

            {
                icon: CircleAlert,
                label: "Alert",
            },

            {
                icon: Bell,
                label: "Toast",
            },

            {
                icon: BellRing,
                label: "Notification",
            },

            {
                icon: LoaderCircle,
                label: "Progress Bar",
            },

            {
                icon: Inbox,
                label: "Empty State",
            },

            {
                icon: CircleX,
                label: "Error State",
            },

            {
                icon: CircleCheck,
                label: "Success State",
            },

            {
                icon: Loader,
                label: "Loading State",
            },

        ],
    },

    {
        section: "Navigation",

        items: [

            {
                icon: PanelTop,
                label: "Navbar",
            },

            {
                icon: PanelLeft,
                label: "Sidebar",
            },

            {
                icon: PanelTop,
                label: "Header",
            },

            {
                icon: PanelBottom,
                label: "Footer",
            },

            {
                icon: Menu,
                label: "Navigation Menu",
            },

            {
                icon: PanelBottom,
                label: "Bottom Navigation",
            },

            {
                icon: ListOrdered,
                label: "Stepper",
            },

            {
                icon: ChevronRight,
                label: "Breadcrumbs",
            },

            {
                icon: ChevronsLeftRight,
                label: "Pagination",
            },

        ],
    },

    {
        section: "Data & Visualization",

        items: [

            {
                icon: Table2,
                label: "Data Grid",
            },

            {
                icon: GitBranch,
                label: "Timeline",
            },

            {
                icon: ChartNoAxesCombined,
                label: "Stats / KPI",
            },

            {
                icon: ChartColumn,
                label: "Charts",
            },

            {
                icon: Calendar,
                label: "Calendar",
            },

            {
                icon: Activity,
                label: "Activity Feed",
            },

        ],
    },

    {
        section: "User / Account",

        items: [

            {
                icon: ContactRound,
                label: "Profile Card",
            },

            {
                icon: UserRound,
                label: "User Menu",
            },

            {
                icon: LogIn,
                label: "Login Form",
            },

            {
                icon: UserPlus,
                label: "Signup Form",
            },

            {
                icon: Settings,
                label: "Account Settings",
            },

            {
                icon: UserCog,
                label: "Profile Settings",
            },

            {
                icon: LockKeyhole,
                label: "Password Input",
            },

        ],
    },

];

export  const DOCS_MENU: Menu [] = [
 {
     section: "Docs",
     items: [
        {
            icon: BookOpen,
            label: "Introduction",
        },

        {
            icon: Download,
            label: "Installation",
        },

     ]
 }
]