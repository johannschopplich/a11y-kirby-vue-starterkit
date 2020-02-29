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
        $siteData['children'][] = [
            'uri' => $child->uri(),
            'template' => $child->intendedTemplate()->name(),
            'title' => $child->content()->title()->value(),
            'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null
        ];
    }

    return compact('pageTitle' , 'pageDescription', 'pageThumbnail', 'siteData');
};
