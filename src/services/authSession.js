const AUTH_STORAGE_KEY = "eventia_auth";

const safeParseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== "string" || token.split(".").length < 2) {
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = atob(base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "="));

    return JSON.parse(payload);
  } catch {
    return null;
  }
};

export const getStoredAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);

  return rawValue ? safeParseJson(rawValue) : null;
};

export const setStoredAuth = ({ token, user }) => {
  if (typeof window === "undefined") {
    return null;
  }
  

  const decodedToken = decodeJwtPayload(token);
  const role =
    user?.role ||
    user?.userRole ||
    user?.type ||
    decodedToken?.role ||
    decodedToken?.userRole ||
    decodedToken?.type ||
    "organisateur";

  const authState = {
    token,
    user: {
      ...user,
      role,
    },
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  localStorage.setItem("token", token);

  return authState;
};

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("token");
};



export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("token");
}


export const isAuthenticated = () => Boolean(getStoredAuth()?.token);

export const getUserRole = () => getStoredAuth()?.user?.role || null;

export const getUserId = () => {
  const token = getStoredAuth()?.token;
  const decoded = decodeJwtPayload(token);
  return decoded?.sub || null;
};