import { ArrowLeft, BarChart3, Check, ShieldCheck, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import eventImage from "../../assets/organizer/im-land.jpg";
import "../../styles/auth.css";

export function AuthBrand() {
  return (
    <Link className="auth-brand" to="/" aria-label="Eventia, retour à l’accueil">
      <span className="auth-brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>Eventia</span>
    </Link>
  );
}

function AuthVisual() {
  return (
    <aside className="auth-visual" aria-label="Découvrez Eventia">
      <div className="auth-visual-glow" />
      <div className="auth-visual-copy">
        <span className="auth-visual-label"><span /> Pensé pour vos événements</span>
        <h2>Tout organiser.<br />Sans s’éparpiller.</h2>
        <p>Billetterie, participants et accès réunis dans une expérience simple et fluide.</p>
      </div>

      <div className="auth-event-preview">
        <img src={eventImage} alt="Public réuni pendant un concert" />
        <div className="auth-event-overlay">
          <span>PROCHAIN ÉVÉNEMENT</span>
          <strong>Festival Horizon</strong>
          <small>24 août · Lomé</small>
        </div>
      </div>

      <div className="auth-float auth-float--sales">
        <span><BarChart3 size={18} /></span>
        <div><small>Ventes aujourd’hui</small><strong>+ 248 billets</strong></div>
        <em>+18%</em>
      </div>
      <div className="auth-float auth-float--ticket">
        <span><Ticket size={18} /></span>
        <div><small>Dernier billet</small><strong>Confirmé</strong></div>
        <i><Check size={13} /></i>
      </div>

      <div className="auth-visual-proof"><ShieldCheck size={15} /> Paiements et données sécurisés</div>
    </aside>
  );
}

export function AuthShell({
  eyebrow,
  title,
  description,
  backTo = "/",
  backLabel = "Retour à l’accueil",
  children,
}) {
  return (
    <main className="auth-page">
      <div className="auth-ambient auth-ambient--one" />
      <div className="auth-ambient auth-ambient--two" />
      <header className="auth-topbar">
        <AuthBrand />
        <Link className="auth-back" to={backTo}><ArrowLeft size={16} /> {backLabel}</Link>
      </header>

      <section className="auth-shell">
        <AuthVisual />
        <div className="auth-form-panel">
          <div className="auth-form-wrap">
            {eyebrow && <span className="auth-eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {description && <div className="auth-description">{description}</div>}
            {children}
          </div>
        </div>
      </section>
      <p className="auth-copyright">© {new Date().getFullYear()} Eventia · Une expérience pensée avec soin.</p>
    </main>
  );
}

export function AuthStatus({ icon, tone = "orange", title, children, action, secondary }) {
  return (
    <main className="auth-page auth-page--status">
      <div className="auth-ambient auth-ambient--one" />
      <div className="auth-ambient auth-ambient--two" />
      <header className="auth-topbar"><AuthBrand /></header>
      <section className="auth-status-card">
        <div className={`auth-status-icon auth-status-icon--${tone}`}>{icon}</div>
        <h1>{title}</h1>
        <div className="auth-status-copy">{children}</div>
        {action}
        {secondary}
      </section>
      <p className="auth-copyright">© {new Date().getFullYear()} Eventia</p>
    </main>
  );
}
