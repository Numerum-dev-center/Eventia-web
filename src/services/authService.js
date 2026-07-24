import api from "./api/axios";

// Connexion
export const login = async ({ email, motDePasse }) => {
  const response = await api.post("/auth/connexion", {
    email,
    motDePasse,
  });

  return response.data;
};

// Inscription client
export const register = async ({email, password, confirmPassword}) => {
  const response = await api.post(
    "/auth/inscription-organisateur",
    {email, password, confirmPassword}
  );

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

// Réinitialisation
export const resetPassword = async (data) => {
  const response = await api.post(
    "/auth/reset-password",
    data
  );


  


  return response.data;
};