<?php

    include("connectDB.php");
    include("hashSeed.php");

   	$password = $_POST['password'];
	$password = hash('sha512',$password.$seed);
   	$userID = $_POST['userID'];

   	$rep = $db->query("SELECT `ID_user` FROM `aura_user` WHERE ID_user = $userID AND time_newPassword != 0 LIMIT 1"); 


	if ($rep->rowCount() === 1) {

		$stmt = $db->prepare("UPDATE `aura_user` SET psw = \"$password\", time_newPassword = 0 WHERE ID_user = $userID");

		$stmt->execute();

		echo "[{\"sucess\":\"1\"}]";
	} else {
		echo "[{\"sucess\":\"0\"}]";
	}
?>