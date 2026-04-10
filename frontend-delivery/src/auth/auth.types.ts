export type Role = "USER" | "ADMIN";

export interface User {
    id: number;
    email: string;
    name: string;
    role: Role;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}
