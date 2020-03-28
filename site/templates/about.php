<?php

$data = [
  'title' => $page->title()->value(),
  'email' => $page->email()->value(),
  'phone' => $page->phone()->value(),
  'address' => $page->address()->kt()->value(),
  'text' => $page->text()->kt()->value(),
  'social' => array_values($page->social()->toStructure()->map(function ($social) {
    return [
      'url' => $social->url()->value(),
      'platform' => $social->platform()->value()
    ];
  })->data())
];

kirby()->response()->json();
echo json_encode($data);
