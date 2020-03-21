<?php

$data = [
  'title' => $page->title()->value(),
  'text' => $page->text()->kt()->value()
];

echo json_encode($data);
