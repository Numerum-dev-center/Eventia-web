import api from "./api/axios";

// Finances globales — pas encore d'endpoint backend dédié, données de démonstration
export const getAdminFinances = async () => {
  return {
    revenue: 12500000,
    commissions: 1200000,
    reversements: 11300000,
  };
};

// Utilisateurs — réel, branché sur /utilisateur
export const getUsers = async () => {
  const response = await api.get("/utilisateur/liste");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/utilisateur/delete/${id}`);
  return response.data;
};
