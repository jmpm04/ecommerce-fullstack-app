import { useState, type FormEvent, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "@/auth/AuthContext";
import { api } from "@/api/axios";
import { Laptop } from "lucide-react";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  agreeTerms: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  agreeTerms?: string;
}

export const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [isLoading, setIsLoading] = useState(false);



  // Login form state
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // Register form state
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateLoginForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!registerData.firstname) {
      newErrors.firstname = "First name is required";
    }

    if (!registerData.lastname) {
      newErrors.lastname = "Last name is required";
    }

    if (!registerData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!registerData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      const token = res.data.access_token;
      login(token);
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

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    try {
      // 1️⃣ Crear usuario
      await api.post("/users", {
        email: registerData.email,
        password: registerData.password,
        name: `${registerData.firstname} ${registerData.lastname}`,
        birthDate: registerData.birthdate
            ? `${registerData.birthdate}T00:00:00Z`
            : "1990-01-01T00:00:00Z",
      });

      // 2️⃣ Login automático
      const loginRes = await api.post("/auth/login", {
        email: registerData.email,
        password: registerData.password,
      });

      const token = loginRes.data.access_token;

      // 3️⃣ Guardar sesión
      login(token);

      // 4️⃣ Redirigir
      navigate("/dashboard", { replace: true });

    } catch (error: any) {
      console.error("Registration error:", error);

      const message =
          error.response?.data?.message ||
          "Error al crear la cuenta";

      setErrors({
        email: message,
        password: message,
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-inter text-[#0d121b] dark:text-gray-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#135bec]/10 mix-blend-multiply"></div>
          <div
            className="size-full bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://res.cloudinary.com/dhf1lhdbb/image/upload/v1769710630/escritorio-minimalista-1080x675_xghbjo.jpg")'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d121b]/60 to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex items-center gap-3 text-white mb-6">
              <Laptop className="w-10 h-10" />
              <h2 className="text-2xl font-black tracking-tight">TechStore</h2>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Eleva tu estilo de vida digital con la mejor electrónica de su clase.
            </h1>
            <p className="text-gray-200 text-lg">
              Únete hoy a nuestra comunidad de más de 50.000 entusiastas de la tecnología.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12 lg:p-24 bg-white dark:bg-[#101622]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 text-[#135bec] mb-12">
            <Laptop className="w-8 h-8" />
            <h2 className="text-[#0d121b] dark:text-white text-xl font-black">TechStore</h2>
          </div>

          <div className="w-full max-w-[440px]">
            {/* Desktop Logo */}
            <div className="hidden lg:flex items-center gap-2 text-[#135bec] mb-10">
              <Laptop className="w-8 h-8" />
              <span className="text-[#0d121b] dark:text-white text-lg font-black uppercase tracking-widest">
                TechStore
              </span>
            </div>

            {/* Welcome Message */}
            <div className="mb-8">
              <h3 className="text-3xl font-black mb-2">Bienvenido de nuevo</h3>
              <p className="text-gray-500 text-sm">
                Ingresa tus datos para acceder a tu cuenta.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-gray-800 mb-8">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 text-center py-3 font-semibold transition-colors ${
                  activeTab === 'signin'
                    ? 'text-[#135bec] border-b-2 border-[#135bec]'
                    : 'text-gray-400 hover:text-[#135bec]'
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 text-center py-3 font-semibold transition-colors ${
                  activeTab === 'register'
                    ? 'text-[#135bec] border-b-2 border-[#135bec]'
                    : 'text-gray-400 hover:text-[#135bec]'
                }`}
              >
                Crear cuenta
              </button>
            </div>

            {/* Sign In Form */}
            {activeTab === 'signin' && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                      placeholder="nombre@empresa.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold">Contraseña</label>
                      <a className="text-xs font-bold text-[#135bec] hover:underline" href="#">

                      </a>
                    </div>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                      placeholder="••••••••"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#135bec] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-[#135bec]/20"
                >
                  {isLoading ? "Signing In..." : "Iniciar sesión"}
                </button>

              </form>
            )}

            {/* Register Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre</label>
                      <input
                        type="text"
                        value={registerData.firstname}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, firstname: e.target.value }))}
                        className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                        placeholder="Juan"
                      />
                      {errors.firstname && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstname}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Apellido</label>
                      <input
                        type="text"
                        value={registerData.lastname}
                        onChange={(e) => setRegisterData(prev => ({ ...prev, lastname: e.target.value }))}
                        className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                        placeholder="Pérez"
                      />
                      {errors.lastname && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastname}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Fecha de nacimiento</label>
                    <input
                      type="date"
                      value={registerData.birthdate}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, birthdate: e.target.value }))}
                      className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                      placeholder="nombre@empresa.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Contraseña</label>
                    <input
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full bg-[#f6f6f8] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/50 placeholder:text-gray-400"
                      placeholder="Crea una contraseña segura"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={registerData.agreeTerms}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                      className="mt-1 w-4 h-4 rounded border-gray-300 text-[#135bec] focus:ring-[#135bec]/20"
                    />
                    <label className="text-xs text-gray-500 leading-normal" htmlFor="terms">
                      Acepto los <a className="text-[#135bec] font-bold" href="#">Términos del servicio</a> y la{' '}
                      <a className="text-[#135bec] font-bold" href="#">Política de privacidad</a>.
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#135bec] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-[#135bec]/20"
                >
                  {isLoading ? "Creating Account..." : "Crear cuenta"}
                </button>

                {/* Social Register */}

              </form>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
              <p className="text-xs text-gray-400">
                © 2026 TechStore Electronics. Professional Ecommerce Suite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
