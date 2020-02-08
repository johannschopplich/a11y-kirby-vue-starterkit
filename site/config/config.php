<?php

$base = dirname(__DIR__, 2);
(new \Beebmx\KirbyEnv($base))->load();

return [

    'debug' => env('KIRBY_DEBUG', false),

    'panel' => [
        'install' => env('KIRBY_INSTALL', false)
    ],

    'routes' => require_once 'routes.php',

    'thumbs' => [
        'quality' => '80',
        'srcsets' => [
            'default' => [360, 720],
            'cover' => [720, 1280, 1920]
        ]
    ],

    'jwt' => [
        'secret' => env('JWT_SECRET', 'secret')
    ],

];
