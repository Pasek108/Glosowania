<?php
header('Content-Type: application/json');
include "database.php";

$file_names_in_db = [];

$req = json_decode(file_get_contents("php://input"), true);

$file_name = $req['file_name'];
$admin_passwd = md5($req['admin_passwd']);
$date = $req['term'];
$priv = $req['priv'];
$passwd = md5($req['passwd']);
$question = $req['question'];
$description = $req['description'];
$many = $req['many'];
$options = $req['options'];

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
$query = "UPDATE votings SET question = '$question', passwd = '$passwd', private = '$priv', many_options = '$many', date = '$date', ip_list = '' WHERE name = '$file_name' AND admin_passwd = '$admin_passwd'";
$connection->query($query);
$connection->close();

$data['name'] = $file_name;
echo json_encode($data);
