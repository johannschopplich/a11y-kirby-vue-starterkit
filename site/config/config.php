<?php

$base = dirname(__DIR__, 2);
(new \Beebmx\KirbyEnv($base))->load();

return [

    'debug' => env('KIRBY_DEBUG', false),

    'panel' => [
        'install' => env('KIRBY_PANEL_INSTALL', false),
        'slug' => env('KIRBY_PANEL_SLUG', 'panel')
    ],

    'routes' => require_once 'routes.php',

    'cache' => [
        'pages' => [
            'active' => env('KIRBY_CACHE', false),
            'ignore' => function ($page) {
                $options = $page->blueprint()->options();
                return isset($options['cache']) ? !$options['cache'] : false;
            }
        ]
    ],

    'thumbs' => [
        'quality' => '80',
        'srcsets' => [
            'default' => [360, 720],
            'cover' => [720, 1280, 1920]
        ]
    ]

];
