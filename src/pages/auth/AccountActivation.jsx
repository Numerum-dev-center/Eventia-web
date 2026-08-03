import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ShieldAlert } from "lucide-react";

import api from "../../services/api/axios";
import { setStoredAuth } from "../../services/authSession";

function AccountActivation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    async function activateAccount() {
      const accessToken = searchParams.get("accessToken");
      const token = searchParams.get("token");

      try {
        // Flux Google : les tokens arrivent directement dans l'URL de redirection
        if (accessToken) {
          setStoredAuth({ token: accessToken, user: {} });
          navigate("/organizer/dashboard", { replace: true });
          return;
        }

        // Flux email : token d'activation à échanger
        if (token) {
          const response = await api.get(`/auth/activate?token=${token}`);
          setStoredAuth({
            token: response.data.accessToken,
            user: response.data.user || {},
          });
          navigate("/organizer/dashboard", { replace: true });
          return;
        }

        setError("Lien d'activation invalide ou incomplet.");
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Ce lien d'activation est invalide ou a expiré."
        );
      }
    }

    activateAccount();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-lg p-10 text-center">
        {error ? (
          <>
            <ShieldAlert size={56} className="mx-auto text-red-500 mb-6" />
            <h1 className="text-2xl font-bold mb-3">Activation impossible</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link
              to="/login"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
            >
              Retour à la connexion
            </Link>
          </>
        ) : (
          <>
            <Loader2 size={56} className="mx-auto text-blue-500 mb-6 animate-spin" />
            <h1 className="text-2xl font-bold mb-3">Activation en cours</h1>
            <p className="text-gray-600">Nous activons votre compte, un instant...</p>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountActivation;
