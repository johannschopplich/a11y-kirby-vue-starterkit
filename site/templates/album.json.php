<?php

$data = [
  'title' => $page->title()->value(),
  'headline' => $page->headline()->or($page->title())->value(),
  'description' => $page->description()->kt()->value(),
  'tags' => $page->tags()->isNotEmpty() ? $page->tags()->value() : null,
];

if ($cover = $page->cover()->toFile()) {
  $data['cover'] = [
    'url' => $cover->crop(1024, 768)->url(),
    'alt' => $cover->alt()->value()
  ];
}

foreach($page->images()->sortBy('sort') as $image) {
  $data['gallery'][] = [
    'link' => $image->link()->or($image->url())->value(),
    'url' => $image->crop(800, 1000)->url(),
    'alt' => $image->alt()->value()
  ];
}

echo json_encode($data);
