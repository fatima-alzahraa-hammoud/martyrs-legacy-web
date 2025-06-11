import React, { useState } from "react";
import { Search, Calendar, Heart, BookOpen, Star, Clock, User, ArrowLeft } from "lucide-react";
import type { Story } from "../../types/types";

// Mock data for demonstration
const mockStories = [
  {
    id: 1,
    title: "عندما التقيته في الحي",
    description: "قصة مؤثرة عن لقاء عفوي في أحد أحياء الضاحية الجنوبية، تظهر تواضع السيد وقربه من الناس",
    date: "2023-12-15",
    author: "أم محمد",
    category: "لقاءات شخصية",
    readTime: "5 دقائق",
    content: "كان ذلك في يوم خريفي بارد، عندما كنت أسير في أحد شوارع الضاحية الجنوبية...",
    likes: 1250,
    featured: true,
    created_at: "2023-12-15T10:00:00Z"
  },
  {
    id: 2,
    title: "درس في الصبر والحكمة",
    description: "موقف يروي كيف تعامل السيد مع أزمة صعبة بحكمة وصبر، مما ترك أثراً عميقاً في النفوس",
    date: "2023-11-20",
    author: "الحاج أبو علي",
    category: "مواقف حكيمة",
    readTime: "7 دقائق",
    content: "في لحظة من أصعب اللحظات التي مرت بها المقاومة...",
    likes: 890,
    featured: false,
    created_at: "2023-12-15T10:00:00Z"
  },
  {
    id: 3,
    title: "رحمته مع الأطفال",
    description: "قصة جميلة تحكي عن لطف السيد مع الأطفال وكيف كان يتعامل معهم بحنان الأب",
    date: "2023-10-08",
    author: "أم زينب",
    category: "الرحمة والحنان",
    readTime: "4 دقائق",
    content: "كان الأطفال يجتمعون حوله كالفراشات حول النور...",
    likes: 2100,
    featured: true,
    created_at: "2023-12-15T10:00:00Z"
  },
  {
    id: 4,
    title: "قائد في الميدان",
    description: "شهادة حية من أحد المقاتلين عن شجاعة السيد وقيادته الميدانية الحكيمة",
    date: "2023-09-12",
    author: "أبو حيدر",
    category: "القيادة والشجاعة",
    readTime: "8 دقائق",
    content: "في ذلك اليوم الذي لن أنساه، كان السيد معنا في الخطوط الأمامية...",
    likes: 1560,
    featured: false,
    created_at: "2023-12-15T10:00:00Z"
  },
  {
    id: 5,
    title: "بساطة العيش",
    description: "قصة تعكس تواضع السيد وبساطة عيشه رغم المكانة العالية التي يحتلها",
    date: "2023-08-25",
    author: "الشيخ محمد",
    category: "التواضع والبساطة",
    readTime: "6 دقائق",
    content: "زرته في بيته المتواضع، فوجدت رجلاً يعيش كأبسط الناس...",
    likes: 980,
    featured: false,
    created_at: "2023-12-15T10:00:00Z"
  }
];


const getCategoryColor = (category: string) => {
  const colors = {
    "لقاءات شخصية": "from-blue-500 to-blue-600",
    "مواقف حكيمة": "from-green-500 to-green-600",
    "الرحمة والحنان": "from-pink-500 to-pink-600",
    "القيادة والشجاعة": "from-red-500 to-red-600",
    "التواضع والبساطة": "from-purple-500 to-purple-600"
  };
  return colors[category as keyof typeof colors] || "from-gray-500 to-gray-600";
};

const StoryCard: React.FC<{ story: Story; index: number }> = ({ story, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className={`group relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-amber-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden ${story.featured ? 'ring-2 ring-amber-400/50' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Featured badge */}
      {story.featured && (
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
              {story.title}
            </h2>
            
            <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(story.category)} text-white text-xs font-medium shadow-lg whitespace-nowrap`}>
              {story.category}
            </div>
          </div>
          
          <p className="text-amber-700/80 text-base leading-relaxed">
            {story.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <User className="w-4 h-4" />
            <span className="font-medium">{story.author}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">{new Date(story.date).toLocaleDateString('ar-SA')}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{story.readTime}</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
            <Heart className="w-4 h-4" />
            <span className="font-medium">{story.likes.toLocaleString()} إعجاب</span>
          </div>
        </div>

        {/* Content Preview/Full */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="prose prose-amber max-w-none text-amber-900 leading-relaxed">
            <div className={`text-justify transition-all duration-500 ${isExpanded ? '' : 'line-clamp-4'}`}>
              {story.content}
              {!isExpanded && story.content.length > 200 && (
                <span className="text-amber-600">...</span>
              )}
            </div>
            
            {story.content.length > 200 && (
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

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-amber-200/50">
          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 transform hover:scale-105 ${
                isLiked 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                  : 'bg-white border border-amber-300 text-amber-700 hover:bg-amber-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              إعجاب
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 text-amber-700 rounded-full hover:bg-amber-50 transition-all duration-200 transform hover:scale-105">
              <span>📤</span>
              مشاركة
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full hover:from-amber-600 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <BookOpen className="w-4 h-4" />
            قراءة كاملة
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AlSayyedStories: React.FC = () => {
  const [stories] = useState<Story[]>(mockStories);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "جميع القصص", icon: "📚" },
    { value: "لقاءات شخصية", label: "لقاءات شخصية", icon: "🤝" },
    { value: "مواقف حكيمة", label: "مواقف حكيمة", icon: "🧠" },
    { value: "الرحمة والحنان", label: "الرحمة والحنان", icon: "❤️" },
    { value: "القيادة والشجاعة", label: "القيادة والشجاعة", icon: "⚔️" },
    { value: "التواضع والبساطة", label: "التواضع والبساطة", icon: "🌿" }
  ];

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(search.toLowerCase()) || 
                         story.description.toLowerCase().includes(search.toLowerCase()) ||
                         story.author.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredStories = filteredStories.filter(story => story.featured);
  const regularStories = filteredStories.filter(story => !story.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-12 px-4 sm:px-8 lg:px-16 text-right font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full" />
          <div className="relative">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 bg-clip-text text-transparent mb-4 leading-tight">
              قصص عن السيد حسن
            </h1>
            <p className="text-xl text-amber-700 max-w-4xl mx-auto leading-relaxed">
              تأملات وذكريات حقيقية تعبّر عن الشجاعة، الحكمة، والرحمة في حياة السيد
              <br />
              <span className="text-base text-amber-600 mt-2 block">
                {stories.length} قصة • من قلوب محبيه
              </span>
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
            <input
              type="text"
              placeholder="🔍 ابحث عن قصة أو كاتب..."
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

        {/* Stories Content */}
        <div className="space-y-12">
          {/* Featured Stories */}
          {featuredStories.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-6 h-6 text-amber-500 fill-current" />
                <h2 className="text-2xl font-bold text-amber-800">القصص المميزة</h2>
              </div>
              <div className="grid gap-8">
                {featuredStories.map((story, index) => (
                  <StoryCard key={story.id} story={story} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Stories */}
          {regularStories.length > 0 && (
            <div>
              {featuredStories.length > 0 && (
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-6 h-6 text-amber-500" />
                  <h2 className="text-2xl font-bold text-amber-800">جميع القصص</h2>
                </div>
              )}
              <div className="grid gap-8">
                {regularStories.map((story, index) => (
                  <StoryCard key={story.id} story={story} index={index + featuredStories.length} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredStories.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-amber-800 mb-2">
                {search || selectedCategory !== "all" ? "لا توجد قصص تطابق البحث" : "لا توجد قصص حالياً"}
              </h3>
              <p className="text-amber-600 mb-6">
                {search || selectedCategory !== "all" 
                  ? "جرب البحث بكلمات مختلفة أو اختر فئة أخرى"
                  : "سيتم إضافة القصص قريباً"
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
                  عرض جميع القصص
                </button>
              )}
            </div>
          )}
        </div>

        {/* Stats Section */}
        {filteredStories.length > 0 && (
          <div className="mt-16 pt-8 border-t border-amber-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredStories.length}
                </div>
                <div className="text-amber-600">قصة منشورة</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {filteredStories.reduce((sum, story) => sum + story.likes, 0).toLocaleString()}
                </div>
                <div className="text-amber-600">إعجاب إجمالي</div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200">
                <div className="text-3xl font-bold text-amber-800 mb-2">
                  {new Set(filteredStories.map(story => story.author)).size}
                </div>
                <div className="text-amber-600">كاتب مشارك</div>
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
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AlSayyedStories;