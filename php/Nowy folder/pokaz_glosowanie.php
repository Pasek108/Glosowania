<h2><?php echo $content[0] ?></h2>
<div class="priv_public" id="priv_public">
    <?php echo ($priv == 1) ? " prywatne" : " publiczne"?>
</div>
<br>
<div class="copy_link" id="copy_link" onclick="copy_link()">Skopiuj link</div><br>
<form id="ankieta" class="ankieta">
    <div class="opcje">
        <?php include("dodaj_opcje.php")?>
        <input id="plik" type="hidden" value="<?php echo $plik ?>">
    </div>
    <button onclick="oddaj_glos()" class="button button--ujarak button_blue" type="button">Zagłosuj</button>
    <div onclick="losuj_glosowanie()" id="losuj" class="losuj">
        <i id="kostka" class="fas fa-dice-five"></i> Losuj
    </div>
</form>