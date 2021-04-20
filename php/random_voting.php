<?php
header('Content-Type: application/json');
include "database.php";

$file_name = "";
$max = 0;

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "SELECT COUNT(id) AS max_number FROM votings";
$result = $connection->query($query);
$row = $result->fetch_assoc();
$max = $row['max_number'];
$connection->close();

$random = rand(0, $max);

$stop = FALSE;

$connection = new mysqli($servername, $username, $password, $dbname);
while (!$stop) {
    $query = "SELECT id, name, private FROM votings";
    $result = $connection->query($query);
    while ($row = $result->fetch_assoc()) {
        if ($row['id'] == $random) {
            if ($row['private'] == 0) {
                $file_name = $row['name'];
                $stop = TRUE;
            }
            break;
        }
    }
    $random = rand(0, $max);
}
$connection->close();

echo $file_name;
