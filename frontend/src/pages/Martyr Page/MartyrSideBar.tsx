import React from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, FileText, Image, Video, ArrowLeft } from "lucide-react";

const MartyrSideBar: React.FC = () => {
    const { id } = useParams();

    return (
        <aside className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-lg border-r border-amber-200 h-full min-h-screen w-64">
            <div className="p-6">
                {/* Back to Martyrs List */}
                <div className="mb-6">
                    <Link
                        to="/martyrs"
                        className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                    >
                        <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>العودة إلى قائمة الشهداء</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to={`/martyr/${id}`}
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <FileText className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>الملف الشخصي</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/martyr/stories/${id}`}
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>قصص الشهيد</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/martyr/will/${id}`}
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <FileText className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>وصية الشهيد</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/martyr/interviews/${id}`}
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <Video className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>مقابلات الشهيد</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/martyr/album/${id}`}
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <Image className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>ألبوم الصور</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default MartyrSideBar;