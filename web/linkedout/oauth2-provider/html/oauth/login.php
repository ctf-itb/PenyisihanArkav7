<?php
include __DIR__.'/../include/session.php';
include __DIR__."/../include/database.php";
include __DIR__."/../include/jwt.php";

$authsess = get_oauth_authorize_session();
if($authsess === null) {
    echo "No context";
    return;
}

extract($authsess);

$username = @$_POST['username'];
$password = @$_POST['password'];

if(!empty($username)) {
    try {
        $user = attempt_login($username, $password);
        $jwt = generate_jwt($user);
        $redir = parse_url($redirect_uri);
        parse_str(@$redir['query'], $query);

        $first_part = explode("?", $redirect_uri)[0];
        $redir = $first_part.'?'.http_build_query(array_merge($query, array('code'=> $jwt)));
    
        header("Location: $redir");
        session_unset();
        return;
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
    <title>Sign in</title>

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
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputEmail" class="sr-only">Username</label>
    <input type="text" id="inputEmail" name="username" class="form-control" placeholder="Username" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <div style="height: 16px"></div>
    <a href="register.php">Register</a>
</form>
</body>
</html>
