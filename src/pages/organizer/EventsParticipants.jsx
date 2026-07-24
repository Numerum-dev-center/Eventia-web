import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { getParticipants } from "../../services/participantsService";

function EventParticipants() {
  const { id } = useParams();

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadParticipants() {
      const data = await getParticipants(id);
      setParticipants(data);
      setLoading(false);
    }

    loadParticipants();
  }, [id]);

  const getPaymentBadge = (status) => {
    const styles = {
      PAYE: "bg-green-100 text-green-700",
      EN_ATTENTE: "bg-yellow-100 text-yellow-700",
      ECHOUE: "bg-red-100 text-red-700",
      REMBOURSE: "bg-blue-100 text-blue-700",
    };

    const labels = {
      PAYE: "Payé",
      EN_ATTENTE: "En attente",
      ECHOUE: "Échoué",
      REMBOURSE: "Remboursé",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const getTicketBadge = (status) => {
    const styles = {
      VALIDE: "bg-green-100 text-green-700",
      UTILISE: "bg-blue-100 text-blue-700",
      ANNULE: "bg-red-100 text-red-700",
      EXPIRE: "bg-gray-100 text-gray-700",
    };

    const labels = {
      VALIDE: "Valide",
      UTILISE: "Utilisé",
      ANNULE: "Annulé",
      EXPIRE: "Expiré",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Participants
        </h1>

        <div className="text-sm text-gray-500">
          Total : <strong>{participants.length}</strong>
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          Aucun participant trouvé.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Participant</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Téléphone</th>
                <th className="px-6 py-4 text-left">Billet</th>
                <th className="px-6 py-4 text-left">Qté</th>
                <th className="px-6 py-4 text-left">Montant</th>
                <th className="px-6 py-4 text-left">Paiement</th>
                <th className="px-6 py-4 text-left">Billet</th>
                <th className="px-6 py-4 text-left">Date</th>
                
              </tr>
            </thead>

            <tbody>
              {participants.map((participant) => (
                <tr
                  key={participant.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {participant.participant.nom}
                  </td>

                  <td className="px-6 py-4">
                    {participant.participant.email}
                  </td>

                  <td className="px-6 py-4">
                    {participant.participant.telephone}
                  </td>

                  <td className="px-6 py-4">
                    {participant.typeBillet}
                  </td>

                  <td className="px-6 py-4">
                    {participant.quantite}
                  </td>

                  <td className="px-6 py-4">
                    {participant.montant.toLocaleString()} FCFA
                  </td>

                  <td className="px-6 py-4">
                    {getPaymentBadge(participant.statutPaiement)}
                  </td>

                  <td className="px-6 py-4">
                    {getTicketBadge(participant.statutBillet)}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(participant.dateAchat).toLocaleDateString("fr-FR")}
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