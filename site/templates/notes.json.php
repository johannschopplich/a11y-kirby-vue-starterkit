<?php

foreach ($page->children()->listed() as $note) {
  $notes[] = [
    'url' => $note->uri(),
    'title' => $note->content()->title()->value(),
    'date' => $note->content()->date()->value()
  ];
}

$data = [
  'title' => $page->title()->value(),
  'notes' => $notes
];

echo json_encode($data);
