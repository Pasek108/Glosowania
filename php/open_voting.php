<?php
header('Content-Type: application/json');
include "database.php";

$req = json_decode(file_get_contents("php://input"), true);

if (!isset($req['file_name'])) exit;

$file_name = $req['file_name'];
$passwd = md5($req['passwd']);

$voting = [];
$prev = "";
$next = "";
$found = FALSE;

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "SELECT name, question, passwd, private, many_options, date, deleted, ip_list FROM votings";
$result = $connection->query($query);
while ($row = $result->fetch_assoc()) {
    if ($file_name == $row['name']) {
        if ($passwd == $row['passwd']) {
            $voting = $row;
            $voting['passwd'] = "";
            $found = TRUE;
        }
    } else {
        if ($row['private'] == 0) {
            if (!$found) $prev = $row['name'];
            else if ($next == "") $next = $row['name'];
        }
    }
}
$connection->close();

$voting['prev'] = $prev;
$voting['next'] = $next;

$filename = "../votings/" . $file_name . ".txt";

if (count($voting) < 10 || !file_exists($filename)) {
    echo json_encode("error");
    exit;
}

$file = file($filename);
$content = explode("||", $file[0]);

$voting['description'] = $content[0];
$voting['option_votes'] = [];
$voting['option_names'] = [];
for ($i = 1; $i < count($content); $i++) {
    if ($i <= (count($content) - 1) / 2) array_push($voting['option_votes'], $content[$i]);
    else array_push($voting['option_names'], $content[$i]);
}

echo json_encode($voting);
