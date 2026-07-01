import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Wallet,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

function AdminSidebar() {

  

  const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },

  {
    title: "Modération événements",
    icon: <CalendarDays size={20} />,
    path: "/admin/events",
  },

  {
    title: "Billets",
    icon: <Ticket size={20} />,
    path: "/admin/billets",
  },

  {
    title: "Commissions",
    icon: <Wallet size={20} />,
    path: "/admin/commissions",
  },

  {
    title: "Reversements",
    icon: <Wallet size={20} />,
    path: "/admin/reversements",
  },

  {
    title: "Rapports",
    icon: <BarChart3 size={20} />,
    path: "/admin/reports",
  },

  {
    title: "Journal d'activité",
    icon: <ClipboardList size={20} />,
    path: "/admin/audit-log",
  },

  {
    title: "Paramètres",
    icon: <Settings size={20} />,
    path: "/admin/settings",
  },
];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white shadow-lg flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-orange-500">
          Eventia Admin
        </h1>
        
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-orange-400"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}

      </nav>

      {/* Profil Admin */}

      

      {/* Déconnexion */}
      <div className="p-4 border-t border-slate-800">
        <button
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            text-red-400
            hover:bg-red-500/10
            rounded-lg
            transition
          "
        >
          <LogOut size={20} />
            <span>Déconnexion</span>
        </button>
      </div>

    </aside>
  );

}export default AdminSidebar;

