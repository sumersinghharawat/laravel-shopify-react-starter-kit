<?php

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

require __DIR__ . '/auth.php';
