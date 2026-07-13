import { Settings } from "lucide-react";


function SettingsPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <Settings size={32} className="text-gray-700 dark:text-dark" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-dark">
            Paramètres
          </h1>

          <p className="text-gray-500">
            Configuration générale de la plateforme.
          </p>
        </div>
      </div>

      
    </div>
  );
}

export default SettingsPage;