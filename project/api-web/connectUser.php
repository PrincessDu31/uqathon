<?php
    include("connectDB.php");
    include("hashSeed.php");


	$pseudo=$_POST['pseudo'];
	$psw =$_POST['password'];
	$psw = hash('sha512',$psw.$seed);


	$rep = $db->query("SELECT `ID_user`, `pseudo`, `activation` FROM `aura_user` WHERE (pseudo = \"$pseudo\" OR mail = \"$pseudo\") AND psw = \"$psw\" LIMIT 1"); 

	echo "[";
	if ($rep->rowCount() === 1) {
		$result = $rep->fetch(PDO::FETCH_LAZY);

		// ob_start();

		// if (session_status() == 2) {
		// 	session_write_close();
		// }
		// session_start();

		// $_SESSION['userId'] = $result["ID_user"];
		// $_SESSION['userPseudo'] = $result["pseudo"];
		if ($result["activation"] != 1) {
			echo "{\"sucess\":\"not activate\"}";
		} else {
			echo "{\"sucess\":\"ok\"}";
			echo ",{\"id_user\":\"".$result["ID_user"]."\", \"pseudo_user\":\"".$result["pseudo"]."\"}";			
		}

		

	}
	else {
		echo "{\"sucess\":\"none\"}";

	}

	echo "]";


?>
