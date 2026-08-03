import { CalendarDays } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";

function Events() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des événements"
        subtitle="Modération et supervision des événements de la plateforme."
      />

      <EmptyState
        icon={CalendarDays}
        title="Pas encore d'événements à modérer"
        description="Cette vue listera tous les événements créés par les organisateurs dès que l'API de gestion des événements sera disponible."
      />
    </div>
  );
}

export default Events;
