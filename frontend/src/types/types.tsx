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