import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ClipboardList, XCircle } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";
import { getScansByEvent } from "../../data/ordersData";

function AccessLog() {
  const { id } = useParams();
  const scans = getScansByEvent(id);

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
        title="Journal d'accès"
        subtitle="Historique des billets scannés à l'entrée."
        action={
          <Button as={Link} to={`/organizer/events/${id}/scan`} fullWidth={false}>
            Ouvrir le scanner
          </Button>
        }
      />

      {scans.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="Aucun scan enregistré"
          description="Chaque billet validé à l'entrée apparaîtra ici avec l'heure, le point de contrôle et le résultat du scan."
          action={
            <Button as={Link} to={`/organizer/events/${id}/scan`} fullWidth={false}>
              Ouvrir le scanner
            </Button>
          }
        />
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Résultat</th>
                <th className="px-6 py-4 text-left">Message</th>
                <th className="px-6 py-4 text-left">Point de contrôle</th>
                <th className="px-6 py-4 text-left">Heure</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr key={scan.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {scan.success ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                        <CheckCircle2 size={16} />
                        Validé
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-red-500 text-sm font-medium">
                        <XCircle size={16} />
                        Refusé
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{scan.message}</td>
                  <td className="px-6 py-4 text-gray-600">{scan.location}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(scan.scannedAt).toLocaleString("fr-FR")}
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

export default AccessLog;
