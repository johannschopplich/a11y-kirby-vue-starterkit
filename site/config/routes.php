<?php

return [
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
    ],
    [
        'pattern' => '(:all).panel',
        'action'  => function ($id) {
            if (kirby()->user() && $page = page($id)) {
                go($page->panelUrl());
            }
        }
    ],
    [
        'pattern' => ['(:all)'],
        'action'  => function ($pageId) {
            $kirby = kirby();
            $site = site();

            // Enable CORS for Vue development environment
            if (option('debug') === true) header('Access-Control-Allow-Origin: *');

            if (empty($pageId)) $pageId = $site->homePage()->id();
            if ($pageId === 'index.html') $pageId = $site->homePage()->id();
            $page = page($pageId) ?? page('error');

            if (get('content') === 'json') {
                return $page;
            } else {
                $shared = $kirby->controller('site', compact('page', 'site'));
                return tpl::load($kirby->roots()->snippets() . '/vue-index.php', A::merge($shared, compact('page', 'site')), false);
            }
        }
    ]
];
