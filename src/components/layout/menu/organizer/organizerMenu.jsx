import {
  LayoutDashboard,
  CalendarDays,
  PlusCircle,
  QrCode,
  Wallet,
  Settings,
  BarChart3,
  BadgePercent,
} from "lucide-react";

export const organizerMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/organizer/dashboard",
  },

  {
    title: "Evénements",
    icon: CalendarDays,


    children: [
      {
        title: "Mes événements",
        icon: CalendarDays,
        path: "/organizer/events",
      },
      {
        title: "Stats",
        icon: BarChart3,
        path: "/organizer/events/stats",
      },
      {
        title: "Billets",
        icon: BadgePercent,
        path: "/organizer/events/tickets",
      },
      {
        title: "Scan",
        icon: QrCode,
        path: "/organizer/events/scan",
      },

      {
        title: "Acces",
        icon: PlusCircle,
        path: "/organizer/events/access",
      }
    ],









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