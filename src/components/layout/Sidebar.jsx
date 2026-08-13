import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, LogOut, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { logout } from "../../services/authSession";
import { logoutApi } from "../../services/authService";
import BrandLogo from "../brand/BrandLogo";

function Sidebar({ title = "Eventia", menuItems = [], mobileOpen = false, onMobileClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const workspace = title.toLowerCase().includes("admin") ? "Administration" : "Organisateur";

  const handleLogout = async () => {
    try { await logoutApi(); } catch { /* La session locale doit malgré tout être fermée. */ }
    finally { logout(); navigate("/login", { replace: true }); }
  };

  const closeMobile = () => onMobileClose?.();

  return (
    <aside className={`db-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-mobile-open" : ""}`}>
      <div className="db-sidebar-head">
        <NavLink to={workspace === "Administration" ? "/admin/dashboard" : "/organizer/dashboard"} className="db-logo" onClick={closeMobile}>
          <BrandLogo className="eventia-logo--sidebar" iconOnly={collapsed} />
          {!collapsed && <span><small>{workspace}</small></span>}
        </NavLink>
        <button className="db-mobile-close" type="button" onClick={closeMobile} aria-label="Fermer le menu"><X size={20} /></button>
      </div>

      {!collapsed && <p className="db-nav-label">Espace de travail</p>}
      <nav className="db-nav" aria-label={`Navigation ${workspace.toLowerCase()}`}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          if (item.children) {
            const parentActive = item.children.some((child) => location.pathname.startsWith(child.path));
            const opened = openMenus[item.title];
            return (
              <div className="db-nav-group" key={item.title}>
                <button className={`db-nav-item ${parentActive ? "is-active" : ""}`} type="button" title={item.title} onClick={() => { if (collapsed) setCollapsed(false); setOpenMenus((current) => ({ ...current, [item.title]: !current[item.title] })); }}>
                  <Icon size={19} /><span>{item.title}</span>{opened ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </button>
                {!collapsed && opened && <div className="db-subnav">{item.children.map((child) => { const ChildIcon = child.icon; return <NavLink key={child.path} to={child.path} onClick={closeMobile} className={({ isActive }) => isActive ? "is-active" : ""}><ChildIcon size={15} />{child.title}</NavLink>; })}</div>}
              </div>
            );
          }
          return (
            <NavLink key={item.path} to={item.path} onClick={closeMobile} title={item.title} className={({ isActive }) => `db-nav-item ${isActive ? "is-active" : ""}`}>
              <Icon size={19} /><span>{item.title}</span>{!collapsed && <ChevronRight className="db-nav-arrow" size={14} />}
            </NavLink>
          );
        })}
      </nav>

      <div className="db-sidebar-foot">
        {!collapsed && <div className="db-plan"><span>Eventia Pro</span><strong>Votre espace est actif</strong><small>Tous vos outils sont disponibles.</small><i><span /></i></div>}
        <button className="db-logout" type="button" onClick={handleLogout} title="Déconnexion"><LogOut size={18} /><span>Déconnexion</span></button>
        <button className="db-collapse" type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Déployer la navigation" : "Réduire la navigation"}>{collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}<span>{collapsed ? "" : "Réduire"}</span>{!collapsed && <ChevronLeft size={14} />}</button>
      </div>
    </aside>
  );
}

export default Sidebar;
