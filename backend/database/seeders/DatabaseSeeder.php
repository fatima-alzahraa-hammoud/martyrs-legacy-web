<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            MartyrSeeder::class,
            MediaSeeder::class,
            UpdateMartyrImageSeeder::class,
            StorySeeder::class,
            InterviewSeeder::class,
            MartyrWillSeeder::class,
            SpeechSeeder::class,
        ]);
    }
}
