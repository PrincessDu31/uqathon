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

	function hashEquals($a, $b)
	{
		if ($a == $b) 
			$res = "no changes";
		else 
			$res = "changes";

		return $res;
	}



	function measure($lat1, $lon1, $lat2, $lon2){  // generally used geo measurement function
	    // $R = 6378.137; // Radius of earth in KM
	    // $dLat = ($lat2 * M_PI / 180.0) - ($lat1 * M_PI / 180.0);
	    // $dLon = ($lon2 * M_PI / 180.0) - ($lon1 * M_PI / 180.0);
	    // $a = sin($dLat/2.0) * sin($dLat/2.0) + cos($lat1 * M_PI / 180.0) * cos($lat2 * M_PI / 180.0) *sin($dLon/2.0) * sin($dLon/2.0);
	    // $c = 2 * atan2(sqrt($a), sqrt(1-$a));
	    // $d = $R * $c;
	    // return $d * 1000; // meters
		
		$RAD = 0.000008998719243599958; 	// meters
		$RAD = 111.126925169; 	// kilometers
	    $meters = sqrt(pow($lat1 - $lat2, 2) + pow($lon1 - $lon2, 2)) * $RAD;
	    $meters *= 1000.0;
	    return $meters;
	}




	$latitude=$_POST['latitude'];
	$longitude =$_POST['longitude'];

	// $latitude = 48;
	// $longitude = -80;

	var $hash = 0;

    $str = "[";
	// $items = $db->query("SELECT * FROM `aura_item_localisation`, `aura_item_text` WHERE aura_item_localisation.ID = aura_item_text.ID AND ('$latitude'-aura_item_localisation.latitude BETWEEN -1 AND 1 OR '$latitude' + aura_item_localisation.latitude BETWEEN -1 AND 1) AND ('$longitude'-aura_item_localisation.longitude BETWEEN -1 AND 1 OR '$longitude' + aura_item_localisation.longitude BETWEEN -1 AND 1) ");


	$items = $db->query("SELECT * FROM aura_item_localisation, aura_item_text WHERE aura_item_localisation.ID = aura_item_text.ID");

	$firstItem = 1;
		
	foreach($items as $item) {

		if (measure($latitude,$longitude, $item['latitude'],$item['longitude']) < $item['radius']) {

			if (!$firstItem) $str .= ", ";
			else $firstItem = 0;

			$str .= "{\"id\":\"". $item['ID'] . "\", \"latitude\":\"". $item['latitude'] . "\", \"longitude\":\"" . $item['longitude'] . "\", \"content\":\"" . $item['content'] ."\" , \"title\":\"" . $item['title'] ."\"}";

			$hash += $item['ID'];
		}
	}

	$str .= ", {\"status\" : \" ". hashEquals($_POST['latitude'], $hash) ." \"}";


	$str .= "]";

	echo $str;
?>




