<?php
include __DIR__."/config.php";

use \Firebase\JWT\JWT;

function generate_jwt($user) {
    global $JWT_ISS;
    global $JWT_PRIVATE_KEY;

    $token = [
        "iss" => $JWT_ISS,
        "sub" => $user['username'],
        "full_name" => $user['fullname'],
        "is_admin" => $user['is_admin'] === "1",
        "iat" => time(),
        "exp" => time() + 300
    ];

    $jwt = JWT::encode($token, $JWT_PRIVATE_KEY, 'RS256');
    return $jwt;
}