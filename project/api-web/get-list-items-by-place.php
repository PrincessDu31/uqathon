<?php

    include("connectDB.php");

	$place=$_POST['place'];

    $str = "[";


	$items = $db->query("SELECT * FROM `aura_item_localisation`, `aura_item_text` WHERE `aura_item_localisation`.description = '$place' AND aura_item_localisation.ID = aura_item_text.ID");

	$firstItem = 1;
		
	foreach($items as $item) {


			if (!$firstItem) $str .= ", ";
			else $firstItem = 0;

			$str .= "{\"latitude\":\"". $item['latitude'] . "\", \"longitude\":\"" . $item['longitude'] . "\", \"content\":\"" . $item['content'] ."\" , \"title\":\"" . $item['title'] ."\"}";
		}
	

	$str .= "]";

	echo $str;
?>




