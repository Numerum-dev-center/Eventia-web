import { useEffect, useMemo, useState } from "react";
import {
  Wallet,
  BadgePercent,
  HandCoins,
  Loader2,
  Landmark,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import StatCard from "../../components/organizer/StatCard";
import PageHeader from "../../components/ui/PageHeader";
import DataToolbar from "../../components/ui/DataToolbar";
import { fetchAdminCommissions, fetchAdminReversements, fetchAllEventsAdmin } from "../../services/eventsApiService";

function AdminFinances() {
  const [commissions, setCommissions] = useState(null);
  const [reversements, setReversements] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([fetchAdminCommissions(), fetchAdminReversements(), fetchAllEventsAdmin()])
      .then(([commissionsData, reversementsData, eventsData]) => {
        setCommissions(commissionsData);
        setReversements(Array.isArray(reversementsData) ? reversementsData : []);
        setEvents(Array.isArray(eventsData) ? eventsData : []);
      })
      .catch(() => {
        setCommissions(null);
        setReversements([]);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // /admin/reversements-orga renvoie un total par organisateur (profilOrganisateurId),
  // pas par événement : il n'y a pas de champ "titre". On résout le nom de
  // l'organisateur via les événements admin (profilOrganisateur.nomEntreprise).
  const organizerNames = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      if (event.organizerId) map[event.organizerId] = event.organizerName;
    });
    return map;
  }, [events]);

  const nameFor = (r) => organizerNames[r.profilOrganisateurId] || "Organisateur";

  const visibleReversements = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    return query ? reversements.filter((item) => nameFor(item).toLocaleLowerCase("fr").includes(query)) : reversements;
  }, [reversements, search, organizerNames]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement des finances...
      </div>
    );
  }

  const revenue = reversements.reduce((sum, r) => sum + Number(r.revenue ?? 0), 0);
  const commission = reversements.reduce((sum, r) => sum + Number(r.commission ?? 0), 0);
  const netTotal = reversements.reduce((sum, r) => sum + Number(r.net ?? 0), 0);
  const tauxCommission = commissions?.[0]?.taux ? `${Math.round(commissions[0].taux * 100)}%` : "5%";
  const chartData = [...reversements].sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0)).slice(0, 7).map((item) => { const label = nameFor(item); return { name: label.length > 16 ? `${label.slice(0, 16)}…` : label, revenus: Number(item.revenue || 0), net: Number(item.net || 0) }; });
  const splitData = [{ name: "Net organisateurs", value: netTotal, color: "#1d1d1f" }, { name: "Commission Eventia", value: Number(commission), color: "#ff5a1f" }].filter((item) => item.value > 0);

  return (
    <div className="apple-page space-y-6">
      <PageHeader
        eyebrow="Pilotage financier"
        title="Finances"
        subtitle="Revenus, commissions et reversements de la plateforme."
      />
      <p className="text-xs text-gray-400 -mt-4">
        Calculé en temps réel à partir des commandes enregistrées (commission plateforme : {tauxCommission}).
      </p>

      {/* Cartes */}
      <div className="admin-page-kpis">

        <StatCard
          title="Revenus"
          value={`${revenue.toLocaleString("fr-FR")} FCFA`}
          icon={<Wallet />}
        />

        <StatCard
          title="Commissions"
          value={`${commission.toLocaleString("fr-FR")} FCFA`}
          icon={<BadgePercent />}
        />

        <StatCard
          title="Reversements"
          value={`${netTotal.toLocaleString("fr-FR")} FCFA`}
          icon={<HandCoins />}
        />

        <StatCard title="Organisateurs rémunérés" value={reversements.length} icon={<Landmark />} />

      </div>

      {reversements.length > 0 && <section className="admin-finance-charts">
        <article className="admin-panel"><header className="admin-panel-head"><div><span>Performance</span><h2>Revenus par organisateur</h2></div></header><ResponsiveContainer width="100%" height={285}><BarChart data={chartData} margin={{ top:20,right:5,left:-15,bottom:0 }}><CartesianGrid vertical={false} stroke="rgba(60,60,67,.08)" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize:8,fill:"#8e8e93" }} /><YAxis axisLine={false} tickLine={false} tick={{ fontSize:8,fill:"#8e8e93" }} /><Tooltip /><Bar dataKey="revenus" fill="#ff5a1f" radius={[8,8,2,2]} maxBarSize={38} /><Bar dataKey="net" fill="#1d1d1f" radius={[8,8,2,2]} maxBarSize={38} /></BarChart></ResponsiveContainer></article>
        <article className="admin-panel"><header className="admin-panel-head"><div><span>Distribution</span><h2>Commission et reversements</h2></div></header><div className="admin-mini-chart-body"><div className="admin-mini-donut"><ResponsiveContainer width="100%" height={220}><PieChart><Pie data={splitData.length ? splitData : [{ name:"Aucune donnée",value:1,color:"#e5e5ea" }]} dataKey="value" innerRadius={60} outerRadius={86} paddingAngle={3} stroke="none">{(splitData.length ? splitData : [{ name:"vide",color:"#e5e5ea" }]).map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><strong>{tauxCommission}</strong></div><div className="admin-legend">{splitData.map((item) => <span key={item.name}><i style={{ background:item.color }} /><em>{item.name}</em><strong>{item.value.toLocaleString("fr-FR")}</strong></span>)}</div></div></article>
      </section>}

      {reversements.length > 0 && (
        <><DataToolbar value={search} onChange={setSearch} placeholder="Rechercher un organisateur…" countLabel={`${visibleReversements.length} reversement${visibleReversements.length > 1 ? "s" : ""}`} /><div className="apple-table-card">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Organisateur</th>
                <th className="px-6 py-4 text-right">Revenus</th>
                <th className="px-6 py-4 text-right">Commission</th>
                <th className="px-6 py-4 text-right">Net à reverser</th>
              </tr>
            </thead>
            <tbody>
              {visibleReversements.map((r, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{nameFor(r)}</td>
                  <td className="px-6 py-4 text-right">
                    {(r.revenue ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 text-right">
                    {(r.commission ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {(r.net ?? 0).toLocaleString("fr-FR")} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></>
      )}
    </div>
  );
}

export default AdminFinances;
