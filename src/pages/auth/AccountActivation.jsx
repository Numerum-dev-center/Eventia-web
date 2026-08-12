import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, LoaderCircle, ShieldAlert } from "lucide-react";
import { AuthStatus } from "../../components/auth/AuthShell";
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
        if (accessToken) {
          setStoredAuth({ token: accessToken, user: {} });
          navigate("/organizer/dashboard", { replace: true });
          return;
        }
        if (token) {
          const response = await api.get(`/auth/activate?token=${token}`);
          setStoredAuth({ token: response.data.accessToken, user: response.data.user || {} });
          navigate("/organizer/dashboard", { replace: true });
          return;
        }
        setError("Lien d’activation invalide ou incomplet.");
      } catch (requestError) {
        setError(requestError?.response?.data?.message || "Ce lien d’activation est invalide ou a expiré.");
      }
    }
    activateAccount();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <AuthStatus
        icon={<ShieldAlert size={34} />}
        tone="red"
        title="Activation impossible."
        action={<Link className="auth-primary" to="/login">Retour à la connexion <ArrowRight size={16} /></Link>}
        secondary={<Link className="auth-status-secondary" to="/register">Créer un nouveau compte</Link>}
      >
        {error}
      </AuthStatus>
    );
  }

  return (
    <AuthStatus icon={<LoaderCircle className="auth-spinner" size={34} />} tone="orange" title="Activation en cours.">
      Nous sécurisons votre compte et préparons votre espace Eventia. Cela ne prendra qu’un instant.
    </AuthStatus>
  );
}

export default AccountActivation;
