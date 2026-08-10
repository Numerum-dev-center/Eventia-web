import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Gauge,
  Loader2,
  ShoppingCart,
  Ticket,
  Users,
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
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Détail événement
        </h1>

        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600">
            Cet événement est introuvable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Détail événement
      </h1>

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


      

      <div className="bg-white rounded-xl p-6 shadow">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-2xl border border-gray-100 p-4 bg-orange-50">
            <p className="text-sm text-gray-500">Places restantes</p>
            <p className="text-2xl font-bold mt-1 flex items-center gap-2">
              <Users size={20} />
              {remainingTickets}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4 bg-orange-50">
            <p className="text-sm text-gray-500">Prix du ticket</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(event.price)}</p>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4 bg-orange-50 flex items-center justify-center">
  <Link
    to={`/organizer/events/${id}/billets`}
    className="
      flex items-center gap-2
      bg-gray-600
      text-white
      px-5 py-3
      rounded-lg
      hover:bg-gray-700
      transition
    "
  >
    <UsersRound size={20} />
    Voir les billets
  </Link>
</div>
        </div>

        <div className="space-y-4">

          <p>
            <strong>Titre :</strong>
            {" "}
            {event.title}
          </p>

          <p>
            <strong>Date :</strong>
            {" "}
            {new Date(event.date).toLocaleDateString("fr-FR")}
          </p>


          <p>
            <strong>Heure de début :</strong>
            {" "}
            {event.startTime}
          </p>

          <p>
            <strong>Heure de fin :</strong>
            {" "}
            {event.endTime}
          </p>

          <p>
            <strong>Lieu :</strong>
            {" "}
            {event.location}
          </p>

          <p>
            <strong>Capacité :</strong>
            {" "}
            {event.capacity}
          </p>

          <p>
            <strong>Catégorie :</strong>
            {" "}
            {event.category}
          </p>

          <p>
            <strong>Prix :</strong>
            {" "}
            {event.price} FCFA
          </p>

          <p>
            <strong>Description :</strong>
            {" "}
            {event.description}
          </p>

          {event.coordinates && (
            <p>
              <strong>Coordonnées :</strong>
              {" "}
              {event.coordinates.latitude}, {event.coordinates.longitude}
            </p>
          )}

          <p>
            <strong>Capacité restante :</strong>
            {" "}
            {remainingTickets}
          </p>

        </div>

        <div className="flex flex-wrap gap-4 mt-8">

  <Link
    to={`/organizer/events/${id}/edit`}
    className="
      bg-orange-500
      text-white
      px-4 py-2
      rounded-lg
      hover:bg-orange-600
    "
  >
    Modifier
  </Link>

  <Link
    to={`/organizer/events/${id}/billets`}
    className="
      bg-gray-600
      text-white
      px-4 py-2
      rounded-lg
      hover:bg-gray-700
    "
  >
    Billets
  </Link>

  <button
    onClick={async () => {
      if (window.confirm("Supprimer définitivement cet événement ?")) {
        await deleteEvent(id);
        navigate("/organizer/events", { replace: true });
      }
    }}
    className="
      bg-red-500
      text-white
      px-4 py-2
      rounded-lg
      hover:bg-red-600
    "
  >
    Supprimer
  </button>

</div>

      </div>

    </div>
  );
}

export default EventDetails;