<?php
include __DIR__."/../include/config.php";
include __DIR__."/../include/session.php";

function get_client($client_id) {
    global $CLIENTS;
    foreach($CLIENTS as $client) {
        if($client['client_id'] === $client_id)
            return $client;
    }

    return null;
}

$response_type = $_GET['response_type'];
$redirect_uri = $_GET['redirect_uri'];
$client_id = $_GET['client_id'];

if($response_type !== 'token') {
    http_response_code(400);
    echo "Unsupported response type";
    return;
}

$client = get_client($client_id);

if(!$client) {
    http_response_code(400);
    echo "Invalid client ID";
    return;
}

if(!in_array($redirect_uri, $client['allowed_redirect_uris'])) {
    http_response_code(400);
    echo "Invalid redirect URI";
    return;
}

set_oauth_authorize_session($redirect_uri, $client, $response_type);
header("Location: login.php");