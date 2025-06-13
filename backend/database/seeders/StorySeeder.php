<?php

namespace Database\Seeders;

use App\Models\Story;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Story for السيد حسن نصر الله
        Story::create([
            'user_id' => 12,
            'martyr_id' => 2, 
            'title' => 'السيد حسن نصر الله: قائد المقاومة',
            'description' => 'قصة حياة السيد حسن نصر الله، قائد المقاومة اللبنانية.',
            'content' => 'السيد حسن نصر الله، قائد المقاومة اللبنانية، كان رمزًا للصمود والتحدي. قاد المقاومة في أصعب الظروف وحقق انتصارات تاريخية أبرزها تحرير الجنوب عام 2000. كان خطابه الشهير "إسرائيل أوهن من بيت العنكبوت" مصدر إلهام للملايين.',
            'author' => 'محمد علي',
            'category' => 'القيادة',
            'readTime' => '10 دقائق',
            'likes' => 150,
            'featured' => true,
            'updating' => false,
            'isUpdated' => true,
            'isPublished' => true,
            'date' => '2024-09-28',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Story for عباس خير الدين
        Story::create([
            'user_id' => 12,
            'martyr_id' => 3,
            'title' => 'عباس خير الدين: رجل الظل',
            'description' => 'قصة الشهيد عباس خير الدين، أحد أبرز قادة العمل الأمني في المقاومة.',
            'content' => 'الشهيد عباس خير الدين، المعروف باسم "الحاج رضوان الأول"، كان من أوائل القادة الأمنيين الذين أسسوا جهاز الأمن والمعلومات في المقاومة. عمل في صمت وترك بصمة لا تُنسى في تاريخ المقاومة. كان دوره محوريًا في حماية المقاومة وتطوير قدراتها الاستخباراتية.',
            'author' => 'علي حسن',
            'category' => 'الأمن والمقاومة',
            'readTime' => '8 دقائق',
            'likes' => 120,
            'featured' => false,
            'updating' => false,
            'isUpdated' => true,
            'isPublished' => true,
            'date' => '2024-09-28',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}