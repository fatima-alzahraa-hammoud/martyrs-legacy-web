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

            {/* About Us */}
            <div>
                <h2>من نحن؟</h2>
                {/*squares containing about us*/}
                <p>نحن مجموعة من الشباب المؤمنين الذين يسعون للحفاظ على إرث الشهداء وتخليد ذكراهم.</p>
                <p>ببساطة، نحن هنا لنخلد ذكرى الشهداء الذين ضحوا بحياتهم من أجل الوطن. نؤمن بأن كل شهيد هو بطل يستحق أن يُذكر ويُحتفى به. من خلال هذا الموقع، نسعى لتقديم معلومات دقيقة وشاملة عن الشهداء وتاريخهم وإرثهم.</p>
                <p>نحن نؤمن بأن الشهداء هم أبطالنا، وأنهم يستحقون كل الاحترام والتقدير. نحن هنا لنخلد ذكراهم ونقدم لهم التكريم الذي يستحقونه.</p>
            </div>

            
        </div>
    );
}

export default Home;