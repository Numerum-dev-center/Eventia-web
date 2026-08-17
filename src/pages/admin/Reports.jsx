import { useEffect, useState } from "react";
import { BarChart3, CalendarDays, FileText, Ticket, TrendingUp, Users, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import { fetchAdminReports } from "../../services/eventsApiService";

const REPORTS = [
  { icon: TrendingUp, label: "Rapport des ventes", description: "Billets vendus et taux de contrôle." },
  { icon: FileText, label: "Rapport financier", description: "Revenus et commissions de la plateforme." },
  { icon: Users, label: "Rapport des utilisateurs", description: "Comptes et profils organisateurs." },
  { icon: BarChart3, label: "Rapport des événements", description: "Catalogue global et publications." },
];

function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminReports().then(setReport).catch(() => setReport(null)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="apple-page space-y-6">
        <PageHeader
          eyebrow="Analyse consolidée"
          title="Rapports"
          subtitle="Préchargement des indicateurs globaux en cours."
          action={<span className="admin-live-pill"><i /> Synthèse</span>}
        />

        <div className="admin-page-kpis">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`report-kpi-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="100px" height="8px" />
                <Skeleton width="85%" height="46px" style={{ marginTop: 14 }} />
                <Skeleton width="82px" height="10px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="24px" height="24px" />
            </div>
          ))}
        </div>

        <section className="admin-report-charts">
          <article className="admin-panel">
            <header className="admin-panel-head">
              <div>
                <Skeleton className="evi-skeleton-chip" width="130px" height="8px" />
                <Skeleton width="195px" height="20px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="21px" height="21px" />
            </header>
            <div className="evi-skeleton" style={{ height: "285px" }} />
          </article>
          <article className="admin-panel admin-checkin-panel">
            <header className="admin-panel-head">
              <div>
                <Skeleton className="evi-skeleton-chip" width="92px" height="8px" />
                <Skeleton width="180px" height="20px" />
              </div>
            </header>
            <Skeleton className="admin-gauge" width="190px" height="190px" />
            <p className="admin-report-note"><Skeleton width="100%" height="13px" /></p>
          </article>
        </section>

        <section className="apple-report-grid">
          {Array.from({ length: REPORTS.length }).map((_, index) => (
            <article key={`report-card-${index}`} className="apple-report-card">
              <Skeleton className="evi-skeleton-card" style={{ width: "43px", height: "43px" }} />
              <div>
                <Skeleton width="63%" height="15px" style={{ marginTop: 10 }} />
                <Skeleton width="95%" height="11px" style={{ marginTop: 8 }} />
              </div>
              <Skeleton width="58px" height="9px" style={{ marginTop: 18 }} />
            </article>
          ))}
        </section>
      </div>
    );
  }

  const activityData = [
    { name: "Utilisateurs", value: Number(report?.utilisateurs || 0), color: "#1d1d1f" },
    { name: "Organisateurs", value: Number(report?.organisateurs || 0), color: "#ff5a1f" },
    { name: "Événements", value: Number(report?.evenements || 0), color: "#64d2ff" },
    { name: "Billets", value: Number(report?.billetsVendus || 0), color: "#34c759" },
  ];
  const checkinRate = Number(report?.tauxCheckIn || 0);

  return (
    <div className="apple-page space-y-6">
      <PageHeader eyebrow="Analyse consolidée" title="Rapports" subtitle="Une lecture synthétique de l’activité globale d’Eventia, calculée à partir des données enregistrées." action={<span className="admin-live-pill"><i /> Toutes périodes</span>} />

      <div className="admin-page-kpis">
        <StatCard title="Utilisateurs" value={Number(report?.utilisateurs || 0).toLocaleString("fr-FR")} icon={<Users size={22} />} />
        <StatCard title="Événements" value={Number(report?.evenements || 0).toLocaleString("fr-FR")} icon={<CalendarDays size={22} />} />
        <StatCard title="Billets vendus" value={Number(report?.billetsVendus || 0).toLocaleString("fr-FR")} icon={<Ticket size={22} />} />
        <StatCard title="Revenus" value={`${Number(report?.revenue || 0).toLocaleString("fr-FR")} FCFA`} icon={<Wallet size={22} />} />
      </div>

      <section className="admin-report-charts">
        <article className="admin-panel"><header className="admin-panel-head"><div><span>Vue comparative</span><h2>Volumes de la plateforme</h2></div><BarChart3 size={21} /></header><ResponsiveContainer width="100%" height={285}><BarChart data={activityData} margin={{ top:18,right:4,left:-20,bottom:0 }}><CartesianGrid vertical={false} stroke="rgba(60,60,67,.08)" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize:9,fill:"#8e8e93" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize:9,fill:"#8e8e93" }} /><Tooltip /><Bar dataKey="value" radius={[9,9,2,2]} maxBarSize={52}>{activityData.map((item) => <Cell key={item.name} fill={item.color} />)}</Bar></BarChart></ResponsiveContainer></article>
        <article className="admin-panel admin-checkin-panel"><header className="admin-panel-head"><div><span>Présence</span><h2>Billets contrôlés</h2></div><Ticket size={21} /></header><div className="admin-gauge" style={{ "--gauge-value": `${Math.min(100,Math.max(0,checkinRate)) * 3.6}deg` }}><div><strong>{checkinRate}%</strong><span>taux de check-in</span></div></div><p className="admin-report-note">Ce taux compare les billets scannés à l’ensemble des billets vendus.</p></article>
      </section>

      <section className="apple-report-grid">
        {REPORTS.map(({ icon: Icon, label, description }) => <article key={label} className="apple-report-card"><span><Icon size={21} /></span><div><h2>{label}</h2><p>{description}</p></div><em>Données disponibles dans la synthèse</em></article>)}
      </section>
    </div>
  );
}

export default Reports;
