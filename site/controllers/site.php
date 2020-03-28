<?php

return function ($page, $site) {
    $pageTitle = $page->customTitle()->or($page->title() . ' – ' . $site->title());
    $pageDescription = $page->description()->or($site->description());
    $siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : null;
    $pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

    $siteData = [
        'title' => $site->title()->value(),
        'children' => array_values($site->children()->published()->map(function ($child) {
            return [
                'id' => $child->id(),
                'title' => $child->content()->title()->value(),
                'template' => $child->intendedTemplate()->name(),
                'isListed' => $child->isListed(),
                'children' => array_values($child->children()->published()->map(function ($grandChild) {
                    return [
                        'id' => $grandChild->id(),
                        'template' => $grandChild->intendedTemplate()->name()
                    ];
                })->data())
            ];
        })->data())
    ];

    return compact('pageTitle' , 'pageDescription', 'pageThumbnail', 'siteData');
};
