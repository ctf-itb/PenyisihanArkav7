<?php
include __DIR__.'/../include/config.php';
include __DIR__.'/../include/session.php';
include __DIR__.'/../include/database.php';

$user_agent = $_SERVER['HTTP_USER_AGENT'];
$secret = $_SERVER['HTTP_X_ARKAV7_SECRET'];

if($user_agent !== ADMIN_USER_AGENT || $secret !== ADMIN_SECRET) {
    header("X-Arkav7-WTF: Dude wtf?");
    return;
}

cancel_all_connection_requests(ADMIN_USERNAME);