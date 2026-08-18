import { useEffect, useState } from "react";
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
import Skeleton from "../../components/ui/Skeleton";

import { fetchMyEvents, fetchOrganizerDashboard } from "../../services/eventsApiService";

const emptyDashboard = {
  revenue: 0,
  users: 0,
  checkins: 0,
  tickets: 0,
  chart: [
    { month: "Actuel", revenue: 0, users: 0, checkins: 0, notes: 0 },
  ],
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeMetric, setActiveMetric] = useState("revenue");


  useEffect(() => {
    Promise.all([
      fetchOrganizerDashboard().catch(() => null),
      fetchMyEvents().catch(() => []),
    ])
      .then(([dash, ev]) => {
        const revenue = Number(dash?.revenue ?? 0);
        const users = Number(dash?.inscrits ?? 0);
        const checkins = Number(dash?.checkins ?? 0);
        setDashboard({
          revenue,
          users,
          checkins,
          tickets: users,
          chart: [
            { month: "Actuel", revenue, users, checkins, notes: 0 },
          ],
        });
        setEvents(Array.isArray(ev) ? ev : []);
      })
      .finally(() => setLoading(false));
  }, []);

  const safeDashboard = dashboard ?? emptyDashboard;

  if (loading) {
    return (
      <div className="apple-page space-y-6">
        <PageHeader
          title="Tableau de bord"
          subtitle="Aperçu de vos ventes et de vos évènements."
        />
        <div className="grid md:grid-cols-4 gap-6 mb-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`org-kpi-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="88px" height="8px" />
                <Skeleton width="84%" height="42px" style={{ marginTop: 16 }} />
                <Skeleton width="104px" height="10px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="40px" height="40px" />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 -mt-2 mb-4">
          Données en cours de préparation depuis votre espace organisateur.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <section className="grid md:grid-cols-2 gap-6">
              <article className="admin-panel">
                <header className="admin-panel-head">
                  <div><Skeleton className="evi-skeleton-chip" width="142px" height="8px" /><Skeleton width="170px" height="21px" /></div>
                </header>
                <Skeleton className="evi-skeleton" style={{ height: "248px", borderRadius: "20px" }} />
              </article>
              <article className="admin-panel">
                <header className="admin-panel-head">
                  <div><Skeleton className="evi-skeleton-chip" width="126px" height="8px" /><Skeleton width="150px" height="21px" /></div>
                </header>
                <Skeleton className="evi-skeleton" style={{ height: "248px", borderRadius: "20px" }} />
              </article>
            </section>

            <div className="space-y-4">
              <div className="admin-panel-head">
                <Skeleton className="evi-skeleton-chip" width="150px" height="8px" />
              </div>
              <div className="admin-page-kpis admin-page-charts">
                {Array.from({ length: 3 }).map((_, index) => (
                  <article key={`event-card-${index}`} className="admin-panel">
                    <Skeleton className="evi-skeleton" style={{ height: "122px", borderRadius: "16px" }} />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <article className="admin-panel">
              <header className="admin-panel-head">
                <div><Skeleton className="evi-skeleton-chip" width="118px" height="8px" /><Skeleton width="120px" height="24px" /></div>
              </header>
              <Skeleton className="evi-skeleton" style={{ minHeight: "220px", borderRadius: "20px" }} />
            </article>
            <article className="admin-panel">
              <header className="admin-panel-head"><div><Skeleton className="evi-skeleton-chip" width="122px" height="8px" /><Skeleton width="130px" height="24px" /></div></header>
              <Skeleton className="evi-skeleton" style={{ height: "252px", borderRadius: "20px" }} />
            </article>
          </div>
        </div>
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
          value={`${safeDashboard.revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet />}
          active={activeMetric === "revenue"}
          onMouseEnter={() => setActiveMetric("revenue")}
        />

        <StatCard
          title="Acheteurs"
          value={safeDashboard.users}
          icon={<Users />}
          active={activeMetric === "users"}
          onMouseEnter={() => setActiveMetric("users")}
        />

        <StatCard
          title="Check-ins"
          value={safeDashboard.checkins}
          icon={<BadgeCheck />}
          active={activeMetric === "checkins"}
          onMouseEnter={() => setActiveMetric("checkins")}
        />

        <StatCard
          title="Billets vendus"
          value={safeDashboard.tickets}
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
              data={safeDashboard.chart}
            />

            <RevenueChart
              data={safeDashboard.chart}
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
