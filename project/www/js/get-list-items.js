function onSuccessLocalisation(position) {

        latitude = position.coords.latitude ;
        longitude = position.coords.longitude;
alert(latitude);
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
		     	alert("longitude" + result[0]["latitude"] + ", longitude" + result[0]["longitude"] + ", content" + result[0]["content"]);
		     	alert("longitude" + result[1]["latitude"] + ", longitude" + result[1]["longitude"] + ", content" + result[1]["content"]);
	        },
	        error: function(result) {
		     	alert("error");
	        }
		}); 

}

$(document).ready(function(){

	$('#get-items-geolocalisation').click(function() {
		navigator.geolocation.getCurrentPosition(onSuccessLocalisation, onError);
	});
});