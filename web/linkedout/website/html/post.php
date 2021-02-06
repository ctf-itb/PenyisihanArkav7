<?php
include __DIR__.'/include/session.php';
include __DIR__.'/include/database.php';

$user = get_auth();

if($user === null) {
    header("Location: index.php?err=not_logged_in");
    return;
}

$body = $_POST['body'];

if(!empty($body)) {
    create_post($user['username'], $body);
}

header("Location: index.php");