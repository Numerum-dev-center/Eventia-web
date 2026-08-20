import api from "./api/axios";

// Utilisateurs — réel, branché sur /user
export const getUsers = async () => {
  const response = await api.get("/user/liste");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/user/delete/${id}`);
  return response.data;

};

