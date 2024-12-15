<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\InstallAppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerController;
use App\Http\Controllers\VendorController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Profiler\Profile;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['verify.embedded', 'verify.shopify', 'role:vendor']], function () {

    Route::get('/', [ProfileController::class, 'welcome'])->name('home');

    Route::get('/vendor/dashboard', [VendorController::class, 'index'])->name('vendor.dashboard');

    Route::get('/vendor/products/', [VendorController::class, 'products'])->name('vendor.products');

    Route::post('/vendor/productdetails', [VendorController::class, 'productdetails'])->name('vendor.productdetails');

    Route::post('/vendor/import-products', [VendorController::class, 'importproduct'])->name('vendor.importproduct');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});

/*
|--------------------------------------------------------------------------
| Seller Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/admin', [SellerController::class, 'seller_login_create'])->name('seller.login');
Route::post('/admin', [SellerController::class, 'seller_login_store'])->name('seller.login');

Route::group(['middleware' => ['role:seller']], function () {

    Route::get('/seller/dashboard', [SellerController::class, 'index'])->name('seller.dashboard');

    Route::post('/seller/logout', [SellerController::class, 'seller_logout'])->name('seller.logout');

    // Route::get('/seller/dashboard', [SellerController::class, 'index'])->name('seller.dashboard');

    Route::get('/seller/products', [SellerController::class, 'products'])->name('seller.products');

    // Route::post('/seller/import-products', [SellerController::class, 'importproduct'])->name('seller.importproduct');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

});

// admin.dashboard
// Route::group(['middleware' => ['role:seller']], function () {
//     Route::get('/admin', function () {
//         return Inertia::render('Admin');
//     })->name('admin');
// });



Route::get('/installapp', [InstallAppController::class, 'index'])->name('shopify-app.install');
Route::post('/installingapp', [InstallAppController::class, 'store'])->name('shopify-app.installing');
Route::post('/app/uninstall', [InstallAppController::class, 'destory'])->name('app.uninstall');

// Webhook
Route::post('/webhook/app-uninstalled', [InstallAppController::class, 'handleAppUninstalled'])->name('webhook.app.uninstalled');


require __DIR__ . '/auth.php';
