import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../../services/api/axios";

function AccountActivation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function activateAccount() {
      try {
        const token = searchParams.get("token");

        const response = await api.get(`/auth/activate?token=${token}`);

        // adapte les noms selon la réponse de ton backend
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        navigate("/organizer/dashboard", { replace: true });
      } catch (error) {
        navigate("/login", { replace: true });
      }
    }

    activateAccount();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Activation de votre compte...
    </div>
  );
}

export default AccountActivation;