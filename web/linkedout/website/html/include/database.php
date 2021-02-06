<?php
// If you installed via composer, just use this code to require autoloader on the top of your projects.
require __DIR__.'/../vendor/autoload.php';
 
// Using Medoo namespace
use Medoo\Medoo;
 
// Initialize
$database = new Medoo([
    'database_type' => 'mysql',
    'database_name' => getenv("DATABASE_NAME"),
    'server' => getenv("DATABASE_HOST"),
    'username' => getenv("DATABASE_USERNAME"),
    'password' => getenv("DATABASE_PASSWORD"),
    "logging" => true,
]);
 
function create_post($username, $body) {
    global $database;
    $database->insert('posts', [
        "username" => $username,
        "created_at" => time(),
        "body" => $body
    ]);
}

function get_posts($username) {
    global $database;
    return $database->select('posts', 
    [
        "id",
        "created_at",
        "body"
    ],
    [
        'username' => $username
    ]);
}

function delete_post($username, $post_id) {
    global $database;
    return $database->delete('posts', [
        "username" => $username,
        "id" => $post_id
    ]);
}

function request_connection($requesting_username, $requested_username, $message) {
    global $database;
    $has = $database->has('connection_requests', [
        "requesting_username" => $requesting_username,
        "requested_username" => $requested_username
    ]);

    if($has) {
        throw new Exception("User has sent a connection request");
    }

    $database->insert('connection_requests', [
        "requesting_username" => $requesting_username,
        "requested_username" => $requested_username,
        "message" => $message,
        "created_at" => time()
    ]);
}

function get_incoming_connection_requests($username) {
    global $database;
    return $database->select('connection_requests', [
        'requesting_username',
        'message',
        'created_at'
    ], [
        'requested_username' => $username
    ]);
}

function get_pending_connection_requests($username) {
    global $database;
    return $database->select('connection_requests', [
        'requested_username',
        'message',
        'created_at'
    ], [
        'requesting_username' => $username
    ]);
}

function cancel_connection_request($requesting_username, $requested_username) {
    global $database;
    $has = $database->has('connection_requests', [
        "requesting_username" => $requesting_username,
        "requested_username" => $requested_username
    ]);

    if(!$has) {
        throw new Exception("User has not sent a connection request");
    }

    return $database->delete('connection_requests', [
        "requesting_username" => $requesting_username,
        "requested_username" => $requested_username
    ]);
}

function cancel_all_connection_requests($requested_username) {
    global $database;
    return $database->delete('connection_requests', [
        "requested_username" => $requested_username
    ]);
}