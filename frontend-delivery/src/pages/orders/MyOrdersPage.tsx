import { useEffect, useState, useContext } from "react";
import { api } from "@/api/axios";
import type { Order } from "@/types/order.types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { OrderStatusBadge } from "@/components/OrderStatusBadge.tsx";
import { AuthContext } from "@/auth/AuthContext";
import { CartContext } from "@/cart/CartContext";

export const MyOrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        api.get("/orders/my")
            .then(res => setOrders(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#135bec] mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Cargando órdenes...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
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
                                <a className="text-sm font-medium text-[#135bec] cursor-pointer">Mis Órdenes</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300 relative" onClick={() => navigate("/cart")}>
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-1 bg-[#135bec] text-white text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>
                                )}
                            </button>
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
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">receipt_long</span>
                        <h1 className="text-2xl font-bold mb-4">Aún no has realizado compras</h1>
                        <Button onClick={() => navigate("/dashboard")} className="bg-[#135bec] hover:bg-blue-700 text-white">
                            Explorar productos
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
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Mis Órdenes</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-300 relative" onClick={() => navigate("/cart")}>
                            <span className="material-symbols-outlined">shopping_cart</span>
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 bg-[#135bec] text-white text-[10px] font-bold px-1.5 rounded-full">{cartCount}</span>
                            )}
                        </button>
                        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
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
                            <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Historial de Compras</span>
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Mis Órdenes</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Revisa el estado de tus pedidos anteriores</p>
                        </div>
                    </div>
                </section>

                {/* Orders List */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#135bec]">receipt_long</span>
                            <h2 className="text-2xl font-bold">Todas las Órdenes</h2>
                        </div>
                        <span className="text-sm text-gray-500">{orders.length} órdenes</span>
                    </div>

                    <div className="space-y-4">
                        {orders.map(order => (
                            <Card key={order.id} className="bg-white dark:bg-gray-900 border border-[#e7ebf3] dark:border-gray-800">
                                <CardContent className="flex justify-between items-center p-6">
                                    <div>
                                        <p className="font-bold text-lg">Orden #{order.id}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <OrderStatusBadge status={order.status} />

                                    <div className="flex items-center gap-4">
                                        <p className="font-black text-xl text-[#135bec]">${order.totalPrice.toFixed(2)}</p>
                                        <Button
                                            onClick={() => navigate(`/orders/${order.id}`)}
                                            className="bg-[#135bec] hover:bg-blue-700 text-white"
                                        >
                                            <span className="material-symbols-outlined text-sm mr-2">visibility</span>
                                            Ver detalle
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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

export default MyOrdersPage;
