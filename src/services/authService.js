import api from "./api/axios";

// Connexion
export const login = async ({ email, motDePasse }) => {
  const response = await api.post("/auth/connexion", {
    email,
    motDePasse,
  });

  return response.data;
};

// Inscription (client ou organisateur)
export const register = async ({ email, password, confirmPassword, role = "organisateur" }) => {
  const endpoint =
    role === "client" ? "/auth/inscription-client" : "/auth/inscription-organisateur";

  const response = await api.post(endpoint, { email, password, confirmPassword });

  return response.data;
};



// Deconnexion
export const logoutApi = async () => {
  const response = await api.post("/auth/deconnexion");
  return response.data;
}



// Mot de passe oublié
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

// Vérification du code de réinitialisation
export const verifyResetCode = async ({ email, code }) => {
  const response = await api.post("/utilisateur/verify-reset-code", { email, code });
  return response.data;
};

// Réinitialisation
export const resetPassword = async (data) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );


  


  return response.data;
};