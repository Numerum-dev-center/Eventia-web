import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Wallet,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    path: "/admin/users",
    icon: Users,
  },
  {
    title: "Événements",
    path: "/admin/events",
    icon: CalendarDays,
  },
  {
    title: "Finances",
    path: "/admin/finance",
    icon: Wallet,
  },
  {
    title: "Rapports",
    path: "/admin/reports",
    icon: FileText,
  },
  {
    title: "Paramètres",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-orange-500">
          Eventia
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Administration
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;