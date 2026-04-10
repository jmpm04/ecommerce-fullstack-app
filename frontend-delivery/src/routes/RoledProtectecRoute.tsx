import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthContext";

interface Props {
    allowedRoles: ("ADMIN" | "USER")[];
}

export const RoleProtectedRoute = ({ allowedRoles }: Props) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
