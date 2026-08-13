import { CalendarPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../brand/BrandLogo";

function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="public-header">
      <div className="public-nav">
        <Link to="/" className="public-logo" aria-label="Eventia, événements disponibles"><BrandLogo /></Link>
        <nav className="public-actions" aria-label="Navigation principale">
          <Link className="public-organize" to="/register"><CalendarPlus size={16} /> Organiser un événement</Link>
          <Link className="public-login" to="/login">Se connecter</Link>
          <Link className="public-register" to="/register">Créer un compte</Link>
        </nav>
        <button className="public-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>{open ? <X size={21} /> : <Menu size={22} />}</button>
      </div>
      {open && <nav className="public-mobile-menu"><Link to="/register">Organiser un événement</Link><Link to="/login">Se connecter</Link><Link className="public-register" to="/register">Créer un compte</Link></nav>}
    </header>
  );
}

export default PublicHeader;
