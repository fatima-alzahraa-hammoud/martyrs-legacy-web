import React, { useState } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";

const Register: React.FC = () => {

  const [form, setRegisterForm] = useState({
        name:"",
        email: "",
        password: "",
        phone_number:"",
        confirm_password: "",
    });

    const Register = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        console.log("Register function called");

        try {
            const response = await requestApi({
                route: "auth/register",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            console.log(response.data.message);
            
        } catch (error : any) {
            
        }
    }
     return(
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse mb-4">
                        <Heart className="h-8 w-8 text-amber-700" />
                        <h1 className="text-2xl font-bold text-amber-800">ذكرى الشهداء</h1>
                    </div>
                    <h2 className="text-xl font-semibold text-amber-700 mb-2">إنشاء حساب جديد</h2>
                    <p className="text-amber-600">انضم إلينا لتكريم ذكرى الشهداء الأبرار</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-amber-200">
                    <div className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                الاسم الكامل
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-amber-500" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className={`block w-full pr-10 pl-3 py-3 border rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                                        errors.name ? 'border-red-300 bg-red-50' : 'border-amber-200 focus:bg-white'
                                    }`}
                                    placeholder="أدخل اسمك الكامل"
                                    required
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-sm text-red-600 text-right">{errors.name}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                البريد الإلكتروني
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-amber-500" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`block w-full pr-10 pl-3 py-3 border rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                                        errors.email ? 'border-red-300 bg-red-50' : 'border-amber-200 focus:bg-white'
                                    }`}
                                    placeholder="أدخل بريدك الإلكتروني"
                                    required
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-sm text-red-600 text-right">{errors.email}</p>}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                رقم الهاتف
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-amber-500" />
                                </div>
                                <input
                                    type="tel"
                                    id="phone_number"
                                    name="phone_number"
                                    value={form.phone_number}
                                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                                    className={`block w-full pr-10 pl-3 py-3 border rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                                        errors.phone_number ? 'border-red-300 bg-red-50' : 'border-amber-200 focus:bg-white'
                                    }`}
                                    placeholder="أدخل رقم هاتفك"
                                    required
                                />
                            </div>
                            {errors.phone_number && <p className="mt-1 text-sm text-red-600 text-right">{errors.phone_number}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                كلمة المرور
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-amber-500" />
                                </div>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-amber-500 hover:text-amber-700 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`block w-full pr-10 pl-10 py-3 border rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                                        errors.password ? 'border-red-300 bg-red-50' : 'border-amber-200 focus:bg-white'
                                    }`}
                                    placeholder="أدخل كلمة المرور"
                                    required
                                />
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600 text-right">{errors.password}</p>}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                تأكيد كلمة المرور
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-amber-500" />
                                </div>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-amber-500 hover:text-amber-700 focus:outline-none"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    name="confirm-password"
                                    value={form.confirm_password}
                                    onChange={(e) => handleInputChange('confirm_password', e.target.value)}
                                    className={`block w-full pr-10 pl-10 py-3 border rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
                                        errors.confirm_password ? 'border-red-300 bg-red-50' : 'border-amber-200 focus:bg-white'
                                    }`}
                                    placeholder="أعد إدخال كلمة المرور"
                                    required
                                />
                            </div>
                            {errors.confirm_password && <p className="mt-1 text-sm text-red-600 text-right">{errors.confirm_password}</p>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            onClick={handleRegister}
                            className={`w-full flex items-center justify-center space-x-2 rtl:space-x-reverse py-3 px-4 border border-transparent rounded-lg text-white font-medium transition-all duration-200 ${
                                isLoading
                                    ? 'bg-amber-400 cursor-not-allowed'
                                    : 'bg-amber-600 hover:bg-amber-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}
                        >
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
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-amber-600">
                            هل لديك حساب بالفعل؟{' '}
                            <a
                                href="/login"
                                className="font-medium text-amber-700 hover:text-amber-800 hover:underline transition-colors"
                            >
                                تسجيل الدخول
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
     )
}
export default Register;



