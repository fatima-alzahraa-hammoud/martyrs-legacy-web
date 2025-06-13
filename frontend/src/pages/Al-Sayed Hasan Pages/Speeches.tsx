import React, { useState } from "react";
import { Search, Calendar, Play, Volume2, BookOpen, Star, Clock, User, ArrowLeft, Plus, Filter, Mic } from "lucide-react";
import type { Speech } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import { useEffect } from "react";



const getCategoryColor = (category: string) => {
  const colors = {
    "سياسية": "from-red-500 to-red-600",
    "دينية": "from-green-500 to-green-600",
    "اجتماعية": "from-blue-500 to-blue-600",
    "شبابية": "from-purple-500 to-purple-600",
    "اقتصادية": "from-indigo-500 to-indigo-600"
  };
  return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
};

const SpeechCard: React.FC<{ speech: Speech; index: number }> = ({ speech, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-amber-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${speech.featured ? 'ring-2 ring-amber-400/50' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {speech.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            مميزة
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-8 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-2xl font-bold text-amber-900 leading-relaxed group-hover:text-amber-800 transition-colors flex-1">
              {speech.title}
            </h2>
            
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(speech.category)} text-white text-xs font-medium shadow-lg whitespace-nowrap`}>
              {speech.category}
            </div>
          </div>
          
          <p className="text-amber-700/80 text-base leading-relaxed">
            {speech.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{new Date(speech.date).toLocaleDateString('ar-SA')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{speech.duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <User className="w-4 h-4" />
            <span className="font-medium">{speech.occasion}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Volume2 className="w-4 h-4" />
            <span className="font-medium">{(speech.views ?? 0).toLocaleString()} مشاهدة</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {speech.tags.map((tag, tagIndex) => (
            <span 
              key={tagIndex}
              className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Audio Player Section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  isPlaying 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                }`}
              >
                {isPlaying ? (
                  <div className="w-3 h-3 bg-white rounded-sm" />
                ) : (
                  <Play className="w-5 h-5 fill-current mr-0.5" />
                )}
              </button>
              <div>
                <div className="text-amber-900 font-medium">استمع للخطاب</div>
                <div className="text-amber-600 text-sm">جودة عالية • {speech.duration}</div>
              </div>
            </div>
            <Mic className="w-6 h-6 text-amber-500" />
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-amber-200 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-amber-200/50">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105">
              <BookOpen className="w-4 h-4" />
              النص المكتوب
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105">
              <span>📤</span>
              مشاركة
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <Play className="w-4 h-4" />
            تشغيل كامل
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Speeches: React.FC = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
        const fetchAlbum = async () => {
          try {
            const response = await requestApi({
              route: `/al-sayyed-hasan/2/media`, // <-- Change this route as needed
              method: requestMethods.GET,
            });
    
            if (response.status === "success") {
              setSpeeches(response.data);
            } else {
              console.error("Failed to fetch album:", response.message);
            }
          } catch (error) {
            console.log("Error Catched: ", error);
          }
        };
    
        fetchAlbum();
      }, []);

  const categories = [
    { value: "all", label: "جميع الخُطب", icon: "🎤" },
    { value: "سياسية", label: "سياسية", icon: "🏛️" },
    { value: "دينية", label: "دينية", icon: "☪️" },
    { value: "اجتماعية", label: "اجتماعية", icon: "👥" },
    { value: "شبابية", label: "شبابية", icon: "🌟" },
    { value: "اقتصادية", label: "اقتصادية", icon: "💼" }
  ];

  const filteredSpeeches = speeches.filter((speech) => {
    const matchesSearch = speech.title.toLowerCase().includes(search.toLowerCase()) || 
                         speech.description.toLowerCase().includes(search.toLowerCase()) ||
                         speech.occasion.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || speech.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredSpeeches = filteredSpeeches.filter(speech => speech.featured);
  const regularSpeeches = filteredSpeeches.filter(speech => !speech.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-8 lg:px-16 text-right font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 bg-clip-text text-transparent mb-4 leading-tight">
              خُطب السيد حسن
            </h1>
            <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
              أرشيف لأهم الخُطب والكلمات التي ألقاها السيد، تحمل في طياتها الحكمة والبصيرة
              <br />
              <span className="text-base text-amber-600 mt-2 block">
                {speeches.length} خطاب • مسموع ومكتوب
              </span>
            </p>
          </div>
        </div>

        {/* Search and Add Button */}
        <div className="max-w-4xl mx-auto mb-12 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 ابحث عن خطبة أو موضوع..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-12 py-4 rounded-2xl border border-amber-200 bg-white/80 backdrop-blur-sm text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 text-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 hover:text-amber-700 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
          
          <button className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium">
            <Plus className="w-5 h-5" />
            أضف خطبة
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white/70 text-amber-700 hover:bg-white border border-amber-200'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Speeches Content */}
        <div className="space-y-12">
          {/* Featured Speeches */}
          {featuredSpeeches.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-amber-500 fill-current" />
                <h2 className="text-2xl font-bold text-amber-800">الخُطب المميزة</h2>
              </div>
              <div className="grid gap-8">
                {featuredSpeeches.map((speech, index) => (
                  <SpeechCard key={speech.id} speech={speech} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Speeches */}
          {regularSpeeches.length > 0 && (
            <div>
              {featuredSpeeches.length > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <Mic className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-amber-800">جميع الخُطب</h2>
                </div>
              )}
              <div className="grid gap-8">
                {regularSpeeches.map((speech, index) => (
                  <SpeechCard key={speech.id} speech={speech} index={index + featuredSpeeches.length} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredSpeeches.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                {search || selectedCategory !== "all" ? "لا توجد خُطب تطابق البحث" : "لا توجد خُطب حالياً"}
              </h3>
              <p className="text-amber-600 mb-6">
                {search || selectedCategory !== "all" 
                  ? "جرب البحث بكلمات مختلفة أو اختر فئة أخرى"
                  : "سيتم إضافة الخُطب قريباً"
                }
              </p>
              {(search || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  عرض جميع الخُطب
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {filteredSpeeches.length > 0 && (
          <div className="mt-16 pt-8 border-t border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredSpeeches.length}
                </div>
                <div className="text-amber-600">خطاب متاح</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredSpeeches.reduce((sum, speech) => sum + Number(speech.views ?? 0), 0).toLocaleString()}
                </div>
                <div className="text-amber-600">مشاهدة إجمالية</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {Math.round(filteredSpeeches.reduce((sum, speech) => sum + parseInt(speech.duration), 0) / 60)}
                </div>
                <div className="text-amber-600">ساعات استماع</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {new Set(filteredSpeeches.map(speech => speech.category)).size}
                </div>
                <div className="text-amber-600">فئة متنوعة</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-amber-200">
          <p className="text-amber-600">
            جميع الحقوق محفوظة • {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in > * {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Speeches;