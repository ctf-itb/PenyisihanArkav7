<?php
include __DIR__.'/include/session.php';
include __DIR__.'/include/database.php';

$user = get_auth();

if($user === null) {
    header("Location: index.php?err=not_logged_in");
    return;
}

$id = $_POST['id'];

if(!empty($id)) {
    delete_post($user['username'], $id);
}

header("Location: index.php");