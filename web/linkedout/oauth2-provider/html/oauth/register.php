<?php
include __DIR__.'/../include/session.php';
include __DIR__."/../include/database.php";
include __DIR__."/../include/jwt.php";

$authsess = get_oauth_authorize_session();
if($authsess !== null)
    extract($authsess);

$username = @$_POST['username'];
$password = @$_POST['password'];
$full_name = @$_POST['full_name'];

if(!empty($username) && !empty($password) && !empty($full_name)) {
    try {
        create_account($username, $password, $full_name);
        
        if($authsess !== null) {
            $user = attempt_login($username, $password);
            $jwt = generate_jwt($user);
            $redir = parse_url($redirect_uri);
            parse_str(@$redir['query'], $query);

            $first_part = explode("?", $redirect_uri)[0];
            $redir = $first_part.'?'.http_build_query(array_merge($query, array('code'=> $jwt)));
        
            header("Location: $redir");
            session_unset();
            return;
        } else {
            $success = "Account created successfully!";
        }
    } catch (Exception $e) {
        $error = ($e->getMessage());
    }
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <title>Register</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="signin.css" rel="stylesheet">

    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }
    </style>
</head>
<body class="text-center">
<form class="form-signin" method="post">
    <?php if(!empty($error)) { ?>
        <div class="alert alert-danger" role="alert">
            <?=$error?>
        </div>
    <?php } ?>
    <?php if(!empty($success)) { ?>
        <div class="alert alert-success" role="alert">
            <?=$success?>
        </div>
    <?php } ?>
    <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
    <label for="inputName" class="sr-only">Full name</label>
    <input type="text" id="inputName" name="full_name" class="form-control" placeholder="Full name" required autofocus>
    <label for="inputEmail" class="sr-only">Username</label>
    <input type="text" id="inputEmail" name="username" class="form-control" placeholder="Username" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
</form>
</body>
</html>
