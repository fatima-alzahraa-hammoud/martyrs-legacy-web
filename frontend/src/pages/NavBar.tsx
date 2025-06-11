import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Heart, Users, Home, User, Phone, LogIn, UserPlus, LogOut, ChevronDown } from "lucide-react";
import martyrLogo from "../../public/images/martyrs-legacy-logo-removebg.png";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface User {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
}

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to decode JWT and extract user info
    const decodeJWT = (token: string) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error decoding JWT:', error);
            return null;
        }
    };

    // Check authentication status on component mount and location change
    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem("token");
            if (token) {
                const decodedToken = decodeJWT(token);
                if (decodedToken) {
                    // Check if token is expired
                    const currentTime = Date.now() / 1000;
                    if (decodedToken.exp && decodedToken.exp > currentTime) {
                        setUser({
                            id: decodedToken.id || decodedToken.userId,
                            name: decodedToken.name || decodedToken.username,
                            email: decodedToken.email
                        });
                    } else {
                        // Token expired, remove it
                        sessionStorage.removeItem("token");
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [location]); // Add location dependency to re-check on route changes

    // Get user's first name initial
    const getUserInitial = () => {
        if (user && user.name) {
            return user.name.charAt(0).toUpperCase();
        }
        return user?.email?.charAt(0).toUpperCase() || 'U';
    };

    // Handle logout
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        setIsMenuOpen(false);
        setIsProfileDropdownOpen(false);
        navigate('/');
    };

    // Public method to refresh user state (can be called from login component)
    const refreshUserState = () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const decodedToken = decodeJWT(token);
            if (decodedToken) {
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp && decodedToken.exp > currentTime) {
                    setUser({
                        id: decodedToken.id || decodedToken.userId,
                        name: decodedToken.name || decodedToken.username,
                        email: decodedToken.email
                    });
                }
            }
        }
    };

    // Listen for storage changes (for login updates)
    useEffect(() => {
        const handleStorageChange = () => {
            refreshUserState();
        };

        window.addEventListener('storage', handleStorageChange);
        // Custom event for same-tab updates
        window.addEventListener('userLoggedIn', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userLoggedIn', handleStorageChange);
        };
    }, []);

    if (isLoading) {
        return (
            <nav className="bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <img src={martyrLogo} className="w-10 h-10 text-white" />
                            <span className="text-xl font-bold text-amber-800 font-arabic">
                                إرث الشهداء
                            </span>
                        </div>
                        <div className="animate-pulse">
                            <div className="w-8 h-8 bg-amber-200 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

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
                            <Link 
                                to="/" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Home className="h-4 w-4" />
                                <span>الصفحة الرئيسيّة</span>
                            </Link>
                            <Link 
                                to="/martyrs" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Users className="h-4 w-4" />
                                <span>الشهداء الأبرار</span>
                            </Link>
                            <Link 
                                to="/al-sayed-hasan" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Heart className="h-4 w-4" />
                                <span>الأمين على قلوبنا</span>
                            </Link>
                            <a 
                                href="/contact" 
                                className="flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-900 transition-colors duration-200 font-medium text-sm"
                            >
                                <Phone className="h-4 w-4" />
                                <span>تواصل معنا</span>
                            </a>
                        </div>
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        {user ? (
                            // Authenticated user section with dropdown
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg px-3 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                >
                                    {/* User avatar circle with initial */}
                                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                                        {getUserInitial()}
                                    </div>
                                    <span className="text-amber-800 font-medium text-sm">
                                        {user.name?.split(' ')[0] || 'المستخدم'}
                                    </span>
                                    <ChevronDown className={`h-4 w-4 text-amber-600 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-amber-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                                        <div className="px-4 py-2 border-b border-amber-100">
                                            <p className="text-sm font-medium text-amber-900 text-right">{user.name || 'المستخدم'}</p>
                                            <p className="text-xs text-amber-600 text-right truncate">{user.email}</p>
                                        </div>
                                        
                                        <Link 
                                            to="/profile"
                                            className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-200"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            <span>صفحتي</span>
                                        </Link>
                                        
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>تسجيل الخروج</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Guest user section
                            <>
                                <Link 
                                    to="/login"
                                    className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                                >
                                    <LogIn className="h-4 w-4" />
                                    <span>تسجيل الدّخول</span>
                                </Link>
                                <Link 
                                    to="/register"
                                    className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium shadow-md text-sm"
                                >
                                    <UserPlus className="h-4 w-4" />
                                    <span>إنشاء حساب جديد</span>
                                </Link>
                            </>
                        )}
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
                            {/* Mobile user info (if logged in) */}
                            {user && (
                                <div className="flex items-center space-x-3 rtl:space-x-reverse px-3 py-2 bg-amber-50 rounded-md mb-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {getUserInitial()}
                                    </div>
                                    <div>
                                        <p className="text-amber-800 font-medium text-sm">
                                            أهلاً {user.name?.split(' ')[0] || 'بك'}
                                        </p>
                                        <p className="text-amber-600 text-xs">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            <Link 
                                to="/" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="h-5 w-5" />
                                <span>الصفحة الرئيسيّة</span>
                            </Link>
                            <Link 
                                to="/martyrs" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Users className="h-5 w-5" />
                                <span>الشهداء الأبرار</span>
                            </Link>
                            <Link 
                                to="/guardian" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Heart className="h-5 w-5" />
                                <span>الأمين على قلوبنا</span>
                            </Link>
                            <Link 
                                to="/contact" 
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-3 py-2 rounded-md font-medium transition-colors duration-200 text-sm"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Phone className="h-5 w-5" />
                                <span>تواصل معنا</span>
                            </Link>
                            
                            {/* Mobile Auth Buttons */}
                            <div className="pt-4 space-y-2">
                                {user ? (
                                    // Authenticated mobile buttons
                                    <>
                                        <Link 
                                            to="/profile"
                                            className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-3 rounded-lg transition-colors duration-200 font-medium w-full text-sm"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            <span>صفحتي</span>
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-red-100 hover:bg-red-200 text-red-800 px-4 py-3 rounded-lg transition-colors duration-200 font-medium w-full text-sm"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>تسجيل الخروج</span>
                                        </button>
                                    </>
                                ) : (
                                    // Guest mobile buttons
                                    <>
                                        <Link 
                                            to="/login"
                                            className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-3 rounded-lg transition-colors duration-200 font-medium w-full text-sm"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <LogIn className="h-4 w-4" />
                                            <span>تسجيل الدّخول</span>
                                        </Link>
                                        <Link 
                                            to="/register"
                                            className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-3 rounded-lg transition-colors duration-200 font-medium shadow-md w-full text-sm"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            <span>إنشاء حساب جديد</span>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;