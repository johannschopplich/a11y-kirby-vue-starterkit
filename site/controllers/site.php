<?php

return function ($page, $site) {
    $pageTitle = (!$page->isHomePage() ? $page->title() . ' – ' : '') . $site->title();
    $pageDescription = $page->description()->or($site->description());
    $siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : '';
    $pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

    foreach ($site->children()->listed() as $child) {
        $index[] = [
            'url' => $child->uri(),
            'template' => $child->intendedTemplate()->name(),
            'title' => $child->content()->title()->value(),
            'hasChildren' => $child->hasChildren(),
            'childTemplate' => $child->hasChildren() ? $child->children()->first()->intendedTemplate()->name() : null
        ];
    }

    $siteData = [
        'title' => $site->title()->value(),
        'children' => $index
    ];

    return [
        'pageTitle' => $pageTitle,
        'pageDescription' => $pageDescription,
        'pageThumbnail' => $pageThumbnail,
        'siteData' => $siteData
    ];
};
