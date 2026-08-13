import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

const REPORTS = [
  { icon: TrendingUp, label: "Rapport des ventes" },
  { icon: FileText, label: "Rapport des revenus" },
  { icon: Users, label: "Rapport des utilisateurs" },
  { icon: BarChart3, label: "Rapport des événements" },
];

function Reports() {
  return (
    <div className="apple-page space-y-6">
      <PageHeader
        title="Rapports"
        subtitle="Rapports générés par la plateforme."
      />

      <Card padding="p-2">
        <ul className="divide-y divide-gray-100">
          {REPORTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Icon size={18} />
                </span>
                <span className="font-medium text-gray-800">{label}</span>
              </div>
              <span className="text-xs text-gray-400">Bientôt disponible</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default Reports;
