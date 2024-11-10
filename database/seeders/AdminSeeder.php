<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Role::create(['name' => 'vendor']);

        Role::create(['name' => 'admin']);

        Role::create(['name' => 'seller']);

        $admin = User::factory()->create([
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'remember_token' => Str::random(10),
        ]);

        $admin->assignRole('admin');

        $seller = User::factory()->create([
            'name' => 'Seller',
            'email' => 'seller@seller.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);

        $seller->assignRole('seller');

    }
}
