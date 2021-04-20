<?php
header('Content-Type: application/json');
include "database.php";

$req = json_decode(file_get_contents("php://input"), true);

if (!isset($req['file_name'])) exit;

$file_name = $req['file_name'];

$voting['is_private'] = "error";

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "SELECT private FROM votings WHERE name = '$file_name'";
$result = $connection->query($query);
$row = $result->fetch_assoc();
if ($row != null) {
    if ($row['private'] == 1) $voting['is_private'] = TRUE;
    else $voting['is_private'] = FALSE;
}
$connection->close();

echo json_encode($voting);
