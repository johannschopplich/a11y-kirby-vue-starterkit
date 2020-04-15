<?php

return [
    [
        'pattern' => 'index.html',
        'action'  => function () {
            return page('home');
        }
    ],
    [
        'pattern' => ['(:all).json'],
        'action'  => function ($pageId) {
            $kirby = kirby();
            $site = site();
            $page = page($pageId) ?? page('error');
            $tplPath = $kirby->roots()->templates() . '/' . $page->intendedTemplate() . '.json.php';

            $kirby->response()->json();
            return tpl::load($tplPath, compact('page', 'site'), false);
        }
    ],
    [
        'pattern' => 'robots.txt',
        'method'  => 'ALL',
        'action'  => function () {
            $robots = 'User-agent: *' . PHP_EOL;
            $robots .= 'Allow: /' . PHP_EOL;
            $robots .= 'Sitemap: ' . url('sitemap.xml');
            return kirby()
                ->response()
                ->type('text')
                ->body($robots);
        }
    ]
];
