<?php
include __DIR__.'/include/session.php';
include __DIR__.'/include/database.php';

$user = get_auth();

if($user === null) {
    header("Location: index.php?err=not_logged_in");
    return;
}

$username = $_POST['username'];

if(!empty($username)) {
    cancel_connection_request($username, $user['username']);
}

header("Location: index.php");