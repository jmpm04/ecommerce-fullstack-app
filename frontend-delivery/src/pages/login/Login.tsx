import { api } from "@/api/axios";
import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/auth/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";

interface LoginFormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const res = await api.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            const token = res.data.access_token;

            // 🔐 AUTENTICACIÓN REAL
            login(token);

            // 🚀 REDIRECCIÓN
            navigate("/dashboard", { replace: true });
        } catch (error) {
            console.error("Login error:", error);
            setErrors({
                email: "Invalid credentials",
                password: "Invalid credentials",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* LEFT IMAGE */}
            <div
                className="hidden lg:block bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        'url("https://res.cloudinary.com/dhf1lhdbb/image/upload/v1769710630/escritorio-minimalista-1080x675_xghbjo.jpg")',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="relative h-full flex items-center justify-center p-12">
                    <div className="text-center text-white">
                        <div className="mb-8">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <UtensilsCrossed className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                            <p className="text-xl text-white/90 max-w-md mx-auto">
                                Your favorite food delivery app is ready to serve you again
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT FORM */}
            <div className="flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                        <p className="text-gray-600">
                            Please enter your details to access your account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <Input
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="h-12 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
