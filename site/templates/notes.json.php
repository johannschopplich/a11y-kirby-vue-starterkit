<?php

$data = [
  'title' => $page->title()->value()
];

foreach ($page->children()->listed()->sortBy('date', 'desc') as $note) {
  $data['children'][] = [
    'uri' => $note->uri(),
    'title' => $note->title()->value(),
    'date' => $note->date()->toDate('d F Y')
  ];
}

echo json_encode($data);
