<?php
header('Content-Type: application/json');
include "database.php";

$file_names_in_db = [];

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "SELECT name FROM votings";
$result = $connection->query($query);
while ($row = $result->fetch_assoc()) {
    array_push($file_names_in_db, $row['name']);
}
$connection->close();

function create_file_name()
{
    $letters = "abcdefghijklmnopqrstuvwxyz0123456789";
    $file_name = "";

    for ($i = 0; $i < 20; $i++) {
        $file_name = $file_name . $letters[rand(0, 35)];
    }

    return $file_name;
}

$req = json_decode(file_get_contents("php://input"), true);

$admin_passwd = md5($req['admin_passwd']);
$date = $req['term'];
$priv = $req['priv'];
$passwd = md5($req['passwd']);
$question = $req['question'];
$description = $req['description'];
$many = $req['many'];
$options = $req['options'];

while (true) {
    $file_name = create_file_name();
    $name_taken = false;
    for ($i = 0; $i < count($file_names_in_db); $i++) {
        if ($file_name == $file_names_in_db[$i]) {
            $name_taken = true;
        }
    }

    if (!$name_taken) break;
}

$filename = "../votings/" . $file_name . ".txt";

$votes = $description;

for ($i = 0; $i < count($options); $i++) {
    if ($options[$i] != "") {
        $votes = $votes . "||0";
    }
}

for ($i = 0; $i < count($options); $i++) {
    if ($options[$i] != "") {
        $votes = $votes . "||" . $options[$i];
    }
}

$file = fopen($filename, "w");
fputs($file, $votes);
fclose($file);

$connection = new mysqli($servername, $username, $password, $dbname);
$query = "INSERT INTO votings (id, name, question, passwd, admin_passwd, private, many_options, date, deleted, ip_list) VALUES (NULL, '$file_name', '$question', '$passwd', '$admin_passwd', $priv, $many, '$date', 0, '')";
$connection->query($query);
$connection->close();

$data['name'] = $file_name;
echo json_encode($data);
