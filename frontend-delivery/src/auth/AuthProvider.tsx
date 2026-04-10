import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";
import type { User } from "./auth.types";

interface JwtPayload {
    sub: number;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // 🔥 CLAVE

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);

        const decoded = jwtDecode<JwtPayload>(newToken);

        setToken(newToken);
        setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
        });

        setLoading(false);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart"); // 🧹 Limpiar carrito al cambiar usuario
        setToken(null);
        setUser(null);
        setLoading(false);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            setLoading(false);
            return;
        }

        const decoded = jwtDecode<JwtPayload>(storedToken);

        setToken(storedToken);
        setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
        });

        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
