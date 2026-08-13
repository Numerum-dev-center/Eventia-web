import { useEffect, useMemo, useState } from "react";
import { CircleCheck, Loader2, ShieldCheck, Trash2, UserRoundCheck, Users as UsersIcon } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
import DataToolbar from "../../components/ui/DataToolbar";
import StatCard from "../../components/organizer/StatCard";
import { deleteUser, getUsers } from "../../services/adminService";

const ROLE_TONE = {
  Admin: "danger",
  Organisateur: "neutral",
  Client: "muted",
};

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  const visibleUsers = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("fr");
    if (!query) return users;
    return users.filter((user) => [[user.prenoms, user.nom].filter(Boolean).join(" "), user.email, user.role, user.estActif ? "actif" : "inactif"].some((value) => String(value || "").toLocaleLowerCase("fr").includes(query)));
  }, [users, search]);

  useEffect(() => {
    getUsers()
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
        <StatCard title="Tous les comptes" value={users.length} icon={<UsersIcon size={22} />} />
        <StatCard title="Comptes actifs" value={activeUsers} icon={<CircleCheck size={22} />} />
        <StatCard title="Organisateurs" value={users.filter((user) => user.role === "Organisateur").length} icon={<UserRoundCheck size={22} />} />
        <StatCard title="Administrateurs" value={users.filter((user) => user.role === "Admin").length} icon={<ShieldCheck size={22} />} />
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
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500">
            <Loader2 size={18} className="animate-spin" />
            Chargement des utilisateurs...
          </div>
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
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={deletingId === user.id}
                        className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        {deletingId === user.id ? "Suppression..." : "Supprimer"}
                      </button>
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
