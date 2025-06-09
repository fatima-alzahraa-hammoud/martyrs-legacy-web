import React, { useState } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";
import martyrImage from "../assets/images/martyr_login.jpg"; 
import martyrLogo from "../../public/images/martyrs-legacy-logo-removebg.png";
import { Eye, EyeOff, Heart } from "lucide-react"; 

const Login: React.FC = () => {

    const [form, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");   

    const login = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        console.log("Login function called");

        try {
            const response = await requestApi({
                route: "auth/login",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            console.log(response.data.message);
            
        } catch (error : any) {
            
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex">
            {/* Left Side - Image Section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img src={martyrImage} alt="شهيد" />
            </div>
            
            {/* Right Side - Login Form */}
            <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                {/* Background decorative elements for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                </div>

                <div className="w-full max-w-md relative">
                    {/* Header with Arabic styling */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-16 h-16 transform transition-all duration-500 hover:scale-110 hover:rotate-3">
                            <img src={martyrLogo} className="w-3xl h-3xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-amber-900 mb-2 animate-slide-up">
                            أهلًا وسهلًا بعودتك
                        </h1>
                        <p className="text-amber-700/70 text-sm animate-slide-up delay-100">
                            تسجيل الدخول إلى عالم الشهداء
                        </p>
                    </div>

                    {/* Main form card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-200/50 p-8 transform transition-all duration-500 hover:shadow-3xl animate-slide-up delay-200">
                        <div className="space-y-6">
                        {/* Email field */}
                        <div className="space-y-2 animate-slide-up delay-300">
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-semibold text-amber-900 text-right"
                            >
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
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
                                    className="w-full px-4 py-3 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right placeholder-amber-400 transition-all duration-300 hover:bg-amber-50/70 focus:scale-105"
                                />
                            </div>
                        </div>
                        {/* Password field */}
                        <div className="space-y-2 animate-slide-up delay-400">
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-semibold text-amber-900 text-right"
                            >
                                كلمة المرور
                            </label>
                            <div className="relative">
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
                                    className="w-full px-4 py-3 pr-12 bg-amber-50/50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right placeholder-amber-400 transition-all duration-300 hover:bg-amber-50/70 focus:scale-105"
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-all duration-200 cursor-pointer hover:scale-110"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                        ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Remember me and forgot password */}
                        <div className="flex items-center justify-between animate-slide-up delay-500">
                            <a
                                href="/forgot-password"
                                className="text-sm text-amber-600 hover:text-amber-800 font-medium transition-all duration-200 hover:underline hover:scale-105"
                            >
                                نسيت كلمة المرور؟
                            </a>
                            <div className="flex items-center">
                                <label
                                    htmlFor="rememberMe"
                                    className="text-sm text-amber-700 font-medium mr-2 cursor-pointer hover:text-amber-900 transition-colors duration-200"
                                >
                                    تذكرني
                                </label>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="w-4 h-4 text-amber-600 bg-amber-50 border-amber-300 rounded focus:ring-amber-500 focus:ring-2 transition-all duration-200 hover:scale-110"
                            />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div
                            onClick={login}
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg cursor-pointer text-center animate-slide-up delay-600 hover:shadow-xl active:scale-95"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    جاري تسجيل الدخول...
                                </div>
                            ) : (
                                "تسجيل الدخول"
                            )}
                        </div>

                        {/* Message display */}
                        {message && (
                            <div className="text-center p-3 bg-amber-100 border border-amber-300 rounded-xl animate-fade-in">
                                <p className="text-amber-800 text-sm font-medium">{message}</p>
                            </div>
                        )}
                            {/* Sign up link */}
                        <div className="text-center pt-4 animate-slide-up delay-700">
                            <p className="text-amber-700">
                                ليس لديك حساب؟{" "}
                            <a
                                href="/register"
                                className="text-amber-600 hover:text-amber-800 font-semibold transition-all duration-200 hover:underline hover:scale-105"
                            >
                                إنشاء حساب جديد
                            </a>
                            </p>
                        </div>
                        </div>
                    </div>

                    {/* Footer with heart icon */}
                    <div className="text-center mt-8 opacity-70 animate-fade-in delay-1000">
                        <div className="flex items-center justify-center text-amber-600">
                            <Heart className="w-4 h-4 mr-1 fill-current animate-pulse" />
                            <span className="text-sm">مشروع إرث الشهداء</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;