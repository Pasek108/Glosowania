<?php
include("database.php");

header('Content-type: text/plain; charset=utf-8');
mb_internal_encoding('UTF-8');
$plik = $_REQUEST['plik'];
$haslo = $_REQUEST['haslo'];

$haslo = md5($haslo);

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "DELETE FROM glosowania WHERE nazwa='" . $plik . "' and haslo_admin='" . $haslo . "'";

if ($connection->query($zapytanie) == true) {
    echo "Głosowanie zostało usunięte.";
    $filename = "../glosowania/" . $plik . ".txt";
    unlink($filename);
} else echo "Błędne hasło.";

$connection->close();
