import { Link } from "react-router-dom";
import { ArrowLeft, ShieldX } from "lucide-react";

function AccessDenied() {
  return (
    <main className="apple-access-page">
      <section className="apple-access-card">
        <div className="apple-access-icon"><ShieldX size={30} /></div>
        <span>Accès refusé</span>
        <h1>Cette zone n’est pas accessible.</h1>
        <p>
          Cette zone est réservée à un rôle autorisé. Connectez-vous avec un compte administrateur ou organisateur selon l'espace demandé.
        </p>
        <div className="apple-access-actions">
          <Link to="/login">Se connecter</Link>
          <Link to="/"><ArrowLeft size={15} /> Voir les événements</Link>
        </div>
      </section>
    </main>
  );
}

export default AccessDenied;
