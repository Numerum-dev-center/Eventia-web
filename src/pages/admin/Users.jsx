import { useEffect, useState } from "react";
import { Loader2, Trash2, Users as UsersIcon } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import EmptyState from "../../components/ui/EmptyState";
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

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger la liste des utilisateurs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des utilisateurs"
        subtitle="Administrateurs, organisateurs et clients de la plateforme."
      />

      {error && (
        <div className="rounded-xl bg-red-50 text-red-700 p-3 text-sm">{error}</div>
      )}

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
        ) : (
          <div className="overflow-x-auto">
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
                {users.map((user) => (
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
