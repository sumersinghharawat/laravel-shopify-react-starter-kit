<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopifyAppController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



// Shopify App Routes
Route::group(['middleware' => ['verify.embedded', 'verify.shopify']], function () {

    Route::get('/', [ShopifyAppController::class, 'index'])->name('home');

    // Route::post('/shopify-app-installing', [ShopifyAppController::class, 'appinstalling'])->name('shopify-app-installing');

    // Route::get('/shopify-app-install', [ShopifyAppController::class, 'appinstallation'])->name('shopify-app-install');

    Route::get('/dashboard', [ShopifyAppController::class, 'index'])->name('dashboard');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});

require __DIR__ . '/auth.php';
