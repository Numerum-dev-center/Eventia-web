import { useEffect, useMemo, useState } from "react";
import { Eye, CircleCheck, ShieldCheck, Trash2, UserRoundCheck, Users as UsersIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import DataToolbar from "../../components/ui/DataToolbar";
import StatCard from "../../components/organizer/StatCard";
import Skeleton from "../../components/ui/Skeleton";
import { deleteUser, getAllUsers } from "../../services/adminService";

import { useNavigate } from "react-router-dom";

const ROLE_TONE = {
  Admin: "danger",
  Organizer: "neutral",
  Client: "muted",
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return users;
    return users.filter((user) => [[user.prenoms, user.nom].filter(Boolean).join(" "), user.email, user.role, user.estActif ? "actif" : "inactif"].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [users, search]);

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((err) => setError(err?.response?.data?.message || "Impossible de charger la liste des utilisateurs."))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer définitivement cet utilisateur ?")) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(
        err?.response?.data?.message || "Impossible de supprimer cet utilisateur."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const roleColors = { Admin: "#ff453a", Organisateur: "#ff5a1f", Client: "#1d1d1f" };
  const roleChart = Object.entries(users.reduce((acc, user) => ({ ...acc, [user.role || "Autre"]: (acc[user.role || "Autre"] || 0) + 1 }), {})).map(([name, value]) => ({ name, value, color: roleColors[name] || "#64d2ff" }));
  const activeUsers = users.filter((user) => user.estActif).length;

  return (
    <div className="apple-page space-y-6">
      <PageHeader
        eyebrow="Communauté Eventia"
        title="Gestion des utilisateurs"
        subtitle="Administrateurs, organisateurs et clients de la plateforme."
      />

      <div className="admin-page-kpis">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <article key={`user-kpi-${index}`} className="db-stat-card">
              <div className="db-stat-copy">
                <Skeleton className="evi-skeleton-chip" width="110px" height="8px" />
                <Skeleton width="72%" height="44px" style={{ marginTop: 16 }} />
                <Skeleton width="92px" height="10px" />
              </div>
              <Skeleton className="evi-skeleton-circle" width="24px" height="24px" />
            </article>
          ))
        ) : (
          <>
  <StatCard
    title="Tous les comptes"
    value={users.length}
    icon={<UsersIcon size={22} />}
  />

  <StatCard
    title="Comptes actifs"
    value={activeUsers}
    icon={<CircleCheck size={22} />}
  />

  <StatCard
    title="Organisateurs"
    value={
      users.filter(
        (user) => user.role === "Organizer"
      ).length
    }
    icon={<UserRoundCheck size={22} />}
  />

  <StatCard
    title="Administrateurs"
    value={
      users.filter(
        (user) => user.role === "Admin"
      ).length
    }
    icon={<ShieldCheck size={22} />}
  />
</>
        )}
      </div>

      {users.length > 0 && <section className="admin-page-charts admin-user-insights">
        <article className="admin-panel"><header className="admin-panel-head"><div><span>Répartition</span><h2>Comptes par rôle</h2></div></header><div className="admin-mini-chart-body"><div className="admin-mini-donut"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={roleChart} dataKey="value" innerRadius={57} outerRadius={82} paddingAngle={3} stroke="none">{roleChart.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><strong>{users.length}</strong></div><div className="admin-legend">{roleChart.map((item) => <span key={item.name}><i style={{ background:item.color }} /><em>{item.name}</em><strong>{item.value}</strong></span>)}</div></div></article>
        <article className="admin-panel admin-activation-card"><header className="admin-panel-head"><div><span>Activation</span><h2>Santé des comptes</h2></div></header><div className="admin-activation-meter"><div style={{ "--activation": `${users.length ? (activeUsers / users.length) * 100 : 0}%` }}><strong>{users.length ? Math.round((activeUsers / users.length) * 100) : 0}%</strong><span>comptes actifs</span></div></div><p>{activeUsers} comptes actifs sur {users.length}. Les comptes inactifs restent visibles dans le tableau.</p></article>
      </section>}

      {error && (
        <div className="apple-alert">{error}</div>
      )}

      {!loading && users.length > 0 && <DataToolbar value={search} onChange={setSearch} placeholder="Rechercher un utilisateur…" countLabel={`${visibleUsers.length} utilisateur${visibleUsers.length > 1 ? "s" : ""}`} />}

      <Card padding="p-0">
        {loading ? (
          <>
            <div className="evi-skeleton-toolbar" style={{ margin: "14px", height: "52px" }} />
            <div className="apple-table-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                    <th className="px-6 py-3 font-semibold"><Skeleton className="evi-skeleton-chip" width="84px" height="12px" /></th>
                    <th className="px-6 py-3 font-semibold"><Skeleton className="evi-skeleton-chip" width="50px" height="12px" /></th>
                    <th className="px-6 py-3 font-semibold"><Skeleton className="evi-skeleton-chip" width="41px" height="12px" /></th>
                    <th className="px-6 py-3 font-semibold"><Skeleton className="evi-skeleton-chip" width="54px" height="12px" /></th>
                    <th className="px-6 py-3 font-semibold text-right"><Skeleton className="evi-skeleton-chip" width="63px" height="12px" /></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <tr key={`user-row-${index}`} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                      <td className="px-6 py-4"><Skeleton width="70%" height="12px" /></td>
                      <td className="px-6 py-4"><Skeleton width="86%" height="12px" /></td>
                      <td className="px-6 py-4"><Skeleton width="64px" height="24px" /></td>
                      <td className="px-6 py-4"><Skeleton width="56px" height="24px" /></td>
                      <td className="px-6 py-4 text-right"><Skeleton className="evi-skeleton-chip" width="86px" height="28px" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : users.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={UsersIcon}
              title="Aucun utilisateur"
              description="Aucun compte n'a encore été créé sur la plateforme."
            />
          </div>
        ) : visibleUsers.length === 0 ? (
          <div className="p-6"><EmptyState icon={UsersIcon} title="Aucun résultat" description="Aucun utilisateur ne correspond à cette recherche." /></div>
        ) : (
          <div className="apple-table-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-3 font-semibold">Utilisateur</th>
                  <th className="px-6 py-3 font-semibold">Email</th>
                  <th className="px-6 py-3 font-semibold">Rôle</th>
                  <th className="px-6 py-3 font-semibold">Statut</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                    
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {[user.prenoms, user.nom].filter(Boolean).join(" ") || "—"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge tone={ROLE_TONE[user.role] || "neutral"}>{user.role}</Badge>
                      
                    </td>


                    <td className="px-6 py-4">
                      <Badge tone={user.estActif ? "ok" : "warn"}>
                        {user.estActif ? "Actif" : "Inactif"}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-right">
                     
                     {/* VOIR DETAILS */}
                     <button
                     onClick={() => navigate(`/admin/users/${user.id}`)}
                     className="inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-600 text-sm font-medium">
                      
                      <Eye size={16} />
                      Voir
                      </button>


                      {/* SUPPRIMER */}
                      
                      


                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default UsersPage;
