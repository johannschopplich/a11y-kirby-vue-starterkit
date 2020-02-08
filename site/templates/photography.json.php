<?php

foreach ($page->children()->listed() as $album) {
  $albums[] = [
    'url' => $album->uri(),
    'title' => $album->content()->title()->value(),
    'image' => [
      'url' => $album->content()->cover()->toFile() ? $album->content()->cover()->toFile()->crop(800, 1000)->url() : '',
      'alt' => $album->content()->cover()->toFile() ? $album->content()->cover()->toFile()->alt()->value() : ''
    ]
  ];
}

$data = [
  'title' => $page->title()->value(),
  'albums' => $albums
];

echo json_encode($data);
