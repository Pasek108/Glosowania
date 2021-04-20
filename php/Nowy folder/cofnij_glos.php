<?php
include("database.php");

header('Content-type: text/plain; charset=utf-8');
mb_internal_encoding('UTF-8');
$glos = $_REQUEST['glos'];
$plik = $_REQUEST['plik'];

$connection = new mysqli($host, $user, $password, $table);
$zapytanie = "SELECT * FROM glosowania";
$result = $connection->query($zapytanie);

$priv = 0;
$wiele = 0;
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $plik) {
        $priv = $row["priv"];
        $wiele = $row["wiele"];
        break;
    }
}

$connection->close();

$filename = "../glosowania/" . $plik . ".txt";
$file = file($filename);
$content = explode("||", $file[0]);

$glosy = explode(";", $glos);
if (count($glosy) > 1) for ($i = 0; $i < count($glosy); $i++) $content[intval($glosy[$i])]--;

$inservote = $content[0];
for ($i = 1; $i < count($content); $i++) $inservote = $inservote . "||" . $content[$i];

$inservote = mb_convert_encoding($inservote, 'UTF-8');
$fp = fopen($filename, "w");
fputs($fp, $inservote);
fclose($fp);

$suma = 0;
$pol_tablicy = (count($content) - 1) / 2;
for ($i = 1; $i < $pol_tablicy + 1; $i++) $suma += intval($content[$i]);

include("pokaz_glosowanie.php");
