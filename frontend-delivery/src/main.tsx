import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";

import App from "./App";
import { AuthPage } from "@/pages/auth/AuthPage";
import { MainPage } from "@/pages/main/MainPage";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { ProductDetailPage } from "@/pages/products/ProductsDetailPage";
import { CreateProductPage } from "@/pages/create-product/Create-product";
import { AuthProvider } from "@/auth/AuthProvider";
import {ProtectedRoute} from "@/routes/ProtectedRoute.tsx";
import {RoleProtectedRoute} from "@/routes/RoledProtectecRoute.tsx";
import {CartProvider} from "@/cart/CartProvider.tsx";
import CartPage from "@/pages/cart/CartPage.tsx";
import CheckoutPage from "@/pages/checkout/CheckoutPage.tsx";
import AdminOrdersPage from "@/pages/admin-orders/AdminOrdersPage.tsx";
import AdminUsersPage from "@/pages/admin-users/AdminUsersPage.tsx";
import MyOrdersPage from "@/pages/orders/MyOrdersPage.tsx";
import OrderDetailPage from "@/pages/orders/OrderDetailPage.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
            },
            {
                path: "auth",
                element: <AuthPage />,
            },

            // 🔐 PRIMERO: autenticación
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />,
                    },
                    {
                        path: "products/:id",
                        element: <ProductDetailPage />,
                    },
                    {
                        path: "cart",
                        element: <CartPage/>,

                    },{
                        path: "checkout",
                        element: <CheckoutPage/>,

                    },{
                        path: "orders",
                        element: <MyOrdersPage/>

                    },{
                        path: "orders/:id",
                        element: <OrderDetailPage/>

                    },

                    // 🔐 SEGUNDO: rol
                    {
                        element: <RoleProtectedRoute allowedRoles={["ADMIN"]} />,
                        children: [
                            {
                                path: "create",
                                element: <CreateProductPage />,
                            },
                            {
                                path: "admin/orders",
                                element: <AdminOrdersPage/>
                            },
                            {
                                path: "admin/users",
                                element: <AdminUsersPage/>
                            }
                        ],
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <CartProvider>
            <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    </StrictMode>
);
