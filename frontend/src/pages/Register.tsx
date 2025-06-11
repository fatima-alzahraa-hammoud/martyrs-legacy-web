import React, { useState, useEffect } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";
import martyrImage from "../assets/images/martyr_register.jpg"; 
import martyrLogo from "../../public/images/martyrs-legacy-logo-removebg.png";
import { Eye, EyeOff, Heart, Lock, Mail, Phone, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Errors  {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
    phone_number?: string;
};

const Register: React.FC = () => {
    const [form, setRegisterForm] = useState({
        name:"",
        email: "",
        password: "",
        phone_number:"",
        password_confirmation: "",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animations on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const validateForm = () => {
        const newErrors: Errors = {};

        if (!form.name.trim()) {
            newErrors.name = "الاسم مطلوب";
        }

        if (!form.email.trim()) {
            newErrors.email = "البريد الإلكتروني مطلوب";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "البريد الإلكتروني غير صحيح";
        }

        if (!form.password) {
            newErrors.password = "كلمة المرور مطلوبة";
        } else if (form.password.length < 8) {
            newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
        }

        if (!form.password_confirmation) {
            newErrors.password_confirmation = "تأكيد كلمة المرور مطلوب";
        } else if (form.password !== form.password_confirmation) {
            newErrors.password_confirmation = "كلمات المرور غير متطابقة";
        }

        if (!form.phone_number.trim()) {
            newErrors.phone_number = "رقم الهاتف مطلوب";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const Register = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const response = await requestApi({
                route: "auth/register",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            console.log(response);
            if (response.status === "success") {
                sessionStorage.setItem("token", response.token);
                navigate('/martyrs');
            }
            else{
                console.log("hello world")
            }
        } catch (error : any) {
            // handle error if needed
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (field: keyof Errors, value: string) => {
        setRegisterForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: "" }));
        }
    };
    
    return(
        <div className="min-h-screen flex overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 right-1/4 w-2 h-2 bg-amber-400/30 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-orange-400/40 rounded-full animate-ping delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-yellow-400/20 rounded-full animate-pulse delay-3000"></div>
                <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-amber-500/30 rounded-full animate-bounce delay-4000"></div>
            </div>

            {/* Left Side - Register Form */}
            <div className="flex-1 lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
                {/* Enhanced background decorative elements for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden">
                    <div className="absolute top-20 right-10 w-32 h-32 bg-amber-200/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 right-1/2 w-20 h-20 bg-yellow-200/15 rounded-full blur-lg animate-ping delay-2000"></div>
                </div>

                <div className={`w-full max-w-md relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
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
                            انضم إلى حفظ آثار الشهداء
                        </h1>
                        <p className="text-amber-700/70 text-sm animate-pulse">
                            إنشاء حساب جديد لحفظ ذكرى الأبرار الأبرار
                        </p>
                    </div>

                    {/* Main form card with enhanced animations */}
                    <div className={`bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200/50 p-8 transform transition-all duration-1000 delay-700 hover:shadow-3xl hover:-translate-y-1 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                        <div className="space-y-6">
                            {/* Name field */}
                            <div className={`space-y-2 transition-all duration-600 delay-800 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label htmlFor="name" className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700">
                                    الاسم الكامل
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-amber-500 transition-colors duration-300 group-hover:text-amber-700" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={`w-full pr-12 pl-4 py-3 bg-amber-50/50 border rounded-xl text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300 ${
                                            errors.name ? 'border-red-300 bg-red-50/50' : 'border-amber-200'
                                        }`}
                                        placeholder="أدخل اسمك الكامل"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                                {errors.name && <p className="text-sm text-red-600 text-right animate-pulse">{errors.name}</p>}
                            </div>

                            {/* Email field */}
                            <div className={`space-y-2 transition-all duration-600 delay-900 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label htmlFor="email" className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700">
                                    البريد الإلكتروني
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-amber-500 transition-colors duration-300 group-hover:text-amber-700" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`w-full pr-12 pl-4 py-3 bg-amber-50/50 border rounded-xl text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300 ${
                                            errors.email ? 'border-red-300 bg-red-50/50' : 'border-amber-200'
                                        }`}
                                        placeholder="أدخل بريدك الإلكتروني"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                                {errors.email && <p className="text-sm text-red-600 text-right animate-pulse">{errors.email}</p>}
                            </div>

                            {/* Phone field */}
                            <div className={`space-y-2 transition-all duration-600 delay-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label htmlFor="phone_number" className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700">
                                    رقم الهاتف
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-amber-500 transition-colors duration-300 group-hover:text-amber-700" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone_number"
                                        name="phone_number"
                                        value={form.phone_number}
                                        onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                        className={`w-full pr-12 pl-4 py-3 bg-amber-50/50 border rounded-xl text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300 ${
                                            errors.phone_number ? 'border-red-300 bg-red-50/50' : 'border-amber-200'
                                        }`}
                                        placeholder="أدخل رقم هاتفك"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                                {errors.phone_number && <p className="text-sm text-red-600 text-right animate-pulse">{errors.phone_number}</p>}
                            </div>

                            {/* Password field */}
                            <div className={`space-y-2 transition-all duration-600 delay-1100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label htmlFor="password" className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700">
                                    كلمة المرور
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-amber-500 transition-colors duration-300 group-hover:text-amber-700" />
                                    </div>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-amber-500 hover:text-amber-700 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                                        >
                                            <div className="transition-transform duration-200 hover:rotate-12">
                                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </div>
                                        </button>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={form.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`w-full pr-12 pl-12 py-3 bg-amber-50/50 border rounded-xl text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300 ${
                                            errors.password ? 'border-red-300 bg-red-50/50' : 'border-amber-200'
                                        }`}
                                        placeholder="أدخل كلمة المرور"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                                {errors.password && <p className="text-sm text-red-600 text-right animate-pulse">{errors.password}</p>}
                            </div>
                            
                            {/* Confirm Password field */}
                            <div className={`space-y-2 transition-all duration-600 delay-1200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                                <label htmlFor="confirm-password" className="block text-sm font-semibold text-amber-900 text-right transition-colors duration-300 hover:text-amber-700">
                                    تأكيد كلمة المرور
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-amber-500 transition-colors duration-300 group-hover:text-amber-700" />
                                    </div>
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="text-amber-500 hover:text-amber-700 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
                                        >
                                            <div className="transition-transform duration-200 hover:rotate-12">
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                            </div>
                                        </button>
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirm-password"
                                        name="confirm-password"
                                        value={form.password_confirmation}
                                        onChange={(e) => handleInputChange('password_confirmation', e.target.value)}
                                        className={`w-full pr-12 pl-12 py-3 bg-amber-50/50 border rounded-xl text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 hover:bg-amber-50/70 focus:scale-[1.02] focus:shadow-lg group-hover:border-amber-300 ${
                                            errors.password_confirmation ? 'border-red-300 bg-red-50/50' : 'border-amber-200'
                                        }`}
                                        placeholder="أعد إدخال كلمة المرور"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/0 to-orange-400/0 group-hover:from-amber-400/5 group-hover:to-orange-400/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                                {errors.password_confirmation && <p className="text-sm text-red-600 text-right animate-pulse">{errors.password_confirmation}</p>}
                            </div>

                            {/* Submit Button */}
                            <div
                                onClick={Register}
                                className={`w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 shadow-lg cursor-pointer text-center hover:shadow-xl active:scale-95 relative overflow-hidden group ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} transition-all delay-1300`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                <div className="relative z-10 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>جاري التسجيل...</span>
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="h-5 w-5" />
                                            <span>إنشاء حساب جديد</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className={`text-center pt-4 transition-all duration-600 delay-1400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                <p className="text-amber-700">
                                    هل لديك حساب بالفعل؟{' '}
                                    <a
                                        href="/login"
                                        className="text-amber-600 hover:text-amber-800 font-semibold transition-all duration-300 hover:underline hover:scale-105 active:scale-95 relative group"
                                    >
                                        <span className="relative z-10">تسجيل الدخول</span>
                                        <div className="absolute inset-0 bg-amber-100 rounded opacity-0 group-hover:opacity-30 transition-opacity duration-300 -m-1"></div>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer with heart icon */}
                    <div className={`text-center mt-8 opacity-70 transition-all duration-800 delay-1500 ${isVisible ? 'translate-y-0 opacity-70' : 'translate-y-5 opacity-0'}`}>
                        <div className="flex items-center justify-center text-amber-600 group cursor-pointer">
                            <Heart className="w-4 h-4 mr-1 fill-current animate-pulse group-hover:animate-bounce transition-colors duration-300 group-hover:text-red-500" />
                            <span className="text-sm transition-all duration-300 group-hover:text-amber-800 group-hover:scale-105">
                                مشروع إرث الشهداء
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image Section with parallax effect */}
            <div className={`hidden lg:flex lg:w-1/2 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-amber-900/20 z-10"></div>
                <img 
                    src={martyrImage} 
                    alt="شهيد" 
                    className="w-full h-full object-cover transform transition-transform duration-[3000ms] hover:scale-105"
                />
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

export default Register;