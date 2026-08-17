import api from "./api/axios";

// Utilisateurs — réel, branché sur /utilisateur
export const getUsers = async () => {
  const response = await api.get("/utilisateur/liste");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/utilisateur/delete/${id}`);
  return response.data;

};

