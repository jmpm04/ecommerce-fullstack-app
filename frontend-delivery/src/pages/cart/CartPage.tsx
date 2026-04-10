import { useContext } from "react";
import { CartContext } from "@/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { AuthContext } from "@/auth/AuthContext";

export const CartPage = () => {
    const {
        items,
        increase,
        decrease,
        removeItem,
        clearCart,
        total,
    } = useContext(CartContext);

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    if (items.length === 0) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-[#e7ebf3] dark:border-gray-800 px-4 md:px-10 lg:px-40 py-3">
                    <div className="flex items-center justify-between gap-8 max-w-[1200px] mx-auto">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-[#135bec]">
                                <span className="material-symbols-outlined text-3xl font-bold">devices</span>
                                <h2 className="text-[#0d121b] dark:text-white text-xl font-black leading-tight tracking-tight">TechStore</h2>
                            </div>
                            <div className="hidden lg:flex items-center gap-6 ml-4">
                                <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/")}>Inicio</a>
                                <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Productos</a>
                                <a className="text-sm font-medium text-[#135bec] cursor-pointer">Carrito</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                                <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                    <span className="material-symbols-outlined text-sm">logout</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex items-center justify-center flex-grow">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_cart</span>
                        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
                        <Button onClick={() => navigate("/dashboard")} className="bg-[#135bec] hover:bg-blue-700 text-white">
                            Volver al catálogo
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-[#e7ebf3] dark:border-gray-800 px-4 md:px-10 lg:px-40 py-3">
                <div className="flex items-center justify-between gap-8 max-w-[1200px] mx-auto">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 text-[#135bec]">
                            <span className="material-symbols-outlined text-3xl font-bold">devices</span>
                            <h2 className="text-[#0d121b] dark:text-white text-xl font-black leading-tight tracking-tight">TechStore</h2>
                        </div>
                        <div className="hidden lg:flex items-center gap-6 ml-4">
                            <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/")}>Inicio</a>
                            <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Productos</a>
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Carrito</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
                            <Button onClick={() => navigate("/orders")} variant="ghost" size="sm" className="text-orange-500 hover:text-orange-700 hover:bg-orange-50">
                                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                            </Button>
                            {user?.role === "ADMIN" && (
                                <>
                                    <Button onClick={() => navigate("/admin/orders")} variant="ghost" size="sm" className="text-[#135bec] hover:text-blue-700 hover:bg-blue-50">
                                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    </Button>
                                    <Button onClick={() => navigate("/create")} variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-50">
                                        <span className="material-symbols-outlined text-sm">add_circle</span>
                                    </Button>
                                </>
                            )}
                            <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                <span className="material-symbols-outlined text-sm">logout</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-[1200px] mx-auto w-full px-4 md:px-10 py-8">
                {/* Hero Section */}
                <section className="mb-8">
                    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8">
                        <div className="flex flex-col gap-4">
                            <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Tu Selección</span>
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Carrito de Compras</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Revisa tus productos antes de finalizar la compra</p>
                        </div>
                    </div>
                </section>

                {/* Cart Items */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-[#135bec]">shopping_cart</span>
                        <h2 className="text-2xl font-bold">Productos ({items.length})</h2>
                    </div>

                    <div className="space-y-4">
                        {items.map((item) => (
                            <Card key={item.id} className="bg-white dark:bg-gray-900 border border-[#e7ebf3] dark:border-gray-800">
                                <CardContent className="flex items-center gap-4 p-6">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-24 w-24 object-contain rounded-lg"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl text-gray-400">shopping_bag</span>
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <h2 className="font-bold text-lg">{item.name}</h2>
                                        <p className="text-sm text-gray-500">
                                            ${item.price} c/u
                                        </p>
                                    </div>

                                    {/* CONTROLES DE CANTIDAD */}
                                    <div className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => decrease(item.id)}
                                            className="text-white dark:text-gray-300"
                                        >
                                            −
                                        </Button>

                                        <span className="font-bold w-8 text-center text-lg">
                                            {item.quantity}
                                        </span>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => increase(item.id)}
                                            className="text-white dark:text-gray-300"
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <p className="font-black text-xl text-[#135bec] w-28 text-right">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>

                                    {/* QUITAR PRODUCTO */}
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeItem(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                    >
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* RESUMEN */}
                    <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 dark:text-gray-400 text-lg">Total:</span>
                                <span className="text-3xl font-black text-[#135bec]">${total.toFixed(2)}</span>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" onClick={clearCart} className="text-white dark:text-white border-gray-300">
                                    <span className="material-symbols-outlined text-sm mr-2">remove_shopping_cart</span>
                                    Vaciar carrito
                                </Button>

                                <Button onClick={() => navigate("/checkout")} className="bg-[#135bec] hover:bg-blue-700 text-white px-8">
                                    <span className="material-symbols-outlined text-sm mr-2">payments</span>
                                    Finalizar compra
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-950 border-t border-[#e7ebf3] dark:border-gray-900 pt-8 pb-4">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400">© 2024 TechStore Electronics. Todos los derechos reservados.</p>
                        <div className="flex gap-4">
                            <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Política de Privacidad</span>
                            <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Términos de Servicio</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default CartPage;
