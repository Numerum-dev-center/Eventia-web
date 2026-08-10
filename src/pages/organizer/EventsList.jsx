import { Link } from "react-router-dom";
import { Plus, Eye, Pencil, CalendarDays } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import EmptyState from "../../components/ui/EmptyState";
import { getEvents } from "../../data/eventsData";

function EventsList() {
  const events = getEvents();

  const getStatusBadge = (status) => {
    const styles = {
      DRAFT: "bg-gray-100 text-gray-700",
      PENDING: "bg-yellow-100 text-yellow-700",
      PUBLISHED: "bg-green-100 text-green-700",
      CANCELLED: "bg-red-100 text-red-700",
    };

    const labels = {
      DRAFT: "Brouillon",
      PENDING: "En attente",
      PUBLISHED: "Publié",
      CANCELLED: "Annulé",
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
    <div>
      <PageHeader
        title="Mes événements"
        action={
          <Button as={Link} to="/organizer/events/create" fullWidth={false}>
            <Plus size={18} />
            Créer un événement
          </Button>
        }
      />

      {events.length === 0 ? (
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
        <div className="bg-white rounded-xl shadow overflow-x-auto">
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
              {events.map((event) => (
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
        </div>
      )}
    </div>
  );
}

export default EventsList;