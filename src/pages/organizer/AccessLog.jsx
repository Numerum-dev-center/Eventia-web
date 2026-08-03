import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ClipboardList } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

function AccessLog() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link
        to={`/organizer/events/${id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500"
      >
        <ArrowLeft size={16} />
        Retour à l'événement
      </Link>

      <PageHeader
        title="Journal d'accès"
        subtitle="Historique des billets scannés à l'entrée."
      />

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
    </div>
  );
}

export default AccessLog;
