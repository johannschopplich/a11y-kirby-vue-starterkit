<?php

use ReallySimpleJWT\Token;

Kirby::plugin('johannschopplich/kirby-jwt', [
    'siteMethods' => [
        'authenticate' => function () {
            // Bail if authorization header isn't available at all
            $token = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
            if ($token === null) return false;

            // Get the token from authorization format `Bearer ${token}`
            $token = Str::split($token, ' ')[1];

            // Validate the token
            if (!Token::validate($token, option('jwt.secret'))) {
                return false;
            }

            // Mark request as authenticated
            return true;
        },

        'getJWTPayload' => function () {
            // Bail if authorization header isn't available at all
            $token = $_SERVER['HTTP_AUTHORIZATION'] ?? null;
            if ($token === null) return null;

            // Get the token from authorization format `Bearer ${token}`
            $token = Str::split($token, ' ')[1];

            // Return the payload claims
            return Token::getPayload($token, option('jwt.secret'));
        },

        'createJWT' => function ($subject = '') {
            // Create a custom token
            $payload = [
                // Issuer
                'iss' => Url::stripQuery(Url::current()),
                // Subject
                'sub' => $subject,
                // Issued at
                'iat' => time(),
                // Expiration time
                'exp' => time() + (60 * 60 * 24 * 356) // One year
            ];

            return Token::customPayload($payload, option('jwt.secret'));
        }
    ]
]);
