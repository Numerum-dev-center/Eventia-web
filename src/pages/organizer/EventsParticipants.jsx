import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Users } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import DataToolbar from "../../components/ui/DataToolbar";
import { fetchEventById, fetchParticipants } from "../../services/eventsApiService";

const STATUT_TONE = {
  Payé: "ok",
  "En attente": "warn",
  Echoué: "danger",
};

function EventParticipants() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([fetchEventById(id), fetchParticipants(id)])
      .then(([ev, c]) => {
        setEvent(ev);
        setCommandes(c);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const totalBillets = commandes.reduce((sum, c) => sum + (c.ticketsEmis?.length ?? 0), 0);
  const visibleCommandes = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return commandes;
    return commandes.filter((commande) => [commande.buyerName, commande.buyerEmail, commande.buyerTelephone, commande.statutPaiement].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [commandes, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement...
      </div>
    );
  }

  return (
    <div className="apple-page">
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-4"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <PageHeader
        title="Participants"
        subtitle={event ? event.title : undefined}
        action={
          <div className="text-sm text-gray-500">
            Total : <strong>{commandes.length}</strong> commande(s) — {totalBillets} billet(s)
          </div>
        }
      />

      {commandes.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun participant pour le moment"
          description="Les réservations effectuées depuis la page publique de l'événement apparaîtront ici."
        />
      ) : (
        <>
        <DataToolbar value={search} onChange={setSearch} placeholder="Rechercher un participant…" countLabel={`${visibleCommandes.length} commande${visibleCommandes.length > 1 ? "s" : ""}`} />
        {visibleCommandes.length === 0 ? <EmptyState icon={Users} title="Aucun résultat" description="Aucun participant ne correspond à cette recherche." /> : <div className="apple-table-card">
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
              {visibleCommandes.map((commande) => {
                const billets = commande.ticketsEmis ?? [];
                const scannes = billets.filter((t) => t.statutValidation === "Scanne").length;
                return (
                  <tr key={commande.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{commande.buyerName}</td>
                    <td className="px-6 py-4">{commande.buyerEmail}</td>
                    <td className="px-6 py-4">{commande.buyerTelephone || "—"}</td>
                    <td className="px-6 py-4">{billets.length}</td>
                    <td className="px-6 py-4">
                      {Number(commande.montantTotal).toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={STATUT_TONE[commande.statutPaiement] || "muted"}>
                        {commande.statutPaiement}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {scannes} / {billets.length}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(commande.dateCommande).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>}
        </>
      )}
    </div>
  );
}

export default EventParticipants;
