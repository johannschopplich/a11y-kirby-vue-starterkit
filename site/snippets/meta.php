<title><?= $pageTitle ?></title>
<meta name="description" content="<?= $pageDescription ?>">
<link rel="canonical" href="<?= $page->url() ?>">

<meta property="og:type" content="website">
<meta property="og:url" content="<?= $page->url() ?>">
<meta property="og:title" content="<?= $pageTitle ?>">
<meta property="og:description" content="<?= $pageDescription ?>">
<meta property="og:image" content="<?= $pageThumbnail ?>">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:domain" content="<?= Url::host() ?>">
<meta name="twitter:title" content="<?= $pageTitle ?>">
<meta name="twitter:description" content="<?= $pageDescription ?>">
<meta name="twitter:image" content="<?= $pageThumbnail ?>">
<meta name="twitter:url" content="<?= $page->url() ?>">

<?php /*
<meta name="application-name" content="<?= $site->title() ?>">
<meta name="theme-color" content="#333333">

<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/img/favicon-32x32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/img/favicon-16x16.png" sizes="16x16" type="image/png">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png" sizes="180x180">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="<?= $site->title() ?>">
*/ ?>
