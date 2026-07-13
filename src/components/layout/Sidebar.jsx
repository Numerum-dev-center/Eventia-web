import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut, ChevronDown, ChevronRight } from "lucide-react";

function Sidebar({
  title = "Eventia Admin",
  menuItems = [],
  onLogout,
}) {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (title) => {
  setOpenMenus((prev) => ({
    ...prev,
    [title]: !prev[title],
  }));
};
  

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-orange-500">
          {title}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
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
                  onClick={() => toggleMenu(item.title)}
                  className={`
                    w-full flex items-center justify-between
                    px-4 py-3 rounded-2xl transition-all
                    ${
                      isParentActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-600 hover:bg-orange-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </div>

                  {openMenus[item.title] ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {openMenus[item.title] && (
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
                          <ChildIcon size={16} />
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
              className={({ isActive }) =>
                `
                  flex items-center gap-3
                  px-4 py-3 mb-2 rounded-2xl transition-all
                  ${
                    isActive
                      ? "bg-orange-500 text-white font-semibold"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"
                  }
                `
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
            w-full flex items-center gap-3
            px-4 py-3 rounded-2xl
            text-gray-600
            hover:bg-red-50
            hover:text-red-500
            transition-all
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