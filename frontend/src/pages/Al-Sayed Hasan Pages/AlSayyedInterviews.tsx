import React, { useState } from "react";
import type { Interview } from "../../types/types";



const getTypeLabel = (type: Interview["document_type"]) => {
    switch (type) {
        case "interview":
            return "🎙️ مقابلة";
        case "letter":
            return "📝 رسالة";
        case "audio_message":
            return "🔊 رسالة صوتية";
        case "video_message":
            return "🎥 رسالة مرئية";
        default:
            return "📄 مستند";
    }
};

const AlSayyedInterviews: React.FC = () => {
    const [interviews] = useState<Interview[]>([]);

    return (
        <div>
            <h1>
                مقابلات ورسائل السيد حسن نصر الله
            </h1>
            <p>
                توثيق لأهم المقابلات، الرسائل الصوتية، والمرئية لسماحة السيد.
            </p>

            <div>
                {interviews.map((item) => (
                    <div
                        key={item.id}
                    >
                        <div>
                            <h2>{item.title}</h2>
                            <span>{getTypeLabel(item.document_type)}</span>
                        </div>
                        <p>{item.description}</p>
                        <div>
                            <span>📺 الجهة: {item.outlet}</span>
                            <span>📅 التاريخ: {item.date}</span>
                        </div>

                        {/* Render media */}
                        {item.video_url && (
                            <div>
                                <video controls>
                                <source src={item.video_url} type="video/mp4" />
                                    متصفحك لا يدعم تشغيل الفيديو.
                                </video>
                            </div>
                        )}
                        {item.audio_url && (
                            <div>
                                <audio controls>
                                <source src={item.audio_url} type="audio/mp3" />
                                    متصفحك لا يدعم تشغيل الصوت.
                                </audio>
                            </div>
                        )}
                        {item.image_url && (
                            <div >
                                <img
                                    src={item.image_url}
                                    alt="رسالة مصورة"
                                />
                            </div>
                        )}

                        {/* Content */}
                        {item.content && (
                            <div>
                                {item.content}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlSayyedInterviews;
