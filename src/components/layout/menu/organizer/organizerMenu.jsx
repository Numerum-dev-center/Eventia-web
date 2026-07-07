import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  Wallet,
  Settings,
} from "lucide-react";

export const organizerMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/organizer/dashboard",
  },

  {
    title: "Mes événements",
    icon: CalendarDays,
    path: "/organizer/events",
  },

  
  {
    title: "Finances",
    icon: Wallet,
    path: "/organizer/finance",
  },

  {
  title: "Paramètres",
  icon: Settings,
  path: "/organizer/settings",
},
];