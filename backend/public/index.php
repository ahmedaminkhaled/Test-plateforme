<?php

use Illuminate\Http\Request;

// Auto-load local pdo_pgsql extension if not globally present
if (!extension_loaded('pdo_pgsql') && file_exists(__DIR__ . '/../ext/usr/lib/php/20250925/pdo_pgsql.so')) {
    $libPath = __DIR__ . '/../ext/usr/lib/x86_64-linux-gnu';
    putenv("LD_LIBRARY_PATH={$libPath}:" . (getenv('LD_LIBRARY_PATH') ?: ''));
}

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());
