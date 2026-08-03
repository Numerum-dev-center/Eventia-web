import { useEffect, useState } from "react";
import {
  Wallet,
  BadgePercent,
  HandCoins,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import { getAdminFinances } from "../../services/adminService";

function AdminFinances() {
  const [finances, setFinances] = useState({
    revenue: 0,
    commissions: 0,
    reversements: 0,
  });

  useEffect(() => {
    async function loadFinances() {
      try {
        const data = await getAdminFinances();
        setFinances(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadFinances();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finances"
        subtitle="Revenus, commissions et reversements de la plateforme."
      />
      <p className="text-xs text-gray-400 -mt-4">
        Données de démonstration — le backend n'expose pas encore d'endpoint financier global.
      </p>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Revenus"
          value={`${finances.revenue} FCFA`}
          icon={<Wallet />}
        />

        <StatCard
          title="Commissions"
          value={`${finances.commissions} FCFA`}
          icon={<BadgePercent />}
        />

        <StatCard
          title="Reversements"
          value={`${finances.reversements} FCFA`}
          icon={<HandCoins />}
        />

      </div>
    </div>
  );
}

export default AdminFinances;