import { useState, useEffect } from 'react';
import { Mic, BookOpen, Image, Users } from 'lucide-react';
import { Link } from 'react-router';

const AlSayyedHasanPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 py-12 px-4 sm:px-8 lg:px-16 font-sans text-amber-900 text-right">
      <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-amber-800 mb-2 animate-pulse">الأمين على قلوبنا</h1>
          <p className="text-amber-600 text-lg">محطة خالدة من الخطابات، اللقاءات، الصور، والقصص المُلهمة</p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Interviews */}
          <SectionCard
            icon={<Users className="h-10 w-10 text-amber-600" />}
            title="لقاءات خاصة"
            description="مجموعة من اللقاءات الحصرية التي سلطت الضوء على شخصية الأمين."
            href="/al-sayed-hasan/interviews"
            delay="delay-300"
          />

          {/* Speeches */}
          <SectionCard
            icon={<Mic className="h-10 w-10 text-orange-600" />}
            title="الخطابات"
            description="أهم الكلمات والخطب التي ألقاها في محطات مختلفة."
            href="/al-sayed-hasan/speeches"
            delay="delay-500"
          />

          {/* Photo Album */}
          <SectionCard
            icon={<Image className="h-10 w-10 text-yellow-600" />}
            title="ألبوم الصور"
            description="لحظات مُضيئة من حياته في صور نادرة ومؤثرة."
            href="/al-sayed-hasan/album"
            delay="delay-700"
          />

          {/* Stories */}
          <SectionCard
            icon={<BookOpen className="h-10 w-10 text-amber-500" />}
            title="قصص وشهادات"
            description="قصص حية وشهادات من رفاقه وأحبائه عنه."
            href="/al-sayed-hasan/stories"
            delay="delay-900"
          />
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-amber-700">
          <p>مشروع إرث الشهداء – بكل حب ووفاء للأمين على قلوبنا</p>
        </div>
      </div>
    </div>
  );
};

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  delay: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, description, href, delay }) => (
  <Link
    to={href}
    className={`bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group ${delay}`}
  >
    <div className="flex items-center justify-center mb-4">
      <div className="p-3 bg-amber-100 rounded-full group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 group-hover:text-amber-800 transition-colors">{title}</h3>
    <p className="text-sm text-amber-600 group-hover:text-amber-700 transition-colors">{description}</p>
    <div className="mt-4 text-amber-700 text-sm font-semibold group-hover:underline group-hover:text-orange-600">
      استكشاف المزيد →
    </div>
  </Link>
);

export default AlSayyedHasanPage;
