import { Link } from "react-router-dom";
import { Plus, Eye, Pencil } from "lucide-react";

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Mes événements
        </h1>

        <Link
          to="/organizer/events/create"
          className="
            flex items-center gap-2
            bg-orange-500
            text-white
            px-4 py-2
            rounded-lg
            hover:bg-orange-600
          "
        >
          <Plus size={18} />
          Créer un événement
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          Aucun événement trouvé.
        </div>
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
                        className="text-blue-600 hover:text-blue-800"
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