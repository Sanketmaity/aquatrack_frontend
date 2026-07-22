import {
    LayoutDashboard,
    Building2,
    Building,
    Layers3,
    Users,
    UserCog,
    Home,
    CalendarDays,
    Droplets,
    CreditCard,
    LogOut,
} from "lucide-react";

export const menuConfig = {

    // ==========================================
    // SUPER ADMIN
    // ==========================================

    SUPER_ADMIN: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/admin/dashboard",
        },

        {
            title: "Property Registrations",
            icon: Building2,
            path: "/admin/registrations",
        },

        {
            title: "Property Admins",
            icon: Users,
            path: "/admin/property-admins",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // PROPERTY ADMIN
    // ==========================================

    PROPERTY_ADMIN: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/property/dashboard",
        },

        {
            title: "Apartments",
            icon: Building2,
            path: "/property/apartments",
        },

        {
            title: "Buildings",
            icon: Building,
            path: "/property/buildings",
        },

        {
            title: "Floors",
            icon: Layers3,
            path: "/property/floors",
        },

        {
            title: "Managers",
            icon: UserCog,
            path: "/property/managers",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // MANAGER
    // ==========================================

    MANAGER: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/manager/dashboard",
        },

        {
            title: "Households",
            icon: Home,
            path: "/manager/households",
        },

        {
            title: "Residents",
            icon: Users,
            path: "/manager/residents",
        },

        {
            title: "Billing Cycles",
            icon: CalendarDays,
            path: "/manager/billing-cycles",
        },

        {
            title: "Water Usage",
            icon: Droplets,
            path: "/manager/water-usage",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

    // ==========================================
    // RESIDENT
    // ==========================================

    RESIDENT: [

        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/resident/dashboard",
        },

        {
            title: "Water Usage",
            icon: Droplets,
            path: "/resident/water-usage",
        },

        {
            title: "Bills",
            icon: CreditCard,
            path: "/resident/bills",
        },

        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

};