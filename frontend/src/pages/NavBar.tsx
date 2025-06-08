import React from "react";

const NavBar: React.FC = () => {

    return(
        <div>
            {/* nav bar */}
            <nav>
                <ul>
                    <li><a href="">الصفحة الرئيسيّة</a></li>
                    <li><a href="">الشهداء</a></li>
                    <li><a href="">الأمين على قلوبنا</a></li>
                    <li><a href="">صفحتي</a></li>
                    <li><a href="">تواصل معنا</a></li>
                </ul>

                <button>تسجيل الدّخول</button>
                <button>إنشاء حساب جديد</button>
            </nav>
        </div>
    );
}

export default NavBar;