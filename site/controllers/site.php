<?php

return function ($page, $site) {
    $pageTitle = $page->customTitle()->or($page->title() . ' – ' . $site->title());
    $pageDescription = $page->description()->or($site->description());
    $siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : null;
    $pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

    return compact('pageTitle' , 'pageDescription', 'pageThumbnail');
};
