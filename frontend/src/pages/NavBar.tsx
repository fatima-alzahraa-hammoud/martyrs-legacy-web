import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
    
    const navigate = useNavigate();

    return(
        <div>
            {/* nav bar */}
            <nav>
                <ul>
                    <li><Link to="/">الصفحة الرئيسيّة</Link></li>
                    <li><Link to="">الشهداء</Link></li>
                    <li><Link to="">الأمين على قلوبنا</Link></li>
                    <li><Link to="">صفحتي</Link></li>
                    <li><Link to="">تواصل معنا</Link></li>
                </ul>

                <button onClick={() => navigate("/login")}>تسجيل الدّخول</button>
                <button onClick={() => navigate("/register")}>إنشاء حساب جديد</button>
            </nav>
        </div>
    );
}

export default NavBar;