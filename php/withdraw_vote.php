<?php
header('Content-Type: application/json');
include "database.php";

$req = json_decode(file_get_contents("php://input"), true);

$file_name = $req['file_name'];
$ip = $req['ip'];
$options = $req['options'];

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "UPDATE votings SET ip_list = REPLACE(ip_list, ';$ip', '') WHERE name = '$file_name'";
$connection->query($query);
$connection->close();

$filename = "../votings/" . $file_name . ".txt";

$file = file($filename);
$content = explode("||", $file[0]);

$votes = $content[0];

for ($i = 1; $i < count($content); $i++) {
    if ($i <= (count($content) - 1) / 2 && $options[$i - 1]) {
        $value = intval($content[$i]) - 1;
        $votes = $votes . "||" . $value;
    } else $votes = $votes . "||" . $content[$i];
}

$file = fopen($filename, "w");
fputs($file, $votes);
fclose($file);

echo "ok";
