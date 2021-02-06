<?php
include __DIR__.'/vendor/autoload.php';
include __DIR__.'/include/session.php';

use \Firebase\JWT\JWT;

$JWT_PUBLIC_KEY = <<<EOD
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8kGa1pSjbSYZVebtTRBLxBz5H
4i2p/llLCrEeQhta5kaQu/RnvuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t
0tyazyZ8JXw+KgXTxldMPEL95+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4
ehde/zUxo6UvS7UrBQIDAQAB
-----END PUBLIC KEY-----
EOD;

$jwt = rawurldecode($_GET['code']);
$decoded = JWT::decode($jwt, $JWT_PUBLIC_KEY, array('RS256'));

if($decoded->exp < time()) {
    throw new Exception("JWT expired!");
}

set_auth($decoded);
?>
<html>
    <head>
        <meta http-equiv="refresh" content="0;url=index.php" />
    </head>
</html>