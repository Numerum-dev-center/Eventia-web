import { CalendarDays } from "lucide-react";

function Events() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <CalendarDays size={32} className="text-blue-500" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-dark">
            Gestion des événements
          </h1>

          <p className="text-gray-500">
            Consultez tous les événements de la plateforme.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-whyte-800 rounded-2xl shadow p-6">
        <p className="text-gray-600 dark:text-dark-300">
          Ici seront affichés :
        </p>

        <ul className="list-disc ml-6 mt-3 space-y-2 text-gray-600 dark:text-dark-300">
          <li>Liste des événements</li>
          <li>Validation des événements</li>
          <li>Suppression</li>
          <li>Statistiques</li>
        </ul>
      </div>
    </div>
  );
}

export default Events;