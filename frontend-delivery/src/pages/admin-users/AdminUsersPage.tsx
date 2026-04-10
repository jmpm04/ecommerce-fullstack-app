import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { api } from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/auth/AuthContext";
import { CartContext } from "@/cart/CartContext";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    birthDate: string;
    createdAt: string;
}

export const AdminUsersPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (err) {
                console.error(err);
                setError("No se pudieron cargar los usuarios");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#135bec] mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Cargando usuarios...</p>
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
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Usuarios</a>
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
                            <Button onClick={() => navigate("/admin/orders")} variant="ghost" size="sm" className="text-purple-500 hover:text-purple-700 hover:bg-purple-50">
                                <span className="material-symbols-outlined text-sm">receipt_long</span>
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
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Usuarios Registrados</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Visualiza todos los usuarios registrados en la plataforma</p>
                        </div>
                    </div>
                </section>

                {/* Users Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#135bec]">group</span>
                            Todos los Usuarios
                        </h2>
                        <span className="text-sm text-gray-500">{users.length} usuarios</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((u) => (
                            <Card key={u.id} className="bg-white dark:bg-gray-900 border border-[#e7ebf3] dark:border-gray-800">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-[#135bec]/10 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[#135bec]">person</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{u.name}</h3>
                                                <p className="text-sm text-gray-500">{u.email}</p>
                                            </div>
                                        </div>
                                        <Badge className={u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}>
                                            {u.role}
                                        </Badge>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <span className="material-symbols-outlined text-base">cake</span>
                                            <span>{new Date(u.birthDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <span className="material-symbols-outlined text-base">calendar_today</span>
                                            <span>Registrado: {new Date(u.createdAt).toLocaleDateString()}</span>
                                        </div>
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

export default AdminUsersPage;
