<?php

return [
    [
        'pattern' => 'index.html',
        'action'  => function () {
            return page('home');
        }
    ],
    [
        'pattern' => 'robots.txt',
        'method' => 'ALL',
        'action' => function () {
            $robots = 'User-agent: *' . PHP_EOL;
            $robots .= 'Allow: /' . PHP_EOL;
            $robots .= 'Sitemap: ' . url('sitemap.xml');
            return kirby()
                ->response()
                ->type('text')
                ->body($robots);
        }
    ],
    [
        'pattern' => '(:all).panel',
        'action' => function ($id) {
            if (kirby()->user() && $page = page($id)) {
                go($page->panelUrl());
            }
        }
    ],
    // [
    //     'pattern' => '(:any).json',
    //     'action'  => function ($any) {
    //         $fetchHeader = $_SERVER['HTTP_X_REQUESTED_WITH'] ?? null;

    //         // Somewhat secure JSON output from direct access in production environment
    //         if (option('debug') === false && $fetchHeader === null) {
    //             go(url('error'));
    //         }

    //         $this->next();
    //     }
    // ]
];
