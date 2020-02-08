<?php

if ($site->authenticate() === false) {
  echo json_encode(['error' => 'Unauthorized']);
  return;
}

echo json_encode(['status' => 'ok']);
