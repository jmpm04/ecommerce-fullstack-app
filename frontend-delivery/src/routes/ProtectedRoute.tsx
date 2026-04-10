import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // ⏳ ESPERA A QUE AUTH SE HIDRATE
    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return <Outlet />;
};