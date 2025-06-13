import React, { useEffect, useState } from "react";
import { Search, Calendar, Image, Video, Play, Download, Share2, Eye, Heart, Filter, Grid, List } from "lucide-react";
import type { MediaItem } from "../../types/types";
import { requestApi } from "../../utils/requestAPI";
import { requestMethods } from "../../utils/requestMethod";


const MediaCard: React.FC<{ item: MediaItem; index: number; viewMode: 'grid' | 'list' }> = ({ item, index, viewMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (viewMode === 'list') {
    return (
      <div 
        className="group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-amber-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex gap-6 p-6">
          {/* Media Preview */}
          <div className="relative w-48 h-36 rounded-xl overflow-hidden flex-shrink-0">
            {item.file_type === "photo" ? (
              <img
                src={item.file_path}
                alt={item.file_name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="relative w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <img
                  src={item.file_path}
                  alt={item.file_name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Play className="w-8 h-8 text-amber-600 fill-current mr-1" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Featured Badge */}
            {item.featured && (
              <div className="absolute top-2 left-2">
                <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold">
                  مميز
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors">
                {item.file_name}
              </h3>
              <p className="text-amber-700/80 text-sm leading-relaxed">
                {item.file_description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>{new Date(item.file_date).toLocaleDateString('ar-SA')}</span>
              </div>
              
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                {item.file_type === "photo" ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                <span>{item.file_type === "photo" ? "صورة" : "فيديو"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                <span>{(item.views ?? 0).toLocaleString()} مشاهدة</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-xs">{((item.likes ?? 0) + (isLiked ? 1 : 0)).toLocaleString()}</span>
                </button>
                
                <button className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-all duration-200">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">مشاركة</span>
                </button>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <Download className="w-4 h-4" />
                <span className="text-sm">تحميل</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-amber-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${item.featured ? 'ring-2 ring-amber-400/50' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            مميز
          </div>
        </div>
      )}

      {/* Media Content */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.file_type === "photo" ? (
          <img
            src={item.file_path}
            alt={item.file_name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="relative w-full h-full bg-gradient-to-br from-amber-100 to-orange-100">
            <img
              src={item.file_path}
              alt={item.file_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 transform hover:scale-105"
              >
                <Play className="w-10 h-10 text-amber-600 fill-current mr-1" />
              </button>
            </div>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors leading-relaxed">
            {item.file_name}
          </h3>
          <p className="text-amber-700/80 text-sm leading-relaxed line-clamp-2">
            {item.file_description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" />
            <span>{new Date(item.file_date).toLocaleDateString('ar-SA')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            {item.file_type === "photo" ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            <span>{item.file_type === "photo" ? "صورة" : "فيديو"}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Eye className="w-4 h-4" />
            <span>{(item.views ?? 0).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-amber-200/50">
          <div className="flex gap-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-white border border-amber-300 text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{((item.likes ?? 0) + (isLiked ? 1 : 0)).toLocaleString()}</span>
            </button>
            
            <button className="flex items-center gap-1 px-3 py-2 bg-white border border-amber-300 text-amber-600 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <Download className="w-4 h-4" />
            <span className="text-sm">تحميل</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const AlSayyedAlbum: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await requestApi({
          route: `/al-sayyed-hasan/2/media`, // <-- Change this route as needed
          method: requestMethods.GET,
        });

        if (response.status === "success") {
          setMediaItems(response.data);
        } else {
          console.error("Failed to fetch album:", response.message);
        }
      } catch (error) {
        console.log("Error Catched: ", error);
      }
    };

    fetchAlbum();
  }, []);

  const mediaTypes = [
    { value: "all", label: "جميع الوسائط", icon: "📱" },
    { value: "photo", label: "الصور", icon: "📸" },
    { value: "video", label: "الفيديوهات", icon: "🎥" }
  ];

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch = item.file_name.toLowerCase().includes(search.toLowerCase()) || 
                         item.file_description.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "all" || item.file_type === selectedType;
    return matchesSearch && matchesType;
  });

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-8 lg:px-16 text-right font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 bg-clip-text text-transparent mb-4 leading-tight">
              ألبوم السيد حسن
            </h1>
            <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
              توثيق مصور لأهم اللحظات والمناسبات مع السيد، أرشيف بصري يحفظ الذكريات
              <br />
              <span className="text-base text-amber-600 mt-2 block">
                {mediaItems.length} عنصر وسائط • صور وفيديوهات
              </span>
            </p>
          </div>
        </div>

        {/* Search and View Controls */}
        <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 ابحث في الألبوم..."
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
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="flex items-center gap-2 px-4 py-4 bg-white/80 border border-amber-200 text-amber-700 rounded-2xl hover:bg-white transition-all duration-200 transform hover:scale-105"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-4 bg-white/80 border border-amber-200 text-amber-700 rounded-2xl hover:bg-white transition-all duration-200 transform hover:scale-105">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Media Type Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {mediaTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                selectedType === type.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'bg-white/70 text-amber-700 hover:bg-white border border-amber-200'
              }`}
            >
              <span className="text-lg">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>

        {/* Media Content */}
        <div className="space-y-12">
          {/* Featured Media */}
          {featuredItems.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">⭐</span>
                </div>
                <h2 className="text-2xl font-bold text-amber-800">الوسائط المميزة</h2>
              </div>
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {featuredItems.map((item, index) => (
                  <MediaCard key={item.id} item={item} index={index} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Media */}
          {regularItems.length > 0 && (
            <div>
              {featuredItems.length > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <Image className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-amber-800">جميع الوسائط</h2>
                </div>
              )}
              <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {regularItems.map((item, index) => (
                  <MediaCard key={item.id} item={item} index={index + featuredItems.length} viewMode={viewMode} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                {search || selectedType !== "all" ? "لا توجد وسائط مطابقة للبحث" : "لا توجد وسائط حالياً"}
              </h3>
              <p className="text-amber-600 mb-6">
                {search || selectedType !== "all"
                  ? "جرب البحث بكلمات مختلفة أو اختر نوع وسائط آخر"
                  : "سيتم إضافة الصور والفيديوهات قريباً"
                }
              </p>
              {(search || selectedType !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedType("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  عرض جميع الوسائط
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {filteredItems.length > 0 && (
          <div className="mt-16 pt-8 border-t border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredItems.length}
                </div>
                <div className="text-amber-600">عنصر وسائط</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredItems.filter(item => item.file_type === 'photo').length}
                </div>
                <div className="text-amber-600">صورة</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredItems.filter(item => item.file_type === 'video').length}
                </div>
                <div className="text-amber-600">فيديو</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredItems.reduce((sum, item) => sum + (item.views ?? 0), 0).toLocaleString()}
                </div>
                <div className="text-amber-600">مشاهدة إجمالية</div>
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AlSayyedAlbum;