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
while ($row = $result->fetch_assoc()) {
    if ($row["nazwa"] == $plik) {
        $priv = $row["priv"];
        break;
    }
}

$connection->close();

$filename = "../glosowania/" . $plik . ".txt";
$file = file($filename);
$content = explode("||", $file[0]);

$glosy = explode(";", $glos);

if (count($glosy) > 1) {
    for ($i = 0; $i < count($glosy); $i++) $content[intval($glosy[$i])]++;

    $inservote = $content[0];
    for ($i = 1; $i < count($content); $i++) $inservote = $inservote . "||" . $content[$i];
    $inservote = mb_convert_encoding($inservote, 'UTF-8');

    $fp = fopen($filename, "w");
    fputs($fp, $inservote);
    fclose($fp);
}

$suma = 0;
$pol_tablicy = (count($content) - 1) / 2;
for ($i = 1; $i < $pol_tablicy + 1; $i++) $suma += intval($content[$i]);
?>

<h2><?php echo $content[0] ?></h2>
<div class="priv_public" id="priv_public">
    <?php
    if ($priv == 1) echo " prywatne";
    else echo " publiczne";
    ?>
</div>
<br>
<div class="copy_link" id="copy_link" onclick="copy_link()">Skopiuj link</div><br>
<form id="ankieta" class="ankieta">
    <table>
        <col style="width: 100%;" />
        <?php include("pokaz_wyniki.php") ?>
    </table>
    <input id="plik" type="hidden" value="<?php echo $plik; ?>">
    <button onclick="cofnij_glos()" class="button button--ujarak button_red" type="button">Cofnij głos</button>
    <div onclick="losuj_glosowanie()" id="losuj" class="losuj">
        <i id="kostka" class="fas fa-dice-five"></i> Losuj
    </div>
</form>