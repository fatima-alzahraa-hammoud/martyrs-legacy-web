<?php

namespace Database\Seeders;

use App\Models\MartyrWill;
use Illuminate\Database\Seeder;

class MartyrWillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MartyrWill::create([
            'martyr_id' =>3, // Martyr ID for الشهيد عباس خير الدين
            'user_id' => 12, // Assuming user_id_publish from MartyrSeeder
            'title' => 'وصية الشهيد عباس خير الدين',
            'description' => 'وصية تركها الشهيد عباس خير الدين قبل استشهاده.',
            'document_type' => 'will',
            'video_id' => null,
            'audio_id' => null,
            'image_id' => 2, // Assuming this is the image ID for الشهيد عباس خير الدين
            'content' => json_encode([
                'message' => 'إلى أهلي وأحبتي، أترك لكم إرث المقاومة والصمود. حافظوا على الأرض والعزة، ولا تنسوا أن النصر دائمًا يأتي بالصبر والإيمان.',
            ]),
            'date' => '2024-09-15',
        ]);
    }
}