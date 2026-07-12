import { FileText } from "lucide-react";

function Reports() {
  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <FileText size={32} className="text-purple-600" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Rapports
          </h1>

          <p className="text-gray-500">
            Consultez les rapports générés par la plateforme.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li>📄 Rapport des ventes</li>
          <li>📄 Rapport des revenus</li>
          <li>📄 Rapport des utilisateurs</li>
          <li>📄 Rapport des événements</li>
        </ul>
      </div>

    </div>
  );
}

export default Reports;