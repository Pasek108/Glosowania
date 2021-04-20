<?php
include("database.php");

$haslo = $_REQUEST['haslo'];
$plik = $_REQUEST['plik'];

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "SELECT * FROM glosowania";
$result = $connection->query($zapytanie);

$poprawne = 0;
$wiele = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $plik && $row["haslo"] == $haslo) {
        $wiele = $row["wiele"];
        $poprawne = 1;
        break;
    }
}

if ($poprawne == 1) {
    $priv = 1;
    $filename = "../glosowania/" . $plik . ".txt";
    $file = file($filename);
    $content = explode("||", $file[0]);
    include("pokaz_glosowanie.php");
} else {
    include("podaj_haslo.php");
    echo "<div class='bledne'>Błędne hasło, brak dostepu.</div>";
}

$connection->close();
