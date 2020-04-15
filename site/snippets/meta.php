<?php

$title = $page->customTitle()->or($page->title() . ' – ' . $site->title());
$description = $page->description()->or($site->description());
$siteThumbnail = $site->thumbnail()->toFile() ? $site->thumbnail()->toFile()->url() : null;
$pageThumbnail = $page->thumbnail()->toFile() ? $page->thumbnail()->toFile()->url() : $siteThumbnail;

?>

<title><?= $title ?></title>
<meta name="description" content="<?= $description ?>">
<link rel="canonical" href="<?= $page->url() ?>">

<meta property="og:type" content="website">
<meta property="og:url" content="<?= $page->url() ?>">
<meta property="og:title" content="<?= $title ?>">
<meta property="og:description" content="<?= $description ?>">
<meta property="og:image" content="<?= $pageThumbnail ?>">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:domain" content="<?= Url::host() ?>">
<meta name="twitter:title" content="<?= $title ?>">
<meta name="twitter:description" content="<?= $description ?>">
<meta name="twitter:image" content="<?= $pageThumbnail ?>">
<meta name="twitter:url" content="<?= $page->url() ?>">

<meta name="application-name" content="<?= $site->title() ?>">
<meta name="theme-color" content="#333333">

<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/img/icons/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/img/icons/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/img/icons/apple-touch-icon.png" sizes="180x180">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="<?= $site->title() ?>">
