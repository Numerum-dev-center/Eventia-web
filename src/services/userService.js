import api from "./api/axios";
import axiosInstance from "./api/axios";

/*
 * ==========================================
 * UTILISATEUR CONNECTÉ / PROFIL
 * ==========================================
 */

/**
 * Récupérer les détails d'un utilisateur
 */
export const getUserDetails = async (id) => {
  const response = await api.get(`/user/details/${id}`);
  return response.data;
};

/**
 * Modifier le mot de passe
 */
export const changePassword = async ({
  ancienMotDePasse,
  nouveauMotDePasse,
}) => {
  const response = await api.patch("/user/me/change-password", {
    ancienMotDePasse,
    nouveauMotDePasse,
  });

  return response.data;
};

/**
 * Mettre à jour le profil client
 */
export const updateClientProfile = async (payload) => {
  const response = await api.patch(
    "/user/me/profil-client",
    payload
  );

  return response.data;
};

/**
 * Mettre à jour le profil organisateur
 */
export const updateOrganizerProfile = async (payload) => {
  const response = await api.patch(
    "/user/me/profil-organisateur",
    payload
  );

  return response.data;
};


/*
 * ==========================================
 * ADMINISTRATION DES UTILISATEURS
 * ==========================================
 */

/**
 * Récupérer les détails d'un utilisateur
 * par l'administrateur
 */
export const getUserById = (id) => axiosInstance.get(`/administrator/users/${id}`);


/**
 * Modifier un utilisateur
 * par l'administrateur
 */
export const updateUserStatus = async (id, payload) => {
  const response = await api.patch(
    `/administrator/users/${id}`,
    payload
  );

  return response.data;
};





/**
 * Supprimer un utilisateur
 *
 */
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/administrator/users/${id}`
  );

  return response.data;
};