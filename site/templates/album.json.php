<?php

$cover = $page->cover()->toFile() ? [
  'url' => $page->cover()->toFile()->crop(1024, 768)->url(),
  'alt' => $page->cover()->toFile()->alt()->value()
] : null;

foreach ($page->images()->sortBy('sort') as $image) {
  $gallery[] = [
    'link' => $image->link()->value(),
    'url' => $image->crop(800, 1000)->url(),
    'alt' => $image->alt()->value()
  ];
}

$data = [
  'title' => $page->title()->value(),
  'cover' => $cover,
  'headline' => $page->headline()->value(),
  'description' => $page->description()->kt()->value(),
  'tags' => $page->tags()->value(),
  'gallery' => $gallery
];

echo json_encode($data);
