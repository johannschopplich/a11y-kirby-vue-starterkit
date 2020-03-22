<?php

$data = [
  'title' => $page->title()->value(),
  'site' => $siteData
];

kirby()->response()->json();
echo json_encode($data);
