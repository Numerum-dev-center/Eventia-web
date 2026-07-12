import { Navigate } from "react-router-dom";

import { getUserRole, isAuthenticated } from "../services/authSession";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const authenticated = isAuthenticated();
  const userRole = getUserRole();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}

export default ProtectedRoute;