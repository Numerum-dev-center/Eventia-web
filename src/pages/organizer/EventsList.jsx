import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Eye, Pencil, CalendarDays, Loader2 } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import DataToolbar from "../../components/ui/DataToolbar";
import { fetchMyEvents } from "../../services/eventsApiService";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMyEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  const visibleEvents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return events;
    return events.filter((event) => [event.title, event.location, event.category, event.status].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [events, search]);

  const getStatusBadge = (status) => {
    const styles = {
      DRAFT: "bg-gray-100 text-gray-700",
      PENDING: "bg-yellow-100 text-yellow-700",
      PUBLISHED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
      TERMINE: "bg-blue-100 text-blue-700",
    };

    const labels = {
      DRAFT: "Brouillon",
      PENDING: "En attente",
      PUBLISHED: "Publié",
      CANCELLED: "Annulé",
      TERMINE: "Terminé",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          styles[status]
        }`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="apple-page">
      <PageHeader
        title="Mes événements"
        action={
          <Button as={Link} to="/organizer/events/create" fullWidth={false}>
            <Plus size={18} />
            Créer un événement
          </Button>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
          <Loader2 size={18} className="animate-spin" />
          Chargement...
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Aucun événement pour le moment"
          description="Créez votre premier événement pour commencer à vendre des billets."
          action={
            <Button as={Link} to="/organizer/events/create" fullWidth={false}>
              <Plus size={18} />
              Créer un événement
            </Button>
          }
        />
      ) : (
        <>
        <DataToolbar value={search} onChange={setSearch} placeholder="Rechercher un événement…" countLabel={`${visibleEvents.length} événement${visibleEvents.length > 1 ? "s" : ""}`} />
        {visibleEvents.length === 0 ? <EmptyState icon={CalendarDays} title="Aucun résultat" description="Essayez un autre titre, lieu, statut ou catégorie." /> : <div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Titre</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Lieu</th>
                <th className="px-6 py-4 text-left">Catégorie</th>
                <th className="px-6 py-4 text-left">Capacité</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {event.title}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(event.date).toLocaleDateString("fr-FR")}
                  </td>

                  <td className="px-6 py-4">
                    {event.location}
                  </td>

                  <td className="px-6 py-4">
                    {event.category}
                  </td>

                  <td className="px-6 py-4">
                    {event.capacity}
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(event.status)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/organizer/events/${event.id}`}
                        className="text-orange-600 hover:text-orange-800"
                        title="Voir"
                      >
                        <Eye size={18} />
                      </Link>

                      {event.status === "DRAFT" && (
                        <Link
                          to={`/organizer/events/${event.id}/edit`}
                          className="text-orange-500 hover:text-orange-700"
                          title="Modifier"
                        >
                          <Pencil size={18} />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>}
        </>
      )}
    </div>
  );
}

export default EventsList;
