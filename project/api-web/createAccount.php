<?php
    include("connectDB.php");

	$pseudo=$_POST['pseudo'];
	$psw =$_POST['password'];
	$mail =$_POST['email'];



	$rep = $db->query("SELECT `pseudo` FROM `aura_user` WHERE pseudo = \"$pseudo\" LIMIT 1"); 


	echo "[";

	if ($rep->rowCount() === 0) {
	
		$req = $db->prepare("INSERT INTO aura_user (pseudo, psw, mail) VALUES ('".$pseudo."', '".$psw."',  '".$mail."')");
		$req->execute(array(
		    "pseudo" => $pseudo, 
		    "psw" => $psw, 
		    "mail" => $mail
		));
	


		$rep = $db->query("SELECT `ID_user` FROM `aura_user` WHERE pseudo = \"$pseudo\" LIMIT 1"); 

		if ($rep->rowCount() === 1) {
			$result = $rep->fetch(PDO::FETCH_LAZY);
		
			echo "{\"sucess\":\"ok\"}";
			echo ",{\"id_user\":\"".$result["ID_user"]."\", \"pseudo_user\":\"".$pseudo."\"}";	

		} else {
			echo "{\"sucess\":\"error\"}";
		}

		// ob_start();

		// if (session_status() == 2) {
		// 	session_write_close();
		// }
		// session_start();

		// $_SESSION['userId'] = $result["ID_user"];
		// $_SESSION['userPseudo'] = $result["pseudo"];
		
		// echo "{\"sucess\":\"ok\"}";
		// echo ",{\"id_user\":\"".$result["ID_user"]."\", \"pseudo_user\":\"".$result["pseudo"]."\"}";
		

	}
	else {
		echo "{\"sucess\":\"pseudo already used\"}";

	}

	echo "]";


?>


