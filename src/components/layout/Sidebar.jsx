import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

function Sidebar({
  title = "Eventia",
  menuItems = [],
  onLogout,
}) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo / Titre */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-orange-500">
          {title}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive
                  ? "bg-orange-500 text-white font-semibold"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                }`
              }

            >
              <Icon size={20} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-gray-100">
        <button
        onClick={onLogout}
        className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        text-gray-600
        hover:bg-red-50
        hover:text-red-500
        transition
        "
        >
          <LogOut size={20} />

          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;