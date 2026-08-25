import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ChangePasswordForm from "../../components/settings/ChangePasswordForm";
import { getUserId } from "../../services/authSession";
import { getUserDetails, updateOrganizerProfile } from "../../services/userService";
import Skeleton from "../../components/ui/Skeleton";

function OrganizerSettings() {
  const [loading, setLoading] = useState(() => Boolean(getUserId()));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nom: "",
    prenoms: "",
    telephone: "",
    nomEntreprise: "",
    description: "",
  });

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    getUserDetails(userId)
      .then((user) => {
        setForm({
          nom: user.nom || "",
          prenoms: user.prenoms || "",
          telephone: user.telephone || "",
          nomEntreprise: user.profilOrganisateur?.nomEntreprise || "",
          description: user.profilOrganisateur?.description || "",
        });
      })
      .catch(() => setError("Impossible de charger votre profil."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload = {
        firstName: form.nom || undefined,
        lastName: form.lastName || undefined,
        phoneNumber: form.telephone || undefined,
        organizerProfile: {
          societyName: form.nomEntreprise || undefined,
          description: form.description || undefined,
        },
      };
      await updateOrganizerProfile(payload);
      setSuccess("Profil mis à jour avec succès.");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Impossible de mettre à jour le profil."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="apple-page apple-settings-page space-y-6 max-w-xl">
        <PageHeader
          title="Paramètres"
          subtitle="Chargement du profil organisateur."
        />

        <Card>
          <div className="space-y-5">
            <Skeleton className="evi-skeleton-chip" width="120px" height="12px" />
            <Skeleton className="evi-skeleton-chip" width="94px" height="8px" />

            <div className="grid grid-cols-2 gap-4">
              <Skeleton width="100%" height="50px" />
              <Skeleton width="100%" height="50px" />
            </div>

            <Skeleton width="100%" height="50px" />
            <Skeleton width="100%" height="50px" />
            <Skeleton width="100%" height="50px" />

            <div className="flex justify-end">
              <Skeleton className="evi-skeleton-chip" width="132px" height="44px" />
            </div>
          </div>
        </Card>

        <Card>
          <Skeleton className="evi-skeleton-chip" width="130px" height="12px" />
          <div className="space-y-4 mt-4">
            <Skeleton width="100%" height="44px" />
            <Skeleton width="100%" height="44px" />
            <Skeleton width="100%" height="44px" />
            <Skeleton width="44%" height="44px" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="apple-page apple-settings-page space-y-6 max-w-xl">
      <PageHeader
        title="Paramètres"
        subtitle="Gérez votre profil organisateur et la sécurité de votre compte."
      />

      <Card>
        <h3 className="font-semibold text-gray-800 mb-1">Profil</h3>
        <p className="text-sm text-gray-500 mb-5">
          Ces informations sont visibles par vos participants.
        </p>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 p-3 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-600 p-3 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input name="prenoms" label="Prénoms" placeholder="Prénoms" value={form.prenoms} onChange={handleChange} />
            <Input name="nom" label="Nom" placeholder="Nom" value={form.nom} onChange={handleChange} />
          </div>
          <Input name="telephone" label="Téléphone" placeholder="Téléphone (+228...)" value={form.telephone} onChange={handleChange} />
          <Input name="nomEntreprise" label="Organisation" placeholder="Nom de l'entreprise / organisation" value={form.nomEntreprise} onChange={handleChange} />
          <Input name="description" label="Présentation" placeholder="Description de votre activité" value={form.description} onChange={handleChange} />

          <Button type="submit" fullWidth={false} disabled={saving} className="px-6">
            {saving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </Card>

      <ChangePasswordForm />
    </div>
  );
}

export default OrganizerSettings;
