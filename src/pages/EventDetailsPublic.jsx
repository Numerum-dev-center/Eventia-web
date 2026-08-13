import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock, LoaderCircle, Mail, MapPin, Minus, Phone, Plus, ShieldCheck, Ticket, UserRound } from "lucide-react";
import PublicHeader from "../components/public/PublicHeader";
import { fetchEventById, reserverBillets } from "../services/eventsApiService";
import { getStoredAuth } from "../services/authSession";
import fallbackImage from "../assets/landing/events/concert.jpg";
import "../styles/marketplace.css";
import "../styles/event-detail.css";

const formatDate = (value) => new Date(`${value}T00:00:00`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const formatPrice = (value) => Number(value || 0) === 0 ? "Gratuit" : `${Number(value).toLocaleString("fr-FR")} FCFA`;

function EventDetailsPublic() {
  const { id } = useParams();
  const auth = getStoredAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState(auth?.user?.email || "");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    fetchEventById(id).then(setEvent).catch(() => setEvent(null)).finally(() => setLoading(false));
  }, [id]);

  const changeQuantity = (next) => setQuantity(Math.max(1, Math.min(Number(event?.remaining || 1), next)));

  const handleReserve = async (submitEvent) => {
    submitEvent.preventDefault();
    setError("");
    if (!buyerName.trim() || !buyerEmail.trim()) { setError("Renseignez votre nom et votre adresse email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) { setError("L’adresse email indiquée n’est pas valide."); return; }
    setSubmitting(true);
    try {
      const result = await reserverBillets({ categorieTicketId: event.categorieTicketId, quantite: quantity, buyerName: buyerName.trim(), buyerEmail: buyerEmail.trim(), buyerTelephone: buyerPhone.trim() || undefined });
      setConfirmation(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Impossible de finaliser la réservation.");
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="transaction-page"><PublicHeader /><div className="event-page-state"><LoaderCircle className="event-spinner" size={30} /><h1>Chargement de l’événement…</h1><p>Nous vérifions les dernières disponibilités.</p></div></div>;
  if (!event) return <div className="transaction-page"><PublicHeader /><div className="event-page-state"><Ticket size={30} /><h1>Événement introuvable</h1><p>Cette page n’existe plus ou l’événement n’est pas public.</p><Link to="/">Voir les événements</Link></div></div>;

  const remaining = Number(event.remaining || 0);
  const total = Number(event.price || 0) * quantity;

  if (confirmation) {
    return (
      <div className="transaction-page"><PublicHeader />
        <main className="confirmation-page">
          <section className="confirmation-card">
            <div className="confirmation-icon"><CheckCircle2 size={34} /></div>
            <span className="confirmation-label">Réservation confirmée</span>
            <h1>Vos billets sont prêts.</h1>
            <p>{confirmation.billets.length} billet{confirmation.billets.length > 1 ? "s" : ""} pour <strong>{event.title}</strong>. Conservez soigneusement les codes ci-dessous.</p>
            <div className="confirmation-tickets">{confirmation.billets.map((ticket, index) => <article key={ticket.id}><div><Ticket size={19} /><span><small>BILLET {String(index + 1).padStart(2, "0")}</small><strong>{ticket.codeUniqueCrypto}</strong></span></div><em><Check size={13} /> Valide</em></article>)}</div>
            <div className="confirmation-note"><ShieldCheck size={17} /> Ces codes seront contrôlés à l’entrée de l’événement.</div>
            <Link className="event-primary-button" to="/">Découvrir d’autres événements <ArrowRight size={17} /></Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="transaction-page"><PublicHeader />
      <main className="event-detail-page">
        <Link to="/" className="event-back"><ArrowLeft size={16} /> Tous les événements</Link>
        <section className="event-cover"><img src={event.image || fallbackImage} alt={event.title} /><div className="event-cover-shade" /><span>{event.category || "Événement"}</span><div><small>Réservations ouvertes</small><h1>{event.title}</h1></div></section>

        <div className="event-detail-layout">
          <div className="event-main-column">
            <section className="event-facts">
              <article><span><CalendarDays size={20} /></span><div><small>Date</small><strong>{formatDate(event.date)}</strong></div></article>
              <article><span><Clock size={20} /></span><div><small>Horaires</small><strong>{event.startTime || "—"} — {event.endTime || "—"}</strong></div></article>
              <article><span><MapPin size={20} /></span><div><small>Lieu</small><strong>{event.location || "À confirmer"}</strong></div></article>
            </section>
            <section className="event-description"><span>À propos</span><h2>Une expérience à vivre.</h2><p>{event.description || "L’organisateur n’a pas encore ajouté de description pour cet événement."}</p></section>
            <section className="event-assurance"><div><ShieldCheck size={22} /></div><span><strong>Réservation sécurisée</strong><small>Votre billet est généré immédiatement et possède un code d’accès unique.</small></span></section>
          </div>

          <aside className="booking-card">
            <div className="booking-head"><div><small>Prix par billet</small><strong>{formatPrice(event.price)}</strong></div><span>{remaining > 0 ? `${remaining} disponibles` : "Complet"}</span></div>
            {remaining > 0 ? <form onSubmit={handleReserve}>
              {error && <div className="booking-error" role="alert">{error}</div>}
              <div className="booking-quantity"><div><span>Nombre de billets</span><small>Maximum {remaining}</small></div><div><button type="button" onClick={() => changeQuantity(quantity - 1)} disabled={quantity <= 1} aria-label="Retirer un billet"><Minus size={15} /></button><strong>{quantity}</strong><button type="button" onClick={() => changeQuantity(quantity + 1)} disabled={quantity >= remaining} aria-label="Ajouter un billet"><Plus size={15} /></button></div></div>
              <label className="booking-field"><span>Nom complet</span><div><UserRound size={16} /><input value={buyerName} onChange={(changeEvent) => setBuyerName(changeEvent.target.value)} placeholder="Votre nom" autoComplete="name" /></div></label>
              <label className="booking-field"><span>Adresse email</span><div><Mail size={16} /><input type="email" value={buyerEmail} onChange={(changeEvent) => setBuyerEmail(changeEvent.target.value)} placeholder="vous@exemple.com" autoComplete="email" /></div></label>
              <label className="booking-field"><span>Téléphone <em>optionnel</em></span><div><Phone size={16} /><input value={buyerPhone} onChange={(changeEvent) => setBuyerPhone(changeEvent.target.value)} placeholder="+228…" autoComplete="tel" /></div></label>
              <div className="booking-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <button className="event-primary-button" type="submit" disabled={submitting}>{submitting ? "Réservation en cours…" : <>Réserver maintenant <ArrowRight size={17} /></>}</button>
              <p className="booking-secure"><ShieldCheck size={14} /> Confirmation immédiate et billet sécurisé</p>
            </form> : <div className="booking-soldout"><Ticket size={25} /><strong>Événement complet</strong><p>Il n’y a actuellement plus de billets disponibles.</p><Link to="/">Voir d’autres événements</Link></div>}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default EventDetailsPublic;
