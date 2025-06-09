import React, { useState } from "react";
import type { Interview } from "../../types/types";



const MartyrInterviews: React.FC = () => {
    const [interviews, setInterviews] = useState<Interview[]>([]);

    return (
        <div>
            {/* المقدمة */}
            <section>
                <h1>مقابلات الشهيد</h1>
                <p>
                    نعرض في هذه الصفحة المقابلات الخاصة بالشهداء كما نُشرت أو وُثّقت، لنحفظ
                    معالم نفوسهم العظيمة وتفاصيل حياتهم التي تنبض بالإيمان والشهادة.
                </p>
            </section>

            {/* المقابلات */}
            <section>
                {interviews.map((interview) => (
                    <div
                        key={interview.id}
                    >
                        {interview.image_url && (
                            <img
                                src={interview.image_url}
                                alt={interview.title}
                            />
                        )}

                        <div>
                            <h2>
                                {interview.title}
                            </h2>
                            <p>{interview.description}</p>
                            <p>
                                {new Date(interview.date).toLocaleDateString("ar-EG", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            {/* نوع الوسائط */}
                            {interview.video_url && (
                                <video controls>
                                <source src={interview.video_url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            {interview.audio_url && (
                                <audio controls>
                                    <source src={interview.audio_url} type="audio/mpeg" />
                                    Your browser does not support the audio tag.
                                </audio>
                            )}

                            {/* اقرأ المزيد إن كانت نص */}
                            {interview.content && (
                                <a
                                    href={`/interviews/${interview.id}`}
                                >
                                    اقرأ المزيد →
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default MartyrInterviews;