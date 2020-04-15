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

            if (empty($pageId)) $pageId = $site->homePage()->id();
            $page = page($pageId) ?? page('error');

            $shared = $kirby->controller('site', compact('page', 'site'));
            $kirby->response()->json();
            return tpl::load($kirby->roots()->templates() . '/' . $page->intendedTemplate() . '.json.php', A::merge($shared, compact('page', 'site')), false);
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
