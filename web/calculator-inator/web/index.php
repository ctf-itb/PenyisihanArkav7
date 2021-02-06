<?php
error_reporting(0);

if ($_GET['debug']) {
    highlight_file(__FILE__);
    return;
}

$calculate = function($a, $b) {
    return $a + $b;
};

$param = parse_str(file_get_contents("php://input"));

if ($param['a']) {
    $a = $param['a'];
}

if ($param['b']) {
    $b = $param['b'];
}

if ($a && $b) {
    $result = $calculate($a, $b);
}
?>
<html>
    <head>
        <title>The Ultimate Sum Calculator-inator</title>
    </head>
    <body>
        <h1>The Ultimate Sum Calculator-inator</h1>
        <form method="post">
            <input name="a" type="text" placeholder="First number" />
            <div style="height: 4px"></div>
            <input name="b" type="text" placeholder="Second number" />
            <br /><br />
            <input type="submit" value="Calculate" />
        </form>
        <?php if ($result) echo "The result is $result"; ?>
    </body>
    <!-- ?debug=1 -->
</html>