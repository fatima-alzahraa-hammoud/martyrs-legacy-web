import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, Filter, Plus, BookOpen, Calendar, ArrowRight, Image } from "lucide-react";
import Sidebar from "../SideBar";
import type { Story } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import MartyrSideBar from "./MartyrSideBar";

const MartyrStories: React.FC = () => {
    const { id } = useParams();
    const [stories, setStories] = useState<Story[]>([]);

    useEffect(() =>{
        const fetchStories = async () => {
            try {
                const response = await requestApi({
                    route: `/martyr/${id}/stories`,
                    method: requestMethods.GET,
                });

                if (response.status === "success") {
                    const data = await response.data;
                    setStories(data);
                } else {
                    console.error("Failed to fetch martyr stories:", response.message);
                }
            } catch (error) {
                console.log("Error Catched: ", error);
            }
        }

        fetchStories();
    }, [id]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
            <MartyrSideBar />
            
            <main className="flex-1 p-8">
                {/* Header Section */}
                <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                    <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
                        قصص الشهداء
                    </h1>
                    <h2 className="text-2xl font-semibold text-amber-700 mb-6 font-arabic">
                        حكايات خالدة تروي البطولة والتضحية
                    </h2>
                    <p className="text-amber-600 text-lg max-w-4xl mx-auto leading-relaxed font-arabic">
                        في هذه الصفحة نوثق لحظات خالدة من حياة الشّهيد، كما رواها من عرفوهم...
                        كل قصة تحمل في طياتها درساً في الشجاعة والإيمان والوفاء للوطن.
                    </p>
                </header>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        <Search className="h-5 w-5" />
                        <span>بحث</span>
                    </button>
                    <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        <Filter className="h-5 w-5" />
                        <span>ترتيب</span>
                    </button>
                    <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                        <Plus className="h-5 w-5" />
                        <span>أضف قصة</span>
                    </button>
                </div>

                {/* Stories Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-amber-800 font-arabic">مجموعة القصص</h2>
                    </div>
                    
                    {stories.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                                <BookOpen className="h-12 w-12 text-amber-400" />
                            </div>
                            <p className="text-amber-600 text-lg font-arabic mb-4">
                                لا توجد قصص متاحة حالياً
                            </p>
                            <p className="text-amber-500 font-arabic">
                                يرجى إضافة القصص لعرض مجموعتها هنا
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {stories.map((story) => (
                                <div
                                    key={story.id}
                                    className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl shadow-md border border-amber-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                                >
                                    {/* Story Image */}
                                    {story.image_url ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={story.image_url}
                                                alt={story.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-amber-100 flex items-center justify-center">
                                            <Image className="h-16 w-16 text-amber-400" />
                                        </div>
                                    )}
                                    
                                    {/* Story Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-amber-800 mb-3 font-arabic leading-relaxed line-clamp-2">
                                            {story.title}
                                        </h3>
                                        
                                        <p className="text-amber-700 mb-4 font-arabic leading-relaxed line-clamp-3">
                                            {story.description}
                                        </p>
                                        
                                        {/* Date */}
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-600 mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <p className="text-sm font-arabic">
                                                {new Date(story.created_at).toLocaleDateString("ar-EG", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        
                                        {/* Read More Button */}
                                        <a
                                            href={`/stories/${story.id}`}
                                            className="inline-flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg w-full text-center"
                                        >
                                            <span>اقرأ المزيد</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Inspirational Footer */}
                <footer className="text-center mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-amber-600" />
                        </div>
                        <p className="text-amber-700 text-lg font-arabic leading-relaxed mb-4">
                            "إن القصص العظيمة لا تموت، بل تعيش في قلوب من يسمعونها"
                        </p>
                        <p className="text-amber-600 font-arabic">
                            كل قصة هنا شاهد على عظمة الروح الإنسانية وقدرتها على التضحية من أجل المبادئ السامية
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default MartyrStories;