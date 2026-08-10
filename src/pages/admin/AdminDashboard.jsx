import { useEffect, useState } from "react";
import { Users, CalendarDays, Wallet, Ticket, Loader2 } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";
import { fetchAdminDashboard } from "../../services/eventsApiService";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboard()
      .then(setDashboard)
      .catch(() => setDashboard(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord administrateur"
        subtitle="Vue d'ensemble de la plateforme Eventia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs"
          value={dashboard?.utilisateurs ?? "—"}
          icon={<Users size={26} />}
        />
        <StatCard
          title="Événements"
          value={dashboard?.evenements ?? "—"}
          icon={<CalendarDays size={26} />}
        />
        <StatCard
          title="Billets vendus"
          value={dashboard?.billetsVendus ?? "—"}
          icon={<Ticket size={26} />}
        />
        <StatCard
          title="Revenus"
          value={`${(dashboard?.revenue ?? 0).toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet size={26} />}
        />
      </div>

      <p className="text-xs text-gray-400">
        Données calculées en temps réel à partir de la base de données de la plateforme.
      </p>
    </div>
  );
}

export default AdminDashboard;
