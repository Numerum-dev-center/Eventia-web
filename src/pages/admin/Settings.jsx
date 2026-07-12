import { Settings } from "lucide-react";

function SettingsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <Settings size={32} className="text-gray-700 dark:text-white" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Paramètres
          </h1>

          <p className="text-gray-500">
            Configuration générale de la plateforme.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-4">

        <div>
          <label className="block text-sm font-medium">
            Nom de la plateforme
          </label>

          <input
            type="text"
            defaultValue="Eventia"
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Adresse email
          </label>

          <input
            type="email"
            defaultValue="admin@eventia.com"
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl">
          Enregistrer
        </button>

      </div>

    </div>
  );
}

export default SettingsPage;