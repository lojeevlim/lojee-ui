// Icons are referenced by name (see src/core/icons.ts), not component reference — matches the
// registry `SidebarMenuItemSpec.icon` (layouts/Sidebar.tsx flattens this whole menu into `items`
// for the real site nav) and the wider library's "icons survive an HTML attribute boundary" rule.
export interface MenuItem {
    icon: string;
    label: string;
    badge?: string;
    href?: string;
}

export interface Menu{
    icon?: string;
    section?:  string;
    items?: MenuItem[];
}
export const COMPONENT_MENU: Menu[]  = [

    {
        section: "Basic Components",

        items: [

            {
                icon: "square",
                label: "Buttons",
            },

            {
                icon: "badge",
                label: "Badges",
            },

            {
                icon: "circle-user",
                label: "Avatars",
            },

            {
                icon: "shapes",
                label: "Icons",
            },

            {
                icon: "loader-circle",
                label: "Spinners",
            },

            {
                icon: "loader",
                label: "Loaders",
            },

            {
                icon: "minus",
                label: "Dividers",
            },

        ],
    },

    {
        section: "Layout & Content",

        items: [

            {
                icon: "credit-card",
                label: "Cards",
            },

            {
                icon: "box",
                label: "Containers",
            },

            {
                icon: "layout",
                label: "Sections",
            },

            {
                icon: "grid-2x2",
                label: "Grids",
            },

            {
                icon: "list",
                label: "Lists",
            },

            {
                icon: "table",
                label: "Tables",
            },

            {
                icon: "square-chevron-down",
                label: "Accordions",
            },

            {
                icon: "panel-top",
                label: "Tabs",
            },

            {
                icon: "gallery-horizontal",
                label: "Carousels",
            },

        ],
    },

    {
        section: "Forms & Inputs",

        items: [

            {
                icon: "text-cursor-input",
                label: "Input",
            },

            {
                icon: "align-left",
                label: "Textarea",
            },

            {
                icon: "tag",
                label: "Label",
            },

            {
                icon: "square-check",
                label: "Checkbox",
            },

            {
                icon: "circle-dot",
                label: "Radio Group",
            },

            {
                icon: "toggle-right",
                label: "Switch / Toggle",
            },

            {
                icon: "list-filter",
                label: "Select",
            },

            {
                icon: "list-filter-plus",
                label: "Multi Select",
            },

            {
                icon: "chevrons-up-down",
                label: "Combobox",
            },

            {
                icon: "calendar-days",
                label: "Date Picker",
            },

            {
                icon: "clock",
                label: "Time Picker",
            },

            {
                icon: "upload",
                label: "File Upload",
            },

            {
                icon: "search",
                label: "Search Input",
            },

            {
                icon: "sliders-horizontal",
                label: "Slider",
            },

            {
                icon: "sliders-vertical",
                label: "Range Slider",
            },

        ],
    },

    {
        section: "Overlays",

        items: [

            {
                icon: "square-stack",
                label: "Modal / Dialog",
            },

            {
                icon: "panel-left",
                label: "Drawer",
            },

            {
                icon: "panel-right",
                label: "Sheet",
            },

            {
                icon: "message-square",
                label: "Popover",
            },

            {
                icon: "chevron-down",
                label: "Dropdown Menu",
            },

            {
                icon: "mouse-pointer-2",
                label: "Context Menu",
            },

            {
                icon: "command",
                label: "Command Menu",
            },

            {
                icon: "circle-alert",
                label: "Alert Dialog",
            },

            {
                icon: "message-circle",
                label: "Tooltip",
            },

        ],
    },

    {
        section: "Feedback",

        items: [

            {
                icon: "circle-alert",
                label: "Alert",
            },

            {
                icon: "bell",
                label: "Toast",
            },

            {
                icon: "bell-ring",
                label: "Notification",
            },

            {
                icon: "loader-circle",
                label: "Progress Bar",
            },

            {
                icon: "inbox",
                label: "Empty State",
            },

            {
                icon: "circle-x",
                label: "Error State",
            },

            {
                icon: "circle-check",
                label: "Success State",
            },

            {
                icon: "loader",
                label: "Loading State",
            },

        ],
    },

    {
        section: "Navigation",

        items: [

            {
                icon: "panel-top",
                label: "Navbar",
            },

            {
                icon: "panel-left",
                label: "Sidebar",
            },

            {
                icon: "panel-top",
                label: "Header",
            },

            {
                icon: "panel-bottom",
                label: "Footer",
            },

            {
                icon: "menu",
                label: "Navigation Menu",
            },

            {
                icon: "panel-bottom",
                label: "Bottom Navigation",
            },

            {
                icon: "list-ordered",
                label: "Stepper",
            },

            {
                icon: "chevron-right",
                label: "Breadcrumbs",
            },

            {
                icon: "chevrons-left-right",
                label: "Pagination",
            },

        ],
    },

    {
        section: "Data & Visualization",

        items: [

            {
                icon: "table-2",
                label: "Data Grid",
            },

            {
                icon: "git-branch",
                label: "Timeline",
            },

            {
                icon: "chart-no-axes-combined",
                label: "Stats / KPI",
            },

            {
                icon: "chart-column",
                label: "Charts",
            },

            {
                icon: "calendar",
                label: "Calendar",
            },

            {
                icon: "activity",
                label: "Activity Feed",
            },

        ],
    },

    {
        section: "User / Account",

        items: [

            {
                icon: "contact-round",
                label: "Profile Card",
            },

            {
                icon: "user-round",
                label: "User Menu",
            },

            {
                icon: "log-in",
                label: "Login Form",
            },

            {
                icon: "user-plus",
                label: "Signup Form",
            },

            {
                icon: "settings",
                label: "Account Settings",
            },

            {
                icon: "user-cog",
                label: "Profile Settings",
            },

            {
                icon: "lock-keyhole",
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
            icon: "book-open",
            label: "Introduction",
        },

        {
            icon: "download",
            label: "Installation",
        },

     ]
 }
]
