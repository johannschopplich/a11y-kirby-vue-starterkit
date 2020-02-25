<?php

$data = [
  'title' => $page->title()->value(),
  'email' => $page->email()->value(),
  'phone' => $page->phone()->value(),
  'address' => $page->address()->kt()->value(),
  'text' => $page->text()->kt()->value()
];

foreach($page->social()->toStructure() as $social) {
  $data['social'][] = [
    'url' => $social->url()->value(),
    'platform' => $social->platform()->value()
  ];
}

echo json_encode($data);
