import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import ChangePasswordForm from "../../components/settings/ChangePasswordForm";
import { getUserId } from "../../services/authSession";
import { getUserDetails, updateOrganizerProfile } from "../../services/userService";

function OrganizerSettings() {
  const [loading, setLoading] = useState(true);
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
    if (!userId) {
      setLoading(false);
      return;
    }

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
        nom: form.nom || undefined,
        prenoms: form.prenoms || undefined,
        telephone: form.telephone || undefined,
        profilOrganisateur: {
          nomEntreprise: form.nomEntreprise || undefined,
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
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 size={18} className="animate-spin" />
        Chargement du profil...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
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
            <Input name="prenoms" placeholder="Prénoms" value={form.prenoms} onChange={handleChange} />
            <Input name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} />
          </div>
          <Input name="telephone" placeholder="Téléphone (+228...)" value={form.telephone} onChange={handleChange} />
          <Input name="nomEntreprise" placeholder="Nom de l'entreprise / organisation" value={form.nomEntreprise} onChange={handleChange} />
          <Input name="description" placeholder="Description de votre activité" value={form.description} onChange={handleChange} />

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
