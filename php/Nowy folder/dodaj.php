<form onsubmit="dodaj_glosowanie(); return false">
    <textarea id="naglowek_input" class="naglowek_input" placeholder="Nagłówek" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{1,128}" required></textarea>
    <br>
    <input type="checkbox" class="check" id="wiele" value="wiele"> <label for="wiele">Pozwól wybrać więcej niż jedną opcje</label>
    <br>
    <div id="prywatne">
        <input onclick="podaj_haslo()" type="checkbox" class="check" id="priv" value="priv"> <label for="priv">Głosowanie prywatne </label>
    </div>
    <br>
    <div id="opcje_nowa">
        <input class="opcja_input" type="text" placeholder="Opcja" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{1,48}" required><br>
        <input class="opcja_input" type="text" placeholder="Opcja" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{0,48}"><br>
        <input class="opcja_input" type="text" placeholder="Opcja" pattern="[A-Za-z0-9AaĄąĆćĘęŁłŃńÓóŚśŹźŻż.,?\s]{0,48}"><br>
    </div>
    <div onclick=" dodaj_opcje()" id="plus_input" class="plus_input">+ dodaj opcje</div>

    <button class="button button--ujarak">Dodaj głosowanie</button>
    <br>
</form>