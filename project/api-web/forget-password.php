<?php

    include("connectDB.php");
    // include("hashSeed.php");

	
	$mail = $_POST['email'];

	$rep = $db->query("SELECT `ID_user`, `pseudo` FROM `aura_user` WHERE mail = \"$mail\" LIMIT 1"); 

	echo "[";

	if ($rep->rowCount() === 1) {
		$result = $rep->fetch(PDO::FETCH_LAZY);



		$hash = hash('sha512',$mail);
	


		$time = time();
		// $date = getdate();
		// $date = $date["year"] . "-" . $date["mon"] . "-" .  $date["mday"];
		
		// echo "{\"date\":\"".$date."\"}";
		echo "{\"time\":\"".$time."\"}";
		$user = $result['ID_user'];

		$req = $db->prepare("UPDATE aura_user SET time_newPassword = \"$time\" WHERE ID_user = $user");
		$req->execute();



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

		    $subject = "Mot de passe oublié";

			$header = "Content-type: text/html; charset=".$encoding . $passage_ligne;
			$header .= 'From: Aura <www-data@etudiant.u-pem.fr>' . $passage_ligne .'Reply-To: eritoux@etud.u-pem.fr' . $passage_ligne . 'X-Mailer: PHP/' . phpversion();
			// sendMail($mail);
			// $mail = "elise.ritoux@orange.fr";


    // Mail header
		    $header .= "MIME-Version: 1.0" . $passage_ligne;
		    $header .= "Content-Transfer-Encoding: 8bit" . $passage_ligne;
		    $header .= "Date: ".date("r (T)") . $passage_ligne;
		    // $header .= iconv_mime_encode("Subject", $subject, $subject_preferences);

			$message = "Bonjour <b>" . $result['pseudo'] . "</b>";
			$message .= "<br><br>";
			$message .= "Vous avez oublié votre mot de passe ? Pas de problèmes, cliquez sur <a href=\"http://perso-etudiant.u-pem.fr/~eritoux/aura/api/newPassword.php?id=" . $hash . "&user=". $user ."\">ce lien</a> pour le réinitialiser.";
			mail($mail, '=?utf-8?B?'.base64_encode($subject).'?=', $message, $header);

	}

	echo "]";


?>


