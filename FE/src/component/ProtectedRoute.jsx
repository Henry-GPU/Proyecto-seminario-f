import { Navigate } from "react-router-dom";
import { useAccToken } from "./context/AccToken";

const ProtectedRoute = ({ permissions, allowedPermission, children }) => {
  const { accessToken, loading } = useAccToken();

  if (loading) {
    return <div>Loading...</div>; // O usa tu componente Loader
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  if (allowedPermission === '') {
    return children;
  }
  if (permissions && permissions.includes("SUPERADMIN")) {
    return children;
  }
  if (!permissions || !permissions.includes(allowedPermission)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
