<?php
include __DIR__.'/include/session.php';
include __DIR__.'/include/database.php';

$user = get_auth();

if($user === null) {
    header("Location: index.php?err=not_logged_in");
    return;
}

$username = $_POST['username'];
$message = $_POST['message'];

if(!empty($username)) {
    request_connection($user['username'], $username, $message);
}

header("Location: index.php");