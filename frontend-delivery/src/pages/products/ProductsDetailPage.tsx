import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/api/axios";
import { CartContext } from "@/cart/CartContext";
import { AuthContext } from "@/auth/AuthContext";

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
}

export const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // ✅ TODOS LOS HOOKS ARRIBA, SIN CONDICIONES
    const { addItem, items: cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const { user, logout } = useContext(AuthContext);

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (err) {
                setError("No se pudo cargar el producto");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // ⬇️ LOS RETURNS CONDICIONALES VAN DESPUÉS DE LOS HOOKS
    if (loading) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#135bec] mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-400">Cargando producto...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <span className="material-symbols-outlined text-4xl text-red-500 mb-4">error</span>
                        <p className="text-red-500 text-lg">{error || "Producto no encontrado"}</p>
                        <Button onClick={() => navigate("/dashboard")} className="mt-4 bg-[#135bec] hover:bg-blue-700 text-white">
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
                {/* Back Button */}
                <Button
                    variant="outline"
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Volver
                </Button>

                {/* Product Detail Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-[#e7ebf3] dark:border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        {/* Imagen */}
                        <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-96 object-contain transition-transform duration-300 hover:scale-105"
                                />
                            ) : (
                                <div className="h-96 w-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-gray-400">image</span>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <Badge className="w-fit mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                                <span className="material-symbols-outlined text-sm mr-1">check_circle</span>
                                Disponible
                            </Badge>

                            <h1 className="text-4xl font-black mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                                {product.description || "Sin descripción disponible"}
                            </p>

                            <div className="flex items-center gap-1 text-yellow-400 mb-6">
                                <span className="material-symbols-outlined text-lg">star</span>
                                <span className="material-symbols-outlined text-lg">star</span>
                                <span className="material-symbols-outlined text-lg">star</span>
                                <span className="material-symbols-outlined text-lg">star</span>
                                <span className="material-symbols-outlined text-lg">star_half</span>
                                <span className="text-gray-400 text-sm ml-2">(4.5) · 128 reseñas</span>
                            </div>

                            <p className="text-4xl font-black text-[#135bec] mb-8">
                                ${product.price.toFixed(2)}
                            </p>

                            <div className="flex gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 bg-[#135bec] hover:bg-blue-700 text-white py-6 text-lg font-bold"
                                    onClick={() => {
                                        addItem({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.image,
                                            quantity: 1,
                                        });
                                    }}
                                >
                                    <span className="material-symbols-outlined mr-2">add_shopping_cart</span>
                                    Agregar al carrito
                                </Button>

                            </div>

                            {/* Features */}
                            <div className="mt-8 grid grid-cols-3 gap-4">
                                <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="material-symbols-outlined text-[#135bec] mb-2">local_shipping</span>
                                    <span className="text-xs text-gray-500">Envío gratis</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="material-symbols-outlined text-[#135bec] mb-2">verified_user</span>
                                    <span className="text-xs text-gray-500">Garantía 1 año</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <span className="material-symbols-outlined text-[#135bec] mb-2">support_agent</span>
                                    <span className="text-xs text-gray-500">Soporte 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Copiado de MainPage */}
            <footer className="bg-gray-100 dark:bg-gray-950 border-t border-[#e7ebf3] dark:border-gray-900 pt-16 pb-8">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3 text-[#135bec]">
                                <span className="material-symbols-outlined text-3xl font-bold">devices</span>
                                <h2 className="text-[#0d121b] dark:text-white text-xl font-black">TechStore</h2>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">Tu destino único para lo último en electrónica y electrodomésticos inteligentes. Ofrecemos productos de alta calidad de las mejores marcas mundiales.</p>
                            <div className="flex gap-4">
                                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                                    <span className="material-symbols-outlined text-xl">public</span>
                                </a>
                                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                                    <span className="material-symbols-outlined text-xl">share</span>
                                </a>
                                <a className="size-9 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-800 hover:text-[#135bec] transition-colors" href="#">
                                    <span className="material-symbols-outlined text-xl">chat</span>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#135bec]">shopping_bag</span>
                                Tienda
                            </h4>
                            <ul className="flex flex-col gap-3 text-sm text-gray-500">
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Laptops y PC</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Smartphones</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Electrodomésticos</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/dashboard")}>Accesorios</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#135bec]">support_agent</span>
                                Soporte
                            </h4>
                            <ul className="flex flex-col gap-3 text-sm text-gray-500">
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer">Centro de Ayuda</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer" onClick={() => navigate("/orders")}>Seguimiento de Pedidos</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer">Información de Envío</a></li>
                                <li><a className="hover:text-[#135bec] transition-colors cursor-pointer">Devoluciones y Reembolsos</a></li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold text-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#135bec]">campaign</span>
                                Boletín
                            </h4>
                            <p className="text-sm text-gray-500">Suscríbete para obtener ofertas especiales y ofertas únicas de por vida.</p>
                            <div className="flex gap-2">
                                <input className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-[#135bec] outline-none" placeholder="Tu email" type="email" />
                                <button className="bg-[#135bec] text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <span className="material-symbols-outlined">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400">© 2024 TechStore Electronics. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Política de Privacidad</span>
                            <span className="text-xs text-gray-400 hover:text-[#135bec] cursor-pointer">Términos de Servicio</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ProductDetailPage;
