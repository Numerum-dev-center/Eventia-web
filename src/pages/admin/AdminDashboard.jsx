import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CircleDollarSign,
  ShieldCheck,
  Ticket,
  UserRoundCheck,
  Users,
  Wallet,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import {
  fetchAdminDashboard,
  fetchAdminReversements,
  fetchAllEventsAdmin,
} from "../../services/eventsApiService";

const money = (value) => `${Number(value || 0).toLocaleString("fr-FR")} FCFA`;
const compactMoney = (value) => new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(Number(value || 0));
const STATUS_LABEL = { PUBLISHED: "Publiés", DRAFT: "Brouillons", TERMINE: "Terminés", CANCELLED: "Annulés" };
const STATUS_COLORS = { PUBLISHED: "#34c759", DRAFT: "#8e8e93", TERMINE: "#af52de", CANCELLED: "#ff453a" };

function ChartTooltip({ active, payload, label, formatter = money }) {
  if (!active || !payload?.length) return null;
  return <div className="admin-chart-tooltip"><span>{label || payload[0]?.name}</span><strong>{formatter(payload[0]?.value)}</strong></div>;
}

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [events, setEvents] = useState([]);
  const [reversements, setReversements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([fetchAdminDashboard(), fetchAllEventsAdmin(), fetchAdminReversements()])
      .then(([dashboardResult, eventsResult, reversementsResult]) => {
        setDashboard(dashboardResult.status === "fulfilled" ? dashboardResult.value : null);
        setEvents(eventsResult.status === "fulfilled" && Array.isArray(eventsResult.value) ? eventsResult.value : []);
        setReversements(reversementsResult.status === "fulfilled" && Array.isArray(reversementsResult.value) ? reversementsResult.value : []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="apple-page admin-command-center">
        <PageHeader
          eyebrow="Centre de pilotage"
          title="Vue d’ensemble"
          subtitle="Suivez la santé de la plateforme, les ventes et l’activité de vos événements en temps réel."
          action={<span className="admin-live-pill"><i /> <Skeleton className="evi-skeleton-chip" width="92px" height="20px" /></span>}
        />
        <section className="admin-kpi-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <article className="db-stat-card" key={`kpi-${index}`}>
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="98px" height="8px" />
                <Skeleton width="78%" height="40px" style={{ marginTop: 16 }} />
                <Skeleton width="102px" height="10px" />
              </div>
              <div className="db-stat-icon">
                <Skeleton className="evi-skeleton-circle" width="24px" height="24px" />
              </div>
            </article>
          ))}
        </section>

        <section className="admin-chart-layout">
          <article className="admin-panel admin-revenue-panel">
            <header className="admin-panel-head">
              <div>
                <Skeleton className="evi-skeleton-chip" width="145px" height="8px" />
                <Skeleton width="200px" height="20px" style={{ marginTop: 8 }} />
              </div>
              <Skeleton className="evi-skeleton-circle" width="22px" height="22px" />
            </header>
            <div className="evi-skeleton evi-skeleton-panel" style={{ height: "310px" }} />
          </article>
          <article className="admin-panel admin-checkin-panel">
            <header className="admin-panel-head">
              <div>
                <Skeleton className="evi-skeleton-chip" width="108px" height="8px" />
                <Skeleton width="175px" height="20px" style={{ marginTop: 8 }} />
              </div>
              <Skeleton className="evi-skeleton-circle" width="21px" height="21px" />
            </header>
            <div className="evi-skeleton evi-skeleton-panel" style={{ width: "190px", height: "190px", borderRadius: "50%", margin: "28px auto 16px" }} />
            <div className="admin-gauge-note">
              <Skeleton width="9px" height="9px" className="evi-skeleton-circle" />
              <div>
                <Skeleton width="150px" height="10px" />
              </div>
            </div>
          </article>
        </section>
      </div>
    );
  }

  const users = Number(dashboard?.utilisateurs || 0);
  const organizers = Number(dashboard?.organisateurs || 0);
  const participants = Math.max(users - organizers, 0);
  const checkinRate = Math.min(100, Math.max(0, Number(dashboard?.tauxCheckIn || 0)));
  const published = Number(dashboard?.evenementsPublies || 0);

  const roleData = [
    { name: "Participants", value: participants, color: "#1d1d1f" },
    { name: "Organisateurs", value: organizers, color: "#ff5a1f" },
  ].filter((item) => item.value > 0);

  const statusData = Object.entries(events.reduce((acc, event) => {
    acc[event.status] = (acc[event.status] || 0) + 1;
    return acc;
  }, {})).map(([status, value]) => ({ name: STATUS_LABEL[status] || status, value, color: STATUS_COLORS[status] || "#64d2ff" }));

  // /admin/reversements-orga renvoie un total par organisateur (profilOrganisateurId),
  // pas par événement : il n'y a pas de champ "titre". On résout le nom de
  // l'organisateur via les événements admin (profilOrganisateur.nomEntreprise).
  const organizerNames = {};
  events.forEach((event) => {
    if (event.organizerId) organizerNames[event.organizerId] = event.organizerName;
  });

  const revenueData = [...reversements]
    .sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0))
    .slice(0, 7)
    .map((item) => {
      const label = organizerNames[item.profilOrganisateurId] || "Organisateur";
      return { name: label.length > 18 ? `${label.slice(0, 18)}…` : label, revenue: Number(item.revenue || 0) };
    });

  const recentEvents = [...events]
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 5);

  return (
    <div className="apple-page admin-command-center">
      <PageHeader
        eyebrow="Centre de pilotage"
        title="Vue d’ensemble"
        subtitle="Suivez la santé de la plateforme, les ventes et l’activité de vos événements en temps réel."
        action={<span className="admin-live-pill"><i /> Données en direct</span>}
      />

      <section className="admin-kpi-grid">
        <StatCard title="Utilisateurs" value={users.toLocaleString("fr-FR")} icon={<Users size={24} />} />
        <StatCard title="Organisateurs" value={organizers.toLocaleString("fr-FR")} icon={<UserRoundCheck size={24} />} />
        <StatCard title="Événements publiés" value={`${published} / ${dashboard?.evenements ?? 0}`} icon={<CalendarCheck size={24} />} />
        <StatCard title="Billets vendus" value={Number(dashboard?.billetsVendus || 0).toLocaleString("fr-FR")} icon={<Ticket size={24} />} />
        <StatCard title="Taux de check-in" value={`${checkinRate}%`} icon={<ShieldCheck size={24} />} />
        <StatCard title="Revenus générés" value={money(dashboard?.revenue)} icon={<Wallet size={24} />} />
      </section>

      <section className="admin-chart-layout">
        <article className="admin-panel admin-revenue-panel">
          <header className="admin-panel-head"><div><span>Performance financière</span><h2>Revenus par organisateur</h2><p>Classement des organisateurs selon les ventes enregistrées.</p></div><CircleDollarSign size={22} /></header>
          {revenueData.length ? (
            <ResponsiveContainer width="100%" height={310}>
              <BarChart data={revenueData} margin={{ top: 18, right: 6, left: -12, bottom: 0 }}>
                <defs><linearGradient id="adminRevenueBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff7138" /><stop offset="100%" stopColor="#ff4f16" /></linearGradient></defs>
                <CartesianGrid stroke="rgba(60,60,67,.08)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: 9, fill: "#8e8e93" }} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={compactMoney} tick={{ fontSize: 9, fill: "#8e8e93" }} />
                <Tooltip cursor={{ fill: "rgba(255,90,31,.04)" }} content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill="url(#adminRevenueBar)" radius={[9, 9, 3, 3]} maxBarSize={42} />
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="admin-chart-empty"><CircleDollarSign size={25} /><strong>Aucun revenu enregistré</strong><span>Les ventes apparaîtront ici automatiquement.</span></div>}
        </article>

        <article className="admin-panel admin-checkin-panel">
          <header className="admin-panel-head"><div><span>Contrôle d’accès</span><h2>Taux de check-in</h2></div><Activity size={21} /></header>
          <div className="admin-gauge" style={{ "--gauge-value": `${checkinRate * 3.6}deg` }}><div><strong>{checkinRate}%</strong><span>billets contrôlés</span></div></div>
          <div className="admin-gauge-note"><i className={checkinRate >= 50 ? "is-good" : ""} /><span><strong>{checkinRate >= 50 ? "Bonne progression" : "Contrôles en cours"}</strong><small>Calculé sur l’ensemble des billets vendus.</small></span></div>
        </article>
      </section>

      <section className="admin-secondary-grid">
        <article className="admin-panel admin-donut-panel">
          <header className="admin-panel-head"><div><span>Communauté</span><h2>Répartition des comptes</h2></div><Users size={21} /></header>
          <div className="admin-donut-content">
            <div className="admin-donut-chart">
              <ResponsiveContainer width="100%" height={205}>
                <PieChart><Pie data={roleData.length ? roleData : [{ name: "Aucune donnée", value: 1, color: "#e5e5ea" }]} dataKey="value" innerRadius={62} outerRadius={84} paddingAngle={3} stroke="none">{(roleData.length ? roleData : [{ color: "#e5e5ea" }]).map((entry) => <Cell key={entry.name || entry.color} fill={entry.color} />)}</Pie><Tooltip content={<ChartTooltip formatter={(value) => Number(value).toLocaleString("fr-FR")} />} /></PieChart>
              </ResponsiveContainer>
              <div><strong>{users}</strong><span>comptes</span></div>
            </div>
            <div className="admin-legend">{roleData.map((item) => <span key={item.name}><i style={{ background: item.color }} /><em>{item.name}</em><strong>{item.value}</strong></span>)}</div>
          </div>
        </article>

        <article className="admin-panel admin-donut-panel">
          <header className="admin-panel-head"><div><span>Catalogue</span><h2>Statut des événements</h2></div><CalendarDays size={21} /></header>
          <div className="admin-donut-content">
            <div className="admin-donut-chart">
              <ResponsiveContainer width="100%" height={205}>
                <PieChart><Pie data={statusData.length ? statusData : [{ name: "Aucune donnée", value: 1, color: "#e5e5ea" }]} dataKey="value" innerRadius={62} outerRadius={84} paddingAngle={3} stroke="none">{(statusData.length ? statusData : [{ color: "#e5e5ea" }]).map((entry) => <Cell key={entry.name || entry.color} fill={entry.color} />)}</Pie><Tooltip content={<ChartTooltip formatter={(value) => Number(value).toLocaleString("fr-FR")} />} /></PieChart>
              </ResponsiveContainer>
              <div><strong>{events.length}</strong><span>événements</span></div>
            </div>
            <div className="admin-legend">{statusData.map((item) => <span key={item.name}><i style={{ background: item.color }} /><em>{item.name}</em><strong>{item.value}</strong></span>)}</div>
          </div>
        </article>

        <article className="admin-panel admin-recent-panel">
          <header className="admin-panel-head"><div><span>Activité récente</span><h2>Derniers événements</h2></div><Link to="/admin/events" aria-label="Voir tous les événements"><ArrowUpRight size={18} /></Link></header>
          <div className="admin-recent-list">
            {recentEvents.length ? recentEvents.map((event) => <div key={event.id}><span>{String(event.title || "E").slice(0, 1).toUpperCase()}</span><div><strong>{event.title}</strong><small>{event.location || "Lieu à confirmer"} · {event.date ? new Date(event.date).toLocaleDateString("fr-FR") : "Date à confirmer"}</small></div><em className={`is-${String(event.status || "draft").toLowerCase()}`}>{STATUS_LABEL[event.status] || event.status}</em></div>) : <div className="admin-chart-empty"><CalendarDays size={22} /><span>Aucun événement récent.</span></div>}
          </div>
        </article>
      </section>
    </div>
  );
}

export default AdminDashboard;
