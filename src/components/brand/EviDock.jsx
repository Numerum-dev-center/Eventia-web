import { useLocation } from "react-router-dom";
import EviMascot from "./EviMascot";

function EviDock() {
  const { pathname } = useLocation();
  const analytics = /dashboard|stats|finance|reports/.test(pathname);
  const success = /scan|access/.test(pathname);
  const help = /settings|create|edit/.test(pathname);
  const variant = analytics ? "analytics" : success ? "success" : help ? "help" : "welcome";
  return <aside className="evi-dock" aria-label="Evi, votre guide Eventia"><EviMascot variant={variant} /><span><strong>Evi</strong><small>{analytics ? "Vos données en un regard" : success ? "Prête pour les contrôles" : help ? "Je vous accompagne" : "Bienvenue dans Eventia"}</small></span></aside>;
}

export default EviDock;
