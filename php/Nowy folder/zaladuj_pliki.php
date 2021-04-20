<?php
include("php/database.php");

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "SELECT * FROM glosowania";

$result = $connection->query($zapytanie);

$wynik = [];

$start = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["priv"] != 1) {
        array_push($wynik, $row['nazwa']);
    }
}

shuffle($wynik);

for ($i = 0; $i < count($wynik); $i++) {
    if ($start == 0) echo '"' . $wynik[$i] . '"';
    else echo ', "' . $wynik[$i] . '"';
    $start++;
}

$connection->close();
