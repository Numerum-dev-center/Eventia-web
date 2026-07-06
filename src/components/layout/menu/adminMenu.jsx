import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Wallet,
  BarChart3,
  ClipboardList,
  Settings,
} from "lucide-react";

export const adminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Modération événements",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    title: "Billets",
    icon: Ticket,
    path: "/admin/billets",
  },
  {
    title: "Commissions",
    icon: Wallet,
    path: "/admin/commissions",
  },
  {
    title: "Reversements",
    icon: Wallet,
    path: "/admin/reversements",
  },
  {
    title: "Rapports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    title: "Journal d'activité",
    icon: ClipboardList,
    path: "/admin/audit-log",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/admin/settings",
  },
];