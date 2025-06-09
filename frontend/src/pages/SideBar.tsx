import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, FileText, BookOpen, MessageCircle, Image } from "lucide-react";

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <aside className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-lg border-r border-amber-200 h-full min-h-screen w-64">
            <div className="p-6">
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link 
                                to="/martyrs"
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>الشهداء</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/wills"
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <FileText className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>الوصايا</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/stories"
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>القصص</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/interviews"
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>المقابلات</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/media"
                                className="flex items-center space-x-3 rtl:space-x-reverse text-amber-700 hover:text-amber-900 hover:bg-amber-100 px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm group"
                            >
                                <Image className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                                <span>الوسائط</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;