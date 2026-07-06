import { useEffect, useState } from "react";

import TicketPieChart from "../../components/ui/TicketPieChart";

import CalendarWidget from "../../components/ui/Calender";
import { Link } from "react-router-dom";

import {
  BadgeCheck,
  CalendarDays,
  Star,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";

import StatCard from "../../components/ui/StatCard";
import RevenueChart from "../../components/ui/RevenueChart";

import EventCard from "../../components/ui/Card";


import { getOrganizerDashboard } from "../../services/organizerService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getOrganizerDashboard();

        setDashboard(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
  <div>
    {/* Titre */}
    <h1 className="text-4xl font-bold mb-8">
      Tableau de bord
    </h1>

    {/* ===== CARTES STATS EN HAUT ===== */}
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Revenus"
        value={`${dashboard.revenue} FCFA`}
        icon={<Wallet />}
      />

      <StatCard
        title="Inscrits"
        value={dashboard.users}
        icon={<Users />}
      />

      <StatCard
        title="Check-ins"
        value={dashboard.checkins}
        icon={<BadgeCheck />}
      />

      <StatCard
        title="Notes"
        value={dashboard.notes}
        icon={<Star />}
      />
    </div>

    {/* ===== LAYOUT PRINCIPAL ===== */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Colonne gauche */}
      <div className="lg:col-span-8 space-y-6">

        {/* Graphiques */}
        <div className="grid md:grid-cols-2 gap-6">
          <TicketPieChart data={dashboard.chart} />
          <RevenueChart data={dashboard.chart} />
        </div>

        {/* Évènements */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Tous les évènements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>

      </div>

      {/* Colonne droite */}
      <div className="lg:col-span-4 space-y-6">

        <h2 className="text-xl font-semibold mb-4">
          Événements à venir
        </h2>
        <EventCard />

        {/* Calendrier */}
        <CalendarWidget />

      </div>

    </div>
  </div>
);
}

export default Dashboard;