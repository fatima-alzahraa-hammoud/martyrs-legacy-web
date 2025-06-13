<?php

namespace Database\Seeders;

use App\Models\Interview;
use Illuminate\Database\Seeder;

class InterviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Interviews for السيد حسن نصر الله
        Interview::create([
            'martyr_id' => 1, // Martyr ID for السيد حسن نصر الله
            'user_id' => 12, // Assuming user_id_publish from MartyrSeeder
            'title' => 'مقابلة بالفيديو مع السيد حسن نصر الله',
            'description' => 'مقابلة بالفيديو مع السيد حسن نصر الله حول المقاومة.',
            'document_type' => 'video_message',
            'video_id' => 4,
            'audio_id' => null,
            'image_id' => null,
            'content' => 'في هذه المقابلة، يتحدث السيد حسن نصر الله عن أهمية المقاومة ودورها في تحرير الأرض.',
            'date' => '2024-09-01',
            'outlet' => 'قناة المنار',
            'duration' => '30 دقيقة',
            'views' => '1000000',
        ]);

        Interview::create([
            'martyr_id' => 1,
            'user_id' => 12,
            'title' => 'رسالة صوتية للسيد حسن نصر الله',
            'description' => 'رسالة صوتية للسيد حسن نصر الله حول الصمود.',
            'document_type' => 'audio_message',
            'video_id' => null,
            'audio_id' => 5,
            'image_id' => null,
            'content' => 'في هذه الرسالة الصوتية، يؤكد السيد حسن نصر الله على أهمية الصمود في وجه الاحتلال.',
            'date' => '2024-09-02',
            'outlet' => 'إذاعة النور',
            'duration' => '15 دقيقة',
            'views' => '500000',
        ]);

        Interview::create([
            'martyr_id' => 1,
            'user_id' => 12,
            'title' => 'صورة وتعليق للسيد حسن نصر الله',
            'description' => 'صورة للسيد حسن نصر الله مع تعليق حول المقاومة.',
            'document_type' => 'interview',
            'video_id' => null,
            'audio_id' => null,
            'image_id' => 2, 
            'content' => 'الصورة تظهر السيد حسن نصر الله وهو يتحدث عن أهمية الوحدة الوطنية.',
            'date' => '2024-09-03',
            'outlet' => 'صحيفة الأخبار',
            'duration' => null,
            'views' => '300000',
        ]);

        // Interviews for عباس خير الدين
        Interview::create([
            'martyr_id' => 2, // Martyr ID for عباس خير الدين
            'user_id' => 12,
            'title' => 'مقابلة بالفيديو مع عباس خير الدين',
            'description' => 'مقابلة بالفيديو مع الشهيد عباس خير الدين حول العمل الأمني.',
            'document_type' => 'video_message',
            'video_id' => 6,
            'audio_id' => null,
            'image_id' => null,
            'content' => 'في هذه المقابلة، يتحدث الشهيد عباس خير الدين عن دوره في العمل الأمني.',
            'date' => '2024-09-04',
            'outlet' => 'قناة الميادين',
            'duration' => '25 دقيقة',
            'views' => '800000',
        ]);

        Interview::create([
            'martyr_id' => 2,
            'user_id' => 12,
            'title' => 'صورة وتعليق لعباس خير الدين',
            'description' => 'صورة للشهيد عباس خير الدين مع تعليق حول العمل الأمني.',
            'document_type' => 'interview',
            'video_id' => null,
            'audio_id' => null,
            'image_id' => 2,
            'content' => 'الصورة تظهر الشهيد عباس خير الدين وهو يتحدث عن أهمية السرية في العمل الأمني.',
            'date' => '2024-09-06',
            'outlet' => 'صحيفة الأخبار',
            'duration' => null,
            'views' => '200000',
        ]);
    }
}