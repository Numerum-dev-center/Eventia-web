import api from "./api/axios";

// Connexion
export const login = async ({ email, motDePasse }) => {
  const response = await api.post("/auth/login", {
    email,
    password: motDePasse,
  });

  return response.data;
};

// Inscription (client ou organisateur)
export const register = async ({ email, password, confirmPassword, role = "Organizer" }) => {
  const endpoint =
    role === "client" ? "/auth/register-client" : "/auth/register-organizer";

  const response = await api.post(endpoint, { email, password, confirmPassword });

  return response.data;
};



// Deconnexion
export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
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
  const response = await api.post("/user/verify-reset-code", { email, code });
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