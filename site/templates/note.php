<?php

$data = [
  'title' => $page->title()->value(),
  'date' => $page->date()->toDate('d F Y'),
  'tags' => $page->tags()->isNotEmpty() ? $page->tags()->value() : null,
  'text' => ['html' => $page->text()->kt()->value()]
];

kirby()->response()->json();
echo json_encode($data);
