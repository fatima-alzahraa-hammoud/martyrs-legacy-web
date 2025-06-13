<?php

namespace Database\Seeders;

use App\Models\Martyr;
use Illuminate\Database\Seeder;

class MartyrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Martyr::create([
            'first_name' => 'السيد حسن',
            'last_name' => 'نصر الله',
            'mother_name' => 'نهدية',
            'father_name' => 'عبد الكريم',
            'birth_date' => '1960-11-28',
            'place_of_birth' => 'البازوريّة',
            'martyrdom_date' => '2024-09-27',
            'burial_place' => 'ضريح السّيّد - بير حسن',
            'description' => 'السيد حسن نصر الله، رجل يحمل في كلماته عزّة أمة، وفي صموده كرامة شعب.',
            'bio' => 'السيد حسن نصر الله هو الأمين العام لحزب الله في لبنان منذ عام 1992.',
            'famous_quote' => 'إسرائيل أوهن من بيت العنكبوت.',
            'status' => 'martyr',
            'marital_status' => 'married',
            'nb_of_children' => 5,
            'related_phone_nb' => '76687810',
            'is_published' => true,
            'updating' => false,
            'is_updated' => true,
            'user_id_publish' => 12,
        ]);

        Martyr::create([
            'first_name' => 'عباس',
            'last_name' => 'خير الدّين',
            'mother_name' => 'كوثر',
            'father_name' => 'هادي',
            'birth_date' => '1976-03-04',
            'place_of_birth' => 'بيروت',
            'martyrdom_date' => '2024-09-27',
            'burial_place' => 'روضة الحوراء - بيروت',
            'description' => 'الشهيد القائد عباس خير الدين، رجلُ الظلِّ الذي لم يعرف إلا درب النور.',
            'bio' => 'الشهيد عباس خير الدين، المعروف باسم "الحاج رضوان الأول"، هو أحد أبرز قادة العمل الأمني.',
            'famous_quote' => 'نواصل دربكم... ولن يكون إلا النصر.',
            'status' => 'martyr',
            'marital_status' => 'single',
            'nb_of_children' => 5,
            'related_phone_nb' => '78886703',
            'is_published' => true,
            'updating' => false,
            'is_updated' => true,
            'user_id_publish' => 12,
        ]);
    }
}