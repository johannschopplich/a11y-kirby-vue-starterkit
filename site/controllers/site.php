<?php

return function ($page, $site) {
    $pageTitle = $page->customTitle()->or($page->title() . ' – ' . $site->title());
    $pageDescription = $page->description()->or($site->description());
    $siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : null;
    $pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

    $siteData = [
        'title' => $site->title()->value()
    ];

    foreach ($site->children()->published() as $child) {
        $grandChildren = [];

        foreach($child->children()->published() as $grandChild) {
            $grandChildren[] = [
                'id' => $grandChild->id(),
                'template' => (string) $grandChild->template()
            ];
        }

        $siteData['children'][] = [
            'id' => $child->id(),
            'title' => $child->content()->title()->value(),
            'template' => (string) $child->template(),
            'isListed' => $child->isListed(),
            'children' => $grandChildren
        ];
    }

    return compact('pageTitle' , 'pageDescription', 'pageThumbnail', 'siteData');
};
