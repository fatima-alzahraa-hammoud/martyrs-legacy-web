import React from "react";
import { Heart, Users, Mail, Phone, MessageCircle, Facebook, Twitter, Instagram, Star, Shield, Crown } from "lucide-react";

// Mock Martyr type
interface Martyr {
    name: string;
    description: string;
    date?: string;
    age?: number;
}

const Home = () => {
    const [martyrs, setMartyrs] = React.useState<Martyr[]>([
        {
            name: "أحمد محمد الشهيد",
            description: "استشهد في سبيل الدفاع عن الوطن، كان مثالاً للشجاعة والتضحية",
            date: "2024-01-15",
            age: 28
        },
        {
            name: "فاطمة علي الشهيدة",
            description: "ضحت بحياتها من أجل حماية المدنيين الأبرياء",
            date: "2024-02-10",
            age: 32
        },
        {
            name: "محمد حسن الشهيد",
            description: "قائد شجاع استشهد وهو يدافع عن أرضه وشعبه",
            date: "2024-03-05",
            age: 35
        }
    ]);

    const [contactForm, setContactForm] = React.useState({
        name: "",
        email: "",
        message: ""
    });

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact form submitted:", contactForm);
        // Reset form
        setContactForm({ name: "", email: "", message: "" });
    };

    const handleInputChange = (field: keyof typeof contactForm, value: string) => {
        setContactForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
            {/* Header Section */}
            <header className="relative bg-gradient-to-r from-amber-100 to-orange-100 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse mb-6">
                        <Crown className="h-12 w-12 text-amber-700" />
                        <h1 className="text-4xl md:text-6xl font-bold text-amber-800 leading-tight">
                            إرث الشّهداء
                        </h1>
                        <Crown className="h-12 w-12 text-amber-700" />
                    </div>
                    <p className="text-xl md:text-2xl text-amber-700 mb-8 leading-relaxed max-w-4xl mx-auto">
                        هم السابقون ونحن على الدرب، نستلهم منهم الإيمان والثبات والتضحية
                    </p>
                    
                    <div className="relative mt-12 max-w-3xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-amber-200">
                            <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
                                <Heart className="h-16 w-16 text-amber-600" />
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-amber-800 mb-2">ذكرى خالدة</h3>
                                    <p className="text-amber-600">في قلوبنا وضمائرنا</p>
                                </div>
                                <Shield className="h-16 w-16 text-amber-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* About Us Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-amber-800 mb-6">من نحن؟</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-center mb-6">
                                <Users className="h-12 w-12 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">مهمتنا</h3>
                            <p className="text-amber-700 text-center leading-relaxed">
                                نحن مجموعة من الشباب المؤمنين الذين يسعون للحفاظ على إرث الشهداء وتخليد ذكراهم.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-center mb-6">
                                <Heart className="h-12 w-12 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">رؤيتنا</h3>
                            <p className="text-amber-700 text-center leading-relaxed">
                                ببساطة، نحن هنا لنخلد ذكرى الشهداء الذين ضحوا بحياتهم من أجل الوطن. نؤمن بأن كل شهيد هو بطل يستحق أن يُذكر ويُحتفى به.
                            </p>
                        </div>
                        
                        <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200 transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-center mb-6">
                                <Shield className="h-12 w-12 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">قيمنا</h3>
                            <p className="text-amber-700 text-center leading-relaxed">
                                نحن نؤمن بأن الشهداء هم أبطالنا، وأنهم يستحقون كل الاحترام والتقدير. نحن هنا لنخلد ذكراهم ونقدم لهم التكريم الذي يستحقونه.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Al-Sayed Hasan Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-orange-100">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-amber-200">
                        <div className="text-center mb-12">
                            <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse mb-6">
                                <Star className="h-8 w-8 text-amber-600" />
                                <h2 className="text-3xl md:text-4xl font-bold text-amber-800">
                                    السيد حسن نصر الله
                                </h2>
                                <Star className="h-8 w-8 text-amber-600" />
                            </div>
                            <p className="text-xl text-amber-700 font-semibold mb-8">
                                أمين الوصايا وأوفى الناس لدماء الشهداء
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <blockquote className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-600">
                                    <p className="text-amber-800 italic text-lg leading-relaxed">
                                        "كلماته ليست خطابات... بل شيفرة حياة تُحيي أمة، وتوقظ الوعي، وتُرعب العدو."
                                    </p>
                                </blockquote>
                                
                                <blockquote className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-600">
                                    <p className="text-amber-800 italic text-lg leading-relaxed">
                                        "من حقه علينا أن نقول: هذا القائد من معدن الشهداء."
                                    </p>
                                </blockquote>
                                
                                <blockquote className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-600">
                                    <p className="text-amber-800 italic text-lg leading-relaxed">
                                        "عاش بينهم، وواصل دربهم، وجعل دماءهم منارًا للأمة."
                                    </p>
                                </blockquote>
                            </div>
                            
                            <div className="space-y-6">
                                <blockquote className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-600">
                                    <p className="text-amber-800 italic text-lg leading-relaxed">
                                        "من حقه علينا أن نُعلّم أبناءنا من هو السيد."
                                    </p>
                                </blockquote>
                                
                                <blockquote className="bg-amber-50 p-6 rounded-2xl border-l-4 border-amber-600">
                                    <p className="text-amber-800 italic text-lg leading-relaxed">
                                        "لكي يعرفوا أن الشجاعة ليست كلمة، بل موقف... وأن الوفاء ليس شعارًا، بل حياة."
                                    </p>
                                </blockquote>
                                
                                <div className="bg-amber-200/50 p-8 rounded-2xl text-center">
                                    <Crown className="h-16 w-16 text-amber-700 mx-auto mb-4" />
                                    <p className="text-amber-800 font-semibold text-lg">
                                        صورة للسيد حسن مع الشهداء
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Martyrs Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-amber-800 mb-6">آخر الشهداء المضافين</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
                        <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
                            هنا تجدون آخر الشهداء الذين تم إضافتهم إلى موقعنا. نحن نعمل جاهدين لتحديث قاعدة بياناتنا بشكل دوري لضمان تقديم المعلومات الأكثر دقة وشمولية.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {martyrs.map((martyr, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200 hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-amber-100 p-4 rounded-full">
                                        <Heart className="h-8 w-8 text-amber-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">{martyr.name}</h3>
                                <p className="text-amber-700 text-center leading-relaxed mb-4">{martyr.description}</p>
                                {martyr.date && (
                                    <div className="text-center space-y-2">
                                        <p className="text-amber-600 text-sm">تاريخ الاستشهاد: {martyr.date}</p>
                                        {martyr.age && <p className="text-amber-600 text-sm">العمر: {martyr.age} سنة</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-orange-100">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-amber-800 mb-6">تواصل معنا</h2>
                        <div className="w-24 h-1 bg-amber-600 mx-auto mb-8"></div>
                        <p className="text-xl text-amber-700 leading-relaxed">
                            إذا كان لديك أي استفسارات أو اقتراحات، فلا تتردد في التواصل معنا. نحن هنا للاستماع إليك ومساعدتك.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-amber-200">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                    الاسم:
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="block w-full pr-10 pl-3 py-3 border border-amber-200 rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="أدخل اسمك"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                    البريد الإلكتروني:
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="block w-full pr-10 pl-3 py-3 border border-amber-200 rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                        placeholder="أدخل بريدك الإلكتروني"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-2 text-right">
                                    الرسالة:
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 right-0 pr-3 pointer-events-none">
                                        <MessageCircle className="h-5 w-5 text-amber-500" />
                                    </div>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={contactForm.message}
                                        onChange={(e) => handleInputChange('message', e.target.value)}
                                        className="block w-full pr-10 pl-3 py-3 border border-amber-200 rounded-lg text-right placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                        placeholder="اكتب رسالتك هنا"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <button
                                onClick={handleContactSubmit}
                                className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                <Mail className="h-5 w-5" />
                                <span>إرسال</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-amber-800 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 text-center md:text-right">
                        <div>
                            <div className="flex justify-center md:justify-start items-center space-x-2 rtl:space-x-reverse mb-4">
                                <Heart className="h-8 w-8 text-amber-200" />
                                <h3 className="text-xl font-bold">ذكرى الشهداء</h3>
                            </div>
                            <p className="text-amber-200 leading-relaxed">
                                نخلد ذكرى الشهداء الأبرار الذين ضحوا بحياتهم من أجل الوطن والأمة
                            </p>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-amber-200">تابعونا</h4>
                            <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                                <a href="#" className="bg-amber-700 p-3 rounded-full hover:bg-amber-600 transition-colors">
                                    <Facebook className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-amber-700 p-3 rounded-full hover:bg-amber-600 transition-colors">
                                    <Twitter className="h-5 w-5" />
                                </a>
                                <a href="#" className="bg-amber-700 p-3 rounded-full hover:bg-amber-600 transition-colors">
                                    <Instagram className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-lg font-semibold mb-4 text-amber-200">تواصل معنا</h4>
                            <div className="space-y-2 text-amber-200">
                                <div className="flex items-center justify-center md:justify-start space-x-2 rtl:space-x-reverse">
                                    <Mail className="h-4 w-4" />
                                    <span>info@martyrs.com</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-2 rtl:space-x-reverse">
                                    <Phone className="h-4 w-4" />
                                    <span>+961 XX XXX XXX</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-amber-700 mt-8 pt-8 text-center">
                        <p className="text-amber-200">
                            جميع الحقوق محفوظة &copy; 2024 - موقع ذكرى الشهداء
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;