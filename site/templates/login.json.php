<?php

if ($name = get('name')) {
  // Create the JWT for the user
  $token = $site->createJWT($name);

  // Append the new data
  $data['token'] = $token ?? null;
}

echo json_encode($data);
