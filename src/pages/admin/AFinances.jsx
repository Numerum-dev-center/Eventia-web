import { useEffect, useState } from "react";
import {
  Wallet,
  BadgePercent,
  HandCoins,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
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
      {/* Titre */}
      <div className="flex items-center gap-3">
        <Wallet size={32} className="text-green-600" />

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Finances
          </h1>

          <p className="text-gray-500">
            Revenus, commissions et reversements.
          </p>
        </div>
      </div>

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