import { Navigate, useLocation } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("ngm-authenticated") === "true";
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} replace />
  );
};

export default UserProtectedRoute;
