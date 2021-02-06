<?php
session_start();

function set_oauth_authorize_session($redirect_uri, $client_id, $response_type) {
    $_SESSION['oauth_redirect_uri'] = $redirect_uri;
    $_SESSION['oauth_client_id'] = $client_id;
    $_SESSION['oauth_response_type'] = $response_type;
}

function get_oauth_authorize_session() {
    if(empty($_SESSION['oauth_client_id']))
        return null;

    return [
        "redirect_uri" => $_SESSION['oauth_redirect_uri'],
        "client_id" => $_SESSION['oauth_client_id'],
        "response_type" => $_SESSION['oauth_response_type']        
    ];
}

function set_error($error) {
    $_SESSION['error'] = $error;
}

function get_error() {
    return $_SESSION['error'];
}