<?php

foreach ($page->social()->toStructure() as $item) {
  $social[] = [
    'url' => $item->url()->value(),
    'platform' => $item->platform()->value()
  ];
}

$data = [
  'title' => $page->title()->value(),
  'text' => $page->text()->kt()->value(),
  'address' => $page->address()->kt()->value(),
  'email' => $page->email()->value(),
  'phone' => $page->phone()->value(),
  'social' => $social
];

echo json_encode($data);
