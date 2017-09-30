<?php
	echo "register start <br/>";

    include("connectDB.php");

	$latitude=$_POST['latitude'];
	$longitude =$_POST['longitude'];
	

	
	$req = $db->prepare("INSERT INTO aura_item_localisation (latitude, longitude) VALUES ('".$latitude."', '".$longitude."')");
	$req->execute(array(
	    "latitude" => $latitude, 
	    "longitude" => $longitude
	));
	echo "register end <br/>";

?>
