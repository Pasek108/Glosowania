<?php
include("database.php");

header('Content-type: text/plain; charset=utf-8');
mb_internal_encoding('UTF-8');
$plik = $_REQUEST['plik'];

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "SELECT * FROM glosowania";

$result = $connection->query($zapytanie);

$priv = 0;
$haslo = "";
$wiele = 0;
$istnieje = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $plik) {
        $priv = $row["priv"];
        $haslo = $row["haslo"];
        $wiele = $row["wiele"];
        $istnieje = 1;
        break;
    }
}

$connection->close();

if ($istnieje == 1) {
    $filename = "../glosowania/" . $plik . ".txt";
    $file = file($filename);
    $content = explode("||", $file[0]);

    if ($priv == 0) include("pokaz_glosowanie.php");
    else include("podaj_haslo.php");
} else echo "Głosowanie nie istnieje";
