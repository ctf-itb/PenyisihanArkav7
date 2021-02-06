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

function create_account($username, $password, $fullname) {
    global $database;
    $accountExists = $database->has('users', ["username" => $username]);

    if($accountExists) {
        throw new Exception("Username is taken");
    }

    $database->insert('users', [
        "username" => $username,
        "password" => password_hash($password, PASSWORD_DEFAULT),
        "fullname" => $fullname,
        "is_admin" => false
    ]);
}

function attempt_login($username, $password) {
    global $database;
    $user = $database->get("users", [
        "username",
        "password",
        "fullname",
        "is_admin"
    ], [
        "username" => $username
    ]);

    if(!$user) {
        throw new Exception("Invalid username or password");
    }

    $hashed = $user['password'];
    $passwordCorrect = password_verify($password, $hashed);

    if(!$passwordCorrect) {
        throw new Exception("Invalid username or password");
    }

    return $user;
}