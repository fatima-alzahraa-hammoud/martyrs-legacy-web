import React, { useEffect } from "react";
import { useState } from "react";
import { Plus, Search, MessageSquare, Calendar, PlayCircle } from "lucide-react";
import Sidebar from "../SideBar";
import type { Interview } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";

const InterviewsPage: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() =>{
    const fetchInterviews = async () => {
      try {
          const response = await requestApi({
              route: "/martyrs/interviews",
              method: requestMethods.GET,
          });

          if (response.status === "success") {
              const data = await response.data;
              setInterviews(data);
          } else {
              console.error("Failed to fetch martyrs interviews:", response.message);
          }
      } catch (error) {
          console.log("Error Catched: ", error);
      }
    }

    fetchInterviews();
  }, [])

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
      <Sidebar />
      
      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
            المقابلات
          </h1>
          <h2 className="text-2xl font-semibold text-amber-700 mb-6 font-arabic">
            شهادات حيّة من قلوب المحبين
          </h2>
          <p className="text-amber-600 text-lg max-w-4xl mx-auto leading-relaxed font-arabic">
            في هذه الصفحة، نستعرض مقابلات حصرية مع عائلات الشهداء ورفاقهم وشهادات حيّة عن بطولاتهم.
            نسمع من أقرب الناس إليهم قصص التضحية والفداء التي تخلّد ذكراهم.
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Plus className="h-5 w-5" />
            <span>إضافة مقابلة</span>
          </button>
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Search className="h-5 w-5" />
            <span>بحث عن مقابلة</span>
          </button>
        </div>

        {/* Interviews List Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8 mb-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
            <MessageSquare className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-800 font-arabic">قائمة المقابلات</h2>
          </div>
          
          {interviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-amber-400" />
              </div>
              <p className="text-amber-600 text-lg font-arabic mb-4">
                لا توجد مقابلات متاحة حالياً
              </p>
              <p className="text-amber-500 font-arabic">
                يرجى إضافة المقابلات لعرض قائمتها هنا
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviews.map((interview, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center shadow-md">
                      <PlayCircle className="h-8 w-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-3 font-arabic">
                      {interview.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-amber-600 mb-4">
                      <Calendar className="h-4 w-4" />
                      <p className="text-sm font-arabic">
                        <strong>تاريخ المقابلة:</strong> {interview.date}
                      </p>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg">
                    <PlayCircle className="h-4 w-4" />
                    <span>قراءة المزيد</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <p className="text-amber-700 text-lg font-arabic leading-relaxed max-w-3xl mx-auto">
            سنظل أوفياء لدماء الشهداء، نحمل وصاياهم ونروي قصصهم للأجيال القادمة.
            كل مقابلة هي شاهد على عظمة التضحية وسمو المبادئ.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default InterviewsPage;