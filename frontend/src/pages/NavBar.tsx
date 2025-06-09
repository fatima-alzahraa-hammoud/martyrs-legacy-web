import React, { useState } from "react";
import { Menu, X, Heart, Users, Home, User, Phone, LogIn, UserPlus } from "lucide-react";
import martyrLogo from "../../public/images/martyrs-legacy-logo-removebg.png";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg border-b border-amber-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <img src={martyrLogo} className="w-10 h-10 text-white" />
                        <span className="text-xl font-bold text-amber-800 font-arabic">
                            إرث الشهداء
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8 rtl:space-x-reverse">
                            <a 
                                href="/" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Home className="h-4 w-4" />
                                <span>الصفحة الرئيسيّة</span>
                            </a>
                            <a 
                                href="/martyrs" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Users className="h-4 w-4" />
                                <span>الشهداء الأبرار</span>
                            </a>
                            <a 
                                href="/guardian" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Heart className="h-4 w-4" />
                                <span>الأمين على قلوبنا</span>
                            </a>
                            <a 
                                href="/profile" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <User className="h-4 w-4" />
                                <span>صفحتي</span>
                            </a>
                            <a 
                                href="/contact" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Phone className="h-4 w-4" />
                                <span>تواصل معنا</span>
                            </a>
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <a 
                            href="/login"
                            className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                        >
                            <LogIn className="h-4 w-4" />
                            <span>تسجيل الدّخول</span>
                        </a>
                        <a 
                            href="/register"
                            className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-md text-sm"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>إنشاء حساب جديد</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-amber-700 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 p-2 rounded-md"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-amber-25 border-t border-amber-200">
                            <a 
                                href="/" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                <span>الصفحة الرئيسيّة</span>
                            </a>
                            <a 
                                href="/martyrs" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Users className="h-5 w-5" />
                                <span>الشهداء الأبرار</span>
                            </a>
                            <a 
                                href="/guardian" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Heart className="h-5 w-5" />
                                <span>الأمين على قلوبنا</span>
                            </a>
                            <a 
                                href="/profile" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="h-5 w-5" />
                                <span>صفحتي</span>
                            </a>
                            <a 
                                href="/contact" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Phone className="h-5 w-5" />
                                <span>تواصل معنا</span>
                            </a>
                            
                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 space-y-2">
                                <a 
                                    href="/login"
                                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-3 rounded-lg transition-colors duration-200 font-medium w-full text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>تسجيل الدّخول</span>
                                </a>
                                <a 
                                    href="/register"
                                    className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md w-full text-sm"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>إنشاء حساب جديد</span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;