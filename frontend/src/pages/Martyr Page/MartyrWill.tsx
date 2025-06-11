import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Calendar, Heart, Scroll, MessageCircle } from "lucide-react";
import type { MartyrWill } from "../../types/types";

const recipientLabels: Record<string, string> = {
    mother: "الأم",
    father: "الأب",
    wife: "الزوجة",
    husband: "الزوج",
    son: "الابن",
    daughter: "الابنة",
    brother: "الأخ",
    sister: "الأخت",
    uncle: "العم",
    aunt: "العمة",
    general_public: "الجمهور العام",
};

const recipientIcons: Record<string, React.ReactElement> = {
    mother: <Heart className="h-5 w-5 text-pink-600" />,
    father: <Heart className="h-5 w-5 text-blue-600" />,
    wife: <Heart className="h-5 w-5 text-red-600" />,
    husband: <Heart className="h-5 w-5 text-red-600" />,
    son: <Heart className="h-5 w-5 text-green-600" />,
    daughter: <Heart className="h-5 w-5 text-purple-600" />,
    brother: <Heart className="h-5 w-5 text-indigo-600" />,
    sister: <Heart className="h-5 w-5 text-purple-600" />,
    uncle: <Heart className="h-5 w-5 text-gray-600" />,
    aunt: <Heart className="h-5 w-5 text-gray-600" />,
    general_public: <MessageCircle className="h-5 w-5 text-amber-600" />,
};

const WillPage: React.FC = () => {
    const [will, setWill] = useState<MartyrWill | null>(null);
    const [parsedContent, setParsedContent] = useState<Record<string, string>>({});

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
            {/* Back Navigation */}
            <div className="p-6">
                <Link 
                    to="/martyrs"
                    className="inline-flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-800 transition-colors duration-200"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium font-arabic">العودة إلى صفحة الشهيد</span>
                </Link>
            </div>

            <div className="container mx-auto px-6 pb-12">
                {/* Header Section */}
                <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border border-amber-200">
                    <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center shadow-lg">
                        <Scroll className="h-10 w-10 text-amber-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
                        {will?.title || "وصية الشهيد"}
                    </h1>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-amber-600 text-lg leading-relaxed font-arabic">
                            {will?.description || "كلمات أخيرة من قلب مؤمن، وصايا خالدة تحمل في طياتها حب الوطن والأهل"}
                        </p>
                    </div>
                    <div className="mt-6 inline-block bg-amber-600 text-white px-6 py-2 rounded-full text-lg font-medium shadow-lg">
                        <span className="font-arabic">وصية مقدسة</span>
                    </div>
                </header>

                {/* Will Content Section */}
                <section className="bg-white rounded-2xl shadow-xl border border-amber-200 p-8 mb-8">
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
                        <FileText className="h-6 w-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-amber-800 font-arabic">محتوى الوصية</h2>
                    </div>

                    {Object.keys(parsedContent).length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                                <Scroll className="h-12 w-12 text-amber-400" />
                            </div>
                            <p className="text-amber-600 text-lg font-arabic mb-4">
                                لا توجد رسائل متاحة حالياً
                            </p>
                            <p className="text-amber-500 font-arabic">
                                محتوى الوصية لم يتم تحميله بعد
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(parsedContent).map(([recipient, message], index) => (
                                <div
                                    key={recipient}
                                    className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-2xl p-8 shadow-lg border border-amber-200 transform hover:scale-102 transition-all duration-300"
                                >
                                    {/* Recipient Header */}
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                        <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md">
                                            {recipientIcons[recipient] || <Heart className="h-5 w-5 text-amber-600" />}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-amber-800 font-arabic">
                                                إلى {recipientLabels[recipient] || recipient}
                                            </h3>
                                            <div className="w-16 h-1 bg-amber-400 rounded-full mt-1"></div>
                                        </div>
                                    </div>

                                    {/* Message Content */}
                                    <div className="bg-white rounded-xl p-6 shadow-md border-r-4 border-amber-500">
                                        <p className="text-amber-800 text-lg leading-relaxed font-arabic whitespace-pre-line">
                                            {message}
                                        </p>
                                    </div>

                                    {/* Decorative Element */}
                                    <div className="flex justify-center mt-4">
                                        <div className="w-8 h-1 bg-amber-300 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Will Footer/Date */}
                <footer className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 p-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
                            <Calendar className="h-6 w-6 text-amber-600" />
                            <h3 className="text-xl font-bold text-amber-800 font-arabic">تاريخ الوصية</h3>
                        </div>
                        <p className="text-amber-700 text-lg font-arabic mb-6">
                            {will?.date
                                ? new Date(will.date).toLocaleDateString("ar-EG", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })
                                : "غير متوفر"
                            }
                        </p>
                        
                        {/* Memorial Quote */}
                        <div className="border-t border-amber-200 pt-6">
                            <p className="text-amber-600 italic text-lg font-arabic leading-relaxed">
                                "الوصايا كلمات من ذهب، تبقى خالدة في القلوب وتضيء دروب الأجيال"
                            </p>
                        </div>
                    </div>
                </footer>

                {/* Sacred Message */}
                <div className="text-center mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 shadow-md border border-red-200">
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                        <Heart className="h-5 w-5 text-red-600" />
                        <p className="text-red-700 font-bold font-arabic">
                            رحمة الله على أرواحهم الطاهرة، وجعل كلماتهم نوراً يضيء طريقنا
                        </p>
                        <Heart className="h-5 w-5 text-red-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WillPage;
