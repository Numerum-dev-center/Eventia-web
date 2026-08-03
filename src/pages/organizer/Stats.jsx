import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BarChart3 } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

function Stats() {
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
        title="Statistiques"
        subtitle="Fréquentation, ventes et engagement pour cet événement."
      />

      <EmptyState
        icon={BarChart3}
        title="Statistiques bientôt disponibles"
        description="Le détail des ventes, de la fréquentation et de l'engagement pour cet événement apparaîtra ici dès que l'API sera branchée."
        action={
          <Button as={Link} to={`/organizer/events/${id}`} fullWidth={false} variant="outline">
            Retour à l'événement
          </Button>
        }
      />
    </div>
  );
}

export default Stats;
