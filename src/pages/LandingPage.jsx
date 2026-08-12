import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  Menu,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react";
import concert from "../assets/landing/events/concert.jpg";
import conference from "../assets/landing/events/conference.jpg";
import festival from "../assets/landing/events/festival.jpg";
import heroDashboard from "../assets/landing/hero-dashboard.jpg";
import "../styles/landing.css";

const navItems = [
  { label: "Fonctionnalités", href: "#fonctionnalites" },
  { label: "Expérience", href: "#experience" },
  { label: "Événements", href: "#evenements" },
  { label: "FAQ", href: "#faq" },
];

const events = [
  {
    image: concert,
    category: "Concert",
    title: "Concert Live",
    location: "Lomé",
    date: "15 août 2026",
  },
  {
    image: conference,
    category: "Conférence",
    title: "Tech Conference",
    location: "Cotonou",
    date: "22 septembre 2026",
  },
  {
    image: festival,
    category: "Festival",
    title: "Festival Culturel",
    location: "Accra",
    date: "5 octobre 2026",
  },
];

const faqs = [
  {
    question: "Comment créer mon premier événement ?",
    answer:
      "Créez votre compte organisateur, renseignez les informations de l’événement, ajoutez vos catégories de billets puis publiez votre page. Tout se fait depuis un espace unique.",
  },
  {
    question: "Comment fonctionne la billetterie ?",
    answer:
      "Vous définissez vos tarifs et vos quotas. Les participants réservent en ligne et reçoivent immédiatement un billet numérique avec un QR code unique.",
  },
  {
    question: "Puis-je contrôler les entrées avec mon téléphone ?",
    answer:
      "Oui. Le scanner Eventia vérifie chaque QR code en quelques secondes et signale immédiatement les billets déjà utilisés ou non valides.",
  },
  {
    question: "Puis-je gérer plusieurs événements ?",
    answer:
      "Oui. Votre tableau de bord regroupe tous vos événements, participants, ventes et rapports, même si plusieurs événements ont lieu en parallèle.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/events?q=${encodeURIComponent(query)}` : "/events");
  };

  return (
    <div className="eventia-landing">
      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" to="/" aria-label="Eventia, accueil">
            <BrandMark />
            <span>Eventia</span>
          </Link>

          <nav className="desktop-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <Link className="text-link" to="/login">
              Se connecter
            </Link>
            <Link className="pill-button pill-button--small" to="/register">
              Commencer
            </Link>
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={23} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navigation mobile">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </a>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Se connecter
            </Link>
            <Link className="pill-button" to="/register" onClick={() => setMenuOpen(false)}>
              Commencer
            </Link>
          </nav>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="ambient ambient--one" />
          <div className="ambient ambient--two" />
          <div className="hero-copy">

            <h1>
              Des événements.
              <br />
              <span>Sans la complexité.</span>
            </h1>
            <p>
              Créez, vendez et accueillez votre public depuis une plateforme
              pensée pour rester simple, du premier billet au dernier scan.
            </p>
            <div className="hero-actions">
              <Link className="pill-button pill-button--large" to="/register">
                Créer un événement <ArrowRight size={18} />
              </Link>
              <Link className="quiet-button" to="/events">
                Explorer les événements
              </Link>
            </div>
            <div className="hero-note">
              <Check size={15} /> Aucun frais de démarrage
              <span>•</span>
              <Check size={15} /> Mise en ligne rapide
            </div>
          </div>

          <div className="product-stage" aria-label="Aperçu du tableau de bord Eventia">
            <div className="stage-glow" />
            <div className="dashboard-window">
              <div className="window-topbar">
                <div className="window-dots"><i /><i /><i /></div>
                <div className="window-title">Vue d’ensemble</div>
                <div className="avatar">AK</div>
              </div>
              <div className="dashboard-body">
                <aside className="mini-sidebar">
                  <BrandMark />
                  <span className="active" />
                  <span />
                  <span />
                  <span />
                </aside>
                <div className="dashboard-content">
                  <div className="dashboard-heading">
                    <div><small>Bonjour Ama 👋</small><strong>Votre activité</strong></div>
                    <button type="button"><span>+</span> Créer</button>
                  </div>
                  <div className="metric-grid">
                    <div><small>Revenus</small><strong>2 480 500 F</strong><em>+18,4 %</em></div>
                    <div><small>Billets vendus</small><strong>1 284</strong><em>+12,2 %</em></div>
                    <div><small>Participants</small><strong>986</strong><em>+9,8 %</em></div>
                  </div>
                  <div className="dashboard-lower">
                    <div className="chart-card">
                      <div className="card-label"><strong>Ventes</strong><span>7 derniers jours</span></div>
                      <div className="chart-bars" aria-hidden="true">
                        {[38, 48, 42, 62, 55, 74, 91, 80, 100, 86, 108, 118].map((height, index) => (
                          <i key={index} style={{ height }} />
                        ))}
                      </div>
                    </div>
                    <div className="next-event-card">
                      <img src={heroDashboard} alt="Foule lors d’un événement" />
                      <div><small>À venir</small><strong>Festival Horizon</strong><span>24 août · Lomé</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form className="search-panel" onSubmit={handleSearch}>
            <Search size={21} aria-hidden="true" />
            <label htmlFor="event-search" className="sr-only">Rechercher un événement</label>
            <input
              id="event-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un concert, une ville, une expérience…"
            />
            <button type="submit">Rechercher</button>
          </form>
        </section>

        <section className="proof-strip" aria-label="Chiffres clés">
          <div><strong>500+</strong><span>événements créés</span></div>
          <div><strong>15k+</strong><span>billets délivrés</span></div>
          <div><strong>20+</strong><span>villes connectées</span></div>
          <p><ShieldCheck size={18} /> Une expérience fiable, fluide et sécurisée.</p>
        </section>

        <section className="section-shell feature-section" id="fonctionnalites">
          <div className="section-heading">
            <span>Tout simplement puissant.</span>
            <h2>Chaque détail travaille<br />pour votre réussite.</h2>
            <p>Des outils complets, présentés avec clarté. Vous gardez le contrôle sans jamais vous perdre.</p>
          </div>

          <div className="bento-grid">
            <article className="bento-card bento-card--large bento-dark">
              <div className="card-icon"><BarChart3 size={23} /></div>
              <span className="card-kicker">Pilotage en temps réel</span>
              <h3>Vos performances,<br />lisibles en un regard.</h3>
              <p>Ventes, fréquentation et revenus se mettent à jour pendant que votre événement vit.</p>
              <div className="mini-chart">
                <div className="mini-chart-top"><span>Revenus</span><strong>+24,8 %</strong></div>
                <div className="spark-bars">
                  {[28, 45, 34, 58, 53, 74, 68, 92, 88, 116].map((height, index) => <i key={index} style={{ height }} />)}
                </div>
              </div>
            </article>

            <article className="bento-card bento-orange">
              <div className="card-icon"><QrCode size={23} /></div>
              <span className="card-kicker">Contrôle d’accès</span>
              <h3>Scannez.<br />C’est validé.</h3>
              <p>Un accès rapide et sécurisé depuis n’importe quel smartphone.</p>
              <div className="qr-demo"><QrCode size={92} strokeWidth={1.4} /><span><Check size={18} /></span></div>
            </article>

            <article className="bento-card bento-soft">
              <div className="card-icon"><Ticket size={23} /></div>
              <span className="card-kicker">Billetterie intégrée</span>
              <h3>Vendre devient naturel.</h3>
              <p>Créez vos tarifs, gérez les quotas et suivez chaque vente sans changer d’outil.</p>
              <div className="ticket-stack" aria-hidden="true">
                <div><span>PASS VIP</span><strong>HORIZON</strong><i /></div>
                <div><span>ADMISSION</span><strong>HORIZON</strong><i /></div>
              </div>
            </article>

            <article className="bento-card bento-light">
              <div className="card-icon"><Users size={23} /></div>
              <span className="card-kicker">Participants</span>
              <h3>Votre public,<br />toujours plus proche.</h3>
              <p>Listes, statuts et présences restent parfaitement organisés.</p>
              <div className="people-list">
                {["AM", "KA", "SE"].map((initials) => (
                  <div key={initials}><span>{initials}</span><i /><Check size={14} /></div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="experience-copy">
            <span className="section-label">Une seule plateforme</span>
            <h2>De l’idée<br />à l’entrée.</h2>
            <p>Eventia relie chaque moment de votre organisation dans un parcours continu.</p>
            <ol>
              <li><span>01</span><div><strong>Composez</strong><small>Créez une page qui donne envie d’être là.</small></div></li>
              <li><span>02</span><div><strong>Publiez</strong><small>Partagez et commencez à vendre instantanément.</small></div></li>
              <li><span>03</span><div><strong>Accueillez</strong><small>Scannez, suivez et profitez de l’événement.</small></div></li>
            </ol>
            <Link to="/register">Découvrir l’espace organisateur <ArrowRight size={17} /></Link>
          </div>
          <div className="phone-scene" aria-label="Aperçu d’un billet mobile Eventia">
            <div className="phone-halo" />
            <div className="phone-frame">
              <div className="phone-island" />
              <div className="phone-screen">
                <div className="mobile-top"><BrandMark /><span>Mon billet</span><i>•••</i></div>
                <img src={concert} alt="Concert sous les lumières de scène" />
                <div className="mobile-event-copy"><small>15 AOÛT · 19:30</small><h3>Concert<br />Live</h3><p>Lomé, Togo</p></div>
                <div className="mobile-ticket"><div><QrCode size={64} /><span><small>ADMISSION</small><strong>PASS STANDARD</strong><em>EVT-2048-AL</em></span></div><p>Présentez ce code à l’entrée</p></div>
              </div>
            </div>
            <div className="phone-bubble phone-bubble--top"><Zap size={18} /><div><small>Vente confirmée</small><strong>Billet envoyé</strong></div></div>
            <div className="phone-bubble phone-bubble--bottom"><ShieldCheck size={18} /><div><small>Paiement</small><strong>Sécurisé</strong></div></div>
          </div>
        </section>

        <section className="section-shell events-section" id="evenements">
          <div className="section-heading section-heading--row">
            <div><span>À vivre maintenant.</span><h2>Trouvez votre<br />prochain moment.</h2></div>
            <Link to="/events">Voir tous les événements <ArrowRight size={17} /></Link>
          </div>
          <div className="event-grid">
            {events.map((event) => (
              <Link className="event-card" to="/events" key={event.title}>
                <div className="event-image"><img src={event.image} alt={event.title} /><span>{event.category}</span></div>
                <div className="event-info"><h3>{event.title}</h3><p><CalendarDays size={16} /> {event.date}</p><p>{event.location}</p></div>
                <span className="event-arrow"><ArrowRight size={18} /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="quote-section">
          <div className="quote-mark">“</div>
          <blockquote>
            Eventia nous laisse nous concentrer sur ce qui compte vraiment : créer une expérience mémorable.
          </blockquote>
          <div className="quote-author"><span>KM</span><div><strong>Koffi Mensah</strong><small>Organisateur de concerts</small></div></div>
        </section>

        <section className="section-shell faq-section" id="faq">
          <div className="faq-heading"><span className="section-label">Questions fréquentes</span><h2>Tout ce qu’il faut<br />savoir.</h2><p>Une question différente ? <a href="mailto:bonjour@eventia.com">Parlez-nous.</a></p></div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span><ChevronDown size={20} /></span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-orb cta-orb--one" />
          <div className="cta-orb cta-orb--two" />
          <div className="cta-icon"><CalendarDays size={27} /></div>
          <span>Votre prochain événement commence ici.</span>
          <h2>Créez quelque chose<br />d’inoubliable.</h2>
          <p>Rejoignez les organisateurs qui font vivre leur communauté avec Eventia.</p>
          <div><Link className="pill-button pill-button--light pill-button--large" to="/register">Commencer gratuitement <ArrowRight size={18} /></Link><Link className="cta-login" to="/login">J’ai déjà un compte</Link></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div><Link className="brand" to="/"><BrandMark /><span>Eventia</span></Link><p>Créer. Rassembler.<br />Faire vivre.</p></div>
          <div><strong>Produit</strong><a href="#fonctionnalites">Fonctionnalités</a><a href="#experience">Expérience</a><Link to="/events">Événements</Link></div>
          <div><strong>Compte</strong><Link to="/register">Créer un compte</Link><Link to="/login">Se connecter</Link><a href="#faq">Aide</a></div>
          <div><strong>Légal</strong><a href="#">Confidentialité</a><a href="#">Conditions</a><a href="#">Mentions légales</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Eventia</span><span>Conçu pour faire vivre vos idées.</span></div>
      </footer>
    </div>
  );
}

export default LandingPage;
