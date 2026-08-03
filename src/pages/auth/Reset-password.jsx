import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

import eventImage from "../../assets/organizer/im-land.jpg";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { resetPassword } from "../../services/authService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!email || !code) {
      return "Session expirée. Recommencez la procédure de réinitialisation.";
    }
    if (!password || password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères.";
    }
    if (password !== confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await resetPassword({
        email,
        code,
        nouveauMotDePasse: password,
        confirmerMotDePasse: confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de réinitialiser le mot de passe. Réessayez."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
          <div className="absolute -right-32 top-0 h-full w-96 bg-white/10 rounded-l-full" />
          <img
            src={eventImage}
            alt="Concert"
            className="w-[90%] rounded-3xl shadow-xl object-cover"
          />
        </div>

        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <Link
              to="/verify-code"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-500 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Retour</span>
            </Link>

            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Nouveau mot de passe
            </h2>

            <p className="text-gray-500 mb-10">
              Choisissez un nouveau mot de passe pour votre compte.
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-green-100 text-green-700 p-3 text-sm" role="status">
                Mot de passe réinitialisé. Redirection vers la connexion...
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="password" className="sr-only">Nouveau mot de passe</label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Nouveau mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  icon={Lock}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  icon={Lock}
                />
              </div>

              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm">
              <Link to="/login" className="text-blue-500 hover:underline">
                Retour à la connexion
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ResetPassword;
