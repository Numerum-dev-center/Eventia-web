import { CalendarDays, Check, X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { fetchAllEventsAdmin, setEventStatusAdmin } from "../../services/eventsApiService";

const STATUS_TONE = {
  PUBLISHED: "ok",
  PENDING: "warn",
  DRAFT: "muted",
  CANCELLED: "danger",
};

const STATUS_LABEL = {
  PUBLISHED: "Validé",
  PENDING: "En attente",
  DRAFT: "Brouillon",
  CANCELLED: "Rejeté",
};

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    fetchAllEventsAdmin()
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await setEventStatusAdmin(id, status);
      load();
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement des événements...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des événements"
        subtitle="Modération et supervision des événements de la plateforme."
      />

      {events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Aucun événement"
          description="Les événements créés par les organisateurs apparaîtront ici."
        />
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Événement</th>
                <th className="px-6 py-4 text-left">Catégorie</th>
                <th className="px-6 py-4 text-left">Lieu</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{event.title}</td>
                  <td className="px-6 py-4">{event.category}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">
                    <Badge tone={STATUS_TONE[event.status] || "muted"}>
                      {STATUS_LABEL[event.status] || event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      {event.status !== "PUBLISHED" && (
                        <button
                          disabled={updatingId === event.id}
                          onClick={() => setStatus(event.id, "PUBLISHED")}
                          className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium disabled:opacity-50"
                        >
                          <Check size={15} />
                          Valider
                        </button>
                      )}
                      {event.status !== "CANCELLED" && (
                        <button
                          disabled={updatingId === event.id}
                          onClick={() => setStatus(event.id, "CANCELLED")}
                          className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
                        >
                          <X size={15} />
                          Rejeter
                        </button>
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

export default Events;
