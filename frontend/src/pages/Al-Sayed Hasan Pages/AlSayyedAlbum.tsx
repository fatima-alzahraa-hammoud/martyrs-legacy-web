import React, { useState } from "react";
import type { MediaItem } from "../../types/types";

const AlSayyedAlbum: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [search, setSearch] = useState<string>("");

    const filteredItems = mediaItems.filter((item) =>
        item.file_name.includes(search) || item.file_description.includes(search)
    );

    return (
        <div>
            <h1>ألبوم السيد حسن</h1>
            <p>توثيق مصور لأهم اللحظات والمناسبات مع السيد.</p>

            <div>
                <input
                    type="text"
                    placeholder="🔍 ابحث في الألبوم..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id}>
                            <div>
                                {item.file_type === "photo" ? (
                                    <img
                                        src={item.file_path}
                                        alt={item.file_name}
                                    />
                                ) : (
                                    <video
                                        controls
                                        src={item.file_path}
                                    />
                                )}
                            </div>
                            <div>
                                <h2>{item.file_name}</h2>
                                <p>{item.file_description}</p>
                                <div>
                                    <span>📅 {item.file_date}</span>
                                    <span>📁 {item.file_type}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p >لا توجد وسائط مطابقة للبحث.</p>
                )}
            </div>
        </div>
    );
};

export default AlSayyedAlbum;
