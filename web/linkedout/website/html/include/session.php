<?php
ini_set('session.cookie_httponly', 1);
session_start();

function set_auth($user) {
    $_SESSION['username'] = $user->sub;
    $_SESSION['full_name'] = $user->full_name;
    $_SESSION['is_admin'] = $user->is_admin;
}

function get_auth() {
    if(empty($_SESSION['username'])) return null;

    return [
        "username" => $_SESSION['username'],
        "full_name" => $_SESSION['full_name'],
        "is_admin" => $_SESSION['is_admin']
    ];
}

function clear_auth() {
    session_unset();
}