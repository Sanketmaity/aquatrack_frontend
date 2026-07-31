import { title } from "framer-motion/client";
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
    ReceiptIndianRupee,
    LogOut,
} from "lucide-react";
import { GiPayMoney } from "react-icons/gi";
import { PiPaypalLogo } from "react-icons/pi";

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
            title: "Payments",
            icon: GiPayMoney,
            path: "/property/payments",
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
        title: "Bulk Water Purchases",
        icon: CreditCard,
        path: "/manager/bulk-water-purchases",
    },

    {
        title: "Consumption Distribution",
        icon: CreditCard,
        path: "/manager/consumption-distribution",
    },

    {
        title: "Water Bills",
        icon: ReceiptIndianRupee,
        path: "/manager/water-bills",
    },

    {
    title: "Payments",
    icon: PiPaypalLogo,
    path: "/manager/payments",
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
            title: "My Household",
            icon: Home,
            path: "/resident/my-household",
        },

        {
            title: "My Water Usage",
            icon: Droplets,
            path: "/resident/water-usage",
        },

        {
            title: "My Water Bills",
            icon: ReceiptIndianRupee,
            path: "/resident/water-bills",
        },

        {
            title: "My Payments",
            icon: GiPayMoney,
            path: "/resident/my-payments",
        },
        
        {
            title: "Logout",
            icon: LogOut,
            path: "/logout",
        },

    ],

};