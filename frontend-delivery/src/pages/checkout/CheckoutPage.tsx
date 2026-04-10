import { useContext, useState } from "react";
import { CartContext } from "@/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { api } from "@/api/axios";
import { AuthContext } from "@/auth/AuthContext";

export const CheckoutPage = () => {
    const { items, total, clearCart } = useContext(CartContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                                <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/cart")}>Carrito</a>
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
                        <h1 className="text-2xl font-bold mb-4">No tienes productos en el carrito</h1>
                        <Button onClick={() => navigate("/dashboard")} className="bg-[#135bec] hover:bg-blue-700 text-white">
                            Volver al catálogo
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const handlePay = async () => {
        setLoading(true);
        setError(null);

        try {
            const payload = {
                description: `Compra de ${items.length} productos`,
                products: items.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                })),
            };

            console.log("Payload enviado:", payload);

            await api.post("/orders", payload);

            clearCart();
            navigate("/orders");
        } catch (err) {
            console.error("Error al crear orden:", err);
            setError("No se pudo completar la compra");
        } finally {
            setLoading(false);
        }
    };

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
                            <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/cart")}>Carrito</a>
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Checkout</a>
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
                            <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Finalizar Compra</span>
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Checkout</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Confirma tu pedido y realiza el pago</p>
                        </div>
                    </div>
                </section>

                {/* Order Summary */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-[#135bec]">receipt</span>
                        <h2 className="text-2xl font-bold">Resumen del Pedido</h2>
                    </div>

                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <Card key={item.id} className="bg-white dark:bg-gray-900 border border-[#e7ebf3] dark:border-gray-800">
                                <CardContent className="flex justify-between items-center p-6">
                                    <div>
                                        <p className="font-bold text-lg">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-black text-xl text-[#135bec]">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-[#e7ebf3] dark:border-gray-800 p-6 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400 text-lg">Total a pagar:</span>
                            <span className="text-3xl font-black text-[#135bec]">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}

                    <Button
                        size="lg"
                        className="w-full bg-[#135bec] hover:bg-blue-700 text-white py-6 text-lg font-bold"
                        onClick={handlePay}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                Procesando pago...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined">payments</span>
                                Confirmar y Pagar
                            </span>
                        )}
                    </Button>

                    <p className="text-sm text-gray-400 mt-4 text-center flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-sm">info</span>
                        Pago simulado – no se realiza ningún cobro real
                    </p>
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

export default CheckoutPage;
