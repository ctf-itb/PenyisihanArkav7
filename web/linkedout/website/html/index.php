<?php
include __DIR__.'/include/config.php';
include __DIR__.'/include/session.php';
include __DIR__.'/include/database.php';

$user = get_auth();
if($user === null) {
    $url = OAUTH_URL."?response_type=token&client_id=linkedout&redirect_uri=".rawurlencode(REDIRECT_URL);
    header("Location: ". $url);
    return;
}
?>


<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <title>Home - LinkedOut</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">


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
    <!-- Custom styles for this template -->
  </head>
  <body class="d-flex flex-column h-100">
    <header>
  <!-- Fixed navbar -->
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">LinkedOut</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="home.php">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="logout.php">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>

<!-- Begin page content -->
<main role="main" class="flex-shrink-0" style="margin-top: 32px">
  <div class="container">
    <h3 class="mt-5">Welcome to LinkedOut, <b><?=htmlentities($user['full_name']) ?></b></h1>
  </div>
  <div class="container">
  <div class="row" style="margin-top: 32px">
    <div class="col-sm">
        <b>Your Posts</b>
        <form method="post" action="post.php">
          <div class="form-group">
              <label for="postnew">Write something on your mind</label>
              <textarea class="form-control" name="body" id="postnew" rows="3"></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Post!</button>
        </form>
        <hr />
        <?php
        $posts = get_posts($user['username']);

        foreach($posts as $post) {
        ?>
        <div class="card" style="margin-top: 8px">
            <div class="card-body">
                <h5 class="card-title"><?=date("d/m/Y H:i:s", $post['created_at'])?></h5>
                <p class="card-text"><?=htmlentities($post['body'])?></p>
                <form method="post" action="deletepost.php">
                  <button type="submit" class="btn btn-danger btn-sm" value="<?=$post['id']?>" name="id">Delete</button>
                </form>
            </div>
        </div>
        <?php } ?>
    </div>
    <div class="col-sm">
      <div class="card">
        <b class="card-header">Create a connection request</b>
        <div class="card-body">
          <form method="post" action="connrequest.php">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" name="username" placeholder="Username to request">
              <label for="connectmessage" style="margin-top: 16px">Write a message to say hi</label>
              <textarea class="form-control" name="message" id="connectmessage" rows="3"></textarea>
              <button class="btn btn-primary" type="submit" style="margin-top: 16px">Post!</button>
            </div>
          </form>
        </div>
      </div>
      <div style="margin-top: 16px">
        <b>Connection Requests</b>
        <?php if ($_SERVER['HTTP_USER_AGENT'] !== ADMIN_USER_AGENT && $user['is_admin'] === true) { ?>
        <div class="alert alert-warning mt-3" role="alert">
          <h4 class="alert-heading">Connection request is disabled</h4>
          <p>
            Congrats for making it this far! To make sure the XSS payload does not disturb you, we disable this feature in external network access.
            <br /><br />
            Enjoy the flag:
            <b><?=FLAG?></b>
          </p>
        </div>
        <?php } else { ?>
          <?php
          $requests = get_incoming_connection_requests($user['username']);
          foreach($requests as $request) {
          ?>
            <div class="card">
              <div class="card-body">
                  <h5 class="card-title"><?=htmlentities($request['requesting_username'])?></h5>
                  <p class="card-text"><?=$request['message']?></p>
                  <form method="post" action="ignorecr.php" style="display: inline">
                    <button type="submit" class="btn btn-secondary btn-sm" value="<?=htmlentities($request['requesting_username'])?>" name="username">Ignore</button>
                  </form>
                  <form method="post" action="acceptcr.php" style="display: inline">
                    <button type="submit" class="btn btn-primary btn-sm" value="<?=htmlentities($request['requesting_username'])?>" name="username">Accept</button>
                  </form>
              </div>
            </div>
          <?php } ?>
        <?php } ?>
      </div>
    </div>
  </div>
</div>
</main>

<footer class="footer mt-auto py-3">
  <div class="container">
    <span class="text-muted">LinkedOut by Arkavidia 7.0</span>
  </div>
</footer>

<!-- Arkav5{this_is_not_a_flag} (It's really not) -->
</html>
