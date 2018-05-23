<?php
header("Content-Type: multipart/form-data");
$nom      = isset($_POST['nom']) ? $_POST['nom'] : "";
$prenom   = isset($_POST['prenom']) ? $_POST['prenom'] : "";
$mail     = isset($_POST['mail']) ? $_POST['mail'] : "";
$password = isset($_POST['mdp']) ? $_POST['mdp'] : "";

if($nom != "" && $prenom != "" && $mail != "" && $password != "") {
	echo "YOUUUUUUUUUUUUUUUUUUUUPIIIIIIIIIIIIIII !!!";
}
else {
	echo "C'est mystique, hein ! ";
	echo var_dump(serialize($_POST));
}
?>