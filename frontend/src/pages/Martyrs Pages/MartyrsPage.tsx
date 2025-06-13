import React, { useEffect, useState } from "react";
import { Plus, Search, BookOpen, Calendar, User, Link } from "lucide-react";
import Sidebar from "../SideBar";
import type { Martyr } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import { useNavigate } from "react-router-dom";
import AddMartyrDialog from "./AddMartyrDialog";

const MartyrsPage: React.FC = () => {
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMartyrAdded = (newMartyr: Martyr) => {
      // Handle the newly added martyr (e.g., refresh list, show success message)
      console.log("New martyr added:", newMartyr);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMartyrs = async () => {
      try {
        const response = await requestApi({
          route: "/martyrs",
          method: requestMethods.GET,
        });

        if (response.status === "success") {
          const data = await response.data;
          setMartyrs(data);
        } else {
          console.error("Failed to fetch martyrs:", response.message);
        }
      } catch (error) {
        console.log("Error Catched: ", error);
      }
    };

    fetchMartyrs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-25 to-orange-25">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header Section */}
        <header className="text-center mb-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200">
          <h1 className="text-4xl font-bold text-amber-800 mb-4 font-arabic leading-relaxed">
            من الشهادة يولد المجد
          </h1>
          <h2 className="text-2xl font-semibold text-amber-700 mb-6 font-arabic">
            دماؤهم منارتنا، وأسماؤهم عهد لا يُنسى
          </h2>
          <p className="text-amber-600 text-lg max-w-4xl mx-auto leading-relaxed font-arabic">
            نكرّم في هذه الصفحة أبطالنا الذين ارتقوا في سبيل الله والوطن.
            نسرد قصصهم ونخلّد ذكراهم ليبقى نهجهم حيًّا في قلوبنا ووجداننا.
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button onClick={() => setIsDialogOpen(true)} className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Plus className="h-5 w-5" />
            <span>إضافة شهيد</span>
          </button>
          <button className="flex items-center justify-center space-x-3 rtl:space-x-reverse bg-amber-100 hover:bg-amber-200 text-amber-800 px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Search className="h-5 w-5" />
            <span>بحث عن شهيد</span>
          </button>
        </div>

        {/* Martyrs List Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
            <User className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-800 font-arabic">قائمة الشهداء</h2>
          </div>

          {martyrs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-amber-400" />
              </div>
              <p className="text-amber-600 text-lg font-arabic mb-4">
                لا توجد بيانات شهداء متاحة حالياً
              </p>
              <p className="text-amber-500 font-arabic">
                يرجى إضافة الشهداء لعرض قائمتهم هنا
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {martyrs.map((martyr) => (
                <div
                  key={martyr.id}
                  className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-200 shadow-md">
                      {martyr.image ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/${martyr.image.file_path}`}
                          alt={`${martyr.first_name} ${martyr.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                          <User className="h-12 w-12 text-amber-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-2 font-arabic">
                      {martyr.first_name} {martyr.last_name}
                    </h3>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-amber-600 mb-4">
                      <Calendar className="h-4 w-4" />
                      <p className="text-sm font-arabic">
                        تاريخ الاستشهاد: {martyr.martyrdom_date}
                      </p>
                    </div>
                  </div>

                  {/* Navigate to Martyr Page */}
                  <button
                    onClick={()=>navigate(`/martyr/${martyr.id}`)}
                    className="w-full flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>اقرأ المزيد</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <AddMartyrDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onMartyrAdded={handleMartyrAdded}
      />

    </div>
  );
};

export default MartyrsPage;