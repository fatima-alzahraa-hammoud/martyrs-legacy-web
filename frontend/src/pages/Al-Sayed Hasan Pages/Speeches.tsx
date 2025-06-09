import React, { useState } from "react";
import type { Speech } from "../../types/types";

const Speeches: React.FC = () => {
    const [speeches, setSpeeches] = useState<Speech[]>([]);
    const [search, setSearch] = useState("");

    const filteredSpeeches = speeches.filter((item) =>
        item.title.includes(search) || item.description.includes(search)
    );

    return (
        <div>
            <h1>خُطب السيد</h1>
            <p>أرشيف لأهم الخُطب والكلمات التي ألقاها.</p>

            <div>
                <input
                    type="text"
                    placeholder="ابحث عن خطبة..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button>
                    + أضف خطبة
                </button>
            </div>

            <div>
                {filteredSpeeches.map((item) => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>📅 {item.date}</p>
                        <a href="#">
                            قراءة المزيد →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Speeches;
