import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  QrCode,
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
    title: "Scanner QR",
    icon: QrCode,
    path: "/organizer/Scan",
  },

  {
  title: "Paramètres",
  icon: Settings,
  path: "/organizer/settings",
},
];