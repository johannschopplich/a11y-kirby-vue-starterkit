<?php

$data = [
  'title' => $page->title()->value(),
  'children' => array_values($page->children()->listed()->sortBy('date', 'desc')->map(function ($note) {
    return [
      'id' => $note->id(),
      'title' => $note->title()->value(),
      'date' => $note->date()->toDate('d F Y')
    ];
  })->data())
];

kirby()->response()->json();
echo json_encode($data);
