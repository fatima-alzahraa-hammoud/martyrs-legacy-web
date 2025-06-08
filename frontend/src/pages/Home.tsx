import React from "react";

type Martyr = {
        name: string;
        description: string;
};

const Home: React.FC = () => {

    const [martyrs, setMartyrs] = React.useState<Martyr[]>([]);

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

            {/* Header Section */}
            <header>
                <p>إرث الشّهداء</p>
                <p>هم السابقون ونحن على الدرب، نستلهم منهم الإيمان والثبات والتضحية</p>

                <div>
                    <img src="" alt="الشّهداء" />
                </div>
            </header>

            
        </div>
    );
}

export default Home;