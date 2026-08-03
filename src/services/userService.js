import api from "./api/axios";

export const getUserDetails = async (id) => {
  const response = await api.get(`/utilisateur/details/${id}`);
  return response.data;
};

export const changePassword = async ({ ancienMotDePasse, nouveauMotDePasse }) => {
  const response = await api.patch("/utilisateur/me/change-password", {
    ancienMotDePasse,
    nouveauMotDePasse,
  });
  return response.data;
};

export const updateClientProfile = async (payload) => {
  const response = await api.patch("/utilisateur/me/profil-client", payload);
  return response.data;
};

export const updateOrganizerProfile = async (payload) => {
  const response = await api.patch("/utilisateur/me/profil-organisateur", payload);
  return response.data;
};
