<?php

namespace Database\Seeders;

use App\Models\Media;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Image for السيد حسن نصر الله
        Media::create([
            'martyr_id' => 2,
            'user_id' => 12,
            'file_path' => 'photos/al-sayed-hasan.png',
            'file_name' => 'السيد حسن نصر الله',
            'file_type' => 'photo',
            'file_description' => 'صورة للسيد حسن نصر الله.',
            'file_date' => '2020-01-01',
            'file_location' => 'بيروت',
            'views' => 100000,
            'likes' => 2000000,
            'featured' => true,
        ]);

        // Image for عباس خير الدين
        Media::create([
            'martyr_id' => 3,
            'user_id' => 12,
            'file_path' => 'photos/abbas-kheir-eddine.jpg',
            'file_name' => 'الشهيد عباس خير الدين',
            'file_type' => 'photo',
            'file_description' => 'صورة الشهيد عباس خير الدين.',
            'file_date' => '2019-05-15',
            'file_location' => 'بيروت',
            'views' => 300,
            'likes' => 100,
            'featured' => false,
        ]);

        // Video for السيد حسن نصر الله
        Media::create([
            'martyr_id' => 2,
            'user_id' => 12,
            'file_path' => 'videos/al-sayed-hasan.mp4',
            'file_name' => 'مقابلة السيد حسن نصر الله',
            'file_type' => 'video',
            'file_description' => 'مقابلة بالفيديو مع السيد حسن نصر الله.',
            'file_date' => '2020-09-01',
            'file_location' => 'الضاحية الجنوبية',
            'views' => 1000000,
            'likes' => 50000,
            'featured' => true,
        ]);

        // Audio for السيد حسن نصر الله
        Media::create([
            'martyr_id' => 2,
            'user_id' => 12,
            'file_path' => 'audios/ما هو الحب؟؟ بعضُ من كلمات السيد حسن al-sayed-hasan.mp3',
            'file_name' => 'رسالة صوتية للسيد حسن نصر الله',
            'file_type' => 'audio',
            'file_description' => 'رسالة صوتية للسيد حسن نصر الله حول الصمود.',
            'file_date' => '2024-09-02',
            'file_location' => 'بيروت',
            'views' => 500000,
            'likes' => 20000,
            'featured' => false,
        ]);

        // Video for عباس خير الدين
        Media::create([
            'martyr_id' => 3,
            'user_id' => 12,
            'file_path' => 'videos/الشهيد-عباس-خير-الدّين.MP4',
            'file_name' => 'مقابلة عباس خير الدين',
            'file_type' => 'video',
            'file_description' => 'مقابلة بالفيديو مع الشهيد عباس خير الدين.',
            'file_date' => '2017-05-04',
            'file_location' => 'بيروت',
            'views' => 800000,
            'likes' => 40000,
            'featured' => true,
        ]);
    }
}