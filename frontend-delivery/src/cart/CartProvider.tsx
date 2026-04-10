import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "./cart.types";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // ✅ CARGA INICIAL DESDE LOCALSTORAGE
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ GUARDAR CARRITO CUANDO CAMBIA
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    // ➕ AGREGAR PRODUCTO
    const addItem = (item: CartItem) => {
        setItems((prev) => {
            const exists = prev.find((p) => p.id === item.id);

            if (exists) {
                return prev.map((p) =>
                    p.id === item.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, item];
        });
    };

    // ➕ AUMENTAR CANTIDAD
    const increase = (id: number) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // ➖ DISMINUIR CANTIDAD (SI LLEGA A 0, SE ELIMINA)
    const decrease = (id: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // ❌ ELIMINAR PRODUCTO COMPLETO
    const removeItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 🧹 VACIAR CARRITO
    const clearCart = () => {
        setItems([]);
    };

    // 💰 TOTAL
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                increase,
                decrease,
                removeItem,
                clearCart,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
