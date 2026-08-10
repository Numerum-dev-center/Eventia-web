import { useEffect, useState } from "react";
import {
  Wallet,
  BadgePercent,
  HandCoins,
  Loader2,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import { fetchAdminCommissions, fetchAdminReversements } from "../../services/eventsApiService";

function AdminFinances() {
  const [commissions, setCommissions] = useState(null);
  const [reversements, setReversements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchAdminCommissions(), fetchAdminReversements()])
      .then(([commissionsData, reversementsData]) => {
        setCommissions(commissionsData);
        setReversements(Array.isArray(reversementsData) ? reversementsData : []);
      })
      .catch(() => {
        setCommissions(null);
        setReversements([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement des finances...
      </div>
    );
  }

  const revenue = commissions?.revenue ?? 0;
  const commission = commissions?.commission ?? 0;
  const netTotal = reversements.reduce((sum, r) => sum + (r.net ?? 0), 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finances"
        subtitle="Revenus, commissions et reversements de la plateforme."
      />
      <p className="text-xs text-gray-400 -mt-4">
        Calculé en temps réel à partir des commandes enregistrées (commission plateforme : 5%).
      </p>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Revenus"
          value={`${revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet />}
        />

        <StatCard
          title="Commissions"
          value={`${commission.toLocaleString("fr-FR")} FCFA`}
          icon={<BadgePercent />}
        />

        <StatCard
          title="Reversements"
          value={`${netTotal.toLocaleString("fr-FR")} FCFA`}
          icon={<HandCoins />}
        />

      </div>

      {reversements.length > 0 && (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Événement</th>
                <th className="px-6 py-4 text-right">Revenus</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4 text-right">Net à reverser</th>
              </tr>
            </thead>
            <tbody>
              {reversements.map((r, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{r.titre}</td>
                  <td className="px-6 py-4 text-right">
                    {(r.revenue ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 text-right">
                    {(r.commission ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {(r.net ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminFinances;
