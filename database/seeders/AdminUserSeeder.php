<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@mojib.dev'],
            [
                'name'     => 'Mohammed Mojib',
                'email'    => 'admin@mojib.dev',
                'password' => Hash::make('Mojib@2026!'),
                'role'     => 'admin',
            ]
        );
    }
}
