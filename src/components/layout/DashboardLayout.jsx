import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import EviDock from "../brand/EviDock";
import "../../styles/dashboard.css";

function DashboardLayout({ title, menuItems }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const workspace = title?.toLowerCase().includes("admin") ? "Administration" : "Organisateur";

  return (
    <div className="db-app">
      <Sidebar title={title} menuItems={menuItems} mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />
      {mobileMenuOpen && <button className="db-backdrop" type="button" aria-label="Fermer le menu" onClick={() => setMobileMenuOpen(false)} />}
      <div className="db-workspace">
        <Topbar workspace={workspace} onMenuOpen={() => setMobileMenuOpen(true)} />
        <main className="db-main"><div className="db-content"><Outlet /></div></main>
      </div>
      <EviDock />
    </div>
  );
}

export default DashboardLayout;
