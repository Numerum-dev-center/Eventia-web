import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut, ChevronDown, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authSession";


import { logoutApi } from "../../services/authService";
function Sidebar({
  title = "Eventia Admin",
  menuItems = [],
  onLogout,
}) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutApi(); // Informe le backend (si cette route existe)
  } catch (error) {
    console.error(error);
  } finally {
    logout(); // Nettoie le localStorage
    navigate("/login", { replace: true });
  }
};

  return (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-72"}
        min-h-screen bg-white border-r border-gray-100 flex flex-col
        transition-all duration-300
      `}
    >
      {/* Logo + bouton réduire */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-3xl font-bold text-orange-500 truncate">
            {title}
          </h1>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
            p-2 rounded-xl text-gray-400 hover:bg-orange-50 hover:text-orange-500
            transition-all
            ${collapsed ? "mx-auto" : ""}
          `}
          title={collapsed ? "Étendre" : "Réduire"}
        >
          {collapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;

          // Menu avec enfants
          if (item.children) {
            const isParentActive = item.children.some((child) =>
              location.pathname.startsWith(child.path)
            );

            return (
              <div key={item.title} className="mb-2">
                <button
                  onClick={() => {
                    // Si réduit, on déplie automatiquement en cliquant
                    if (collapsed) setCollapsed(false);
                    toggleMenu(item.title);
                  }}
                  title={item.title}
                  className={`
                    w-full flex items-center
                    ${collapsed ? "justify-center" : "justify-between"}
                    px-4 py-3 rounded-2xl transition-all
                    ${
                      isParentActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:bg-orange-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </div>

                  {!collapsed &&
                    (openMenus[item.title] ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    ))}
                </button>

                {!collapsed && openMenus[item.title] && (
                  <div className="ml-6 mt-2 flex flex-col gap-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;

                      return (
                        <NavLink
                          key={child.title}
                          to={child.path}
                          className={({ isActive }) =>
                            `
                              flex items-center gap-3
                              px-3 py-2 rounded-xl
                              transition-all
                              ${
                                isActive
                                  ? "bg-orange-100 text-orange-600 font-semibold"
                                  : "text-gray-500 hover:bg-gray-50"
                              }
                            `
                          }
                        >
                          <ChildIcon size={16} className="shrink-0" />
                          <span>{child.title}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          // Menu simple
          return (
            <NavLink
              key={item.title}
              to={item.path}
              title={item.title}
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  ${collapsed ? "justify-center" : ""}
                  px-4 py-3 mb-2 rounded-2xl transition-all
                  ${
                    isActive
                      ? "bg-orange-500 text-white font-semibold"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }
                `
              }
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          title="Déconnexion"
          className={`
            w-full flex items-center gap-3
            ${collapsed ? "justify-center" : ""}
            px-4 py-3 rounded-2xl
            text-gray-600
            hover:bg-red-50
            hover:text-red-500
            transition-all
          `}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;