




// FICHIER INUTILE







function onSuccessGetItems(position) {


	        latitude = position.coords.latitude ;
	        longitude = position.coords.longitude;
			
			// alert(latitude + " <br/>" + longitude);
	        
	         jQuery.ajax({
			    url: "http://perso-etudiant.u-pem.fr/~eritoux/aura/api/get-list-items.php",
			    type: "POST",
			    data: {latitude: latitude, longitude: longitude},
				dataType: "json",
			    beforeSend: function(x) {
			       	if (x && x.overrideMimeType) {
			           	x.overrideMimeType("application/j-son;charset=UTF-8");
		            }
		        },
			    success: function(result) {
			    	$(".nb-creative-posts h1").html(Object.keys(result).length;);
			     	creationsItem = result;
			     	alert("longitude" + result[0]["latitude"] + ", longitude" + result[0]["longitude"] + ", content" + result[0]["content"] + ", mesure : " + result[0]["mesure"]);
			     	alert("longitude" + result[1]["latitude"] + ", longitude" + result[1]["longitude"] + ", content" + result[1]["content"] + ", mesure : " + result[1]["mesure"]);
			     	alert("longitude" + result[2]["latitude"] + ", longitude" + result[2]["longitude"] + ", content" + result[2]["content"] + ", mesure : " + result[2]["mesure"]);
		        },
		        error: function(result) {
			     	alert("error");
		        }
			}); 
        

}

$(document).ready(function(){

	$('#get-items-geolocalisation').click(function() {
		navigator.geolocation.getCurrentPosition(onSuccessGetItems, onError);
	});
});