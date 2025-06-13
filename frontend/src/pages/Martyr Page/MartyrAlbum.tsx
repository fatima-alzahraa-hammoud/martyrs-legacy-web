import React, { useEffect, useState } from "react";
import { Search, Plus, Image, Video, Volume2, Calendar, Filter } from "lucide-react";
import { useParams } from "react-router-dom";
import Sidebar from "../SideBar";
import type { MediaItem } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import MartyrSideBar from "./MartyrSideBar";

const MartyrAlbumPage: React.FC = () => {
    const { id } = useParams();
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortFilter, setSortFilter] = useState("latest");

    useEffect(() =>{
        const fetchAlbum = async () => {
            try {
                const response = await requestApi({
                    route: `/martyr/${id}/media`,
                    method: requestMethods.GET,
                });

                if (response.status === "success") {
                    const data = await response.data;
                    setMediaItems(data);
                } else {
                    console.error("Failed to fetch martyr album:", response.message);
                }
            } catch (error) {
                console.log("Error Catched: ", error);
            }
        }

        fetchAlbum();
    }, [id]);

    const getMediaIcon = (type: string) => {
        switch (type) {
            case "photo":
                return <Image className="h-4 w-4" />;
            case "video":
                return <Video className="h-4 w-4" />;
            case "audio":
                return <Volume2 className="h-4 w-4" />;
            default:
                return <Image className="h-4 w-4" />;
        }
    };

    const getMediaLabel = (type: string) => {
        switch (type) {
            case "photo":
                return "صورة";
            case "video":
                return "فيديو";
            case "audio":
                return "تسجيل صوتي";
            default:
                return "وسائط";
        }
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
            <MartyrSideBar />
            
            <main className="flex-1 p-8">
                {/* Header Section */}
                <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
                    <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
                        ألبوم الشهيد
                    </h1>
                    <p className="text-amber-600 text-lg max-w-4xl mx-auto leading-relaxed font-arabic">
                        نحتفظ هنا بصور وفيديوهات وتسجيلات الشهيد لتبقى حيًّا في الذاكرة، وترتبط أرواحنا بصوته وصورته وآثاره.
                    </p>
                </header>

                {/* Controls Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full lg:w-auto">
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                            <input
                                type="text"
                                placeholder="ابحث عن الوسائط..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pr-10 pl-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-25 text-amber-800 placeholder-amber-400 font-arabic"
                            />
                        </div>

                        {/* Sort Filter */}
                        <div className="relative">
                            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-amber-400" />
                            <select
                                value={sortFilter}
                                onChange={(e) => setSortFilter(e.target.value)}
                                className="pr-10 pl-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-amber-25 text-amber-800 font-arabic appearance-none cursor-pointer"
                            >
                                <option value="latest">الأحدث أولًا</option>
                                <option value="oldest">الأقدم أولًا</option>
                                <option value="photo">صور فقط</option>
                                <option value="video">فيديو فقط</option>
                                <option value="audio">صوتيات فقط</option>
                            </select>
                        </div>

                        {/* Add Media Button */}
                        <button className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 whitespace-nowrap">
                            <Plus className="h-5 w-5" />
                            <span className="font-arabic">إضافة وسائط</span>
                        </button>
                    </div>
                </section>

                {/* Album Grid Section */}
                <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
                    <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
                        <Image className="h-6 w-6 text-amber-600" />
                        <h2 className="text-2xl font-bold text-amber-800 font-arabic">معرض الوسائط</h2>
                    </div>
                    
                    {mediaItems.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                                <Image className="h-12 w-12 text-amber-400" />
                            </div>
                            <p className="text-amber-600 text-lg font-arabic mb-4">
                                لا توجد وسائط متاحة حالياً
                            </p>
                            <p className="text-amber-500 font-arabic">
                                يرجى إضافة الصور والفيديوهات والتسجيلات الصوتية لعرضها هنا
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mediaItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl overflow-hidden shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    {/* Media Preview */}
                                    <div className="aspect-square bg-amber-50 flex items-center justify-center relative overflow-hidden">
                                        {item.file_type === "photo" && (
                                            <img
                                                src={item.file_path}
                                                alt={item.file_name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        {item.file_type === "video" && (
                                            <div className="w-full h-full relative">
                                                <video 
                                                    className="w-full h-full object-cover"
                                                >
                                                    <source src={item.file_path} type="video/mp4" />
                                                </video>
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                                                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                                        <Video className="h-8 w-8 text-amber-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item.file_type === "audio" && (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                                                <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center">
                                                    <Volume2 className="h-10 w-10 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Media Info */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-amber-800 mb-2 font-arabic leading-relaxed truncate">
                                            {item.file_name}
                                        </h3>
                                        
                                        {item.file_description && (
                                            <p className="text-amber-700 text-sm mb-3 font-arabic leading-relaxed line-clamp-2">
                                                {item.file_description}
                                            </p>
                                        )}
                                        
                                        <div className="flex items-center justify-between text-sm text-amber-600 mb-3">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                                <Calendar className="h-3 w-3" />
                                                <span className="font-arabic">
                                                    {new Date(item.file_date).toLocaleDateString("ar-EG", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <div className="flex items-center space-x-1 rtl:space-x-reverse bg-amber-100 px-3 py-1 rounded-full">
                                                {getMediaIcon(item.file_type)}
                                                <span className="text-amber-700 text-xs font-arabic">
                                                    {getMediaLabel(item.file_type)}
                                                </span>
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

export default MartyrAlbumPage;