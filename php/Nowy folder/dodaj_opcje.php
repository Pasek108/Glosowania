<?php
$pol_tablicy = (count($content) - 1) / 2;
if ($wiele == 0) {
    for ($i = $pol_tablicy + 1; $i < count($content); $i++) {
        echo '
        <input id="opcja' . intval($i - $pol_tablicy) . '" name="glos" class="radio" type="radio" value="' . intval($i - $pol_tablicy) . '">
        <label class="glos" for="opcja' . intval($i - $pol_tablicy) . '">' . $content[$i] . '</label><br>';
    }
} else {
    for ($i = $pol_tablicy + 1; $i < count($content); $i++) {
        echo '
        <input id="opcja' . intval($i - $pol_tablicy) . '" name="glos" class="radio" type="checkbox" value="' . intval($i - $pol_tablicy) . '">
        <label class="glos" for="opcja' . intval($i - $pol_tablicy) . '">' . $content[$i] . '</label><br>';
    }
}
