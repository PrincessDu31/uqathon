<?php

    include("connectDB.php");

	function diff($a, $b)
	{
		if ($a > $b) 
			$diff = $a - $b;
		else 
			$diff = $b - $a;

		return $diff;
	}


	$latitude=$_POST['latitude'];
	$longitude =$_POST['longitude'];

	// $latitude = 48;
	// $longitude = -80;



    $str = "[";
	$items = $db->query("SELECT * FROM `aura_item_localisation`, `aura_item_text` WHERE aura_item_localisation.ID = aura_item_text.ID AND ('$latitude'-aura_item_localisation.latitude BETWEEN -aura_item_localisation.radius AND aura_item_localisation.radius OR '$latitude' + aura_item_localisation.latitude BETWEEN -aura_item_localisation.radius AND aura_item_localisation.radius) AND ('$longitude'-aura_item_localisation.longitude BETWEEN -aura_item_localisation.radius AND aura_item_localisation.radius OR '$longitude' + aura_item_localisation.longitude BETWEEN -aura_item_localisation.radius AND aura_item_localisation.radius) ");


	$items = $db->query("SELECT * FROM `aura_item_localisation`, `aura_item_text` WHERE aura_item_localisation.ID = aura_item_text.ID");

	$firstItem = 1;
		
	foreach($items as $item) {

		if (sqrt(pow(diff($item['latitude'],$latitude), 2)+pow(diff($item['longitude'],$longitude), 2)) < $item['radius']) {

			if (!$firstItem) $str .= ", ";
			else $firstItem = 0;

			$str .= "{\"latitude\":\"". $item['latitude'] . "\", \"longitude\":\"" . $item['longitude'] . "\", \"content\":\"" . $item['content'] ."\"}";
		}
	}

	$str .= "]";

	echo $str;
?>