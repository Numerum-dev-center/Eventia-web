import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Wallet } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

function EventsFinances() {
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
        title="Bilan financier"
        subtitle="Revenus, frais et reversements pour cet événement."
      />

      <EmptyState
        icon={Wallet}
        title="Bilan financier bientôt disponible"
        description="Le détail des revenus et reversements pour cet événement apparaîtra ici dès que le module de paiement sera branché à l'API."
        action={
          <Button as={Link} to={`/organizer/events/${id}`} fullWidth={false} variant="outline">
            Retour à l'événement
          </Button>
        }
      />
    </div>
  );
}

export default EventsFinances;
