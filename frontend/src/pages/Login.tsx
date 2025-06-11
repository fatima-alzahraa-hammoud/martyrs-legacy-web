import React, { useState, useEffect } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";
import martyrImage from "../assets/images/martyr_login.jpg"; 
import martyrLogo from "../../public/images/martyrs-legacy-logo-removebg.png";
import { Eye, EyeOff, Heart } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [form, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animations on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const login = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        setIsLoading(true);

        try {
            const response = await requestApi({
                route: "auth/login",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            if (response.status === "success") {
                sessionStorage.setItem("token", response.token);
                navigate('/martyrs');
            }
            else{
                console.log(response.message);
            }
            setMessage(response.message);
        } catch (error : any) {
            console.log("Error Catched");
        }finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="min-h-screen flex overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-1/3 left-1/6 w-1 h-1 bg-orange-400/40 rounded-full animate-ping delay-2000"></div>
                <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-yellow-400/20 rounded-full animate-pulse delay-3000"></div>
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-amber-500/30 rounded-full animate-bounce delay-4000"></div>
            </div>

            {/* Left Side - Image Section with parallax effect */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-900/20 z-10"></div>
                <img 
                    src={martyrImage} 
                    alt="شهيد" 
                    className="w-full h-full object-cover transform transition-transform duration-[3000ms] hover:scale-105"
                />
            </div>
            
            {/* Right Side - Login Form */}
            <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                {/* Enhanced background decorative elements for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-yellow-200/15 rounded-full blur-lg animate-ping delay-2000"></div>
                </div>

                <div className={`w-full max-w-md relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    {/* Header with Arabic styling */}
                    <div className={`text-center mb-8 transition-all duration-800 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center justify-center w-16 h-16 transform transition-all duration-500 hover:scale-110 hover:rotate-12 cursor-pointer">
                            <img 
                                src={martyrLogo} 
                                className="w-16 h-16 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300" 
                                alt="شعار إرث الشهداء"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-amber-900 mb-2 transition-all duration-300 hover:scale-105">
                            أهلًا وسهلًا بعودتك
                        </h1>
                        <p className="text-amber-700/70 text-sm animate-pulse">
                            تسجيل الدخول إلى عالم الشهداء
                        </p>
                    </div>

                    {/* Main form card with enhanced animations */}
                    <div className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200/50 p-8 transform transition-all duration-1000 delay-700 hover:shadow-3xl hover:-translate-y-1 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        <div className="space-y-6">
                            {/* Email field with stagger animation */}
                            <div className={`space-y-2 transition-all duration-600 delay-900 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label 
                                    htmlFor="email" 
                                    className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700"
                                >
                                    البريد الإلكتروني
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            setLoginForm((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                        required
                                        placeholder="أدخل بريدك الإلكتروني"
                                        className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right placeholder-amber-400 transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Password field with stagger animation */}
                            <div className={`space-y-2 transition-all duration-600 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label 
                                    htmlFor="password" 
                                    className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700"
                                >
                                    كلمة المرور
                                </label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={(e) =>
                                            setLoginForm((prev) => ({
                                                ...prev,
                                                password: e.target.value,
                                            }))
                                        }
                                        required
                                        placeholder="أدخل كلمة المرور"
                                        className="w-full px-4 py-3 pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right placeholder-amber-400 transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300"
                                    />
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                                    >
                                        <div className="transition-transform duration-200 hover:rotate-12">
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Remember me and forgot password with slide animation */}
                            <div className={`flex items-center justify-between transition-all duration-600 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-amber-600 hover:text-amber-800 font-medium transition-all duration-300 hover:underline hover:scale-105 active:scale-95 relative group"
                                >
                                    <span className="relative z-10">نسيت كلمة المرور؟</span>
                                    <div className="absolute inset-0 bg-amber-100 rounded opacity-0 group-hover:opacity-30 transition-opacity duration-300 -m-1"></div>
                                </a>
                                <div className="flex items-center group">
                                    <label
                                        htmlFor="rememberMe"
                                        className="text-sm text-amber-700 font-medium mr-2 cursor-pointer hover:text-amber-900 transition-colors duration-200 group-hover:scale-105"
                                    >
                                        تذكرني
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        className="w-4 h-4 text-amber-600 bg-amber-50 border-amber-300 rounded focus:ring-amber-500 focus:ring-2 transition-all duration-200 hover:scale-110 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Submit button with enhanced animations */}
                            <div
                                onClick={login}
                                className={`w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg cursor-pointer text-center hover:shadow-xl active:scale-95 relative overflow-hidden group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} transition-all delay-1200`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <div className="relative z-10">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            جاري تسجيل الدخول...
                                        </div>
                                    ) : (
                                        "تسجيل الدخول"
                                    )}
                                </div>
                            </div>

                            {/* Message display with slide animation */}
                            {message && (
                                <div className="text-center p-3 bg-amber-100 border border-amber-300 rounded-xl animate-pulse transform transition-all duration-500 hover:scale-105">
                                    <p className="text-amber-800 text-sm font-medium">{message}</p>
                                </div>
                            )}

                            {/* Sign up link with fade animation */}
                            <div className={`text-center pt-4 transition-all duration-600 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                <p className="text-amber-700">
                                    ليس لديك حساب؟{" "}
                                    <a
                                        href="/register"
                                        className="text-amber-600 hover:text-amber-800 font-semibold transition-all duration-300 hover:underline hover:scale-105 active:scale-95 relative group"
                                    >
                                        <span className="relative z-10">إنشاء حساب جديد</span>
                                        <div className="absolute inset-0 bg-amber-100 rounded opacity-0 group-hover:opacity-30 transition-opacity duration-300 -m-1"></div>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer with heart icon and enhanced animation */}
                    <div className={`text-center mt-8 opacity-70 transition-all duration-800 delay-1400 ${isVisible ? 'translate-y-0 opacity-70' : 'translate-y-5 opacity-0'}`}>
                        <div className="flex items-center justify-center text-amber-600 group cursor-pointer">
                            <Heart className="w-4 h-4 mr-1 fill-current animate-pulse group-hover:animate-bounce transition-colors duration-300 group-hover:text-red-500" />
                            <span className="text-sm transition-all duration-300 group-hover:text-amber-800 group-hover:scale-105">
                                مشروع إرث الشهداء
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out forwards;
                }
                
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
                .delay-300 { animation-delay: 0.3s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-500 { animation-delay: 0.5s; }
                .delay-600 { animation-delay: 0.6s; }
                .delay-700 { animation-delay: 0.7s; }
            `}</style>
        </div>
    );
};

export default Login;