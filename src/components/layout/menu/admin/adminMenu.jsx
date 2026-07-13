import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ShieldCheck,
  Wallet,
  BadgePercent,
  BarChart3,
  Bell,
  Settings,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Clock,
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
    children: [
      {
        title: "Tous les événements",
        icon: CalendarDays,
        path: "/admin/events",
      },
      {
        title: "En attente",
        icon: Clock,
        path: "/admin/events/pending",
      },
      {
        title: "Validés",
        icon: CheckCircle,
        path: "/admin/events/approved",
      },
      {
        title: "Rejetés",
        icon: XCircle,
        path: "/admin/events/rejected",
      },
    ],
  },

  {
    title: "Utilisateurs",
    icon: Users,
    children: [
      {
        title: "Participants",
        icon: Users,
        path: "/admin/users/participants",
      },
      {
        title: "Organisateurs",
        icon: UserCheck,
        path: "/admin/users/organizers",
      },
      {
        title: "Administrateurs",
        icon: ShieldCheck,
        path: "/admin/users/admins",
      },
      {
        title: "Suspendus",
        icon: UserX,
        path: "/admin/users/suspended",
      },
    ],
  },

  {
    title: "Modération",
    icon: ShieldCheck,
    path: "/admin/moderation",
  },

  {
    title: "Finances",
    icon: Wallet,
    children: [
      {
        title: "Transactions",
        icon: Wallet,
        path: "/admin/finance/transactions",
      },
      {
        title: "Revenus",
        icon: Wallet,
        path: "/admin/finance/revenue",
      },
      {
        title: "Remboursements",
        icon: Wallet,
        path: "/admin/finance/refunds",
      },
    ],
  },

  {
    title: "Commissions",
    icon: BadgePercent,
    path: "/admin/commissions",
  },

  {
    title: "Rapports & Statistiques",
    icon: BarChart3,
    path: "/admin/reports",
  },

  {
    title: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
  },

  {
    title: "Paramètres",
    icon: Settings,
    path: "/admin/settings",
  },
];