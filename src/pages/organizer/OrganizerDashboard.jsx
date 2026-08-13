import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import TicketPieChart from "../../components/organizer/TicketPieChart";
import RevenueChart from "../../components/organizer/RevenueChart";
import CalendarWidget from "../../components/ui/Calander";

import {
  BadgeCheck,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
import EventCard from "../../components/organizer/EventsCard";

import { fetchMyEvents, fetchOrganizerDashboard } from "../../services/eventsApiService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeMetric, setActiveMetric] = useState("revenue");


  useEffect(() => {
    Promise.all([fetchOrganizerDashboard(), fetchMyEvents()])
      .then(([dash, ev]) => {
        setDashboard({
          revenue: dash.revenue,
          users: dash.inscrits,
          checkins: dash.checkins,
          tickets: dash.inscrits,
          chart: [
            { month: "Actuel", revenue: dash.revenue, users: dash.inscrits, checkins: dash.checkins, notes: 0 },
          ],
        });
        setEvents(ev);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="apple-page">
      <PageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de vos événements et de vos ventes."
      />

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Revenus"
          value={`${dashboard.revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet />}
          active={activeMetric === "revenue"}
          onMouseEnter={() => setActiveMetric("revenue")}
        />

        <StatCard
          title="Acheteurs"
          value={dashboard.users}
          icon={<Users />}
          active={activeMetric === "users"}
          onMouseEnter={() => setActiveMetric("users")}
        />

        <StatCard
          title="Check-ins"
          value={dashboard.checkins}
          icon={<BadgeCheck />}
          active={activeMetric === "checkins"}
          onMouseEnter={() => setActiveMetric("checkins")}
        />

        <StatCard
          title="Billets vendus"
          value={dashboard.tickets}
          icon={<Ticket />}
          active={activeMetric === "tickets"}
          onMouseEnter={() => setActiveMetric("tickets")}
        />

      </div>

      <p className="text-xs text-gray-400 -mt-4 mb-6">
        Données calculées à partir des événements et réservations enregistrés sur cet appareil.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Gauche */}
        <div className="lg:col-span-8 space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <TicketPieChart
              data={dashboard.chart}
            />

            <RevenueChart
              data={dashboard.chart}
              metric={activeMetric}
            />

          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Tous les évènements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

        </div>

        {/* Droite */}
        <div className="lg:col-span-4 space-y-6">

          <h2 className="text-xl font-semibold mb-4">
            Événements à venir
          </h2>

          {events[0] && <EventCard event={events[0]} />}

          <CalendarWidget />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
