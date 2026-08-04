import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import { getEventById } from "../../data/eventsData";
import { getOrdersByEvent, getTicketsByEvent } from "../../data/ordersData";

function EventParticipants() {
  const { id } = useParams();
  const event = getEventById(id);
  const orders = getOrdersByEvent(id);
  const tickets = getTicketsByEvent(id);

  const usedCountForOrder = (orderId) =>
    tickets.filter((t) => t.orderId === orderId && t.status === "UTILISE").length;

  return (
    <div>
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 mb-4"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <PageHeader
        title="Participants"
        subtitle={event ? event.title : undefined}
        action={
          <div className="text-sm text-gray-500">
            Total : <strong>{orders.length}</strong> commande(s) — {tickets.length} billet(s)
          </div>
        }
      />

      {orders.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun participant pour le moment"
          description="Les réservations effectuées depuis la page publique de l'événement apparaîtront ici."
        />
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Participant</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Téléphone</th>
                <th className="px-6 py-4 text-left">Qté</th>
                <th className="px-6 py-4 text-left">Montant</th>
                <th className="px-6 py-4 text-left">Paiement</th>
                <th className="px-6 py-4 text-left">Billets scannés</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.buyerName}</td>
                  <td className="px-6 py-4">{order.buyerEmail}</td>
                  <td className="px-6 py-4">{order.buyerPhone || "—"}</td>
                  <td className="px-6 py-4">{order.quantity}</td>
                  <td className="px-6 py-4">{order.amount.toLocaleString("fr-FR")} FCFA</td>
                  <td className="px-6 py-4">
                    <Badge tone="ok">Payé</Badge>
                  </td>
                  <td className="px-6 py-4">
                    {usedCountForOrder(order.id)} / {order.quantity}
                  </td>
                  <td className="px-6 py-4">
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

export default EventParticipants;
