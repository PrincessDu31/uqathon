<?php

    include("connectDB.php");
    include("hashSeed.php");

	$pseudo=$_POST['pseudo'];
	$psw =$_POST['password'];
	$psw = hash('sha512',$psw.$seed);
	$mail =$_POST['email'];

	$status = 0;

	echo "[";

	$rep = $db->query("SELECT `ID_user`, `activation` FROM `aura_user` WHERE mail = \"$mail\" LIMIT 1"); 

	if ($rep->rowCount() > 0) {
		$result = $rep->fetch(PDO::FETCH_LAZY);

		if ($result['activation'] == 0) {
	// 		echo "{\"sucess\":\"mail already used\"}";
	// 		$status = 1;
	// }
	// else {
			$userID = $result['ID_user'];
			$stmt = $db->prepare("UPDATE `aura_user` SET anonyme = '1' WHERE ID_user = $userID");
			$stmt->execute();


			$db->exec("DELETE FROM `aura_user` WHERE `ID_user` = $userID"); 
			$rep = $db->query("SELECT `ID_user` FROM `aura_user` WHERE `mail` = \"$mail\" AND `activation`= 0 LIMIT 1"); 

		}

	}



	if ($rep->rowCount() === 0) {



		$rep = $db->query("SELECT `pseudo` FROM `aura_user` WHERE pseudo = \"$pseudo\" LIMIT 1"); 



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
			
				$status = 1;


				if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mail)) // On filtre les serveurs qui rencontrent des bogues.
				{
					$passage_ligne = "\r\n";
				}
				else
				{
					$passage_ligne = "\n";
				}
				   $encoding = "utf-8";

			    // Preferences for Subject field
			    $subject_preferences = array(
			        "input-charset" => $encoding,
			        "output-charset" => $encoding,
			        "line-length" => 76,
			        "line-break-chars" => $passage_ligne
			    );

			    $subject = "Création d'un compte chez Aura";

				$header = "Content-type: text/html; charset=".$encoding . $passage_ligne;
				$header .= 'From: Aura <www-data@etudiant.u-pem.fr>' . $passage_ligne .'Reply-To: eritoux@etud.u-pem.fr' . $passage_ligne . 'X-Mailer: PHP/' . phpversion();
				// sendMail($mail);
				// $mail = "elise.ritoux@orange.fr";


	    // Mail header
			    $header .= "MIME-Version: 1.0" . $passage_ligne;
			    $header .= "Content-Transfer-Encoding: 8bit" . $passage_ligne;
			    $header .= "Date: ".date("r (T)") . $passage_ligne;
			    // $header .= iconv_mime_encode("Subject", $subject, $subject_preferences);

				$message = "Bienvenu chez Aura !" . $passage_ligne. "Cliquez <a href=\"http://perso-etudiant.u-pem.fr/~eritoux/aura/api/activateUser.php?id=" . $result['ID_user'] . "\">ici</a> pour activer votre compte.";
				mail($mail, '=?utf-8?B?'.base64_encode($subject).'?=', $message, $header);


			} else {
				echo "{\"sucess\":\"error\"}";
				$status = 1;
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
			$status = 1;

		}
	} else {
			echo "{\"sucess\":\"mail already used\"}";
			$status = 1;

	}


	if ($status === 0) {
		echo "{\"sucess\":\"error\"}";
	}

	echo "]";


?>


