<?php
header('Content-Type: application/json');
require "database.php";

$req = json_decode(file_get_contents("php://input"), true);

if (!isset($req['file_name'])) exit;

$file_name = $req['file_name'];
$passwd = md5($req['passwd']);

$correct = "false";

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "SELECT passwd FROM votings WHERE name = '$file_name'";
$result = $connection->query($query);
$row = $result->fetch_assoc();
if ($passwd == $row['passwd']) $correct = "true";
$connection->close();

echo $correct;
