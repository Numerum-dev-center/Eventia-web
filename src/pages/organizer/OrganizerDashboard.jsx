import { useEffect, useState } from "react";

import TicketPieChart from "../../components/organizer/TicketPieChart";
import RevenueChart from "../../components/organizer/RevenueChart";
import CalendarWidget from "../../components/ui/Calander";

import {
  BadgeCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";

import StatCard from "../../components/organizer/StatCard";
import EventCard from "../../components/organizer/EventsCard";

import { getOrganizerDashboard } from "../../services/organizerService";
import { getEvents } from "../../data/eventsData";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const events = getEvents();

  const [activeMetric, setActiveMetric] = useState("revenue");
  

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
      <h1 className="text-4xl font-bold mb-8">
        Tableau de bord
      </h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <StatCard
          title="Revenus"
          value={`${dashboard.revenue} FCFA`}
          icon={<Wallet />}
          active={activeMetric === "revenue"}
          onMouseEnter={() => setActiveMetric("revenue")}
        />

        <StatCard
          title="Inscrits"
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
          title="Notes"
          value={dashboard.notes}
          icon={<Star />}
          active={activeMetric === "notes"}
          onMouseEnter={() => setActiveMetric("notes")}
        />

      </div>

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

          <EventCard event={events[0]} />

          <CalendarWidget />

        </div>

      </div>
    </div>
  );
}

export default Dashboard;