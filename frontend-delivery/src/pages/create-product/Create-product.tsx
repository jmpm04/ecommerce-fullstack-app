import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/api/axios";
import { AuthContext } from "@/auth/AuthContext";
import { CartContext } from "@/cart/CartContext";

export const CreateProductPage = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items: cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    // 🔒 Seguridad frontend (extra)
    if (user?.role !== "ADMIN") {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-4xl text-red-500 mb-4">block</span>
                        <p className="text-red-500 text-lg font-semibold">Acceso denegado</p>
                        <Button onClick={() => navigate("/dashboard")} className="mt-4 bg-[#135bec] hover:bg-blue-700">
                            Volver al Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.post("/products", {
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: Number(formData.price),
                image: formData.image || null,
            });

            // ✅ volver al dashboard
            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error(err);
            setError("No se pudo crear el producto");
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
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Crear Producto</a>
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
                            <Button onClick={() => navigate("/admin/orders")} variant="ghost" size="sm" className="text-[#135bec] hover:text-blue-700 hover:bg-blue-50">
                                <span className="material-symbols-outlined text-sm">receipt_long</span>
                            </Button>
                            <Button onClick={() => navigate("/admin/users")} variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-700 hover:bg-cyan-50">
                                <span className="material-symbols-outlined text-sm">group</span>
                            </Button>
                            <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                <span className="material-symbols-outlined text-sm">inventory_2</span>
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
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Crear Nuevo Producto</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Agrega un nuevo producto al catálogo de la tienda</p>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section>
                    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 p-8">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-[#135bec]">add_circle</span>
                            <h2 className="text-2xl font-bold">Información del Producto</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                            <div>
                                <Label className="text-sm font-medium mb-2 block">Nombre</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-[#e7ebf3] dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Descripción</Label>
                                <Input
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-[#e7ebf3] dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Categoría</Label>
                                <Input
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-[#e7ebf3] dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Precio</Label>
                                <Input
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-[#e7ebf3] dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <Label className="text-sm font-medium mb-2 block">Imagen (URL Cloudinary)</Label>
                                <Input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://res.cloudinary.com/..."
                                    className="bg-[#f6f6f8] dark:bg-gray-800 border-[#e7ebf3] dark:border-gray-700"
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    {error}
                                </p>
                            )}

                            <Button type="submit" className="w-full bg-[#135bec] hover:bg-blue-700 text-white font-bold py-3" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Creando...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <span className="material-symbols-outlined">add</span>
                                        Crear producto
                                    </span>
                                )}
                            </Button>
                        </form>
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

export default CreateProductPage;
