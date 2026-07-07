import { Link } from "react-router-dom";
import { useState } from "react";
import {  ArrowLeft } from "lucide-react";

import eventImage from "../../assets/organizer/im-land.jpg";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { forgotPassword } from "../../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Merci de renseigner votre adresse email.";
    if (!emailRegex.test(email)) return "Adresse email invalide.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await forgotPassword({ email: email.trim().toLowerCase() });
      setSuccess("Un email de réinitialisation vient de vous être envoyé.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible d'envoyer l'email pour le moment. Réessayez plus tard."
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

            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Mot de passe oublié
            </h1>

            <p className="text-gray-500 mb-10">
              Entrez votre adresse email afin de recevoir un lien ou un code de réinitialisation.
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-green-100 text-green-700 p-3 text-sm" role="status">
                {success}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>

              <div>
                <label htmlFor="email" className="sr-only">Adresse email</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <Button type="submit" disabled={loading} aria-busy={loading}>
                {loading ? "Envoi en cours..." : "Envoyer le code"}
              </Button>

            </form>

            <div className="mt-8">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-orange-500 hover:underline font-medium"
              >
                <ArrowLeft size={18} />
                Retour à la connexion
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;