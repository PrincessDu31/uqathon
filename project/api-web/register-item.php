<?php

    include("connectDB.php");

	$latitude=$_POST['latitude'];
	$longitude =$_POST['longitude'];
	
	$typeOfContent = "TEXT";
	$content =$_POST['content'];

	$currentDate = date("Y-m-d H:i:s");
	
	$req = $db->prepare("INSERT INTO aura_item_localisation (latitude, longitude, datePublication) VALUES ('".$latitude."', '".$longitude."', '".$currentDate."')");
	$req->execute(array(
	    "latitude" => $latitude, 
	    "longitude" => $longitude, 
	    "datePublication" => $currentDate
	));

	$idItemDB = $db->query("SELECT `ID` FROM `aura_item_localisation` WHERE `latitude` ='$latitude' AND `longitude` = '$longitude' AND `datePublication` = '$currentDate'");
	
	$idItem = 0;	
	foreach($idItemDB as $id) {
		$idItem = $id["ID"];	
		break;
	}

	$req = $db->prepare("INSERT INTO aura_item (ID, itemType) VALUES ('".$idItem."', '".$typeOfContent."')");
	$req->execute(array(
	    "ID" => $idItem, 
	    "itemType" => $typeOfContent
	));

	if ($typeOfContent == "TEXT") {
		$req = $db->prepare("INSERT INTO aura_item_text (ID, content) VALUES ('".$idItem."', '".$content."')");
		$req->execute(array(
		    "ID" => $idItem, 
		    "content" => $content
		));
	}

?>
