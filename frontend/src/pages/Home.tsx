import React from "react";

type Martyr = {
        name: string;
        description: string;
};

const Home: React.FC = () => {

    const [martyrs, setMartyrs] = React.useState<Martyr[]>([]);

    return(
        <div>

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

            {/* Al-Sayed Hasan */}
            <div>
                <h2>"السيد حسن نصر الله... أمين الوصايا وأوفى الناس لدماء الشهداء"</h2>
                <p>"كلماته ليست خطابات... بل شيفرة حياة تُحيي أمة، وتوقظ الوعي، وتُرعب العدو."</p>
                <p>"من حقه علينا أن نقول: هذا القائد من معدن الشهداء."</p>
                <p>"عاش بينهم، وواصل دربهم، وجعل دماءهم منارًا للأمة."</p>
                <p>"من حقه علينا أن نُعلّم أبناءنا من هو السيد."</p>
                <p>"لكي يعرفوا أن الشجاعة ليست كلمة، بل موقف... وأن الوفاء ليس شعارًا، بل حياة."</p>

                <div>
                    <img src="" alt="صورة للسيد حسن مع الشهداء" />
                </div>
            </div>

            {/* Last Added Martyrs */}
            <div>
                <h2>آخر الشهداء المضافين</h2>
                <p>هنا تجدون آخر الشهداء الذين تم إضافتهم إلى موقعنا. نحن نعمل جاهدين لتحديث قاعدة بياناتنا بشكل دوري لضمان تقديم المعلومات الأكثر دقة وشمولية.</p>
                {/* List of martyrs */}
                <ul>
                    {martyrs.map((martyr, index) => (
                        <li key={index}>
                            <h3>{martyr.name}</h3>
                            <p>{martyr.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact us */}
            <div>
                <h2>تواصل معنا</h2>
                <p>إذا كان لديك أي استفسارات أو اقتراحات، فلا تتردد في التواصل معنا. نحن هنا للاستماع إليك ومساعدتك.</p>
                <form>
                    <div>
                        <label htmlFor="name">الاسم:</label>
                        <input type="text" id="name" name="name" required placeholder="أدخل اسمك" />
                    </div>
                    <div>
                        <label htmlFor="email">البريد الإلكتروني:</label>
                        <input type="email" id="email" name="email" required placeholder="أدخل بريدك الإلكتروني" />
                    </div>
                    <div>
                        <label htmlFor="message">الرسالة:</label>
                        <textarea id="message" name="message" required placeholder="اكتب رسالتك هنا"></textarea>
                    </div>
                    <button type="submit">إرسال</button>
                </form>
            </div>

            {/* Footer */}
            <footer>
                <p>جميع الحقوق محفوظة &copy; 2023</p>
                <p>تابعونا على وسائل التواصل الاجتماعي</p>
                <ul>
                    <li><a href="#">فيسبوك</a></li>
                    <li><a href="#">تويتر</a></li>
                    <li><a href="#">إنستغرام</a></li>
                </ul>
            </footer>
        </div>
    );
}

export default Home;