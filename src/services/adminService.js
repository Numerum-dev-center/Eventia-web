import api from "./api/axios";

// Utilisateurs — réel, branché sur /user
export const getAllUsers = async (params) => {
  const response = await api.get("/administrator/users", { params });
  return response.data;
}

// Détails d'un utilisateur par l'administrateur
export const getUserById = async (id) => {
  const response = await api.get(`/administrator/users/${id}`);
  return response.data;
};


// Activer un utilisateur par l'administrateur
export const activateUser = async (id) => {
  const response = await api.patch(`/administrator/users/${id}/activate`);
  return response.data;
};

// Désactiver un utilisateur par l'administrateur
export const deactivateUser = async (id) => {
  const response = await api.patch(`/administrator/users/${id}/deactivate`);
  return response.data;
};

// Suspendre un utilisateur par l'administrateur
export const suspendUser = async (id) => {
  const response = await api.patch(`/administrator/users/${id}/suspend`);
  return response.data;
};

// Supprimer un utilisateur par l'administrateur
export const deleteUser = async (id) => {
  const response = await api.delete(`/administrator/users/${id}`);
  return response.data;
};

// mettre à jour le statut d'un utilisateur par l'administrateur
export const updateUserStatus = async (id, payload) => {
  const response = await api.patch(`/administrator/users/${id}`, payload);
  return response.data;
};














