<?php

    include("connectDB.php");
   	$id =$_GET['id'];

	$stmt = $db->prepare("UPDATE `aura_user` SET activation = 1 WHERE ID_user = $id");
    $stmt->execute();


?>