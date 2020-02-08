<?php

$data = [
  'title' => $page->title()->value(),
  'text' => $page->text()->kt()->value(),
  'date' => $page->date()->value(),
  'tags' => $page->tags()->value()
];

echo json_encode($data);
