import React, { useEffect } from "react";
import { Plus, Search, Scroll, Heart,  Calendar, User, FileText } from "lucide-react";
import Sidebar from "../SideBar";
import type { MartyrWill } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";

const MartyrsWillsPage: React.FC = () => {
  const [wills, setWills] = React.useState<MartyrWill[]>([]);

  useEffect(() =>{
    const fetchWills = async () => {
      try {
          const response = await requestApi({
              route: "/martyrs/wills",
              method: requestMethods.GET,
          });

          if (response.status === "success") {
              const data = await response.data;
              setWills(data);
          } else {
              console.error("Failed to fetch martyrs wills:", response.message);
          }
      } catch (error) {
          console.log("Error Catched: ", error);
      }
    }

    fetchWills();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-6">
            <Scroll className="h-8 w-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-800 font-arabic leading-relaxed">
              وصايا الشّهداء
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <Heart className="h-5 w-5 text-amber-600" />
            <p className="text-amber-600 text-xl font-arabic leading-relaxed">
              كلماتهم الأخيرة أمانة في أعناقنا...
            </p>
          </div>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Plus className="h-5 w-5" />
            <span>إضافة وصيّة</span>
          </button>
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Search className="h-5 w-5" />
            <span>بحث عن وصيّة</span>
          </button>
        </div>

        {/* Wills Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
            <FileText className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-800 font-arabic">مجموعة الوصايا</h2>
          </div>
          
          {wills.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
                <Scroll className="h-16 w-16 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-4 font-arabic">
                لا توجد وصايا متاحة حالياً
              </h3>
              <p className="text-amber-600 text-lg font-arabic mb-6 max-w-md mx-auto leading-relaxed">
                احفظ كلمات الشهداء الأخيرة وأمانتهم لتبقى منارة للأجيال
              </p>
              <button className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mx-auto">
                <Plus className="h-5 w-5" />
                <span>أضف أول وصية</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {wills.map((will) => (
                <article 
                  key={will.id}
                  className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-8 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300"
                >
                  {/* Will Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-amber-200">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-md">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                          <h3 className="text-lg font-bold text-amber-800 font-arabic">
                            اسم الشّهيد: 
                          </h3>
                          <span className="text-amber-700 font-arabic">
                            {will.martyrName || "غير محدد"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm text-amber-600">
                          <Scroll className="h-4 w-4" />
                          <span className="font-arabic">وصية شهيد</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/50 rounded-lg p-3">
                      <Calendar className="h-5 w-5 text-amber-600" />
                      <span className="text-amber-700 font-medium font-arabic text-sm">
                        تاريخ الاستشهاد: 
                      </span>
                      <span className="text-amber-600 font-arabic text-sm">
                        {will.martyrdomDate || "غير محدد"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/50 rounded-lg p-3">
                      <FileText className="h-5 w-5 text-amber-600" />
                      <span className="text-amber-700 font-medium font-arabic text-sm">
                        تاريخ الوصيّة: 
                      </span>
                      <span className="text-amber-600 font-arabic text-sm">
                        {will.date || "غير محدد"}
                      </span>
                    </div>
                  </div>

                  {/* Will Content */}
                  <div className="bg-white/80 rounded-lg p-6 mb-6 border-r-4 border-amber-400">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <Scroll className="h-5 w-5 text-amber-600" />
                      <h4 className="text-amber-800 font-bold font-arabic">نص الوصيّة:</h4>
                    </div>
                    <div className="bg-amber-25 rounded-lg p-4">
                      <p className="text-amber-700 leading-relaxed font-arabic text-right italic">
                        {will.content ? (
                          will.content.length > 200 
                            ? `${will.content.substring(0, 200)}...` 
                            : will.content
                        ) : (
                          "نص الوصية غير متوفر..."
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-center">
                    <button className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                      <Scroll className="h-4 w-4" />
                      <span>قراءة كاملة</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Inspirational Footer */}
        <footer className="text-center bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 shadow-lg border border-amber-200">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-4">
            <Heart className="h-6 w-6 text-amber-600" />
            <Scroll className="h-6 w-6 text-amber-600" />
            <Heart className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-amber-700 text-lg font-arabic font-medium leading-relaxed">
            وصايا الشّهداء، دربنا للنصر والثبات.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto"></div>
        </footer>
      </main>
    </div>
  );
};

export default MartyrsWillsPage;