import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Ban,
  Loader2,
  Trash2,
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import {
  getUserById,
  deleteUser,
  activateUser,
  deactivateUser,
  suspendUser,
  updateUserStatus
} from "../../services/adminService"; 

const UsersDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Loading states séparés pour chaque action (évite de bloquer toute la page)
  const [actionLoading, setActionLoading] = useState(null); // "activate" | "deactivate" | "suspend" | "delete" | null

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserById(id);
      setUser(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement de l'utilisateur :", err);
      setError(
        err?.response?.data?.message ||
          "Impossible de charger les informations de l'utilisateur."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const controller = new AbortController();

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserById(id, { signal: controller.signal });
      setUser(response.data);
    } catch (err) {
      if (err.name !== "CanceledError" && err.name !== "AbortError") {
        console.error("Erreur lors du chargement de l'utilisateur :", err);
        setError(
          err?.response?.data?.message ||
            "Impossible de charger les informations de l'utilisateur."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  load();

  return () => controller.abort();
}, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      setActionLoading(newStatus);
      await updateUserStatus(id, newStatus);
      // On resynchronise avec le backend plutôt que de deviner l'état localement
      await fetchUser();
    } catch (err) {
      console.error(`Erreur lors du changement de statut (${newStatus}) :`, err);
      alert(
        err?.response?.data?.message ||
          "Une erreur est survenue lors de la mise à jour du statut."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible."
    );
    if (!confirmed) return;

    try {
      setActionLoading("delete");
      await deleteUser(id);
      navigate("/administrator/users");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert(
        err?.response?.data?.message ||
          "Une erreur est survenue lors de la suppression de l'utilisateur."
      );
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center gap-2 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement des informations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchUser}
          className="text-sm font-medium text-orange-600 hover:underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!user) {
    return <div className="p-6">Utilisateur introuvable.</div>;
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || "Utilisateur";

  const isActive = user.status === "active";
  const isSuspended = user.status === "suspended";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Détails de l'utilisateur"
        description="Consultez et gérez les informations de cet utilisateur."
      />

      {/* BOUTON RETOUR */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600"
      >
        <ArrowLeft size={18} />
        Retour aux utilisateurs
      </button>

      {/* INFORMATIONS PRINCIPALES */}
      <div className="apple-table-card p-6">
        <div className="flex items-center gap-5 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User size={30} className="text-gray-500" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <InfoItem icon={<User size={18} />} label="Nom complet" value={fullName} />
          <InfoItem
            icon={<Mail size={18} />}
            label="Adresse email"
            value={user.email || "Non renseigné"}
          />
          <InfoItem
            icon={<Phone size={18} />}
            label="Téléphone"
            value={user.phoneNumber || "Non renseigné"}
          />
          <InfoItem
            icon={<ShieldCheck size={18} />}
            label="Rôle"
            value={user.role || "Non renseigné"}
          />
        </div>
      </div>

      {/* INFORMATIONS ORGANISATEUR */}
      {user.organizerProfile && (
        <div className="apple-table-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Building2 size={22} className="text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Profil organisateur</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem
              icon={<Building2 size={18} />}
              label="Nom de l'entreprise"
              value={user.organizerProfile.societyName || "Non renseigné"}
            />
            <InfoItem
              icon={<FileText size={18} />}
              label="Description"
              value={user.organizerProfile.description || "Non renseignée"}
            />
          </div>
        </div>
      )}

      {/* ACTIONS ADMIN */}
      <div className="apple-table-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">
          Actions administrateur
        </h2>

        <div className="flex flex-wrap gap-4">
          {!isActive && (
            <ActionButton
              onClick={() => handleStatusChange("active")}
              loading={actionLoading === "active"}
              icon={<CheckCircle size={18} />}
              label="Activer le compte"
              className="bg-green-500 text-white hover:bg-green-600"
            />
          )}

          {isActive && (
            <ActionButton
              onClick={() => handleStatusChange("inactive")}
              loading={actionLoading === "inactive"}
              icon={<XCircle size={18} />}
              label="Désactiver le compte"
              className="bg-gray-700 text-white hover:bg-gray-800"
            />
          )}

          {!isSuspended && (
            <ActionButton
              onClick={() => handleStatusChange("suspended")}
              loading={actionLoading === "suspended"}
              icon={<Ban size={18} />}
              label="Suspendre"
              className="bg-red-500 text-white hover:bg-red-600"
            />
          )}

          {isSuspended && (
            <ActionButton
              onClick={() => handleStatusChange("active")}
              loading={actionLoading === "active"}
              icon={<CheckCircle size={18} />}
              label="Lever la suspension"
              className="bg-green-500 text-white hover:bg-green-600"
            />
          )}

          <ActionButton
            onClick={handleDelete}
            loading={actionLoading === "delete"}
            icon={<Trash2 size={18} />}
            label="Supprimer l'utilisateur"
            className="bg-white border border-red-500 text-red-600 hover:bg-red-50"
          />
        </div>
      </div>
    </div>
  );
};

/* BOUTON D'ACTION AVEC ÉTAT DE CHARGEMENT */
const ActionButton = ({ onClick, loading, icon, label, className }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
  >
    {loading ? <Loader2 size={18} className="animate-spin" /> : icon}
    {label}
  </button>
);

/* COMPOSANT POUR AFFICHER UNE INFORMATION */
const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-gray-400">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="font-medium text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

export default UsersDetails;