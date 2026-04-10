import { useEffect, useState, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";
import { AuthContext } from "@/auth/AuthContext";
import { CartContext } from "@/cart/CartContext";
import { api } from "@/api/axios";

// 🧠 tipo del producto (ajústalo si tu backend tiene más campos)
interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const { items: cartItems, addItem } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    // ✅ LOS HOOKS VAN AQUÍ DENTRO
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("todos");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Filtrar productos por nombre
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        { value: "todos", label: "Todas las categorías" },
        { value: "televisores", label: "Televisores" },
        { value: "computadoras", label: "Computadoras" },
        { value: "celulares", label: "Celulares" },
        { value: "audio", label: "Audio" },
    ];

    // ✅ TRAER PRODUCTOS REALES
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const endpoint = selectedCategory === "todos" 
                    ? "/products" 
                    : `/products/category/${selectedCategory}`;
                const res = await api.get(endpoint);
                setProducts(res.data);
            } catch (err) {
                setError("No se pudieron cargar los productos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    // ⏳ estados visuales
    if (loading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100 transition-colors duration-200">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#135bec] mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Cargando productos...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100 transition-colors duration-200">
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
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100 transition-colors duration-200">
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
                            <a className="text-sm font-medium text-[#135bec] cursor-pointer">Productos</a>
                            <a className="text-sm font-medium hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/auth")}></a>
                        </div>
                    </div>
                    <div className="flex-1 max-w-md hidden md:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#135bec] transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </div>
                            <input 
                                className="w-full bg-[#e7ebf3] dark:bg-gray-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-500" 
                                placeholder="Buscar productos..." 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-white dark:text-gray-300 relative" onClick={() => navigate("/cart")}>
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
                            {user?.role === "ADMIN" && (
                                <>
                                    <Button onClick={() => navigate("/admin/orders")} variant="ghost" size="sm" className="text-[#135bec] hover:text-blue-700 hover:bg-blue-50">
                                        <span className="material-symbols-outlined text-sm">receipt_long</span>
                                    </Button>
                                    <Button onClick={() => navigate("/admin/users")} variant="ghost" size="sm" className="text-purple-500 hover:text-purple-700 hover:bg-purple-50">
                                        <span className="material-symbols-outlined text-sm">group</span>
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
                            <span className="text-[#135bec] font-bold text-sm tracking-widest uppercase">Catálogo de Productos</span>
                            <h1 className="text-4xl font-black leading-tight tracking-tight">Nuestra Colección</h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">Descubre nuestra selección exclusiva de productos de alta calidad</p>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#135bec]">shopping_bag</span>
                            {selectedCategory === "todos" ? "Todos los Productos" : categories.find(c => c.value === selectedCategory)?.label}
                        </h2>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{filteredProducts.length} productos</span>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-white dark:bg-gray-800 border border-[#e7ebf3] dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#135bec]/50 outline-none cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                            >
                                <CardContent className="p-5">
                                    <div className="relative h-48 overflow-hidden mb-4">
                                        <div className="absolute top-3 left-3">
                                            <Badge className="bg-blue-100 text-[#135bec] hover:bg-blue-200">Nuevo</Badge>
                                        </div>
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="size-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110 object-contain"
                                            />
                                        ) : (
                                            <div className="size-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-gray-400">shopping_bag</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-bold text-lg group-hover:text-[#135bec] transition-colors line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span className="material-symbols-outlined text-sm">star_half</span>
                                            <span className="text-gray-400 text-xs ml-1">(4.5)</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xl font-black text-[#135bec]">${product.price}</span>
                                            <div className="flex gap-2">
                                                <button 
                                                    className="size-10 flex items-center justify-center border border-[#e7ebf3] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                >
                                                    <span className="material-symbols-outlined text-white dark:text-white">visibility</span>
                                                </button>
                                                <button 
                                                    className="size-10 flex items-center justify-center bg-[#135bec] hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-[#135bec]/20"
                                                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image })}
                                                >
                                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                                </button>
                                            </div>
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

export default Dashboard;
