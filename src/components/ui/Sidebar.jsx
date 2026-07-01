import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      title: "Mes événements",
      icon: <CalendarDays size={20} />,
      path: "/events",
    },
    {
      title: "Tickets",
      icon: <Ticket size={20} />,
      path: "/tickets",
    },
    {
      title: "Participants",
      icon: <Users size={20} />,
      path: "/participants",
    },
    {
      title: "Paramètres",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white shadow-lg p-6 flex flex-col">

      <h1 className="text-3xl font-bold text-orange-500 mb-10">
        Eventia
      </h1>

      <nav className="flex flex-col gap-2 flex-1">

        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
              ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-orange-100 hover:text-orange-600"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}

      </nav>

      <button
        className="
          flex
          items-center
          gap-3
          text-red-500
          hover:bg-red-50
          rounded-lg
          p-3
          transition
        "
      >
        <LogOut size={20} />
        Déconnexion
      </button>

    </aside>
  );
}

export default Sidebar;