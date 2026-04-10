import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { api } from "@/api/axios";
import type { Order } from "@/types/order.types";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { OrderStatusBadge } from "@/components/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/auth/AuthContext";
import { CartContext } from "@/cart/CartContext";


export const AdminOrdersPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders");
                setOrders(res.data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar las órdenes");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
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

    if (error) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                        <p className="text-red-500 text-lg">{error}</p>
                        <Button onClick={() => window.location.reload()} className="mt-4 bg-[#135bec] hover:bg-blue-700">
                            Reintentar
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
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Órdenes</a>
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
                            <Button onClick={() => navigate("/orders")} variant="ghost" size="sm" className="text-orange-500 hover:text-orange-700 hover:bg-orange-50">
                                <span className="material-symbols-outlined text-sm">shopping_bag</span>
                            </Button>
                            <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm" className="text-[#135bec] hover:text-blue-700 hover:bg-blue-50">
                                <span className="material-symbols-outlined text-sm">inventory_2</span>
                            </Button>
                            <Button onClick={() => navigate("/admin/users")} variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-700 hover:bg-cyan-50">
                                <span className="material-symbols-outlined text-sm">group</span>
                            </Button>
                            <Button onClick={() => navigate("/create")} variant="ghost" size="sm" className="text-green-500 hover:text-green-700 hover:bg-green-50">
                                <span className="material-symbols-outlined text-sm">add_circle</span>
                            </Button>
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
                            <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Panel de Administración</span>
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Gestión de Órdenes</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Administra todas las órdenes de los clientes</p>
                        </div>
                    </div>
                </section>

                {/* Orders Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#135bec]">receipt_long</span>
                            Todas las Órdenes
                        </h2>
                        <span className="text-sm text-gray-500">{orders.length} órdenes</span>
                    </div>
                    
                    <div className="space-y-6">
                        {orders.map((order) => (
                    <Card key={order.id}>
                        <CardContent className="p-6 space-y-4">
                            {/* HEADER */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">
                                        Orden #{order.id}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <OrderStatusBadge status={order.status} />
                                    <span className="font-bold">
    ${order.totalPrice.toFixed(2)}
  </span>
                                </div>


                            </div>

                            {/* USER */}
                            <div className="text-sm">
                                <p>
                                    <strong>Usuario:</strong> {order.user.name}
                                </p>
                                <p className="text-muted-foreground">
                                    {order.user.email}
                                </p>
                            </div>

                            {/* ITEMS */}
                            <div className="space-y-2">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between text-sm border-b pb-1"
                                    >
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                                        <span>
                      ${item.price.toFixed(2)}
                    </span>
                                    </div>
                                ))}
                            </div>
                            {/* ACTIONS */}
                            <div className="pt-4 text-right">
                                <Link
                                    to={`/orders/${order.id}`}
                                    className="text-blue-600 hover:underline text-sm font-medium"
                                >
                                    Ver detalle →
                                </Link>
                            </div>
                            <div className="flex gap-2 justify-end mt-2">
                                {order.status !== "PAID" && (
                                    <Button
                                        size="sm"
                                        className="bg-[#135bec] hover:bg-blue-700 text-white"
                                        onClick={async () => {
                                            try {
                                                await api.patch(`/orders/${order.id}/status`, {
                                                    status: "PAID",
                                                });
                                                window.location.reload();
                                            } catch (err) {
                                                console.error("Error al marcar como pagada:", err);
                                                alert("Error al actualizar el estado de la orden");
                                            }
                                        }}
                                    >
                                        Marcar pagada
                                    </Button>
                                )}

                                {order.status !== "CANCELLED" && (
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        className="bg-red-500 hover:bg-red-600 text-white"
                                        onClick={async () => {
                                            try {
                                                await api.patch(`/orders/${order.id}/status`, {
                                                    status: "CANCELLED",
                                                });
                                                window.location.reload();
                                            } catch (err) {
                                                console.error("Error al cancelar:", err);
                                                alert("Error al cancelar la orden");
                                            }
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                )}
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

export default AdminOrdersPage;
