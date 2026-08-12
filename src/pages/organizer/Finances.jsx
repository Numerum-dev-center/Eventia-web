import { Link } from "react-router-dom";
import { ArrowRight, WalletCards } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Button from "../../components/ui/Button";

function Finances() {
  return (
    <div className="space-y-6">
      <PageHeader title="Finances" subtitle="Suivez les revenus et les reversements générés par vos événements." eyebrow="Pilotage financier" />
      <EmptyState
        icon={WalletCards}
        title="Vos revenus apparaîtront ici"
        description="Dès vos premières ventes, vous retrouverez le chiffre d’affaires, les commissions et le détail de chaque reversement dans cet espace."
        action={<Button as={Link} to="/organizer/events" fullWidth={false}>Voir mes événements <ArrowRight size={16} /></Button>}
      />
    </div>
  );
}

export default Finances;
