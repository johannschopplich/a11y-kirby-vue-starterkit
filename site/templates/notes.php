<?php

$data = [
  'title' => $page->title()->value()
];

foreach ($page->children()->listed()->sortBy('date', 'desc') as $note) {
  $data['children'][] = [
    'id' => $note->id(),
    'title' => $note->title()->value(),
    'date' => $note->date()->toDate('d F Y')
  ];
}

kirby()->response()->json();
echo json_encode($data);
