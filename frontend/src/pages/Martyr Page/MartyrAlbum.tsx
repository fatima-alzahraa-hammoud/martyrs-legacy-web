import React, { useState } from "react";

interface MediaItem {
  id: number;
  file_path: string;
  file_name: string;
  file_type: "photo" | "video" | "audio";
  file_kind: "interviews" | "identity" | "personal";
  file_description: string;
  file_date: string;
  file_location?: string | null;
}

const MartyrAlbumPage: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

    return (
        <div>
            {/* مقدمة */}
            <section>
                <h1>ألبوم الشهيد</h1>
                <p>
                    نحتفظ هنا بصور وفيديوهات وتسجيلات الشهيد لتبقى حيًّا في الذاكرة، وترتبط أرواحنا بصوته وصورته وآثاره.
                </p>
            </section>

            {/* أدوات التحكم */}
            <section>
                <input
                    type="text"
                    placeholder="ابحث عن الوسائط..."
                    className="w-full md:w-1/3 px-4 py-2 border rounded-xl"
                />
                <select>
                    <option value="latest">الأحدث أولًا</option>
                    <option value="oldest">الأقدم أولًا</option>
                    <option value="photo">صور فقط</option>
                    <option value="video">فيديو فقط</option>
                    <option value="audio">صوتيات فقط</option>
                </select>
                <button>
                    + إضافة وسائط
                </button>
            </section>

            {/* شبكة الألبوم */}
            <section>
                {mediaItems.map((item) => (
                    <div
                        key={item.id}
                    >
                        <div>
                            {item.file_type === "photo" && (
                                <img
                                    src={item.file_path}
                                    alt={item.file_name}
                                />
                            )}
                            {item.file_type === "video" && (
                                <video controls>
                                    <source src={item.file_path} type="video/mp4" />
                                </video>
                            )}
                            {item.file_type === "audio" && (
                                <audio controls>
                                    <source src={item.file_path} type="audio/mpeg" />
                                </audio>
                            )}
                        </div>
                        <div>
                            <h3>{item.file_name}</h3>
                            <p>{item.file_description}</p>
                            <p>
                                {new Date(item.file_date).toLocaleDateString("ar-EG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                })}
                            </p>
                            <span>
                                {item.file_type === "photo"
                                ? "صورة"
                                : item.file_type === "video"
                                ? "فيديو"
                                : "تسجيل صوتي"}
                            </span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MartyrAlbumPage;
