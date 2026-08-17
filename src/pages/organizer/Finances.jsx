import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HandCoins, Wallet, WalletCards } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import StatCard from "../../components/organizer/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import { fetchOrganizerFinance } from "../../services/eventsApiService";

function Finances() {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizerFinance()
      .then((data) => setFinance(data))
      .catch(() => setFinance(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="apple-page space-y-6">
        <PageHeader
          title="Finances"
          subtitle="Préchargement des chiffres d'ensemble."
          eyebrow="Pilotage financier"
        />

        <div className="admin-page-kpis">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={`finance-kpi-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="112px" height="8px" />
                <Skeleton width="82%" height="42px" style={{ marginTop: 16 }} />
                <Skeleton width="76px" height="10px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="26px" height="26px" />
            </article>
          ))}
        </div>

        <section className="apple-table-card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--apple-line)" }}>
            <Skeleton className="evi-skeleton-chip" width="238px" height="20px" />
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="74px" height="12px" /></th>
                <th className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="96px" height="12px" /></th>
                <th className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="52px" height="12px" /></th>
                <th className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="74px" height="12px" /></th>
                <th className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="84px" height="12px" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={`org-fin-row-${index}`} className="border-b">
                  <td className="px-6 py-4">
                    <Skeleton width="84px" height="12px" />
                  </td>
                  <td className="px-6 py-4 text-right"><Skeleton width="36px" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="84px" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="84px" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="84px" height="12px" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }

  const evenements = Array.isArray(finance?.evenements) ? finance.evenements : [];

  return (
    <div className="apple-page space-y-6">
      <PageHeader
        title="Finances"
        subtitle="Suivez les revenus et les reversements générés par vos événements."
        eyebrow="Pilotage financier"
      />

      {evenements.length === 0 ? (
        <EmptyState
          icon={WalletCards}
          title="Vos revenus apparaîtront ici"
          description="Dès vos premières ventes, vous retrouverez le chiffre d'affaires, les commissions et le détail de chaque reversement dans cet espace."
          action={<Link to="/organizer/events" className="inline-flex items-center gap-2 text-orange-500 font-medium">Voir mes événements <ArrowRight size={16} /></Link>}
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            <StatCard title="Revenus bruts" value={`${Number(finance.revenue ?? 0).toLocaleString("fr-FR")} FCFA`} icon={<Wallet size={26} />} />
            <StatCard title="Commission (5%)" value={`${Number(finance.commission ?? 0).toLocaleString("fr-FR")} FCFA`} icon={<HandCoins size={26} />} />
            <StatCard title="Reversement net" value={`${Number(finance.net ?? 0).toLocaleString("fr-FR")} FCFA`} icon={<WalletCards size={26} />} />
          </div>

          <div className="apple-table-card">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Événement</th>
                  <th className="px-6 py-4 text-right">Billets vendus</th>
                  <th className="px-6 py-4 text-right">Revenus</th>
                  <th className="px-6 py-4 text-right">Commission</th>
                  <th className="px-6 py-4 text-right">Net à reverser</th>
                </tr>
              </thead>
              <tbody>
                {evenements.map((ev) => (
                  <tr key={ev.evenementId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">
                      <Link to={`/organizer/events/${ev.evenementId}/finance`} className="hover:text-orange-500">
                        {ev.titre}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">{ev.ticketsVendus ?? 0}</td>
                    <td className="px-6 py-4 text-right">{Number(ev.revenue ?? 0).toLocaleString("fr-FR")} FCFA</td>
                    <td className="px-6 py-4 text-right">{Number(ev.commission ?? 0).toLocaleString("fr-FR")} FCFA</td>
                    <td className="px-6 py-4 text-right font-semibold">{Number(ev.net ?? 0).toLocaleString("fr-FR")} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Finances;
