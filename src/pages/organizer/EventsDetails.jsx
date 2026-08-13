import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock3,
  Gauge,
  Loader2,
  MapPin,
  Pencil,
  ShoppingCart,
  Ticket,
  Trash2,
  UsersRound,
} from "lucide-react";

import {
  deleteEvent,
  fetchEventById,
  fetchEventFinance,
} from "../../services/eventsApiService";
import StatCard from "../../components/organizer/StatCard";

const formatCurrency = (value) =>
  new Intl.NumberFormat("fr-FR").format(value) + " FCFA";

const STATUS_LABEL = {
  PUBLISHED: "Publié",
  DRAFT: "Brouillon",
  CANCELLED: "Annulé",
};

function EventDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchEventById(id), fetchEventFinance(id)])
      .then(([ev, fin]) => {
        setEvent(ev);
        setFinance(fin);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const ticketsSold = finance?.ticketsVendus ?? 0;
  const revenue = finance?.revenue ?? 0;
  const remainingTickets = event?.remaining ?? 0;
  const occupancyRate =
    event && event.capacity > 0
      ? Math.round(((event.capacity - event.remaining) / event.capacity) * 100)
      : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="apple-page">
        <div className="ui-empty"><div className="ui-empty-icon"><Ticket /></div><h3>Événement introuvable</h3><p>Cet événement n’existe plus ou vous n’avez pas accès à sa gestion.</p></div>
      </div>
    );
  }

  return (
    <div className="apple-page">
      <Link className="apple-back" to="/organizer/events"><ArrowLeft size={16} /> Tous les événements</Link>
      <section className="apple-detail-hero">
        <span>{event.category || "Événement"} · {STATUS_LABEL[event.status] || "Brouillon"}</span>
        <h1>{event.title}</h1>
        <p>{new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · {event.location}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Tickets vendus"
          value={ticketsSold}
          icon={<ShoppingCart size={28} />}
        />

        <StatCard
          title="Tickets restants"
          value={remainingTickets}
          icon={<Ticket size={28} />}
        />

        <StatCard
          title="Revenus"
          value={formatCurrency(revenue)}
          icon={<BadgeCheck size={28} />}
        />

        <StatCard
          title="Taux de remplissage"
          value={`${occupancyRate}%`}
          icon={<Gauge size={28} />}
        />
      </div>


      <div className="ui-card p-6">
        <div className="apple-detail-grid">
          <div className="apple-detail-item"><small><CalendarDays size={14} /> Date</small><strong>{new Date(event.date).toLocaleDateString("fr-FR")}</strong></div>
          <div className="apple-detail-item"><small><Clock3 size={14} /> Horaires</small><strong>{event.startTime || "—"} — {event.endTime || "—"}</strong></div>
          <div className="apple-detail-item"><small><MapPin size={14} /> Lieu</small><strong>{event.location || "À confirmer"}</strong></div>
          <div className="apple-detail-item"><small><Ticket size={14} /> Billetterie</small><strong>{formatCurrency(event.price)} · {event.capacity} places</strong></div>
        </div>
        <div className="mt-6"><span className="text-xs uppercase tracking-widest text-orange-500 font-bold">Description</span><p className="mt-3 text-sm leading-7 text-gray-600 whitespace-pre-line">{event.description || "Aucune description renseignée."}</p></div>
        <div className="apple-action-row">
          <Link to={`/organizer/events/${id}/edit`} className="bg-orange-500 text-white"><Pencil size={15} /> Modifier</Link>
          <Link to={`/organizer/events/${id}/billets`} className="bg-gray-800 text-white"><UsersRound size={15} /> Billets et participants</Link>
          <button onClick={async () => { if (window.confirm("Supprimer définitivement cet événement ?")) { await deleteEvent(id); navigate("/organizer/events", { replace: true }); } }} className="bg-red-50 text-red-600"><Trash2 size={15} /> Supprimer</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
