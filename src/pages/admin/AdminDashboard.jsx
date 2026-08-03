import { Users, CalendarDays, Wallet, Ticket } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord administrateur"
        subtitle="Vue d'ensemble de la plateforme Eventia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Utilisateurs" value="125" icon={<Users size={26} />} />
        <StatCard title="Événements" value="48" icon={<CalendarDays size={26} />} />
        <StatCard title="Billets vendus" value="1 240" icon={<Ticket size={26} />} />
        <StatCard title="Revenus" value="12 500 000 FCFA" icon={<Wallet size={26} />} />
      </div>

      <p className="text-xs text-gray-400">
        Données de démonstration — le backend n'expose pas encore d'endpoint de statistiques globales.
      </p>
    </div>
  );
}

export default AdminDashboard;
