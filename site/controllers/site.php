<?php

return function ($page, $site) {
    $pageTitle = $page->customTitle()->or($page->title() . ' – ' . $site->title());
    $pageDescription = $page->description()->or($site->description());
    $siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : null;
    $pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

    $siteData = [
        'title' => $site->title()->value()
    ];

    foreach ($site->children()->listed() as $child) {
        $grandChildren = [];

        foreach($child->children()->listed() as $grandChild) {
            $grandChildren[] = [
                'id' => $grandChild->id(),
                'template' => $grandChild->intendedTemplate()->name()
            ];
        }

        $siteData['children'][] = [
            'id' => $child->id(),
            'template' => $child->intendedTemplate()->name(),
            'title' => $child->content()->title()->value(),
            'children' => $grandChildren
        ];
    }

    return compact('pageTitle' , 'pageDescription', 'pageThumbnail', 'siteData');
};
