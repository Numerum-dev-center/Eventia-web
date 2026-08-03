import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import eventImage from "../../assets/organizer/im-land.jpg";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { forgotPassword, verifyResetCode } from "../../services/authService";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const validate = () => {
    if (!email) {
      return "Adresse email manquante. Recommencez la procédure.";
    }
    if (!code.trim() || code.trim().length !== 6) {
      return "Le code de vérification doit contenir 6 chiffres.";
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
      await verifyResetCode({ email, code: code.trim() });
      navigate("/reset-password", { state: { email, code: code.trim() } });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Le code est incorrect ou expiré."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setResending(true);
    setResendMessage("");
    try {
      await forgotPassword(email);
      setResendMessage("Un nouveau code vient de vous être envoyé.");
    } catch {
      setResendMessage("Impossible de renvoyer le code pour le moment.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Image */}
        <div className="relative hidden md:flex items-center justify-center overflow-hidden">
          <div className="absolute -right-32 top-0 h-full w-96 bg-white/10 rounded-l-full" />

          <img
            src={eventImage}
            alt="Concert"
            className="w-[90%] rounded-3xl shadow-xl object-cover"
          />
        </div>

        {/* Formulaire */}
        <div className="flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">

            <Link
              to="/forgot-password"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-500 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Retour</span>
            </Link>

            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Vérification
            </h2>

            <p className="text-gray-500 mb-10">
              Entrez le code à 6 chiffres envoyé à{" "}
              {email ? <span className="font-medium text-gray-700">{email}</span> : "votre adresse email"}.
            </p>

            {error && (
              <div
                className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm"
                role="alert"
              >
                {error}
              </div>
            )}

            {resendMessage && (
              <div className="mb-4 rounded-lg bg-blue-50 text-blue-700 p-3 text-sm" role="status">
                {resendMessage}
              </div>
            )}

            <form
              className="space-y-5"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label htmlFor="code" className="sr-only">
                  Code de vérification
                </label>

                <Input
                  id="code"
                  name="code"
                  type="text"
                  placeholder="Code à 6 chiffres"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  autoComplete="one-time-code"
                  icon={ShieldCheck}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading
                  ? "Vérification..."
                  : "Vérifier le code"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Vous n'avez pas reçu le code ?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-blue-500 font-medium hover:underline disabled:opacity-50"
              >
                {resending ? "Envoi..." : "Renvoyer le code"}
              </button>
            </p>

            <p className="mt-4 text-center text-sm">
              <Link
                to="/login"
                className="text-blue-500 hover:underline"
              >
                Retour à la connexion
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default VerifyCode;
