import React, { useEffect, useState } from "react";
import { Plus, Search, BookOpen, Calendar, User } from "lucide-react";
import Sidebar from "../SideBar";
import type { Martyr } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MartyrsPage: React.FC = () => {
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const navigate = useNavigate();

  useEffect(() => {
    // Decode JWT and check role_id
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken: { role_id: number } = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
      setIsAdmin(decodedToken.role_id === 1); // Set isAdmin to true if role_id is 1
    }

    // Fetch martyrs
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

  // Filter martyrs for non-admin users (only show published ones)
  const visibleMartyrs = isAdmin
    ? martyrs // Admin sees all martyrs
    : martyrs.filter((martyr) => martyr.is_published); // Non-admin sees only published martyrs

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

        {/* Martyrs List Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-amber-200 p-8">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse mb-8">
            <User className="h-6 w-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-amber-800 font-arabic">قائمة الشهداء</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleMartyrs.map((martyr) => (
              <div
                key={martyr.id}
                className="bg-gradient-to-br from-amber-25 to-orange-25 rounded-xl p-6 shadow-md border border-amber-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex flex-col"
              >
                {/* Martyr Info Section */}
                <div className="flex-1">
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
                </div>

                {/* Actions Section */}
                <div className="mt-auto space-y-3">
                  {/* Admin-Specific Actions for Unpublished Martyrs */}
                  {isAdmin && !martyr.is_published && (
                    <div className="flex gap-2">
                      <button
                        onClick={async () => {
                          try {
                            const response = await requestApi({
                              route: `/martyrs/${martyr.id}/publish`,
                              method: requestMethods.PUT,
                            });
                            if (response.status === "success") {
                              alert("تم قبول الشهيد بنجاح");
                              setMartyrs((prev) =>
                                prev.map((item) =>
                                  item.id === martyr.id
                                    ? { ...item, is_published: true }
                                    : item
                                )
                              );
                            }
                          } catch (error) {
                            console.error("Error publishing martyr:", error);
                          }
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg font-arabic text-sm"
                      >
                        قبول
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const response = await requestApi({
                              route: `/martyrs/${martyr.id}`,
                              method: requestMethods.DELETE,
                            });
                            if (response.status === "success") {
                              alert("تم رفض الشهيد بنجاح");
                              setMartyrs((prev) =>
                                prev.filter((item) => item.id !== martyr.id)
                              );
                            }
                          } catch (error) {
                            console.error("Error declining martyr:", error);
                          }
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg font-arabic text-sm"
                      >
                        رفض
                      </button>
                    </div>
                  )}

                  {/* Navigate to Martyr Page and Delete for Published Martyrs */}
                  {martyr.is_published && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/martyr/${martyr.id}`)}
                        className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg font-arabic text-sm"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>اقرأ المزيد</span>
                      </button>
                      {isAdmin && (
                        <button
                          onClick={async () => {
                            const confirmDelete = window.confirm(
                              `هل أنت متأكد أنك تريد حذف الشهيد ${martyr.first_name} ${martyr.last_name}؟`
                            );
                            if (confirmDelete) {
                              try {
                                const response = await requestApi({
                                  route: `/martyrs/${martyr.id}`,
                                  method: requestMethods.DELETE,
                                });
                                if (response.status === "success") {
                                  alert("تم حذف الشهيد بنجاح");
                                  setMartyrs((prev) =>
                                    prev.filter((item) => item.id !== martyr.id)
                                  );
                                }
                              } catch (error) {
                                console.error("Error deleting martyr:", error);
                              }
                            }
                          }}
                          className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg font-arabic text-sm"
                        >
                          <span>حذف</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MartyrsPage;