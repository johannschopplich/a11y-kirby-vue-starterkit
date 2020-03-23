<?php

$data = [
  'title' => $page->title()->value()
];

foreach ($page->children()->listed() as $album) {
  if ($cover = $album->cover()->toFile()) {
    $coverData = [
      'url' => $cover->crop(800, 1000)->url(),
      'urlHome' => $cover->resize(1024, 1024)->url(),
      'alt' => $cover->alt()->value()
    ];
  }

  $data['children'][] = [
    'id' => $album->id(),
    'title' => $album->title()->value(),
    'cover' => isset($coverData) ? $coverData : null
  ];
}

kirby()->response()->json();
echo json_encode($data);