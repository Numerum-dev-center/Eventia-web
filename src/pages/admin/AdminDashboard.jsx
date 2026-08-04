import { useEffect, useState } from "react";
import { Users, CalendarDays, Wallet, Ticket } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";
import { getUsers } from "../../services/adminService";
import { getEvents } from "../../data/eventsData";
import { getAllTickets, getPlatformFinances } from "../../data/ordersData";

function AdminDashboard() {
  const [userCount, setUserCount] = useState(null);
  const events = getEvents();
  const tickets = getAllTickets();
  const finances = getPlatformFinances();

  useEffect(() => {
    getUsers()
      .then((users) => setUserCount(Array.isArray(users) ? users.length : 0))
      .catch(() => setUserCount(null));
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tableau de bord administrateur"
        subtitle="Vue d'ensemble de la plateforme Eventia."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs"
          value={userCount === null ? "—" : userCount}
          icon={<Users size={26} />}
        />
        <StatCard title="Événements" value={events.length} icon={<CalendarDays size={26} />} />
        <StatCard title="Billets vendus" value={tickets.length} icon={<Ticket size={26} />} />
        <StatCard
          title="Revenus"
          value={`${finances.revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet size={26} />}
        />
      </div>

      <p className="text-xs text-gray-400">
        Utilisateurs : données réelles de l'API. Événements/billets/revenus : calculés à partir des données enregistrées sur cet appareil.
      </p>
    </div>
  );
}

export default AdminDashboard;
