import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { AuthStatus } from "../../components/auth/AuthShell";
import api from "../../services/api/axios";
import { getUserId, setStoredAuth } from "../../services/authSession";
import Skeleton from "../../components/ui/Skeleton";

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
          // The JWT itself carries no role claim (only { sub, email }), and the
          // backend's Google sign-up defaults brand-new accounts to the Client
          // role (only allow-listed admin emails get Admin — never Organisateur
          // automatically). Blindly sending everyone to /organizer/dashboard was
          // wrong for that common case, so fetch the real role before routing.
          setStoredAuth({ token: accessToken, user: {} });
          const userId = getUserId();
          if (userId) {
            try {
              const { data: userDetails } = await api.get(`/utilisateur/details/${userId}`);
              const authState = setStoredAuth({
                token: accessToken,
                user: { email: userDetails.email, role: userDetails.role },
              });
              const role = authState.user.role?.trim().toLowerCase();
              if (role === "admin") { navigate("/admin/dashboard", { replace: true }); return; }
              if (role === "organisateur") { navigate("/organizer/dashboard", { replace: true }); return; }
              navigate("/", { replace: true });
              return;
            } catch {
              // Couldn't confirm the role — fall through to the default below.
            }
          }
          navigate("/organizer/dashboard", { replace: true });
          return;
        }
        if (token) {
          // The backend's GET /auth/activate endpoint does not return JSON — it
          // sets httpOnly cookies and issues an HTTP redirect straight to the
          // dashboard (or an error page) on the backend origin. It must be hit
          // with a real browser navigation, not parsed as an AJAX/JSON response.
          const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4090";
          window.location.replace(`${apiUrl}/auth/activate?token=${token}`);
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
    <AuthStatus icon={<Skeleton className="evi-skeleton-circle" width="34px" height="34px" />} tone="orange" title="Activation en cours.">
      Nous sécurisons votre compte et préparons votre espace Eventia. Cela ne prendra qu’un instant.
    </AuthStatus>
  );
}

export default AccountActivation;
