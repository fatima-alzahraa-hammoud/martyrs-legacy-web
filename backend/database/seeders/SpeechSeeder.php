<?php

namespace Database\Seeders;

use App\Models\Speech;
use Illuminate\Database\Seeder;

class SpeechSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Speech::create([
            'martyr_id' => 2, // Martyr ID for السيد حسن نصر الله
            'user_id' => 12, // Assuming user_id_publish from MartyrSeeder
            'title' => 'خطاب السيد حسن نصر الله: المقاومة هي الحياة',
            'description' => 'خطاب ملهم للسيد حسن نصر الله حول أهمية المقاومة.',
            'document_type' => 'speech',
            'video_id' => 4, // Assuming this is the video ID for السيد حسن نصر الله's speech
            'audio_id' => null,
            'image_id' => 2, // Assuming this is the image ID for السيد حسن نصر الله
            'content' => 'في هذا الخطاب، يؤكد السيد حسن نصر الله أن المقاومة ليست مجرد خيار، بل هي واجب وضرورة لتحرير الأرض وحماية الكرامة.',
            'date' => '2024-09-10',
            'duration' => '20 دقيقة',
            'category' => 'المقاومة',
            'occasion' => 'ذكرى التحرير',
            'audio_url' => null,
            'transcript_url' => 'uploads/transcripts/al-sayed-hasan-speech.pdf',
            'views' => 1500000,
            'featured' => true,
            'tags' => json_encode(['المقاومة', 'التحرير', 'الوحدة']),
        ]);
    }
}