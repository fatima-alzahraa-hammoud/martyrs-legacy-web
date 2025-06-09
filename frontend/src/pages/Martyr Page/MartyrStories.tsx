import React, { useState } from "react";

// نوع القصة
interface Story {
  id: number;
  title: string;
  description: string;
  created_at: string;
  image_url?: string | null; // رابط للصورة إن وُجد
}

const MartyrStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);

    return (
        <div>
            {/* مقدمة جميلة */}
            <section>
                <h1>قصص الشهداء</h1>
                <p>
                    في هذه الصفحة نوثق لحظات خالدة من حياة الشّهيد، كما رواها من عرفوهم...
                </p>
                <div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        🔍 بحث
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                        📚 ترتيب
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        ➕ أضف قصة
                    </button>
                </div>
            </section>

            {/* بطاقات القصص */}
            <section>
                {stories.map((story) => (
                    <div
                        key={story.id}
                    >
                        {story.image_url && (
                            <img
                                src={story.image_url}
                                alt={story.title}
                            />
                        )}
                        <div>
                            <h2>
                                {story.title}
                            </h2>
                            <p>{story.description}</p>
                            <p>
                                {new Date(story.created_at).toLocaleDateString("ar-EG", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                            <a
                                href={`/stories/${story.id}`}
                            >
                                اقرأ المزيد →
                            </a>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MartyrStories;