import { CalendarCheck, CalendarDays, Check, FilePenLine, History, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import EmptyState from "../../components/ui/EmptyState";
import Badge from "../../components/ui/Badge";
import DataToolbar from "../../components/ui/DataToolbar";
import StatCard from "../../components/organizer/StatCard";
import { fetchAllEventsAdmin, setEventStatusAdmin } from "../../services/eventsApiService";
import Skeleton from "../../components/ui/Skeleton";

const STATUS_TONE = {
  PUBLISHED: "ok",
  TERMINE: "neutral",
  DRAFT: "muted",
  CANCELLED: "danger",
};

const STATUS_LABEL = {
  PUBLISHED: "Validé",
  TERMINE: "Terminé",
  DRAFT: "Brouillon",
  CANCELLED: "Rejeté",
};

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");

  const visibleEvents = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return events;
    return events.filter((event) => [event.title, event.category, event.location, STATUS_LABEL[event.status], event.status].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [events, search]);

  useEffect(() => {
    fetchAllEventsAdmin()
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const setStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await setEventStatusAdmin(id, status);
      const data = await fetchAllEventsAdmin();
      setEvents(Array.isArray(data) ? data : []);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusChart = Object.entries(events.reduce((acc, event) => ({ ...acc, [event.status]: (acc[event.status] || 0) + 1 }), {})).map(([status, value]) => ({ name: STATUS_LABEL[status] || status, value, color: { PUBLISHED: "#34c759", TERMINE: "#af52de", DRAFT: "#8e8e93", CANCELLED: "#ff453a" }[status] || "#64d2ff" }));
  const categoryChart = Object.entries(events.reduce((acc, event) => ({ ...acc, [event.category || "Autre"]: (acc[event.category || "Autre"] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1]).slice(0, 5);

  if (loading) {
    return (
      <div className="apple-page space-y-6">
        <PageHeader
          eyebrow="Supervision du catalogue"
          title="Gestion des événements"
          subtitle="Modération et supervision des événements de la plateforme."
        />
        <div className="admin-page-kpis">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={`stat-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="86px" height="8px" />
                <Skeleton width="60%" height="44px" style={{ marginTop: 14 }} />
                <Skeleton width="92px" height="10px" />
              </div>
              <div className="db-stat-icon">
                <Skeleton className="evi-skeleton-circle" width="24px" height="24px" />
              </div>
            </article>
          ))}
        </div>
        <section className="admin-page-charts">
          <article className="admin-panel admin-mini-chart">
            <header className="admin-panel-head"><div><Skeleton className="evi-skeleton-chip" width="112px" height="8px" /><Skeleton width="190px" height="20px" /></div></header>
            <div className="admin-mini-chart-body">
              <div className="admin-mini-donut">
                <div className="evi-skeleton evi-skeleton-panel" style={{ width: "160px", height: "160px", borderRadius: "999px", margin: "auto" }} />
              </div>
              <div className="admin-legend">
                {Array.from({ length: 3 }).map((_, index) => (
                  <span key={`legend-${index}`}>
                    <Skeleton className="evi-skeleton-circle" width="7px" height="7px" />
                    <Skeleton width="60px" height="10px" />
                    <Skeleton width="18px" height="10px" />
                  </span>
                ))}
              </div>
            </div>
          </article>
          <article className="admin-panel">
            <header className="admin-panel-head"><div><Skeleton className="evi-skeleton-chip" width="132px" height="8px" /><Skeleton width="150px" height="20px" /></div></header>
            <div className="admin-category-bars">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={`cat-${index}`}>
                  <span><Skeleton width="80px" height="8px" /><Skeleton width="22px" height="10px" /></span>
                  <Skeleton className="evi-skeleton" height="8px" />
                </div>
              ))}
            </div>
          </article>
        </section>
        <div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="90px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="74px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="42px" height="12px" /></th>
                <th className="px-6 py-4 text-left"><Skeleton className="evi-skeleton-chip" width="46px" height="12px" /></th>
                <th className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="53px" height="12px" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={`row-${index}`} className="border-b">
                  <td className="px-6 py-4"><Skeleton width="62%" height="12px" /></td>
                  <td className="px-6 py-4"><Skeleton width="42%" height="12px" /></td>
                  <td className="px-6 py-4"><Skeleton width="74px" height="12px" /></td>
                  <td className="px-6 py-4"><Skeleton width="86px" height="20px" /></td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Skeleton className="evi-skeleton-chip" width="74px" height="28px" />
                      <Skeleton className="evi-skeleton-chip" width="78px" height="28px" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="apple-page space-y-6">
      <PageHeader
        eyebrow="Supervision du catalogue"
        title="Gestion des événements"
        subtitle="Modération et supervision des événements de la plateforme."
      />

      <div className="admin-page-kpis">
        <StatCard title="Total" value={events.length} icon={<CalendarDays size={22} />} />
        <StatCard title="Publiés" value={events.filter((event) => event.status === "PUBLISHED").length} icon={<CalendarCheck size={22} />} />
        <StatCard title="Terminés" value={events.filter((event) => event.status === "TERMINE").length} icon={<History size={22} />} />
        <StatCard title="Brouillons" value={events.filter((event) => event.status === "DRAFT").length} icon={<FilePenLine size={22} />} />
      </div>

      {events.length > 0 && <section className="admin-page-charts">
        <article className="admin-panel admin-mini-chart"><header className="admin-panel-head"><div><span>Modération</span><h2>Répartition par statut</h2></div></header><div className="admin-mini-chart-body"><div className="admin-mini-donut"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={statusChart} dataKey="value" innerRadius={57} outerRadius={82} paddingAngle={3} stroke="none">{statusChart.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><strong>{events.length}</strong></div><div className="admin-legend">{statusChart.map((item) => <span key={item.name}><i style={{ background:item.color }} /><em>{item.name}</em><strong>{item.value}</strong></span>)}</div></div></article>
        <article className="admin-panel"><header className="admin-panel-head"><div><span>Catalogue</span><h2>Catégories principales</h2></div></header><div className="admin-category-bars">{categoryChart.map(([name, value]) => <div key={name}><span><em>{name}</em><strong>{value}</strong></span><i><b style={{ width:`${Math.max(8,(value / Math.max(...categoryChart.map(([, count]) => count))) * 100)}%` }} /></i></div>)}</div></article>
      </section>}

      {events.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="Aucun événement"
          description="Les événements créés par les organisateurs apparaîtront ici."
        />
      ) : (
        <>
        <DataToolbar value={search} onChange={setSearch} placeholder="Rechercher dans les événements…" countLabel={`${visibleEvents.length} événement${visibleEvents.length > 1 ? "s" : ""}`} />
        {visibleEvents.length === 0 ? <EmptyState icon={CalendarDays} title="Aucun résultat" description="Aucun événement ne correspond à cette recherche." /> : <div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Événement</th>
                <th className="px-6 py-4 text-left">Catégorie</th>
                <th className="px-6 py-4 text-left">Lieu</th>
                <th className="px-6 py-4 text-left">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleEvents.map((event) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{event.title}</td>
                  <td className="px-6 py-4">{event.category}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">
                    <Badge tone={STATUS_TONE[event.status] || "muted"}>
                      {STATUS_LABEL[event.status] || event.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      {event.status !== "PUBLISHED" && (
                        <button
                          disabled={updatingId === event.id}
                          onClick={() => setStatus(event.id, "PUBLISHED")}
                          className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium disabled:opacity-50"
                        >
                          <Check size={15} />
                          Valider
                        </button>
                      )}
                      {event.status !== "CANCELLED" && (
                        <button
                          disabled={updatingId === event.id}
                          onClick={() => setStatus(event.id, "CANCELLED")}
                          className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
                        >
                          <X size={15} />
                          Rejeter
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
        </>
      )}
    </div>
  );
}

export default Events;
