export interface Martyr {
    id: number;
    name: string;
    first_name: string;
    father_name: string;
    last_name: string;
    full_name: string
    description: string;
    martyrdom_date: string;
    image_url: string;
};

export interface Interview {
    title: string;
    date: string;
};

export interface Story {
    title: string;
    description: string;
};

export interface Will  {
    id: number;
    martyr_id:number;
    date:number;
};

export interface MediaItem {
    id: number;
    file_path: string;
    file_name: string;
    file_type: "photo" | "video" | "audio";
    file_kind: "interviews" | "identity" | "personal";
    file_description: string;
    file_date: string;
    file_location?: string | null;
}