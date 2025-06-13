import React, { useState } from "react";
import { Play, Calendar, Tv, Download, Eye, Clock } from "lucide-react";
import type { Interview } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";
import { useEffect } from "react";




const getTypeLabel = (type: Interview["document_type"]) => {
  switch (type) {
    case "interview":
      return { icon: "🎙️", label: "مقابلة", color: "from-blue-500 to-blue-600" };
    case "letter":
      return { icon: "📝", label: "رسالة", color: "from-green-500 to-green-600" };
    case "audio_message":
      return { icon: "🔊", label: "رسالة صوتية", color: "from-purple-500 to-purple-600" };
    case "video_message":
      return { icon: "🎥", label: "رسالة مرئية", color: "from-red-500 to-red-600" };
    default:
      return { icon: "📄", label: "مستند", color: "from-gray-500 to-gray-600" };
  }
};

const InterviewCard: React.FC<{ item: Interview; index: number }> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = getTypeLabel(item.document_type);

  const getYoutubeId = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
    return match ? match[1] : null;
  };


  return (
    <div 
      className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-amber-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-orange-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative p-8 space-y-6">
        {/* Header with type badge */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-amber-900 mb-2 leading-relaxed group-hover:text-amber-800 transition-colors">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-amber-700/80 text-base leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
          
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${typeInfo.color} text-white text-sm font-medium shadow-lg flex items-center gap-2 whitespace-nowrap`}>
            <span className="text-lg">{typeInfo.icon}</span>
            {typeInfo.label}
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Tv className="w-4 h-4" />
            <span className="font-medium">{item.outlet}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{new Date(item.date).toLocaleDateString('ar-SA')}</span>
          </div>
          
          {item.duration && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="font-medium">{item.duration}</span>
            </div>
          )}
          
          {item.views && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
              <Eye className="w-4 h-4" />
              <span className="font-medium">{item.views} مشاهدة</span>
            </div>
          )}
        </div>

        {/* Media Content */}
        {item.video_url && (
          <div className="relative group/video">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(item.video_url)}`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>

          </div>
        )}

        {item.audio_url && (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full p-3">
                <span className="text-white text-xl">🔊</span>
              </div>
              <div>
                <h3 className="font-semibold text-purple-800">تشغيل الرسالة الصوتية</h3>
                <p className="text-purple-600 text-sm">جودة عالية • {item.duration || 'غير محدد'}</p>
              </div>
            </div>
            <audio controls className="w-full">
              <source src={item.audio_url} type="audio/mp3" />
              متصفحك لا يدعم تشغيل الصوت.
            </audio>
          </div>
        )}

        {item.image_url && (
          <div className="relative">
            <img
              src={item.image_url}
              alt="رسالة مصورة"
              className="w-full rounded-2xl shadow-xl object-cover max-h-[500px] hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        )}

        {/* Content Preview/Full */}
        {item.content && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
            <div className="prose prose-amber max-w-none text-amber-900 leading-relaxed">
              <div className={`text-justify transition-all duration-500 ${isExpanded ? '' : 'line-clamp-3'}`}>
                {item.content}
              </div>
              
              {item.content.length > 200 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-4 text-amber-600 hover:text-amber-800 font-medium text-sm transition-colors duration-200 flex items-center gap-2"
                >
                  {isExpanded ? 'عرض أقل' : 'قراءة المزيد'}
                  <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-amber-200/50">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <Download className="w-4 h-4" />
            تحميل
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105">
            <span>📤</span>
            مشاركة
          </button>
        </div>
      </div>
    </div>
  );
};

const AlSayyedInterviews: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
      const fetchAlbum = async () => {
        try {
          const response = await requestApi({
            route: `/al-sayyed-hasan/2/media`, // <-- Change this route as needed
            method: requestMethods.GET,
          });
  
          if (response.status === "success") {
            setInterviews(response.data);
          } else {
            console.error("Failed to fetch album:", response.message);
          }
        } catch (error) {
          console.log("Error Catched: ", error);
        }
      };
  
      fetchAlbum();
    }, []);

  const filteredInterviews = interviews.filter(item => 
    filter === 'all' || item.document_type === filter
  );

  const filterOptions = [
    { value: 'all', label: 'جميع المحتويات', icon: '📚' },
    { value: 'interview', label: 'المقابلات', icon: '🎙️' },
    { value: 'audio_message', label: 'الرسائل الصوتية', icon: '🔊' },
    { value: 'video_message', label: 'الرسائل المرئية', icon: '🎥' },
    { value: 'letter', label: 'الرسائل المكتوبة', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-8 lg:px-16 text-right font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 bg-clip-text text-transparent mb-4 leading-tight">
              مقابلات ورسائل السيد حسن نصر الله
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
              توثيق شامل لأهم المقابلات، الرسائل الصوتية، والمرئية لسماحة السيد
              <br />
              <span className="text-base text-amber-600 mt-2 block">
                {interviews.length} محتوى • محدث باستمرار
              </span>
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                filter === option.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white/70 text-amber-700 hover:bg-white border border-amber-200'
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="space-y-8">
          {filteredInterviews.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                لا توجد محتويات حالياً
              </h3>
              <p className="text-amber-600">
                سيتم إضافة المحتوى قريباً
              </p>
            </div>
          ) : (
            <div className="grid gap-8 animate-fade-in">
              {filteredInterviews.map((item, index) => (
                <InterviewCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>

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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AlSayyedInterviews;