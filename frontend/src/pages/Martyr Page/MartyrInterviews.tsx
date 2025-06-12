import React, { useState } from "react";
import { Play, Volume2, BookOpen, Calendar, Mic, Video } from "lucide-react";
import type { Interview } from "../../types/types";
import MartyrSideBar from "./MartyrSideBar";

const MartyrInterviews: React.FC = () => {
    const [interviews, setInterviews] = useState<Interview[]>([]);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
            <MartyrSideBar />
            
            <main className="flex-1 p-8">
                {/* Header Section */}
                <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                    <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
                        مقابلات الشهيد
                    </h1>
                    <p className="text-amber-600 text-lg max-w-4xl mx-auto leading-relaxed font-arabic">
                        نعرض في هذه الصفحة المقابلات الخاصة بالشهداء كما نُشرت أو وُثّقت، لنحفظ
                        معالم نفوسهم العظيمة وتفاصيل حياتهم التي تنبض بالإيمان والشهادة.
                    </p>
                </header>

                {/* Interviews Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
                        <Mic className="h-6 w-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-amber-800 font-arabic">المقابلات</h2>
                    </div>
                    
                    {interviews.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                                <Mic className="h-12 w-12 text-amber-400" />
                            </div>
                            <p className="text-amber-600 text-lg font-arabic mb-4">
                                لا توجد مقابلات متاحة حالياً
                            </p>
                            <p className="text-amber-500 font-arabic">
                                يرجى إضافة المقابلات لعرضها هنا
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {interviews.map((interview) => (
                                <div
                                    key={interview.id}
                                    className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Image Section */}
                                        {interview.image_url && (
                                            <div className="lg:w-1/3">
                                                <img
                                                    src={interview.image_url}
                                                    alt={interview.title}
                                                    className="w-full h-64 lg:h-48 object-cover rounded-lg shadow-md border border-amber-200"
                                                />
                                            </div>
                                        )}

                                        {/* Content Section */}
                                        <div className={`${interview.image_url ? 'lg:w-2/3' : 'w-full'}`}>
                                            <h3 className="text-2xl font-bold text-amber-800 mb-3 font-arabic leading-relaxed">
                                                {interview.title}
                                            </h3>
                                            
                                            <p className="text-amber-700 mb-4 font-arabic leading-relaxed">
                                                {interview.description}
                                            </p>
                                            
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-amber-600 mb-6">
                                                <Calendar className="h-4 w-4" />
                                                <p className="text-sm font-arabic">
                                                    {new Date(interview.date).toLocaleDateString("ar-EG", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                            </div>

                                            {/* Media Section */}
                                            <div className="space-y-4">
                                                {/* Video */}
                                                {interview.video_url && (
                                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                                                            <Video className="h-5 w-5 text-amber-600" />
                                                            <span className="text-amber-800 font-medium font-arabic">مقابلة مرئية</span>
                                                        </div>
                                                        <video 
                                                            controls 
                                                            className="w-full rounded-lg shadow-sm"
                                                            style={{ maxHeight: '300px' }}
                                                        >
                                                            <source src={interview.video_url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                )}

                                                {/* Audio */}
                                                {interview.audio_url && (
                                                    <div className="bg-white rounded-lg p-4 border border-amber-200">
                                                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                                                            <Volume2 className="h-5 w-5 text-amber-600" />
                                                            <span className="text-amber-800 font-medium font-arabic">مقابلة صوتية</span>
                                                        </div>
                                                        <audio 
                                                            controls 
                                                            className="w-full"
                                                        >
                                                            <source src={interview.audio_url} type="audio/mpeg" />
                                                            Your browser does not support the audio tag.
                                                        </audio>
                                                    </div>
                                                )}

                                                {/* Read More Link */}
                                                {interview.content && (
                                                    <a
                                                        href={`/interviews/${interview.id}`}
                                                        className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                                    >
                                                        <BookOpen className="h-4 w-4" />
                                                        <span className="font-arabic">اقرأ المزيد</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default MartyrInterviews;