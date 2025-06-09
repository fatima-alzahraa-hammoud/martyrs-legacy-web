import React, { useState } from "react";

export interface Story {
  id: number;
  title: string;
  description: string;
  date: string;
}

const AlSayyedStories: React.FC = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [search, setSearch] = useState<string>("");

    const filteredStories = stories.filter((story) =>
        story.title.includes(search) || story.description.includes(search)
    );

    return (
        <div >
            <h1>قصص عن السيد حسن</h1>
            <p>
                تأملات وذكريات حقيقية تعبّر عن الشجاعة، الحكمة، والرحمة في حياة السيد.
            </p>

            <div>
                <input
                    type="text"
                    placeholder="🔍 ابحث عن قصة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div>
                {filteredStories.length > 0 ? (
                    filteredStories.map((story) => (
                        <div key={story.id}>
                        <h2>{story.title}</h2>
                        <p>{story.description}</p>
                        <p>📅 {story.date}</p>
                        <a
                            href="#"
                        >
                            قراءة المزيد →
                        </a>
                        </div>
                    ))
                ) : (
                    <p>لا توجد قصص تطابق البحث.</p>
                )}
            </div>
        </div>
    );
};

export default AlSayyedStories;
