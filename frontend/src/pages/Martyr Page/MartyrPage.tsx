import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Calendar, MapPin, Heart, Quote, FileText, Home } from "lucide-react";
import type { Martyr } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";


const MartyrPage: React.FC = () => {
    const { id } = useParams(); // Get the martyr ID from the URL
    const [martyr, setMartyr] = useState<Martyr | null>(null);

    useEffect(() =>{
        const fetchMartyr = async () => {
            try {
                const response = await requestApi({
                    route: `/martyr/${id}`,
                    method: requestMethods.GET,
                });

                if (response.status === "success") {
                    const data = await response.data;
                    setMartyr(data);
                } else {
                    console.error("Failed to fetch martyr:", response.message);
                }
            } catch (error) {
                console.log("Error Catched: ", error);
            }
        }

        fetchMartyr();
    }, []);

    const calculateAge = (birth: string, death: string): number => {
        const birthDate = new Date(birth);
        const deathDate = new Date(death);
        let age = deathDate.getFullYear() - birthDate.getFullYear();
        const m = deathDate.getMonth() - birthDate.getMonth();
        
        if (m < 0 || (m === 0 && deathDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
            {/* Back Navigation */}
            <div className="p-6">
                <Link 
                    to="/martyrs"
                    className="inline-flex items-center space-x-2 rtl:space-x-reverse text-amber-700 hover:text-amber-800 transition-colors duration-200"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span className="font-medium font-arabic">العودة إلى قائمة الشهداء</span>
                </Link>
            </div>

            <div className="container mx-auto px-6 pb-12">
                {/* Hero Section - صورة الشهيد */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl shadow-xl border border-amber-200 p-8 mb-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-8 border-amber-200 shadow-2xl">
                                {martyr?.image ? (
                                    <img
                                        src={martyr.image}
                                        alt={martyr.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                                        <User className="h-24 w-24 text-amber-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="text-center lg:text-right flex-1">
                            <h1 className="text-5xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
                                {martyr?.name || "اسم الشهيد"}
                            </h1>
                            <p className="text-2xl text-amber-600 font-arabic italic leading-relaxed">
                                سلامٌ على من صدق الوعد ومضى
                            </p>
                            <div className="mt-6 inline-block bg-amber-600 text-white px-6 py-2 rounded-full text-lg font-medium shadow-lg">
                                <span className="font-arabic">شهيد الأمة والوطن</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Basic Information */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                <User className="h-6 w-6 text-amber-600" />
                                <h2 className="text-2xl font-bold text-amber-800 font-arabic">المعلومات الأساسية</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">الاسم الكامل</p>
                                        <p className="text-amber-800 font-bold text-lg font-arabic">
                                            {martyr?.first_name} {martyr?.last_name}
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">اسم الأب</p>
                                        <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.father_name}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">اسم الأم</p>
                                        <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.mother_name}</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">تاريخ الولادة</p>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <Calendar className="h-4 w-4 text-amber-600" />
                                            <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.birth_date}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">مكان الولادة</p>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <MapPin className="h-4 w-4 text-amber-600" />
                                            <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.place_of_birth}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-red-25 to-red-50 rounded-lg p-4 border border-red-200">
                                        <p className="text-red-600 font-medium mb-1 font-arabic">تاريخ الاستشهاد</p>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <Calendar className="h-4 w-4 text-red-600" />
                                            <p className="text-red-800 font-bold text-lg font-arabic">{martyr?.martyrdom_date}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">العمر عند الاستشهاد</p>
                                        <p className="text-amber-800 font-bold text-lg font-arabic">
                                            {martyr && martyr.birth_date && martyr.martyrdom_date 
                                                ? `${calculateAge(martyr.birth_date, martyr.martyrdom_date)} سنة`
                                                : "غير متوفر"
                                            }
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">مكان الدفن</p>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <Home className="h-4 w-4 text-amber-600" />
                                            <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.burial_place}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">الحالة الاجتماعية</p>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <Heart className="h-4 w-4 text-amber-600" />
                                            <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.marital_status}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-4">
                                        <p className="text-amber-600 font-medium mb-1 font-arabic">عدد الأولاد</p>
                                        <p className="text-amber-800 font-bold text-lg font-arabic">{martyr?.nb_of_childen}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Biography Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                <FileText className="h-6 w-6 text-amber-600" />
                                <h2 className="text-2xl font-bold text-amber-800 font-arabic">نبذة عن الشهيد</h2>
                            </div>
                            <div className="bg-gradient-to-r from-amber-25 to-orange-25 rounded-lg p-6">
                                <p className="text-amber-800 leading-relaxed text-lg font-arabic">
                                    {martyr?.bio || "لم يتم إضافة السيرة الذاتية بعد..."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Content */}
                    <div className="space-y-8">
                        {/* Famous Quote */}
                        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                <Quote className="h-6 w-6 text-amber-600" />
                                <h2 className="text-xl font-bold text-amber-800 font-arabic">كلمة شهيرة</h2>
                            </div>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-r-4 border-amber-500">
                                <p className="text-amber-800 italic text-lg leading-relaxed font-arabic">
                                    "{martyr?.famous_quote || "كلماته ستبقى خالدة في قلوبنا..."}"
                                </p>
                            </div>
                        </div>

                        {/* Will Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                                <FileText className="h-6 w-6 text-amber-600" />
                                <h2 className="text-xl font-bold text-amber-800 font-arabic">وصية الشهيد</h2>
                            </div>
                            <Link
                                to="/martyr-will"
                                className="block w-full bg-amber-600 hover:bg-amber-700 text-white text-center px-6 py-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-arabic"
                            >
                                عرض الوصية كاملة
                            </Link>
                        </div>

                        {/* Memorial Message */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 p-8">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                                    <Heart className="h-8 w-8 text-amber-600" />
                                </div>
                                <p className="text-amber-700 text-lg font-bold leading-relaxed font-arabic">
                                    لن ننسى... وسنُكمل دربكم ما حيينا
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MartyrPage;
