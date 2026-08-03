import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Wallet,
  BarChart3,
  Settings,
} from "lucide-react";

export const adminMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Événements",
    icon: CalendarDays,
    path: "/admin/events",
  },
  {
    title: "Utilisateurs",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Finances",
    icon: Wallet,
    path: "/admin/finance",
  },
  {
    title: "Rapports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    title: "Paramètres",
    icon: Settings,
    path: "/admin/settings",
  },
];
