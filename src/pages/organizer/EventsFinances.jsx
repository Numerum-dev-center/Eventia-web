import { useParams, Link } from "react-router-dom";
import { ArrowLeft, HandCoins, ShoppingCart, Wallet } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import StatCard from "../../components/organizer/StatCard";
import { getOrdersByEvent } from "../../data/ordersData";
import { getEventStats } from "../../data/ordersData";

const COMMISSION_RATE = 0.05;

function EventsFinances() {
  const { id } = useParams();
  const orders = getOrdersByEvent(id);
  const stats = getEventStats(id);
  const commission = Math.round(stats.revenue * COMMISSION_RATE);
  const net = stats.revenue - commission;

  return (
    <div className="space-y-6">
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
        <StatCard title="Revenus bruts" value={`${stats.revenue.toLocaleString("fr-FR")} FCFA`} icon={<Wallet size={26} />} />
        <StatCard title="Commission (5%)" value={`${commission.toLocaleString("fr-FR")} FCFA`} icon={<HandCoins size={26} />} />
        <StatCard title="Reversement net" value={`${net.toLocaleString("fr-FR")} FCFA`} icon={<ShoppingCart size={26} />} />
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="Aucune vente pour le moment"
          description="Le détail des transactions apparaîtra ici dès que des billets seront réservés."
        />
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
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
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.buyerName}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.amount.toLocaleString("fr-FR")} FCFA</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(order.purchasedAt).toLocaleDateString("fr-FR")}
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
