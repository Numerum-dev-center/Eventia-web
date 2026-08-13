import { useEffect, useState } from "react";
import { BarChart3, CalendarDays, FileText, Loader2, Ticket, TrendingUp, Users, Wallet } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/organizer/StatCard";
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

  if (loading) return <div className="db-loading"><Loader2 size={18} className="animate-spin" /> Préparation des rapports…</div>;

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
