export interface Martyr {
    id: number;
    name: string;
    first_name: string;
    father_name: string;
    mother_name: string;
    last_name: string;
    description: string;
    place_of_birth: string;
    birth_date: string;
    martyrdom_date: string;
    burial_place: string;
    status: string;
    marital_status: string;
    nb_of_childen: number;
    related_phone_nb: string;
    image: {
        id: number;
        file_path: string;
    }
    bio: string;
    famous_quote: string;
};

export interface Interview {
    id: number;
    title: string;
    description: string;
    content: string;
    date: string;
    document_type: "interview" | "letter" | "audio_message" | "video_message";
    video_url?: string | null;
    audio_url?: string | null;
    image_url?: string | null;
    outlet: string;
    duration?: string | null;
    views?: string | null;

};

export interface Story {
    id: number;
    title: string;
    description: string;
    created_at: string;
    date: string;
    image_url?: string | null;
    content: string;
    author: string;
    category: string;
    readTime: string;
    likes: number;
    featured: boolean;


};

export interface MediaItem {
    id: number;
    file_path: string;
    file_name: string;
    file_type: "photo" | "video" | "audio";
    file_description: string;
    file_date: string;
    file_location?: string | null;
    views?: number;
    likes?: number;
    featured: boolean;
}

export interface MartyrWill {
    id: number;
    martyrName: string; // fetched from Martyr
    martyrdomDate: string; // fetched from Martyr
    martyr_id: number;
    user_id: number;
    title: string;
    description: string;
    document_type: "will" | "letter" | "audio_message" | "video_message";
    content: string;
    date: string;
    video_url?: string | null; 
    audio_url?: string | null;
    image_url?: string | null;
}

export interface Speech {
    id: number;
    title: string;
    description: string;
    document_type: "speech" | "audio_message" | "video_message" | 'letter';
    content: string;
    date: Date;
    duration: string;
    category: string;
    occasion: string;
    audio_url?: string | null;
    transcript_url?: string | null;
    video_url?: string | null;
    image_url?: string | null;
    views?: string | null;
    featured: boolean;
    tags: string[];
}