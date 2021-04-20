<?php
header('Content-Type: application/json');
require "database.php";

$req = json_decode(file_get_contents("php://input"), true);

if (!isset($req['file_name'])) exit;

$file_name = $req['file_name'];
$passwd = md5($req['passwd']);

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "UPDATE votings SET deleted = 0 WHERE name = '$file_name' AND admin_passwd = '$passwd'";
$connection->query($query);
$connection->close();

echo "ok";
