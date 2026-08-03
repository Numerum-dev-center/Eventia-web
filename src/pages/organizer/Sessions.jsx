import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

function Sessions() {
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
        title="Sessions"
        subtitle="Créneaux et répétitions de cet événement, s'il en a plusieurs."
      />

      <EmptyState
        icon={Clock}
        title="Aucune session supplémentaire"
        description="Ajoutez plusieurs créneaux si votre événement se répète (plusieurs dates ou séances)."
        action={
          <Button fullWidth={false} variant="outline">
            <Plus size={16} />
            Ajouter une session
          </Button>
        }
      />
    </div>
  );
}

export default Sessions;
