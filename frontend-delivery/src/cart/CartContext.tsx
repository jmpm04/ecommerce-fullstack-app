import { createContext } from "react";
import type { CartItem } from "./cart.types";

export interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    total: number;
}

export const CartContext = createContext<CartContextType>({
    items: [],
    addItem: () => {},
    increase: () => {},
    decrease: () => {},
    removeItem: () => {},
    clearCart: () => {},
    total: 0,
});

