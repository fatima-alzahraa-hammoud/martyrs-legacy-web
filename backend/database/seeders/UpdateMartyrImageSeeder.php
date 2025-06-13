<?php

namespace Database\Seeders;

use App\Models\Martyr;
use Illuminate\Database\Seeder;

class UpdateMartyrImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Update السيد حسن نصر الله
        Martyr::where('id', 1)->update(['image_id' => 1]);

        // Update عباس خير الدين
        Martyr::where('id', 2)->update(['image_id' => 2]);
    }
}