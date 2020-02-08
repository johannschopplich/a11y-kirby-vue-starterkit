<?php

if ($photographyPage = page('photography')) {
  foreach ($photographyPage->children()->listed() as $album) {
    $albums[] = [
      'url' => $album->uri(),
      'title' => $album->content()->title()->value(),
      'image' => [
        'src' => $album->content()->cover()->toFile() ? $album->content()->cover()->toFile()->resize(1024, 1024)->url() : '',
        'alt' => $album->content()->cover()->toFile() ? $album->content()->cover()->toFile()->alt()->value() : ''
      ]
    ];
  }
}

$data = [
  'title' => $page->title()->value(),
  'albums' => $albums
];

echo json_encode($data);
