import { usersData } from "../data/usersData";

export const login = ({ email, password }) => {
  const user = usersData.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  return {
    data: {
      token: "fake-jwt-token",
      user,
    },
  };
};

export const register = (userData) => {
  usersData.push({
    id: String(Date.now()),
    ...userData,
    role: "organisateur",
  });

  return {
    data: {
      message: "Compte créé avec succès.",
    },
  };
};

export const forgotPassword = () => {
  return {
    data: {
      message: "Fonction non disponible en mode local.",
    },
  };
};

export const resetPassword = () => {
  return {
    data: {
      message: "Fonction non disponible en mode local.",
    },
  };
};