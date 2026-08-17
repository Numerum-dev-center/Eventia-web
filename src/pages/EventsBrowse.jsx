import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Search, SlidersHorizontal, Ticket, X } from "lucide-react";
import PublicHeader from "../components/public/PublicHeader";
import EviMascot from "../components/brand/EviMascot";
import Skeleton from "../components/ui/Skeleton";
import { fetchPublishedEvents } from "../services/eventsApiService";
import concert from "../assets/landing/events/concert.jpg";
import conference from "../assets/landing/events/conference.jpg";
import festival from "../assets/landing/events/festival.jpg";
import wedding from "../assets/landing/events/wedding.jpg";
import "../styles/marketplace.css";

const FALLBACK_IMAGES = [concert, conference, festival, wedding];
const ALL = "Tous";
const formatDate = (date) => new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const formatPrice = (price) => Number(price || 0) === 0 ? "Gratuit" : `${Number(price).toLocaleString("fr-FR")} FCFA`;

function EventsBrowse() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState("date");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublishedEvents()
      .then((data) => { setEvents(Array.isArray(data) ? data : []); setError(""); })
      .catch(() => { setEvents([]); setError("Impossible de charger les événements pour le moment."); })
      .finally(() => setLoading(false));
  }, []);

  const availableEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((event) => {
      const eventDate = event.date ? new Date(`${event.date}T00:00:00`) : null;
      return eventDate && eventDate >= today && Number(event.remaining) > 0;
    });
  }, [events]);

  const categories = useMemo(() => [ALL, ...new Set(availableEvents.map((event) => event.category).filter(Boolean))], [availableEvents]);
  const visibleEvents = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = availableEvents.filter((event) => {
      const matchesSearch = !search || [event.title, event.location, event.category].some((value) => value?.toLowerCase().includes(search));
      return matchesSearch && (category === ALL || event.category === category);
    });
    return [...filtered].sort((a, b) => sort === "price" ? Number(a.price) - Number(b.price) : new Date(a.date) - new Date(b.date));
  }, [availableEvents, query, category, sort]);

  const clearFilters = () => { setQuery(""); setCategory(ALL); setSort("date"); };

  return (
    <div className="transaction-page">
      <PublicHeader />
      <main>
        <section className="transaction-hero">
          <EviMascot variant="welcome" className="transaction-evi" alt="Evi vous accueille sur Eventia" />
          <h1>Quel événement<br /><em>allez-vous vivre ?</em></h1>
          <p>Choisissez une expérience, réservez vos billets et recevez immédiatement vos codes d’accès.</p>
          <label className="transaction-search">
            <Search size={21} />
            <span className="sr-only">Rechercher un événement</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Événement, ville ou catégorie…" />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Effacer la recherche"><X size={17} /></button>}
          </label>
        </section>

        <section className="transaction-catalog" aria-labelledby="catalog-title">
          <div className="transaction-toolbar">
            <div className="transaction-categories">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={item === category ? "is-active" : ""}>{item}</button>)}</div>
            <label className="transaction-sort"><SlidersHorizontal size={14} /><span className="sr-only">Trier les événements</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="date">Dates les plus proches</option><option value="price">Prix croissant</option></select></label>
          </div>

          <div className="transaction-heading"><div><span>Billetterie publique</span><h2 id="catalog-title">Événements disponibles</h2></div>{!loading && <strong>{visibleEvents.length} événement{visibleEvents.length > 1 ? "s" : ""}</strong>}</div>

          {loading ? (
            <>
              <div className="transaction-heading" style={{ marginBottom: 18 }}>
                <div className="transaction-skeleton-toolbar">
                  <Skeleton className="evi-skeleton-toolbar" width="64px" height="39px" />
                  <Skeleton className="evi-skeleton-toolbar" width="64px" height="39px" />
                  <Skeleton className="evi-skeleton-toolbar" width="64px" height="39px" />
                  <Skeleton className="evi-skeleton-toolbar" width="64px" height="39px" />
                </div>
              </div>
              <div className="transaction-grid transaction-skeleton-grid">
                {Array.from({ length: 6 }).map((_, index) => (
                  <article key={`skeleton-event-${index}`} className="transaction-skeleton-card">
                    <div className="transaction-image">
                      <Skeleton className="evi-skeleton" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="transaction-card-body">
                      <Skeleton width="88%" height="24px" />
                      <Skeleton width="96%" height="10px" style={{ marginTop: 10 }} />
                      <Skeleton width="82%" height="10px" style={{ marginTop: 7 }} />
                      <div style={{ marginTop: 20, paddingTop: 17, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 15, borderTop: "1px solid var(--tx-line)" }}>
                        <div>
                          <Skeleton width="95px" height="8px" />
                          <Skeleton width="72px" height="16px" style={{ marginTop: 8 }} />
                        </div>
                        <Skeleton width="106px" height="16px" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : error ? (
            <div className="transaction-state"><EviMascot variant="help" className="transaction-state-evi" alt="Evi vous aide" /><Ticket size={29} /><h2>Événements indisponibles</h2><p>{error}</p><button type="button" onClick={() => window.location.reload()}>Réessayer</button></div>
          ) : visibleEvents.length === 0 ? (
            <div className="transaction-state"><EviMascot variant="help" className="transaction-state-evi" alt="Evi vous aide à rechercher" /><Search size={29} /><h2>Aucun événement ouvert ne correspond</h2><p>Modifiez votre recherche ou effacez les filtres.</p><button type="button" onClick={clearFilters}>Effacer les filtres</button></div>
          ) : (
            <div className="transaction-grid">
              {visibleEvents.map((event, index) => (
                <Link to={`/events/${event.id}`} className="transaction-card" key={event.id}>
                  <div className="transaction-image"><img src={event.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]} alt={event.title} /><span>{event.category || "Événement"}</span><i>{event.remaining} places</i></div>
                  <div className="transaction-card-body"><h2>{event.title}</h2><p><CalendarDays size={14} /> {formatDate(event.date)} · {event.startTime}</p><p><MapPin size={14} /> {event.location}</p><div><span><small>À partir de</small><strong>{formatPrice(event.price)}</strong></span><em>Voir et réserver <ArrowRight size={15} /></em></div></div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="transaction-footer"><span>Eventia</span><p>© {new Date().getFullYear()} · Billetterie événementielle</p></footer>
    </div>
  );
}

export default EventsBrowse;
