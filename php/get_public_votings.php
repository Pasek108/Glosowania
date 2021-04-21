<?php
header('Content-Type: application/json');
require "database.php";

$req = json_decode(file_get_contents("php://input"), true);

$search = $req['search'];
$id = $req['id'];

$data = [];
$data['name'] = [];
$data['question'] = [];
$data['description'] = [];

$last_id = 0;
$count_elements = 0;

$connection = new mysqli($servername, $username, $password, $dbname);
while (TRUE) {
    $query = "SELECT name, question, private FROM votings WHERE id = $id";
    $result = $connection->query($query);
    $row = $result->fetch_assoc();
    if ($row == null) break;
    if ($count_elements == 20) break;
    if ($row['private'] == 0) {
        $filename = "../votings/" . $row['name'] . ".txt";
        $file = file($filename);
        $content = explode("||", $file[0]);

        if ($search == "") {
            array_push($data['name'], $row['name']);
            array_push($data['question'], $row['question']);
            array_push($data['description'], $content[0]);
            $count_elements++;
        } else {
            if (strpos(strtolower($file[0]), $search) !== false || strpos(strtolower($row['question']), $search) !== false) {
                array_push($data['name'], $row['name']);
                array_push($data['question'], $row['question']);
                array_push($data['description'], $content[0]);
                $count_elements++;
            }
        }
    }
    $last_id = $id;
    $id++;
}
$connection->close();

$data['id'] = $last_id;

echo json_encode($data);
