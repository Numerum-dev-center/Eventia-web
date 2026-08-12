import { Bell, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { getStoredAuth } from "../../services/authSession";

const PAGE_TITLES = {
  dashboard: "Vue d’ensemble",
  events: "Événements",
  finance: "Finances",
  users: "Utilisateurs",
  reports: "Rapports",
  settings: "Paramètres",
  create: "Nouvel événement",
  edit: "Modifier l’événement",
  participants: "Participants",
  billets: "Billets",
  sessions: "Sessions",
  stats: "Statistiques",
  scan: "Scanner",
  access: "Journal d’accès",
};

function Topbar({ workspace = "Organisateur", onMenuOpen }) {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const lastSegment = parts.at(-1) || "dashboard";
  const title = PAGE_TITLES[lastSegment] || (parts.includes("events") ? "Détail de l’événement" : "Vue d’ensemble");
  const email = getStoredAuth()?.user?.email || "Compte Eventia";
  const isAdmin = workspace.toLowerCase().includes("admin");

  return (
    <header className="db-topbar">
      <div className="db-topbar-title">
        <button className="db-menu-button" type="button" onClick={onMenuOpen} aria-label="Ouvrir le menu"><Menu size={20} /></button>
        <div><span>{workspace}</span><h1>{title}</h1></div>
      </div>
      <div className="db-topbar-actions">
        <label className="db-search"><Search size={17} /><span className="sr-only">Rechercher</span><input type="search" placeholder="Rechercher…" /></label>
        <button className="db-icon-button" type="button" aria-label="Notifications"><Bell size={18} /><i /></button>
        <Link className="db-profile" to={isAdmin ? "/admin/settings" : "/organizer/settings"}>
          <span>{email.slice(0, 2).toUpperCase()}</span>
          <div><strong>{isAdmin ? "Administrateur" : "Organisateur"}</strong><small>{email}</small></div>
        </Link>
      </div>
    </header>
  );
}

export default Topbar;
