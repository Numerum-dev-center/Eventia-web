import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, HandCoins, ShoppingCart, Wallet } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import StatCard from "../../components/organizer/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import { fetchEventFinance, fetchParticipants } from "../../services/eventsApiService";

function EventsFinances() {
  const { id } = useParams();
  const [finance, setFinance] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchEventFinance(id), fetchParticipants(id)])
      .then(([f, c]) => {
        setFinance(f);
        setCommandes(c);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="apple-page space-y-6">
        <Link
          to={`/organizer/events/${id}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500"
        >
          <ArrowLeft size={16} />
          Retour à l'événement
        </Link>

        <PageHeader
          title="Bilan financier"
          subtitle="Préparation des chiffres de l'événement en cours."
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`event-fin-kpi-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="95px" height="8px" />
                <Skeleton width="88%" height="36px" style={{ marginTop: 14 }} />
                <Skeleton width="76px" height="10px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="26px" height="26px" />
            </div>
          ))}
        </div>

        <div className="apple-table-card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--apple-line)" }}>
            <Skeleton className="evi-skeleton-chip" width="200px" height="20px" />
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="58px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="54px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="54px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="42px" height="12px" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={`event-fin-row-${index}`} className="border-b">
                  <td className="px-6 py-4"><Skeleton width="68%" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="72px" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="72px" height="12px" /></td>
                  <td className="px-6 py-4 text-right"><Skeleton width="72px" height="12px" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-page space-y-6">
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <PageHeader
        title="Bilan financier"
        subtitle="Revenus, commission plateforme et reversement pour cet événement."
      />

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard title="Revenus bruts" value={`${finance.revenue.toLocaleString("fr-FR")} FCFA`} icon={<Wallet size={26} />} />
        <StatCard title="Commission (5%)" value={`${finance.commission.toLocaleString("fr-FR")} FCFA`} icon={<HandCoins size={26} />} />
        <StatCard title="Reversement net" value={`${finance.net.toLocaleString("fr-FR")} FCFA`} icon={<ShoppingCart size={26} />} />
      </div>

      {commandes.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Aucune vente pour le moment"
          description="Le détail des transactions apparaîtra ici dès que des billets seront réservés."
        />
      ) : (
        <div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Acheteur</th>
                <th className="px-6 py-4 text-left">Billets</th>
                <th className="px-6 py-4 text-left">Montant</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {commandes.map((commande) => (
                <tr key={commande.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{commande.buyerName}</td>
                  <td className="px-6 py-4">{commande.ticketsEmis?.length ?? 0}</td>
                  <td className="px-6 py-4">
                    {Number(commande.montantTotal).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(commande.dateCommande).toLocaleDateString("fr-FR")}
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

export default EventsFinances;
