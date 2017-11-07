<?php
	$NB_HOURS_LINK_ACTIVATED = 48;

    include("connectDB.php");
	$user = $_GET['user'];
   	$rep = $db->query("SELECT `ID_user`, `time_newPassword` FROM `aura_user` WHERE ID_user = $user AND `time_newPassword` != 0  LIMIT 1");
   
   	

	if ($rep->rowCount() === 1) {
		$result = $rep->fetch(PDO::FETCH_LAZY);
		if (time() - $result['time_newPassword'] > 3600 * $NB_HOURS_LINK_ACTIVATED) {
	   		$stmt = $db->prepare("UPDATE `aura_user` SET time_newPassword = 0 WHERE ID_user = $user");
			$stmt->execute();
			echo "Ce lien n'est plus valide.";

	   	} else {
?>

			<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
			<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
			<script src="../newPassword.js"></script>

			<script>var userID = <?php echo $_GET['user']?>;</script>



			<form name="ajax-change-password" class="change-password" id="ajax-change-password" method="post">

				Nouveau mot de passe <br>
				<input type="password" name="password" class="password" value="">

				Confirmez le nouveau mot de passe <br>
				<input type="password" name="password-confirm" class="password-confirm" value="">

				<input type="submit" value="Valider">
			    
			    <p class="reponse"></p>

			</form>

		<?php

		}
	}
	else {
		echo "Ce lien n'est pas valide.";
	}
?>