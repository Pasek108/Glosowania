<?php
if ($suma == 0) $suma = 1;
for ($i = 1; $i < $pol_tablicy + 1; $i++) {
    $opcja = $i + $pol_tablicy;
    echo "
    <tr>
        <td>
        <br>$content[$opcja]
        </td>
    </tr>
    <tr>
        <td>
            <div class='procent' style='width: " . round(((intval($content[$i]) / $suma) * 100), 2) . "%;'>
                <div class='procent_txt'>$content[$i] (" . round(((intval($content[$i]) / $suma) * 100), 2) . "%)</div>
            </div>
        </td>
    </tr>";
}
