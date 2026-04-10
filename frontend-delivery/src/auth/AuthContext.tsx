import { createContext } from "react";
import type {AuthContextType} from "@/auth/auth.types.ts";

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);
