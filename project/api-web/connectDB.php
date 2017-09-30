<?php
//	echo "connect start <br/>";

	$host = "sqletud.u-pem.fr";
	$dbname = "eritoux_db";
	$charset = "UTF8";
	$username = "eritoux";
	$passwd = "q8xCiyhea5";
	$passwd = "8zui4uyWtv";

	// $host = "localhost";
	// $dbname = "fenetres_db";
	// $charset = "UTF8";
	// $username = "root";
	// $passwd = "root";

	try {
		$db = new PDO('mysql:host='.$host.';dbname='.$dbname.';charset='.$charset, $username, $passwd);
	} catch (Exception $e) {
		die('Erreur : ' . $e->getMessage());
	}

	date_default_timezone_set("America/Montreal");

//	echo "connect end <br/>";
?>