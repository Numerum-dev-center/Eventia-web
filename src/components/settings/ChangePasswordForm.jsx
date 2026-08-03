import { useState } from "react";
import { Lock } from "lucide-react";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { changePassword } from "../../services/userService";

function ChangePasswordForm() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.current || !form.next || !form.confirm) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    if (form.next.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (form.next !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        ancienMotDePasse: form.current,
        nouveauMotDePasse: form.next,
      });
      setSuccess("Mot de passe mis à jour avec succès.");
      setForm({ current: "", next: "", confirm: "" });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Impossible de changer le mot de passe."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h3 className="font-semibold text-gray-800 mb-1">Mot de passe</h3>
      <p className="text-sm text-gray-500 mb-5">
        Choisissez un mot de passe d'au moins 8 caractères.
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 text-red-600 p-3 text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-emerald-50 text-emerald-600 p-3 text-sm">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          type="password"
          name="current"
          placeholder="Mot de passe actuel"
          value={form.current}
          onChange={handleChange}
          autoComplete="current-password"
          icon={Lock}
        />
        <Input
          type="password"
          name="next"
          placeholder="Nouveau mot de passe"
          value={form.next}
          onChange={handleChange}
          autoComplete="new-password"
          icon={Lock}
        />
        <Input
          type="password"
          name="confirm"
          placeholder="Confirmer le nouveau mot de passe"
          value={form.confirm}
          onChange={handleChange}
          autoComplete="new-password"
          icon={Lock}
        />
        <Button type="submit" fullWidth={false} disabled={loading} className="px-6">
          {loading ? "Enregistrement..." : "Mettre à jour le mot de passe"}
        </Button>
      </form>
    </Card>
  );
}

export default ChangePasswordForm;
