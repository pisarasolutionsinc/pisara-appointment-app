import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loading from "../components/others/Loading";
import Forbidden from "../pages/Errors/Forbidden";
interface ProtectedRouteProps {
  allowedRoles: ("admin" | "user" | "viewer")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <Navigate to="/login" replace />;
  }

  const { user, loading } = authContext;

  if (loading) {
    return (
      <div>
        <Loading text="Loading..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.type)) {
    return <Forbidden />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
