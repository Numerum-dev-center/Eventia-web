import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import eventImage from "../../assets/organizer/im-land.jpg";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
// import { verifyCode } from "../../services/authService";

function VerifyCode() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!code.trim()) {
      return "Veuillez saisir le code de vérification.";
    }

    if (code.trim().length < 4) {
      return "Le code de vérification est invalide.";
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
      // await verifyCode({
      //   code: code.trim(),
      // });

      navigate("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Le code est incorrect ou expiré."
      );
    } finally {
      setLoading(false);
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

            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Vérification
            </h2>

            <p className="text-gray-500 mb-10">
              Entrez le code de vérification envoyé à votre adresse email.
            </p>

            {error && (
              <div
                className="mb-4 rounded-lg bg-red-100 text-red-700 p-3 text-sm"
                role="alert"
              >
                {error}
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
                  placeholder="Entrez le code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  autoComplete="one-time-code"
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
                className="text-orange-500 font-medium hover:underline"
              >
                Renvoyer le code
              </button>
            </p>

            <p className="mt-4 text-center text-sm">
              <Link
                to="/login"
                className="text-orange-500 hover:underline"
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