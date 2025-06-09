import React, { useState } from "react";
import type { MediaItem } from "../../types/types";

const AlSayyedAlbum: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [search, setSearch] = useState<string>("");

    const filteredItems = mediaItems.filter((item) =>
        item.file_name.includes(search) || item.file_description.includes(search)
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-red-800 text-center mb-2">ألبوم السيد حسن</h1>
            <p className="text-center text-gray-600 mb-6">توثيق مصور لأهم اللحظات والمناسبات مع السيد.</p>

            <div className="max-w-xl mx-auto mb-6">
                <input
                    type="text"
                    placeholder="🔍 ابحث في الألبوم..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="h-48 bg-black flex items-center justify-center">
                                {item.file_type === "photo" ? (
                                <img
                                    src={item.file_path}
                                    alt={item.file_name}
                                    className="object-cover h-full w-full"
                                />
                                ) : (
                                <video
                                    controls
                                    src={item.file_path}
                                    className="h-full w-full object-cover"
                                />
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-red-700">{item.file_name}</h2>
                                <p className="text-gray-600 mt-1">{item.file_description}</p>
                                <div className="text-sm text-gray-500 mt-2 flex justify-between">
                                    <span>📅 {item.file_date}</span>
                                    <span className="text-xs text-gray-400">📁 {item.file_type}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">لا توجد وسائط مطابقة للبحث.</p>
                )}
            </div>
        </div>
    );
};

export default AlSayyedAlbum;
