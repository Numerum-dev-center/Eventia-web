import {
  Wallet,
  BadgePercent,
  HandCoins,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import { getPlatformFinances } from "../../data/ordersData";

function AdminFinances() {
  const finances = getPlatformFinances();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finances"
        subtitle="Revenus, commissions et reversements de la plateforme."
      />
      <p className="text-xs text-gray-400 -mt-4">
        Calculé à partir des réservations enregistrées sur cet appareil (commission plateforme : 10%).
      </p>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Revenus"
          value={`${finances.revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet />}
        />

        <StatCard
          title="Commissions"
          value={`${finances.commissions.toLocaleString("fr-FR")} FCFA`}
          icon={<BadgePercent />}
        />

        <StatCard
          title="Reversements"
          value={`${finances.reversements.toLocaleString("fr-FR")} FCFA`}
          icon={<HandCoins />}
        />

      </div>
    </div>
  );
}

export default AdminFinances;
