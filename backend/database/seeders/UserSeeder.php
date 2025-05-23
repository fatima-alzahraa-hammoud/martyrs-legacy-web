<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::firstOrCreate(['role' => 'admin']);
        $editor = Role::firstOrCreate(['role' => 'editor']);
        $viewer = Role::firstOrCreate(['role' => 'user']);

        // Create one fixed admin user (for login/testing)
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('123456789'),
            'phone_number' => '70123456',
            'role_id' => $admin->id,
        ]);

        // Create 5 editor users using factory
        User::factory()->count(5)->create([
            'role_id' => $editor->id,
        ]);

        // Create 5 viewer users using factory
        User::factory()->count(5)->create([
            'role_id' => $viewer->id,
        ]);
    }
}
