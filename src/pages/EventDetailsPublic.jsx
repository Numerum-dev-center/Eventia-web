import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Check, CheckCircle2, Clock, Mail, MapPin, Minus, Phone, Plus, ShieldCheck, Ticket, UserRound } from "lucide-react";
import PublicHeader from "../components/public/PublicHeader";
import EviMascot from "../components/brand/EviMascot";
import Skeleton from "../components/ui/Skeleton";
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState(auth?.user?.email || "");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    fetchEventById(id)
      .then((ev) => {
        setEvent(ev);
        // Présélectionne la première catégorie encore disponible (sinon la première tout court).
        const firstAvailable = ev.categories?.find((c) => c.remaining > 0) || ev.categories?.[0];
        setSelectedCategoryId(firstAvailable?.id ?? null);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const selectedCategory = event?.categories?.find((c) => c.id === selectedCategoryId) || null;
  const hasMultipleCategories = (event?.categories?.length ?? 0) > 1;

  const maxQuantity = (() => {
    const remainingStock = Number(selectedCategory?.remaining ?? event?.remaining ?? 1);
    const perPersonLimit = Number(selectedCategory?.perPersonLimit ?? event?.perPersonLimit) || null;
    return Math.max(1, perPersonLimit ? Math.min(remainingStock, perPersonLimit) : remainingStock);
  })();
  const changeQuantity = (next) => setQuantity(Math.max(1, Math.min(maxQuantity, next)));

  const handleSelectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setQuantity(1);
  };

  const handleReserve = async (submitEvent) => {
    submitEvent.preventDefault();
    setError("");
    if (!selectedCategory) { setError("Choisissez une catégorie de billet."); return; }
    if (!buyerName.trim() || !buyerEmail.trim()) { setError("Renseignez votre nom et votre adresse email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) { setError("L’adresse email indiquée n’est pas valide."); return; }
    setSubmitting(true);
    try {
      const result = await reserverBillets({ categorieTicketId: selectedCategory.id, quantite: quantity, buyerName: buyerName.trim(), buyerEmail: buyerEmail.trim(), buyerTelephone: buyerPhone.trim() || undefined });
      setConfirmation(result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Impossible de finaliser la réservation.");
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="transaction-page">
      <PublicHeader />
      <main className="event-detail-page">
        <Link to="/" className="event-back"><ArrowLeft size={16} /> Tous les événements</Link>
        <section className="event-cover">
          <Skeleton className="evi-skeleton event-cover-skeleton" style={{ width: "100%", height: "100%" }} />
          <span style={{ position: "absolute", top: "22px", left: "22px" }}><Skeleton className="evi-skeleton-chip" width="110px" height="29px" /></span>
          <div style={{ position: "absolute", left: "38px", right: "38px", bottom: "34px", display: "flex", flexDirection: "column", gap: "10px" }}>
            <small><Skeleton width="94px" height="10px" /></small>
            <h1><Skeleton width="86%" height="58px" /></h1>
          </div>
        </section>

        <div className="event-detail-layout">
          <div className="event-main-column">
            <section className="event-facts">
              {Array.from({ length: 3 }).map((_, index) => (
                <article key={`skeleton-fact-${index}`}>
                  <Skeleton className="evi-skeleton-circle" width="43px" height="43px" />
                  <div>
                    <Skeleton width="64px" height="8px" />
                    <Skeleton width="94%" height="12px" />
                  </div>
                </article>
              ))}
            </section>

            <section className="event-description">
              <Skeleton width="64px" height="8px" />
              <h2><Skeleton width="62%" height="32px" /></h2>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
                <Skeleton width="100%" height="12px" />
                <Skeleton width="100%" height="12px" />
                <Skeleton width="77%" height="12px" />
              </div>
            </section>

            <section className="event-assurance">
              <div><Skeleton className="evi-skeleton-circle" width="42px" height="42px" /></div>
              <span>
                <strong><Skeleton width="184px" height="14px" /></strong>
                <Skeleton width="86%" height="10px" />
              </span>
            </section>
          </div>

          <aside className="booking-card">
            <div className="booking-head">
              <div>
                <Skeleton width="84px" height="10px" />
                <Skeleton width="130px" height="32px" />
              </div>
              <Skeleton className="evi-skeleton-chip" width="103px" height="24px" />
            </div>

            <Skeleton width="100%" height="42px" />
            <Skeleton width="100%" height="42px" style={{ marginTop: 10 }} />
            <Skeleton width="100%" height="42px" style={{ marginTop: 10 }} />
            <Skeleton width="100%" height="42px" style={{ marginTop: 10 }} />
            <div className="booking-total" style={{ marginTop: 8 }}>
              <Skeleton width="74px" height="10px" />
              <Skeleton width="120px" height="28px" />
            </div>
            <Skeleton className="evi-skeleton" width="100%" height="52px" style={{ marginTop: 15 }} />
            <p className="booking-secure"><Skeleton width="70%" height="13px" /></p>
          </aside>
        </div>
      </main>
    </div>
  );
  if (!event) return <div className="transaction-page"><PublicHeader /><div className="event-page-state"><EviMascot variant="help" className="event-state-evi" alt="Evi vous aide à retrouver un événement" /><Ticket size={30} /><h1>Événement introuvable</h1><p>Cette page n’existe plus ou l’événement n’est pas public.</p><Link to="/">Voir les événements</Link></div></div>;
  // Le endpoint public renvoie l'événement quel que soit son statut (brouillon, annulé, terminé) ;
  // seul un événement Publié doit être présenté comme réservable.
  if (event.status !== "PUBLISHED") return <div className="transaction-page"><PublicHeader /><div className="event-page-state"><EviMascot variant="help" className="event-state-evi" alt="Evi vous aide à retrouver un événement" /><Ticket size={30} /><h1>Événement indisponible</h1><p>Cet événement n’est plus ouvert à la réservation.</p><Link to="/">Voir les événements</Link></div></div>;

  const displayPrice = selectedCategory?.price ?? event.price;
  const total = Number(displayPrice || 0) * quantity;

  if (confirmation) {
    return (
      <div className="transaction-page"><PublicHeader />
        <main className="confirmation-page">
          <section className="confirmation-card">
            <EviMascot variant="success" className="confirmation-evi" alt="Evi célèbre votre réservation" />
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
            <div className="booking-head"><div><small>{hasMultipleCategories ? "À partir de" : "Prix par billet"}</small><strong>{formatPrice(hasMultipleCategories ? event.price : displayPrice)}</strong></div><span>{event.remaining > 0 ? `${event.remaining} disponibles` : "Complet"}</span></div>
            {event.remaining > 0 ? <form onSubmit={handleReserve}>
              {error && <div className="booking-error" role="alert">{error}</div>}
              {hasMultipleCategories && (
                <div className="booking-categories" role="radiogroup" aria-label="Catégorie de billet">
                  {event.categories.map((cat) => (
                    <label key={cat.id} className={`booking-category-option${cat.id === selectedCategoryId ? " is-selected" : ""}${cat.remaining <= 0 ? " is-soldout" : ""}`}>
                      <input
                        type="radio"
                        name="categorie-billet"
                        value={cat.id}
                        checked={cat.id === selectedCategoryId}
                        disabled={cat.remaining <= 0}
                        onChange={() => handleSelectCategory(cat.id)}
                      />
                      <span className="booking-category-name">{cat.name}</span>
                      <span className="booking-category-meta">{cat.remaining > 0 ? `${cat.remaining} restants` : "Épuisé"}</span>
                      <strong className="booking-category-price">{formatPrice(cat.price)}</strong>
                    </label>
                  ))}
                </div>
              )}
              <div className="booking-quantity"><div><span>Nombre de billets</span><small>Maximum {maxQuantity}</small></div><div><button type="button" onClick={() => changeQuantity(quantity - 1)} disabled={quantity <= 1} aria-label="Retirer un billet"><Minus size={15} /></button><strong>{quantity}</strong><button type="button" onClick={() => changeQuantity(quantity + 1)} disabled={quantity >= maxQuantity || !selectedCategory} aria-label="Ajouter un billet"><Plus size={15} /></button></div></div>
              <label className="booking-field"><span>Nom complet</span><div><UserRound size={16} /><input value={buyerName} onChange={(changeEvent) => setBuyerName(changeEvent.target.value)} placeholder="Votre nom" autoComplete="name" /></div></label>
              <label className="booking-field"><span>Adresse email</span><div><Mail size={16} /><input type="email" value={buyerEmail} onChange={(changeEvent) => setBuyerEmail(changeEvent.target.value)} placeholder="vous@exemple.com" autoComplete="email" /></div></label>
              <label className="booking-field"><span>Téléphone <em>optionnel</em></span><div><Phone size={16} /><input value={buyerPhone} onChange={(changeEvent) => setBuyerPhone(changeEvent.target.value)} placeholder="+228…" autoComplete="tel" /></div></label>
              <div className="booking-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
              <button className="event-primary-button" type="submit" disabled={submitting || !selectedCategory || selectedCategory.remaining <= 0}>{submitting ? "Réservation en cours…" : <>Réserver maintenant <ArrowRight size={17} /></>}</button>
              <p className="booking-secure"><ShieldCheck size={14} /> Confirmation immédiate et billet sécurisé</p>
            </form> : <div className="booking-soldout"><Ticket size={25} /><strong>Événement complet</strong><p>Il n’y a actuellement plus de billets disponibles.</p><Link to="/">Voir d’autres événements</Link></div>}
          </aside>
        </div>
      </main>
    </div>
  );
}

export default EventDetailsPublic;
