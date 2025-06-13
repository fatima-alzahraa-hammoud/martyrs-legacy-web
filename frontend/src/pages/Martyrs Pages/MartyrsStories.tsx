import React, { useEffect } from "react";
import { Plus, Search, BookOpen, Heart, Star, Calendar } from "lucide-react";
import Sidebar from "../SideBar";
import type { Story } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";

const MartyrsStoriesPage: React.FC = () => {
  const [stories, setStories] = React.useState<Story[]>([]);

  useEffect(() =>{
    const fetchStories = async () => {
      try {
          const response = await requestApi({
              route: "/martyrs/stories",
              method: requestMethods.GET,
          });

          if (response.status === "success") {
              const data = await response.data;
              setStories(data);
          } else {
              console.error("Failed to fetch martyrs stories:", response.message);
          }
      } catch (error) {
          console.log("Error Catched: ", error);
      }
    }

    fetchStories();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-6">
            <BookOpen className="h-8 w-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-800 font-arabic leading-relaxed">
              قصص الشهداء
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <Heart className="h-5 w-5 text-amber-600" />
            <p className="text-amber-600 text-xl font-arabic leading-relaxed">
              من حياتهم... نستمد العزم والصبر والإيمان
            </p>
          </div>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Plus className="h-5 w-5" />
            <span>إضافة قصّة</span>
          </button>
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Search className="h-5 w-5" />
            <span>بحث عن قصّة</span>
          </button>
        </div>

        {/* Stories Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
            <Star className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-800 font-arabic">مجموعة القصص</h2>
          </div>
          
          {stories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="h-16 w-16 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-amber-800 mb-4 font-arabic">
                لا توجد قصص متاحة حالياً
              </h3>
              <p className="text-amber-600 text-lg font-arabic mb-6 max-w-md mx-auto leading-relaxed">
                ساهم في إثراء هذه المجموعة بإضافة قصص الشهداء الملهمة
              </p>
              <button className="flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mx-auto">
                <Plus className="h-5 w-5" />
                <span>أضف أول قصة</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story, index) => (
                <article 
                  key={index}
                  className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <BookOpen className="h-5 w-5 text-amber-600" />
                      <span className="text-sm text-amber-600 font-arabic">قصة شهيد</span>
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-3 font-arabic leading-relaxed">
                      {story.title}
                    </h3>
                    <p className="text-amber-700 text-sm leading-relaxed font-arabic mb-4 line-clamp-3">
                      {story.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg text-sm">
                      <BookOpen className="h-4 w-4" />
                      <span>قراءة القصة</span>
                    </button>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse text-amber-500">
                      <Calendar className="h-4 w-4" />
                      <span className="text-xs font-arabic">منذ يومين</span>
                    </div>
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
            <Star className="h-6 w-6 text-amber-600" />
            <Heart className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-amber-700 text-lg font-arabic font-medium leading-relaxed">
            قصص الشهداء، دروس في البطولة والوفاء.
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto"></div>
        </footer>
      </main>
    </div>
  );
};

export default MartyrsStoriesPage;