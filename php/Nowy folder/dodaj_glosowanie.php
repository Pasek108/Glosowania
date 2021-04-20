<?php
include("database.php");

$naglowek = $_REQUEST['naglowek'];
$opcje = $_REQUEST['opcje'];
$wiele = $_REQUEST['wiele'];
$haslo = $_REQUEST['haslo'];
$admin = $_REQUEST['admin'];

if ($haslo != "") $priv = 1;
else $priv = 0;

$admin = md5($admin);
$opcje_array = explode("||", $opcje);
$inservote = $naglowek;

for ($i = 0; $i < count($opcje_array); $i++) $inservote = $inservote . "||0";
for ($i = 0; $i < count($opcje_array); $i++) $inservote = $inservote . "||" . $opcje_array[$i];

$inservote = mb_convert_encoding($inservote, 'UTF-8');

$literki = "abcdefghijklmnopqrstuvwxyz0123456789";
$plik = "";
for ($i = 0; $i < 20; $i++) $plik = $plik . $literki[rand(0, 35)];

$filename = "../glosowania/" . $plik . ".txt";
$fp = fopen($filename, "w");
fputs($fp, $inservote);
fclose($fp);

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "INSERT INTO glosowania (id, nazwa, priv, haslo, wiele, haslo_admin) VALUES (NULL, '$plik', $priv, '$haslo', $wiele, '$admin')";
$connection->query($zapytanie);
$connection->close();

$file = file($filename);
$content = explode("||", $file[0]);
include("pokaz_glosowanie.php");
?>