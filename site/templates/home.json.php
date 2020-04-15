<?php

$data = [
  'title' => $page->title()->value(),
  'site' => $siteData
];

echo json_encode($data);
