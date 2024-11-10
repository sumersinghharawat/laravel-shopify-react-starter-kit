<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\InstallAppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Profiler\Profile;

Route::group(['middleware' => ['verify.embedded', 'verify.shopify', 'role:vendor']], function () {

    Route::get('/', [ProfileController::class, 'welcome'])->name('home');

    Route::get('/vendor/dashboard', [VendorController::class, 'index'])->name('vendor.dashboard');

    Route::get('/vendor/products', [VendorController::class, 'products'])->name('vendor.products');

    Route::post('/vendor/import-products', [VendorController::class, 'importproduct'])->name('vendor.importproduct');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});


Route::group(['middleware' => ['role:admin']], function () {

    Route::get('/dashboard', [ProfileController::class, 'index'])->name('dashboard');

    Route::get('/admin', function () {
        return Inertia::render('Admin');
    })->name('admin');
});

Route::get('/installapp', [InstallAppController::class, 'index'])->name('shopify-app.install');
Route::post('/installingapp', [InstallAppController::class, 'store'])->name('shopify-app.installing');
Route::post('/app/uninstall', [InstallAppController::class, 'destory'])->name('app.uninstall');

// Webhook
Route::post('/webhook/app-uninstalled', [InstallAppController::class, 'handleAppUninstalled'])->name('webhook.app.uninstalled');


require __DIR__ . '/auth.php';
