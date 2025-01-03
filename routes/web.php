<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// my work

Route::get('/home', function () {
   return Inertia::render('Welcome');
});

Route::get('/admin', function () {
   return Inertia::render('admin/Index');
})->name('index');

Route::name('admin.')->group(function () {
// Route::inertia('/admin', 'admin/Products/Index')->name('index');
Route::resource('/category', CategoryController::class);
Route::resource('/product', ProductController::class);
Route::delete('/admin/product-images/{image}', [ProductController::class, 'deleteImage'])->name('product-images.destroy');
});

// end

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
