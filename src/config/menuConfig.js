// import { title } from "framer-motion/client";
// import {
//     LayoutDashboard,
//     Building2,
//     Building,
//     Layers3,
//     Users,
//     UserCog,
//     Home,
//     CalendarDays,
//     Droplets,
//     CreditCard,
//     ReceiptIndianRupee,
//     LogOut,
// } from "lucide-react";
// import { GiPayMoney } from "react-icons/gi";
// import { PiPaypalLogo } from "react-icons/pi";

// export const menuConfig = {

//     // ==========================================
//     // SUPER ADMIN
//     // ==========================================

//     SUPER_ADMIN: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/admin/dashboard",
//         },

//         {
//             title: "Property Registrations",
//             icon: Building2,
//             path: "/admin/registrations",
//         },

//         {
//             title: "Property Admins",
//             icon: Users,
//             path: "/admin/property-admins",
//         },

//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],

//     // ==========================================
//     // PROPERTY ADMIN
//     // ==========================================

//     PROPERTY_ADMIN: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/property/dashboard",
//         },

//         {
//             title: "Apartments",
//             icon: Building2,
//             path: "/property/apartments",
//         },

//         {
//             title: "Buildings",
//             icon: Building,
//             path: "/property/buildings",
//         },

//         {
//             title: "Floors",
//             icon: Layers3,
//             path: "/property/floors",
//         },

//         {
//             title: "Managers",
//             icon: UserCog,
//             path: "/property/managers",
//         },

//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],


//     // ==========================================
//     // MANAGER
//     // ==========================================

// MANAGER: [

//     {
//         title: "Dashboard",
//         icon: LayoutDashboard,
//         path: "/manager/dashboard",
//     },

//     {
//         title: "Households",
//         icon: Home,
//         path: "/manager/households",
//     },

//     {
//         title: "Residents",
//         icon: Users,
//         path: "/manager/residents",
//     },

//     {
//         title: "Billing Cycles",
//         icon: CalendarDays,
//         path: "/manager/billing-cycles",
//     },

//     {
//         title: "Water Usage",
//         icon: Droplets,
//         path: "/manager/water-usage",
//     },

//     {
//         title: "Bulk Water Purchases",
//         icon: CreditCard,
//         path: "/manager/bulk-water-purchases",
//     },

//     {
//         title: "Consumption Distribution",
//         icon: CreditCard,
//         path: "/manager/consumption-distribution",
//     },

//     {
//         title: "Water Bills",
//         icon: ReceiptIndianRupee,
//         path: "/manager/water-bills",
//     },

//     {
//     title: "Payments",
//     icon: PiPaypalLogo,
//     path: "/manager/payments",
//     },

//     {
//         title: "Logout",
//         icon: LogOut,
//         path: "/logout",
//     },

// ],

//     // ==========================================
//     // RESIDENT
//     // ==========================================

//     RESIDENT: [

//         {
//             title: "Dashboard",
//             icon: LayoutDashboard,
//             path: "/resident/dashboard",
//         },

//         {
//             title: "My Household",
//             icon: Home,
//             path: "/resident/my-household",
//         },

//         {
//             title: "My Water Usage",
//             icon: Droplets,
//             path: "/resident/water-usage",
//         },

//         {
//             title: "My Water Bills",
//             icon: ReceiptIndianRupee,
//             path: "/resident/water-bills",
//         },

//         {
//             title: "My Payments",
//             icon: GiPayMoney,
//             path: "/resident/my-payments",
//         },
        
//         {
//             title: "Logout",
//             icon: LogOut,
//             path: "/logout",
//         },

//     ],

// };

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
  ReceiptIndianRupee,
  LogOut,
  UserCircle2,
  Settings,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";

import { GiPayMoney } from "react-icons/gi";
import { PiPaypalLogo } from "react-icons/pi";

// ==========================================
// Menu Configuration
// ==========================================

export const menuConfig = {

  // ==========================================
  // SUPER ADMIN
  // ==========================================

  SUPER_ADMIN: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

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
        title: "Profile",
        icon: UserCircle2,
        path: "/admin/profile",
      },

      {
        title: "Logout",
        icon: LogOut,
        path: "/logout",
      },

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },

      {
        title: "Registrations",
        icon: Building2,
        path: "/admin/registrations",
      },

      {
        title: "Admins",
        icon: Users,
        path: "/admin/property-admins",
      },

      {
        title: "Profile",
        icon: UserCircle2,
        path: "/admin/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

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
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },

      {
        title: "Logout",
        icon: LogOut,
        path: "/logout",
      },

    ],

  },

    // ==========================================
  // PROPERTY ADMIN
  // ==========================================

  PROPERTY_ADMIN: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

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
        title: "Profile",
        icon: UserCircle2,
        path: "/property/profile",
      },

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

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
        title: "Managers",
        icon: UserCog,
        path: "/property/managers",
      },

      {
        title: "Profile",
        icon: UserCircle2,
        path: "/property/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/property/dashboard",
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

    ],

  },

    // ==========================================
  // MANAGER
  // ==========================================

  MANAGER: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

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
        icon: Wallet,
        path: "/manager/bulk-water-purchases",
      },

      {
        title: "Consumption Distribution",
        icon: ArrowLeftRight,
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
        title: "Profile",
        icon: UserCircle2,
        path: "/manager/profile",
      },
    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

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
        title: "Profile",
        icon: UserCircle2,
        path: "/manager/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

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
        icon: Wallet,
        path: "/manager/bulk-water-purchases",
      },

      {
        title: "Consumption Distribution",
        icon: ArrowLeftRight,
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

    ],

  },

  // ==========================================
  // RESIDENT
  // ==========================================

  RESIDENT: {

    // ==========================
    // Desktop Sidebar
    // ==========================

    sidebar: [

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

    ],

    // ==========================
    // Mobile Bottom Navigation
    // ==========================

    bottomNav: [

      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/resident/dashboard",
      },

      {
        title: "Usage",
        icon: Droplets,
        path: "/resident/water-usage",
      },

      {
        title: "Payments",
        icon: GiPayMoney,
        path: "/resident/my-payments",
      },

      {
        title: "Profile",
        icon: UserCircle2,
        path: "/resident/profile",
      },

    ],

    // ==========================
    // Mobile Drawer
    // ==========================

    drawer: [

      {
        title: "My Household",
        icon: Home,
        path: "/resident/my-household",
      },

      {
        title: "My Water Bills",
        icon: ReceiptIndianRupee,
        path: "/resident/water-bills",
      },

      {
        title: "Settings",
        icon: Settings,
        path: "/resident/settings",
      },

      {
        title: "Help & Support",
        icon: Users,
        path: "/resident/support",
      },

    ],

  },

};